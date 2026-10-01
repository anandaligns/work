import { Fragment, type ReactNode } from 'react';

import { Icon, type IconName } from '../ui/icon';
import { deep, markColour, onColour, TintPanel } from './light-kit';

/**
 * Small pieces the service pages' mockups share, on top of the light kit: the page's tinted panel,
 * a round glyph, a figure with its change, a row of bars, a score ring, a form field, a chip, a
 * line of steps and a grid of who may do what. Each page has two colours: its own, for the panel,
 * the marks, the wires and the outcome, and its example business's, for everything inside the
 * business's own screens.
 */

/** The page's pale tint, from its own colour. */
export const washOf = (accent: string) => `color-mix(in srgb, ${accent} 7%, white)`;

/** The page's large soft surface: its accent at 7%, deepening to 12% across the panel. */
export const surfaceOf = (accent: string) =>
  `linear-gradient(135deg, ${washOf(accent)} 0%, color-mix(in srgb, ${accent} 12%, white) 100%)`;

/**
 * A mockup on the page's tint, filling whatever it is placed in; the states inside it (tags,
 * faces, ticks) take the business's colour.
 */
export function MockPanel({
  accent,
  business,
  children,
}: {
  accent: string;
  business?: string;
  children: ReactNode;
}) {
  return (
    <TintPanel tint={surfaceOf(accent)} accent={business ?? accent} className="size-full">
      {children}
    </TintPanel>
  );
}

/** A mockup's frame for a section that sizes its own picture: the tint, at the height given. */
export function MockStage({
  accent,
  business,
  className = '',
  children,
}: {
  accent: string;
  business?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`w-full ${className}`}>
      <MockPanel accent={accent} business={business}>
        {children}
      </MockPanel>
    </div>
  );
}

/** A small round glyph in a colour, for a step or a row. */
export function Dot({ icon, tone }: { icon: IconName; tone: string }) {
  return (
    <span
      className="grid size-[26px] shrink-0 place-items-center rounded-full"
      style={{ background: `color-mix(in srgb, ${tone} 12%, white)`, color: markColour(tone) }}
    >
      <Icon name={icon} size={13} strokeWidth={2.1} />
    </span>
  );
}

/** A figure, its label over it and its change beside it. */
export function Stat({
  label,
  value,
  delta,
  accent,
  size = 20,
}: {
  label: string;
  value: string;
  delta?: string;
  accent: string;
  size?: number;
}) {
  return (
    <span className="block min-w-0">
      <span className="block truncate text-[10px] text-ink-3">{label}</span>
      <span
        className="mt-1 flex items-baseline gap-1.5 leading-none font-semibold"
        style={{ fontSize: size }}
      >
        {value}
        {delta ? (
          <span className="text-[9.5px] font-semibold" style={{ color: deep(accent) }}>
            ↑ {delta}
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** A row of bars, the last in the page's colour. */
export function Bars({
  values,
  accent,
  height = 54,
}: {
  values: number[];
  accent: string;
  height?: number;
}) {
  return (
    <div className="flex items-end gap-[5px]" style={{ height }}>
      {values.map((h, k) => (
        <span
          key={k}
          className="flex-1 rounded-[3px]"
          style={{
            height: `${h}%`,
            background:
              k === values.length - 1 ? accent : `color-mix(in srgb, ${accent} 22%, white)`,
          }}
        />
      ))}
    </div>
  );
}

/** A labelled share, as a thin bar filled to its value. */
export function Share({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="flex items-center gap-2 text-[10.5px]">
      <span className="w-[5.5rem] shrink-0 truncate text-ink-2">{label}</span>
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
        <span
          className="block h-full rounded-full"
          style={{ width: `${value}%`, background: accent }}
        />
      </span>
      <span className="w-7 shrink-0 text-right font-medium tabular-nums">{value}%</span>
    </div>
  );
}

/** A score out of 100, as a ring. */
export function Ring({ value, label, accent }: { value: number; label: string; accent: string }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  return (
    <span className="flex flex-col items-center gap-1.5">
      <span className="relative grid size-11 place-items-center">
        <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
          <circle cx="22" cy="22" r={r} fill="none" stroke="#eef0f3" strokeWidth="4" />
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(c * value) / 100} ${c}`}
          />
        </svg>
        <span className="text-[11px] font-semibold tabular-nums">{value}</span>
      </span>
      <span className="text-center text-[9px] leading-tight text-ink-3">{label}</span>
    </span>
  );
}

/** A form field: its label, and the value in a quiet box. */
export function Field({
  label,
  value,
  focus = false,
  accent,
}: {
  label: string;
  value: string;
  focus?: boolean;
  accent: string;
}) {
  return (
    <span className="block">
      <span className="block text-[9.5px] text-ink-3">{label}</span>
      <span
        className="mt-1 block truncate rounded-[8px] border bg-white px-2 py-1.5 text-[11px]"
        style={{ borderColor: focus ? accent : '#e6e7eb' }}
      >
        {value}
      </span>
    </span>
  );
}

/** A small choice, chosen in the page's colour. */
export function Chip({
  children,
  on = false,
  accent,
}: {
  children: ReactNode;
  on?: boolean;
  accent: string;
}) {
  return (
    <span
      className="rounded-full border px-2 py-[3px] text-[10px] font-medium whitespace-nowrap"
      style={
        on
          ? { background: accent, borderColor: accent, color: onColour(accent) }
          : { borderColor: '#e6e7eb', color: '#4b5060' }
      }
    >
      {children}
    </span>
  );
}

/** Steps down a line, each a round glyph, a title and a line under it — done ones ticked. */
export function Steps({
  steps,
  accent,
  gap = 10,
}: {
  steps: { title: string; meta?: string; done?: boolean; icon?: IconName }[];
  accent: string;
  gap?: number;
}) {
  return (
    <ol className="relative flex flex-col" style={{ gap }}>
      <span className="absolute top-3 bottom-3 left-[12.5px] w-px bg-[#e6e7eb]" />
      {steps.map((s) => (
        <li key={s.title} className="relative flex items-center gap-2.5">
          <Dot
            icon={s.done ? 'check' : (s.icon ?? 'clock')}
            tone={s.done ? 'var(--mock, #15803d)' : accent}
          />
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-medium">{s.title}</span>
            {s.meta ? (
              <span className="block truncate text-[9.5px] text-ink-3">{s.meta}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Who can do what: a row per permission, a column per role, a tick where the role may. */
export function RoleGrid({
  heads,
  rows,
  accent,
}: {
  heads: string[];
  rows: { label: string; values: boolean[] }[];
  accent: string;
}) {
  return (
    <div
      className="grid items-center gap-y-1.5 text-[9.5px]"
      style={{ gridTemplateColumns: `minmax(0,1fr) repeat(${heads.length}, 34px)` }}
    >
      <span />
      {heads.map((h) => (
        <span key={h} className="truncate text-center text-[8.5px] text-ink-3">
          {h}
        </span>
      ))}
      {rows.map((r) => (
        <Fragment key={r.label}>
          <span className="truncate text-[10.5px] text-ink-2">{r.label}</span>
          {r.values.map((on, k) => (
            <span key={k} className="grid place-items-center">
              {on ? (
                <span
                  className="grid size-4 place-items-center rounded-full"
                  style={{ background: accent, color: onColour(accent) }}
                >
                  <Icon name="check" size={9} strokeWidth={3} />
                </span>
              ) : (
                <span className="size-1.5 rounded-full bg-[#dfe2e8]" />
              )}
            </span>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

/** A chat bubble: the customer's in grey on the left, the business's in its colour on the right. */
export function Bubble({
  from,
  time,
  accent,
  children,
}: {
  from: 'customer' | 'business';
  time: string;
  accent: string;
  children: ReactNode;
}) {
  const own = from === 'business';
  return (
    <div className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-[12px] px-2.5 py-1.5 text-[10.5px] leading-[1.45] text-ink ${own ? 'rounded-br-[4px]' : 'rounded-bl-[4px] bg-[#f2f3f5]'}`}
        style={own ? { background: `color-mix(in srgb, ${accent} 12%, white)` } : undefined}
      >
        {children}
        <span className="mt-0.5 block text-right text-[9px] text-ink-3">{time}</span>
      </div>
    </div>
  );
}
