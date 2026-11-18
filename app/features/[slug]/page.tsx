import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FEATURES, getFeature } from '@/lib/features';
import { FEATURE_DETAILS } from '@/lib/feature-details';
import { allContent } from '@/lib/content';
import { pageMetadata } from '@/lib/page-metadata';
import { PageSheet } from '@/components/site/page-sheet';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { AnswerBox } from '@/components/content/answer-box';
import { StepList } from '@/components/content/step-list';
import { GivesGrid } from '@/components/content/gives-grid';
import { RelatedGrid } from '@/components/content/related-grid';
import { CtaBlock } from '@/components/content/cta-block';
import { strings } from '@/lib/strings/en';
export const dynamicParams = false;
export function generateStaticParams() { return FEATURES.map(f => ({ slug: f.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const f = getFeature(slug);
  return f ? pageMetadata(f.nav, f.deck, `/features/${slug}`) : {};
}
export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const f = getFeature(slug); if (!f) notFound();
  const detail = FEATURE_DETAILS[slug];
  if (!detail) throw new Error(`Missing feature detail: ${slug}`);
  const related = allContent().flatMap(({ basePath, docs }) => docs.filter(d => d.data.feature === slug).map(d => ({ href: `${basePath}/${d.slug}`, title: d.data.title, deck: d.data.deck, kicker: basePath === '/guides' ? 'Guide' : 'Scenario' })));
  return <PageSheet width="content"><article>
    <Breadcrumbs trail={[{ href: '/features', label: 'Features' }, { label: f.nav }]} />
    <header className="mt-8 max-w-3xl"><p className="meta uppercase">{strings.content.included} {f.tier === 'free' ? strings.content.free : strings.content.pro}</p><h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">{f.h1}</h1><p className="mt-5 text-lg leading-relaxed text-muted">{detail.answer}</p>{f.requires && <p className="meta mt-4">{strings.content.requires}: {f.requires}</p>}</header>
    <div className="mt-10 grid items-start gap-8 md:grid-cols-2"><div><AnswerBox label={strings.content.featureUse} text={detail.use} /><StepList steps={detail.steps} heading={strings.content.setup} /></div><figure className="ticket p-6"><Image src={f.image} alt={f.alt} className="mx-auto max-h-[600px] w-auto object-contain" priority sizes="(max-width: 768px) 90vw, 440px" /></figure></div>
    <GivesGrid gives={detail.gives} doesNot={detail.limits} />
    <RelatedGrid items={related} title={strings.content.relatedHeading} />
    <CtaBlock placement={`web_feature_${slug}`} headline="Keep the interval. Leave the pressure." sub={f.tier === 'free' ? 'This feature is included with your first three free counters.' : 'This feature is part of TimeSince Pro. You can start with three free counters.'} />
    <Link href="/features" className="text-ube underline">Explore all features</Link>
  </article></PageSheet>;
}
