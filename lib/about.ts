import { SITE } from '@/lib/site';

/**
 * The About page's content, as data.
 *
 * Written from the owner's own answers (docs/about-interview.md) and kept in
 * his words wherever they were already the right words. Nothing here is
 * invented: this is the one page on the site that cannot be sourced from the
 * App Store listing or the feedback board.
 */

export interface AboutSection {
  heading: string;
  body: string[];
}

export const ABOUT = {
  draft: false,

  title: `About ${SITE.name}`,
  deck: `An interval tracker for iPhone, built on weekends by one person who kept forgetting to call home.`,

  facts: [
    { label: 'MAKER', value: SITE.developerName },
    { label: 'SINCE', value: 'June 2026' },
    { label: 'BUILT', value: 'Weekends' },
  ],

  sections: [
    {
      heading: 'Who makes it',
      body: [
        `I am ${SITE.developerName}. I have been a full stack developer for ten years, which is my weekday job. ${SITE.name} is what I build at weekends, because mobile development is quick and fun in a way that a long-running work project never quite is, and because it is how I am teaching myself design.`,
        'There is no team. When you write on the feedback board, I am the one who answers.',
      ],
    },
    {
      heading: 'Why one person matters',
      body: [
        'It means every decision has someone who can explain it. When somebody asked for shared households, the answer was no for now, and the reason was that it would need a server sitting between you and your own data. That is a real trade, not a roadmap excuse, and I would rather say so plainly than let it sit silently in a backlog.',
        'It also means the free tier is generous because I want people to use the app, not because three counters is the number a growth model landed on. I am still working out what people actually want from this.',
      ],
    },
    {
      heading: 'Background',
      body: [
        'I started in college, without much money, renting hours at computer shops. When you are paying by the hour you learn to use the time properly, and I spent mine building desktop apps in Java and NetBeans.',
        'I was doing graphic design then too, taking gigs making posters and tarpaulins. That is the part that led here: I enjoyed designing the interfaces more than I expected to, and taught myself to program so I could build the things I had drawn.',
        'In college I also helped start an educational startup trying to spread technical knowledge across the country. I built a lot of mobile apps with Ionic there, and as the company grew we took on web design and development for clients. Ten years later, that is still roughly what I do.',
      ],
    },
    {
      heading: `Why I built ${SITE.name}`,
      body: [
        'I kept a notebook. Budgets, spending, the filters on the water and air purifiers, when the house last had a proper clean. My mother works overseas and my father and siblings live a province away, and some weeks I would realise I had not called any of them and had no idea how they were doing.',
        'The apps I tried all wanted something daily. Budget trackers, habit trackers, all of them built around logging every day and showing you a chain. None of the things in my notebook happen every day.',
        'Then there was the reading streak. I was two hundred days into one when I got sick and missed a week. Losing the number felt like losing the habit itself, and I did not read properly again for five months.',
        'The part that took me longer to notice is that the streak had already spoiled it before it broke. For those two hundred days I was not really reading. I was completing a day, so the number would survive until tomorrow. That is the whole reason this app counts up from the last time you did something and never resets itself.',
      ],
    },
    {
      heading: 'How I decide things',
      body: [
        'Mostly by asking whether a feature would make the app worse at the one thing it does.',
        `Streaks are the clearest case. People ask for them, and I understand why, but a streak is the exact mechanism that cost me five months of reading. Adding one would be the obvious commercial choice and I am not going to make it.`,
        'Sharing between people is the other one. It is asked for, it is reasonable, and it would require a server in the middle of something that currently has none. For now the answer is not yet, and I have said as much on the board rather than quietly leaving it open.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'The feedback board is public and it is the fastest way to reach me. I read everything that arrives there, and you can see what other people have asked for and add your weight to it. Email works too.',
      ],
    },
  ] satisfies AboutSection[],
} as const;
