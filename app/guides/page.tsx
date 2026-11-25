import { serializeJsonLd } from '@/lib/json-ld';
import { ContentLink } from '@/components/content/content-link';
import { librarySlug, libraryPath } from '@/lib/counter-library';
import { getGuides } from '@/lib/content';
import { CLUSTER_LABELS, CLUSTERS } from '@/lib/content/schema';
import { SITE } from '@/lib/site';
import { strings } from '@/lib/strings/en';
import { PageLayout } from '@/components/site/page-layout';
import { CtaBlock } from '@/components/content/cta-block';
import { itemList } from '@/lib/schema';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Guides',
  'Practical guides to tracking chores, medication and anything else that recurs on no fixed schedule — on iPhone, without streaks.',
  '/guides',
);

export default function GuidesHub() {
  const guides = getGuides();
  const library = guides.find((guide) => guide.slug === librarySlug);
  const byCluster = CLUSTERS.map((c) => ({
    cluster: c,
    label: CLUSTER_LABELS[c],
    items: guides.filter((g) => g.data.cluster === c && g.data.kind === 'guide' && g !== library),
  })).filter((g) => g.items.length > 0);

  const notes = guides.filter((g) => g.data.kind === 'note');

  const listJsonLd = itemList(
    [...(library ? [library] : []), ...byCluster.flatMap((group) => group.items), ...notes].map((g) => ({
      href: `/guides/${g.slug}`,
      name: g.data.title,
    })),
    'TimeSince guides',
  );

  return (
    <PageLayout width="wide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(listJsonLd) }}
      />
      <header className="directory-header">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Guides
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Each guide answers its question first and gives the detail after. No streaks, and an honest
          note on what {SITE.name} does not solve.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-muted">No guides published yet.</p>
      ) : (
        <div className="space-y-16">
          {library && (
            <section>
              <h2 className="mb-4 font-display text-2xl font-bold text-ink">Counter library</h2>
              <ContentLink href={libraryPath} title={library.data.title} deck={library.data.deck} />
            </section>
          )}
          {byCluster.map((group) => (
            <section key={group.cluster}>
              <h2 className="mb-6 font-display text-2xl font-bold text-ink">{group.label}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.items.map((g) => (
                  <ContentLink
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    title={g.data.title}
                    deck={g.data.deck}
                  />
                ))}
              </div>
            </section>
          ))}

          {notes.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl font-bold text-ink">Notes</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {notes.map((g) => (
                  <ContentLink
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    title={g.data.title}
                    deck={g.data.deck}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <CtaBlock
        placement="web_guides_hub"
        headline="Track what matters, without the pressure"
        sub={`${SITE.name} is free for up to three counters, with no account and no ads.`}
      />
    </PageLayout>
  );
}
