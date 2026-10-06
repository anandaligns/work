import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Band } from '../layout/band';
import { PageScreen } from '../showcase/cards';
import { Icon } from '../ui/icon';

/**
 * Where to go next, near the end of every service and solution page: the neighbouring pages as
 * cards, each showing its own lead screen — the middle card of that page's fan — rising out of a
 * ground in the page's colour, with its name, a line and an arrow. On a service page the solution
 * it belongs to follows as one wide card, three of its screens fanned. The way back to the whole
 * list sits at the head's right.
 */
export type RelatedItem = {
  slug: string;
  /** A short label over the name: its group, or "Solution". */
  kind: string;
  name: string;
  line: string;
  href: string;
  accent: string;
};

const ground = (accent: string) =>
  `radial-gradient(80% 70% at 50% 0%, color-mix(in srgb, ${accent} 22%, white), transparent 75%), color-mix(in srgb, ${accent} 7%, white)`;

function Arrow() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-[transform,background-color,color,border-color] duration-300 group-hover:translate-x-1 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
      <Icon name="arrow" size={15} />
    </span>
  );
}

function RelatedCard({ item, index }: { item: RelatedItem; index: number }) {
  return (
    <li data-reveal="" style={{ '--i': index } as CSSProperties}>
      <Link
        href={item.href}
        className="related-card group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-white"
        style={{ '--accent': item.accent } as CSSProperties}
      >
        <span
          aria-hidden="true"
          className="relative block h-[12.5rem] overflow-hidden"
          style={{ background: ground(item.accent) }}
        >
          <span className="related-card__screen absolute top-6 left-1/2 block aspect-[3/4] w-[10.5rem] overflow-hidden rounded-[13px] border border-line bg-white">
            <PageScreen slug={item.slug} accent={item.accent} />
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
        </span>
        <span className="flex flex-1 flex-col gap-1 px-5 pt-4 pb-5">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink-2 uppercase">
            {item.kind}
          </span>
          <span className="text-[1.0625rem] leading-snug font-medium text-ink">{item.name}</span>
          <span className="line-clamp-2 text-sm leading-relaxed text-ink-2">{item.line}</span>
          <span className="mt-auto flex justify-end pt-4">
            <Arrow />
          </span>
        </span>
      </Link>
    </li>
  );
}

/** The solution a service is part of: one wide card, its words beside three of its screens. */
function FeatureCard({ item }: { item: RelatedItem }) {
  return (
    <Link
      href={item.href}
      data-reveal=""
      className="related-card group mt-5 grid overflow-hidden rounded-[1.25rem] border border-line bg-white md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
      style={{ '--accent': item.accent } as CSSProperties}
    >
      <span className="flex flex-col gap-2 p-6 sm:p-8">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink-2 uppercase">
          {item.kind}
        </span>
        <span className="text-h3 leading-tight font-medium tracking-[-0.02em] text-ink">
          {item.name}
        </span>
        <span className="max-w-md text-body text-ink-2">{item.line}</span>
        <span className="mt-auto flex items-center gap-3 pt-6 text-sm font-semibold text-ink">
          See the solution
          <Arrow />
        </span>
      </span>
      <span
        aria-hidden="true"
        className="relative block h-[15rem] overflow-hidden md:h-auto md:min-h-[16rem]"
        style={{ background: ground(item.accent) }}
      >
        {[1, 2, 3].map((at, k) => (
          <span
            key={at}
            className="related-fan__card absolute top-8 left-1/2 block aspect-[3/4] w-[9.5rem] overflow-hidden rounded-[12px] border border-line bg-white"
            style={{ '--k': k - 1, zIndex: k === 1 ? 2 : 1 } as CSSProperties}
          >
            <PageScreen slug={item.slug} accent={item.accent} at={at} />
          </span>
        ))}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/80 to-transparent" />
      </span>
    </Link>
  );
}

export function Related({
  id = 'related',
  eyebrow,
  heading,
  items,
  all,
  feature,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  items: RelatedItem[];
  /** The whole list these come from. */
  all: { label: string; href: string };
  /** The solution a service belongs to. */
  feature?: RelatedItem;
}) {
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
            <span className="size-1.5 bg-ink" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-5 text-h2 tracking-[var(--tracking-heading)] text-ink"
          >
            {heading}
          </h2>
        </div>
        <Link
          href={all.href}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-white py-2 pr-2 pl-4 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          {all.label}
          <span className="grid size-7 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <Icon name="arrow" size={13} />
          </span>
        </Link>
      </div>
      <ul
        className={`mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 ${items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}
      >
        {items.map((item, i) => (
          <RelatedCard key={item.href} item={item} index={i} />
        ))}
      </ul>
      {feature ? <FeatureCard item={feature} /> : null}
    </Band>
  );
}
