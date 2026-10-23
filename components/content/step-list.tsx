import { serializeJsonLd } from '@/lib/json-ld';
import Image from 'next/image';
import type { z } from 'zod';
import type { step } from '@/lib/content/schema';
import { CONTENT_IMAGES } from '@/lib/images/manifest.generated';

export type Step = z.infer<typeof step>;

/**
 * Numbered steps, and the HowTo schema generated from the same array — so the
 * structured data and the visible steps cannot drift apart.
 */
export function StepList({
  steps,
  heading,
  emitHowTo = false,
  howToName,
}: {
  steps: Step[];
  heading?: string;
  emitHowTo?: boolean;
  howToName?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howToName,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <section className="not-prose my-12">
      {emitHowTo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      )}
      {heading && <h2 className="mb-6 font-display text-2xl font-bold text-ink">{heading}</h2>}
      <ol className="space-y-6">
        {steps.map((s, i) => {
          const img = s.image ? CONTENT_IMAGES[s.image as keyof typeof CONTENT_IMAGES] : undefined;
          return (
            <li key={s.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card text-sm font-bold text-ube">
                {i + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
                {s.note && <p className="mt-2 text-sm text-faint">{s.note}</p>}
                {img && (
                  <Image
                    src={img}
                    alt={s.title}
                    className="mt-4 h-auto w-full max-w-[260px] rounded-card border border-line"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
