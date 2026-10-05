'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { SPRING_PRESS } from '@/lib/ease';

import { Icon } from './icon';

/**
 * pk-static's rolling action. The label is shown twice — the second copy drawn by CSS from
 * `data-label`, so it is neither read out nor indexed as a second line of text — and hover rolls
 * the pair up one line; the arrow is tilted 45° and rolls out to the upper right as its
 * twin rolls in from the lower left. CSS only (`.roll` in globals.css), so it works before the
 * page hydrates.
 *
 * An `icon` leads the label and spins a full turn on hover; `shake` rings it every 2.4s, the way
 * Call Now's phone does. `mailto:` and `tel:` links are plain links, opened in place.
 *
 * Pressed, it gives a little under beUI's press spring (`SPRING_PRESS`, as beUI's Button does) —
 * the one part that runs on script, so the roll still works before the page hydrates. The hover
 * lift is CSS `translate`, separate from the press's `transform`, so the two never fight.
 */
const MotionLink = motion.create(Link);
const PRESS = { scale: 0.96 };
const VARIANTS = {
  ink: 'btn-ink',
  line: 'btn-line',
  paper: 'btn-paper',
  kinetic: 'btn-kinetic',
  whatsapp: 'btn-whatsapp',
  /** An outline on a dark ground. */
  ghost: 'btn-ghost',
} as const;

/** Console's sizes: 32px in a bar, 40px for a page's actions, the corner growing a little with
 *  the height. */
const SIZES = {
  xs: 'h-8 gap-2 px-3 text-[0.875rem] font-medium [--radius-btn:8px]',
  sm: 'h-9 gap-2 px-3.5 text-[0.875rem] font-medium [--radius-btn:8px]',
  md: 'h-10 px-4 text-[0.9375rem] font-medium [--radius-btn:9px]',
  lg: 'h-11 px-5 text-[0.9375rem] font-medium [--radius-btn:10px]',
} as const;

function Arrow() {
  return <Icon name="arrow" strokeWidth={1.8} />;
}

export function RollLabel({ children, arrow = true }: { children: string; arrow?: boolean }) {
  return (
    <>
      <span className="roll__text">
        <span className="roll__label">{children}</span>
        <span className="roll__label roll__twin" aria-hidden="true" data-label={children} />
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
  icon,
  shake = false,
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
  icon?: ReactNode;
  shake?: boolean;
  onClick?: () => void;
}) {
  const classes = `roll ${VARIANTS[variant]} ${SIZES[size]} justify-center ${className}`;
  const inner: ReactNode = (
    <>
      {signal ? <span className="signal" aria-hidden="true" /> : null}
      {icon ? (
        <span className={`roll__icon ${shake ? 'roll__icon--shake' : ''}`} aria-hidden="true">
          <span>{icon}</span>
        </span>
      ) : null}
      <RollLabel arrow={arrow}>{children}</RollLabel>
    </>
  );
  const reduce = useReducedMotion();
  const press = { whileTap: reduce ? undefined : PRESS, transition: SPRING_PRESS };
  if (/^(mailto|tel):/.test(href)) {
    return (
      <motion.a href={href} className={classes} onClick={onClick} {...press}>
        {inner}
      </motion.a>
    );
  }
  return external ? (
    <motion.a
      href={href}
      className={classes}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      {...press}
    >
      {inner}
    </motion.a>
  ) : (
    <MotionLink href={href} className={classes} onClick={onClick} {...press}>
      {inner}
    </MotionLink>
  );
}
