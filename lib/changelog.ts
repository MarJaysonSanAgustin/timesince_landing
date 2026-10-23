/**
 * Release history, transcribed from the App Store listing on 2026-10-23.
 *
 * The listing is the source of truth. Notes here are condensed rather than
 * copied wholesale — the App Store entries run long, and a changelog page
 * wants the shape of each release, not its full text.
 *
 * Update this when a release ships. `latestVersion` feeds the
 * SoftwareApplication schema, so it is worth keeping current.
 */

export interface Release {
  version: string;
  /** ISO date, as shown on the App Store listing. */
  date: string;
  /** One short phrase naming what the release was about. */
  theme: string;
  deck: string;
  bullets: string[];
  /** An honest footnote where the listing itself is odd. */
  note?: string;
}

export interface RoadmapItem {
  title: string;
  note: string;
}

/**
 * From the public board's In Progress column.
 *
 * Deliberately excludes "Ability to duplicate an existing counter", which the
 * board still lists as In Progress but which shipped in 1.13 — the release
 * notes say so. Publishing it as upcoming would contradict our own changelog.
 */
export const ROADMAP: RoadmapItem[] = [
  {
    title: 'Customisable lock screen widget',
    note: 'Choosing which counter a lock screen widget shows, from inside the app rather than the iOS editor.',
  },
];

/** Newest first. */
export const RELEASES: Release[] = [
  {
    version: '1.13',
    date: '2026-10-22',
    theme: 'Milestones',
    deck: 'Badges you peel open, two reminder widgets, and a first run that builds a counter before it mentions Pro.',
    bullets: [
      '38 illustrated milestone badges in four families; a log that earns one opens it',
      'Two reminder widgets: a countdown to the next one, and a list of what is coming',
      'Duplicate a counter from Edit or the long-press menu',
      'Fixes: widgets refresh immediately, and quit counters say Reason rather than Description',
    ],
  },
  {
    version: '1.12',
    date: '2026-10-15',
    theme: 'Sync fix',
    deck: 'An iCloud sync crash, and clearer onboarding copy across the translations.',
    bullets: ['Fixed a crash in iCloud sync', 'Updated onboarding copy and translations'],
  },
  {
    version: '1.11',
    date: '2026-10-13',
    theme: 'The ticket design',
    deck: 'The visual identity the site now shares: paper, receipts, and a tear line.',
    bullets: [
      'A consistent ticket-inspired design throughout the app',
      'Six paper colours and four background patterns',
      'Receipts when you create a counter, log a moment, or reset a quit counter',
      'Slide to confirm a reset, with the run you completed kept in view',
      'Quit-counter calendars show the days between resets',
      'A full-page Explore for finding your next counter',
    ],
  },
  {
    version: '1.10',
    date: '2026-10-06',
    theme: 'Four more languages',
    deck: 'German, Spanish and Chinese, plus a shorter first run.',
    bullets: [
      'German, Spanish and Chinese (Simplified and Traditional)',
      'Follows your iPhone language, or pick a different one for TimeSince alone',
      'Notification permission is asked when you save your first reminder, not before',
      'A shorter, lighter first run',
    ],
  },
  {
    version: '1.9',
    date: '2026-09-20',
    theme: 'Timeline and widgets',
    deck: 'A calmer Timeline, widgets that hold more than one counter, and a week that starts on your day.',
    bullets: [
      'The medium widget shows four counters and the large one eight, each with its own log button',
      'New Lock Screen widgets',
      'Every Timeline entry says what it is, with a calendar above the list',
      'Choose whether your week starts Sunday or Monday',
      'Reminders can start on a date you pick',
    ],
  },
  {
    version: '1.8',
    date: '2026-09-03',
    theme: 'Stats, and real units',
    deck: 'Reports that describe your timing instead of scoring it, and 162 counter ideas in the + button.',
    bullets: [
      'The + button opens 162 counter ideas, refreshed each time',
      'Me becomes Stats; Settings returns as a tab',
      'Quit counters get their own collapsible section',
      'Rhythm reports describe timing in real units rather than a consistency score',
      'Weekly reports show daily activity without comparing you to a target',
    ],
  },
  {
    version: '1.7',
    date: '2026-08-24',
    theme: 'A page about you',
    deck: 'A weekly report made on your phone, and a consistency dial that describes rather than scores.',
    bullets: [
      'A fourth tab reading your counters three ways: rhythm, quit, and ready when you are',
      'A weekly report built on your phone and sent nowhere',
      'The consistency dial is a marker between Flexible and Clockwork, with neither end the goal',
      'Add to Siri, one tap per counter',
    ],
  },
  {
    version: '1.6',
    date: '2026-08-23',
    theme: 'Your whole history at once',
    deck: 'A multi-year calendar, shareable cards, and an NFC tap that logs without opening anything.',
    bullets: [
      'A multi-year calendar view, one strip per year',
      'Share a card of four spans, on a light, dark or transparent ground',
      'Confetti on log and a printed receipt on a quit reset, each with a switch',
      'An NFC tap logs without opening a page first',
    ],
  },
  {
    version: '1.5.1',
    date: '2026-08-13',
    theme: 'NFC, Siri and private sync',
    deck: 'The release that made logging possible without opening the app, and backups possible without a server.',
    bullets: [
      'Pair an NFC sticker with a counter; a tap logs and resets it',
      'Ready-made Siri phrases for every counter, or name a shorter one yourself',
      'Private iCloud sync to your own container, optional and off until you turn it on',
      'Erase Everywhere: wipe this device alone, or the iCloud copy with it',
      'Onboarding rewritten as a told story about broken streaks',
    ],
  },
  {
    version: '1.4',
    date: '2026-07-21',
    theme: 'Polish',
    deck: 'Interface polish and faster response times.',
    bullets: ['Polished UI and faster response times', 'Bug fixes and improvements'],
  },
  {
    version: '1.3',
    date: '2026-07-02',
    theme: 'Onboarding and free notes',
    deck: 'A redesigned first run, and notes free for everyone.',
    bullets: [
      'Onboarding redesigned with curated templates and a personalised setup',
      'Notes are free for everyone; numbers and photos stay Pro',
      'A new counter picks a random colour from the palette',
    ],
    note: 'The App Store lists the same notes for 1.2 and 1.3.',
  },
  {
    version: '1.2',
    date: '2026-06-30',
    theme: 'Onboarding and free notes',
    deck: 'A redesigned first run, and notes free for everyone.',
    bullets: [
      'Onboarding redesigned with curated templates and a personalised setup',
      'Notes are free for everyone; numbers and photos stay Pro',
      'A new counter picks a random colour from the palette',
    ],
  },
  {
    version: '1.1',
    date: '2026-06-19',
    theme: 'Quitting mode',
    deck: 'The counter that climbs, plus colour on the counters page and widgets.',
    bullets: [
      'Quit Habit Mode: track how long it has been since you stopped',
      'New colour options for the counters page and widgets',
      'Share milestones and progress',
      'Upcoming and overdue counters visible on the Timeline',
    ],
  },
];

export const latestVersion = RELEASES[0].version;
export const latestReleaseDate = RELEASES[0].date;
