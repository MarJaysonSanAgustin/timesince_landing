import { ImageResponse } from 'next/og';
import { TOOLS, getTool } from '@/lib/tools';
import { ogFonts, OG_SIZE } from '@/lib/og';
import { OgFrame } from '@/components/og-frame';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  return new ImageResponse(
    (
      <OgFrame
        kicker={`TOOL · ${tool?.kicker ?? ''}`}
        title={tool?.title ?? 'TimeSince'}
        stubLabel="RUNS IN YOUR BROWSER"
        stubValue="FREE"
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
