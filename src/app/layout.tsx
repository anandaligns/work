import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ScrollEffects } from '@/components/motion/scroll-effects';
import { SmoothScroll } from '@/components/motion/smooth-scroll';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Website Design, Hosting & Care in Bangalore | Pixel Kinetix',
    template: '%s · Pixel Kinetix',
  },
  description:
    'Website design, hosting and monthly care for businesses in Bangalore and across India. Published prices from ₹5,000 and a fixed quote in writing.',
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
        <SmoothScroll />
        <ScrollEffects />
      </body>
    </html>
  );
}
