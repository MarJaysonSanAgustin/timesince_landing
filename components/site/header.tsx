import Link from 'next/link';
import { Logo } from '@/components/logo';
import { PRIMARY_NAV, FOOTER_GROUPS } from '@/lib/nav';
import { SITE } from '@/lib/site';
import { strings } from '@/lib/strings/en';
import { MobileMenu } from '@/components/site/mobile-menu';

/** Takes no props: the single source of truth is `lib/nav.ts`. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Logo size={32} />
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-ink-muted">
          {PRIMARY_NAV.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={SITE.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center justify-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          {strings.nav.getApp}
        </a>

        <MobileMenu primary={PRIMARY_NAV} groups={FOOTER_GROUPS} />
      </div>
    </header>
  );
}
