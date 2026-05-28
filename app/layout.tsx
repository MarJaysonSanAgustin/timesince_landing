import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Logo, LogoIcon } from '../components/logo';
import { Analytics } from '@vercel/analytics/next';

const nunitoSans = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
});

const nunitoDisplay = Nunito({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'TimeSince - Track what matters, without the pressure',
  description: 'A wellness-oriented habit, routine, and chore tracker that discards the traditional binary of success and failure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${nunitoDisplay.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased selection:bg-purple-200 selection:text-purple-900 flex flex-col min-h-screen" suppressHydrationWarning>
        <Analytics />
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center">
              <Logo size={32} />
            </a>
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="/#features" className="hover:text-gray-900 transition-colors">Features</a>
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-900 transition-colors">Terms</a>
            </nav>
            <a href="#download" className="hidden sm:inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              Get the App
            </a>
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
            <div className="mt-4 flex space-x-6 md:mt-0 text-sm text-gray-500">
              <a href="https://timesince.userjot.com/?cursor=1&order=top&limit=10" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Feedback & Support</a>
              <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
