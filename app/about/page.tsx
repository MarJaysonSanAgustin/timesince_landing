import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ABOUT } from '@/lib/about';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/page-metadata';
import { serializeJsonLd } from '@/lib/json-ld';
import { organization } from '@/lib/schema';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { CtaBlock } from '@/components/content/cta-block';

/**
 * Draft-gated. While ABOUT.draft is true this 404s in production and renders
 * only in `next dev`, so placeholder prose cannot ship — and this page matters
 * more than most, because every Article's author URL points here.
 */
const SHOW_DRAFT = process.env.NODE_ENV === 'development';

export const metadata: Metadata = {
  ...pageMetadata(
    `About ${SITE.name}`,
    `Who builds ${SITE.name}, why it works the way it does, and how to reach the person who makes it.`,
    '/about',
  ),
  ...(ABOUT.draft ? { robots: { index: false, follow: false } } : {}),
};

/**
 * The Person this site credits as the author of every guide and scenario.
 * Publishing it here is what makes that author reference mean anything.
 */
function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.developerName,
    url: `${SITE.url}/about`,
    email: SITE.email,
    worksFor: organization(),
    knowsAbout: ['Interval tracking', 'iOS development', 'Habit tracking'],
  };
}

export default function About() {
  if (ABOUT.draft && !SHOW_DRAFT) notFound();

  return (
    <div className="paper-dots">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {!ABOUT.draft && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema()) }}
          />
        )}

        <Breadcrumbs trail={[{ label: `About ${SITE.name}` }]} />

        {ABOUT.draft && (
          <p className="accent-alert accent-block mt-6 rounded-card px-4 py-3 text-sm font-medium">
            Draft — visible in dev only. Fill in <code>lib/about.ts</code>, set{' '}
            <code>draft: false</code>, then add the footer link.
          </p>
        )}

        <header className="mt-6 mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {ABOUT.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{ABOUT.deck}</p>
        </header>

        <div className="ticket mb-12 px-5 py-4">
          <dl className="space-y-2">
            {ABOUT.facts.map((fact) => (
              <div key={fact.label} className="stub-row">
                <dt className="stub-label">{fact.label}</dt>
                <dd className="stub-value text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-10">
          {ABOUT.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-bold text-ink">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="ticket mt-8 px-5 py-4">
          <div className="stub-row">
            <span className="stub-label">FEEDBACK BOARD</span>
            <a
              href={SITE.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ube hover:underline"
            >
              {SITE.supportUrl.replace('https://', '')}
            </a>
          </div>
          <div className="stub-row mt-2">
            <span className="stub-label">EMAIL</span>
            <a href={`mailto:${SITE.email}`} className="text-sm text-ube hover:underline">
              {SITE.email}
            </a>
          </div>
        </div>

        <CtaBlock
          placement="web_about"
          headline={`See what ${SITE.name} does`}
          sub="Free for your first three counters, with no account."
        />
      </div>
    </div>
  );
}
