import { Check, X } from 'lucide-react';
import { strings } from '@/lib/strings/en';

/**
 * What it helps with, beside what it will not fix.
 *
 * The second column is the point. Stating the limits plainly is the most
 * trust-building thing a page like this does, and it keeps the claims honest.
 */
export function GivesGrid({ gives, doesNot }: { gives: string[]; doesNot: string[] }) {
  return (
    <section className="not-prose my-12 grid gap-4 sm:grid-cols-2">
      <div className="accent-calm surface p-6">
        <h2 className="section-label mb-3 accent-text">
          {strings.content.solved}
        </h2>
        <ul className="space-y-2">
          {gives.map((g) => (
            <li key={g} className="flex gap-2 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 accent-text" aria-hidden="true" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="surface p-6">
        <h2 className="section-label mb-3">
          {strings.content.notSolved}
        </h2>
        <ul className="space-y-2">
          {doesNot.map((d) => (
            <li key={d} className="flex gap-2 text-sm text-ink">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
