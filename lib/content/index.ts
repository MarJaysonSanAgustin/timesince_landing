import { loadCollection, type Doc } from '@/lib/content/load';
import { guideSchema, type GuideFrontmatter } from '@/lib/content/schema';
import type { Locale } from '@/lib/i18n';

export type Guide = Doc<GuideFrontmatter>;

export function getGuides(locale?: Locale): Guide[] {
  return loadCollection('guides', guideSchema, locale);
}

export function getGuide(slug: string, locale?: Locale): Guide | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

/** Everything the sitemap, llms.txt and the feed enumerate. */
export function allContent(locale?: Locale): { basePath: string; docs: Guide[] }[] {
  return [{ basePath: '/guides', docs: getGuides(locale) }];
}
