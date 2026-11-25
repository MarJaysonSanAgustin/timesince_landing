/**
 * Site-wide facts. The single source of truth — if a number or a claim appears
 * twice in the codebase, it belongs here.
 *
 * Product facts checked against the US App Store on 2026-11-22.
 * See docs/content-accuracy.md for release and entitlement evidence.
 */
export const SITE = {
  /**
   * The canonical host, and it must match what production actually serves.
   *
   * The apex 308-redirects to www at the DNS level, so every canonical tag,
   * og:url, JSON-LD URL and sitemap entry built from the apex was naming a URL
   * that immediately redirects. Harmless per page, wasteful across 68 of them.
   * Everything else derives from this one value.
   */
  url: 'https://www.timesinceapp.com',
  name: 'TimeSince',

  /**
   * The App Store's own name, used for `SoftwareApplication.name`.
   * Deliberately not "Habit & Chore Tracker" — the listing has no "habit" in
   * its name, and neither should we. See docs/positioning.md.
   */
  fullName: 'Time Since Tracker — TimeSince',

  title: 'TimeSince — Time Since Tracker for iPhone',
  description:
    'Track how long it’s been since something last happened. Keep a history of recurring events, count from important dates, and see your counters on your iPhone.',

  /** The App Store subtitle. The ADHD framing is the developer's own. */
  tagline: 'Days since counter & ADHD help',

  appStoreUrl: 'https://apps.apple.com/us/app/time-since-tracker-timesince/id6769251517',
  appStoreId: '6769251517',
  supportUrl: 'https://timesince.userjot.com',
  email: 'mjsanagustin.dev@gmail.com',

  /** Named author for `Article.author` — the E-E-A-T anchor for every guide. */
  developerName: 'Mar San Agustin',

  /** Free tier ceiling. The app calls them counters, not events. */
  freeCounterLimit: 3,
  minimumIos: '17.6',

  pricing: {
    currency: 'USD',
    monthly: '1.99',
    yearly: '14.99',
    lifetime: '39.99',
  },

  /** Governing law named in the Terms. */
  jurisdiction: 'the Philippines',

  legalLastUpdated: 'August 10, 2026',
  legalLastUpdatedIso: '2026-08-10',
} as const;
