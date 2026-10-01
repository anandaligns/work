import type { CSSProperties, ReactNode } from 'react';

import { ScreenView } from '../screens/screen';
import type { Screen } from '../screens/types';
import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';

/**
 * The mockup kit for the pages under test, after Alia's product pictures: not a whole screen but
 * the few pieces of the product that tell the story — a card here, a phone there — floating on a
 * dark panel lit from one corner in the page's colour, joined by dashed wires with a pulsing dot
 * at each end, and a glowing pill for the outcome. Our colours throughout: the night, its raised
 * card, white, and the page's accent. Each piece rises in after the one before (`i`).
 */

/** The page's accent, lifted for use on the night. */
export const lit = (accent: string) => `color-mix(in srgb, ${accent} 55%, white)`;

/** The dark panel a mockup sits on, lit from a lower corner in the page's colour. */
export function GlowPanel({
  accent,
  corner = 'left',
  className = '',
  children,
}: {
  accent: string;
  corner?: 'left' | 'right';
  className?: string;
  children?: ReactNode;
}) {
  const at = corner === 'left' ? '0% 100%' : '100% 100%';
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-[28px] bg-night ${className}`}
      style={{
        backgroundImage: `radial-gradient(85% 75% at ${at}, color-mix(in srgb, ${accent} 58%, transparent), transparent 64%), radial-gradient(55% 45% at ${corner === 'left' ? '100% 0%' : '0% 0%'}, color-mix(in srgb, ${accent} 14%, transparent), transparent 70%), linear-gradient(160deg, #171b28 0%, #0b0d12 100%)`,
      }}
    >
      {children}
    </div>
  );
}

type Place = { x: number; y: number; w?: number; h?: number; i?: number };

const place = ({ x, y, w, h, i = 0 }: Place): CSSProperties =>
  ({ left: x, top: y, width: w, height: h, '--i': i }) as CSSProperties;

/** A piece of the product, floating: the night's raised card, or white. */
export function Frag({
  tone = 'dark',
  glow,
  faded = false,
  className = '',
  children,
  ...at
}: Place & {
  tone?: 'dark' | 'light';
  /** An outline in this colour, glowing: the piece the story is about. */
  glow?: string;
  /** Behind the story: dimmed. */
  faded?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const skin =
    tone === 'dark'
      ? 'border border-white/10 bg-[#171b28] text-white shadow-[0_30px_60px_-24px_rgb(0_0_0/0.75)]'
      : 'border border-black/[0.06] bg-white text-ink shadow-[0_30px_60px_-24px_rgb(0_0_0/0.5)]';
  return (
    <div
      className={`frag-in absolute rounded-2xl ${skin} ${faded ? 'opacity-45' : ''} ${className}`}
      style={{
        ...place(at),
        ...(glow
          ? { borderColor: glow, boxShadow: `0 0 0 1px ${glow}, 0 0 36px -8px ${glow}` }
          : null),
      }}
    >
      {children}
    </div>
  );
}

/** A piece's heading: its glyph or a tool's mark, a title, a line, and something on the right. */
export function FragHead({
  icon,
  tool,
  title,
  meta,
  right,
  accent,
}: {
  icon?: IconName;
  tool?: string;
  title: string;
  meta?: string;
  right?: ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {tool ? (
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white">
          <ToolMark tool={tool} size={20} />
        </span>
      ) : icon ? (
        <span
          className="grid size-9 shrink-0 place-items-center rounded-xl"
          style={{
            background: accent ? lit(accent) : 'rgb(255 255 255 / 0.08)',
            color: accent ? '#0b0d12' : 'currentColor',
          }}
        >
          <Icon name={icon} size={17} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold">{title}</span>
        {meta ? <span className="block truncate text-[12.5px] opacity-55">{meta}</span> : null}
      </span>
      {right}
    </div>
  );
}

/** A small status tag. */
export function Tag({
  children,
  tone = 'plain',
  accent,
}: {
  children: ReactNode;
  tone?: 'plain' | 'accent' | 'ok' | 'wait';
  accent?: string;
}) {
  const style: CSSProperties =
    tone === 'accent' && accent
      ? { background: lit(accent), color: '#0b0d12' }
      : tone === 'ok'
        ? { background: 'rgb(34 197 94 / 0.16)', color: '#4ade80' }
        : tone === 'wait'
          ? { background: 'rgb(245 158 11 / 0.16)', color: '#fbbf24' }
          : { background: 'rgb(255 255 255 / 0.08)', color: 'rgb(255 255 255 / 0.75)' };
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11.5px] font-semibold whitespace-nowrap"
      style={style}
    >
      {children}
    </span>
  );
}

/** A row in a piece: a dot or glyph, words, a value or tag. */
export function Line({
  icon,
  tool,
  title,
  meta,
  right,
  dim = false,
}: {
  icon?: IconName;
  tool?: string;
  title: string;
  meta?: string;
  right?: ReactNode;
  dim?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 py-2.5 ${dim ? 'opacity-50' : ''}`}>
      {tool ? (
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white">
          <ToolMark tool={tool} size={15} />
        </span>
      ) : icon ? (
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/[0.07]">
          <Icon name={icon} size={14} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-medium">{title}</span>
        {meta ? <span className="block truncate text-[11.5px] opacity-55">{meta}</span> : null}
      </span>
      {right}
    </div>
  );
}

/** The outcome, as a glowing pill with a tick. */
export function Pill({
  accent,
  icon = 'check',
  children,
  ...at
}: Place & { accent: string; icon?: IconName; children: ReactNode }) {
  const light = lit(accent);
  return (
    <div
      className="frag-in absolute flex items-center gap-2.5 rounded-full bg-[#0b0d12]/85 py-2 pr-5 pl-2 text-[15px] font-semibold whitespace-nowrap text-white backdrop-blur"
      style={{
        ...place(at),
        border: `1px solid ${light}`,
        boxShadow: `0 0 30px -6px ${light}`,
      }}
    >
      <span
        className="grid size-7 shrink-0 place-items-center rounded-full text-[#0b0d12]"
        style={{ background: light }}
      >
        <Icon name={icon} size={15} strokeWidth={2.6} />
      </span>
      {children}
    </div>
  );
}

/**
 * Wires across the canvas: dashed paths that flow, with a dot at each named point. `d` are SVG
 * paths in the canvas's own units.
 */
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
  const light = lit(accent);
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
          stroke={light}
          strokeWidth={1.6}
          strokeDasharray="5 6"
          strokeLinecap="round"
          className="wire-flow"
        />
      ))}
      {dots.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={7} fill={light} className="dot-pulse" />
          <circle cx={x} cy={y} r={4.5} fill={light} />
        </g>
      ))}
    </svg>
  );
}

/** A real screen from the product, placed on the canvas: a phone, usually. */
export function Device({
  screen,
  accent,
  scale = 1,
  ...at
}: Place & { screen: Screen; accent: string; scale?: number }) {
  return (
    <div className="frag-in absolute" style={place(at)}>
      <div className="origin-top-left" style={{ transform: `scale(${scale})` }}>
        <ScreenView screen={screen} size="lg" accent={accent} />
      </div>
    </div>
  );
}

/** A WhatsApp message as a piece: the business's bubble, its header, words and buttons. */
export function Bubble({
  header,
  text,
  footer,
  time,
  buttons = [],
  ...at
}: Place & { header?: string; text: string; footer?: string; time?: string; buttons?: string[] }) {
  return (
    <div
      className="frag-in absolute overflow-hidden rounded-2xl bg-white text-[#111b21] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)]"
      style={place(at)}
    >
      <div className="px-4 pt-3.5 pb-2.5">
        {header ? <p className="text-[14px] font-semibold">{header}</p> : null}
        <p className="mt-1 text-[13.5px] leading-snug whitespace-pre-line">{text}</p>
        <p className="mt-1.5 flex items-end justify-between gap-3 text-[11.5px] text-[#667781]">
          <span>{footer}</span>
          <span>{time}</span>
        </p>
      </div>
      {buttons.map((button) => (
        <p
          key={button}
          className="border-t border-black/[0.07] py-2.5 text-center text-[13.5px] font-medium text-[#0b7ab8]"
        >
          {button}
        </p>
      ))}
    </div>
  );
}
