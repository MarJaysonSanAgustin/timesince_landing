import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CtaBlock } from '@/components/content/cta-block';
import { PageLayout } from '@/components/site/page-layout';

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: true },
};

const ELSEWHERE = [
  { href: '/guides', label: 'Guides', deck: 'How to track what recurs on no fixed schedule.' },
  { href: '/faq', label: 'FAQ', deck: 'What it does, what it costs, what stays on your phone.' },
  {
    href: '/#features',
    label: 'Features',
    deck: 'Widgets, Siri, NFC tags, quitting mode, and the rest.',
  },
];

export default function NotFound() {
  return (
    <PageLayout width="prose">
      <header className="directory-header">
        <p className="section-label">404</p>
        <h1>This page does not exist</h1>
        <p className="mt-4 text-lg text-muted">
          It may have moved, or the link may be wrong. Nothing is lost — here is where everything else
          lives.
        </p>
      </header>

      <ul className="space-y-3">
        {ELSEWHERE.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="surface group flex items-baseline justify-between gap-4 px-5 py-4 transition-transform hover:-translate-y-0.5"
            >
              <span>
                <span className="font-semibold text-ink group-hover:underline">{item.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{item.deck}</span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-ube">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <CtaBlock
        placement="web_404"
        headline="Or just get the app"
        sub={`${SITE.name} is free for your first three counters, with no account.`}
      />
    </PageLayout>
  );
}
