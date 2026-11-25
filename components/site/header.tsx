'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appStoreUrl } from '@/lib/cta';
import { landing } from '@/lib/strings/home';
import homeStyle from '@/components/home/landing.module.css';
import { Logo } from '@/components/logo';
import { PRIMARY_NAV, FOOTER_GROUPS } from '@/lib/nav';
import { MobileMenu } from '@/components/site/mobile-menu';
import { ThemeToggle } from '@/components/site/theme-toggle';

/** Takes no props: the single source of truth is `lib/nav.ts`. */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className={homeStyle.header}>
      <div className={homeStyle.headerInner}>
        <Link href="/" aria-label="TimeSince home">
          <Logo size={36} />
        </Link>
        {pathname !== '/' && (
          <nav
            className="hidden items-center gap-6 text-sm text-muted sm:flex"
            aria-label="Main navigation"
          >
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className="hover:text-ink aria-[current=page]:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <div>
          <ThemeToggle />
          <a className={homeStyle.headerButton} href={appStoreUrl('web_header')}>
            {landing.navDownload}
          </a>
          <MobileMenu primary={PRIMARY_NAV} groups={FOOTER_GROUPS} />
        </div>
      </div>
    </header>
  );
}
