import { Smartphone } from 'lucide-react';
import { landing } from '@/lib/strings/home';
import { appStoreUrl, type CtaPlacement } from '@/lib/cta';

/**
 * Every App Store CTA. Takes a typed placement so a mistyped campaign tag
 * fails the typecheck rather than quietly polluting App Analytics.
 */
export function CtaBlock({
  placement,
  headline,
  sub,
}: {
  placement: CtaPlacement;
  headline?: string;
  sub?: string;
}) {
  return (
    <section className="not-prose download-panel">
      {headline && (
        <h2 className="font-display text-2xl font-bold text-ink">{headline}</h2>
      )}
      {sub && <p className="mx-auto mt-2 max-w-xl text-muted">{sub}</p>}
      <a
        href={appStoreUrl(placement)}
        target="_blank"
        rel="noopener noreferrer"
        className="download-button mt-6"
      >
        <Smartphone size={18} aria-hidden="true" />{landing.download}
      </a>
    </section>
  );
}
