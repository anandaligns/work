import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';

import { MobileStart } from '@/components/layout/floating-actions';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ScrollEffects } from '@/components/motion/scroll-effects';
import { ScrollBridge } from '@/components/motion/scroll-bridge';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { SITE_URL } from '@/content/site';

import './globals.css';

const DESCRIPTION =
  'Websites, online stores, bookings, WhatsApp automation and dashboards for businesses in Bangalore and across India, built as one system and priced upfront.';

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

/**
 * The three faces the first screen is set in — the body, the headings and buttons, and the
 * lockup — fetched with the page rather than once the stylesheet asks for them, so the opening
 * paints in its own type without a late swap. Latin only; the extended ranges load if needed.
 */
const FIRST_FONTS = ['dm-sans-400', 'dm-sans-500', 'dm-sans-700'];

export default function RootLayout({ children }: { children: ReactNode }) {
  for (const font of FIRST_FONTS)
    preload(`/fonts/${font}.woff2`, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    <html lang="en-IN">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {/* beUI's smooth scroll (`@beui/smooth-scroll`): Lenis on the page, at the two-second
            glide the site has always had. */}
        <SmoothScroll duration={2}>
          <ScrollBridge />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileStart />
          <ScrollEffects />
        </SmoothScroll>
      </body>
    </html>
  );
}
