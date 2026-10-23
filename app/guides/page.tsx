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
    <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-16">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Guides
        </h1>
        <p className="max-w-2xl text-lg text-ink-muted">
          Each guide answers its question first and gives the detail after. No streaks, and
          an honest note on what {SITE.name} does not solve.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-ink-muted">No guides published yet.</p>
      ) : (
        <div className="space-y-16">
          {byCluster.map((group) => (
            <section key={group.cluster}>
              <h2 className="mb-6 font-display text-2xl font-bold text-ink">{group.label}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.items.map((g) => (
                  <GuideCard
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
                  <GuideCard
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
        sub={`${SITE.name} is free for up to three events, with no account and no ads.`}
      />
    </div>
  );
}

function GuideCard({ href, title, deck }: { href: string; title: string; deck: string }) {
  return (
    <Link
      href={href}
      className="group rounded-card-lg border border-gray-100 bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <h3 className="font-semibold text-ink group-hover:text-purple-600">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{deck}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-purple-600">
        {strings.content.readGuide} &rarr;
      </span>
    </Link>
  );
}
