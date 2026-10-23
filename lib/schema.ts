import { SITE } from '@/lib/site';
import { FEATURES } from '@/lib/features';

/**
 * JSON-LD builders. Pure functions, so the same facts feed the page and the
 * structured data and cannot drift apart.
 */

export function organization() {
  return {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.png`,
  };
}

/**
 * The app itself.
 *
 * Two corrections from the original (see docs/site-audit.md):
 * - `HealthApplication` → `LifestyleApplication`. The App Store lists it under
 *   Lifestyle, and claiming Health invites health-claim scrutiny the product
 *   does not need.
 * - `offers: { price: '0' }` misrepresented a freemium app with a paid tier.
 *   An AggregateOffer states the real range.
 *
 * `aggregateRating` is deliberately absent: the App Store shows 5.0 from six
 * ratings, which is far too few to publish, quite apart from the policy risk of
 * self-reported ratings on your own product page.
 */
export function softwareApplication() {
  const { currency, monthly, yearly, lifetime } = SITE.pricing;
  return {
    '@type': 'SoftwareApplication',
    name: SITE.fullName,
    alternateName: SITE.name,
    description: SITE.description,
    url: SITE.url,
    applicationCategory: 'LifestyleApplication',
    applicationSubCategory: 'Interval tracker',
    operatingSystem: `iOS ${SITE.minimumIos}`,
    downloadUrl: SITE.appStoreUrl,
    installUrl: SITE.appStoreUrl,
    author: { '@type': 'Person', name: SITE.developerName, url: `${SITE.url}/about` },
    featureList: FEATURES.map((f) => f.nav),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency,
      lowPrice: '0',
      highPrice: lifetime,
      offerCount: 4,
      offers: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: currency },
        { '@type': 'Offer', name: 'TimeSince Pro Monthly', price: monthly, priceCurrency: currency },
        { '@type': 'Offer', name: 'TimeSince Pro Yearly', price: yearly, priceCurrency: currency },
        { '@type': 'Offer', name: 'TimeSince Pro Lifetime', price: lifetime, priceCurrency: currency },
      ],
    },
  };
}

export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organization(), softwareApplication()],
  };
}
