import { ContentLink } from './content-link';
import type { RelatedItem } from '@/lib/content/related';

export function RelatedGrid({ items, title }: { items: RelatedItem[]; title: string }) {
  if (items.length === 0) return null;
  return (
    <section className="not-prose my-12">
      <h2 className="mb-6 font-display text-2xl font-bold text-ink">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <ContentLink key={item.href} href={item.href} title={item.title} deck={item.deck} label={item.kicker} />
        ))}
      </div>
    </section>
  );
}
