import { SITE } from '@/lib/site';
import { allContent } from '@/lib/content';

export const dynamic = 'force-static';

/**
 * RSS 2.0. Hand-written rather than pulled in as a dependency: it is forty
 * lines, and the only hard part is the escaping, which a dependency would not
 * save anyone from reviewing.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const MAX_ITEMS = 50;

export function GET() {
  const items = allContent()
    .flatMap(({ basePath, docs }) => docs.map((doc) => ({ basePath, doc })))
    .sort((a, b) => b.doc.data.date.localeCompare(a.doc.data.date) || a.doc.slug.localeCompare(b.doc.slug))
    .slice(0, MAX_ITEMS);

  const modified = items.map(({ doc }) => doc.data.updated ?? doc.data.date).sort().at(-1);
  const lastBuild = modified ? new Date(`${modified}T00:00:00Z`) : undefined;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    ${lastBuild ? `<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>` : ''}
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(({ basePath, doc }) => {
    const url = `${SITE.url}${basePath}/${doc.slug}`;
    const pub = new Date(`${doc.data.date}T00:00:00Z`).toUTCString();
    return `    <item>
      <title>${escapeXml(doc.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escapeXml(doc.data.description)}</description>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
