import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getScenario, getScenarios, allContent } from '@/lib/content';
import { relatedContent } from '@/lib/content/related';
import { pageMetadata } from '@/lib/page-metadata';
import { article } from '@/lib/schema';
import { serializeJsonLd } from '@/lib/json-ld';
import { SITE } from '@/lib/site';
import { getFeature } from '@/lib/features';
import { CLUSTER_LABELS } from '@/lib/content/schema';
import { mdxComponents } from '@/components/mdx';
import { PageSheet } from '@/components/site/page-sheet';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { PracticalAnswer } from '@/components/content/practical-answer';
import { ProblemFlow } from '@/components/content/problem-flow';
import { PullQuote } from '@/components/content/pull-quote';
import { GivesGrid } from '@/components/content/gives-grid';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { SourceList } from '@/components/content/source-list';
import { RelatedGrid } from '@/components/content/related-grid';
import { CtaBlock } from '@/components/content/cta-block';
import { strings } from '@/lib/strings/en';
export const dynamicParams = false;
export function generateStaticParams() { return getScenarios().map(s => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const doc = getScenario(slug); if (!doc) return {};
  const m = pageMetadata(doc.data.seoTitle ?? doc.data.title, doc.data.description, `/scenarios/${slug}`);
  return { ...m, title: doc.data.seoTitle ? { absolute: doc.data.seoTitle } : doc.data.title, openGraph: { ...m.openGraph, type: 'article', publishedTime: doc.data.date, modifiedTime: doc.data.updated ?? doc.data.date } };
}
export default async function ScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const doc = getScenario(slug); if (!doc) notFound();
  const { data, body } = doc; const feature = data.feature ? getFeature(data.feature) : undefined;
  return <PageSheet width="prose"><article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(article({ ...data, slug, basePath: '/scenarios', keywords: [data.keywords.primary, ...data.keywords.secondary], section: CLUSTER_LABELS[data.cluster] })) }} />
    <Breadcrumbs trail={[{ href: '/scenarios', label: 'Scenarios' }, { label: data.title }]} />
    <header className="mt-8"><p className="meta uppercase">{strings.content.audience} {data.audience}</p><h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">{data.title}</h1><p className="mt-4 text-lg text-muted">{data.deck}</p><p className="meta mt-4">By {SITE.developerName} · <time dateTime={data.updated ?? data.date}>{data.updated ?? data.date}</time></p></header>
    <PracticalAnswer answer={data.answer} checklist={data.checklist} />
    <ProblemFlow problem={data.problem} consequence={data.consequence} help={data.help} />
    <div className="prose prose-neutral prose-lg max-w-none"><MDXRemote source={body} components={mdxComponents} /></div>
    <PullQuote text={data.pullQuote} />
    <GivesGrid gives={data.solves} doesNot={data.doesNotSolve} />
    {feature && <p className="my-8 text-muted">Explore the feature: <Link className="text-ube underline" href={`/features/${feature.slug}`}>{feature.nav}</Link></p>}
    <FaqAccordion items={data.faq} heading={strings.content.faqHeading} emitSchema />
    <SourceList sources={data.sources} disclaimer={data.disclaimer} />
    <CtaBlock placement={`web_scenario_${slug}`} headline="Remember the last time" sub="Three counters are free. Come back whenever you need them." />
    <RelatedGrid items={relatedContent(doc, '/scenarios', allContent())} title={strings.content.relatedHeading} />
  </article></PageSheet>;
}
