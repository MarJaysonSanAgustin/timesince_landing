import { getScenarios } from '@/lib/content';
import { CLUSTERS, CLUSTER_LABELS } from '@/lib/content/schema';
import { pageMetadata } from '@/lib/page-metadata';
import { itemList } from '@/lib/schema';
import { serializeJsonLd } from '@/lib/json-ld';
import { StubLink } from '@/components/content/stub-link';
import { CtaBlock } from '@/components/content/cta-block';
import { HubHeader } from '@/components/site/page-sheet';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
export const metadata = pageMetadata('Scenarios', 'Practical ways to answer “when did I last?” for chores, plants, car maintenance, staying in touch and stepping away from a scrolling habit.', '/scenarios');
export default function ScenariosHub() {
  const docs = getScenarios();
  const groups = CLUSTERS.map(cluster => ({ cluster, items: docs.filter(d => d.data.cluster === cluster) })).filter(g => g.items.length);
  return <div className="paper-dots"><div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemList(groups.flatMap(g => g.items).map(d => ({ href: `/scenarios/${d.slug}`, name: d.data.title })), 'TimeSince scenarios')) }} />
    <Breadcrumbs trail={[{ label: 'Scenarios' }]} />
    <HubHeader><header className="my-10"><p className="meta uppercase">When did I last…?</p><h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">A place for the things you forget.</h1><p className="mt-4 max-w-2xl text-lg text-muted">Start with a familiar situation. Each page offers a small setup, the details worth recording, and an honest limit on what a counter can do.</p></header></HubHeader>
    <div className="space-y-12">{groups.map(g => <section key={g.cluster}><h2 className="mb-5 text-2xl font-bold text-ink">{CLUSTER_LABELS[g.cluster]}</h2><div className="grid gap-4 md:grid-cols-2">{g.items.map((d, i) => <StubLink key={d.slug} href={`/scenarios/${d.slug}`} title={d.data.title} deck={d.data.scene} label={d.data.audience} no={i + 1} />)}</div></section>)}</div>
    <CtaBlock placement="web_scenarios_hub" headline="One question, one counter" sub="Start with three things you want to remember. No daily streak to maintain." />
  </div></div>;
}
