import type { CSSProperties, ReactNode } from 'react';

import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';

/**
 * The light mockup kit: the few pieces of the product that tell a story, drawn on the page's pale
 * tint — white cards with a hairline and a soft shadow, small quiet type, fine dashed wires in
 * the page's colour with a ringed dot at each end, and one white pill for the outcome. Every
 * piece sits on a fixed canvas (see `Fit`), placed to the pixel so nothing is cut or crowded,
 * and rises in after the one before (`i`).
 */

type Place = { x: number; y: number; w?: number; h?: number; i?: number };

/** Text on a fill of this colour: white, or ink where the colour is too light for white. */
export function onColour(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return 1.05 / (l + 0.05) >= 3 ? '#ffffff' : '#0b0d12';
}

/** A colour deepened toward ink, so it reads as text or a small mark on white. */
export const deep = (c: string, p = 78) => `color-mix(in srgb, ${c} ${p}%, #0b0d12)`;

/**
 * A glyph on a pale chip of its colour: the colour itself, or its darker step where the colour is
 * too light to read (a yellow, an aqua). Anything that isn't a plain hex passes through.
 */
export const markColour = (c: string) =>
  /^#[0-9a-f]{6}$/i.test(c) && onColour(c) !== '#ffffff' ? deep(c, 68) : c;

const place = ({ x, y, w, h, i = 0 }: Place): CSSProperties =>
  ({ left: x, top: y, width: w, height: h, '--i': i }) as CSSProperties;

/**
 * The panel a mockup sits on: the page's tint, a faint dot grid, fading to the edges. Given the
 * page's colour, everything inside that has a state — a tag, a face, a tick — takes a step of it
 * too (`.mock-scope`), so a page's mockups stay in one colour.
 */
export function TintPanel({
  tint,
  accent,
  className = '',
  children,
}: {
  tint: string;
  accent?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-[20px] ${accent ? 'mock-scope' : ''} ${className}`}
      style={{ background: tint, ...(accent ? { '--mock': accent } : {}) } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(11_13_18/0.09)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_80%)]" />
      {children}
    </div>
  );
}

/** A white card, floating. */
export function Card({
  className = '',
  children,
  ...at
}: Place & { className?: string; children: ReactNode }) {
  return (
    <div
      className={`frag-in absolute rounded-[14px] border border-[#e6e7eb] bg-white text-ink shadow-[0_1px_2px_rgb(11_13_18/0.04),0_16px_36px_-16px_rgb(11_13_18/0.2)] ${className}`}
      style={place(at)}
    >
      {children}
    </div>
  );
}

/** A glyph on the page's tint, or a tool's mark on grey. */
export function Mark({
  icon,
  tool,
  accent,
  size = 30,
}: {
  icon?: IconName;
  tool?: string;
  accent: string;
  size?: number;
}) {
  return tool ? (
    <span
      className="grid shrink-0 place-items-center rounded-[9px] bg-[#f4f4f6]"
      style={{ width: size, height: size }}
    >
      <ToolMark tool={tool} size={Math.round(size * 0.55)} />
    </span>
  ) : (
    <span
      className="grid shrink-0 place-items-center rounded-[9px]"
      style={{
        width: size,
        height: size,
        background: `color-mix(in srgb, ${accent} 11%, white)`,
        color: markColour(accent),
      }}
    >
      <Icon name={icon ?? 'spark'} size={Math.round(size * 0.5)} />
    </span>
  );
}

/** A card's heading: its mark, a title and a line, and something on the right. */
export function Head({
  icon,
  tool,
  accent,
  title,
  meta,
  right,
}: {
  icon?: IconName;
  tool?: string;
  accent: string;
  title: string;
  meta?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Mark icon={icon} tool={tool} accent={accent} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] leading-tight font-semibold">{title}</span>
        {meta ? (
          <span className="mt-0.5 block truncate text-[11px] leading-tight text-ink-3">{meta}</span>
        ) : null}
      </span>
      {right}
    </div>
  );
}

/** A person's initials, on a soft tone — or, in a page's panel, a pale step of its colour. */
export function Face({ name, tone = '#eef0f4' }: { name: string; tone?: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  return (
    <span
      data-shade={(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % 3}
      className="mk-face grid size-[26px] shrink-0 place-items-center rounded-full text-[10px] font-semibold text-ink-2"
      style={{ '--face': tone } as CSSProperties}
    >
      {initials}
    </span>
  );
}

/** A row in a card. */
export function Row({
  lead,
  title,
  meta,
  right,
  muted = false,
}: {
  lead?: ReactNode;
  title: string;
  meta?: string;
  right?: ReactNode;
  muted?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 py-2 ${muted ? 'opacity-45' : ''}`}>
      {lead}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] leading-tight font-medium">{title}</span>
        {meta ? (
          <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-ink-3">
            {meta}
          </span>
        ) : null}
      </span>
      {right}
    </div>
  );
}

/** A small status. */
export function Tag({
  children,
  tone = 'plain',
  accent,
}: {
  children: ReactNode;
  tone?: 'plain' | 'ok' | 'wait' | 'accent';
  accent?: string;
}) {
  // Done and waiting are green and amber on their own; in a page's panel, steps of its colour.
  const style: CSSProperties | undefined =
    tone === 'accent' && accent
      ? { background: `color-mix(in srgb, ${accent} 12%, white)`, color: deep(accent) }
      : tone === 'plain' || (tone === 'accent' && !accent)
        ? { background: '#f2f2f4', color: '#5b6070' }
        : undefined;
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-[3px] text-[10px] leading-none font-semibold whitespace-nowrap ${tone === 'ok' ? 'mk-tag-ok' : tone === 'wait' ? 'mk-tag-wait' : ''}`}
      style={style}
    >
      {children}
    </span>
  );
}

/** The outcome, as a white pill with a tick in the page's colour (ink on a light one). */
export function Pill({
  accent,
  icon = 'check',
  children,
  ...at
}: Place & { accent: string; icon?: IconName; children: ReactNode }) {
  return (
    <div
      className="frag-in absolute flex items-center gap-2 rounded-full border border-[#e6e7eb] bg-white py-1.5 pr-3.5 pl-1.5 text-[12px] font-medium whitespace-nowrap text-ink shadow-[0_12px_28px_-12px_rgb(11_13_18/0.25)]"
      style={place(at)}
    >
      <span
        className="grid size-[22px] shrink-0 place-items-center rounded-full"
        style={{ background: accent, color: onColour(accent) }}
      >
        <Icon name={icon} size={12} strokeWidth={2.6} />
      </span>
      {children}
    </div>
  );
}

/** Fine dashed wires in the page's colour, flowing, with a ringed dot at each named point. */
export function Wires({
  w,
  h,
  d,
  dots = [],
  accent,
}: {
  w: number;
  h: number;
  d: string[];
  dots?: [number, number][];
  accent: string;
}) {
  return (
    <svg
      className="frag-in pointer-events-none absolute inset-0"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      style={{ '--i': 1 } as CSSProperties}
    >
      {d.map((path) => (
        <path
          key={path}
          d={path}
          stroke={accent}
          strokeOpacity={0.55}
          strokeWidth={1.25}
          strokeDasharray="3 4"
          strokeLinecap="round"
          className="wire-flow"
        />
      ))}
      {dots.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={6} fill={accent} className="dot-pulse" />
          <circle cx={x} cy={y} r={3.5} fill="#fff" stroke={accent} strokeWidth={1.5} />
        </g>
      ))}
    </svg>
  );
}

/**
 * Pieces moved as one, keeping their own places inside — so a mockup drawn for one frame can be
 * laid out again for another (a split section's box) without redrawing it.
 */
export function Group({ at, children }: { at: { x: number; y: number }; children: ReactNode }) {
  return (
    <div className="absolute" style={{ left: at.x, top: at.y }}>
      {children}
    </div>
  );
}
