/**
 * Every user-facing string in the site chrome and content templates.
 *
 * Nothing user-facing belongs inline in JSX — that is the one decision that
 * makes adding a locale a translation job rather than a refactor of every
 * component. See PLAN.md §7.
 */
export const strings = {
  home: {
    question: 'When did I last',
    activity: 'water the plants?',
    intro: 'TimeSince is an iPhone app for the things you do every so often. Log a watering or a call home, and your counter shows how long it’s been.',
    appStore: 'Download on the App Store',
    guideLink: 'Browse counter ideas',
    free: (limit: number) => `Up to ${limit} active counters free. No account needed.`,
    example: {
      label: 'Example counter',
      date: 'Oct 23',
      name: 'Water the plants',
      elapsed: '6 days',
      justLogged: 'Just now',
      since: 'since the last watering',
      recorded: 'watering logged',
      history: 'Watering history',
      dates: ['Oct 10', 'Oct 17'],
      log: 'Log a watering',
      undo: 'Undo example log',
    },
    benefitsHeading: 'From one log to the next',
    allFeatures: 'All features',
    benefits: [
      {
        slug: 'home-screen-widget',
        title: 'Log from your Home Screen',
        body: 'Just watered the plants? Tap the free widget to record it while the can is still in your hand.',
        link: 'See how the widget works',
      },
      {
        slug: 'custom-logging',
        title: 'Leave a note for next time',
        body: 'When you replace a water filter, add its model number in a free note. It’ll be there when you need another.',
        link: 'Explore log details',
      },
      {
        slug: 'rhythm-analytics',
        title: 'See how often you call home',
        body: 'See the average time between calls and how the gaps vary. Earlier calls stay in your history, even after a long break.',
        link: 'Read your intervals',
      },
    ],
    downloadHeading: 'Start with one counter',
    downloadBody: 'Pick something you often forget the date of. Explore has ready-made counters for calling your parents and replacing a water filter.',
    faq: 'Questions about TimeSince?',
  },
  nav: {
    features: 'Features',
    guides: 'Guides',
    scenarios: 'Scenarios',
    faq: 'FAQ',
    whatsNew: "What's new",
    about: 'About',
    tools: 'Tools',
    privacy: 'Privacy',
    terms: 'Terms',
    support: 'Feedback & Support',
    getApp: 'Get the App',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  footer: {
    product: 'Product',
    learn: 'Learn',
    company: 'Company',
    rights: 'All rights reserved.',
  },
  content: {
    breadcrumbHome: 'Home',
    problem: 'The situation',
    consequence: 'What gets difficult',
    help: 'How TimeSince helps',
    setup: 'A small setup',
    audience: 'For',
    included: 'Included in',
    tiers: { free: 'Free tier', mixed: 'Free and Pro', pro: 'TimeSince Pro' },
    tierCta: {
      free: 'This feature is included with your three free active counters.',
      mixed: 'Start with free notes. Pro lets you add photo and number fields.',
      pro: 'This feature is part of TimeSince Pro. You can start with three free counters.',
    },
    requires: 'Requires',
    featureUse: 'Put it to use',
    answerLabel: 'The short answer',
    relatedQuestions: 'Related questions',
    onThisPage: 'On this page',
    faqHeading: 'Frequently asked questions',
    relatedHeading: 'Keep reading',
    sourcesHeading: 'What this is based on',
    updatedOn: 'Updated',
    readGuide: 'Read the guide',
    notSolved: 'What TimeSince will not fix',
    solved: 'What TimeSince helps with',
    disclaimer:
      'This is educational information, not medical, legal, or financial advice. ' +
      'For anything affecting your health or safety, talk to a professional.',
  },
} as const;
