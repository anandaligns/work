import type { CSSProperties, ReactNode } from 'react';

import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';
import { onColour } from './light-kit';

/**
 * The window kit: the pieces of a solution page's Lightfield-style pictures, where the product's
 * own windows overlap on the page's tint and run off its edges (`Bleed`). White windows with a
 * hairline — floating free with a deeper shadow, or anchored and cut by the frame — a bar along
 * the top, small grey labels over each group, figures in boxes, steps joined by a line with the
 * wait between them, a list down the side with one row open, messages, choices and ticks. Every
 * colour is the page's own (`accent`); text on it turns ink where the colour is light.
 */

export function Pane({
  x,
  y,
  w,
  h,
  i = 0,
  float = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  i?: number;
  float?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`frag-in absolute overflow-hidden border border-[#e4e6eb] bg-white text-ink ${float ? 'rounded-[18px] shadow-[0_1px_2px_rgb(11_13_18/0.05),0_34px_70px_-28px_rgb(11_13_18/0.32)]' : 'rounded-tl-[16px] shadow-[0_4px_48px_rgb(11_13_18/0.07)]'}`}
      style={{ left: x, top: y, width: w, height: h, '--i': i } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** A window's bar: a glyph, its words, and anything after them. */
export function Bar({ icon, children }: { icon?: IconName; children: ReactNode }) {
  return (
    <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-[#eef0f3] px-5 text-[13px] whitespace-nowrap">
      {icon ? <Icon name={icon} size={15} /> : null}
      {children}
    </div>
  );
}

/** Tabs in a bar, the first chosen. */
export function Tabs({ items }: { items: string[] }) {
  return (
    <span className="ml-4 flex gap-1.5 text-[12px]">
      {items.map((tab, k) => (
        <span
          key={tab}
          className={`rounded-[7px] border px-2.5 py-1 ${k === 0 ? 'border-[#e4e6eb] bg-[#f6f7f9] font-medium' : 'border-[#eef0f3] text-ink-3'}`}
        >
          {tab}
        </span>
      ))}
    </span>
  );
}

/** Lightfield's "···". */
export function More() {
  return <span className="tracking-[0.12em] text-ink-3">···</span>;
}

/** A small grey label over a group, as Lightfield's "Description", "Files". */
export function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11.5px] text-ink-3">{children}</p>;
}

/** A record's heading: a tile, a large name, and a status after it. */
export function Title({
  tile,
  title,
  after,
}: {
  tile: ReactNode;
  title: string;
  after?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      {tile}
      <span className="text-[27px] leading-none font-medium tracking-[-0.02em] whitespace-nowrap">
        {title}
      </span>
      {after}
    </div>
  );
}

/** The tile beside a title: a glyph, or initials, on a pale step of the page's colour. */
export function Tile({
  icon,
  initials,
  accent,
}: {
  icon?: IconName;
  initials?: string;
  accent: string;
}) {
  return (
    <span
      className="grid size-[54px] shrink-0 place-items-center rounded-[14px] border border-[#e4e6eb] text-[17px] font-semibold"
      style={{
        background: initials ? `color-mix(in srgb, ${accent} 9%, white)` : undefined,
        color: `color-mix(in srgb, ${accent} 82%, #0b0d12)`,
      }}
    >
      {icon ? <Icon name={icon} size={24} strokeWidth={1.7} /> : initials}
    </span>
  );
}

/** A figure in a box: the number, a share of something on the right, and what it counts. */
export function Figure({
  value,
  label,
  share,
  w = 172,
}: {
  value: string;
  label: string;
  share?: string;
  w?: number;
}) {
  return (
    <div
      className="shrink-0 rounded-[11px] border border-[#e4e6eb] bg-white px-3.5 py-3"
      style={{ width: w }}
    >
      <p className="flex items-baseline justify-between gap-2">
        <span className="text-[19px] leading-none font-medium whitespace-nowrap tabular-nums">
          {value}
        </span>
        {share ? <span className="text-[11px] text-ink-3 tabular-nums">{share}</span> : null}
      </p>
      <p className="mt-2 truncate text-[11.5px] text-ink-3">{label}</p>
    </div>
  );
}

/** A step's mark: a tool's logo, or a glyph, on grey. */
export function StepMark({ icon, tool }: { icon?: IconName; tool?: string }) {
  return (
    <span className="grid size-[26px] shrink-0 place-items-center rounded-[7px] bg-[#f2f3f5] text-ink-2">
      {tool ? <ToolMark tool={tool} size={15} /> : <Icon name={icon ?? 'check'} size={14} />}
    </span>
  );
}

/** A step of the system, as Lightfield sets a sequence's steps. */
export function FlowStep({
  n,
  lead,
  title,
  line,
  w = 560,
}: {
  n: number;
  lead: ReactNode;
  title: string;
  line?: string;
  w?: number;
}) {
  return (
    <div
      className="flex h-[52px] items-center gap-3 rounded-[11px] border border-[#e4e6eb] bg-white px-3.5 whitespace-nowrap"
      style={{ width: w }}
    >
      {lead}
      <span className="text-[13px] font-semibold">Step {n}</span>
      <span className="text-[13px] text-ink-2">{title}</span>
      {line ? <span className="text-[12px] text-ink-3">· {line}</span> : null}
    </div>
  );
}

/** The wait between two steps, on the line that joins them. */
export function Between({ icon = 'clock', children }: { icon?: IconName; children: ReactNode }) {
  return (
    <div className="relative flex h-[44px] items-center gap-2.5 pl-[19px] text-[12.5px] whitespace-nowrap text-ink-3">
      <span className="absolute top-0 bottom-0 left-[25px] w-px bg-[#e4e6eb]" />
      <span className="relative grid size-[14px] place-items-center rounded-full bg-white">
        <Icon name={icon} size={14} />
      </span>
      {children}
    </div>
  );
}

/** How far something has got, as Lightfield's score: `done` of `of` short bars, lit. */
export function Segments({ done, of = 4, colour }: { done: number; of?: number; colour: string }) {
  return (
    <span className="flex gap-[3px]">
      {Array.from({ length: of }, (_, k) => (
        <span
          key={k}
          className="h-[3px] w-[13px] rounded-full"
          style={{ background: k < done ? colour : '#e6e8ec' }}
        />
      ))}
    </span>
  );
}

/** A row in a side list: a lead (a face, a glyph), two lines and a mark — one row open. */
export type SideItem = {
  lead: ReactNode;
  title: string;
  meta: string;
  mark?: ReactNode;
  open?: boolean;
  muted?: boolean;
};

/** A workspace's list down its left: a bar, then groups of rows, each with a heading. */
export function SideList({
  icon,
  title,
  count,
  groups,
  w = 236,
}: {
  icon: IconName;
  title: string;
  count: string;
  groups: { title: string; count: string; items: SideItem[] }[];
  w?: number;
}) {
  return (
    <div className="h-full shrink-0 border-r border-[#eef0f3] bg-[#fafafb]" style={{ width: w }}>
      <div className="flex h-12 items-center gap-2 border-b border-[#eef0f3] px-4 text-[12.5px] font-semibold whitespace-nowrap">
        <Icon name={icon} size={15} />
        {title}
        <span className="ml-auto text-[11px] font-medium text-ink-3">{count}</span>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="flex h-7 items-center justify-between px-2.5 text-[10.5px] font-semibold text-ink-3">
              {group.title}
              <span className="font-medium">{group.count}</span>
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li
                  key={item.title + item.meta}
                  className={`flex h-[44px] items-center gap-2.5 rounded-[10px] px-2.5 ${item.open ? 'bg-white shadow-[0_0_0_1px_#e4e6eb,0_6px_14px_-8px_rgb(11_13_18/0.2)]' : ''} ${item.muted ? 'opacity-50' : ''}`}
                >
                  <span className="-rotate-90 text-ink-3">
                    <Icon name="chevron" size={11} strokeWidth={2} />
                  </span>
                  {item.lead}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] leading-tight font-medium">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-ink-3">
                      {item.meta}
                    </span>
                  </span>
                  {item.mark}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A small round glyph for a side row, on a pale step of the page's colour. */
export function Dot({ icon, accent }: { icon: IconName; accent: string }) {
  return (
    <span
      className="grid size-[26px] shrink-0 place-items-center rounded-full"
      style={{
        background: `color-mix(in srgb, ${accent} 12%, white)`,
        color: `color-mix(in srgb, ${accent} 80%, #0b0d12)`,
      }}
    >
      <Icon name={icon} size={13} strokeWidth={2} />
    </span>
  );
}

/** A next step: ticked in the page's colour, or still to come. */
export function Check({
  done,
  title,
  meta,
  accent,
}: {
  done: boolean;
  title: string;
  meta: string;
  accent: string;
}) {
  return (
    <li className="flex items-center gap-2.5 py-[7px]">
      <span
        className="grid size-[22px] shrink-0 place-items-center rounded-full"
        style={
          done
            ? { background: accent, color: onColour(accent) }
            : { boxShadow: `inset 0 0 0 1.5px color-mix(in srgb, ${accent} 45%, white)` }
        }
      >
        {done ? (
          <Icon name="check" size={11} strokeWidth={2.8} />
        ) : (
          <span className="size-1.5 rounded-full" style={{ background: accent }} />
        )}
      </span>
      <span className="text-[13px] font-medium whitespace-nowrap">{title}</span>
      <span className="text-[12px] whitespace-nowrap text-ink-3">{meta}</span>
    </li>
  );
}

/** A conversation's head: the app's mark, who it is with, and a line under it. */
export function ChatHead({
  tool,
  icon,
  title,
  meta,
}: {
  tool?: string;
  icon?: IconName;
  title: string;
  meta: string;
}) {
  return (
    <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-[#eef0f3] px-4">
      <span className="grid size-7 place-items-center rounded-[9px] bg-[#f4f4f6] text-ink-2">
        {tool ? <ToolMark tool={tool} size={15} /> : <Icon name={icon ?? 'chat'} size={15} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] leading-tight font-semibold">{title}</span>
        <span className="mt-0.5 block text-[10.5px] leading-tight text-ink-3">{meta}</span>
      </span>
      <More />
    </div>
  );
}

/** A message: theirs in grey on the left, the business's in its colour on the right. */
export function Message({
  own = false,
  time,
  accent,
  children,
}: {
  own?: boolean;
  time: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[84%] rounded-[14px] px-3 py-2 text-[12.5px] leading-[1.45] ${own ? 'rounded-br-[5px]' : 'rounded-bl-[5px] bg-[#f2f3f5]'}`}
        style={own ? { background: `color-mix(in srgb, ${accent} 11%, white)` } : undefined}
      >
        {children}
        <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-ink-3">
          {time}
          {own ? (
            <span style={{ color: accent }}>
              <Icon name="check" size={10} strokeWidth={2.6} />
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}

/** A small note in a conversation, set to the right: a spark and what the system did. */
export function SystemNote({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <span className="flex items-center justify-end gap-1.5 text-[10.5px] text-ink-3">
      <span style={{ color: accent }}>
        <Icon name="spark" size={11} strokeWidth={2.2} />
      </span>
      {children}
    </span>
  );
}

/** A choice offered in a message: the chosen one filled with the page's colour. */
export function Choice({
  on = false,
  accent,
  children,
}: {
  on?: boolean;
  accent: string;
  children: ReactNode;
}) {
  return (
    <span
      className="rounded-full border px-2.5 py-[5px] text-[11px] font-medium whitespace-nowrap"
      style={
        on
          ? { background: accent, borderColor: accent, color: onColour(accent) }
          : { borderColor: '#e4e6eb', color: '#4b5060', background: '#fff' }
      }
    >
      {children}
    </span>
  );
}

/** A card inside a conversation: where something came from, and what it said. */
export function Notice({
  tool,
  icon,
  meta,
  children,
}: {
  tool?: string;
  icon?: IconName;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-[#eef0f3] bg-[#fafafb] px-3 py-2.5">
      <span className="flex items-center gap-2 text-[10.5px] text-ink-3">
        {tool ? <ToolMark tool={tool} size={12} /> : <Icon name={icon ?? 'spark'} size={12} />}
        {meta}
      </span>
      <div className="mt-1 text-[12.5px] leading-snug">{children}</div>
    </div>
  );
}

/** The foot of a conversation: the box to write in, and the send button in the page's colour. */
export function Composer({
  accent,
  placeholder = 'Message',
}: {
  accent: string;
  placeholder?: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-[#eef0f3] px-3 py-2.5">
      <span className="flex-1 rounded-[11px] border border-[#e4e6eb] px-3 py-2 text-[12px] text-ink-3">
        {placeholder}
      </span>
      <span
        className="grid size-8 place-items-center rounded-full"
        style={{ background: accent, color: onColour(accent) }}
      >
        <Icon name="arrow" size={14} strokeWidth={2.2} />
      </span>
    </div>
  );
}

/** A table's head row and body rows, in a fixed grid of columns. */
export function Grid({
  cols,
  head,
  rows,
  rowH = 52,
}: {
  cols: string;
  head: ReactNode[];
  rows: ReactNode[][];
  rowH?: number;
}) {
  return (
    <div>
      <div
        className="grid h-10 items-center border-b border-[#eef0f3] px-5 text-[11.5px] text-ink-3"
        style={{ gridTemplateColumns: cols }}
      >
        {head.map((cell, k) => (
          <span
            key={k}
            className={`flex items-center gap-1.5 ${k ? 'h-full border-l border-[#eef0f3] pl-3' : ''}`}
          >
            {cell}
          </span>
        ))}
      </div>
      {rows.map((row, r) => (
        <div
          key={r}
          className="grid items-center border-b border-[#f3f4f6] px-5"
          style={{ gridTemplateColumns: cols, height: rowH }}
        >
          {row.map((cell, k) => (
            <span
              key={k}
              className={`flex min-w-0 items-center gap-2.5 ${k ? 'h-full border-l border-[#f3f4f6] pl-3' : ''}`}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** A thin bar filled to a share, in the page's colour. */
export function Meter({ value, colour }: { value: number; colour: string }) {
  return (
    <span className="block h-[5px] w-[64px] overflow-hidden rounded-full bg-[#eef0f3]">
      <span
        className="block h-full rounded-full"
        style={{ width: `${value}%`, background: colour }}
      />
    </span>
  );
}

/** A view's chip in a bar — "All", with a table glyph — and a plus to add one. */
export function ViewChip({ label = 'All' }: { label?: string }) {
  return (
    <>
      <span className="flex items-center gap-1.5 rounded-[7px] border border-[#e4e6eb] bg-[#fafafb] px-2 py-[3px] text-[11.5px] font-medium">
        <Icon name="table" size={12} />
        {label}
      </span>
      <span className="text-ink-3">
        <Icon name="plus" size={14} />
      </span>
    </>
  );
}

/** A list's filter row, under its bar. */
export function FilterRow({ label = 'Filter' }: { label?: string }) {
  return (
    <div className="flex h-11 items-center gap-2 border-b border-[#eef0f3] px-5 text-[12px] font-medium">
      <Icon name="filter" size={13} />
      {label}
    </div>
  );
}

/** A column's heading with its glyph. */
export function Col({ icon, children }: { icon?: IconName; children: ReactNode }) {
  return (
    <>
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </>
  );
}

/** A dashboard's widget, as Lightfield stacks them: a grip, a title, and what it shows. */
export function Widget({
  x,
  y,
  w,
  h,
  i = 0,
  title,
  accent,
  chosen = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  i?: number;
  title: string;
  accent: string;
  chosen?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="frag-in absolute flex flex-col rounded-[14px] border bg-white px-4 pt-3.5 pb-4 text-ink"
      style={
        {
          left: x,
          top: y,
          width: w,
          height: h,
          '--i': i,
          borderColor: chosen ? `color-mix(in srgb, ${accent} 55%, white)` : '#e4e6eb',
          boxShadow: chosen
            ? `0 0 0 3px color-mix(in srgb, ${accent} 16%, transparent), 0 18px 40px -24px rgb(11 13 18 / 0.25)`
            : '0 4px 30px rgb(11 13 18 / 0.05)',
        } as CSSProperties
      }
    >
      <p className="flex items-center gap-2.5 text-[13px] font-medium">
        <span className="grid grid-cols-2 gap-[2px]">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="size-[2.5px] rounded-full bg-[#b9bdc7]" />
          ))}
        </span>
        {title}
      </p>
      {children}
    </div>
  );
}
