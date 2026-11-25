import { ContentLink } from '@/components/content/content-link';
import { TOOLS } from '@/lib/tools';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/page-metadata';
import { itemList } from '@/lib/schema';
import { serializeJsonLd } from '@/lib/json-ld';
import { PageLayout } from '@/components/site/page-layout';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { CtaBlock } from '@/components/content/cta-block';

export const metadata = pageMetadata(
  'Tools',
  'Free date calculators that run entirely in your browser: days since a date, days between two dates, and your average interval.',
  '/tools',
);

export default function ToolsHub() {
  const listJsonLd = itemList(
    TOOLS.map((tool) => ({ href: `/tools/${tool.slug}`, name: tool.title })),
    `${SITE.name} tools`,
  );

  return (
    <PageLayout width="wide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(listJsonLd) }}
      />

      <Breadcrumbs trail={[{ label: 'Tools' }]} />

      <header className="directory-header">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Tools</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          The arithmetic {SITE.name} runs continuously, available once and for free. Every one works
          entirely in your browser — no account, no upload, nothing kept.
        </p>
      </header>

      <ul className="grid gap-4 md:grid-cols-3">
        {TOOLS.map((tool) => (
          <li key={tool.slug}>
            <ContentLink
              href={`/tools/${tool.slug}`}
              heading="h2"
              icon={tool.icon}
              title={tool.title}
              deck={tool.deck}
              label={tool.kicker}
            />
          </li>
        ))}
      </ul>

      <CtaBlock
        placement="web_tools_hub"
        headline="Or let the app keep count"
        sub={`${SITE.name} does this for everything you track, continuously. Free for three counters.`}
      />
    </PageLayout>
  );
}
