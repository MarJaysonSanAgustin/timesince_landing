import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';
import { ogFonts, OG_SIZE } from '@/lib/og';
import { OgFrame } from '@/components/og-frame';

export const alt = SITE.title;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <OgFrame
        kicker="TIMESINCE"
        title="How long has it been?"
        label="TIME SINCE TRACKER"
        value="12 DAYS"
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
