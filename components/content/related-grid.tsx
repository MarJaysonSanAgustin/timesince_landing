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
            className="group rounded-card-lg border border-gray-100 bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
              {item.kicker}
            </p>
            <h3 className="mt-2 font-semibold text-ink group-hover:text-purple-600">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{item.deck}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
