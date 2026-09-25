import Link from 'next/link';
import type { ReactNode } from 'react';

import { categories, contact, evolve, socials, solutions, type SocialId } from '@/content/site';

import { ModuleField } from '../motion/module-field';
import { Pausable } from '../motion/pause-toggle';
import { BrandSymbol } from '../ui/brand';

/**
 * The footer, in three rows.
 *
 * The site in five columns, the last of them the business itself — phone, email and address. Then, between hairlines, the social row: a heading on the left and a tile for each profile
 * — a glyph in an ink disc, the name and a tilted arrow at the foot; pointed at, the tile turns
 * white, the disc takes the platform's colour and the name darkens and underlines. A profile with
 * no address yet is a placeholder tile, drawn but not a link.
 *
 * And last, the identity's own closing: the page on Graphite Ink and the brand's living pattern,
 * the symbol with its pixel turning, the line, and the copyright centred under a hairline. The routes are the platform's,
 * so this drops into `apps/web`.
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
    links: [
      ...categories.map((c) => ({ label: c.name, href: `/services/${c.slug}` })),
      { label: evolve.name, href: `/services/${evolve.slug}` },
    ],
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

/** Each platform's own colour, taken by its disc when the tile is pointed at. */
const BRAND: Record<SocialId, string> = {
  instagram: '#E4405F',
  linkedin: '#0A66C2',
};

/** The platforms' marks, white, drawn to sit in a 44px disc. */
const GLYPHS: Record<SocialId, ReactNode> = {
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.8" />
      <circle cx="12" cy="12" r="3.1" />
      <circle cx="15.9" cy="8.1" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  linkedin: (
    <g fill="currentColor">
      <rect x="6.6" y="10" width="2.6" height="7.6" />
      <circle cx="7.9" cy="7.2" r="1.55" />
      <path d="M11.3 10h2.5v1.1c.4-.72 1.34-1.32 2.64-1.32 2.28 0 2.86 1.5 2.86 3.44v4.38h-2.6v-3.86c0-.98-.2-1.8-1.3-1.8-1.13 0-1.5.82-1.5 1.8v3.86h-2.6z" />
    </g>
  ),
};

function RollText({ children }: { children: string }) {
  return (
    <span className="roll__text">
      <span className="roll__label">{children}</span>
      <span className="roll__label" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

function SocialTile({ id, label, href }: { id: SocialId; label: string; href: string | null }) {
  const inner = (
    <>
      <span className="social-tile__disc" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-5">
          {GLYPHS[id]}
        </svg>
      </span>
      <span className="social-tile__name">
        {label}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-3.5 -rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </>
  );
  const style = { ['--brand' as string]: BRAND[id] };
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="social-tile" style={style}>
      {inner}
    </a>
  ) : (
    <span className="social-tile" data-placeholder="" style={style}>
      {inner}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="band relative overflow-hidden bg-paper">
      <div className="container-fluid">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-16 pb-14 sm:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="eyebrow text-ink">{column.heading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="roll text-sm text-ink-2 hover:text-ink">
                      <RollText>{link.label}</RollText>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <section aria-labelledby="footer-business">
            <h2 id="footer-business" className="eyebrow text-ink">
              Business info
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-2">
              <li>
                <a href={contact.phoneHref} className="roll hover:text-ink">
                  <RollText>{contact.phone}</RollText>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="roll hover:text-ink">
                  <RollText>{contact.email}</RollText>
                </a>
              </li>
              <li>
                <address className="leading-relaxed not-italic">
                  {contact.locality.split(' · ').map((part, i, parts) => (
                    <span key={part}>
                      {part}
                      {i < parts.length - 1 ? ',' : ''}
                      <br />
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </section>
        </div>

        <section
          aria-labelledby="footer-social"
          className="grid gap-8 border-t border-b border-line py-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16"
        >
          <div>
            <h2
              id="footer-social"
              className="max-w-[12ch] font-display text-[1.75rem] leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2rem]"
            >
              Follow us across the internet
            </h2>
            <p className="mt-2 text-xs text-ink-2">Social links</p>
          </div>
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {socials.map((social) => (
              <li key={social.id}>
                <SocialTile {...social} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* The identity's closing view: the symbol turning on the ink, the line, and the copyright
          centred under a hairline — on the brand's living pattern, in its ink version, clearing
          away over the words. One pause stops both. */}
      <div className="on-night mt-16 bg-night text-white">
        <Pausable
          label="the logo and the pattern"
          tone="night"
          className="container-fluid overflow-hidden"
          buttonClassName="top-8 right-[var(--gutter)]"
        >
          <div aria-hidden="true" className="module-field pointer-events-none absolute inset-0">
            <ModuleField tone="dark" bottom={720} clearing={[0.46, 0.94]} />
          </div>
          <div className="relative grid justify-items-center gap-[1.875rem] pt-[clamp(5.5rem,12vw,9.5rem)] pb-9 text-center">
            <BrandSymbol ink="#FFFFFF" className="pk-loop w-[clamp(5.5rem,10vw,8.75rem)]" />
            <p className="max-w-[16em] font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              Engineered to move you forward.
            </p>
            <p className="mt-[clamp(3rem,8vw,6rem)] w-full border-t border-[#252a3b] pt-[1.125rem] font-tech text-[0.71875rem] tracking-[0.14em] text-[#8a8fa3] uppercase">
              © {new Date().getFullYear()} Pixel Kinetix · All rights reserved
            </p>
          </div>
        </Pausable>
      </div>
    </footer>
  );
}
