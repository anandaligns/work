import Link from 'next/link';
import type { ReactNode } from 'react';

import { Band } from '../layout/band';
import { Icon, type IconName } from '../ui/icon';
import { RollLabel } from '../ui/roll-link';
import { TintPanel } from './light-kit';

/**
 * Sections for the solution page v2, in the site's own light: our greys and whites, small quiet
 * type, and the page's tint behind its mockups.
 */

/**
 * The system behind it: three columns, each a mockup on the page's tint, a name, a line, and the
 * way on to the service that does it.
 */
export function SystemRow({
  id = 'behind',
  head,
  cards,
  tint,
  accent,
}: {
  id?: string;
  head: ReactNode;
  cards: { scene: ReactNode; title: string; body: string; cta: { label: string; href: string } }[];
  tint: string;
  /** The colour the mockups' states take (`TintPanel`), as on the service pages. */
  accent?: string;
}) {
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="py-24 lg:py-32">
      {head}
      <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-6 lg:mt-16">
        {cards.map((card, i) => (
          <li key={card.title} data-reveal="" style={{ ['--i' as string]: i }}>
            <TintPanel tint={tint} accent={accent} className="h-[280px] lg:h-[300px]">
              {card.scene}
            </TintPanel>
            <h3 className="mt-6 text-[1.25rem] leading-snug font-medium tracking-[-0.02em] text-ink">
              {card.title}
            </h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">{card.body}</p>
            <Link
              href={card.cta.href}
              className="roll mt-5 inline-flex text-sm font-semibold text-ink"
            >
              <RollLabel>{card.cta.label}</RollLabel>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/**
 * HBR's "Benefits of our solutions": five boxes in two rows — the first wide, its words beside a
 * mockup on the page's tint; the other four with a glyph in the page's colour, a name and a line.
 */
export function Benefits({
  id = 'benefits',
  head,
  wide,
  items,
  accent,
  tint,
}: {
  id?: string;
  head: ReactNode;
  wide: { title: string; body: string; scene: ReactNode };
  items: { icon: IconName; title: string; body: string }[];
  accent: string;
  tint: string;
}) {
  const box =
    'rounded-[24px] border border-line bg-[#f7f7f9] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[color-mix(in_srgb,var(--accent)_22%,transparent)] hover:shadow-[0_18px_40px_-24px_rgb(11_13_18/0.25)]';
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="py-24 lg:py-32">
      {head}
      <ul
        className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
        style={{ ['--accent' as string]: accent }}
      >
        <li
          data-reveal=""
          className={`${box} flex flex-col overflow-hidden md:col-span-2 lg:flex-row lg:items-stretch`}
        >
          <div className="flex flex-col justify-center p-8 lg:w-[46%] lg:p-10">
            <h3 className="text-[1.25rem] leading-snug font-medium tracking-[-0.02em] text-ink">
              {wide.title}
            </h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">{wide.body}</p>
          </div>
          <TintPanel
            tint={tint}
            className="m-3 mt-0 h-[220px] rounded-[18px] lg:mt-3 lg:ml-0 lg:h-auto lg:min-h-[230px] lg:flex-1"
          >
            {wide.scene}
          </TintPanel>
        </li>
        {items.map((item, i) => (
          <li
            key={item.title}
            data-reveal=""
            style={{ ['--i' as string]: i + 1 }}
            className={`${box} flex flex-col justify-center p-8`}
          >
            <span style={{ color: accent }}>
              <Icon name={item.icon} size={28} strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 text-[1.125rem] leading-snug font-medium tracking-[-0.02em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{item.body}</p>
          </li>
        ))}
      </ul>
    </Band>
  );
}
