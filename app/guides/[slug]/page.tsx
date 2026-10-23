import { serializeJsonLd } from '@/lib/json-ld';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getGuide, getGuides, allContent } from '@/lib/content';
import { relatedContent } from '@/lib/content/related';
import { CLUSTER_LABELS } from '@/lib/content/schema';
import { CLUSTER_ICONS } from '@/lib/content/clusters';
import { mdxComponents } from '@/components/mdx';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { AnswerBox } from '@/components/content/answer-box';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { RelatedGrid } from '@/components/content/related-grid';
import { SourceList } from '@/components/content/source-list';
import { ContentVisual } from '@/components/content/content-visual';
import { CtaBlock } from '@/components/content/cta-block';
import { StepList } from '@/components/content/step-list';
import { ComparisonTable } from '@/components/content/comparison-table';
import { GivesGrid } from '@/components/content/gives-grid';
import { strings } from '@/lib/strings/en';
import { article } from '@/lib/schema';
import { SITE } from '@/lib/site';

/**
 * Required with `output: 'standalone'`: an unknown slug must 404 statically
 * rather than attempt a runtime read of a content directory that is not in the
 * serverless bundle. See PLAN.md §4.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  // `seoTitle` is the complete <title>, so it must bypass the layout's
  // "%s | TimeSince" template — otherwise the suffix lands twice.
  const title = guide.data.seoTitle
    ? { absolute: guide.data.seoTitle }
    : guide.data.title;

  return {
    title,
    description: guide.data.description,
    alternates: {
      canonical: `/guides/${slug}`,
      types: { 'application/rss+xml': `${SITE.url}/feed.xml` },
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.data.seoTitle ?? guide.data.title,
      description: guide.data.description,
      images: [{ url: `${SITE.url}/guides/${slug}/opengraph-image`, alt: guide.data.title }],
    },
    openGraph: {
      siteName: SITE.name,
      type: 'article',
      title: guide.data.seoTitle ?? guide.data.title,
      description: guide.data.description,
      url: `${SITE.url}/guides/${slug}`,
      publishedTime: guide.data.date,
      modifiedTime: guide.data.updated ?? guide.data.date,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const { data, body } = guide;
  const related = relatedContent(guide, '/guides', allContent());
  const Icon = CLUSTER_ICONS[data.cluster];
  const updated = data.updated ?? data.date;

  const articleJsonLd = article({
    slug,
    basePath: '/guides',
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    keywords: [data.keywords.primary, ...data.keywords.secondary],
    section: CLUSTER_LABELS[data.cluster],
  });

  return (
    <div className="paper-dots"><article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <Breadcrumbs
        trail={[{ href: '/guides', label: 'Guides' }, { label: data.title }]}
      />

      <header className="mt-6">
        <p className="meta uppercase">
          {CLUSTER_LABELS[data.cluster]}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {data.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{data.deck}</p>
        <p className="mt-4 text-sm text-muted">By {SITE.developerName}</p>
        <p className="meta mt-4">
          {strings.content.updatedOn}{' '}
          <time dateTime={updated}>
            {new Date(`${updated}T00:00:00Z`).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
        </p>
      </header>

      <div className="mt-8">
        <ContentVisual
          hero={data.hero}
          feature={data.feature}
          accent={data.accent}
          icon={Icon}
          kicker={data.keywords.primary}
          alt={data.title}
          priority
        />
      </div>

      <AnswerBox text={data.answer} />

      <div className="prose prose-neutral prose-lg max-w-none">
        <MDXRemote source={body} components={mdxComponents} />
      </div>

      {data.steps && (
        <StepList
          steps={data.steps}
          heading="Step by step"
          emitHowTo
          howToName={data.title}
        />
      )}

      {data.comparison && <ComparisonTable {...data.comparison} />}

      {data.gives && data.doesNotGive && (
        <GivesGrid gives={data.gives} doesNot={data.doesNotGive} />
      )}

      <FaqAccordion items={data.faq} heading={strings.content.faqHeading} emitSchema />

      <SourceList sources={data.sources} disclaimer={data.disclaimer} />

      <CtaBlock
        placement={`web_guide_${slug}`}
        headline="Track it without the guilt trip"
        sub={`${SITE.name} counts the time since you last did something. No streaks to break.`}
      />

      <RelatedGrid items={related} title={strings.content.relatedHeading} />
    </article></div>
  );
}
