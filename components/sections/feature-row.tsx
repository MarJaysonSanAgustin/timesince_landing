import { strings } from '@/lib/strings/en';
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
    <section className="w-full paper py-4">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div
          className={`${ACCENT_CLASS[feature.accent]} surface flex flex-col items-center gap-12 p-8 md:p-12 lg:gap-20 lg:p-16 ${
            reverse ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          <div className="flex-1 space-y-6">
            <div className="accent-block flex h-14 w-14 items-center justify-center rounded-card">
              <Icon className="h-7 w-7" />
            </div>

            <Heading className="font-display text-3xl font-extrabold text-ink">
              {feature.homeHeadline.lead}{' '}
              <span className="accent-text">{feature.homeHeadline.emphasis}</span>
            </Heading>

            <p className="text-lg leading-relaxed text-muted">{feature.deck}</p>
            <div className="space-y-2 border-t border-line pt-4">
              <div className="detail-row">
                <span className="section-label">INCLUDED IN</span>
                <span className="detail-value text-sm">
                  {strings.content.tiers[feature.tier]}
                </span>
              </div>
              {feature.requires && (
                <div className="detail-row">
                  <span className="section-label">REQUIRES</span>
                  <span className="detail-value text-sm">{feature.requires}</span>
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
