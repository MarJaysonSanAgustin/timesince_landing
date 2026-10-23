import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getFeature, FEATURES } from '@/lib/features';
import { OgFrame } from '@/components/og-frame';
import { ogFonts, OG_SIZE } from '@/lib/og';
export const alt = 'TimeSince features';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;
export function generateStaticParams() { return FEATURES.map(d => ({ slug: d.slug })); }
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const doc = getFeature(slug); if (!doc) notFound();
  return new ImageResponse(<OgFrame kicker="TIMESINCE · FEATURES" title={doc.nav} stubLabel="WHEN DID I LAST…?" stubValue="FEATURES" />, { ...size, fonts: ogFonts() });
}
