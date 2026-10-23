import type { Doc } from '@/lib/content/load';

export interface RelatedItem {
  href: string;
  kicker: string;
  title: string;
  deck: string;
}

interface Relatable {
  title: string;
  deck: string;
  tags: string[];
  cluster: string;
  related: string[];
}

/**
 * Explicit `related` entries first, then filled to `limit` by tag overlap
 * (cluster counts as a weaker match).
 *
 * The point is that `related` stays optional: picking related pages must never
 * become a per-post chore, or it is the thing that quietly stops happening.
 */
export function relatedFor<T extends Relatable>(
  current: Doc<T>,
  pool: Doc<T>[],
  basePath: string,
  kicker: string,
  limit = 3,
): RelatedItem[] {
  const others = pool.filter((d) => d.slug !== current.slug);
  const bySlug = new Map(others.map((d) => [d.slug, d]));

  const picked: Doc<T>[] = [];
  for (const ref of current.data.related) {
    const slug = ref.includes('/') ? ref.split('/').pop()! : ref;
    const hit = bySlug.get(slug);
    if (hit && !picked.includes(hit)) picked.push(hit);
  }

  if (picked.length < limit) {
    const tags = new Set(current.data.tags);
    const scored = others
      .filter((d) => !picked.includes(d))
      .map((d) => ({
        doc: d,
        score:
          d.data.tags.filter((t) => tags.has(t)).length * 2 +
          (d.data.cluster === current.data.cluster ? 1 : 0),
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score || a.doc.slug.localeCompare(b.doc.slug));

    for (const { doc } of scored) {
      if (picked.length >= limit) break;
      picked.push(doc);
    }
  }

  return picked.slice(0, limit).map((d) => ({
    href: `${basePath}/${d.slug}`,
    kicker,
    title: d.data.title,
    deck: d.data.deck,
  }));
}
