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
    faq: 'FAQ',
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
