import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TOOLS, getTool } from '@/lib/tools';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/page-metadata';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { CtaBlock } from '@/components/content/cta-block';
import { DaysSince } from '@/components/tools/days-since';
import { DaysBetween } from '@/components/tools/days-between';
import { AverageInterval } from '@/components/tools/average-interval';

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    ...pageMetadata(tool.title, tool.description, `/tools/${slug}`),
    title: { absolute: tool.seoTitle },
  };
}

/** Each tool is its own component; the route just picks one. */
const CALCULATORS: Record<string, () => React.ReactElement> = {
  'days-since': DaysSince,
  'days-between': DaysBetween,
  'average-interval': AverageInterval,
};

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  const Calculator = CALCULATORS[slug];
  if (!tool || !Calculator) notFound();

  const others = TOOLS.filter((t) => t.slug !== slug);

  return (
    <div className="paper-dots">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs trail={[{ href: '/tools', label: 'Tools' }, { label: tool.nav }]} />

        <header className="mt-6">
          <p className="meta uppercase">{tool.kicker}</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {tool.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{tool.deck}</p>
        </header>

        <Calculator />

        <div className="ticket p-6">
          <h2 className="stub-label mb-2 uppercase">Where this runs</h2>
          <p className="text-sm leading-relaxed text-muted">
            Entirely in your browser. The dates you type are never sent anywhere, there is no
            request behind the answer, and nothing is stored when you close the tab. The same
            is true of {SITE.name} itself, which keeps your counters encrypted on your phone
            with no server in the middle.
          </p>
        </div>

        <CtaBlock
          placement={`web_tool_${slug}`}
          headline="Let it keep count for you"
          sub={`${SITE.name} runs this arithmetic continuously, for everything you track. Free for three counters.`}
        />

        <section className="not-prose mt-12">
          <h2 className="stub-label mb-4 uppercase">Other tools</h2>
          <ul className="space-y-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/tools/${other.slug}`}
                  className="ticket group flex items-baseline justify-between gap-4 px-5 py-4 transition-transform hover:-translate-y-0.5"
                >
                  <span>
                    <span className="font-semibold text-ink group-hover:underline">
                      {other.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{other.deck}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-ube">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
