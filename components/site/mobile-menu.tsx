'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import type { NavGroup, NavLink } from '@/lib/nav';
import { SITE } from '@/lib/site';
import { strings } from '@/lib/strings/en';

interface MobileMenuProps {
  primary: NavLink[];
  groups: NavGroup[];
}

/**
 * The only client component on the site.
 *
 * It has to be one: the header lives in the root layout, so it survives App
 * Router navigations, and a plain `<details>` stays open after you tap a link.
 * Keeping the native `<details>` element means it still works before hydration;
 * the effect only closes it once a navigation has actually happened.
 */
export function MobileMenu({ primary, groups }: MobileMenuProps) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="sm:hidden">
      <summary
        aria-label={strings.nav.openMenu}
        className="flex list-none items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </summary>

      {/* A full-height sheet, not a popover: at 20+ links a fixed-width panel
          overflows the viewport with no way to scroll to the bottom. */}
      <div className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto overscroll-contain border-t border-line bg-surface px-4 py-6">
        <nav className="flex flex-col gap-1">
          {primary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-surface-alt"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={SITE.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-xl bg-ink px-4 py-3 text-center text-base font-medium text-white hover:bg-gray-800"
        >
          {strings.nav.getApp}
        </a>

        <div className="mt-8 space-y-6">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                {group.title}
              </h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterishLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

function FooterishLink({ link }: { link: NavLink }) {
  const className = 'block rounded-xl px-4 py-2.5 text-sm text-ink-muted hover:bg-surface-alt hover:text-ink';
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}
