'use client';

import { type CSSProperties, Fragment, type ReactNode, useEffect, useRef, useState } from 'react';

import { NumberTicker } from '@/components/motion/number-ticker';
import { TextShimmer } from '@/components/motion/text-shimmer';

import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';

/**
 * The showcase kit: every mockup on the site drawn the way the home Services pictures are — one
 * product surface that tells one story, in real type sizes, white on a hairline with a deep soft
 * shadow; a mono, upper-case label and a Live badge on top; rows of an icon tile (or the real tool's
 * mark), a title, a line and a status pill; a key figure in mono under a rule. Around it, at most a
 * second surface or a notification, overlapping the first rather than wired to it.
 *
 * It moves as those pictures do, and only on screen: the pieces rise in as the picture arrives,
 * then rows take turns being the one that just happened (their edge lights in the page's colour and
 * their status pops), figures roll up, bars grow, meters fill and rings draw. A picture out of view
 * holds still; under reduced motion everything is simply there.
 *
 * Colour comes from the `Stage`: `accent` is the page's own colour — tiles, the lit edge, the live
 * dot, charts — and `brand` the business's colour inside its own screens (a button, a chosen slot).
 */

// --- the stage -------------------------------------------------------------------------------------

export function Stage({
  w,
  h = 600,
  accent,
  brand,
  max = 1.25,
  pad = 18,
  children,
}: {
  /** The canvas the pieces are placed on. What is drawn on it is measured, scaled to fit the
   * panel and centred there, so a picture never runs off its panel however tall it grows. */
  w: number;
  h?: number;
  accent: string;
  /** The business's own colour, inside its screens. The page's accent if not given. */
  brand?: string;
  /** The most it may grow past its own size. */
  max?: number;
  /** The breathing room kept round the drawing, in canvas pixels. */
  pad?: number;
  children: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ k: number; cx: number; cy: number } | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = box.current;
    const c = canvas.current;
    if (!el || !c) return;
    const pieces = () => Array.from(c.children) as HTMLElement[];
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      // Layout boxes, untouched by the pieces' own entrance transforms.
      for (const piece of pieces()) {
        x0 = Math.min(x0, piece.offsetLeft);
        y0 = Math.min(y0, piece.offsetTop);
        x1 = Math.max(x1, piece.offsetLeft + piece.offsetWidth);
        y1 = Math.max(y1, piece.offsetTop + piece.offsetHeight);
      }
      if (!Number.isFinite(x0)) return;
      const k = Math.min(r.width / (x1 - x0 + pad * 2), r.height / (y1 - y0 + pad * 2), max);
      setFit({ k, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 });
    };
    measure();
    const size = new ResizeObserver(measure);
    size.observe(el);
    for (const piece of pieces()) size.observe(piece);
    void document.fonts?.ready.then(measure);
    // It plays while it is on screen, and holds still when it is not.
    const sight = new IntersectionObserver(([entry]) => setPlay(Boolean(entry?.isIntersecting)), {
      threshold: 0.3,
    });
    sight.observe(el);
    return () => {
      size.disconnect();
      sight.disconnect();
    };
  }, [w, h, max, pad]);

  return (
    <div
      ref={box}
      className="sc absolute inset-0 overflow-hidden"
      data-play={play || undefined}
      style={{ '--sc-accent': accent, '--sc-brand': brand ?? accent } as CSSProperties}
    >
      <div
        ref={canvas}
        className="absolute top-1/2 left-1/2 origin-top-left transition-opacity duration-500"
        style={{
          width: w,
          height: h,
          transform: fit
            ? `scale(${fit.k}) translate(${-fit.cx}px, ${-fit.cy}px)`
            : `scale(0.5) translate(${-w / 2}px, ${-h / 2}px)`,
          opacity: fit ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// --- surfaces --------------------------------------------------------------------------------------

type Place = { x: number; y: number; w: number; h?: number; i?: number };

const at = ({ x, y, w, h, i = 0 }: Place): CSSProperties =>
  ({ left: x, top: y, width: w, height: h, '--i': i }) as CSSProperties;

/**
 * The main surface: the home Services card. A label and, at its right, a badge (`Live` by default
 * when `live` is set); the body; and a key figure under a rule.
 */
export function Panel({
  label,
  live,
  badge,
  foot,
  className = '',
  children,
  ...place
}: Place & {
  label?: ReactNode;
  /** A Live badge at the label's right — `true` for "Live", or its words. */
  live?: boolean | string;
  badge?: ReactNode;
  /** The key figure under the rule: what it is, and its value. */
  foot?: [ReactNode, ReactNode];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`sc-card sc-rise ${className}`} style={at(place)}>
      {label || live || badge ? (
        <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-3">
          {label ? <Mono>{label}</Mono> : <span />}
          {badge ?? (live ? <Live>{live === true ? 'Live' : live}</Live> : null)}
        </div>
      ) : null}
      {children}
      {foot ? <Foot left={foot[0]} right={foot[1]} /> : null}
    </div>
  );
}

/** A plain surface — a window, a phone, a second card — placed on the stage. */
export function Card({
  className = '',
  style,
  children,
  ...place
}: Place & { className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`sc-card sc-rise ${className}`} style={{ ...at(place), ...style }}>
      {children}
    </div>
  );
}

/**
 * A notification arriving: a small card that springs in after the main surface and then drifts
 * gently, overlapping its corner.
 */
export function Toast({
  icon,
  tool,
  title,
  meta,
  tone = 'accent',
  ...place
}: Place & {
  icon?: IconName;
  tool?: string;
  title: ReactNode;
  meta?: ReactNode;
  tone?: 'accent' | 'ok' | 'ink';
}) {
  return (
    <div className="sc-pop absolute z-10" style={at(place)}>
      <div className="sc-float flex items-center gap-3 rounded-[14px] border border-line bg-white px-3 py-2.5 shadow-[0_22px_44px_-22px_rgb(11_13_18/0.45)]">
        {tool ? <ToolTile tool={tool} size={34} /> : <Tile icon={icon ?? 'check'} tone={tone} />}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium text-ink">{title}</span>
          {meta ? <span className="block truncate text-[11.5px] text-ink-2">{meta}</span> : null}
        </span>
      </div>
    </div>
  );
}

// --- rows ------------------------------------------------------------------------------------------

/**
 * A row in its own bordered box, the home Services step: a tile (an icon, a tool's mark or a
 * face), a title and a line, and a status at the right. `turn` makes it one of the rows that take
 * turns lighting up (with `n`, how many take turns).
 */
export function Step({
  icon,
  tool,
  face,
  mark,
  title,
  meta,
  status,
  tone = 'ok',
  turn = false,
  lit = false,
  muted = false,
  i = 0,
  n = 3,
  className = '',
}: {
  icon?: IconName;
  tool?: string;
  face?: string;
  /** Anything else for the tile: a size, a number, a swatch. */
  mark?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  status?: ReactNode;
  tone?: StatusTone;
  /** One of the rows that take turns lighting up. */
  turn?: boolean;
  /** Lit for good: the row the picture is about. */
  lit?: boolean;
  muted?: boolean;
  i?: number;
  n?: number;
  className?: string;
}) {
  return (
    <div
      className={`sc-step flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 ${turn ? `sc-turn sc-turn--${n}` : ''} ${lit ? 'sc-step--lit' : ''} ${muted ? 'opacity-55' : ''} ${className}`}
      style={{ '--i': i } as CSSProperties}
    >
      {mark ? (
        <span className="sc-tile sc-tile--fill grid size-9 shrink-0 place-items-center rounded-[10px] text-[12.5px] font-semibold text-ink">
          {mark}
        </span>
      ) : tool ? (
        <ToolTile tool={tool} />
      ) : face ? (
        <Face name={face} />
      ) : icon ? (
        <Tile icon={icon} tone={muted ? 'fill' : 'accent'} />
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-medium text-ink">{title}</span>
        {meta ? <span className="block truncate text-[11.5px] text-ink-2">{meta}</span> : null}
      </span>
      {status ? (
        <span
          className={turn ? `sc-turn-status sc-turn--${n}` : ''}
          style={{ '--i': i } as CSSProperties}
        >
          <Status tone={tone}>{status}</Status>
        </span>
      ) : null}
    </div>
  );
}

/** A lighter row, under a hairline, for lists inside a surface. */
export function Line({
  icon,
  tool,
  face,
  title,
  meta,
  right,
}: {
  icon?: IconName;
  tool?: string;
  face?: string;
  title: ReactNode;
  meta?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0">
      {tool ? (
        <ToolTile tool={tool} size={28} />
      ) : face ? (
        <Face name={face} />
      ) : icon ? (
        <Tile icon={icon} size={28} />
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] text-ink">{title}</span>
        {meta ? <span className="block truncate text-[11px] text-ink-2">{meta}</span> : null}
      </span>
      {right}
    </div>
  );
}

// --- marks -----------------------------------------------------------------------------------------

/** The mono, upper-case label of the home Services cards. */
export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-mono text-[10.5px] tracking-[0.14em] whitespace-nowrap text-ink-2 uppercase ${className}`}
    >
      {children}
    </p>
  );
}

/** The key figure under a rule: what it is on the left, its value on the right. */
export function Foot({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="mt-2 flex justify-between gap-3 border-t border-line px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.14em] text-ink-2 uppercase">
      <span>{left}</span>
      <span className="text-ink">{right}</span>
    </div>
  );
}

/** "Live", its dot breathing in the page's colour. */
export function Live({ children = 'Live' }: { children?: ReactNode }) {
  return <span className="sc-live">{children}</span>;
}

/** An icon on a soft tile of the page's colour (or ink, or plain grey). */
export function Tile({
  icon,
  tone = 'accent',
  size = 36,
}: {
  icon: IconName;
  tone?: 'accent' | 'ok' | 'ink' | 'fill';
  size?: number;
}) {
  return (
    <span
      className={`sc-tile sc-tile--${tone} grid shrink-0 place-items-center rounded-[10px]`}
      style={{ width: size, height: size }}
    >
      <Icon name={icon} size={Math.round(size * 0.45)} strokeWidth={1.9} />
    </span>
  );
}

/** A tool's own mark on a white tile. */
export function ToolTile({ tool, size = 36 }: { tool: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[10px] border border-line bg-white"
      style={{ width: size, height: size }}
    >
      <ToolMark tool={tool} size={Math.round(size * 0.5)} />
    </span>
  );
}

/** A person's initials on a soft disc. */
export function Face({ name, size = 34 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  return (
    <span
      className="sc-face grid shrink-0 place-items-center rounded-full text-[11px] font-semibold"
      data-shade={(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % 3}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

export type StatusTone = 'ok' | 'accent' | 'muted' | 'wait' | 'ink';

/** A status pill: a tick and a word, in green for done, the page's colour for new. */
export function Status({
  tone = 'ok',
  icon,
  children,
}: {
  tone?: StatusTone;
  icon?: IconName | null;
  children: ReactNode;
}) {
  const glyph = icon === null ? null : (icon ?? (tone === 'ok' ? 'check' : undefined));
  return (
    <span
      className={`sc-status sc-status--${tone} inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] font-medium whitespace-nowrap`}
    >
      {glyph ? <Icon name={glyph} size={11} strokeWidth={2.2} /> : null}
      {tone === 'accent' && !glyph ? <span className="sc-status__dot" /> : null}
      {children}
    </span>
  );
}

/** A small choice, chosen or not. */
export function Chip({ on = false, children }: { on?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap ${on ? 'sc-chip--on' : 'border-line text-ink-2'}`}
    >
      {children}
    </span>
  );
}

// --- figures ---------------------------------------------------------------------------------------

/** A figure that rolls up as the picture arrives, with what it is and how it moved. */
export function Metric({
  label,
  value,
  prefix,
  suffix,
  delta,
  size = 30,
  className = '',
}: {
  label: ReactNode;
  /** A number rolls up; words (₹4.86 L) are set as they are. */
  value: number | string;
  prefix?: string;
  suffix?: string;
  /** How it moved, shown with an arrow up. */
  delta?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11.5px] text-ink-2">{label}</p>
      <p className="mt-1.5 flex items-end gap-2">
        <span
          className="font-display leading-none tracking-[var(--tracking-display)] whitespace-nowrap text-ink"
          style={{ fontSize: size }}
        >
          {typeof value === 'number' ? (
            <NumberTicker
              value={value}
              prefix={prefix}
              suffix={suffix}
              duration={1.1}
              format={(n) => n.toLocaleString('en-IN')}
            />
          ) : (
            value
          )}
        </span>
        {delta ? (
          <span className="sc-delta mb-0.5 inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium">
            <Icon name="arrow" size={10} strokeWidth={2.2} className="-rotate-45" />
            {delta}
          </span>
        ) : null}
      </p>
    </div>
  );
}

/** Bars that grow as the picture arrives; the one at `now` in the page's colour. */
export function Bars({
  values,
  labels,
  now = values.length - 1,
  height = 88,
}: {
  values: number[];
  labels?: string[];
  now?: number;
  height?: number;
}) {
  const most = Math.max(...values);
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {values.map((value, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end">
            <span
              className={`sc-grow block rounded-t-[4px] ${i === now ? 'sc-bar--now' : 'sc-bar'}`}
              style={{ '--i': i, height: `${(value / most) * 100}%` } as CSSProperties}
            />
          </div>
        ))}
      </div>
      {labels ? (
        <div className="mt-1.5 flex gap-2 text-center text-[10.5px] text-ink-2">
          {labels.map((label, i) => (
            <span key={i} className="flex-1">
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** A share: what it is, a bar that fills to it, and the figure. */
export function Meter({
  label,
  value,
  of = 100,
  unit = '%',
  i = 0,
}: {
  label: ReactNode;
  value: number;
  of?: number;
  unit?: string;
  i?: number;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_2.5rem] items-center gap-3 text-[12px]">
      <span className="truncate text-ink-2">{label}</span>
      <span className="h-1.5 overflow-hidden rounded-full bg-fill">
        <span
          className="sc-fill sc-meter block h-full rounded-full"
          style={{ '--i': i, width: `${(value / of) * 100}%` } as CSSProperties}
        />
      </span>
      <span className="text-right font-medium text-ink tabular-nums">
        {value}
        {unit}
      </span>
    </div>
  );
}

/** A score in a ring that draws itself round to it. */
export function Ring({
  value,
  label,
  size = 58,
  i = 0,
}: {
  value: number;
  label?: ReactNode;
  size?: number;
  i?: number;
}) {
  const r = (size - 6) / 2;
  const len = 2 * Math.PI * r;
  const off = len * (1 - value / 100);
  return (
    <span className="flex flex-col items-center gap-1.5 text-center">
      <span className="relative grid place-items-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={4}
            className="stroke-fill"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={4}
            strokeLinecap="round"
            className="sc-draw sc-ring"
            strokeDasharray={len}
            strokeDashoffset={off}
            style={{ '--i': i, '--sc-len': len, '--sc-off': off } as CSSProperties}
          />
        </svg>
        <span className="absolute font-display text-[17px] leading-none text-ink">{value}</span>
      </span>
      {label ? <span className="text-[10.5px] leading-tight text-ink-2">{label}</span> : null}
    </span>
  );
}

/**
 * A thing's way from start to finish: steps down a line, the done ones ticked in the page's colour
 * and the current one ringed, breathing.
 */
export function Track({
  steps,
}: {
  steps: { title: ReactNode; meta?: ReactNode; done?: boolean }[];
}) {
  const now = steps.findIndex((step) => !step.done);
  return (
    <ol className="relative flex flex-col gap-3.5 px-2 py-1">
      <span className="absolute top-4 bottom-4 left-[1.36rem] w-px bg-line" />
      {steps.map((step, i) => (
        <li
          key={i}
          className="sc-rise relative flex items-center gap-3"
          style={{ '--i': i + 1 } as CSSProperties}
        >
          <span
            className={`sc-track grid size-7 shrink-0 place-items-center rounded-full ${step.done ? 'sc-track--done' : i === now ? 'sc-track--now' : 'sc-track--later'}`}
          >
            {step.done ? <Icon name="check" size={13} strokeWidth={2.4} /> : null}
          </span>
          <span className="min-w-0">
            <span
              className={`block truncate text-[13px] font-medium ${i > now && now >= 0 ? 'text-ink-2' : 'text-ink'}`}
            >
              {step.title}
            </span>
            {step.meta ? (
              <span className="block truncate text-[11px] text-ink-2">{step.meta}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Who can do what: a role in each column, a tick where it may. */
export function RoleGrid({
  heads,
  rows,
}: {
  heads: readonly string[];
  rows: readonly (readonly [string, readonly boolean[]])[];
}) {
  return (
    <div
      className="grid items-center gap-y-2.5"
      style={{ gridTemplateColumns: `minmax(0,1fr) repeat(${heads.length}, 2.25rem)` }}
    >
      <span />
      {heads.map((head) => (
        <span key={head} className="text-center text-[10px] text-ink-2">
          {head}
        </span>
      ))}
      {rows.map(([label, on], r) => (
        <Fragment key={label}>
          <span className="truncate pr-2 text-[12px] text-ink">{label}</span>
          {on.map((yes, k) => (
            <span key={k} className="grid place-items-center">
              {yes ? (
                <span
                  className="sc-check--on sc-pop grid size-[18px] place-items-center rounded-[5px]"
                  style={{ '--i': r + k / 4 } as CSSProperties}
                >
                  <Icon name="check" size={11} strokeWidth={2.6} />
                </span>
              ) : (
                <span className="size-1.5 rounded-full bg-line-2" />
              )}
            </span>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

/** A funnel: each stage a bar as long as its share of the first, filling in turn. */
export function Funnel({
  stages,
}: {
  stages: readonly (readonly [label: string, count: string, share: number])[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {stages.map(([label, count, share], i) => (
        <div
          key={label}
          className="grid grid-cols-[6.5rem_minmax(0,1fr)_2.75rem] items-center gap-2.5"
        >
          <span className="truncate text-[12px] text-ink-2">{label}</span>
          <span className="relative h-7 overflow-hidden rounded-md bg-fill">
            <span
              className="sc-fill sc-funnel absolute inset-y-0 left-0 rounded-md"
              style={{ '--i': i, width: `${Math.max(share, 6)}%` } as CSSProperties}
            />
            <span className="relative flex h-full items-center px-2 text-[12px] font-medium text-ink tabular-nums">
              {count}
            </span>
          </span>
          <span className="text-right text-[11px] text-ink-2 tabular-nums">{share}%</span>
        </div>
      ))}
    </div>
  );
}

/** A short checklist, its done items ticked in the business's colour. */
export function Checks({ items }: { items: { text: ReactNode; done?: boolean }[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="sc-rise flex items-center gap-2.5 text-[12.5px]"
          style={{ '--i': i + 1 } as CSSProperties}
        >
          <span
            className={`grid size-[18px] shrink-0 place-items-center rounded-[5px] border ${item.done ? 'sc-check--on' : 'border-line-2 bg-white'}`}
          >
            {item.done ? <Icon name="check" size={11} strokeWidth={2.6} /> : null}
          </span>
          <span className={item.done ? 'text-ink' : 'text-ink-2'}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** An amount, set firm at the end of a row. */
export function Money({ children }: { children: ReactNode }) {
  return <span className="text-[13px] font-semibold text-ink tabular-nums">{children}</span>;
}

// --- inputs and talk ------------------------------------------------------------------------------

/** A filled field; `focus` puts the caret in it, blinking. */
export function Field({
  label,
  value,
  focus = false,
}: {
  label: ReactNode;
  value: ReactNode;
  focus?: boolean;
}) {
  return (
    <span className="block">
      <span className="block text-[11px] text-ink-2">{label}</span>
      <span
        className={`mt-1 flex h-9 items-center rounded-[10px] border px-3 text-[12.5px] text-ink ${focus ? 'sc-field--focus' : 'border-line'}`}
      >
        {value}
        {focus ? <span className="sc-caret ml-px" /> : null}
      </span>
    </span>
  );
}

/** A button in the business's colour, pressed now and then. */
export function Press({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`sc-press flex h-9 items-center justify-center rounded-[10px] text-[12.5px] font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

/** A message in a conversation: theirs on white, ours in the page's colour. */
export function Bubble({
  from = 'them',
  meta,
  i = 0,
  children,
}: {
  from?: 'them' | 'us';
  meta?: ReactNode;
  i?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`sc-rise flex ${from === 'us' ? 'justify-end' : 'justify-start'}`}
      style={{ '--i': i } as CSSProperties}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${from === 'us' ? 'sc-bubble--us rounded-br-md' : 'rounded-bl-md border border-line bg-white text-ink'}`}
      >
        {children}
        {meta ? (
          <span
            className={`mt-1 block text-right text-[10px] ${from === 'us' ? 'opacity-70' : 'text-ink-3'}`}
          >
            {meta}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** The assistant at work, in beUI's shimmer (`@beui/text-shimmer`): "Reading 2 documents…". */
export function Thinking({ i = 0, children }: { i?: number; children: ReactNode }) {
  return (
    <div
      className="sc-rise flex items-center gap-2 px-1 text-[12px]"
      style={{ '--i': i } as CSSProperties}
    >
      <Icon name="spark" size={13} className="text-ink-2" />
      <TextShimmer duration={2.2}>{children}</TextShimmer>
    </div>
  );
}

/** Three dots, someone typing. */
export function Typing({ i = 0 }: { i?: number }) {
  return (
    <div className="sc-rise flex" style={{ '--i': i } as CSSProperties}>
      <span className="inline-flex gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-3 py-2.5">
        <span className="sc-type" />
        <span className="sc-type" style={{ animationDelay: '0.15s' }} />
        <span className="sc-type" style={{ animationDelay: '0.3s' }} />
      </span>
    </div>
  );
}

/** A phone, its screen white under the island, with whatever the app shows. */
export function Phone({
  children,
  time = '9:41',
  dark = false,
  className = '',
  ...place
}: Place & { time?: string; dark?: boolean; className?: string; children?: ReactNode }) {
  return (
    <div className={`sc-rise absolute ${className}`} style={at(place)}>
      <div className="rounded-[2.2rem] bg-ink p-[7px] shadow-[0_34px_64px_-30px_rgb(11_13_18/0.6)]">
        <div
          className={`relative overflow-hidden rounded-[1.75rem] ${dark ? 'bg-[#11131a] text-white' : 'bg-white text-ink'}`}
        >
          <div className="relative flex items-center justify-between px-5 pt-2.5 pb-1.5 text-[10.5px] font-semibold">
            <span>{time}</span>
            <span className="absolute top-2 left-1/2 h-[18px] w-[62px] -translate-x-1/2 rounded-full bg-ink" />
            <span className="flex items-end gap-[2px]">
              <span className="h-[4px] w-[3px] rounded-[1px] bg-current" />
              <span className="h-[6px] w-[3px] rounded-[1px] bg-current" />
              <span className="h-[8px] w-[3px] rounded-[1px] bg-current" />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/** A browser window's top: the three lights and the address. */
export function Chrome({ address }: { address?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line px-3 py-2.5">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </span>
      {address ? (
        <span className="flex h-6 flex-1 items-center gap-1.5 rounded-md bg-fill px-2.5 text-[11px] text-ink-2">
          <Icon name="lock" size={10} />
          {address}
        </span>
      ) : null}
    </div>
  );
}

/** A small run of grey standing in for words. */
export function Bar({
  w,
  tone = '#e9eaee',
  h = 6,
}: {
  w: number | string;
  tone?: string;
  h?: number;
}) {
  return <span className="block rounded-full" style={{ width: w, height: h, background: tone }} />;
}
