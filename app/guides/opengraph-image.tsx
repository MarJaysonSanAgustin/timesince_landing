import { ImageResponse } from 'next/og';
import { getGuides } from '@/lib/content';
import { ogFonts, OG_SIZE } from '@/lib/og';
import { OgFrame } from '@/components/og-frame';

export const alt = 'TimeSince Guides';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OgImage() {
  const count = getGuides().length;
  return new ImageResponse(
    (
      <OgFrame
        kicker="TIMESINCE · GUIDES"
        title="Tracking what recurs on no fixed schedule"
        stubLabel="GUIDES"
        stubValue={String(count).padStart(3, '0')}
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
