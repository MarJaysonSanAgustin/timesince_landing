import type { ReactNode } from 'react';

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * The <details> pattern from /faq, extracted so the FAQ page, the homepage and
 * every content page share one accordion and one schema emitter.
 *
 * `emitSchema` is opt-in because a URL may only carry one FAQPage.
 */
export function FaqAccordion({
  items,
  heading,
  emitSchema = false,
}: {
  items: FaqEntry[];
  heading?: ReactNode;
  emitSchema?: boolean;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <section className="not-prose my-12">
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {heading && (
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">{heading}</h2>
      )}
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-card-lg border border-gray-100 bg-surface px-6 py-5 shadow-sm transition-shadow open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
              <span>{item.q}</span>
              <span className="shrink-0 text-xl leading-none text-purple-600 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
