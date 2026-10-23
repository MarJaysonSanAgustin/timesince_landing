import Link from 'next/link';
import type { RelatedItem } from '@/lib/content/related';

export function RelatedGrid({ items, title }: { items: RelatedItem[]; title: string }) {
  if (items.length === 0) return null;
  return (
    <section className="not-prose my-12">
      <h2 className="mb-6 font-display text-2xl font-bold text-ink">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="ticket group block p-6 transition-transform hover:-translate-y-0.5"
          >
            <p className="stub-label uppercase">
              {item.kicker}
            </p>
            <h3 className="mt-2 font-semibold text-ink group-hover:underline">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{item.deck}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
