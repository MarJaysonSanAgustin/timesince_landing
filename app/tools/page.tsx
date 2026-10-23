import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/page-metadata';
import { itemList } from '@/lib/schema';
import { serializeJsonLd } from '@/lib/json-ld';
import { ACCENT_CLASS } from '@/lib/accent';
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
    <div className="paper-dots">
      <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(listJsonLd) }}
        />

        <Breadcrumbs trail={[{ label: 'Tools' }]} />

        <header className="mt-6 mb-14">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Tools
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            The arithmetic {SITE.name} runs continuously, available once and for free. Every one
            works entirely in your browser — no account, no upload, nothing kept.
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className={`${ACCENT_CLASS[tool.accent]} stub group h-full transition-transform hover:-translate-y-0.5`}
                >
                  <div className="stub-block">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="meta mt-2" style={{ color: 'inherit', opacity: 0.6 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="stub-seam" />

                  <div className="stub-body flex flex-col">
                    <h2 className="text-base font-semibold leading-snug text-ink group-hover:underline">
                      {tool.title}
                    </h2>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{tool.deck}</p>
                    <div className="stub-row mt-3">
                      <span className="stub-label">{tool.kicker}</span>
                      <span aria-hidden="true" className="text-sm text-ube">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <CtaBlock
          placement="web_tools_hub"
          headline="Or let the app keep count"
          sub={`${SITE.name} does this for everything you track, continuously. Free for three counters.`}
        />
      </div>
    </div>
  );
}
