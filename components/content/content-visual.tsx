import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { CONTENT_IMAGES } from '@/lib/images/manifest.generated';
import { getFeature } from '@/lib/features';
import { ACCENT_CLASS, type Accent } from '@/lib/accent';

interface ContentVisualProps {
  hero?: string;
  /** Feature slug: supplies the tier-2 fallback image. */
  feature?: string;
  accent: Accent;
  icon: LucideIcon;
  kicker: string;
  alt: string;
  priority?: boolean;
}

/**
 * Three tiers, so a missing image never blocks a publish:
 *   1. an explicit `hero` key from the generated manifest
 *   2. the related feature's existing screenshot — free and topically relevant
 *   3. an accent panel with the type's icon
 *
 * Tier 3 has to look deliberate rather than broken, because at a daily cadence
 * it is the one that runs most often.
 */
export function ContentVisual({
  hero,
  feature,
  accent,
  icon: Icon,
  kicker,
  alt,
  priority = false,
}: ContentVisualProps) {
  const heroImg = hero ? CONTENT_IMAGES[hero as keyof typeof CONTENT_IMAGES] : undefined;
  const featureImg = feature ? getFeature(feature)?.image : undefined;
  const img = heroImg ?? featureImg;

  if (img) {
    return (
      <div className={`${ACCENT_CLASS[accent]} accent-gradient flex items-center justify-center rounded-card-lg p-8`}>
        <Image
          src={img}
          alt={alt}
          priority={priority}
          className="h-auto w-full max-w-[260px] object-contain drop-shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div
      className={`${ACCENT_CLASS[accent]} accent-gradient flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-card-lg p-10 text-center`}
    >
      <Icon className="h-10 w-10 text-white/90" aria-hidden="true" />
      <p className="max-w-sm text-lg font-semibold leading-snug text-white">{kicker}</p>
    </div>
  );
}
