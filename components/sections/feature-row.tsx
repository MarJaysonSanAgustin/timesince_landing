import Image from 'next/image';
import Link from 'next/link';
import type { Feature } from '@/lib/features';
import { ACCENT_CLASS } from '@/lib/accent';

export interface FeatureRowProps {
  feature: Feature;
  /** Alternates the image side; the homepage derives this from index parity. */
  reverse?: boolean;
  headingLevel?: 'h2' | 'h3';
  /** Set on the first row so next/image preloads it. */
  priority?: boolean;
  showLearnMore?: boolean;
}

export function FeatureRow({
  feature,
  reverse = false,
  headingLevel = 'h3',
  priority = false,
  showLearnMore = false,
}: FeatureRowProps) {
  const Heading = headingLevel;
  const Icon = feature.icon;

  return (
    <section className="w-full paper-dots py-4">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* A ticket on the paper. The accent class scopes --accent-fill and
            --accent-ink to this card, so the block below reads its own colour. */}
        <div
          className={`${ACCENT_CLASS[feature.accent]} ticket flex flex-col items-center gap-12 p-8 md:p-12 lg:gap-20 lg:p-16 ${
            reverse ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          <div className="flex-1 space-y-6">
            {/* Flat block, not a gradient chip. ADR-012 rule 8. */}
            <div className="accent-block flex h-14 w-14 items-center justify-center rounded-card">
              <Icon className="h-7 w-7" />
            </div>

            <Heading className="font-display text-3xl font-extrabold text-ink">
              {feature.homeHeadline.lead}{' '}
              <span className="accent-text">{feature.homeHeadline.emphasis}</span>
            </Heading>

            <p className="text-lg leading-relaxed text-muted">{feature.deck}</p>

            {/* Stub rows: label left, value right (ADR-012 rule 5). */}
            <div className="space-y-2 border-t border-line pt-4">
              <div className="stub-row">
                <span className="stub-label">INCLUDED IN</span>
                <span className="stub-value text-sm">
                  {feature.tier === 'pro' ? 'TimeSince Pro' : 'Free tier'}
                </span>
              </div>
              {feature.requires && (
                <div className="stub-row">
                  <span className="stub-label">REQUIRES</span>
                  <span className="stub-value text-sm">{feature.requires}</span>
                </div>
              )}
            </div>

            {showLearnMore && (
              <Link
                href={`/features/${feature.slug}`}
                className="inline-flex items-center text-sm font-semibold text-ube hover:underline"
              >
                Learn more &rarr;
              </Link>
            )}
          </div>

          <div className="relative flex w-full flex-1 items-center justify-center">
            <Image
              src={feature.image}
              alt={feature.alt}
              priority={priority}
              className="h-auto w-full max-w-[320px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
