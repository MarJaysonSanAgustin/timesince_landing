import { serializeJsonLd } from '@/lib/json-ld';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SITE } from '@/lib/site';
import { siteGraph } from '@/lib/schema';
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
    'days since counter',
    'time since tracker',
    'how long since app',
    'interval tracker iphone',
    'chore tracker',
    'ADHD tracker',
    'streak-free habit tracker',
    'quit counter',
  ],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${SITE.url}/feed.xml` },
  },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  other: { 'color-scheme': 'light dark' },
  twitter: { card: 'summary_large_image' },
};

const jsonLd = siteGraph();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${nunitoDisplay.variable}`}>
      <body
        className="font-sans paper text-ink antialiased selection:bg-[#D0B4DE] selection:text-[#1B1526] flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <Analytics />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
