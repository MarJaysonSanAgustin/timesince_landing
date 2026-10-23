import { ImageResponse } from 'next/og';
import { TOOLS } from '@/lib/tools';
import { ogFonts, OG_SIZE } from '@/lib/og';
import { OgFrame } from '@/components/og-frame';

export const alt = 'TimeSince tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <OgFrame
        kicker="TIMESINCE · TOOLS"
        title="Free date calculators that run in your browser"
        stubLabel="NO UPLOAD · NO ACCOUNT"
        stubValue={String(TOOLS.length).padStart(3, '0')}
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
