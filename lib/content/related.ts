import type { Doc } from '@/lib/content/load';

export interface RelatedItem {
  href: string;
  kicker: string;
  title: string;
  deck: string;
}

/**
 * The only fields this needs. Deliberately NOT generic over the frontmatter
 * type: `current` and the pool come from different collections, so binding a
 * single `T` to the current doc makes a mixed pool unassignable. Structural
 * typing means a Guide and a Scenario both satisfy this.
 */
export interface Relatable {
  title: string;
  deck: string;
  tags: string[];
  cluster: string;
  related: string[];
}

export interface Collection {
  basePath: string;
  docs: Doc<Relatable>[];
}

/** What a card calls the thing it links to. */
const KICKERS: Record<string, string> = {
  '/guides': 'Guide',
  '/scenarios': 'Scenario',
};

function kickerFor(basePath: string): string {
  return KICKERS[basePath] ?? basePath.replace(/^\//, '').replace(/s$/, '');
}

/**
 * Related pages, picked across every collection.
 *
 * Explicit `related` entries first, then filled to `limit` by tag overlap
 * (same cluster counts as a weaker match). Crossing collections is the point:
 * the guide on logging without opening the app and the scenario about
 * forgetting whether you took your meds belong next to each other, and a
 * per-collection version could never pair them.
 *
 * `related` stays optional on purpose — choosing related pages must never
 * become a per-post chore, or it is the thing that quietly stops happening.
 */
export function relatedContent(
  current: Doc<Relatable>,
  currentBasePath: string,
  pool: Collection[],
  limit = 3,
): RelatedItem[] {
  type Entry = { basePath: string; doc: Doc<Relatable> };

  const others: Entry[] = pool.flatMap(({ basePath, docs }) =>
    docs
      .filter((doc) => !(basePath === currentBasePath && doc.slug === current.slug))
      .map((doc) => ({ basePath, doc })),
  );

  const picked: Entry[] = [];
  const take = (entry: Entry) => {
    if (picked.length < limit && !picked.includes(entry)) picked.push(entry);
  };

  // 1. Explicit refs. A ref may be qualified ("guides/foo") or a bare slug.
  for (const ref of current.data.related) {
    const [maybeCollection, maybeSlug] = ref.includes('/') ? ref.split('/') : [null, ref];
    const hit = others.find(
      ({ basePath, doc }) =>
        doc.slug === maybeSlug &&
        (maybeCollection === null || basePath === `/${maybeCollection}`),
    );
    if (hit) take(hit);
  }

  // 2. Fill by similarity.
  if (picked.length < limit) {
    const tags = new Set(current.data.tags);
    const scored = others
      .filter((entry) => !picked.includes(entry))
      .map((entry) => ({
        entry,
        score:
          entry.doc.data.tags.filter((t) => tags.has(t)).length * 2 +
          (entry.doc.data.cluster === current.data.cluster ? 1 : 0),
      }))
      .filter(({ score }) => score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          // Deterministic, so the same inputs always build the same page.
          a.entry.doc.slug.localeCompare(b.entry.doc.slug),
      );

    for (const { entry } of scored) take(entry);
  }

  return picked.map(({ basePath, doc }) => ({
    href: `${basePath}/${doc.slug}`,
    kicker: kickerFor(basePath),
    title: doc.data.title,
    deck: doc.data.deck,
  }));
}
