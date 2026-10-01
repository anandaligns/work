import type { CSSProperties, ReactNode } from 'react';

import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import type { BrandId, Message, Pill, Row, Tone } from './types';

/**
 * The pieces every product screen is made of: the frames (an application window, a phone, a
 * card), the business's mark, status pills, chat bubbles, table rows, board columns and figures.
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Whose screen it is: an example business from the concept sites, or `yours` — the product as
 * the reader's own business would have it, in the page's accent.
 */
export function brandInfo(brand: BrandId): { name: string; accent: string } {
  if (brand === 'yours') return { name: 'Your Business', accent: 'var(--accent)' };
  const b = BRANDS[brand]!;
  return { name: b.name, accent: b.accent };
}

const TONES: Record<Tone, string> = {
  green: 'bg-[#e6f7ee] text-[#136b3d]',
  amber: 'bg-[#fff3d6] text-[#7a5200]',
  grey: 'bg-[#f1f2f5] text-ink-2',
  accent: 'bg-[color-mix(in_srgb,var(--accent)_12%,white)] text-[var(--accent)]',
  red: 'bg-[#fdecee] text-[#b42318]',
};

export function StatusPill({ pill }: { pill: Pill }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold whitespace-nowrap ${TONES[pill.tone ?? 'grey']}`}
    >
      {pill.text}
    </span>
  );
}

/** The business's mark: its colour in a rounded square, as on its concept site, and its name. */
export function Mark({ brand, small = false }: { brand?: BrandId; small?: boolean }) {
  if (!brand) return null;
  const b = brandInfo(brand);
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <span
        className={`shrink-0 rounded-[4px] ${small ? 'size-3' : 'size-3.5'}`}
        style={{ background: b.accent }}
      />
      <span className={`truncate font-semibold text-ink ${small ? 'text-[11px]' : 'text-[12px]'}`}>
        {b.name}
      </span>
    </span>
  );
}

/** An application window: a quiet title bar and the screen under it. */
export function Window({
  brand,
  title,
  children,
  className = '',
}: {
  brand?: BrandId;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`screen-window overflow-hidden rounded-xl border border-black/[0.09] bg-white shadow-[0_24px_60px_-44px_rgb(11_13_18/0.45)] ${className}`}
    >
      {/* Sized by the screen under it, never by its own title. Hidden inside a device's browser. */}
      <div className="screen-window-bar flex h-9 w-0 min-w-full items-center gap-3 border-b border-black/[0.06] bg-[#fafafb] px-3">
        <span className="flex shrink-0 gap-1">
          <span className="size-2 rounded-full bg-black/[0.12]" />
          <span className="size-2 rounded-full bg-black/[0.08]" />
          <span className="size-2 rounded-full bg-black/[0.08]" />
        </span>
        <Mark brand={brand} small />
        <span className="ml-auto truncate text-[11px] text-ink-2">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** A phone: rounded glass, a status line, and the screen inside. */
export function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto rounded-[2rem] border border-black/[0.1] bg-white p-1.5 shadow-[0_28px_60px_-40px_rgb(11_13_18/0.5)] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.6rem] bg-[#f6f7f9]">
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold text-ink">
          <span>9:41</span>
          <span className="h-4 w-14 rounded-full bg-black/80" />
          <span className="flex gap-0.5">
            <span className="h-2 w-0.5 rounded-sm bg-ink" />
            <span className="h-2 w-0.5 rounded-sm bg-ink" />
            <span className="h-2 w-0.5 rounded-sm bg-ink/40" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-black/[0.09] bg-white shadow-[0_18px_44px_-36px_rgb(11_13_18/0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Bubble({ message, index }: { message: Message; index: number }) {
  if (message.from === 'note') {
    return (
      <p
        data-reveal=""
        style={{ '--i': index } as CSSProperties}
        className="mx-auto max-w-[85%] rounded-full bg-black/[0.05] px-2.5 py-1 text-center text-[10.5px] text-ink-2"
      >
        {message.text}
      </p>
    );
  }
  const ours = message.from === 'us';
  return (
    <div
      data-reveal=""
      style={{ '--i': index } as CSSProperties}
      className={`flex max-w-[86%] flex-col gap-1 ${ours ? 'self-end items-end' : 'self-start'}`}
    >
      {message.text || message.doc || message.location || message.source ? (
        <div
          className={`rounded-2xl px-3 py-2 text-[12px] leading-[1.45] text-ink ${
            ours
              ? 'rounded-br-md bg-[color-mix(in_srgb,var(--accent)_13%,white)]'
              : 'rounded-bl-md border border-black/[0.07] bg-white'
          }`}
        >
          {message.text ? <p>{message.text}</p> : null}
          {message.location ? (
            <p className="mt-1.5 flex items-center gap-2 rounded-lg bg-white/80 px-2 py-1.5 text-[11px] text-ink">
              <span className="text-[var(--accent)]">
                <Icon name="pin" size={14} />
              </span>
              {message.location}
            </p>
          ) : null}
          {message.doc ? (
            <p className="mt-1.5 flex items-center gap-2 rounded-lg bg-white/80 px-2 py-1.5">
              <span className="text-[var(--accent)]">
                <Icon name="file" size={15} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold text-ink">
                  {message.doc.title}
                </span>
                {message.doc.meta ? (
                  <span className="block text-[10px] text-ink-2">{message.doc.meta}</span>
                ) : null}
              </span>
            </p>
          ) : null}
          {message.source ? (
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-ink-2">
              <Icon name="file" size={11} />
              {message.source}
            </span>
          ) : null}
          {message.time ? (
            <span className="mt-0.5 block text-right text-[9.5px] text-ink-2">{message.time}</span>
          ) : null}
        </div>
      ) : null}
      {message.buttons?.length ? (
        <div className={`flex flex-wrap gap-1.5 ${ours ? 'justify-end' : ''}`}>
          {message.buttons.map((button) => (
            <span
              key={button}
              className="rounded-full border border-[color-mix(in_srgb,var(--accent)_35%,white)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--accent)]"
            >
              {button}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function TableRows({ columns, rows }: { columns: string[]; rows: Row[] }) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              className="border-b border-black/[0.06] px-3 py-2 text-[10px] font-semibold tracking-[0.06em] text-ink-2 uppercase"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className={row.highlight ? 'bg-[color-mix(in_srgb,var(--accent)_7%,white)]' : ''}
          >
            {row.cells.map((cell, j) => (
              <td
                key={j}
                className={`border-b border-black/[0.05] px-3 py-2 text-[11.5px] whitespace-nowrap ${j === 0 ? 'font-medium text-ink' : 'text-ink-2'}`}
              >
                {cell}
              </td>
            ))}
            {row.pill ? (
              <td className="border-b border-black/[0.05] px-3 py-2">
                <StatusPill pill={row.pill} />
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** A board's columns of cards, as a pipeline or a production plan lays them out. */
export function BoardColumns({
  columns,
}: {
  columns: { name: string; cards: { title: string; meta?: string; highlight?: boolean }[] }[];
}) {
  return (
    <div className="flex gap-2 overflow-hidden bg-[#fafafb] p-3">
      {columns.map((column) => (
        <div key={column.name} className="min-w-[6.5rem] flex-1">
          <p className="flex items-center justify-between px-0.5 text-[10.5px] font-semibold text-ink-2">
            <span className="truncate">{column.name}</span>
            <span className="tabular-nums">{column.cards.length}</span>
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {column.cards.map((card, i) => (
              <div
                key={i}
                data-reveal=""
                style={{ '--i': i } as CSSProperties}
                className={`rounded-lg border bg-white px-2 py-1.5 ${card.highlight ? 'border-[var(--accent)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--accent)_18%,transparent)]' : 'border-black/[0.07]'}`}
              >
                <p className="truncate text-[11px] font-medium text-ink">{card.title}</p>
                {card.meta ? <p className="truncate text-[10px] text-ink-2">{card.meta}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** A row of figures, and a bar chart under them, the last bar in the accent. */
export function StatTiles({
  tiles,
  chart,
}: {
  tiles: { label: string; value: string; note?: string }[];
  chart?: { label: string; bars: number[] };
}) {
  const max = Math.max(...(chart?.bars ?? [1]));
  return (
    <div className="p-3">
      <div
        className={`grid gap-2 ${tiles.length > 3 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}
      >
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-lg border border-black/[0.06] px-2.5 py-2">
            <p className="truncate text-[10px] text-ink-2">{tile.label}</p>
            <p className="mt-0.5 text-[15px] font-semibold text-ink tabular-nums">{tile.value}</p>
            {tile.note ? <p className="text-[10px] text-ink-2">{tile.note}</p> : null}
          </div>
        ))}
      </div>
      {chart ? (
        <div className="mt-3 rounded-lg border border-black/[0.06] p-2.5">
          <p className="text-[10px] text-ink-2">{chart.label}</p>
          <div className="mt-2 flex h-20 items-end gap-1.5">
            {chart.bars.map((bar, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[3px]"
                style={{
                  height: `${Math.max(8, (bar / max) * 100)}%`,
                  background:
                    i === chart.bars.length - 1
                      ? 'var(--accent)'
                      : 'color-mix(in srgb, var(--accent) 22%, white)',
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
