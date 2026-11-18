import { serializeJsonLd } from '@/lib/json-ld';
import Link from 'next/link';
import { getGuides } from '@/lib/content';
import { CLUSTER_LABELS, CLUSTERS } from '@/lib/content/schema';
import { SITE } from '@/lib/site';
import { strings } from '@/lib/strings/en';
import { HubHeader } from '@/components/site/page-sheet';
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
  const byCluster = CLUSTERS.map((c) => ({
    cluster: c,
    label: CLUSTER_LABELS[c],
    items: guides.filter((g) => g.data.cluster === c && g.data.kind === 'guide'),
  })).filter((g) => g.items.length > 0);

  const notes = guides.filter((g) => g.data.kind === 'note');

  const listJsonLd = itemList(
    [...byCluster.flatMap((group) => group.items), ...notes].map((g) => ({ href: `/guides/${g.slug}`, name: g.data.title })),
    'TimeSince guides',
  );

  return (
    <div className="paper-dots"><div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(listJsonLd) }}
      />
      <HubHeader><header className="mb-16">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Guides
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Each guide answers its question first and gives the detail after. No streaks, and
          an honest note on what {SITE.name} does not solve.
        </p>
      </header></HubHeader>

      {guides.length === 0 ? (
        <p className="text-muted">No guides published yet.</p>
      ) : (
        <div className="space-y-16">
          {byCluster.map((group) => (
            <section key={group.cluster}>
              <h2 className="mb-6 font-display text-2xl font-bold text-ink">{group.label}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.items.map((g, i) => (
                  <GuideCard
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    title={g.data.title}
                    deck={g.data.deck}
                    no={i + 1}
                    kind={g.data.kind}
                  />
                ))}
              </div>
            </section>
          ))}

          {notes.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl font-bold text-ink">Notes</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {notes.map((g, i) => (
                  <GuideCard
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    title={g.data.title}
                    deck={g.data.deck}
                    no={i + 1}
                    kind={g.data.kind}
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
    </div></div>
  );
}

/**
 * A link to elsewhere, so it is a TicketStub, not a TicketPaper:
 * block │ perforation │ body, horizontally (ADR-012 rule 6).
 *
 * The earlier version made every card a full vertical ticket, which rule 4
 * reserves for ONE leading element — a page full of them reads as a stack of
 * dark headers, not as tickets.
 */
function GuideCard({
  href,
  title,
  deck,
  no,
  kind,
}: {
  href: string;
  title: string;
  deck: string;
  no: number;
  kind: 'guide' | 'note';
}) {
  return (
    <Link
      href={href}
      className="accent-neutral stub group transition-transform hover:-translate-y-0.5"
    >
      <div className="stub-block">
        <span className="meta" style={{ color: 'inherit', opacity: 0.55 }}>
          NO.
        </span>
        <span className="meta text-base" style={{ color: 'inherit' }}>
          {String(no).padStart(3, '0')}
        </span>
      </div>

      <div className="stub-seam" />

      <div className="stub-body">
        <h3 className="text-base font-semibold leading-snug text-ink group-hover:underline">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">{deck}</p>
        <div className="stub-row mt-3">
          <span className="stub-label">{kind === 'note' ? 'NOTE' : 'GUIDE'}</span>
          <span aria-hidden="true" className="text-sm text-ube">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
