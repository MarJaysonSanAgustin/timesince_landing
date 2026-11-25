import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { OgFrame } from '@/components/og-frame';
import { counterCollections, getCounterCollection } from '@/lib/counter-library';
import { ogFonts, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return counterCollections.map(({ slug }) => ({ collection: slug }));
}

export default async function OgImage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const entry = getCounterCollection(collection);
  if (!entry) notFound();
  return new ImageResponse(
    <OgFrame kicker="COUNTER LIBRARY" title={entry.title} label="EXPLORE" value={`${entry.counters.length} COUNTERS`} />,
    { ...size, fonts: ogFonts() },
  );
}
