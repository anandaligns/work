import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import { Band } from '../layout/band';
import { Icon, type IconName } from '../ui/icon';

/**
 * A band of cards under a page's intro — the related services on a service's page, a solution's
 * bundles, the ways to reach us. Each card is separate, so any number of them fills the grid
 * without an empty cell showing.
 */
export function CardBand({
  id,
  eyebrow,
  title,
  children,
  columns = 3,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  const grid =
    columns === 2
      ? 'md:grid-cols-2'
      : columns === 4
        ? 'md:grid-cols-2 xl:grid-cols-4'
        : 'md:grid-cols-2 lg:grid-cols-3';
  return (
    <Band id={id} labelledBy={`${id}-heading`} className="py-20 lg:py-28">
      <p data-reveal="" className="eyebrow inline-flex items-center gap-2">
        <span className="size-1.5 bg-ink" />
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-5 max-w-2xl text-h2 tracking-[var(--tracking-heading)] text-ink"
      >
        {title}
      </h2>
      <ul className={`mt-12 grid gap-4 ${grid}`}>{children}</ul>
    </Band>
  );
}

/** One card: an icon, a name, a line, and — when it goes somewhere — the whole card as the link. */
export function Card({
  icon,
  name,
  line,
  href,
  external = false,
  index = 0,
  children,
}: {
  icon: IconName;
  name: string;
  line?: string;
  href?: string;
  external?: boolean;
  index?: number;
  children?: ReactNode;
}) {
  const body = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink transition-colors duration-300 group-hover:bg-graphite group-hover:text-white">
        <Icon name={icon} size={18} />
      </span>
      <span className="mt-6 block font-display text-h4 font-medium text-ink">{name}</span>
      {line ? <span className="mt-2 block text-sm text-ink-2">{line}</span> : null}
      {children}
    </>
  );
  const box =
    'group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 transition-colors duration-300';
  return (
    <li data-reveal="" style={{ '--i': index } as CSSProperties}>
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noreferrer" className={`${box} hover:bg-fill`}>
            {body}
          </a>
        ) : (
          <Link href={href} className={`${box} hover:bg-fill`}>
            {body}
          </Link>
        )
      ) : (
        <div className={box}>{body}</div>
      )}
    </li>
  );
}
