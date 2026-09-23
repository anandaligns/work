import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * pk-static's rolling action. The label is written twice — the second copy `aria-hidden` — and
 * hover rolls the pair up one line; the arrow is tilted 45° and rolls out to the upper right as its
 * twin rolls in from the lower left. CSS only (`.roll` in globals.css), so it works before the
 * page hydrates.
 */
const VARIANTS = {
  ink: 'btn-ink',
  line: 'btn-line',
  paper: 'btn-paper',
} as const;

const SIZES = {
  md: 'h-12 px-6 text-sm font-semibold',
  sm: 'h-10 px-4 text-[0.8125rem] font-semibold',
  lg: 'h-14 px-7 text-[0.9375rem] font-semibold',
} as const;

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function RollLabel({ children, arrow = true }: { children: string; arrow?: boolean }) {
  return (
    <>
      <span className="roll__text">
        <span className="roll__label">{children}</span>
        <span className="roll__label" aria-hidden="true">
          {children}
        </span>
      </span>
      {arrow ? (
        <span className="roll__arrow" aria-hidden="true">
          <Arrow />
          <Arrow />
        </span>
      ) : null}
    </>
  );
}

export function RollLink({
  href,
  children,
  variant = 'ink',
  size = 'md',
  arrow = true,
  signal = false,
  className = '',
  external = false,
  onClick,
}: {
  href: string;
  children: string;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  arrow?: boolean;
  signal?: boolean;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const classes = `roll ${VARIANTS[variant]} ${SIZES[size]} justify-center ${className}`;
  const inner: ReactNode = (
    <>
      {signal ? <span className="signal" aria-hidden="true" /> : null}
      <RollLabel arrow={arrow}>{children}</RollLabel>
    </>
  );
  return external ? (
    <a href={href} className={classes} target="_blank" rel="noreferrer" onClick={onClick}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}
