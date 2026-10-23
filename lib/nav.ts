import { localizedPath } from '@/lib/i18n';
import { strings } from '@/lib/strings/en';
import { SITE } from '@/lib/site';

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

/**
 * Header is product-first and deliberately short; the content hubs live in the
 * footer where they still get crawled. Guides is the exception — it will be the
 * deepest content on the site, so it earns a header slot. See PLAN.md §1.
 *
 * Tools joins the header in Phase 4; Scenarios, About and What's New join the
 * footer in Phases 3 and 5. Add them here, not in the components.
 */
export const PRIMARY_NAV: NavLink[] = [
  { href: localizedPath('/features'), label: strings.nav.features },
  { href: localizedPath('/guides'), label: strings.nav.guides },
  { href: localizedPath('/tools'), label: strings.nav.tools },
  { href: localizedPath('/faq'), label: strings.nav.faq },
];

export const FOOTER_GROUPS: NavGroup[] = [
  {
    title: strings.footer.product,
    links: [
      { href: localizedPath('/features'), label: strings.nav.features },
      { href: localizedPath('/whats-new'), label: strings.nav.whatsNew },
      { href: localizedPath('/faq'), label: strings.nav.faq },
    ],
  },
  {
    title: strings.footer.learn,
    links: [{ href: localizedPath('/guides'), label: strings.nav.guides }, { href: localizedPath('/scenarios'), label: strings.nav.scenarios }],
  },
  {
    title: strings.footer.company,
    links: [
      { href: localizedPath('/about'), label: strings.nav.about },
      { href: SITE.supportUrl, label: strings.nav.support, external: true },
      { href: localizedPath('/privacy'), label: strings.nav.privacy },
      { href: localizedPath('/terms'), label: strings.nav.terms },
    ],
  },
];
