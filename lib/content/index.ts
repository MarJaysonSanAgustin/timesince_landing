import { loadCollection, type Doc } from '@/lib/content/load';
import { guideSchema, scenarioSchema, type GuideFrontmatter, type ScenarioFrontmatter } from '@/lib/content/schema';
import type { Locale } from '@/lib/i18n';

export type Guide = Doc<GuideFrontmatter>;

export function getGuides(locale?: Locale): Guide[] {
  return loadCollection('guides', guideSchema, locale);
}

export function getGuide(slug: string, locale?: Locale): Guide | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

export type Scenario = Doc<ScenarioFrontmatter>;
export function getScenarios(locale?: Locale): Scenario[] {
  return loadCollection('scenarios', scenarioSchema, locale);
}
export function getScenario(slug: string, locale?: Locale): Scenario | undefined {
  return getScenarios(locale).find((s) => s.slug === slug);
}

/** Everything the sitemap, llms.txt and the feed enumerate. */
export function allContent(locale?: Locale): { basePath: string; docs: (Guide | Scenario)[] }[] {
  return [{ basePath: '/guides', docs: getGuides(locale) }, { basePath: '/scenarios', docs: getScenarios(locale) }];
}
