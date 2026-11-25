export interface FaqItem {
  question: string;
  answer: string;
  category: 'Getting started' | 'Using it' | 'Privacy & data' | 'Pricing';
  featured?: boolean;
}

export const faqs: FaqItem[] = [
  // Getting started
  {
    category: 'Getting started',
    question: 'What is TimeSince?',
    answer:
      "TimeSince is an iPhone app that shows how long it’s been since a date or your last entry. Each counter keeps its own history.",
    featured: true,
  },
  {
    category: 'Getting started',
    question: 'How is it different from a streak tracker?',
    answer:
      'The counter keeps counting between entries. You can come back after a gap and pick up with your whole history intact.',
    featured: true,
  },
  {
    category: 'Getting started',
    question: 'Do I need an account?',
    answer:
      'No. You can create counters and log offline without signing up. Optional iCloud backups use your own Apple Account.',
    featured: true,
  },
  {
    category: 'Getting started',
    question: 'Is TimeSince available on Android?',
    answer:
      'TimeSince is available only for iPhone.',
  },
  {
    category: 'Getting started',
    question: 'What iOS version do I need?',
    answer:
      "iOS 17.6 or later. Alarm-style reminders that ring through silent mode require iOS 26 or later; on earlier versions you'll get a standard local notification instead.",
  },
  // Using it
  {
    category: 'Using it',
    question: 'What kinds of things can I track?',
    answer:
      "You can track something that repeats, count the time since you quit a habit, or remember a date that matters to you.",
    featured: true,
  },
  {
    category: 'Using it',
    question: 'Can I track quitting something, like smoking?',
    answer:
      'Yes: turn on Quitting mode for a counter and the counter climbs for as long as you go without it. If you slip, logging a reset just starts the count again. No penalty, no lost history.',
  },
  {
    category: 'Using it',
    question: 'What happens if I miss a day or slip up?',
    answer:
      'Nothing bad. TimeSince has no daily streak to break; the counter simply reflects how long it’s actually been.',
  },
  {
    category: 'Using it',
    question: 'Can I log something without opening the app?',
    answer:
      'The free Home Screen widget logs in one tap. With Pro, use a built-in Siri phrase or run a shortcut from the Action Button on a supported iPhone. You can also pair an NFC sticker with Pro and scan it to record the action.',
  },
  {
    category: 'Using it',
    question: 'What are NFC tags and where do I get them?',
    answer:
      'You can buy NTAG215 stickers online. With Pro, pair one with a counter and stick it where you do the task. Scan it to log an interval counter. For a quit counter, confirm the reset.',
  },
  {
    category: 'Using it',
    question: 'Can I attach notes, photos, or numbers to a log?',
    answer:
      'Notes are free. With Pro, you can add or change photo and number fields, such as a receipt or a cost. Number fields include a calculator. Existing fields still accept entries if Pro lapses.',
  },
  {
    category: 'Using it',
    question: 'Can I hide sensitive counters?',
    answer:
      'With Pro you can hide a counter from the main list. Use Face ID or Touch ID to open the hidden list.',
  },
  {
    category: 'Using it',
    question: 'Can I time a session or set a goal?',
    answer:
      'With Pro you can add a session timer to an interval counter. In version 1.16 you can run timers on several counters at once and control them from the Lock Screen. You can also set one goal per counter, such as three walks in a week or a week since your last reset. Completed goals stay in your history.',
  },
  // Privacy & data
  {
    category: 'Privacy & data',
    question: 'Where is my data stored?',
    answer:
      "On your device, in a local database encrypted with SQLCipher. We don't operate a server that stores your tracking data.",
    featured: true,
  },
  {
    category: 'Privacy & data',
    question: 'Can you see my data?',
    answer:
      'We have no access to your counter history. Your iPhone stores it locally, and any iCloud copies go to your own Apple Account.',
  },
  {
    category: 'Privacy & data',
    question: 'Is my data encrypted?',
    answer:
      'Yes. The database is encrypted, and the key lives in your device’s Keychain, not inside the app itself.',
  },
  {
    category: 'Privacy & data',
    question: 'How does iCloud backup work?',
    answer:
      'In Settings, open Your data, then Backups. One optional switch syncs changes between your iPhones and saves dated, encrypted backups in your private iCloud. Restoring a dated backup replaces the data on this iPhone. Sync, backups and iCloud restore are free.',
  },
  {
    category: 'Privacy & data',
    question: 'Can I export my data?',
    answer:
      'With Pro, you can export a portable JSON file and import it on an iPhone running TimeSince. This file is plain JSON. Keep it somewhere private.',
  },
  {
    category: 'Privacy & data',
    question: 'What happens to my data if I delete the app?',
    answer:
      'Deleting the app removes its local data. If you saved a copy in your private iCloud, you can restore it after reinstalling.',
  },
  // Pricing
  {
    category: 'Pricing',
    question: "What's included for free?",
    answer:
      'Up to three active counters with logging, notes, reminders, categories and widgets. You can archive counters, browse the archive list and use private iCloud sync and dated backups. The free tier has no time limit.',
    featured: true,
  },
  {
    category: 'Pricing',
    question: 'What does TimeSince Pro add?',
    answer:
      'Pro lets you keep unlimited active counters, hide counters, open archived details and unarchive counters. It also lets you add photo or number fields, add session timers, set goals, use Siri and Shortcuts, pair NFC tags, and export or import JSON files.',
  },
  {
    category: 'Pricing',
    question: 'Subscription or one-time purchase?',
    answer:
      'Both. TimeSince Pro is US$1.99 a month or US$14.99 a year, and there is a one-time lifetime purchase at US$39.99 that never renews. Prices may vary by region; the App Store shows what you will actually pay.',
  },
  {
    category: 'Pricing',
    question: 'What happens if my subscription lapses?',
    answer:
      'If you have more than three active counters when Pro ends, choose up to three to keep active. The others go into the archive with their history. You can browse the archive list for free. With Pro, you can open an archived counter or make it active again.',
  },
];

export const faqCategories = ['Getting started', 'Using it', 'Privacy & data', 'Pricing'] as const;
