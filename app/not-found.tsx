import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CtaBlock } from '@/components/content/cta-block';

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: true },
};

const ELSEWHERE = [
  { href: '/guides', label: 'Guides', deck: 'How to track what recurs on no fixed schedule.' },
  { href: '/faq', label: 'FAQ', deck: 'What it does, what it costs, what stays on your phone.' },
  { href: '/#features', label: 'Features', deck: 'Widgets, Siri, NFC tags, quitting mode, and the rest.' },
];

export default function NotFound() {
  return (
    <div className="paper-dots">
      <div className="mx-auto w-full max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="accent-neutral stub mb-12">
          <div className="stub-block">
            <span className="meta" style={{ color: 'inherit', opacity: 0.55 }}>
              ERR
            </span>
            <span className="meta text-base" style={{ color: 'inherit' }}>
              404
            </span>
          </div>
          <div className="stub-seam" />
          <div className="stub-body">
            <h1 className="text-xl font-bold text-ink">This page does not exist</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              It may have moved, or the link may be wrong. Nothing is lost — here is where
              everything else lives.
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="ticket group flex items-baseline justify-between gap-4 px-5 py-4 transition-transform hover:-translate-y-0.5"
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
      </div>
    </div>
  );
}
