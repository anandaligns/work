import Link from 'next/link';
import type { ReactNode } from 'react';

import { categories, groupTitles, headings } from '@/content/site';

import { Band } from '../layout/band';
import { Lucide, MENU_ICONS } from '../ui/lucide';
import { NextStepCard, OverviewWindow, ToolHive } from './services-visuals';
import { SectionHead } from './section-head';

/**
 * The fifteen services as one system, in one bordered panel: Digital Experiences and Automation &
 * AI side by side, Business Systems across the foot. Each group opens with what it does as a title
 * and its line, then its services as chips, each to its own page — and
 * under them, a picture of that group at work:
 *
 * - Digital Experiences, the website answering back: customers' requests turning into next steps,
 *   on a ground of small checks;
 * - Automation & AI, the tools working as one: a honeycomb of the tools a business already uses,
 *   our mark on Kinetic Orange at its centre, on a ground of dots;
 * - Business Systems, the place the business runs from: the overview of its own dashboard, cropped
 *   by the panel's foot.
 *
 * The pictures repeat what the words say, so they are hidden from assistive tech. Evolve is told
 * under Pricing, with its plans.
 */
const NUMBER_WORDS: Record<number, string> = { 12: 'Twelve', 15: 'Fifteen', 16: 'Sixteen' };
const total = categories.reduce((sum, category) => sum + category.services.length, 0);

/** The groups in the panel's order — two above, one across the foot — and each one's picture. */
const LAYOUT: { slug: string; visual: () => ReactNode; ground: 'checks' | 'dots' | 'plain' }[] = [
  { slug: 'digital-experiences', visual: NextStepCard, ground: 'checks' },
  { slug: 'automation-ai', visual: ToolHive, ground: 'dots' },
  { slug: 'business-systems', visual: OverviewWindow, ground: 'plain' },
];

export function Services() {
  const groups = LAYOUT.map((entry) => ({
    ...entry,
    category: categories.find((category) => category.slug === entry.slug)!,
  }));
  const [first, second, wide] = groups as [
    (typeof groups)[number],
    (typeof groups)[number],
    (typeof groups)[number],
  ];
  return (
    <Band id="services" labelledBy="services-heading" className="py-24 lg:py-32">
      <SectionHead
        id="services"
        eyebrow={`${NUMBER_WORDS[total] ?? total} services, one system`}
        heading={headings.services}
        intro="Websites, business software and automation, engineered as one system. Start with one, or leave all three to us."
        align="center"
      />
      <div className="svc-panel mt-14 overflow-hidden rounded-[1.75rem] border border-line bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Group {...first} index={0} className="max-lg:border-b lg:border-r" />
          <Group {...second} index={1} />
        </div>
        <Group {...wide} index={2} className="border-t" wide />
      </div>
    </Band>
  );
}

function Group({
  category,
  visual: Visual,
  ground,
  index,
  wide = false,
  className = '',
}: {
  category: (typeof categories)[number];
  visual: () => ReactNode;
  ground: 'checks' | 'dots' | 'plain';
  index: number;
  wide?: boolean;
  className?: string;
}) {
  return (
    <section
      id={category.slug}
      aria-labelledby={`${category.slug}-title`}
      data-reveal=""
      style={{ ['--i' as string]: index }}
      className={`flex min-w-0 scroll-mt-28 flex-col border-line ${className}`}
    >
      <div className="px-6 pt-12 text-center sm:px-10 lg:pt-16">
        <h3
          id={`${category.slug}-title`}
          className="font-display text-[clamp(1.5rem,1.3rem+0.6vw,1.75rem)] leading-tight font-medium tracking-[-0.03em] text-ink"
        >
          {groupTitles[category.slug] ?? category.name}
        </h3>
        <p className="mt-3 text-body text-ink-2">{category.line}</p>
        <ul
          className={`mx-auto mt-8 flex flex-wrap justify-center gap-2.5 ${wide ? 'max-w-6xl' : 'max-w-xl'}`}
        >
          {category.services.map((service) => (
            <li key={service.anchor} id={service.anchor} className="scroll-mt-40">
              <Link
                href={`/services/${service.anchor}`}
                title={service.summary}
                className="svc-chip"
              >
                <span className="svc-chip__icon" aria-hidden="true">
                  <Lucide name={MENU_ICONS[service.anchor] ?? 'sparkles'} size={14} />
                </span>
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        aria-hidden="true"
        className={`svc-ground svc-ground--${ground} relative mt-10 flex flex-1 justify-center overflow-hidden ${
          wide
            ? 'h-[22rem] px-4 pt-2 sm:h-[24rem] sm:px-10'
            : 'min-h-[20rem] items-center px-4 py-8 sm:px-10'
        }`}
      >
        <Visual />
      </div>
    </section>
  );
}
