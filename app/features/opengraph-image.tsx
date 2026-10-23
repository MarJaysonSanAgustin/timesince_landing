import { ImageResponse } from 'next/og';
import { OgFrame } from '@/components/og-frame';
import { ogFonts, OG_SIZE } from '@/lib/og';
export const alt = 'TimeSince features';
export const size = OG_SIZE;
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<OgFrame kicker="TIMESINCE · FEATURES" title="Small tools for remembering." stubLabel="FEATURES" stubValue="11 FEATURES" />, { ...size, fonts: ogFonts() }); }
