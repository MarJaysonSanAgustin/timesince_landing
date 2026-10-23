import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SITE } from '@/lib/site';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';

const nunitoSans = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
});

const nunitoDisplay = Nunito({
  subsets: ['latin'],
  variable: '--font-display-nunito',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'habit tracker',
    'chore tracker',
    'time since app',
    'quit smoking tracker',
    'streak-free habit tracker',
    'ADHD habit tracker',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
};

// TODO(phase-2): move to lib/schema.ts and fix applicationCategory + offers.
// `HealthApplication` invites health-claim scrutiny and `price: 0` misstates a
// freemium app with a paid tier. See PLAN.md §4.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.png`,
    },
    {
      '@type': 'SoftwareApplication',
      name: SITE.fullName,
      operatingSystem: 'iOS',
      applicationCategory: 'HealthApplication',
      url: SITE.url,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${nunitoDisplay.variable}`}>
      <body
        className="font-sans bg-surface text-ink antialiased selection:bg-purple-200 selection:text-purple-900 flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
