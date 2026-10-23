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
      <div className="rounded-card-lg border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          {strings.content.solved}
        </h2>
        <ul className="space-y-2">
          {gives.map((g) => (
            <li key={g} className="flex gap-2 text-sm text-gray-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-card-lg border border-gray-200 bg-surface-alt p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-subtle">
          {strings.content.notSolved}
        </h2>
        <ul className="space-y-2">
          {doesNot.map((d) => (
            <li key={d} className="flex gap-2 text-sm text-gray-800">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-subtle" aria-hidden="true" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
