import type { CSSProperties } from 'react';

import type { PriceCard } from '@/content/pages';
import { startFor } from '@/content/site';

import { Icon } from '../ui/icon';
import { RollLink } from '../ui/roll-link';

/**
 * Prices as the home page's Pricing draws them: the name, the figure at display size with its
 * "From" small ahead of it, what the figure is (one-time, a fixed fee, quoted in writing), the
 * timeline, the button, and what is included under a hairline — one card drawn in ink when it is
 * the page's focal price. Every button carries the card's `?interest=`, so the form opens on it.
 *
 * `compact` is the group pages' row of small cards: the figure, the timeline and one line.
 */
export function PriceCards({ cards, compact = false }: { cards: PriceCard[]; compact?: boolean }) {
  const grid =
    cards.length === 1
      ? 'max-w-md'
      : cards.length === 2
        ? 'md:grid-cols-2 lg:max-w-4xl'
        : 'md:grid-cols-2 lg:grid-cols-3';
  return (
    <ul className={`grid gap-4 ${grid}`}>
      {cards.map((card, i) => {
        const focal = Boolean(card.focal) && cards.length > 1;
        const from = card.price.startsWith('From ');
        const figure = from ? card.price.slice(5) : card.price;
        return (
          <li
            key={card.name}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className={`flex flex-col rounded-[var(--radius-panel)] border p-7 ${
              focal ? 'on-night border-night bg-night text-white' : 'border-line bg-white text-ink'
            }`}
          >
            <h3 className="font-display text-h4 font-medium">{card.name}</h3>
            <p
              className={`${compact ? 'mt-4' : 'mt-6'} flex flex-wrap items-baseline gap-x-2 gap-y-1`}
            >
              {from ? (
                <span className={`text-sm ${focal ? 'text-white/60' : 'text-ink-2'}`}>From</span>
              ) : null}
              <span
                className={`font-display leading-none tracking-[var(--tracking-display)] whitespace-nowrap ${
                  compact ? 'text-[2rem]' : 'text-[2.5rem]'
                }`}
              >
                {figure}
              </span>
              <span className={`text-sm ${focal ? 'text-white/60' : 'text-ink-2'}`}>
                {card.unit}
              </span>
            </p>
            {card.timeline ? (
              <p
                className={`mt-3 inline-flex items-center gap-2 font-tech text-xs ${focal ? 'text-white/70' : 'text-ink-2'}`}
              >
                <Icon name="calendar" size={13} /> {card.timeline}
              </p>
            ) : null}
            {compact ? (
              <p className={`mt-4 text-sm ${focal ? 'text-white/80' : 'text-ink-2'}`}>
                {card.lines.join(' · ')}
              </p>
            ) : null}
            {/* Small cards push the button to the foot; full ones keep it under the figure, so
                every button in a row sits at one height. */}
            {compact ? <span aria-hidden="true" className="min-h-6 grow" /> : null}
            <RollLink
              href={startFor(card.interest)}
              variant={focal ? 'paper' : 'line'}
              className={compact ? 'w-full' : 'mt-7 w-full'}
            >
              {card.cta ?? `Start with ${card.name}`}
            </RollLink>
            {!compact && card.lines.length ? (
              <ul
                className={`mt-7 flex flex-col gap-3 border-t pt-6 text-sm ${focal ? 'border-white/15' : 'border-line'}`}
              >
                {card.lines.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${focal ? 'bg-white text-ink' : 'bg-ink text-white'}`}
                    >
                      <Icon name="check" size={10} strokeWidth={3} />
                    </span>
                    <span className={focal ? 'text-white/85' : 'text-ink'}>{line}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
