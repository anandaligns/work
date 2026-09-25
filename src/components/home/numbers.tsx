import { headings, numbers } from '@/content/site';

import { Band } from '../layout/band';
import { CountUp } from '../motion/count-up';
import { SectionHead } from './section-head';

/**
 * aoutive's stats row. As there, the figures do not move in — they count, on aoutive's spring
 * (`CountUp`), and that is the whole of it. Every figure is already on the price list or in the
 * catalogue — none of them is a count of clients or projects this business does not have yet.
 */
export function Numbers() {
  return (
    <Band id="numbers" labelledBy="numbers-heading" className="py-24">
      <SectionHead id="numbers" eyebrow="In numbers" heading={headings.numbers} align="center" />
      <dl className="mt-14 grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {numbers.map((n) => (
          <div
            key={n.label}
            className="flex flex-col items-center gap-2 border-line px-4 py-10 text-center odd:border-r lg:border-r lg:last:border-r-0"
          >
            <dt className="order-2 text-sm font-medium text-ink">{n.label}</dt>
            <dd className="order-1 font-display text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-none tracking-[var(--tracking-display)] whitespace-nowrap text-ink">
              <CountUp value={n.value} />
              <span className="text-ink-3">{n.suffix}</span>
            </dd>
            <dd className="order-3 text-xs text-ink-2">{n.note}</dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}
