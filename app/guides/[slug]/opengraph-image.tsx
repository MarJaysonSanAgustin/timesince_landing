import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getGuide, getGuides } from '@/lib/content';
import { CLUSTER_LABELS } from '@/lib/content/schema';
import { ogFonts, OG_SIZE } from '@/lib/og';
import { OgFrame } from '@/components/og-frame';

export const alt = 'TimeSince guide';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return new ImageResponse(
    (
      <OgFrame
        kicker="TimeSince"
        title={guide?.data.title ?? 'TimeSince'}
        label={guide ? CLUSTER_LABELS[guide.data.cluster].toUpperCase() : 'GUIDE'}
        value={guide?.data.kind === 'note' ? 'NOTE' : 'GUIDE'}
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
