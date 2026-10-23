/**
 * Cross-file content checks — the ones a single page render structurally cannot do.
 *
 * Division of labour, on purpose: zod validates each file's frontmatter during
 * `next build`, because the loader sits on the build's critical path and cannot
 * be skipped. It can't run here — the schema reaches lib/features.ts, which
 * imports PNGs, so it only resolves inside a bundler. This script covers
 * everything that needs to see the whole corpus at once.
 *
 * Run both with `npm run verify`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';

const ROOT = process.cwd();
const LOCALE = 'en';
const COLLECTIONS = ['guides', 'scenarios'] as const;

const WORDS = { guide: [700, 6000], note: [400, 2500], scenario: [600, 4000] } as const;
const MIN_INTERNAL_LINKS = 1;
const NEAR_DUPLICATE_THRESHOLD = 0.6;

/** Every piece of prose the page renders, wherever it is authored. */
function countRenderedWords(e: Entry): number {
  const d = e.data;
  const parts: string[] = [e.body, String(d.deck ?? ''), String(d.answer ?? '')];
  for (const f of (d.faq as { q: string; a: string }[]) ?? []) parts.push(f.q, f.a);
  for (const st of (d.steps as { title: string; body: string; note?: string }[]) ?? []) {
    parts.push(st.title, st.body, st.note ?? '');
  }
  for (const key of ['gives', 'doesNotGive', 'solves', 'doesNotSolve'] as const) {
    for (const line of (d[key] as string[]) ?? []) parts.push(line);
  }
  for (const key of ['audience', 'scene', 'problem', 'consequence', 'help', 'pullQuote'] as const) {
    parts.push(String(d[key] ?? ''));
  }
  for (const st of (d.checklist as { title: string; body: string }[]) ?? []) {
    parts.push(st.title, st.body);
  }
  return parts.join(' ').trim().split(/\s+/).filter(Boolean).length;
}

const problems: string[] = [];
const warnings: string[] = [];
const fail = (f: string, msg: string) => problems.push(`${f}: ${msg}`);

interface Entry {
  file: string;
  collection: string;
  slug: string;
  data: Record<string, unknown>;
  body: string;
}

const entries: Entry[] = [];
for (const collection of COLLECTIONS) {
  const dir = path.join(ROOT, 'content', LOCALE, collection);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.mdx')) continue;
    if (name.startsWith('_')) {
      fail(`content/${LOCALE}/${collection}/${name}`, 'underscore-prefixed files are never published — move it to content/_templates/');
      continue;
    }
    const raw = fs.readFileSync(path.join(dir, name), 'utf8');
    const { data, content } = matter(raw);
    entries.push({
      file: `content/${LOCALE}/${collection}/${name}`,
      collection,
      slug: name.replace(/\.mdx$/, ''),
      data: data as Record<string, unknown>,
      body: content,
    });
  }
}

// ── uniqueness ────────────────────────────────────────────────────────────
const seen = <T,>(key: (e: Entry) => T | undefined, label: string) => {
  const map = new Map<string, Entry[]>();
  for (const e of entries) {
    const v = key(e);
    if (v == null) continue;
    const k = String(v).trim().toLowerCase();
    map.set(k, [...(map.get(k) ?? []), e]);
  }
  for (const [value, hits] of map) {
    if (hits.length > 1) {
      fail(hits.map((h) => h.file).join(' + '), `duplicate ${label}: "${value}"`);
    }
  }
};
seen((e) => e.slug, 'slug');
seen((e) => e.data.title as string, 'title');
seen((e) => e.data.description as string, 'description');
seen((e) => (e.data.keywords as { primary?: string } | undefined)?.primary, 'primary keyword');

const slugs = new Set(entries.map((e) => `${e.collection}/${e.slug}`));
const bare = new Set(entries.map((e) => e.slug));
const today = new Date().toISOString().slice(0, 10);

for (const e of entries) {
  const kind = (e.data.kind as string) ?? 'guide';

  // ── related targets resolve ────────────────────────────────────────────
  for (const ref of (e.data.related as string[]) ?? []) {
    const target = ref.includes('/') ? ref : `${e.collection}/${ref}`;
    if (!slugs.has(target) && !bare.has(ref)) {
      fail(e.file, `related: "${ref}" does not resolve to a published page`);
    }
  }

  // ── internal links in the body resolve ─────────────────────────────────
  const links = [...e.body.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
  for (const href of links) {
    const m = href.match(/^\/(guides|scenarios)\/([a-z0-9-]+)\/?$/);
    if (m && !slugs.has(`${m[1]}/${m[2]}`)) {
      fail(e.file, `body links to ${href}, which does not exist`);
    }
  }
  if (links.length < MIN_INTERNAL_LINKS) {
    warnings.push(`${e.file}: no internal links in the body — pages this isolated do not get crawled well`);
  }

  // ── evidence must actually cite something ──────────────────────────────
  // Only for files about to publish. A fresh scaffold is empty by design, and
  // the build skips drafts anyway — failing the check on one would make the
  // scaffold command and the check contradict each other.
  if (kind === 'scenario' && e.data.draft !== true) {
    const evidence = String(e.data.evidence ?? '');
    const sources = (e.data.sources as { url?: string }[]) ?? [];
    if (!sources.some((src) => src.url)) {
      fail(e.file, 'a scenario needs at least one source with a URL');
    }
    if (/^(tbd|todo|n\/a|none)\b/i.test(evidence.trim())) {
      fail(e.file, `evidence is a placeholder: "${evidence.trim().slice(0, 40)}"`);
    }
  }

  // ── dates ──────────────────────────────────────────────────────────────
  const date = e.data.date as string;
  const updated = e.data.updated as string | undefined;
  if (date > today) fail(e.file, `date "${date}" is in the future`);
  if (updated && updated > today) fail(e.file, `updated "${updated}" is in the future`);
  if (updated && date && updated < date) fail(e.file, '`updated` is before `date`');

  // ── length ─────────────────────────────────────────────────────────────
  // Counts RENDERED prose, not just the MDX body: in this architecture the
  // answer box, steps, FAQ and gives/doesNotGive all live in frontmatter and
  // are a large share of what the reader actually sees.
  const words = countRenderedWords(e);
  const bounds = WORDS[kind as keyof typeof WORDS];
  if (bounds && (words < bounds[0] || words > bounds[1])) {
    warnings.push(`${e.file}: ${words} words, outside the ${bounds[0]}–${bounds[1]} range for kind "${kind}"`);
  }
}

// ── near-duplicate detection ──────────────────────────────────────────────
// The real risk at a daily cadence is 100 pages that each say the same thing
// slightly differently. Template symmetry makes that easier to detect, not harder.
const shingles = (text: string) => {
  const w = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const s = new Set<string>();
  for (let i = 0; i + 4 < w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  return s;
};
const sets = entries.map((e) => ({ e, s: shingles(e.body) }));
for (let i = 0; i < sets.length; i++) {
  for (let j = i + 1; j < sets.length; j++) {
    const a = sets[i].s;
    const b = sets[j].s;
    if (a.size === 0 || b.size === 0) continue;
    let inter = 0;
    for (const x of a) if (b.has(x)) inter++;
    const jaccard = inter / (a.size + b.size - inter);
    if (jaccard > NEAR_DUPLICATE_THRESHOLD) {
      fail(`${sets[i].e.file} + ${sets[j].e.file}`, `bodies are ${(jaccard * 100).toFixed(0)}% similar — too close to ship as separate pages`);
    }
  }
}

// ── the image manifest cannot be stale ────────────────────────────────────
const MANIFEST = path.join(ROOT, 'lib/images/manifest.generated.ts');
const before = fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, 'utf8') : '';
execFileSync('node', ['--experimental-strip-types', 'scripts/gen-image-manifest.ts'], { stdio: 'pipe' });
if (fs.readFileSync(MANIFEST, 'utf8') !== before) {
  fail('lib/images/manifest.generated.ts', 'was stale — it has been regenerated, please commit it');
}

// ── report ────────────────────────────────────────────────────────────────
for (const w of warnings) console.warn(`  warn  ${w}`);
if (problems.length) {
  console.error(`\ncontent:check failed — ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error('');
  process.exit(1);
}
console.log(`content:check passed — ${entries.length} file(s), ${warnings.length} warning(s)`);
