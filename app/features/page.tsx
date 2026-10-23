import { FEATURES } from '@/lib/features';
import { pageMetadata } from '@/lib/page-metadata';
import { itemList } from '@/lib/schema';
import { serializeJsonLd } from '@/lib/json-ld';
import { StubLink } from '@/components/content/stub-link';
import { CtaBlock } from '@/components/content/cta-block';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
export const metadata = pageMetadata('Features', 'Explore TimeSince features for recording when you last did something: widgets, reminders, custom logs, quitting mode and private iCloud sync.', '/features');
export default function FeaturesHub() {
  return <div className="paper-dots"><div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemList(FEATURES.map(f => ({ href: `/features/${f.slug}`, name: f.nav })), 'TimeSince features')) }} />
    <Breadcrumbs trail={[{ label: 'Features' }]} />
    <header className="my-10"><p className="meta uppercase">A record that fits your life</p><h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">Small tools for remembering.</h1><p className="mt-4 max-w-2xl text-lg text-muted">See when you last did something, make logging easier, and keep the details that matter. Start with three counters for free.</p></header>
    <div className="grid gap-4 md:grid-cols-2">{FEATURES.map((f, i) => <StubLink key={f.slug} href={`/features/${f.slug}`} title={f.nav} deck={f.deck} label={f.tier === 'free' ? 'FREE TIER' : 'TIMESINCE PRO'} no={i + 1} />)}</div>
    <CtaBlock placement="web_features_hub" headline="Start with what you keep forgetting" sub="Three counters are free. No account needed." />
  </div></div>;
}
