import Link from 'next/link';
import { LogoIcon } from '@/components/logo';
import { FOOTER_GROUPS, type NavLink } from '@/lib/nav';
import { SITE } from '@/lib/site';
import { strings } from '@/lib/strings/en';

/** Takes no props: the single source of truth is `lib/nav.ts`. */
export function SiteFooter() {
  return (
    <footer className="w-full border-t border-line paper py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <LogoIcon size={20} />
              <span className="text-sm font-semibold tracking-tight text-ink">{SITE.name}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-faint">
              Track what matters, without the pressure.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="stub-label uppercase">
                {group.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-sm text-faint">
            &copy; {new Date().getFullYear()} {SITE.name}. {strings.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ link }: { link: NavLink }) {
  const className = 'text-sm text-muted hover:text-ink transition-colors';
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
