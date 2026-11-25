import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { PageLayout } from '@/components/site/page-layout';
import { counterCollections, getCounterCollection, libraryPath } from '@/lib/counter-library';
import { pageMetadata } from '@/lib/page-metadata';

type Props = { params: Promise<{ collection: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return counterCollections.map(({ slug }) => ({ collection: slug }));
}

export async function generateMetadata({ params }: Props) {
  const { collection } = await params;
  const entry = getCounterCollection(collection);
  if (!entry) notFound();
  return pageMetadata(`${entry.title} counter ideas`, entry.deck, `${libraryPath}/${entry.slug}`);
}

export default async function CounterCollectionPage({ params }: Props) {
  const { collection } = await params;
  const entry = getCounterCollection(collection);
  if (!entry) notFound();

  return (
    <PageLayout width="content">
      <Breadcrumbs trail={[
        { href: '/guides', label: 'Guides' },
        { href: libraryPath, label: 'Premade counters' },
        { label: entry.title },
      ]} />
      <header className="mt-7 max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{entry.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{entry.deck}</p>
        <a href="#setup" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-ube underline md:hidden">
          Jump to setup instructions
        </a>
      </header>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section aria-label="Counters in this collection" className="divide-y divide-hair border-y border-line">
          {entry.counters.map((counter) => (
            <section key={counter.name} className="py-5">
              <p className="meta">Explore / {counter.section}</p>
              <h2 className="mt-1 font-display text-2xl font-bold">{counter.name}</h2>
              <p className="mt-2 leading-relaxed">{counter.log}</p>
              <p className="mt-2 leading-relaxed text-muted">{counter.settings}</p>
            </section>
          ))}
        </section>
        <aside className="surface p-5" aria-labelledby="setup">
          <h2 id="setup" className="scroll-mt-20 font-display text-xl font-bold">Set up a counter</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed marker:font-mono">
            <li>Tap <strong>+</strong> in TimeSince to open Explore. Search for the name shown here, open the idea and tap <strong>Try this</strong>.</li>
            <li>{entry.setup}</li>
            <li>Tap <strong>Save</strong>. If the start ticket appears, <strong>Slide to start</strong>. You’ll find the new counter in your counters list.</li>
          </ol>
        </aside>
      </div>
      <nav aria-label="Further reading" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ube underline underline-offset-4">
        <Link href={libraryPath}>Browse all collections</Link>
        <Link href={entry.guide.href}>{entry.guide.title}</Link>
      </nav>
    </PageLayout>
  );
}
