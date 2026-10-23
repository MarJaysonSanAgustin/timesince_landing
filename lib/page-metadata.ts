import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

/**
 * Metadata for a static page.
 *
 * `title` is the bare page name: Next applies the layout's `%s | TimeSince`
 * template to the <title> tag. Open Graph and Twitter titles do NOT get that
 * template — they are used verbatim — so the suffix is added here instead.
 * Leaving it off produced share cards titled just "Features" while the hub
 * next door said "Guides | TimeSince"; `check:seo` now catches that.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} | ${SITE.name}`;
  const image = { url: `${SITE.url}${path}/opengraph-image`, alt: socialTitle };

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { 'application/rss+xml': `${SITE.url}/feed.xml` },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
