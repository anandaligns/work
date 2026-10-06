'use client';

import type { CSSProperties, ReactNode } from 'react';

import { Icon, type IconName } from '../ui/icon';
import { Face, Live, Mono } from './kit';

/**
 * The fan's screens (`visuals/project-fan.tsx`): each card one screen from a page's example build,
 * drawn on the card's 240 × 320 canvas with the showcase kit's pieces at their real sizes. The
 * screen fills the card, so these are its frames — a product surface with its label, a page in a
 * browser, a phone app, a WhatsApp chat.
 */

/** A product surface: its mono label and a badge under a hairline, the screen, a figure at the foot. */
export function Sheet({
  label,
  badge,
  live,
  foot,
  className = '',
  children,
}: {
  label: ReactNode;
  badge?: ReactNode;
  live?: boolean;
  /** The key figure under a rule: what it is, and its value. */
  foot?: [ReactNode, ReactNode];
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-white text-left text-ink">
      <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-line px-3.5">
        <Mono>{label}</Mono>
        {badge ?? (live ? <Live /> : null)}
      </div>
      <div className={`flex min-h-0 flex-1 flex-col px-3.5 pt-3 ${className}`}>{children}</div>
      {foot ? (
        <div className="flex shrink-0 justify-between gap-3 border-t border-line px-3.5 py-2.5 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-ink-2 uppercase">
          <span>{foot[0]}</span>
          <span className="text-ink">{foot[1]}</span>
        </div>
      ) : null}
    </div>
  );
}

/** A page in a browser: the three lights and the address, then the page. */
export function Web({
  address,
  className = '',
  children,
}: {
  address: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-white text-left text-ink">
      <div className="flex h-10 shrink-0 items-center gap-2.5 border-b border-line px-3">
        <span className="flex gap-1">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex h-6 min-w-0 flex-1 items-center gap-1 rounded-md bg-fill px-2 text-[10.5px] whitespace-nowrap text-ink-2">
          <Icon name="lock" size={9} />
          <span className="truncate">{address}</span>
        </span>
      </div>
      <div className={`flex min-h-0 flex-1 flex-col ${className}`}>{children}</div>
    </div>
  );
}

/** A phone app's screen: the time and signal, the app's bar with its title, then the app. */
export function App({
  title,
  sub,
  icon,
  right,
  dark = false,
  className = '',
  children,
}: {
  title: ReactNode;
  sub?: ReactNode;
  /** The app's mark, on a tile of the business's colour, before the title. */
  icon?: IconName;
  right?: ReactNode;
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col text-left ${dark ? 'bg-[#11131a] text-white' : 'bg-white text-ink'}`}
    >
      <div className="flex h-7 shrink-0 items-center justify-between px-4 text-[10px] font-semibold">
        <span>9:41</span>
        <span className="h-[14px] w-[46px] rounded-full bg-current opacity-90" />
        <span className="flex items-end gap-[2px]">
          <span className="h-[4px] w-[3px] rounded-[1px] bg-current" />
          <span className="h-[6px] w-[3px] rounded-[1px] bg-current" />
          <span className="h-[8px] w-[3px] rounded-[1px] bg-current" />
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2.5 px-3.5 pt-1.5 pb-2.5">
        {icon ? (
          <span className="sc-chip--on grid size-8 shrink-0 place-items-center rounded-[9px]">
            <Icon name={icon} size={15} strokeWidth={2} />
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold">{title}</span>
          {sub ? (
            <span
              className={`block truncate text-[10.5px] ${dark ? 'text-white/60' : 'text-ink-2'}`}
            >
              {sub}
            </span>
          ) : null}
        </span>
        {right}
      </div>
      <div className={`flex min-h-0 flex-1 flex-col px-3.5 ${className}`}>{children}</div>
    </div>
  );
}

/** A WhatsApp chat: who it is with on top, the messages on the chat's paper beneath. */
export function Chat({
  name,
  meta = 'online',
  business = false,
  children,
}: {
  name: string;
  meta?: ReactNode;
  /** A business account's tick beside the name. */
  business?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-[#efeae2] text-left text-ink">
      <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-line bg-white px-3">
        <Icon name="chevron" size={12} className="rotate-180 text-ink-2" />
        <Face name={name} size={28} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1 truncate text-[13px] font-medium">
            {name}
            {business ? (
              <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-[#25d366] text-white">
                <Icon name="check" size={8} strokeWidth={3} />
              </span>
            ) : null}
          </span>
          <span className="block truncate text-[10.5px] text-ink-2">{meta}</span>
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 px-2.5 py-3">{children}</div>
    </div>
  );
}

/** A small label set over a value: the day on a calendar, a size on a shelf. */
export function Slot({
  on = false,
  off = false,
  children,
}: {
  on?: boolean;
  off?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`grid h-8 place-items-center rounded-lg text-[11.5px] font-semibold ${on ? 'sc-chip--on' : off ? 'bg-fill text-ink-3 line-through' : 'border border-line text-ink-2'}`}
    >
      {children}
    </span>
  );
}

/** A soft block in the page's colour standing in for a photograph. */
export function Picture({
  h,
  icon,
  className = '',
  style,
}: {
  h: number;
  icon?: IconName;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`sc-tile--accent grid place-items-center rounded-xl ${className}`}
      style={{ height: h, ...style }}
    >
      {icon ? <Icon name={icon} size={22} strokeWidth={1.6} /> : null}
    </span>
  );
}

/** A heading on a screen: what it is, large, with a small line under it. */
export function Title({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div>
      <p className="text-[15px] leading-tight font-semibold text-ink">{children}</p>
      {sub ? <p className="mt-1 text-[11px] leading-snug text-ink-2">{sub}</p> : null}
    </div>
  );
}
