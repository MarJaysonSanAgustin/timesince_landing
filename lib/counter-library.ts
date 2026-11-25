export const librarySlug = 'premade-counters';
export const libraryPath = `/guides/${librarySlug}`;

// English titles, browse sections and defaults follow kailan/lib/data/explore_ideas.dart.
// The log examples below are editorial choices a reader can adapt.
export const counterCollections = [
  {
    slug: 'home-and-car',
    title: 'Home and car upkeep',
    deck: 'Remember when you last descaled the coffee maker, replaced a filter or changed the oil.',
    setup: 'If you know the date of the last job, use it as the Start date. Check the reminder before saving. Its interval counts from the last log, so doing the job moves the next notification.',
    counters: [
      {
        name: 'Descale coffee maker',
        section: 'Kitchen',
        log: 'Log once when the descaling cycle is finished. Next time the machine needs attention, you can see how long it’s been since the last clean.',
        settings: 'This idea starts without a reminder. If you have two machines, put the machine’s name in the counter title.',
      },
      {
        name: 'Replace water filter',
        section: 'Around the house',
        log: 'Log when the new filter goes into the pitcher or fridge. Put the model number in Notes so you can find it when you buy the next one.',
        settings: 'The two-month reminder starts switched on. Change it to suit your filter or switch it off before saving.',
      },
      {
        name: 'Change engine oil',
        section: 'Car',
        log: 'Log the completed oil change. If a shop did the work, the date and mileage on the receipt are a good place to start.',
        settings: 'The preset has a six-month reminder. Adjust it for your car. Pro includes optional Odometer and Amount spent number fields. On Free, you can write both in Notes.',
      },
    ],
    guide: { href: '/guides/tracking-irregular-chores', title: 'How to track irregular chores' },
  },
  {
    slug: 'staying-in-touch',
    title: 'Staying in touch',
    deck: 'Keep the date of a call, a visit or a card you put in the mail.',
    setup: 'You can give each counter a familiar name, such as “Call Dad.” Use the date of your last conversation or visit as the Start date if you remember it.',
    counters: [
      {
        name: 'Call parents',
        section: 'People',
        log: 'Log after you’ve spoken. If the call goes to voicemail, you can leave the counter showing the time since you last talked.',
        settings: 'A weekly reminder comes switched on. Turn it off if you’d prefer to check the date whenever someone comes to mind.',
      },
      {
        name: 'Visit grandparents',
        section: 'People',
        log: 'Log once when you visit. A weekend stay can be one entry, with a note about the photo album you looked through together.',
        settings: 'There’s no preset reminder. You can name the counter for the person you visit.',
      },
      {
        name: 'Send a physical card',
        section: 'People',
        log: 'Log the day you mail the envelope. The date will still be there if you wonder whether you sent it.',
        settings: 'There’s no preset reminder. Use Notes for the recipient’s name or the occasion.',
      },
    ],
    guide: { href: '/guides/log-a-habit-without-opening-the-app', title: 'How to log a call from your Home Screen' },
  },
  {
    slug: 'quitting',
    title: 'Quitting',
    deck: 'Choose what counts as a reset and keep a record of the time between resets.',
    setup: 'These ideas open as quit counters, with no preset reminder. Set the Start date to when your break began. The counter then counts up on its own.',
    counters: [
      {
        name: 'No fast food',
        section: 'Quitting',
        log: 'If you’re taking a break from drive-through meals, reset after you have one. Eating at home needs no entry.',
        settings: 'You can use the reason field to say what you’re counting. For example, “A drive-through meal on the way home.”',
      },
      {
        name: 'No doomscrolling',
        section: 'Quitting',
        log: 'Decide which kind of scrolling you want to count. If it’s reading the news feed in bed, reset after a night when you do that.',
        settings: 'Rename the counter “Late-night news feed” if that makes your own rule easier to remember.',
      },
      {
        name: 'No energy drinks',
        section: 'Quitting',
        log: 'If you’re counting time between energy drinks, reset when you drink one. Buying a can to keep in the fridge can sit outside your rule.',
        settings: 'Set the start to the last drink you remember. A later reset starts a new run and keeps the earlier one in your history.',
      },
    ],
    guide: { href: '/guides/quitting-with-a-counter-that-climbs', title: 'What happens to your history after a reset' },
  },
];

export function getCounterCollection(slug: string) {
  return counterCollections.find((collection) => collection.slug === slug);
}
