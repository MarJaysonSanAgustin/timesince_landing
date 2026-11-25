import Link from 'next/link';
import { pageMetadata } from '@/lib/page-metadata';
import { RELEASES, ROADMAP, latestVersion } from '@/lib/changelog';
import { SITE } from '@/lib/site';
import { PageLayout } from '@/components/site/page-layout';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { CtaBlock } from '@/components/content/cta-block';

export const metadata = pageMetadata(
  "What's new",
  `Every ${SITE.name} release on the App Store, newest first, with the date it shipped and what changed.`,
  '/whats-new',
);

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function WhatsNew() {
  return (
    <PageLayout width="prose">
      <Breadcrumbs trail={[{ label: "What's new" }]} />

      <header className="mt-6 mb-12">
        <p className="meta uppercase">Currently {latestVersion}</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          What&apos;s new
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Release dates follow the US App Store. Read the full notes in the{' '}
          <a href={SITE.appStoreUrl} className="text-ube hover:underline">
            App Store version history
          </a>
          .
        </p>
      </header>

      {ROADMAP.length > 0 && (
        <section className="mb-14">
          <h2 className="section-label mb-4 uppercase">Being built now</h2>
          <ul className="space-y-3">
            {ROADMAP.map((item) => (
              <li key={item.title} className="surface px-5 py-4">
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-faint">
            Taken from the{' '}
            <a
              href={SITE.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ube hover:underline"
            >
              public feedback board
            </a>
            , where you can also vote or add your own.
          </p>
        </section>
      )}

      <section>
        <h2 className="section-label mb-5 uppercase">Released</h2>
        <ol className="space-y-5">
          {RELEASES.map((release) => (
            <li key={release.version} className="release-entry">
              <p className="section-label">Version {release.version}</p>
              <div>
                <div className="detail-row">
                  <h3 className="text-base font-semibold text-ink">{release.theme}</h3>
                  <time dateTime={release.date} className="meta shrink-0">
                    {formatDate(release.date)}
                  </time>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{release.deck}</p>
                <ul className="mt-3 space-y-1.5">
                  {release.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="text-faint">
                        &middot;
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {release.guide && (
                  <Link
                    href={release.guide.href}
                    className="mt-3 inline-block text-sm text-ube underline"
                  >
                    {release.guide.label}
                  </Link>
                )}
                {release.note && (
                  <p className="mt-3 border-t border-line pt-2 text-xs text-faint">{release.note}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CtaBlock
        placement="web_whats_new"
        headline="Get the current version"
        sub={`${SITE.name} is free for your first three counters, with no account.`}
      />
    </PageLayout>
  );
}
