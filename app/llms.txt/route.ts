import { NextResponse } from 'next/server';
import { SITE } from '../../lib/site';
import { getAllPosts } from '../../lib/blog';

export function GET() {
  const posts = getAllPosts();

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.name} is an iOS habit, chore, and routine tracker that measures elapsed time instead of daily streaks. Logging an event resets its counter; missing a day never breaks anything. Data is stored locally on-device, encrypted, with optional backup to the user's own private iCloud account; there is no developer-operated server. iCloud sync is free for everyone and off by default. Free tier: up to 3 active events. TimeSince Pro (subscription or one-time lifetime purchase) adds unlimited events, hidden events, custom logging fields, NFC pairing, Siri Shortcuts, and file export.`,
    '',
    '## App',
    `- [Homepage](${SITE.url}): overview and features`,
    `- [App Store](${SITE.appStoreUrl}): download for iOS`,
    '',
    '## FAQ',
    `- [Frequently asked questions](${SITE.url}/faq)`,
    '',
    '## Blog',
    ...posts.map((post) => `- [${post.title}](${SITE.url}/blog/${post.slug}): ${post.description}`),
    '',
    '## Legal',
    `- [Privacy Policy](${SITE.url}/privacy)`,
    `- [Terms of Use](${SITE.url}/terms)`,
    '',
    '## Full content',
    `- [llms-full.txt](${SITE.url}/llms-full.txt): expanded FAQ answers and full post content in one file`,
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
