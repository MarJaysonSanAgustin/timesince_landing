import { NextResponse } from 'next/server';
import { SITE } from '@/lib/site';
import { getGuides } from '@/lib/content';
import { CLUSTER_LABELS, CLUSTERS } from '@/lib/content/schema';

export const dynamic = 'force-static';

export function GET() {
  const guides = getGuides();

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.name} is an iOS interval tracker: it measures the time since you last did something, instead of daily streaks. Logging a counter resets it; missing a day never breaks anything. People track chores, medication, car maintenance, calls home, migraines, plants, and habits they are building or quitting. The local database is encrypted with SQLCipher. Free includes up to three active counters, log notes, widgets, archiving and browsing the archive list. Optional private iCloud sync merges changes between iPhones. Dated, encrypted iCloud backups can restore this phone to an earlier state. Both are free. TimeSince Pro adds unlimited active counters, hiding, opening and unarchiving archived counters, photo and number fields, Siri and Shortcuts, NFC pairing, session timers on interval counters, personal goals, and portable JSON export and import. US pricing is $1.99 monthly, $14.99 yearly or $39.99 for lifetime access. iPhone only, iOS ${SITE.minimumIos}+.`,
    '',
    '## App',
    `- [Homepage](${SITE.url}): overview and features`,
    `- [App Store](${SITE.appStoreUrl}): download for iOS`,
    '',
    '## FAQ',
    `- [Frequently asked questions](${SITE.url}/faq)`,
    '',
    '## Guides',
    `- [All guides](${SITE.url}/guides)`,
    ...CLUSTERS.flatMap((cluster) => {
      const inCluster = guides.filter((g) => g.data.cluster === cluster);
      if (inCluster.length === 0) return [];
      return [
        '',
        `### ${CLUSTER_LABELS[cluster]}`,
        ...inCluster.map(
          (g) => `- [${g.data.title}](${SITE.url}/guides/${g.slug}): ${g.data.description}`,
        ),
      ];
    }),
    '',
    '## Legal',
    `- [Privacy Policy](${SITE.url}/privacy)`,
    `- [Terms of Use](${SITE.url}/terms)`,
    '',
    '## Full content',
    `- [llms-full.txt](${SITE.url}/llms-full.txt): expanded FAQ answers and full guide content in one file`,
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
