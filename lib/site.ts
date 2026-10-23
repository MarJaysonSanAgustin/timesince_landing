/**
 * Site-wide facts. The single source of truth — if a number or a claim appears
 * twice in the codebase, it belongs here.
 *
 * Verified against the App Store listing and the app's own strings on
 * 2026-10-23. See docs/research.md for where each figure comes from.
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

  title: 'TimeSince — How long since you last did it?',
  description:
    'An iPhone tracker that counts the time since you last did something: chores, medication, calling home. No streaks, no due dates, nothing to break.',

  /** The App Store subtitle. The ADHD framing is the developer's own. */
  tagline: 'Days since counter & ADHD help',

  appStoreUrl: 'https://apps.apple.com/us/app/habit-tracker-timesince/id6769251517',
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

  legalLastUpdated: 'August 10, 2026',
  legalLastUpdatedIso: '2026-08-10',
} as const;
