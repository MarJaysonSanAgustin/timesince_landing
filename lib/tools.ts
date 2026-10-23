import type { LucideIcon } from 'lucide-react';
import { CalendarClock, CalendarRange, Activity } from 'lucide-react';
import type { Accent } from '@/lib/accent';

/**
 * The free browser tools.
 *
 * These are the app's own arithmetic, given away. "How many days since…" is a
 * question people already type into a search box, and answering it honestly is
 * both the best introduction to interval tracking and a fair demonstration of
 * what the app does continuously.
 *
 * Every one runs entirely in the browser: no network call, nothing uploaded,
 * no analytics on the input. That is the same claim the app makes, and it has
 * to be true here for it to mean anything there.
 */
export interface Tool {
  slug: string;
  /** Short label for cards and nav. */
  nav: string;
  /** The H1. */
  title: string;
  /** <title>, which may lead with the keyword. */
  seoTitle: string;
  description: string;
  deck: string;
  icon: LucideIcon;
  accent: Accent;
  /** Rendered as the stub row on the hub card. */
  kicker: string;
}

export const TOOLS: Tool[] = [
  {
    slug: 'days-since',
    nav: 'Days since',
    title: 'How many days since a date?',
    seoTitle: 'Days Since Calculator | TimeSince',
    description:
      'Pick a date and see how long it has been, in days, weeks and months. Runs in your browser; nothing is uploaded.',
    deck: 'Pick the day something last happened. The count updates as you type, and nothing leaves your browser.',
    icon: CalendarClock,
    accent: 'brand',
    kicker: 'ONE DATE',
  },
  {
    slug: 'days-between',
    nav: 'Days between',
    title: 'How many days between two dates?',
    seoTitle: 'Days Between Dates Calculator | TimeSince',
    description:
      'The exact number of days, weeks and months between any two dates, worked out in your browser.',
    deck: 'Two dates in, the gap between them out. Useful for working out an interval you only have the endpoints for.',
    icon: CalendarRange,
    accent: 'cool',
    kicker: 'TWO DATES',
  },
  {
    slug: 'average-interval',
    nav: 'Average interval',
    title: 'What is your average interval?',
    seoTitle: 'Average Interval Calculator | TimeSince',
    description:
      'Paste the dates you did something and get the average gap, the shortest, the longest, and when it is next due.',
    deck: 'Paste the dates you did something. This is the arithmetic TimeSince runs continuously, shown once.',
    icon: Activity,
    accent: 'calm',
    kicker: 'A LIST OF DATES',
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
