import { ContentLink } from '@/components/content/content-link';
import { counterCollections, libraryPath } from '@/lib/counter-library';
import { serializeJsonLd } from '@/lib/json-ld';
import { itemList } from '@/lib/schema';

export function CounterCollectionIndex() {
  const links = counterCollections.map((collection) => ({
    href: `${libraryPath}/${collection.slug}`,
    name: collection.title,
    deck: collection.deck,
    count: collection.counters.length,
  }));

  return (
    <section aria-labelledby="collections" className="my-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: serializeJsonLd(itemList(links, 'Premade counter collections')),
      }} />
      <h2 id="collections" className="mb-4 font-display text-2xl font-bold">Browse by collection</h2>
      <div className="grid gap-3">
        {links.map((link) => (
          <ContentLink key={link.href} href={link.href} title={link.name} deck={link.deck}
            label={`${link.count} counters`} />
        ))}
      </div>
    </section>
  );
}
