import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { MobileStart } from '@/components/layout/floating-actions';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ScrollEffects } from '@/components/motion/scroll-effects';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { SITE_URL } from '@/content/site';

import './globals.css';

const DESCRIPTION =
  'Pixel Kinetix designs and engineers websites, business software and automation as one connected system, for businesses in Bangalore and across India.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Websites, Software & Automation in Bangalore | Pixel Kinetix',
    template: '%s · Pixel Kinetix',
  },
  description: DESCRIPTION,
  applicationName: 'Pixel Kinetix',
  openGraph: {
    type: 'website',
    siteName: 'Pixel Kinetix',
    locale: 'en_IN',
    title: 'Pixel Kinetix · Technology built around your business',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/brand/logo.svg' },
};

export const viewport: Viewport = { themeColor: '#fcfcfc' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileStart />
        <SmoothScroll />
        <ScrollEffects />
      </body>
    </html>
  );
}
