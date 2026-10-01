import Link from 'next/link';

import { categories, contact, evolve, socials, solutions } from '@/content/site';

import { Logo } from '../ui/logo';
import { BackToTop } from './back-to-top';

/**
 * The footer, in the header's light — Apple's #f5f5f7 under a hairline — and still.
 *
 * First the lockup and its line: across the full width on phones and tablets, the first column
 * from 1280px — on the left edge at every width. Then the site in six columns of plain links —
 * Explore, Services, Solutions, Legal, the business itself and its social profiles (a profile with
 * no address yet is its name alone, until its address is added in `site.ts`). Last, under a
 * hairline, Apple's closing row: the copyright on the left, the way back to the top on the right.
 */
const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/#work' },
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
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms and Conditions', href: '/terms' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Grievance', href: '/grievance' },
    ],
  },
];

const LINK = 'roll text-ink-2 hover:text-ink';

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
    <footer className="site-foot">
      <div className="container-fluid">
        <div className="grid gap-14 pt-16 pb-16 lg:pt-20 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-x-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-[14em] font-display text-h3 tracking-[var(--tracking-heading)] text-balance xl:max-w-[11em]">
              Engineered to move you forward.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 text-sm min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(6,max-content)] lg:justify-between">
            {COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="eyebrow text-ink">{column.heading}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={LINK}>
                        <RollText>{link.label}</RollText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <section aria-labelledby="footer-business" className="min-[360px]:max-sm:col-span-2">
              <h2 id="footer-business" className="eyebrow text-ink">
                Business info
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-ink-2">
                <li>
                  <a href={contact.phoneHref} className={LINK}>
                    <RollText>{contact.phone}</RollText>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className={LINK}>
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
              <ul className="mt-4 flex flex-col gap-2.5 text-ink-2">
                {socials.map((social) => (
                  <li key={social.id}>
                    {social.href ? (
                      <a href={social.href} target="_blank" rel="noreferrer" className={LINK}>
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

        {/* Apple's closing row. */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line-2 pt-5 pb-8 text-xs text-ink-2">
          <p>Copyright © {new Date().getFullYear()} Pixel Kinetix. All rights reserved.</p>
          <BackToTop className="hover:text-ink" />
        </div>
      </div>
    </footer>
  );
}
