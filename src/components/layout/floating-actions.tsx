'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { contact, START } from '@/content/site';

import { Icon } from '../ui/icon';

/**
 * pk-static's quick-contact controls, brought across with their motion. Parked: no page renders
 * them. Call Now moved into the contact page's headline, and the lower right is kept for the AI
 * assistant's launcher (`assistant.tsx`, parked too). Kept whole to bring back. On a phone the bar needs room
 * at the foot of the page; `globals.css` extends the footer by 5rem whenever the bar is there.
 *
 * - **Call Now** — lower right, in Graphite Ink, its phone shaking on `ring-shake` every
 *   2.4s. On hover it lifts 2px into a larger shadow and the glyph spins a full turn (pk-static,
 *   from Carz). The shake and the spin live on different elements so they never fight.
 * - **Back to top** — at the edge, right of Call Now, opening its own slot once the page has moved a
 *   screen, so Call Now sits at the edge until then and steps aside for it; it glides on Lenis.
 * - **The side rail** — WhatsApp, in its green, as a vertical tab on the right edge, tucked 0.5rem
 *   off-screen and sliding in on hover or focus while its glyph spins.
 * - **On a phone**, as pk-static has it, Call Now and WhatsApp share one bar along the bottom, and
 *   the rail becomes Get Started — which the header no longer carries at that width — as a
 *   slim graphite tab on the right edge.
 *
 * WhatsApp's green is darker than pk-static's: white on their #21bb63 is 2.6:1, and this is 5:1.
 *
 * `showStart={false}` leaves the phone's Get Started tab off — for the contact page, which is where
 * Get Started leads.
 *
 * The phone's Get Started tab also stands on its own, site-wide (`MobileStart`, in the layout),
 * while the rest stays parked.
 */
/** The glyphs are the site's own Tabler marks, a touch heavier here to hold on the solid buttons. */
function WhatsAppGlyph({ className = 'size-[1.1rem]' }: { className?: string }) {
  return <Icon name="whatsapp" strokeWidth={1.8} className={className} />;
}

/** pk-static's rail arrow: a plain right arrow, turned by the rail's CSS. */
function RailArrow() {
  return <Icon name="arrow" strokeWidth={1.8} />;
}

function PhoneGlyph() {
  return <Icon name="phone" strokeWidth={1.8} className="size-[1.1rem]" />;
}

export function FloatingActions({ showStart = true }: { showStart?: boolean }) {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const onScroll = () => setAway(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <aside aria-label="Quick contact">
      {/* Lower right, from 768px: Call Now in graphite, back to top at the edge. */}
      <div className="quick-actions">
        <a
          href={contact.phoneHref}
          className="quick-call"
          aria-label={`Call Pixel Kinetix on ${contact.phone}`}
        >
          <span className="quick-call__shake">
            <span className="quick-spin">
              <PhoneGlyph />
            </span>
          </span>
          <span>Call Now</span>
        </a>
        <button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          data-shown={away || undefined}
          tabIndex={away ? 0 : -1}
          className="quick-top"
        >
          <span className="quick-spin">
            <Icon name="arrow" size={18} className="-rotate-90" />
          </span>
        </button>
      </div>

      {/* The right-edge rail: WhatsApp in its own green from 768px, Get Started on phones. */}
      <div className="side-rail">
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="side-rail__whatsapp"
        >
          <span className="side-rail__glyph">
            <WhatsAppGlyph className="size-[1.15rem]" />
          </span>
          <span>WhatsApp</span>
        </a>
        {/* On the page Get Started leads to, the tab would only lead back to it. */}
        {showStart ? (
          <Link href={START.href} className="side-rail__start">
            <span className="signal" aria-hidden="true" />
            <span>{START.label}</span>
            <span className="side-rail__arrow" aria-hidden="true">
              <RailArrow />
              <RailArrow />
            </span>
          </Link>
        ) : null}
      </div>

      {/* Phones: back to top above the bar, then the bar — Call Now and WhatsApp. */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        data-shown={away || undefined}
        tabIndex={away ? 0 : -1}
        className="quick-top mobile-top md:hidden"
      >
        <span className="quick-spin">
          <Icon name="arrow" size={18} className="-rotate-90" />
        </span>
      </button>
      <div className="mobile-bar">
        <a
          href={contact.phoneHref}
          className="quick-call"
          aria-label={`Call Pixel Kinetix on ${contact.phone}`}
        >
          <span className="quick-call__shake">
            <span className="quick-spin">
              <PhoneGlyph />
            </span>
          </span>
          Call Now
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mobile-bar__whatsapp"
        >
          <span className="quick-spin">
            <WhatsAppGlyph />
          </span>
          WhatsApp
        </a>
      </div>
    </aside>
  );
}

/**
 * Get Started on a phone, on every page: the rail's slim tab on the right edge, halfway down,
 * tucked 0.5rem off-screen and sliding in when touched — in the site's ink button, its gradient,
 * ring and highlight. From 768px the header carries Get Started, so the tab is phones only; on the
 * page Get Started leads to, it would only lead back, so it stays off there.
 */
export function MobileStart() {
  const path = usePathname();
  if (path === START.href) return null;
  return (
    <div className="side-rail md:hidden">
      <Link href={START.href} className="side-rail__start">
        <span className="signal" aria-hidden="true" />
        <span>{START.label}</span>
        <span className="side-rail__arrow" aria-hidden="true">
          <RailArrow />
          <RailArrow />
        </span>
      </Link>
    </div>
  );
}
