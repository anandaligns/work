import type { CSSProperties, ReactNode } from 'react';

import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';
import { BRANDS, DesktopSite, Scaled } from '../visuals/concept-sites';
import { AVATAR_TONES, Spark, STATUS } from './admin-view';
import { ProductArt } from './product-art';
import { WaThread, waWallpaper } from './whatsapp-views';
import type { ProductArt as ArtKind, DeskBlock, Hue, Pill as PillT } from './types';

/**
 * The blocks a software screen is built from, drawn at desktop size with real type sizes: each
 * sits in a card with a hairline border and soft corners, the way Linear, Stripe or Attio set
 * theirs — figures with sparklines, charts with their axes and a marker on the latest point,
 * tables, boards, a calendar, a record with its history, an invoice with the fields read from it,
 * logs with each tool's logo, gauges, a funnel, a spreadsheet, a roadmap.
 */

export const HUE: Record<Hue, string> = {
  accent: 'var(--accent)',
  green: '#16a34a',
  amber: '#d97706',
  red: '#dc2626',
  blue: '#2563eb',
  violet: '#7c3aed',
  grey: '#9ca3af',
};

const tint = (hue: Hue = 'accent', pct = 12) => `color-mix(in srgb, ${HUE[hue]} ${pct}%, white)`;

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

const toneOf = (name: string) =>
  AVATAR_TONES[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % AVATAR_TONES.length]!;

export function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold text-[#3b3f4c]"
      style={{ width: size, height: size, fontSize: size * 0.36, background: toneOf(name) }}
    >
      {initials(name)}
    </span>
  );
}

export function Pill({ pill, small = false }: { pill: PillT; small?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full font-medium whitespace-nowrap ${STATUS[pill.tone ?? 'grey']} ${small ? 'px-1.5 py-px text-[11px]' : 'px-2 py-0.5 text-[12px]'}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {pill.text}
    </span>
  );
}

function Glyph({ name, hue = 'accent', size = 30 }: { name: IconName; hue?: Hue; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[8px]"
      style={{ width: size, height: size, background: tint(hue, 13), color: HUE[hue] }}
    >
      <Icon name={name} size={size * 0.52} strokeWidth={1.8} />
    </span>
  );
}

function Lead({
  avatar,
  logo,
  art,
  icon,
  name,
}: {
  avatar?: boolean;
  logo?: string;
  art?: ArtKind;
  icon?: IconName;
  name: string;
}) {
  if (art)
    return (
      <span className="block size-8 shrink-0 overflow-hidden rounded-[7px] ring-1 ring-black/[0.06]">
        <ProductArt kind={art} className="size-full" />
      </span>
    );
  if (logo)
    return (
      <span className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-white ring-1 ring-black/[0.07]">
        <ToolMark tool={logo} size={17} />
      </span>
    );
  if (icon) return <Glyph name={icon} size={30} />;
  if (avatar) return <Avatar name={name} size={30} />;
  return null;
}

function Card({
  title,
  meta,
  children,
  className = '',
  pad = true,
}: {
  title?: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-[11px] border border-[#ececef] bg-white ${className}`}
    >
      {title ? (
        <div
          className={`flex items-center gap-3 ${pad ? 'px-4 pt-3.5' : 'border-b border-[#ececef] px-4 py-3'}`}
        >
          <span className="truncate text-[13.5px] font-semibold">{title}</span>
          {meta ? (
            <span className="ml-auto shrink-0 text-[12px] text-[#8b8f99]">{meta}</span>
          ) : null}
        </div>
      ) : null}
      <div className={pad ? 'px-4 pt-3 pb-4' : ''}>{children}</div>
    </div>
  );
}

// --- figures and charts -------------------------------------------------------------------------

function Kpis({ items }: Extract<DeskBlock, { type: 'kpis' }>) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((kpi) => (
        <div key={kpi.label} className="rounded-[11px] border border-[#ececef] bg-white p-3.5">
          <p className="truncate text-[12.5px] text-[#6b7080]">{kpi.label}</p>
          <div className="mt-1.5 flex items-end justify-between gap-2">
            <span className="text-[23px] leading-none font-semibold tracking-[-0.02em] tabular-nums">
              {kpi.value}
            </span>
            {kpi.spark ? <Spark points={kpi.spark} /> : null}
          </div>
          {kpi.delta ? (
            <p
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[11.5px] font-medium ${kpi.down ? 'bg-[#fdecee] text-[#b42318]' : 'bg-[#e7f6ec] text-[#16794a]'}`}
            >
              {kpi.down ? '↓' : '↑'} {kpi.delta}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

const fmt = (unit: string | undefined, value: number) =>
  (unit ?? '{}').replace(
    '{}',
    Number.isInteger(value) ? value.toLocaleString('en-IN') : value.toFixed(1),
  );

function Chart(block: Extract<DeskBlock, { type: 'chart' }>) {
  const { series, labels, style, unit } = block;
  const height = block.height ?? 190;
  const all = series.flatMap((s) => s.points);
  const top = niceMax(Math.max(...all));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(top * f));
  const mark = block.mark ?? labels.length - 1;
  const first = series[0]!;
  const x = (i: number) => (labels.length === 1 ? 50 : (i / (labels.length - 1)) * 100);
  const y = (v: number) => 100 - (v / top) * 100;
  return (
    <Card
      title={block.title}
      meta={
        series.length > 1 ? (
          <span className="flex items-center gap-3">
            {series.map((s) => (
              <span key={s.name} className="flex items-center gap-1.5">
                <span
                  className="h-[3px] w-3 rounded-full"
                  style={{ background: HUE[s.hue ?? 'accent'], opacity: s.dashed ? 0.5 : 1 }}
                />
                {s.name}
              </span>
            ))}
          </span>
        ) : (
          block.meta
        )
      }
    >
      <div className="flex gap-2">
        <div
          className="flex shrink-0 flex-col-reverse justify-between pb-5 text-right text-[11px] text-[#9a9ea8] tabular-nums"
          style={{ height }}
        >
          {ticks.map((t) => (
            <span key={t} className="-translate-y-1/2 leading-none first:translate-y-0">
              {fmt(unit, t)}
            </span>
          ))}
        </div>
        <div className="relative min-w-0 flex-1" style={{ height }}>
          <div className="absolute inset-x-0 top-0 bottom-5 flex flex-col justify-between">
            {ticks.map((t) => (
              <span key={t} className="border-t border-dashed border-[#eceef2]" />
            ))}
          </div>
          <div className="absolute inset-x-0 top-0 bottom-5">
            {style === 'bars' ? (
              <div className="flex h-full items-end gap-[6px]">
                {first.points.map((v, i) => (
                  <div
                    key={i}
                    className="flex h-full min-w-0 flex-1 items-end justify-center gap-[3px]"
                  >
                    {series.map((s) => (
                      <span
                        key={s.name}
                        className="w-full max-w-[26px] rounded-t-[4px]"
                        style={{
                          height: `${(s.points[i]! / top) * 100}%`,
                          background:
                            s === first
                              ? i === mark
                                ? HUE[s.hue ?? 'accent']
                                : tint(s.hue ?? 'accent', 42)
                              : tint(s.hue ?? 'grey', 60),
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="size-full overflow-visible"
              >
                {series.map((s, si) => {
                  const d = s.points.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
                  const colour = HUE[s.hue ?? 'accent'];
                  return (
                    <g key={s.name}>
                      {style === 'area' && si === 0 ? (
                        <path d={`${d} L100 100 L0 100Z`} fill={colour} fillOpacity="0.1" />
                      ) : null}
                      <path
                        d={d}
                        fill="none"
                        stroke={colour}
                        strokeWidth={si === 0 ? 2 : 1.6}
                        strokeDasharray={s.dashed ? '4 4' : undefined}
                        strokeOpacity={s.dashed ? 0.55 : 1}
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })}
              </svg>
            )}
            {style !== 'bars' ? (
              <>
                <span
                  className="absolute top-0 bottom-0 border-l border-dashed border-[#c9ccd3]"
                  style={{ left: `${x(mark)}%` }}
                />
                <span
                  className="absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1.5px_var(--accent)]"
                  style={{
                    left: `${x(mark)}%`,
                    top: `${y(first.points[mark]!)}%`,
                    background: HUE[first.hue ?? 'accent'],
                  }}
                />
              </>
            ) : null}
            <span
              className="absolute z-10 rounded-[8px] bg-[#16181d] px-2.5 py-1.5 text-[11.5px] leading-tight whitespace-nowrap text-white shadow-lg"
              style={{
                left: `${Math.min(Math.max(style === 'bars' ? ((mark + 0.5) / labels.length) * 100 : x(mark), 12), 84)}%`,
                top: `${Math.max(y(first.points[mark]!) - 26, -4)}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <span className="block text-white/60">{labels[mark]}</span>
              <span className="font-semibold tabular-nums">{fmt(unit, first.points[mark]!)}</span>
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-[11px] text-[#9a9ea8]">
            {labels.map((label, i) =>
              style === 'bars' ||
              i % Math.ceil(labels.length / 7) === 0 ||
              i === labels.length - 1 ? (
                <span
                  key={label + i}
                  className={style === 'bars' ? 'flex-1 truncate text-center' : ''}
                >
                  {label}
                </span>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function niceMax(v: number) {
  const pow = 10 ** Math.floor(Math.log10(v || 1));
  const n = v / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * pow;
}

function Donut({ title, meta, parts, centre }: Extract<DeskBlock, { type: 'donut' }>) {
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  const hues: Hue[] = ['accent', 'blue', 'amber', 'green', 'violet', 'grey'];
  let offset = 0;
  return (
    <Card title={title} meta={meta}>
      <div className="flex items-center gap-5">
        <div className="relative size-[132px] shrink-0">
          <svg viewBox="0 0 42 42" className="size-full -rotate-90">
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="#f1f2f4" strokeWidth="5" />
            {parts.map((part, i) => {
              const pct = (part.value / total) * 100;
              const el = (
                <circle
                  key={part.label}
                  cx="21"
                  cy="21"
                  r="15.9"
                  fill="none"
                  stroke={HUE[part.hue ?? hues[i % hues.length]!]}
                  strokeWidth="5"
                  strokeDasharray={`${Math.max(pct - 1, 0.5)} ${100 - Math.max(pct - 1, 0.5)}`}
                  strokeDashoffset={-offset}
                  pathLength={100}
                />
              );
              offset += pct;
              return el;
            })}
          </svg>
          <span className="absolute inset-0 grid place-items-center text-center">
            <span>
              <span className="block text-[20px] leading-none font-semibold">{centre.value}</span>
              <span className="mt-1 block text-[11px] text-[#8b8f99]">{centre.label}</span>
            </span>
          </span>
        </div>
        <ul className="flex min-w-0 flex-1 flex-col gap-2">
          {parts.map((part, i) => (
            <li key={part.label} className="flex items-center gap-2 text-[12.5px]">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ background: HUE[part.hue ?? hues[i % hues.length]!] }}
              />
              <span className="truncate text-[#4b5060]">{part.label}</span>
              <span className="ml-auto font-medium tabular-nums">
                {Math.round((part.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

// --- tables and boards --------------------------------------------------------------------------

function Table(block: Extract<DeskBlock, { type: 'table' }>) {
  const bar = block.rows.some((row) => row.bar !== undefined);
  const pill = block.rows.some((row) => row.pill);
  const cols = `minmax(0,2fr) repeat(${block.columns.length - 1}, minmax(0,1fr))${bar ? ' 120px' : ''}${pill ? ' 112px' : ''}`;
  return (
    <Card title={block.title} meta={block.meta} pad={false}>
      {block.filters?.length ? (
        <div className="flex items-center gap-1.5 border-b border-[#ececef] px-4 py-2.5">
          {block.filters.map((filter, i) => (
            <span
              key={filter}
              className={`rounded-[7px] px-2 py-1 text-[12px] ${i === 0 ? 'bg-[#f1f2f4] font-medium' : 'text-[#6b7080]'}`}
            >
              {filter}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1 rounded-[7px] border border-[#e6e6ea] px-2 py-1 text-[12px] text-[#4b5060]">
            <Icon name="filter" size={13} /> Filter
          </span>
        </div>
      ) : null}
      <div
        className="grid items-center gap-3 border-b border-[#ececef] bg-[#fafafb] px-4 py-2 text-[11.5px] font-medium text-[#8b8f99]"
        style={{ gridTemplateColumns: cols }}
      >
        {block.columns.map((c) => (
          <span key={c} className="truncate">
            {c}
          </span>
        ))}
        {bar ? <span>{block.barLabel ?? ''}</span> : null}
        {pill ? <span>Status</span> : null}
      </div>
      {block.rows.map((row, i) => (
        <div
          key={row.cells[0]! + i}
          className={`grid items-center gap-3 border-b border-[#f1f1f3] px-4 py-2.5 text-[13px] last:border-b-0 ${row.fresh ? 'admin-row-fresh' : ''} ${row.highlight ? 'bg-[color-mix(in_srgb,var(--accent)_5%,white)]' : ''} ${row.muted ? 'text-[#9a9ea8]' : ''}`}
          style={{ gridTemplateColumns: cols }}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <Lead
              avatar={row.avatar}
              logo={row.logo}
              art={row.art}
              icon={row.icon}
              name={row.cells[0]!}
            />
            <span className="truncate font-medium">{row.cells[0]}</span>
          </span>
          {row.cells.slice(1).map((cell, j) => (
            <span key={j} className="truncate text-[#4b5060] tabular-nums">
              {cell}
            </span>
          ))}
          {bar ? (
            <span className="flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${row.bar ?? 0}%`,
                    background: (row.bar ?? 0) < 25 ? HUE.red : 'var(--accent)',
                  }}
                />
              </span>
              <span className="w-8 text-right text-[11.5px] text-[#8b8f99] tabular-nums">
                {row.bar}%
              </span>
            </span>
          ) : null}
          {pill ? <span>{row.pill ? <Pill pill={row.pill} /> : null}</span> : null}
        </div>
      ))}
    </Card>
  );
}

function Board({ columns }: Extract<DeskBlock, { type: 'board' }>) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
    >
      {columns.map((column) => (
        <div key={column.name} className="min-w-0 rounded-[11px] bg-[#f6f6f8] p-2">
          <div className="flex items-center gap-2 px-1.5 pt-1 pb-2.5 text-[12.5px] font-semibold">
            <span
              className="size-2 rounded-full"
              style={{ background: HUE[column.hue ?? 'grey'] }}
            />
            <span className="truncate">{column.name}</span>
            <span className="text-[#8b8f99]">{column.count ?? column.cards.length}</span>
            <span className="ml-auto text-[#a0a4ad]">
              <Icon name="plus" size={14} />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {column.cards.map((card) => (
              <div
                key={card.title}
                className={`rounded-[9px] border bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)] ${card.fresh ? 'admin-row-fresh' : ''} ${card.highlight ? 'border-transparent shadow-[0_0_0_1.5px_var(--accent)]' : 'border-[#ececef]'}`}
              >
                <div className="flex items-start gap-2.5">
                  {card.art ? (
                    <span className="block size-9 shrink-0 overflow-hidden rounded-[7px]">
                      <ProductArt kind={card.art} className="size-full" />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">{card.title}</span>
                    {card.meta ? (
                      <span className="mt-0.5 block truncate text-[12px] text-[#8b8f99]">
                        {card.meta}
                      </span>
                    ) : null}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  {card.tag ? <Pill pill={card.tag} small /> : null}
                  {card.due ? (
                    <span
                      className={`flex items-center gap-1 text-[11.5px] ${card.late ? 'font-medium text-[#b42318]' : 'text-[#8b8f99]'}`}
                    >
                      <Icon name="calendar" size={12} /> {card.due}
                    </span>
                  ) : null}
                  {card.amount ? (
                    <span className="text-[12px] font-semibold tabular-nums">{card.amount}</span>
                  ) : null}
                  {card.people?.length ? (
                    <span className="ml-auto flex -space-x-1.5">
                      {card.people.map((person) => (
                        <span key={person} className="rounded-full ring-2 ring-white">
                          <Avatar name={person} size={20} />
                        </span>
                      ))}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Calendar(block: Extract<DeskBlock, { type: 'calendar' }>) {
  const hour = 46;
  const label = (h: number) => {
    const whole = Math.floor(h);
    const am = whole < 12;
    const shown = whole > 12 ? whole - 12 : whole;
    return `${shown} ${am ? 'am' : 'pm'}`;
  };
  return (
    <Card title={block.title} pad={false}>
      <div
        className="grid border-b border-[#ececef] text-[12px]"
        style={{ gridTemplateColumns: `52px repeat(${block.heads.length}, minmax(0,1fr))` }}
      >
        <span />
        {block.heads.map((head, i) => (
          <span
            key={head}
            className={`truncate border-l border-[#f1f1f3] px-2.5 py-2 font-medium ${i === block.today ? 'text-[var(--accent)]' : 'text-[#4b5060]'}`}
          >
            {head}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height: block.hours * hour }}>
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `52px repeat(${block.heads.length}, minmax(0,1fr))` }}
        >
          <div>
            {Array.from({ length: block.hours }, (_, i) => (
              <span
                key={i}
                className="block pr-2 text-right text-[11px] text-[#9a9ea8]"
                style={{ height: hour }}
              >
                {label(block.start + i)}
              </span>
            ))}
          </div>
          {block.heads.map((head, c) => (
            <div
              key={head}
              className="relative border-l border-[#f1f1f3]"
              style={
                c === block.today
                  ? { background: 'color-mix(in srgb, var(--accent) 3%, white)' }
                  : undefined
              }
            >
              {Array.from({ length: block.hours }, (_, i) => (
                <span
                  key={i}
                  className="block border-t border-[#f3f3f5]"
                  style={{ height: hour }}
                />
              ))}
            </div>
          ))}
        </div>
        {block.events.map((event) => (
          <div
            key={event.title + event.col + event.from}
            className={`absolute overflow-hidden rounded-[7px] border-l-[3px] px-2 py-1 ${event.fresh ? 'admin-row-fresh' : ''}`}
            style={{
              left: `calc(52px + (100% - 52px) * ${event.col / block.heads.length} + 3px)`,
              width: `calc((100% - 52px) / ${block.heads.length} - 6px)`,
              top: (event.from - block.start) * hour + 2,
              height: (event.to - event.from) * hour - 4,
              background: tint(event.hue ?? 'accent', 14),
              borderColor: HUE[event.hue ?? 'accent'],
            }}
          >
            <span className="block truncate text-[12px] font-semibold">{event.title}</span>
            {event.meta ? (
              <span className="block truncate text-[11px] text-[#5b6070]">{event.meta}</span>
            ) : null}
          </div>
        ))}
        {block.now !== undefined ? (
          <span
            className="absolute right-0 left-[52px] z-10 border-t-[1.5px] border-[#e5484d]"
            style={{ top: (block.now - block.start) * hour }}
          >
            <span className="absolute -top-[4.5px] -left-[4px] size-2 rounded-full bg-[#e5484d]" />
          </span>
        ) : null}
      </div>
    </Card>
  );
}

// --- records and documents ----------------------------------------------------------------------

function Record(block: Extract<DeskBlock, { type: 'record' }>) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        {block.icon ? <Glyph name={block.icon} size={40} /> : null}
        {block.avatar ? <Avatar name={block.title} size={44} /> : null}
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold">{block.title}</span>
          {block.subtitle ? (
            <span className="block truncate text-[12.5px] text-[#8b8f99]">{block.subtitle}</span>
          ) : null}
        </span>
      </div>
      {block.actions?.length ? (
        <div className="mt-3 flex gap-2">
          {block.actions.map((action, i) => (
            <span
              key={action}
              className={`rounded-[8px] px-2.5 py-1 text-[12.5px] font-medium ${i === 0 ? 'text-white' : 'border border-[#e6e6ea] text-[#16181d]'}`}
              style={i === 0 ? { background: 'var(--accent)' } : undefined}
            >
              {action}
            </span>
          ))}
        </div>
      ) : null}
      {block.fields?.length ? (
        <dl className="mt-4 flex flex-col gap-2 border-t border-[#ececef] pt-3.5 text-[13px]">
          {block.fields.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="shrink-0 text-[#8b8f99]">{label}</dt>
              <dd className="truncate text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {block.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {block.tags.map((tag) => (
            <Pill key={tag.text} pill={tag} small />
          ))}
        </div>
      ) : null}
      {block.timeline?.length ? (
        <>
          <p className="mt-4 text-[12px] font-medium text-[#8b8f99]">Activity</p>
          <ol className="mt-2.5 flex flex-col gap-3">
            {block.timeline.map((step, i) => (
              <li key={step.text + i} className="relative flex gap-2.5 text-[13px]">
                {i < block.timeline!.length - 1 ? (
                  <span className="absolute top-7 bottom-[-12px] left-[13px] w-px bg-[#e6e6ea]" />
                ) : null}
                <span className="relative grid size-[27px] shrink-0 place-items-center rounded-full bg-[#f4f5f7] ring-1 ring-[#ececef]">
                  {step.logo ? (
                    <ToolMark tool={step.logo} size={14} />
                  ) : (
                    <Icon name={step.icon ?? 'clock'} size={13} className="text-[#6b7080]" />
                  )}
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block">{step.text}</span>
                  <span className="block text-[12px] text-[#8b8f99]">{step.time}</span>
                </span>
              </li>
            ))}
          </ol>
        </>
      ) : null}
    </Card>
  );
}

function Doc(block: Extract<DeskBlock, { type: 'doc' }>) {
  const mark = (label: string | undefined, children: ReactNode, className = '') =>
    label ? (
      <span
        className={`relative -mx-1 rounded-[4px] px-1 ring-[1.5px] ring-[var(--accent)] ${className}`}
        style={{ background: 'color-mix(in srgb, var(--accent) 7%, white)' }}
      >
        <span
          className="absolute -top-[15px] left-0 rounded-[3px] px-1 text-[9.5px] leading-[13px] font-semibold whitespace-nowrap text-white"
          style={{ background: 'var(--accent)' }}
        >
          {label}
        </span>
        {children}
      </span>
    ) : (
      children
    );
  return (
    <div className="grid place-items-center rounded-[11px] bg-[#e9eaee] px-6 py-5">
      <div className="relative w-full max-w-[460px] rounded-[3px] bg-white px-7 py-6 text-[12px] shadow-[0_12px_30px_-12px_rgb(0_0_0/0.3)]">
        <div className="flex items-start justify-between">
          <span>
            <span className="block text-[15px] font-bold tracking-[-0.01em]">{block.from}</span>
            <span className="block text-[11px] text-[#8b8f99]">GSTIN 29ABCDE1234F1Z5</span>
          </span>
          <span className="text-right">
            <span className="block text-[13px] font-bold tracking-[0.08em] text-[#5b6070]">
              {block.title}
            </span>
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {block.meta.map(([label, value, m]) => (
            <span key={label}>
              <span className="block text-[10.5px] text-[#9a9ea8] uppercase">{label}</span>
              <span className="mt-1 inline-block font-semibold">{mark(m, value)}</span>
            </span>
          ))}
        </div>
        <div className="mt-5 border-t border-[#16181d] pt-2">
          <div className="grid grid-cols-[minmax(0,1fr)_44px_80px] gap-2 pb-1.5 text-[10.5px] text-[#9a9ea8] uppercase">
            <span>Item</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Amount</span>
          </div>
          {block.lines.map((line) => (
            <div
              key={line.item}
              className="grid grid-cols-[minmax(0,1fr)_44px_80px] gap-2 border-t border-[#f0f0f2] py-2"
            >
              <span className="truncate">{line.item}</span>
              <span className="text-right tabular-nums">{mark(line.mark, line.qty)}</span>
              <span className="text-right tabular-nums">{line.amount}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-end border-t border-[#16181d] pt-2.5">
          <span className="text-[13px] font-bold">
            Total&nbsp;&nbsp;{mark(block.marks?.[0], block.total, 'tabular-nums')}
          </span>
        </div>
        {block.stamp ? (
          <span className="absolute right-6 bottom-12 -rotate-12 rounded-[6px] border-2 border-[#16a34a] px-2 py-0.5 text-[12px] font-bold tracking-[0.1em] text-[#16a34a] uppercase opacity-80">
            {block.stamp}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Fields(block: Extract<DeskBlock, { type: 'fields' }>) {
  return (
    <Card title={block.title} meta={block.meta}>
      <div className="flex flex-col gap-2.5">
        {block.items.map((item) => (
          <div key={item.label}>
            <span className="flex items-center justify-between text-[12px] text-[#8b8f99]">
              {item.label}
              {item.flag ? (
                <span className="font-medium text-[#b45309]">{item.flag}</span>
              ) : item.confidence ? (
                <span className="font-medium text-[#16794a] tabular-nums">{item.confidence}%</span>
              ) : null}
            </span>
            <span
              className={`mt-1 flex h-9 items-center rounded-[8px] border px-3 text-[13px] ${item.flag ? 'border-[#f5c46b] bg-[#fffaf0]' : 'border-[#e6e6ea]'}`}
            >
              <span className="truncate">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
      {block.actions?.length ? (
        <div className="mt-4 flex gap-2">
          {block.actions.map((action, i) => (
            <span
              key={action}
              className={`flex h-9 flex-1 items-center justify-center rounded-[9px] text-[13px] font-semibold ${i === 0 ? 'text-white' : 'border border-[#e6e6ea]'}`}
              style={i === 0 ? { background: 'var(--accent)' } : undefined}
            >
              {action}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

// --- lists, logs and progress -------------------------------------------------------------------

function Log(block: Extract<DeskBlock, { type: 'log' }>) {
  return (
    <Card title={block.title} meta={block.meta} pad={false}>
      <ol>
        {block.items.map((item, i) => (
          <li
            key={item.title + i}
            className={`flex items-center gap-3 border-b border-[#f1f1f3] px-4 py-2.5 last:border-b-0 ${item.fresh ? 'admin-row-fresh' : ''}`}
          >
            <span className="w-[62px] shrink-0 font-mono text-[11.5px] text-[#9a9ea8]">
              {item.time}
            </span>
            {item.logo ? (
              <span className="grid size-7 shrink-0 place-items-center rounded-[7px] bg-white ring-1 ring-black/[0.07]">
                <ToolMark tool={item.logo} size={15} />
              </span>
            ) : item.icon ? (
              <Glyph name={item.icon} size={28} />
            ) : null}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px]">{item.title}</span>
              {item.meta ? (
                <span className="block truncate text-[12px] text-[#8b8f99]">{item.meta}</span>
              ) : null}
            </span>
            {item.pill ? <Pill pill={item.pill} small /> : null}
          </li>
        ))}
      </ol>
    </Card>
  );
}

function List(block: Extract<DeskBlock, { type: 'list' }>) {
  return (
    <Card title={block.title} meta={block.meta}>
      <ul className="flex flex-col gap-3">
        {block.items.map((item) => (
          <li key={item.title} className="flex items-center gap-3">
            {item.logo ? (
              <span className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-white ring-1 ring-black/[0.07]">
                <ToolMark tool={item.logo} size={17} />
              </span>
            ) : item.icon ? (
              <Glyph name={item.icon} hue={item.hue} size={32} />
            ) : item.avatar ? (
              <Avatar name={item.title} size={32} />
            ) : item.done !== undefined ? (
              <span
                className={`grid size-[18px] shrink-0 place-items-center rounded-[5px] border ${item.done ? 'border-transparent text-white' : 'border-[#cfd2d8]'}`}
                style={item.done ? { background: 'var(--accent)' } : undefined}
              >
                {item.done ? <Icon name="check" size={12} strokeWidth={2.6} /> : null}
              </span>
            ) : null}
            <span className="min-w-0 flex-1">
              <span
                className={`block truncate text-[13px] font-medium ${item.done ? 'text-[#9a9ea8] line-through' : ''}`}
              >
                {item.title}
              </span>
              {item.meta ? (
                <span className="block truncate text-[12px] text-[#8b8f99]">{item.meta}</span>
              ) : null}
            </span>
            {item.value ? (
              <span className="shrink-0 text-[13px] font-semibold tabular-nums">{item.value}</span>
            ) : null}
            {item.pill ? <Pill pill={item.pill} small /> : null}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Progress(block: Extract<DeskBlock, { type: 'progress' }>) {
  return (
    <Card title={block.title} meta={block.meta}>
      <ul className="flex flex-col gap-3.5">
        {block.items.map((item) => (
          <li key={item.label}>
            <span className="flex items-baseline justify-between text-[13px]">
              <span className="truncate font-medium">{item.label}</span>
              <span className="text-[12px] text-[#8b8f99] tabular-nums">
                {item.note ?? `${item.value}%`}
              </span>
            </span>
            <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-[#eef0f3]">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${Math.min(item.value, 100)}%`,
                  background: HUE[item.hue ?? 'accent'],
                }}
              />
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Assistant(block: Extract<DeskBlock, { type: 'assistant' }>) {
  return (
    <Card title={block.title} meta={block.meta} pad={false}>
      <div className="flex flex-col gap-3 bg-[#fafafb] px-4 py-4">
        {block.messages.map((m, i) =>
          m.from === 'user' ? (
            <p
              key={i}
              className="max-w-[80%] self-end rounded-[14px] rounded-br-[4px] bg-[#16181d] px-3 py-2 text-[13px] text-white"
            >
              {m.text}
            </p>
          ) : (
            <div
              key={i}
              className={`flex max-w-[88%] gap-2.5 ${i === block.messages.length - 1 ? 'wa-arrive' : ''}`}
            >
              <span
                className="grid size-7 shrink-0 place-items-center rounded-full text-white"
                style={{ background: 'var(--accent)' }}
              >
                <Icon name="spark" size={14} strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block rounded-[14px] rounded-tl-[4px] border border-[#ececef] bg-white px-3 py-2 text-[13px] leading-[1.5]">
                  {m.text}
                </span>
                {m.sources?.length ? (
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.sources.map((source) => (
                      <span
                        key={source}
                        className="inline-flex items-center gap-1 rounded-full border border-[#e6e6ea] bg-white px-2 py-0.5 text-[11.5px] text-[#4b5060]"
                      >
                        <Icon name="file" size={11} /> {source}
                      </span>
                    ))}
                  </span>
                ) : null}
              </span>
            </div>
          ),
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-[#ececef] px-3 py-2.5">
        <span className="flex h-9 flex-1 items-center rounded-[9px] border border-[#e6e6ea] px-3 text-[13px] text-[#9a9ea8]">
          {block.input ?? 'Ask a question…'}
        </span>
        <span
          className="grid size-9 place-items-center rounded-[9px] text-white"
          style={{ background: 'var(--accent)' }}
        >
          <Icon name="arrow" size={15} className="-rotate-90" />
        </span>
      </div>
    </Card>
  );
}

function Connections(block: Extract<DeskBlock, { type: 'connections' }>) {
  return (
    <div>
      {block.title ? <p className="mb-2.5 text-[13.5px] font-semibold">{block.title}</p> : null}
      <div className="grid grid-cols-3 gap-3">
        {block.items.map((item) => (
          <div key={item.tool} className="rounded-[11px] border border-[#ececef] bg-white p-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-[9px] bg-white ring-1 ring-black/[0.08]">
                <ToolMark tool={item.tool} size={20} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[13.5px] font-semibold">
                {item.tool}
              </span>
              <span
                className="relative h-5 w-9 shrink-0 rounded-full"
                style={{ background: item.status.tone === 'green' ? 'var(--accent)' : '#d4d6dc' }}
              >
                <span
                  className={`absolute top-0.5 size-4 rounded-full bg-white shadow ${item.status.tone === 'green' ? 'right-0.5' : 'left-0.5'}`}
                />
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <Pill pill={item.status} small />
              <span className="truncate text-[11.5px] text-[#8b8f99]">{item.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Uptime(block: Extract<DeskBlock, { type: 'uptime' }>) {
  return (
    <Card title={block.title} meta={block.meta}>
      <div className="flex items-baseline gap-2">
        <span className="text-[22px] font-semibold tabular-nums">{block.value}</span>
        <span className="text-[12px] text-[#8b8f99]">uptime, last {block.days.length} days</span>
      </div>
      <div className="mt-3 flex h-8 gap-[2px]">
        {block.days.map((day, i) => (
          <span
            key={i}
            className="flex-1 rounded-[2px]"
            style={{ background: day === 2 ? '#22c55e' : day === 1 ? '#f5b544' : '#ef4444' }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-[#9a9ea8]">
        <span>{block.days.length} days ago</span>
        <span>Today</span>
      </div>
    </Card>
  );
}

function Scores(block: Extract<DeskBlock, { type: 'scores' }>) {
  return (
    <Card title={block.title} meta={block.meta}>
      <div className="grid grid-cols-4 gap-2">
        {block.items.map((item) => {
          const colour = item.value >= 90 ? '#0cce6b' : item.value >= 50 ? '#ffa400' : '#ff4e42';
          return (
            <div key={item.label} className="flex flex-col items-center text-center">
              <span className="relative size-[70px]">
                <svg viewBox="0 0 42 42" className="size-full -rotate-90">
                  <circle cx="21" cy="21" r="17" fill={`${colour}1a`} stroke="none" />
                  <circle
                    cx="21"
                    cy="21"
                    r="17"
                    fill="none"
                    stroke={colour}
                    strokeWidth="3"
                    pathLength={100}
                    strokeDasharray={`${item.value} ${100 - item.value}`}
                  />
                </svg>
                <span
                  className="absolute inset-0 grid place-items-center text-[19px] font-semibold tabular-nums"
                  style={{ color: colour === '#0cce6b' ? '#08803f' : colour }}
                >
                  {item.value}
                </span>
              </span>
              <span className="mt-1.5 text-[12px] leading-tight text-[#4b5060]">{item.label}</span>
            </div>
          );
        })}
      </div>
      {block.metrics?.length ? (
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[#ececef] pt-3.5 text-[12.5px]">
          {block.metrics.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <dt className="flex items-center gap-1.5 text-[#6b7080]">
                <span className="size-2 rounded-full bg-[#0cce6b]" />
                {label}
              </dt>
              <dd className="font-semibold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Card>
  );
}

function Funnel(block: Extract<DeskBlock, { type: 'funnel' }>) {
  const max = Math.max(...block.items.map((item) => item.value));
  return (
    <Card title={block.title} meta={block.meta}>
      <ul className="flex flex-col gap-2">
        {block.items.map((item, i) => (
          <li
            key={item.label}
            className="grid grid-cols-[110px_minmax(0,1fr)_64px] items-center gap-3 text-[12.5px]"
          >
            <span className="truncate text-[#4b5060]">{item.label}</span>
            <span className="h-7 rounded-[6px] bg-[#f4f5f7]">
              <span
                className="flex h-full items-center rounded-[6px] px-2 text-[12px] font-semibold text-white tabular-nums"
                style={{
                  width: `${Math.max((item.value / max) * 100, 8)}%`,
                  background: `color-mix(in srgb, var(--accent) ${100 - i * 14}%, white)`,
                }}
              >
                {item.value.toLocaleString('en-IN')}
              </span>
            </span>
            <span className="text-right text-[#8b8f99] tabular-nums">{item.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Sheet(block: Extract<DeskBlock, { type: 'sheet' }>) {
  const letters = 'ABCDEFGH';
  const cols = `36px repeat(${block.columns.length}, minmax(0,1fr))`;
  return (
    <div className="overflow-hidden rounded-[11px] border border-[#dadce0] bg-white text-[12.5px]">
      <div className="flex items-center gap-2 border-b border-[#dadce0] bg-[#f8f9fa] px-3 py-2">
        <span className="grid size-6 place-items-center rounded-[4px] bg-[#0f9d58] text-white">
          <Icon name="table" size={14} strokeWidth={2} />
        </span>
        <span className="font-medium">{block.title}</span>
        <span className="ml-auto text-[11.5px] text-[#80868b]">All changes saved</span>
      </div>
      <div
        className="grid bg-[#f8f9fa] text-center text-[11px] text-[#80868b]"
        style={{ gridTemplateColumns: cols }}
      >
        <span className="border-r border-b border-[#e2e3e5] py-1" />
        {block.columns.map((_, i) => (
          <span key={i} className="border-r border-b border-[#e2e3e5] py-1">
            {letters[i]}
          </span>
        ))}
      </div>
      {[{ cells: block.columns, head: true }, ...block.rows].map((row, r) => (
        <div
          key={r}
          className={`grid ${'fresh' in row && row.fresh ? 'admin-row-fresh bg-[#e6f4ea]' : ''}`}
          style={{ gridTemplateColumns: cols }}
        >
          <span className="border-r border-b border-[#e2e3e5] bg-[#f8f9fa] py-1.5 text-center text-[11px] text-[#80868b]">
            {r + 1}
          </span>
          {row.cells.map((cell, c) => (
            <span
              key={c}
              className={`truncate border-r border-b border-[#e2e3e5] px-2 py-1.5 ${'head' in row ? 'font-semibold' : ''}`}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Mapping(block: Extract<DeskBlock, { type: 'mapping' }>) {
  return (
    <Card title={block.title}>
      <div className="grid grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] items-center gap-y-2">
        {[block.from, null, block.to].map((side, i) =>
          side ? (
            <span
              key={side.tool}
              className="flex items-center gap-2 pb-1 text-[12.5px] font-semibold"
            >
              <ToolMark tool={side.tool} size={16} /> {side.tool}
            </span>
          ) : (
            <span key={i} />
          ),
        )}
        {block.from.fields.map((field, i) => (
          <div key={field} className="contents">
            <span className="truncate rounded-[7px] border border-[#e6e6ea] bg-[#fafafb] px-2.5 py-1.5 font-mono text-[12px]">
              {field}
            </span>
            <span className="grid place-items-center text-[var(--accent)]">
              <Icon name="arrow" size={16} />
            </span>
            <span className="truncate rounded-[7px] border border-[#e6e6ea] bg-[#fafafb] px-2.5 py-1.5 font-mono text-[12px]">
              {block.to.fields[i]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Stages(block: Extract<DeskBlock, { type: 'stages' }>) {
  return (
    <Card title={block.title}>
      <ol className="flex items-start">
        {block.items.map((item, i) => (
          <li
            key={item.label}
            className="relative flex min-w-0 flex-1 flex-col items-center text-center"
          >
            {i > 0 ? (
              <span
                className="absolute top-[13px] right-1/2 left-[-50%] h-[2px]"
                style={{ background: item.state === 'next' ? '#e6e6ea' : 'var(--accent)' }}
              />
            ) : null}
            <span
              className={`relative z-10 grid size-[28px] place-items-center rounded-full text-[12px] font-semibold ${item.state === 'next' ? 'border-2 border-[#e6e6ea] bg-white text-[#9a9ea8]' : 'text-white'}`}
              style={
                item.state === 'next'
                  ? undefined
                  : {
                      background: 'var(--accent)',
                      boxShadow:
                        item.state === 'now'
                          ? '0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)'
                          : undefined,
                    }
              }
            >
              {item.state === 'done' ? <Icon name="check" size={14} strokeWidth={2.6} /> : i + 1}
            </span>
            <span
              className={`mt-2 text-[12.5px] ${item.state === 'next' ? 'text-[#8b8f99]' : 'font-medium'}`}
            >
              {item.label}
            </span>
            {item.meta ? <span className="text-[11.5px] text-[#9a9ea8]">{item.meta}</span> : null}
          </li>
        ))}
      </ol>
    </Card>
  );
}

function Roadmap(block: Extract<DeskBlock, { type: 'roadmap' }>) {
  const n = block.heads.length;
  return (
    <Card title={block.title} pad={false}>
      <div
        className="grid text-[11.5px] text-[#8b8f99]"
        style={{ gridTemplateColumns: `150px repeat(${n}, minmax(0,1fr))` }}
      >
        <span className="border-b border-[#ececef] px-4 py-2" />
        {block.heads.map((head) => (
          <span
            key={head}
            className="border-b border-l border-[#f1f1f3] border-b-[#ececef] px-2 py-2"
          >
            {head}
          </span>
        ))}
      </div>
      <div className="relative">
        {block.rows.map((row) => (
          <div
            key={row.label}
            className="grid h-11 items-center border-b border-[#f3f3f5] last:border-b-0"
            style={{ gridTemplateColumns: `150px repeat(${n}, minmax(0,1fr))` }}
          >
            <span className="truncate px-4 text-[13px] font-medium" style={{ gridRow: 1 }}>
              {row.label}
            </span>
            {(
              row.bars ?? [
                { from: row.from ?? 0, to: row.to ?? 1, text: row.text ?? '', hue: row.hue },
              ]
            ).map((bar) => (
              <span
                key={bar.text + bar.from}
                className={`relative mx-[2px] h-7 truncate rounded-[7px] px-2.5 text-[12px] leading-7 font-medium ${'fresh' in bar && bar.fresh ? 'admin-row-fresh' : ''}`}
                style={{
                  gridRow: 1,
                  gridColumn: `${bar.from + 2} / ${bar.to + 2}`,
                  background: tint(bar.hue ?? 'accent', 16),
                  color: bar.hue === 'grey' ? '#5b6070' : HUE[bar.hue ?? 'accent'],
                  boxShadow: `inset 3px 0 0 ${HUE[bar.hue ?? 'accent']}`,
                }}
              >
                {bar.text}
              </span>
            ))}
          </div>
        ))}
        {block.now !== undefined ? (
          <span
            className="absolute top-0 bottom-0 border-l-[1.5px] border-[#e5484d]"
            style={{ left: `calc(150px + (100% - 150px) * ${block.now / n})` }}
          />
        ) : null}
      </div>
    </Card>
  );
}

function Site(block: Extract<DeskBlock, { type: 'site' }>) {
  const b = BRANDS[block.brand]!;
  return (
    <Card title={block.title} pad={false}>
      <div className="bg-[#f1f2f4] p-3">
        <div className="overflow-hidden rounded-[8px] bg-white shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)] ring-1 ring-black/[0.06]">
          <div className="flex items-center gap-2 border-b border-[#ececef] px-3 py-1.5">
            <span className="flex gap-1">
              <span className="size-2 rounded-full bg-[#ff5f57]" />
              <span className="size-2 rounded-full bg-[#febc2e]" />
              <span className="size-2 rounded-full bg-[#28c840]" />
            </span>
            <span className="mx-auto flex items-center gap-1 rounded-[5px] bg-[#f4f5f7] px-3 py-0.5 text-[11px] text-[#6b7080]">
              <Icon name="lock" size={10} /> {block.url}
            </span>
          </div>
          <Scaled className="h-[300px] w-full [--k:0.5]">
            <DesktopSite b={b} />
          </Scaled>
        </div>
      </div>
    </Card>
  );
}

function Form(block: Extract<DeskBlock, { type: 'form' }>) {
  return (
    <Card title={block.title} meta={block.meta}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        {block.fields.map((field) => (
          <div key={field.label} className={field.kind === 'area' ? 'col-span-2' : ''}>
            <span className="block text-[12px] text-[#8b8f99]">{field.label}</span>
            {field.kind === 'toggle' ? (
              <span className="mt-1.5 flex items-center gap-2 text-[13px]">
                <span
                  className="relative h-5 w-9 rounded-full"
                  style={{ background: field.value === 'On' ? 'var(--accent)' : '#d4d6dc' }}
                >
                  <span
                    className={`absolute top-0.5 size-4 rounded-full bg-white shadow ${field.value === 'On' ? 'right-0.5' : 'left-0.5'}`}
                  />
                </span>
                {field.value}
              </span>
            ) : (
              <span
                className={`mt-1 flex items-center justify-between gap-2 rounded-[8px] border border-[#e6e6ea] px-3 text-[13px] ${field.kind === 'area' ? 'min-h-[64px] items-start py-2' : 'h-9'}`}
              >
                <span className={field.kind === 'area' ? 'line-clamp-2' : 'truncate'}>
                  {field.value}
                </span>
                {field.kind === 'select' ? (
                  <Icon name="chevron" size={13} className="shrink-0 rotate-90 text-[#8b8f99]" />
                ) : null}
              </span>
            )}
          </div>
        ))}
      </div>
      {block.actions?.length ? (
        <div className="mt-4 flex justify-end gap-2">
          {block.actions.map((action, i) => (
            <span
              key={action}
              className={`rounded-[8px] px-3 py-1.5 text-[12.5px] font-semibold ${i === block.actions!.length - 1 ? 'text-white' : 'border border-[#e6e6ea]'}`}
              style={i === block.actions!.length - 1 ? { background: 'var(--accent)' } : undefined}
            >
              {action}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

function Cohort(block: Extract<DeskBlock, { type: 'cohort' }>) {
  return (
    <Card title={block.title} meta={block.meta}>
      <div
        className="grid gap-1 text-[11.5px]"
        style={{ gridTemplateColumns: `72px repeat(${block.heads.length}, minmax(0,1fr))` }}
      >
        <span />
        {block.heads.map((head) => (
          <span key={head} className="text-center text-[#8b8f99]">
            {head}
          </span>
        ))}
        {block.rows.map((row) => (
          <div key={row.label} className="contents">
            <span className="truncate py-1.5 text-[#4b5060]">{row.label}</span>
            {block.heads.map((head, i) => {
              const v = row.values[i];
              return (
                <span
                  key={head}
                  className="rounded-[4px] py-1.5 text-center font-medium tabular-nums"
                  style={
                    v === undefined
                      ? { background: '#f7f7f9' }
                      : {
                          background: `color-mix(in srgb, var(--accent) ${Math.round(v * 0.85)}%, white)`,
                          color: v > 55 ? '#fff' : '#16181d',
                        }
                  }
                >
                  {v === undefined ? '' : `${v}%`}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}

function Requests(block: Extract<DeskBlock, { type: 'requests' }>) {
  return (
    <Card title={block.title} pad={false}>
      <ol className="font-mono text-[12px]">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 border-b border-[#f1f1f3] px-4 py-2 last:border-b-0"
          >
            <span
              className={`w-12 shrink-0 rounded-[4px] py-px text-center text-[10.5px] font-bold ${item.method === 'GET' ? 'bg-[#e8f1fd] text-[#1d5fc2]' : 'bg-[#e7f6ec] text-[#16794a]'}`}
            >
              {item.method}
            </span>
            <span className="min-w-0 flex-1 truncate">{item.path}</span>
            <span
              className={`shrink-0 font-semibold ${item.status >= 400 ? 'text-[#b42318]' : 'text-[#16794a]'}`}
            >
              {item.status}
            </span>
            <span className="w-14 shrink-0 text-right text-[#8b8f99]">{item.ms} ms</span>
            <span className="w-16 shrink-0 text-right text-[#9a9ea8]">{item.time}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function Matrix(block: Extract<DeskBlock, { type: 'matrix' }>) {
  const cols = `minmax(0,1.6fr) repeat(${block.heads.length}, minmax(0,1fr))`;
  return (
    <Card title={block.title} pad={false}>
      <div
        className="grid border-b border-[#ececef] bg-[#fafafb] px-4 py-2 text-[11.5px] font-medium text-[#8b8f99]"
        style={{ gridTemplateColumns: cols }}
      >
        <span>Permission</span>
        {block.heads.map((head) => (
          <span key={head} className="text-center">
            {head}
          </span>
        ))}
      </div>
      {block.rows.map((row) => (
        <div
          key={row.label}
          className="grid items-center border-b border-[#f1f1f3] px-4 py-2.5 text-[13px] last:border-b-0"
          style={{ gridTemplateColumns: cols }}
        >
          <span className="truncate">{row.label}</span>
          {row.values.map((on, i) => (
            <span key={i} className="grid place-items-center">
              <span
                className={`grid size-[18px] place-items-center rounded-[5px] ${on ? 'text-white' : 'border border-[#d4d6dc]'}`}
                style={on ? { background: 'var(--accent)' } : undefined}
              >
                {on ? <Icon name="check" size={12} strokeWidth={2.6} /> : null}
              </span>
            </span>
          ))}
        </div>
      ))}
    </Card>
  );
}

function Plans(block: Extract<DeskBlock, { type: 'plans' }>) {
  return (
    <Card title={block.title}>
      <div className="grid grid-cols-3 gap-3">
        {block.items.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[10px] border p-3.5 ${plan.current ? 'border-transparent' : 'border-[#ececef]'}`}
            style={
              plan.current
                ? { boxShadow: '0 0 0 1.5px var(--accent)', background: tint('accent', 5) }
                : undefined
            }
          >
            <span className="flex items-center justify-between text-[13px] font-semibold">
              {plan.name}
              {plan.current ? <Pill pill={{ text: 'Current', tone: 'accent' }} small /> : null}
            </span>
            <span className="mt-2 block text-[20px] font-semibold tabular-nums">{plan.price}</span>
            <span className="mt-1 block text-[12px] text-[#8b8f99]">{plan.line}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Note(block: Extract<DeskBlock, { type: 'note' }>) {
  return (
    <div
      className="flex gap-3 rounded-[11px] border p-3.5"
      style={{
        background: tint(block.hue ?? 'accent', 6),
        borderColor: tint(block.hue ?? 'accent', 25),
      }}
    >
      <Glyph name={block.icon ?? 'bulb'} hue={block.hue} size={30} />
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold">{block.title}</span>
        <span className="mt-0.5 block text-[12.5px] leading-[1.5] text-[#4b5060]">
          {block.text}
        </span>
      </span>
    </div>
  );
}

function WhatsApp(block: Extract<DeskBlock, { type: 'whatsapp' }>) {
  return (
    <Card
      title={block.title}
      meta={
        block.meta ?? (
          <span className="flex items-center gap-1.5">
            <ToolMark tool="WhatsApp" size={13} /> WhatsApp Business Platform
          </span>
        )
      }
      pad={false}
    >
      <div className="px-6 pt-4 pb-5" style={waWallpaper(true)}>
        <WaThread messages={block.messages} mine="business" desk />
      </div>
    </Card>
  );
}

export function DeskBlockView({ block }: { block: DeskBlock }) {
  switch (block.type) {
    case 'whatsapp':
      return <WhatsApp {...block} />;
    case 'kpis':
      return <Kpis {...block} />;
    case 'chart':
      return <Chart {...block} />;
    case 'donut':
      return <Donut {...block} />;
    case 'table':
      return <Table {...block} />;
    case 'board':
      return <Board {...block} />;
    case 'calendar':
      return <Calendar {...block} />;
    case 'record':
      return <Record {...block} />;
    case 'doc':
      return <Doc {...block} />;
    case 'fields':
      return <Fields {...block} />;
    case 'log':
      return <Log {...block} />;
    case 'list':
      return <List {...block} />;
    case 'progress':
      return <Progress {...block} />;
    case 'assistant':
      return <Assistant {...block} />;
    case 'connections':
      return <Connections {...block} />;
    case 'uptime':
      return <Uptime {...block} />;
    case 'scores':
      return <Scores {...block} />;
    case 'funnel':
      return <Funnel {...block} />;
    case 'sheet':
      return <Sheet {...block} />;
    case 'mapping':
      return <Mapping {...block} />;
    case 'stages':
      return <Stages {...block} />;
    case 'roadmap':
      return <Roadmap {...block} />;
    case 'site':
      return <Site {...block} />;
    case 'form':
      return <Form {...block} />;
    case 'cohort':
      return <Cohort {...block} />;
    case 'requests':
      return <Requests {...block} />;
    case 'matrix':
      return <Matrix {...block} />;
    case 'plans':
      return <Plans {...block} />;
    case 'note':
      return <Note {...block} />;
  }
}

export const spanStyle = (span = 12): CSSProperties => ({
  gridColumn: `span ${span} / span ${span}`,
});
