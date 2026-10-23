import type { Metadata } from 'next';
import Link from 'next/link';
import { getGuides } from '@/lib/content';
import { CLUSTER_LABELS, CLUSTERS } from '@/lib/content/schema';
import { SITE } from '@/lib/site';
import { strings } from '@/lib/strings/en';
import { CtaBlock } from '@/components/content/cta-block';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Practical guides to tracking habits, chores and routines by elapsed time instead of streaks — on iPhone, without the guilt trip.',
  alternates: { canonical: '/guides' },
};

export default function GuidesHub() {
  const guides = getGuides();
  const byCluster = CLUSTERS.map((c) => ({
    cluster: c,
    label: CLUSTER_LABELS[c],
    items: guides.filter((g) => g.data.cluster === c && g.data.kind === 'guide'),
  })).filter((g) => g.items.length > 0);

  const notes = guides.filter((g) => g.data.kind === 'note');

  return (
    <div className="paper-dots"><div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-16">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Guides
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Each guide answers its question first and gives the detail after. No streaks, and
          an honest note on what {SITE.name} does not solve.
        </p>
      </header>

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

function GuideCard({
  href,
  title,
  deck,
  no,
}: {
  href: string;
  title: string;
  deck: string;
  no: number;
}) {
  return (
    <Link href={href} className="ticket group block transition-transform hover:-translate-y-0.5">
      {/* The block. Ink, not colour — a guide belongs to the app. */}
      <div className="accent-neutral accent-block px-6 py-5">
        <p className="meta" style={{ color: 'inherit', opacity: 0.7 }}>
          NO. {String(no).padStart(3, '0')}
        </p>
        <h3 className="mt-1 font-semibold leading-snug">{title}</h3>
      </div>
      <div className="ticket-perforation" />
      <div className="px-6 py-5">
        <p className="text-sm leading-relaxed text-muted">{deck}</p>
        <div className="stub-row mt-4 border-t border-hair pt-3">
          <span className="stub-label">READ</span>
          <span className="stub-value text-xs group-hover:underline">
            {strings.content.readGuide} &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
