import type { CSSProperties, ReactNode } from 'react';

import { BRANDS, DesktopSite, MobileSite, Scaled } from '../visuals/concept-sites';
import { brandInfo, type Size } from './parts';
import type { BrandId } from './types';
import { WhatsAppIcon } from './whatsapp-views';

/**
 * Real-looking devices, drawn in CSS: an iPhone in a titanium frame, with its Dynamic Island,
 * status bar, side buttons and home indicator, and a MacBook with its camera notch and aluminium
 * base. The iPhone holds an app — its header and an iOS tab bar — or Safari on a website; the
 * MacBook holds Chrome. Nothing is an image, so they stay sharp at every size and cost nothing to
 * load. Like every product screen, they are decorative and hidden from assistive tech.
 */

// --- small glyphs, drawn as iOS and Chrome draw them ------------------------------------------

function StatusIcons({ dark = true }: { dark?: boolean }) {
  const c = dark ? '#0b0d12' : '#ffffff';
  return (
    <span className="flex items-center gap-1">
      <svg width="15" height="10" viewBox="0 0 15 10" fill={c}>
        <rect x="0" y="7" width="2.6" height="3" rx="0.6" />
        <rect x="4" y="5" width="2.6" height="5" rx="0.6" />
        <rect x="8" y="2.5" width="2.6" height="7.5" rx="0.6" />
        <rect x="12" y="0" width="2.6" height="10" rx="0.6" />
      </svg>
      <svg width="14" height="10" viewBox="0 0 14 10" fill={c}>
        <path d="M7 2.2c1.9 0 3.6.7 4.9 1.9l1-1C11.3 1.5 9.2.7 7 .7S2.7 1.5 1.1 3.1l1 1C3.4 2.9 5.1 2.2 7 2.2Z" />
        <path d="M7 5.1c1.1 0 2.1.4 2.9 1.1l1-1C9.8 4.2 8.5 3.6 7 3.6s-2.8.6-3.9 1.6l1 1C4.9 5.5 5.9 5.1 7 5.1Z" />
        <circle cx="7" cy="8.4" r="1.4" />
      </svg>
      <svg width="24" height="11" viewBox="0 0 24 11">
        <rect
          x="0.5"
          y="0.5"
          width="20"
          height="10"
          rx="3"
          fill="none"
          stroke={c}
          strokeOpacity="0.4"
        />
        <rect x="2" y="2" width="15" height="7" rx="1.8" fill={c} />
        <path d="M22 3.8v3.4c.7-.3 1.2-1 1.2-1.7s-.5-1.4-1.2-1.7Z" fill={c} fillOpacity="0.45" />
      </svg>
    </span>
  );
}

const TAB_GLYPHS = [
  // home
  'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z',
  // orders
  'M5 4h14l-1.5 16h-11ZM9 8a3 3 0 0 0 6 0',
  // book
  'M4 6h16v14H4ZM4 10h16M8 3v5M16 3v5',
  // rewards
  'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z',
  // account
  'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
];

// --- the iPhone -----------------------------------------------------------------------------

/**
 * The phone as the brand identity draws it: a black body, a thin even bezel, corners about a sixth
 * of its width, and a deep soft shadow. Sizes in pixels for each size of screen; the site in
 * Safari is drawn at 390 wide and scaled by `--k` to the screen's width.
 */
const PHONE: Record<
  Size,
  { body: string; screen: string; site: string; bar: string; island: string }
> = {
  lg: {
    body: 'w-[270px] rounded-[43px] p-[8px] shadow-[0_54px_92px_-24px_rgb(22_28_74/0.34),0_6px_15px_rgb(22_28_74/0.2)]',
    screen: 'h-[554px] rounded-[35px]',
    site: 'h-[438px] w-[254px] [--k:0.6513]',
    bar: 'px-2',
    island: 'w-[84px]',
  },
  md: {
    body: 'w-[244px] rounded-[39px] p-[7px] shadow-[0_48px_84px_-24px_rgb(22_28_74/0.34),0_5px_14px_rgb(22_28_74/0.2)]',
    screen: 'h-[501px] rounded-[32px]',
    site: 'h-[396px] w-[230px] [--k:0.5897]',
    bar: 'px-1.5',
    island: 'w-[76px]',
  },
  sm: {
    body: 'w-[220px] rounded-[35px] p-[7px] shadow-[0_42px_76px_-24px_rgb(22_28_74/0.34),0_5px_12px_rgb(22_28_74/0.2)]',
    screen: 'h-[450px] rounded-[29px]',
    site: 'h-[355px] w-[206px] [--k:0.5282]',
    bar: 'px-1',
    island: 'w-[68px]',
  },
};

export function IPhone({
  size,
  brand,
  app,
  tabs,
  tab = 0,
  url,
  site,
  lock,
  bare = false,
  chrome,
  night = false,
  children,
}: {
  size: Size;
  brand?: BrandId;
  app?: string;
  tabs?: string[];
  tab?: number;
  /** Safari, on this address. */
  url?: string;
  /** A concept site to show in Safari, instead of `children`. */
  site?: BrandId;
  lock?: {
    date: string;
    notes: { title: string; text: string; time: string; via?: 'whatsapp' }[];
  };
  /** An app screen that draws its own header: nothing added above it. */
  bare?: boolean;
  /** The colour of the bars above and below the app, when it isn't white (WhatsApp's grey). */
  chrome?: string;
  /** A dark app (the camera): the status bar in white. */
  night?: boolean;
  children?: ReactNode;
}) {
  const dims = PHONE[size];
  const name = app ?? brandInfo(brand ?? 'yours').name;
  return (
    <div className={`relative mx-auto bg-[#05060a] ring-1 ring-[#2a2b31] ring-inset ${dims.body}`}>
      {/* the side buttons: action and volume on the left, the side button on the right */}
      <span className="absolute top-[16%] -left-[2px] h-[4.5%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#2b2c32] to-[#101114]" />
      <span className="absolute top-[24%] -left-[2px] h-[8%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#2b2c32] to-[#101114]" />
      <span className="absolute top-[34%] -left-[2px] h-[8%] w-[3px] rounded-l-[2px] bg-gradient-to-b from-[#2b2c32] to-[#101114]" />
      <span className="absolute top-[27%] -right-[2px] h-[12%] w-[3px] rounded-r-[2px] bg-gradient-to-b from-[#2b2c32] to-[#101114]" />
      <div className={`relative flex flex-col overflow-hidden bg-white ${dims.screen}`}>
        {/* the status bar, either side of the Dynamic Island */}
        <div
          className={`z-10 flex h-[38px] shrink-0 items-center justify-between pt-1 ${dims.bar} ${lock ? 'absolute inset-x-0 top-0' : 'relative'}`}
          style={chrome ? { background: chrome } : undefined}
        >
          <span
            className={`w-[30%] text-center text-[11.5px] font-semibold tracking-[-0.01em] ${lock ? 'text-transparent' : night ? 'text-white' : 'text-ink'}`}
          >
            9:41
          </span>
          <span
            className={`absolute top-[8px] left-1/2 h-[23px] -translate-x-1/2 rounded-full bg-black ${dims.island}`}
          >
            <span className="absolute top-1/2 right-[9px] size-[7px] -translate-y-1/2 rounded-full bg-[#0f1624] ring-1 ring-[#1d2536]" />
          </span>
          <span className="flex w-[30%] justify-center">
            <StatusIcons dark={!lock && !night} />
          </span>
        </div>

        {lock ? (
          <LockScreen name={name} date={lock.date} notes={lock.notes} />
        ) : url ? (
          <>
            {/* Safari: the page, then the address bar and toolbar at the foot */}
            <div className="min-h-0 flex-1 overflow-hidden">
              {site ? (
                <Scaled className={dims.site}>
                  <MobileSite b={BRANDS[site]!} />
                </Scaled>
              ) : (
                children
              )}
            </div>
            <SafariBar url={url} />
          </>
        ) : bare ? (
          <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        ) : (
          <>
            {/* an app: its header, its screen */}
            <div className="flex shrink-0 items-center gap-2 bg-white px-4 pb-2">
              <span
                className="grid size-7 shrink-0 place-items-center rounded-[9px] text-[11px] font-bold text-white"
                style={{ background: 'var(--accent)' }}
              >
                {name.charAt(0)}
              </span>
              <span className="truncate text-[14px] font-semibold tracking-[-0.01em] text-ink">
                {name}
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden bg-[#f4f5f7] p-2.5 [&_.rounded-xl]:shadow-none">
              {children}
            </div>
          </>
        )}

        {!lock && !url && tabs?.length ? <TabBar tabs={tabs} tab={tab} /> : null}
        {!lock && !url && !tabs?.length ? (
          <div className="h-5 shrink-0" style={chrome ? { background: chrome } : undefined} />
        ) : null}

        {/* the home indicator */}
        <span
          className={`absolute bottom-[6px] left-1/2 h-[4px] w-[34%] -translate-x-1/2 rounded-full ${lock || night ? 'bg-white/85' : 'bg-black/85'}`}
        />
      </div>
    </div>
  );
}

function TabBar({ tabs, tab }: { tabs: string[]; tab: number }) {
  return (
    <div className="flex shrink-0 justify-around border-t border-black/[0.06] bg-white px-2 pt-1.5 pb-5">
      {tabs.slice(0, 5).map((label, i) => (
        <span
          key={label}
          className="flex flex-col items-center gap-0.5 text-[8.5px] font-medium"
          style={{ color: i === tab ? 'var(--accent)' : '#8b8f99' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={i === tab ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'none'}
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d={TAB_GLYPHS[i % TAB_GLYPHS.length]} />
          </svg>
          {label}
        </span>
      ))}
    </div>
  );
}

function SafariBar({ url }: { url: string }) {
  return (
    <div className="shrink-0 border-t border-black/[0.06] bg-[#f7f7f8] px-3 pt-2 pb-5">
      <div className="flex h-[28px] items-center gap-2 rounded-[10px] bg-white px-3 shadow-[0_1px_2px_rgb(0_0_0/0.08)]">
        <span className="text-[10.5px] font-semibold text-ink">aA</span>
        <span className="flex flex-1 items-center justify-center gap-1 truncate text-[11px] text-ink">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="#0b0d12" aria-hidden="true">
            <rect x="1" y="4.5" width="6" height="5" rx="1" />
            <path
              d="M2.2 4.5V3a1.8 1.8 0 0 1 3.6 0v1.5"
              stroke="#0b0d12"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          {url}
        </span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          stroke="#0b0d12"
          strokeWidth="1.3"
        >
          <path d="M10 6a4 4 0 1 1-1.2-2.8M10 1.5v2.7H7.3" />
        </svg>
      </div>
      <div className="mt-2 flex justify-between px-2">
        {[
          'M9 3 4 8l5 5',
          'M5 3l5 5-5 5',
          'M8 11V2M5 5l3-3 3 3M3 8v6h10V8',
          'M3 3h7l3 3v8H3Z',
          'M3 3h7v7H3Z M6 6h7v7H6',
        ].map((d, i) => (
          <svg
            key={i}
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke={i === 1 ? '#b8bcc6' : '#1a73e8'}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={d} />
          </svg>
        ))}
      </div>
    </div>
  );
}

/** The lock screen: the wallpaper, the time and date, and the notifications stacked below. */
function LockScreen({
  name,
  date,
  notes,
}: {
  name: string;
  date: string;
  notes: { title: string; text: string; time: string; via?: 'whatsapp' }[];
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center bg-[radial-gradient(120%_80%_at_20%_0%,color-mix(in_srgb,var(--accent)_75%,white)_0%,var(--accent)_45%,#0b0d12_100%)] px-3 pt-[52px] text-white">
      <p className="text-[12px] font-medium opacity-90">{date}</p>
      <p className="mt-0.5 text-[64px] leading-none font-semibold tracking-[-0.03em]">9:41</p>
      <ul className="mt-auto mb-8 flex w-full flex-col gap-2">
        {notes.map((note, i) => (
          <li
            key={note.title + note.time}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className="flex items-start gap-2 rounded-[16px] bg-white/70 px-2.5 py-2 text-ink shadow-[0_4px_16px_rgb(0_0_0/0.12)] backdrop-blur-md"
          >
            {note.via === 'whatsapp' ? (
              <WhatsAppIcon className="mt-0.5 size-7 shrink-0" />
            ) : (
              <span
                className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[8px] text-[11px] font-bold text-white"
                style={{ background: 'var(--accent)' }}
              >
                {name.charAt(0)}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[11px] font-semibold">{note.title}</span>
                <span className="shrink-0 text-[9.5px] text-ink-2">{note.time}</span>
              </span>
              <span className="block text-[10.5px] leading-[1.35] text-ink-2">{note.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- the MacBook ----------------------------------------------------------------------------

/**
 * The screen's width at each viewport — the page inside is drawn at 1280 × 800 and scaled to it
 * by `--k`, and an app fills it.
 */
const LAPTOP: Record<Size, { screen: string; site: string; body: string }> = {
  lg: {
    screen: 'w-[240px] sm:w-[360px] md:w-[480px] lg:w-[600px]',
    site: 'h-[150px] w-[240px] [--k:0.1875] sm:h-[225px] sm:w-[360px] sm:[--k:0.28125] md:h-[300px] md:w-[480px] md:[--k:0.375] lg:h-[375px] lg:w-[600px] lg:[--k:0.46875]',
    body: 'h-[150px] sm:h-[220px] md:h-[280px] lg:h-[330px]',
  },
  md: {
    screen: 'w-[240px] sm:w-[380px] md:w-[300px] lg:w-[320px] xl:w-[380px] 2xl:w-[440px]',
    site: 'h-[150px] w-[240px] [--k:0.1875] sm:h-[238px] sm:w-[380px] sm:[--k:0.296875] md:h-[188px] md:w-[300px] md:[--k:0.234375] lg:h-[200px] lg:w-[320px] lg:[--k:0.25] xl:h-[238px] xl:w-[380px] xl:[--k:0.296875] 2xl:h-[275px] 2xl:w-[440px] 2xl:[--k:0.34375]',
    body: 'h-[150px] sm:h-[230px] md:h-[180px] lg:h-[190px] xl:h-[230px] 2xl:h-[260px]',
  },
  sm: {
    screen: 'w-[240px]',
    site: 'h-[150px] w-[240px] [--k:0.1875]',
    body: 'h-[150px]',
  },
};

export function MacBook({
  size,
  brand,
  url,
  tab,
  site,
  fill = false,
  children,
}: {
  size: Size;
  brand?: BrandId;
  url: string;
  tab: string;
  site?: BrandId;
  /** The children are drawn to the screen's own size (a scaled admin), so no height is set. */
  fill?: boolean;
  children?: ReactNode;
}) {
  const dims = LAPTOP[size];
  const favicon = brandInfo(site ?? brand ?? 'yours');
  return (
    <div className="relative mx-auto w-fit">
      {/* the lid: a thin black bezel around the screen, rounded as a MacBook Pro's is */}
      <div className="relative rounded-t-[16px] rounded-b-[5px] bg-[#0a0a0c] p-[7px] pb-[9px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)] ring-1 ring-[#303137]">
        <div
          className={`relative overflow-hidden rounded-t-[9px] rounded-b-[2px] bg-white ${dims.screen}`}
        >
          {/* the macOS menu bar, with the camera notch in the middle of it */}
          <div className="relative flex h-[15px] items-center justify-between bg-[#e9eaee] px-2 text-[7px] text-[#1d1d1f]">
            <span className="flex items-center gap-2">
              <svg width="7" height="8" viewBox="0 0 24 24" fill="#1d1d1f" aria-hidden="true">
                <path d="M16.37 1.43c0 1.14-.42 2.2-1.24 3.1-.99 1.08-2.18 1.71-3.47 1.6a3.5 3.5 0 0 1-.03-.44c0-1.09.47-2.26 1.31-3.2.42-.48.95-.88 1.6-1.2.64-.31 1.25-.48 1.82-.51.01.22.01.43.01.65Zm4.58 16.18c-.4.93-.88 1.78-1.43 2.57-.75 1.07-1.37 1.8-1.84 2.21-.73.67-1.51 1.01-2.35 1.03-.6 0-1.33-.17-2.18-.52-.85-.35-1.63-.52-2.35-.52-.75 0-1.55.17-2.41.52-.86.35-1.56.53-2.08.55-.8.03-1.6-.32-2.4-1.07-.51-.44-1.15-1.2-1.91-2.28-.82-1.15-1.49-2.48-2.02-4A14.7 14.7 0 0 1 0 12.6c0-1.78.39-3.32 1.16-4.6a6.8 6.8 0 0 1 2.43-2.47 6.53 6.53 0 0 1 3.29-.93c.64 0 1.49.2 2.54.59 1.05.4 1.72.6 2.02.6.22 0 .97-.24 2.25-.7 1.21-.44 2.23-.62 3.07-.55 2.27.18 3.97 1.08 5.1 2.7-2.03 1.23-3.03 2.95-3.01 5.15.02 1.72.64 3.15 1.87 4.28.56.53 1.18.94 1.87 1.23-.15.44-.31.86-.48 1.26Z" />
              </svg>
              <span className="font-semibold">Chrome</span>
              <span className="hidden sm:inline">File</span>
              <span className="hidden sm:inline">Edit</span>
              <span className="hidden sm:inline">View</span>
              <span className="hidden md:inline">History</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="hidden sm:inline">100%</span>
              <span>Tue 7:10 PM</span>
            </span>
            <span className="absolute top-0 left-1/2 flex h-[13px] w-[15%] -translate-x-1/2 items-center justify-center rounded-b-[6px] bg-[#0a0a0c]">
              <span className="size-[4px] rounded-full bg-[#141c2b] ring-1 ring-[#26303f]" />
            </span>
          </div>
          {/* Chrome: the tab strip, then the toolbar with its address bar */}
          <div className="flex h-[22px] items-end gap-2 bg-[#dfe3e8] px-2">
            <span className="mb-[7px] flex gap-[4px]">
              <span className="size-[7px] rounded-full bg-[#ff5f57]" />
              <span className="size-[7px] rounded-full bg-[#febc2e]" />
              <span className="size-[7px] rounded-full bg-[#28c840]" />
            </span>
            <span className="flex h-[17px] max-w-[45%] min-w-0 items-center gap-1.5 rounded-t-[7px] bg-white px-2">
              <span
                className="size-[8px] shrink-0 rounded-[2px]"
                style={{ background: favicon.accent }}
              />
              <span className="truncate text-[8.5px] text-ink">{tab}</span>
              <span className="ml-auto text-[8px] text-ink-3">×</span>
            </span>
            <span className="mb-[5px] text-[10px] text-[#5f6368]">+</span>
          </div>
          <div className="flex h-[24px] items-center gap-2 border-b border-black/[0.07] bg-white px-2">
            <span className="flex gap-2 text-[#5f6368]">
              {['M7 2 3 6l4 4', 'M4 2l4 4-4 4', 'M9.5 6a3.5 3.5 0 1 1-1-2.5M9.5 1.5v2.3H7.2'].map(
                (d) => (
                  <svg
                    key={d}
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  >
                    <path d={d} />
                  </svg>
                ),
              )}
            </span>
            <span className="flex h-[16px] min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[#f1f3f4] px-2">
              <svg width="7" height="8" viewBox="0 0 8 10" fill="#5f6368">
                <rect x="1" y="4.5" width="6" height="5" rx="1" />
                <path
                  d="M2.2 4.5V3a1.8 1.8 0 0 1 3.6 0v1.5"
                  stroke="#5f6368"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <span className="truncate text-[8.5px] text-[#202124]">{url}</span>
            </span>
            <span className="size-[12px] shrink-0 rounded-full bg-[linear-gradient(128deg,#0753bf,#0069e9,#0755c4)]" />
            <span className="text-[10px] leading-none text-[#5f6368]">⋮</span>
          </div>
          <div
            className={`overflow-hidden [&_.screen-window]:rounded-none [&_.screen-window]:border-0 [&_.screen-window]:shadow-none [&_.screen-window-bar]:hidden ${site || fill ? '' : dims.body}`}
          >
            {site ? (
              <Scaled className={dims.site}>
                <DesktopSite b={BRANDS[site]!} />
              </Scaled>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
      {/* the hinge, then the base: aluminium, wider than the lid, with the notch for opening it */}
      <div className="relative mx-[1.5%] h-[3px] bg-[linear-gradient(180deg,#1b1c20,#3a3c42)]" />
      <div className="relative -mx-[8%] h-[11px] rounded-t-[3px] rounded-b-[14px] bg-[linear-gradient(180deg,#e7e8eb_0%,#cfd1d5_45%,#9ea1a7_100%)] shadow-[0_26px_40px_-14px_rgb(11_13_18/0.5),inset_0_1px_0_rgb(255_255_255/0.8)]">
        <span className="absolute top-0 left-1/2 h-[4px] w-[15%] -translate-x-1/2 rounded-b-[7px] bg-[linear-gradient(180deg,#9ea1a7,#c3c5ca)]" />
      </div>
    </div>
  );
}

/**
 * Two devices, as the brand's website mockup sets them: the MacBook, and an iPhone over its lower
 * right corner. On a phone the iPhone steps aside, so the pair never crowds the screen.
 */
export function Duo({ back, front }: { back: ReactNode; front: ReactNode }) {
  return (
    <div className="relative mx-auto w-fit sm:pr-12">
      {back}
      <div className="absolute right-0 -bottom-8 hidden origin-bottom-right scale-[0.72] sm:block xl:scale-[0.8]">
        {front}
      </div>
    </div>
  );
}
