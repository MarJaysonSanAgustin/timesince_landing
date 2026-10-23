/**
 * Every user-facing string in the site chrome and content templates.
 *
 * Nothing user-facing belongs inline in JSX — that is the one decision that
 * makes adding a locale a translation job rather than a refactor of every
 * component. See PLAN.md §7.
 */
export const strings = {
  nav: {
    features: 'Features',
    guides: 'Guides',
    scenarios: 'Scenarios',
    faq: 'FAQ',
    whatsNew: "What's new",
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
    free: 'Free tier',
    pro: 'TimeSince Pro',
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
