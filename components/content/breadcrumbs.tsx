import Link from 'next/link';
import { SITE } from '@/lib/site';
import { strings } from '@/lib/strings/en';

export interface Crumb {
  href?: string;
  label: string;
}

/**
 * Renders the trail AND emits the BreadcrumbList schema, so the two can never
 * drift apart or exist without each other.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full: Crumb[] = [{ href: '/', label: strings.content.breadcrumbHome }, ...trail];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE.url}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-ink-subtle">
        <ol className="flex flex-wrap items-center gap-1.5">
          {full.map((c, i) => (
            <li key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href ? (
                <Link href={c.href} className="hover:text-ink transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-muted">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
