import type { CSSProperties, ReactNode } from 'react';

import { logoPath } from '../ui/brand-logos';
import type { MobileView, WaMessage } from './types';

/**
 * WhatsApp, drawn the way WhatsApp draws it — the beige wallpaper with its faint doodles, white
 * and green bubbles with their tails, the time and blue ticks tucked into the corner, reply
 * buttons under a business's message, the day chip and the "secure service from Meta" notice —
 * at two scales: the customer's phone, and the business's inbox at 1280 wide. The last message
 * arrives as the screen comes into view.
 */

const WA = {
  wallpaper: '#efeae2',
  out: '#d9fdd3',
  meta: '#667781',
  tick: '#53bdeb',
  link: '#027eb5',
  notice: '#fdf4c5',
  ios: '#007aff',
};

const DOODLES = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#7a6a52" stroke-opacity=".1" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="20" r="7"/><path d="m50 12 4 8 8 1-6 6 2 8-8-4-8 4 2-8-6-6 8-1Z"/><path d="M92 16c6 0 10 4 10 10s-10 14-10 14-10-8-10-14 4-10 10-10Z"/><path d="M14 64h20v14H14ZM18 64v-4h12v4"/><path d="M58 58c8-6 18 2 12 10-4 6-14 4-12-2"/><circle cx="98" cy="70" r="3"/><path d="m86 84 12-12"/><path d="M20 104c4-6 12-6 16 0"/><path d="m62 96 10 10M72 96l-10 10"/><path d="M96 100h14M103 93v14"/></svg>',
)}")`;

/** The chat wallpaper, as a style: tiled finer on the phone than on the desk. */
export const waWallpaper = (desk: boolean): CSSProperties => ({
  backgroundColor: WA.wallpaper,
  backgroundImage: DOODLES,
  backgroundSize: desk ? '220px' : '96px',
});

function Ticks({ size }: { size: number }) {
  return (
    <svg
      width={size * 1.45}
      height={size}
      viewBox="0 0 16 11"
      fill="none"
      stroke={WA.tick}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m1 6 3 3 6-7.5M7 8.6l.8.9 6-7.5" />
    </svg>
  );
}

function Bolt({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4 14h6.5L10 22l9-12h-6.5Z" />
    </svg>
  );
}

/** A little map for a shared location: streets, a park and the pin. */
function MapTile({ desk }: { desk: boolean }) {
  return (
    <svg
      viewBox="0 0 200 90"
      className={`block w-full ${desk ? 'h-[110px]' : 'h-[58px]'}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="200" height="90" fill="#eae6df" />
      <path d="M130 0h70v42h-58Z" fill="#cfe8c9" />
      <path d="M0 62c40-6 80 4 120-2s60-10 80-8" stroke="#fff" strokeWidth="7" fill="none" />
      <path d="M72 0c-4 30 8 60 2 90M150 40l-24 50" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M0 24h60M110 16l40 20" stroke="#fff" strokeWidth="3" fill="none" />
      <path
        d="M100 22c-7 0-12 5-12 11 0 9 12 21 12 21s12-12 12-21c0-6-5-11-12-11Z"
        fill="#e53935"
      />
      <circle cx="100" cy="33" r="4" fill="#fff" />
    </svg>
  );
}

// --- the messages ------------------------------------------------------------------------------

const TEXT = {
  phone: {
    body: 'text-[9.5px] leading-[1.38]',
    time: 'text-[7px]',
    pad: 'px-[7px] pt-[4px] pb-[5px]',
    gap: 'gap-[3px]',
    max: 'max-w-[86%]',
    tick: 7,
    spacer: 'w-[36px]',
    /** Room for the time and the ticks. */
    spacerTicks: 'w-[48px]',
    button: 'py-[5px] text-[9.5px]',
    chip: 'px-2 py-[3px] text-[8px]',
  },
  desk: {
    body: 'text-[14px] leading-[1.42]',
    time: 'text-[11px]',
    pad: 'px-[9px] pt-[6px] pb-[8px]',
    gap: 'gap-[5px]',
    max: 'max-w-[74%]',
    tick: 11,
    spacer: 'w-[60px]',
    spacerTicks: 'w-[78px]',
    button: 'py-[9px] text-[14px]',
    chip: 'px-3 py-[5px] text-[12.5px]',
  },
};

/**
 * A conversation's messages. `mine` is whose phone it is: their messages sit on the right, in
 * green, with the ticks.
 */
export function WaThread({
  messages,
  mine,
  desk = false,
}: {
  messages: WaMessage[];
  mine: 'customer' | 'business';
  desk?: boolean;
}) {
  const t = desk ? TEXT.desk : TEXT.phone;
  const last = messages.length - 1;
  return (
    <div className={`flex flex-col ${t.gap}`}>
      {messages.map((m, i) => {
        const arrive = i === last && m.from !== 'day' ? 'wa-arrive' : '';
        if (m.from === 'day' || m.from === 'system') {
          return (
            <p
              key={i}
              className={`mx-auto my-1 max-w-[88%] rounded-[7px] text-center shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] ${t.chip} ${m.from === 'day' ? 'bg-white font-medium' : ''}`}
              style={{ color: WA.meta, background: m.from === 'system' ? WA.notice : undefined }}
            >
              {m.text}
            </p>
          );
        }
        if (m.from === 'note') {
          return (
            <div
              key={i}
              className={`mx-auto my-1 w-[80%] rounded-[8px] border border-[#f0dc8a] bg-[#fff8d6] ${t.pad} ${t.body} ${arrive}`}
            >
              <span className="block font-semibold text-[#8a6d00]">
                {m.by ? `${m.by} · note` : 'Note'}
              </span>
              <span className="text-[#4a4020]">{m.text}</span>
            </div>
          );
        }
        const right = m.from === mine;
        const first = i === 0 || messages[i - 1]!.from !== m.from;
        const fill = right ? WA.out : '#ffffff';
        return (
          <div
            key={i}
            className={`relative flex flex-col ${t.max} ${right ? 'self-end' : 'self-start'} ${first && i > 0 ? (desk ? 'mt-2' : 'mt-1') : ''} ${arrive}`}
          >
            <div
              className={`relative rounded-[7px] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] ${t.pad} ${first ? (right ? 'rounded-tr-none' : 'rounded-tl-none') : ''} ${m.buttons?.length ? 'rounded-b-[4px]' : ''}`}
              style={{ background: fill }}
            >
              {first ? (
                <svg
                  viewBox="0 0 8 13"
                  className={`absolute top-0 h-[13px] w-[8px] ${right ? '-right-[8px]' : '-left-[8px] -scale-x-100'} ${desk ? '' : 'h-[9px] w-[5.5px] ' + (right ? '-right-[5.5px]' : '-left-[5.5px]')}`}
                  aria-hidden="true"
                >
                  <path
                    d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0Z"
                    fill={fill}
                  />
                </svg>
              ) : null}
              {desk && m.auto ? (
                <span
                  className="mb-0.5 flex items-center gap-1 text-[12px] font-medium"
                  style={{ color: 'var(--accent)' }}
                >
                  <Bolt size={11} />
                  {m.auto}
                </span>
              ) : null}
              {desk && m.by ? (
                <span className="mb-0.5 block text-[12px] font-semibold text-[#1a7ab8]">
                  {m.by}
                </span>
              ) : null}
              {m.location ? (
                <span className="-mx-[4px] -mt-[2px] mb-1 block overflow-hidden rounded-[5px]">
                  <MapTile desk={desk} />
                  <span className="block bg-black/[0.03] px-1.5 py-1">
                    <span className="block font-semibold text-[#111b21]">{m.location.name}</span>
                    <span className={`block ${desk ? 'text-[12px]' : 'text-[7.5px]'}`}>
                      <span style={{ color: WA.meta }}>{m.location.line}</span>
                    </span>
                  </span>
                </span>
              ) : null}
              {m.header ? (
                <span className={`block font-semibold text-[#111b21] ${t.body}`}>{m.header}</span>
              ) : null}
              {/* The time sits in the last line's corner: the room kept for it goes on that line. */}
              <p className={`whitespace-pre-line text-[#111b21] ${t.body}`}>
                {m.text}
                {m.footer ? null : (
                  <span className={`inline-block ${right ? t.spacerTicks : t.spacer}`} />
                )}
              </p>
              {m.footer ? (
                <span className={`block ${desk ? 'mt-0.5 text-[12.5px]' : 'text-[8px]'}`}>
                  <span style={{ color: WA.meta }}>{m.footer}</span>
                  <span className={`inline-block ${right ? t.spacerTicks : t.spacer}`} />
                </span>
              ) : null}
              <span
                className={`absolute right-[7px] flex items-center gap-[3px] ${desk ? 'bottom-[5px]' : 'bottom-[3px]'} ${t.time}`}
                style={{ color: WA.meta }}
              >
                {m.time}
                {right ? <Ticks size={t.tick} /> : null}
              </span>
            </div>
            {m.buttons?.map((label, j) => (
              <span
                key={label}
                className={`mt-[2px] flex items-center justify-center gap-1 bg-white font-medium shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] ${t.button} ${j === m.buttons!.length - 1 ? 'rounded-b-[7px]' : ''} rounded-t-[4px]`}
                style={{ color: WA.link }}
              >
                <svg
                  width={desk ? 14 : 8}
                  height={desk ? 14 : 8}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// --- the customer's phone ------------------------------------------------------------------------

function IosGlyph({ d, size = 13 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={WA.ios}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/** WhatsApp on the customer's iPhone, open on the business's chat. */
export function WhatsAppChat({ view }: { view: Extract<MobileView, { type: 'whatsapp' }> }) {
  const name = view.name ?? 'Your Business';
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-black/[0.07] bg-[#f6f6f6] px-2 pb-1.5">
        <span className="flex items-center text-[10.5px]" style={{ color: WA.ios }}>
          <IosGlyph d="M15 5 8 12l7 7" size={14} />
          <span className="-ml-0.5">12</span>
        </span>
        <span
          className="grid size-[24px] shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
          style={{ background: 'var(--accent)' }}
        >
          {name.charAt(0)}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[10.5px] font-semibold text-[#111b21]">{name}</span>
          <span className="block truncate text-[7.5px]" style={{ color: WA.meta }}>
            {view.line ?? 'Business account'}
          </span>
        </span>
        <IosGlyph d="M3 7h12v10H3ZM15 11l6-3.5v9L15 13" size={15} />
        <IosGlyph
          d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
          size={13}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-2.5 pt-2" style={waWallpaper(false)}>
        <WaThread messages={view.messages} mine="customer" />
      </div>
      <div className="flex shrink-0 items-center gap-1.5 bg-[#f6f6f6] px-2 pt-1.5 pb-1">
        <IosGlyph d="M12 5v14M5 12h14" size={14} />
        <span className="flex h-[22px] min-w-0 flex-1 items-center rounded-full border border-black/[0.08] bg-white px-2 text-[9px] text-[#111b21]">
          <span className="truncate">{view.draft ?? ''}</span>
          <svg
            className="ml-auto shrink-0"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8e8e93"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M4 4h16v10l-6 6H4Z M14 20v-6h6" />
          </svg>
        </span>
        <IosGlyph d="M4 8h3l2-3h6l2 3h3v11H4ZM12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" size={14} />
        <IosGlyph
          d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3ZM5 11a7 7 0 0 0 14 0M12 18v3"
          size={14}
        />
      </div>
    </div>
  );
}

/** WhatsApp's own app icon, as a lock-screen notification wears it. */
export function WhatsAppIcon({ className = '' }: { className?: string }): ReactNode {
  return (
    <span
      className={`grid place-items-center rounded-[8px] bg-gradient-to-b from-[#5bf674] to-[#1cbf3b] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-[68%]" fill="#fff" aria-hidden="true">
        <path d={logoPath('whatsapp')} />
      </svg>
    </span>
  );
}
