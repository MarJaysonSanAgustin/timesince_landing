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
      "TimeSince is a habit, chore, and routine tracker that measures how long it's been since you last did something, instead of demanding an unbroken daily streak.",
    featured: true,
  },
  {
    category: 'Getting started',
    question: 'How is it different from a streak tracker?',
    answer:
      "Most trackers reset to zero and treat that as failure. TimeSince just keeps counting: logging an event resets the timer, but missing a day never breaks anything or wipes out progress.",
    featured: true,
  },
  {
    category: 'Getting started',
    question: 'Do I need an account?',
    answer:
      'No. There’s no sign-up, no email, and no login. TimeSince works fully offline the moment you install it.',
    featured: true,
  },
  {
    category: 'Getting started',
    question: 'Is TimeSince available on Android?',
    answer: 'Not yet. TimeSince is currently iOS only.',
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
      "Anything without a fixed schedule: watering plants, replacing a water filter, calling a family member, therapy sessions, car maintenance, or a habit you're trying to quit.",
    featured: true,
  },
  {
    category: 'Using it',
    question: 'Can I track quitting something, like smoking?',
    answer:
      'Yes: turn on Quitting mode for an event and the counter climbs for as long as you go without it. If you slip, logging a reset just starts the count again. No penalty, no lost history.',
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
      'Yes, three ways: tap the home screen widget, ask Siri (or use the Action Button or Shortcuts app), or tap your phone against a paired NFC sticker.',
  },
  {
    category: 'Using it',
    question: 'What are NFC tags and where do I get them?',
    answer:
      'They’re inexpensive NTAG215 stickers you can buy online. Pair one with an event in TimeSince, stick it somewhere relevant (a pillbox, a water filter, a fridge), and tapping your phone on it logs that event instantly.',
  },
  {
    category: 'Using it',
    question: 'Can I attach notes, photos, or numbers to a log?',
    answer:
      'Yes, with TimeSince Pro. Add a text note, a photo, or a number (with a built-in calculator keypad, handy for doses or costs) to any log entry.',
  },
  {
    category: 'Using it',
    question: 'Can I hide sensitive events?',
    answer:
      'Yes. Hidden events are removed from the main list and unlock only with Face ID or Touch ID.',
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
    answer: 'No. There’s no account and no server-side copy, so we have nothing to see.',
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
      'If you turn it on, TimeSince writes a copy of your data to your own private iCloud account, not to a server we run. It’s free for everyone, and it stays off until you switch it on.',
  },
  {
    category: 'Privacy & data',
    question: 'Can I export my data?',
    answer:
      'Yes, anytime, as a JSON file you control. You can import it back on the same device or a new one.',
  },
  {
    category: 'Privacy & data',
    question: 'What happens to my data if I delete the app?',
    answer:
      'Local data is removed with the app. If you had iCloud backup enabled, your last backup remains in your iCloud until you delete it yourself.',
  },
  // Pricing
  {
    category: 'Pricing',
    question: "What's included for free?",
    answer:
      'Up to 3 active events, with logging, reminders, categories, the home screen widget, and iCloud sync. No time limit, no trial required.',
    featured: true,
  },
  {
    category: 'Pricing',
    question: 'What does TimeSince Pro add?',
    answer:
      'Unlimited events, hidden events, archiving, custom logging fields (notes, photos, numbers), NFC pairing, Siri Shortcuts, and exporting your data to a file. iCloud sync is not part of Pro; it’s free for everyone.',
  },
  {
    category: 'Pricing',
    question: 'Subscription or one-time purchase?',
    answer:
      'Both are offered: an auto-renewable subscription or a one-time lifetime purchase. See the App Store listing for current pricing.',
  },
  {
    category: 'Pricing',
    question: 'What happens if my subscription lapses?',
    answer:
      'If you have more than 3 active events, you’ll choose up to 3 to keep active; the rest are archived, not deleted, and come back automatically if you resubscribe.',
  },
];

export const faqCategories = ['Getting started', 'Using it', 'Privacy & data', 'Pricing'] as const;
