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
    <section className="w-full bg-surface-alt py-4">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* The accent class sits here so the chip and the gradient text below
            both read the same custom properties. */}
        <div
          className={`${ACCENT_CLASS[feature.accent]} bg-surface rounded-card-lg p-8 md:p-12 lg:p-16 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center gap-12 lg:gap-20 ${
            reverse ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          <div className="flex-1 space-y-6">
            <div className="accent-chip w-16 h-16 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <Icon className="w-8 h-8" />
            </div>

            <Heading className="text-3xl font-extrabold font-display text-ink">
              {feature.homeHeadline.lead}{' '}
              <span className="accent-text">{feature.homeHeadline.emphasis}</span>
            </Heading>

            <p className="text-lg text-ink-muted leading-relaxed">{feature.deck}</p>

            {feature.requires && (
              <p className="text-sm text-ink-subtle">Requires {feature.requires}.</p>
            )}

            {showLearnMore && (
              <Link
                href={`/features/${feature.slug}`}
                className="inline-flex items-center text-sm font-semibold text-purple-600 hover:underline"
              >
                Learn more &rarr;
              </Link>
            )}
          </div>

          <div className="flex-1 w-full flex items-center justify-center relative">
            <Image
              src={feature.image}
              alt={feature.alt}
              priority={priority}
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
