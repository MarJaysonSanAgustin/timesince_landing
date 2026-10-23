import Image from 'next/image';
import badgeIosImg from '@/assets/badge-ios-en.svg';
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
    <section className="not-prose my-12 rounded-card-lg border border-purple-100 bg-purple-50 p-8 text-center">
      {headline && (
        <h2 className="font-display text-2xl font-bold text-ink">{headline}</h2>
      )}
      {sub && <p className="mx-auto mt-2 max-w-xl text-ink-muted">{sub}</p>}
      <a
        href={appStoreUrl(placement)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block transition-transform hover:scale-105"
      >
        <Image src={badgeIosImg} alt="Download on the App Store" className="h-[52px] w-auto" />
      </a>
    </section>
  );
}
