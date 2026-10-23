import { SITE } from '@/lib/site';

/**
 * Where a CTA lives. A union rather than a free string so a typo fails `tsc`
 * instead of silently splitting a campaign in App Store Connect.
 */
export type CtaPlacement =
  | 'offsite_shortlink'
  | 'offsite_qr'
  | 'offsite_discord'
  | 'offsite_directory'
  | 'web_home_hero'
  | 'web_home_footer'
  | 'web_header'
  | 'web_footer'
  | 'web_faq'
  | 'web_404'
  | 'web_guides_hub'
  | 'web_features_hub'
  | 'web_scenarios_hub'
  | `web_feature_${string}`
  | `web_scenario_${string}`
  | `web_guide_${string}`;

/**
 * Direct App Store link with Apple's campaign params appended at render time.
 *
 * Deliberately NOT an internal redirect: a hop costs 100-300ms on mobile on the
 * one click that matters, and `ct` lands in App Analytics either way. The
 * /go/app-store route exists only as a stable off-site short link.
 */
export function appStoreUrl(placement: CtaPlacement): string {
  const url = new URL(SITE.appStoreUrl);
  url.searchParams.set('ct', placement);
  url.searchParams.set('mt', '8');
  return url.toString();
}
