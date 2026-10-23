import { SITE } from '@/lib/site';

/**
 * The About page's content, as data.
 *
 * ⚠️ `draft` is true until the prose is real. While it is true the page 404s
 * in production and renders only in `next dev`, so placeholder text can never
 * ship — which matters here more than anywhere else on the site, because every
 * guide and scenario points its `Article.author` URL at /about.
 *
 * To publish: replace every TODO below, set `draft: false`, and add the nav
 * entry (lib/nav.ts, Company group). Questions to answer first are in
 * docs/about-interview.md.
 */

export interface AboutSection {
  heading: string;
  /** One paragraph per entry. */
  body: string[];
}

export const ABOUT = {
  draft: true,

  /** The H1. */
  title: `About ${SITE.name}`,
  /** The deck under it — the whole page in one sentence. */
  deck: 'TODO: one sentence. Vaultaire uses "An encrypted photo vault for iPhone, built and run by one person." Ours should name the product and the fact that one person makes it.',

  /** Shown as a stub row under the heading. */
  facts: [
    { label: 'MAKER', value: SITE.developerName },
    { label: 'SINCE', value: 'TODO: first release month, e.g. June 2026' },
    { label: 'BASED IN', value: 'TODO: or delete this row' },
  ],

  sections: [
    {
      heading: 'Who makes it',
      body: [
        `TODO: who you are, in the first person. Name, what you do, and that you build ${SITE.name} yourself. Two or three sentences.`,
      ],
    },
    {
      heading: 'Why one person matters',
      body: [
        'TODO: what being a solo developer actually changes for the person reading. Concrete, not a boast: you answer the feedback board yourself, there is no growth team deciding what to monetise, a declined feature is a decision you made and can explain.',
      ],
    },
    {
      heading: 'Background',
      body: [
        'TODO: what you did before, and anything that makes you a credible person to build this. This is the part search engines and readers both weigh. If you have shipped other apps, say so — Cammy is already listed on your App Store developer page.',
      ],
    },
    {
      heading: `Why I built ${SITE.name}`,
      body: [
        'TODO: the origin. What were you failing to track, and what did the existing apps get wrong for you? The strongest version is a specific thing you forgot, not a thesis about habit formation.',
        'TODO: optionally, why the anti-streak position is personal rather than a positioning exercise.',
      ],
    },
    {
      heading: 'How I build it',
      body: [
        'TODO: how decisions get made. The declined household-sharing request is a good concrete example — you turned down the most-voted feature because it would require a server. That single story does more work than any statement of values.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        `TODO: keep or adjust. Suggested: every message is read. The feedback board is public and the fastest route; email works too.`,
      ],
    },
  ] satisfies AboutSection[],
} as const;
