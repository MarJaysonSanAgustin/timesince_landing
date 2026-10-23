import { ImageResponse } from 'next/og';
import { OgFrame } from '@/components/og-frame';
import { ogFonts, OG_SIZE } from '@/lib/og';
export const alt = 'TimeSince scenarios';
export const size = OG_SIZE;
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<OgFrame kicker="TIMESINCE · SCENARIOS" title="When did I last…?" stubLabel="SCENARIOS" stubValue="PRACTICAL SETUPS" />, { ...size, fonts: ogFonts() }); }
