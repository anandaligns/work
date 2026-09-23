import Link from 'next/link';
import type { ReactNode } from 'react';

import { categories, contact, solutions } from '@/content/site';

import { Icon } from '../ui/icon';
import { Logo } from '../ui/logo';

/**
 * pk-static's footer. The lockup and its one line, the site in four columns, and then — as its own
 * full row under a hairline, as pk-static has it — **Business Info**: five pills for the five ways
 * to reach the business, spread across the row while they fit on one line and packed from the left
 * once they wrap. Neutral at rest; the pointed-at pill lifts 3px into a larger shadow (pk-static,
 * from hbranalytics' quick buttons). The routes are the platform's, so this drops into `apps/web`.
 */
const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Work', href: '/#work' },
      { label: 'Process', href: '/#process' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    heading: 'Services',
    links: categories.map((c) => ({ label: c.name, href: `/services/${c.slug}` })),
  },
  {
    heading: 'Solutions',
    links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

const GLYPHS: Record<string, ReactNode> = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-full">
      <path
        transform="translate(3 3) scale(0.75)"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
      />
    </svg>
  ),
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-full"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.1" cy="6.9" r="0.9" />
    </svg>
  ),
  maps: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-full"
    >
      <path d="M12 21s7-5.4 7-10.5a7 7 0 1 0-14 0C5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.6" />
    </svg>
  ),
};

function Pill({
  href,
  glyph,
  children,
  external = false,
}: {
  href: string;
  glyph: ReactNode;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="footer-pill"
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="footer-pill__glyph">{glyph}</span>
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="band relative overflow-hidden bg-paper" aria-labelledby="footer-heading">
      <div className="contain">
        <div className="grid gap-12 pt-16 pb-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
          <div>
            <Logo />
            <h2
              id="footer-heading"
              className="mt-6 max-w-sm font-display text-h3 tracking-[var(--tracking-heading)]"
            >
              Everything your website needs, in one place.
            </h2>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 className="eyebrow text-ink">{column.heading}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="roll text-sm text-ink-2 hover:text-ink">
                        <span className="roll__text">
                          <span className="roll__label">{link.label}</span>
                          <span className="roll__label" aria-hidden="true">
                            {link.label}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <section
          aria-labelledby="footer-business-info"
          className="grid gap-4 border-t border-line py-8"
        >
          <h2 id="footer-business-info" className="eyebrow">
            Business Info
          </h2>
          <div className="footer-pills">
            <Pill href={contact.phoneHref} glyph={<Icon name="phone" size={15} />}>
              {contact.phone}
            </Pill>
            <Pill href={`mailto:${contact.email}`} glyph={<Icon name="mail" size={15} />}>
              {contact.email}
            </Pill>
            <Pill href={contact.whatsappHref} glyph={GLYPHS.whatsapp} external>
              WhatsApp
            </Pill>
            <Pill href={contact.instagramHref} glyph={GLYPHS.instagram} external>
              {contact.instagram}
            </Pill>
            <Pill href={contact.mapsHref} glyph={GLYPHS.maps} external>
              Google Maps
            </Pill>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 pb-5 text-xs text-ink-2 md:pb-24">
          <span>© {new Date().getFullYear()} Pixel Kinetix. All rights reserved.</span>
          <span className="font-tech tracking-[var(--tracking-label)] uppercase">
            {contact.locality}
          </span>
        </div>
      </div>
    </footer>
  );
}
