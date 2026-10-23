import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getScenario, getScenarios } from '@/lib/content';
import { OgFrame } from '@/components/og-frame';
import { ogFonts, OG_SIZE } from '@/lib/og';
export const alt = 'TimeSince scenarios';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;
export function generateStaticParams() { return getScenarios().map(d => ({ slug: d.slug })); }
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const doc = getScenario(slug); if (!doc) notFound();
  return new ImageResponse(<OgFrame kicker="TIMESINCE · SCENARIOS" title={doc.data.title} stubLabel="WHEN DID I LAST…?" stubValue="SCENARIOS" />, { ...size, fonts: ogFonts() });
}
