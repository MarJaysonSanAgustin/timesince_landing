import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Logo, LogoIcon } from '../components/logo';
import { Analytics } from '@vercel/analytics/next';
import { Menu } from 'lucide-react';
import { SITE } from '../lib/site';

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
      <body className="font-sans bg-white text-gray-900 antialiased selection:bg-purple-200 selection:text-purple-900 flex flex-col min-h-screen" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center">
              <Logo size={32} />
            </a>
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="/#features" className="hover:text-gray-900 transition-colors">Features</a>
              <a href="/faq" className="hover:text-gray-900 transition-colors">FAQ</a>
              <a href="/blog" className="hover:text-gray-900 transition-colors">Blog</a>
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-900 transition-colors">Terms</a>
            </nav>
            <a href={SITE.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              Get the App
            </a>

            <details className="relative sm:hidden">
              <summary className="flex list-none items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 cursor-pointer">
                <Menu className="w-5 h-5" />
              </summary>
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                <a href="/#features" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Features</a>
                <a href="/faq" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">FAQ</a>
                <a href="/blog" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Blog</a>
                <a href="/privacy" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Privacy</a>
                <a href="/terms" className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Terms</a>
                <a href={SITE.appStoreUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white text-center hover:bg-gray-800">
                  Get the App
                </a>
              </div>
            </details>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="w-full border-t border-gray-200 bg-white py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:px-6 lg:px-8 md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <LogoIcon size={20} />
              <span className="text-sm font-semibold tracking-tight text-gray-900">TimeSince</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} TimeSince. All rights reserved.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:mt-0 text-sm text-gray-500">
              <a href="/faq" className="hover:text-gray-900">FAQ</a>
              <a href="/blog" className="hover:text-gray-900">Blog</a>
              <a href={SITE.supportUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Feedback & Support</a>
              <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
