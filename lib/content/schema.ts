import { z } from 'zod';
import { ACCENTS } from '@/lib/accent';
import { CONTENT_IMAGE_KEYS } from '@/lib/images/manifest.generated';
import { FEATURES } from '@/lib/features';

/**
 * Frontmatter contracts for every long-form content type.
 *
 * Structured modules live in frontmatter rather than the MDX body on purpose:
 * a page's SEO-bearing structure (answer box, FAQ, steps, citations) is then
 * data, so it can be validated at build time, reused in JSON-LD, and surfaced
 * in llms.txt. None of that is possible with hand-written markdown.
 */

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be YYYY-MM-DD');

const featureSlugs = FEATURES.map((f) => f.slug);

// zod 4 dropped the function form of refine's message argument, so dynamic
// messages go through superRefine.
const imageKey = z.string().superRefine((k, ctx) => {
  if (!(CONTENT_IMAGE_KEYS as string[]).includes(k)) {
    ctx.addIssue({
      code: 'custom',
      message: `unknown image key "${k}" — add the file under assets/content/ and run \`npm run assets:sync\``,
    });
  }
});

/** Guide clusters double as hub groupings and internal-linking neighbourhoods. */
export const CLUSTERS = [
  'anti-streak',
  'adhd',
  'interval-tracking',
  'quitting',
  'ios',
  'home-maintenance',
  'health',
  'relationships',
  'privacy',
  'choosing-an-app',
] as const;
export type Cluster = (typeof CLUSTERS)[number];

export const CLUSTER_LABELS: Record<Cluster, string> = {
  'anti-streak': 'Streaks & habit science',
  adhd: 'ADHD & executive function',
  'interval-tracking': 'Interval tracking',
  quitting: 'Quitting & recovery',
  ios: 'iOS tips',
  'home-maintenance': 'Home & vehicle upkeep',
  health: 'Health & medication',
  relationships: 'Staying in touch',
  privacy: 'Privacy & your data',
  'choosing-an-app': 'Choosing an app',
};

export const faqEntry = z.object({
  q: z.string().min(10).max(140),
  a: z.string().min(40).max(700),
});

export const step = z.object({
  title: z.string().min(3).max(90),
  body: z.string().min(20),
  image: imageKey.optional(),
  note: z.string().optional(),
});

export const source = z.object({
  title: z.string().min(3),
  publisher: z.string().optional(),
  url: z.string().url().optional(),
  note: z.string().optional(),
});

/** Shared by every long-form type. */
const base = z.object({
  /** The H1. */
  title: z.string().min(10).max(90),
  /** The <title>, which may deliberately differ from the H1. Defaults to title. */
  seoTitle: z.string().min(15).max(65).optional(),
  /** Meta description. */
  description: z.string().min(110).max(165),
  /** On-page lead, reused verbatim as the index-card copy. */
  deck: z.string().min(60).max(300),
  /** The answer-first box: roughly 60–90 words, and the thing LLMs quote. */
  answer: z.string().min(250).max(750),

  date: isoDate,
  updated: isoDate.optional(),
  /** Hides the page in production until this date. Decouples writing from publishing. */
  publishAt: isoDate.optional(),
  draft: z.boolean().default(false),

  cluster: z.enum(CLUSTERS),
  accent: z.enum(ACCENTS).default('brand'),
  tags: z.array(z.string()).min(1).max(6),

  keywords: z.object({
    primary: z.string().min(3),
    secondary: z.array(z.string()).min(3).max(8),
  }),

  faq: z.array(faqEntry).min(2).max(8),
  sources: z.array(source).default([]),
  /** Explicit overrides; anything missing is filled from tag overlap. */
  related: z.array(z.string()).max(4).default([]),

  hero: imageKey.optional(),
  /** Cross-links to a feature page AND supplies the tier-2 image fallback. */
  feature: z
    .string()
    .superRefine((slug, ctx) => {
      if (!featureSlugs.includes(slug)) {
        ctx.addIssue({
          code: 'custom',
          message: `unknown feature "${slug}" — expected one of ${featureSlugs.join(', ')}`,
        });
      }
    })
    .optional(),

  /** Health-adjacent pages are YMYL and must cite something. */
  disclaimer: z.enum(['health', 'legal', 'none']).default('none'),
});

export const guideSchema = base
  .extend({
    /**
     * 'note' is the escape valve that replaces the blog: shorter, no steps or
     * comparison table, grouped separately on the index — so a timely piece
     * still has a home without a second route tree.
     */
    kind: z.enum(['guide', 'note']).default('guide'),
    steps: z.array(step).min(3).max(12).optional(),
    gives: z.array(z.string()).min(2).max(6).optional(),
    doesNotGive: z.array(z.string()).min(2).max(6).optional(),
    comparison: z
      .object({
        caption: z.string().optional(),
        columns: z.array(z.string()).min(2).max(5),
        rows: z
          .array(z.object({ label: z.string(), cells: z.array(z.string()) }))
          .min(2)
          .max(8),
      })
      .optional(),
  })
  .superRefine((v, ctx) => {
    if (v.disclaimer !== 'none' && v.sources.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['sources'],
        message: `disclaimer "${v.disclaimer}" is set, so at least one source is required`,
      });
    }
    if (v.comparison) {
      v.comparison.rows.forEach((row, i) => {
        if (row.cells.length !== v.comparison!.columns.length) {
          ctx.addIssue({
            code: 'custom',
            path: ['comparison', 'rows', i, 'cells'],
            message: `row "${row.label}" has ${row.cells.length} cells but there are ${v.comparison!.columns.length} columns`,
          });
        }
      });
    }
    if (v.updated && v.updated < v.date) {
      ctx.addIssue({ code: 'custom', path: ['updated'], message: '`updated` is before `date`' });
    }
  });

export type GuideFrontmatter = z.infer<typeof guideSchema>;

/** Situational pages must have a traceable reason to exist, not just a keyword. */
export const scenarioSchema = base.extend({
  kind: z.literal('scenario').default('scenario'),
  evidence: z.string().trim().min(30),
  audience: z.string().min(10).max(140),
  scene: z.string().min(20).max(220),
  problem: z.string().min(20),
  consequence: z.string().min(20),
  help: z.string().min(20),
  solves: z.array(z.string().min(10)).min(2).max(6),
  doesNotSolve: z.array(z.string().min(10)).min(2).max(6),
  checklist: z.array(step).min(3).max(8),
  pullQuote: z.string().min(15).max(180),
  sources: z.array(source.extend({ url: z.string().url() })).min(1),
}).superRefine((v, ctx) => {
  if (v.updated && v.updated < v.date) {
    ctx.addIssue({ code: 'custom', path: ['updated'], message: '`updated` is before `date`' });
  }
  if (['health', 'adhd'].includes(v.cluster) && v.disclaimer !== 'health') {
    ctx.addIssue({ code: 'custom', path: ['disclaimer'], message: 'health and ADHD scenarios require a health disclaimer' });
  }
});
export type ScenarioFrontmatter = z.infer<typeof scenarioSchema>;
