import type { z } from 'zod';
import type { source } from '@/lib/content/schema';
import { strings } from '@/lib/strings/en';

export type Source = z.infer<typeof source>;

/**
 * Citations plus the educational-not-advice line.
 *
 * The disclaimer is not decoration: medication, recovery and ADHD content is
 * YMYL, and the schema requires sources whenever a disclaimer is set.
 */
export function SourceList({ sources, disclaimer }: { sources: Source[]; disclaimer: string }) {
  if (sources.length === 0 && disclaimer === 'none') return null;
  return (
    <section className="not-prose my-12 ticket p-6">
      {sources.length > 0 && (
        <>
          <h2 className="stub-label mb-3 uppercase">
            {strings.content.sourcesHeading}
          </h2>
          <ul className="space-y-2">
            {sources.map((s) => (
              <li key={s.title} className="text-sm text-muted">
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ube hover:underline"
                  >
                    {s.title}
                  </a>
                ) : (
                  <span className="text-ink">{s.title}</span>
                )}
                {s.publisher && <span> — {s.publisher}</span>}
                {s.note && <span className="block text-faint">{s.note}</span>}
              </li>
            ))}
          </ul>
        </>
      )}
      {disclaimer !== 'none' && (
        <p className={`text-sm text-faint ${sources.length > 0 ? 'mt-4 border-t border-line pt-4' : ''}`}>
          {strings.content.disclaimer}
        </p>
      )}
    </section>
  );
}
