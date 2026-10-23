import type { LucideIcon } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import {
  Palette,
  BarChart2,
  Lock,
  Pencil,
  Layers,
  LayoutGrid,
  Mic,
  Nfc,
  Ban,
  BellRing,
  CloudCheck,
} from 'lucide-react';

import customImg from '@/assets/features/custom.png';
import rhythmImg from '@/assets/features/rhythm.png';
import privateImg from '@/assets/features/private.png';
import customInputsImg from '@/assets/features/custom-inputs.png';
import timelineImg from '@/assets/features/timeline.png';
import widgetImg from '@/assets/features/widget.png';
import siriImg from '@/assets/features/siri.png';
import nfcImg from '@/assets/features/nfc.png';
import quitImg from '@/assets/features/quit.png';
import remindersImg from '@/assets/features/reminders.png';
import icloudImg from '@/assets/features/icloud.png';

import type { Accent } from '@/lib/accent';

export interface Feature {
  /** URL segment for /features/<slug>, and the key content files reference. */
  slug: string;
  /** Short label for nav, cards, and SoftwareApplication.featureList. */
  nav: string;
  /** Heading on the feature's own page. */
  h1: string;
  /** Homepage heading, split so the tail can carry the accent gradient. */
  homeHeadline: { lead: string; emphasis: string };
  deck: string;
  icon: LucideIcon;
  image: StaticImageData;
  alt: string;
  accent: Accent;
  tier: 'free' | 'pro';
  /** A hardware or OS requirement worth stating up front. */
  requires?: string;
}

/**
 * The 11 features, lifted verbatim from the homepage's copy.
 *
 * This replaces eleven copy-pasted markup blocks. One source now feeds the
 * homepage, the /features hub, every /features/<slug> page, and the structured
 * data — which is also how the homepage gains 11 internal links.
 */
export const FEATURES: Feature[] = [
  {
    slug: 'event-customization',
    nav: 'Event customization',
    h1: 'Dynamic event customization',
    homeHeadline: { lead: 'Dynamic Event', emphasis: 'Customization' },
    deck: 'Customize events using a rich spectrum of curated, premium color palettes, intuitive emoji icons, and custom image covers for full personalization.',
    icon: Palette,
    image: customImg,
    alt: 'Choosing a color and icon for a new event',
    accent: 'brand',
    tier: 'free',
  },
  {
    slug: 'rhythm-analytics',
    nav: 'Rhythm analytics',
    h1: 'Find your natural rhythm',
    homeHeadline: { lead: 'Find your natural', emphasis: 'rhythm.' },
    deck: 'No rigid schedules, just insights into how you actually spend your time. We analyze your logging history to calculate average intervals and render beautiful dynamic charts displaying interval trends.',
    icon: BarChart2,
    image: rhythmImg,
    alt: 'Rhythm Analytics',
    accent: 'warm',
    tier: 'free',
  },
  {
    slug: 'hidden-events',
    nav: 'Hidden events',
    h1: 'Keep it personal',
    homeHeadline: { lead: 'Keep it', emphasis: 'personal.' },
    deck: 'Lock sensitive habits and routines behind FaceID. TimeSince features a dedicated hidden layer shielded by biometric security, fully masked from the main UI and encrypted locally.',
    icon: Lock,
    image: privateImg,
    alt: 'Privacy-First Hidden Events',
    accent: 'calm',
    tier: 'pro',
  },
  {
    slug: 'custom-logging',
    nav: 'Custom logging fields',
    h1: 'Advanced custom logging',
    homeHeadline: { lead: 'Advanced Custom', emphasis: 'Logging' },
    deck: 'Go far beyond simple date-and-time stamps. Define custom inputs for each event: numbers for doses or costs (with a built-in calculator), text fields for detailed journaling, or photos for visual evidence.',
    icon: Pencil,
    image: customInputsImg,
    alt: 'Advanced Custom Logging',
    accent: 'cool',
    tier: 'pro',
  },
  {
    slug: 'timeline',
    nav: 'Timeline',
    h1: 'A beautiful timeline',
    homeHeadline: { lead: 'A Beautiful', emphasis: 'Timeline' },
    deck: 'Keep your habits, events, and routines perfectly organized in a stunning timeline. Easily visualize your history, track your intervals, and capture the natural rhythm of your life in one place.',
    icon: Layers,
    image: timelineImg,
    alt: 'A Beautiful Timeline',
    accent: 'brand',
    tier: 'free',
  },
  {
    slug: 'home-screen-widget',
    nav: 'Home screen widget',
    h1: 'Logging you don’t have to remember',
    homeHeadline: { lead: 'Logging you don’t have to', emphasis: 'remember.' },
    deck: 'The best log is the one you never had to remember to make. Add the TimeSince widget to your home screen and tap once to log or reset an event, no need to unlock into the app.',
    icon: LayoutGrid,
    image: widgetImg,
    alt: 'TimeSince home screen widget',
    accent: 'cool',
    tier: 'free',
  },
  {
    slug: 'siri-shortcuts',
    nav: 'Siri & Shortcuts',
    h1: 'Just say “log it.”',
    homeHeadline: { lead: 'Just say', emphasis: '“log it.”' },
    deck: 'Ask Siri to log or reset any event, or ask how long it’s been, right from Siri, Spotlight, the Shortcuts app, or the Action Button.',
    icon: Mic,
    image: siriImg,
    alt: 'Logging an event with Siri',
    accent: 'warm',
    tier: 'pro',
  },
  {
    slug: 'nfc-tags',
    nav: 'NFC tap-to-log',
    h1: 'Tap a tag, done',
    homeHeadline: { lead: 'Tap a tag,', emphasis: 'done.' },
    deck: 'Pair a cheap NFC sticker with any event, then stick it somewhere relevant: a pillbox, a water filter, a fridge. Tapping your phone against it logs that event instantly, no app required.',
    icon: Nfc,
    image: nfcImg,
    alt: 'Logging an event by tapping an NFC tag',
    accent: 'calm',
    tier: 'pro',
    requires: 'An NTAG215 tag',
  },
  {
    slug: 'quitting-mode',
    nav: 'Quitting mode',
    h1: 'Quitting something? Climb, don’t break.',
    homeHeadline: { lead: 'Quitting something?', emphasis: 'Climb, don’t break.' },
    deck: 'Turn on Quitting mode and your counter climbs for as long as you stay away from it. If you slip, logging a reset just starts the count again, with no penalty, no lost history, no shame.',
    icon: Ban,
    image: quitImg,
    alt: 'A counter tracking days since quitting a habit',
    accent: 'alert',
    tier: 'free',
  },
  {
    slug: 'reminders',
    nav: 'Reminders & alarms',
    h1: 'Reminders that actually reach you',
    homeHeadline: { lead: 'Reminders that', emphasis: 'actually reach you.' },
    deck: 'Set up to 5 reminders per event, one-time or repeating, at a custom time or relative to your last log. On supported devices, alarms can ring through silent mode and Focus so the important ones never get missed.',
    icon: BellRing,
    image: remindersImg,
    alt: 'Reminders scheduled for an event',
    accent: 'alert',
    tier: 'free',
    requires: 'iOS 26+ for alarms through silent mode',
  },
  {
    slug: 'icloud-backup',
    nav: 'Encrypted iCloud backup',
    h1: 'Your data, backed up to your iCloud',
    homeHeadline: { lead: 'Your data, backed up to', emphasis: 'your iCloud.' },
    deck: 'Your database is encrypted on your device from the start. Turn on sync and a copy goes straight to your own private iCloud account, never to a server we run. It’s free for everyone, and it stays off until you switch it on.',
    icon: CloudCheck,
    image: icloudImg,
    alt: 'iCloud backup enabled in Settings',
    accent: 'cool',
    tier: 'free',
  },
];

export function getFeature(slug: string): Feature | undefined {
  return FEATURES.find((f) => f.slug === slug);
}
