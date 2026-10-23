import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { z } from 'zod';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

export interface Doc<T> {
  /** Derived from the filename, never from frontmatter — removes a class of typo. */
  slug: string;
  locale: Locale;
  data: T;
  body: string;
}

const CONTENT_ROOT = path.join(process.cwd(), 'content');

/**
 * Module-scope cache. Without it every file is read and parsed five-plus times
 * per build — generateStaticParams, the page itself, sitemap, llms.txt, feed.
 */
const cache = new Map<string, Doc<unknown>[]>();

class ContentError extends Error {
  constructor(problems: string[]) {
    super(
      `\n\nContent validation failed (${problems.length} problem${problems.length === 1 ? '' : 's'}):\n\n` +
        problems.map((p) => `  • ${p}`).join('\n') +
        '\n',
    );
    this.name = 'ContentError';
  }
}

/** The dev server shows drafts so you can write against a live preview. */
const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

/**
 * Hide future-dated pages outside dev, so `publishAt` decouples writing days
 * from publishing days.
 */
function isPublished(data: { publishAt?: string }): boolean {
  if (SHOW_DRAFTS) return true;
  if (data.publishAt && data.publishAt > new Date().toISOString().slice(0, 10)) return false;
  return true;
}

/**
 * Reads and validates one content collection.
 *
 * Called by generateStaticParams, every page, sitemap, llms.txt and the feed —
 * so validation sits on the build's critical path automatically. There is no
 * separate step anyone can forget to run.
 */
export function loadCollection<S extends z.ZodType>(
  dir: string,
  schema: S,
  locale: Locale = DEFAULT_LOCALE,
): Doc<z.infer<S>>[] {
  const cacheKey = `${locale}/${dir}`;
  const hit = cache.get(cacheKey);
  if (hit) return hit as Doc<z.infer<S>>[];

  const full = path.join(CONTENT_ROOT, locale, dir);
  if (!fs.existsSync(full)) {
    cache.set(cacheKey, []);
    return [];
  }

  const files = fs
    .readdirSync(full)
    // Underscore-prefixed files are templates and scratch — never pages.
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'));

  const problems: string[] = [];
  const docs: Doc<z.infer<S>>[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(full, file), 'utf8');
    const { data, content } = matter(raw);

    // Skip drafts BEFORE validating them. A half-written file must not break
    // `next build` — but the dev server still shows it, and still reports its
    // frontmatter errors, so problems surface while you are writing.
    if (data.draft === true && !SHOW_DRAFTS) continue;

    // safeParse, not parse: collect every problem across every file and report
    // them in one go, so a publishing run is one build instead of five.
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const where = issue.path.length ? issue.path.join('.') : '(root)';
        problems.push(`content/${locale}/${dir}/${file} › ${where}: ${issue.message}`);
      }
      continue;
    }

    if (!isPublished(parsed.data as { draft?: boolean; publishAt?: string })) continue;
    docs.push({ slug, locale, data: parsed.data, body: content });
  }

  if (problems.length) throw new ContentError(problems);

  docs.sort((a, b) => {
    const da = (a.data as { date: string }).date;
    const db = (b.data as { date: string }).date;
    return da < db ? 1 : da > db ? -1 : a.slug.localeCompare(b.slug);
  });

  cache.set(cacheKey, docs as Doc<unknown>[]);
  return docs;
}
