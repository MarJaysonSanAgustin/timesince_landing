/**
 * The i18n seam.
 *
 * English is the only locale that ships today, and English URLs must never gain
 * a prefix — `/guides/x` stays `/guides/x` forever. When locales are turned on
 * (PLAN.md §7) `next-intl` runs with `localePrefix: 'as-needed'` and only the
 * non-default locales get one, so nothing already indexed moves.
 *
 * Everything internal routes through `localizedPath()` so a slug-translation
 * layer can be inserted later without touching call sites.
 */
export const LOCALES = ['en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function localizedPath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return `/${locale}${normalized}`;
}
