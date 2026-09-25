import Link from 'next/link';

import { categories, contact, evolve, socials, solutions } from '@/content/site';

import { ModuleField } from '../motion/module-field';
import { Pausable } from '../motion/pause-toggle';
import { BrandSymbol } from '../ui/brand';

/**
 * The footer, in two rows.
 *
 * The site in six columns — the pages, then the business itself (phone, email and address) and its
 * social profiles, all as plain text links. A profile with no address yet is its name alone, not a
 * link, until its address is added in `site.ts`.
 *
 * And last, the identity's own closing: the page on Graphite Ink and the brand's living pattern,
 * the symbol with its pixel turning, the line, and the copyright centred under a hairline. The
 * routes are the platform's, so this drops into `apps/web`.
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

export function Footer() {
  return (
    <footer className="band relative overflow-hidden bg-paper">
      <div className="container-fluid">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-16 pb-16 sm:grid-cols-3 lg:grid-cols-6">
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
          <nav aria-label="Social">
            <h2 className="eyebrow text-ink">Social</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-2">
              {socials.map((social) => (
                <li key={social.id}>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="roll hover:text-ink"
                    >
                      <RollText>{social.label}</RollText>
                    </a>
                  ) : (
                    <span>{social.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* The identity's closing view: the symbol turning on the ink, the line, and the copyright
          centred under a hairline — on the brand's living pattern, in its ink version, clearing
          away over the words. One pause stops both. */}
      <div className="on-night bg-night text-white">
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
