import type { CSSProperties } from 'react';

import { DishArt } from './app-views';
import { brandInfo, type Size } from './parts';
import type { BrandId, Screen } from './types';

/**
 * The business's side, drawn the way real software is: at desktop size (1280 × 800), with real
 * type sizes, then scaled into its frame like a screenshot — so its density and proportions are
 * those of an actual app. A workspace sidebar, a top bar with views and search, figures with
 * their sparklines, the working table, and the chosen record's panel beside it. The newest row
 * arrives as the page opens.
 */
type Admin = Extract<Screen, { kind: 'admin' }>;

export const NAV_GLYPHS: Record<string, string> = {
  Today: 'M3 3h7v7H3ZM14 3h7v4h-7ZM14 11h7v10h-7ZM3 14h7v7H3Z',
  Dashboard: 'M3 3h7v7H3ZM14 3h7v4h-7ZM14 11h7v10h-7ZM3 14h7v7H3Z',
  Orders: 'M5 4h14l-1.5 16h-11ZM9 8a3 3 0 0 0 6 0',
  Menu: 'M4 6h16M4 12h16M4 18h10',
  Bookings: 'M4 6h16v14H4ZM4 10h16M8 3v5M16 3v5',
  Customers:
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M22 21a6 6 0 0 0-4-5.6',
  Rewards: 'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z',
  Reports: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  Settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 12h2M18 12h2M12 4v2M12 18v2',
};

export const CHANNEL_GLYPH: Record<string, string> = {
  App: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM11 18h2',
  Website:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  Counter: 'M3 9h18l-2-5H5ZM5 9v11h14V9M9 20v-6h6v6',
  WhatsApp: 'M4 20l1.3-4A8 8 0 1 1 8 18.7Z',
};

export const AVATAR_TONES = ['#fde2cf', '#dbeafe', '#dcfce7', '#fae8ff', '#fef3c7', '#e0e7ff'];

export function Glyph({
  d,
  size = 16,
  color = 'currentColor',
}: {
  d: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export function Spark({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map(
      (p, i) =>
        `${i === 0 ? 'M' : 'L'}${(i / (points.length - 1)) * 100} ${28 - ((p - min) / (max - min || 1)) * 24}`,
    )
    .join(' ');
  return (
    <svg
      viewBox="0 0 100 30"
      className="h-[30px] w-[96px]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={`${d} L100 30 L0 30Z`} fill="color-mix(in srgb, var(--accent) 12%, transparent)" />
      <path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export const STATUS: Record<string, string> = {
  green: 'bg-[#e7f6ec] text-[#16794a]',
  amber: 'bg-[#fdf1d8] text-[#8a5a00]',
  accent: 'bg-[color-mix(in_srgb,var(--accent)_12%,white)] text-[var(--accent)]',
  grey: 'bg-[#f1f2f4] text-[#5b6070]',
  red: 'bg-[#fdecee] text-[#b42318]',
};

export function AdminDesk({ screen }: { screen: Admin }) {
  const brand: BrandId = screen.brand ?? 'yours';
  const name = brandInfo(brand).name;
  const detail = screen.detail;
  return (
    <div
      className="flex h-[800px] w-[1280px] bg-white text-[#16181d]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* the sidebar */}
      <aside className="flex w-[232px] shrink-0 flex-col border-r border-[#ececef] bg-[#f8f8f9] px-3 py-4">
        <div className="flex items-center gap-2.5 px-2">
          <span
            className="grid size-7 place-items-center rounded-[7px] text-[13px] font-bold text-white"
            style={{ background: 'var(--accent)' }}
          >
            {name.charAt(0)}
          </span>
          <span className="text-[14px] font-semibold">{name}</span>
          <svg
            className="ml-auto"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="#8b8f99"
            strokeWidth="1.4"
          >
            <path d="M3 5l3 3 3-3" />
          </svg>
        </div>
        <div className="mt-4 flex h-8 items-center gap-2 rounded-[8px] border border-[#e6e6ea] bg-white px-2.5 text-[13px] text-[#9a9ea8]">
          <Glyph d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-3.5-3.5" size={14} />
          Search
          <span className="ml-auto rounded border border-[#e6e6ea] px-1 text-[11px]">⌘K</span>
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {screen.nav.map((item) => {
            const active = item === screen.section;
            return (
              <span
                key={item}
                className={`flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-[13.5px] ${active ? 'bg-white font-medium shadow-[0_1px_2px_rgb(0_0_0/0.07),0_0_0_1px_rgb(0_0_0/0.04)]' : 'text-[#4b5060]'}`}
              >
                <Glyph
                  d={NAV_GLYPHS[item] ?? NAV_GLYPHS.Today!}
                  size={16}
                  color={active ? 'var(--accent)' : '#6b7080'}
                />
                {item}
                {screen.counts?.[item] ? (
                  <span className="ml-auto text-[12px] text-[#8b8f99] tabular-nums">
                    {screen.counts[item]}
                  </span>
                ) : null}
              </span>
            );
          })}
        </nav>
        {screen.outlets?.length ? (
          <>
            <p className="mt-6 px-2.5 text-[11.5px] font-medium text-[#8b8f99]">Outlets</p>
            <div className="mt-1.5 flex flex-col gap-0.5">
              {screen.outlets.map((outlet, i) => (
                <span
                  key={outlet}
                  className="flex h-8 items-center gap-2.5 px-2.5 text-[13.5px] text-[#4b5060]"
                >
                  <span
                    className={`size-2 rounded-full ${i === 0 ? 'bg-[#22c55e]' : 'bg-[#d4d6dc]'}`}
                  />
                  {outlet}
                </span>
              ))}
            </div>
          </>
        ) : null}
        <div className="mt-auto flex items-center gap-2.5 border-t border-[#ececef] px-2 pt-3">
          <span className="grid size-7 place-items-center rounded-full bg-[#fde2cf] text-[12px] font-semibold text-[#7a3a12]">
            R
          </span>
          <span className="text-[13px] leading-tight">
            <span className="block font-medium">Ramesh K.</span>
            <span className="block text-[12px] text-[#8b8f99]">Manager</span>
          </span>
        </div>
      </aside>

      {/* the main area */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[56px] shrink-0 items-center gap-3 border-b border-[#ececef] px-6">
          <span className="text-[16px] font-semibold">{screen.section}</span>
          {screen.tabs?.length ? (
            <span className="ml-3 flex gap-1">
              {screen.tabs.map((tab, i) => (
                <span
                  key={tab}
                  className={`rounded-[7px] px-2.5 py-1 text-[13px] ${i === 0 ? 'bg-[#f1f2f4] font-medium' : 'text-[#6b7080]'}`}
                >
                  {tab}
                </span>
              ))}
            </span>
          ) : null}
          <span className="ml-auto flex items-center gap-1.5 rounded-[8px] border border-[#e6e6ea] px-2.5 py-1 text-[13px] text-[#4b5060]">
            <Glyph d="M4 6h16M7 12h10M10 18h4" size={14} /> Filter
          </span>
          <span className="flex items-center gap-1.5 rounded-[8px] border border-[#e6e6ea] px-2.5 py-1 text-[13px] text-[#4b5060]">
            <Glyph d="M12 4v11M7 10l5 5 5-5M5 20h14" size={14} /> Export
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 px-6 pt-5">
            <div className="grid grid-cols-4 gap-3">
              {screen.kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-[10px] border border-[#ececef] p-3.5">
                  <p className="text-[12.5px] text-[#6b7080]">{kpi.label}</p>
                  <div className="mt-1.5 flex items-end justify-between gap-2">
                    <span className="text-[24px] leading-none font-semibold tracking-[-0.02em] tabular-nums">
                      {kpi.value}
                    </span>
                    {kpi.spark ? <Spark points={kpi.spark} /> : null}
                  </div>
                  {kpi.note ? (
                    <p className="mt-1.5 text-[12px] font-medium text-[#16794a]">{kpi.note}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-[10px] border border-[#ececef]">
              <div
                className="grid items-center gap-3 border-b border-[#ececef] bg-[#fafafb] px-4 py-2.5 text-[12px] font-medium text-[#8b8f99]"
                style={{
                  gridTemplateColumns: `minmax(0,2.1fr) repeat(${screen.columns.length - 1}, minmax(0,1fr)) 104px`,
                }}
              >
                {screen.columns.map((column) => (
                  <span key={column}>{column}</span>
                ))}
                <span>Status</span>
              </div>
              {screen.rows.map((row, i) => (
                <div
                  key={row.title + i}
                  className={`grid items-center gap-3 border-b border-[#f0f0f2] px-4 py-2.5 text-[13px] last:border-b-0 ${row.fresh ? 'admin-row-fresh' : ''} ${row.highlight ? 'bg-[color-mix(in_srgb,var(--accent)_5%,white)]' : ''}`}
                  style={
                    {
                      gridTemplateColumns: `minmax(0,2.1fr) repeat(${screen.columns.length - 1}, minmax(0,1fr)) 104px`,
                    } as CSSProperties
                  }
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-[#3b3f4c]"
                      style={{ background: AVATAR_TONES[i % AVATAR_TONES.length] }}
                    >
                      {row.title.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{row.title}</span>
                      {row.meta ? (
                        <span className="block truncate text-[12px] text-[#8b8f99]">
                          {row.meta}
                        </span>
                      ) : null}
                    </span>
                  </span>
                  {row.cells.map((cell, j) => {
                    const channel = CHANNEL_GLYPH[cell];
                    const dishes = j === 0 && row.dishes?.length;
                    return (
                      <span
                        key={j}
                        className="flex min-w-0 items-center gap-1.5 truncate text-[#4b5060] tabular-nums"
                      >
                        {dishes ? (
                          <span className="flex -space-x-2">
                            {row.dishes!.slice(0, 3).map((dish, k) => (
                              <span
                                key={k}
                                className="block size-7 overflow-hidden rounded-[7px] bg-[#fbf3ea] ring-2 ring-white"
                              >
                                <DishArt dish={dish} className="size-full" />
                              </span>
                            ))}
                          </span>
                        ) : null}
                        {channel ? <Glyph d={channel} size={14} color="#8b8f99" /> : null}
                        <span className="truncate">{cell}</span>
                      </span>
                    );
                  })}
                  <span>
                    {row.pill ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium ${STATUS[row.pill.tone ?? 'grey']}`}
                      >
                        <span className="size-1.5 rounded-full bg-current opacity-70" />
                        {row.pill.text}
                      </span>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {detail ? (
            <aside className="w-[300px] shrink-0 border-l border-[#ececef] px-5 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold">{detail.title}</span>
                <span className="text-[12px] text-[#8b8f99]">{detail.subtitle}</span>
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {detail.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    {item.dish ? (
                      <span className="block size-11 overflow-hidden rounded-[9px] bg-[#fbf3ea]">
                        <DishArt dish={item.dish} className="size-full" />
                      </span>
                    ) : null}
                    <span className="min-w-0 flex-1 text-[13px]">
                      <span className="block font-medium">{item.name}</span>
                      {item.qty ? (
                        <span className="block text-[12px] text-[#8b8f99]">{item.qty}</span>
                      ) : null}
                    </span>
                    {item.price ? (
                      <span className="text-[13px] tabular-nums">{item.price}</span>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[12px] font-medium text-[#8b8f99]">Timeline</p>
              <ol className="mt-2 flex flex-col gap-2.5 border-l border-[#e6e6ea] pl-3.5">
                {detail.timeline.map((step, i) => (
                  <li key={step.text} className="relative text-[13px]">
                    <span
                      className="absolute top-[5px] -left-[18.5px] size-2 rounded-full"
                      style={{
                        background: i === detail.timeline.length - 1 ? 'var(--accent)' : '#c9ccd3',
                      }}
                    />
                    <span className="block">{step.text}</span>
                    <span className="block text-[12px] text-[#8b8f99]">{step.time}</span>
                  </li>
                ))}
              </ol>
              {detail.action ? (
                <span
                  className="mt-5 flex h-9 items-center justify-center rounded-[9px] text-[13.5px] font-semibold text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  {detail.action}
                </span>
              ) : null}
            </aside>
          ) : null}
        </div>
      </main>
    </div>
  );
}

/**
 * The admin, scaled into a frame of known width — a window of its own, or a MacBook's screen.
 * `--k` is set per breakpoint by `frame`, never measured.
 */
export const ADMIN_FRAMES: Record<'hero' | 'wide' | 'stage' | 'row' | Size, string> = {
  /** The hero row's centre tile: one fixed size, the row being fixed in pixels. */
  row: 'h-[312.5px] w-[500px] [--k:0.390625]',
  stage:
    'h-[560px] w-[896px] [--k:0.7] lg:h-[680px] lg:w-[1088px] lg:[--k:0.85] xl:h-[800px] xl:w-[1280px] xl:[--k:1]',
  wide: 'h-[234px] w-[375px] [--k:0.29296875] sm:h-[325px] sm:w-[520px] sm:[--k:0.40625] md:h-[400px] md:w-[640px] md:[--k:0.5] lg:h-[550px] lg:w-[880px] lg:[--k:0.6875] xl:h-[625px] xl:w-[1000px] xl:[--k:0.78125] 2xl:h-[675px] 2xl:w-[1080px] 2xl:[--k:0.84375]',
  hero: 'h-[187px] w-[300px] [--k:0.234375] sm:h-[300px] sm:w-[480px] sm:[--k:0.375] md:h-[350px] md:w-[560px] md:[--k:0.4375] lg:h-[450px] lg:w-[720px] lg:[--k:0.5625] xl:h-[500px] xl:w-[800px] xl:[--k:0.625] 2xl:h-[537px] 2xl:w-[860px] 2xl:[--k:0.671875]',
  lg: 'h-[150px] w-[240px] [--k:0.1875] sm:h-[225px] sm:w-[360px] sm:[--k:0.28125] md:h-[300px] md:w-[480px] md:[--k:0.375] lg:h-[375px] lg:w-[600px] lg:[--k:0.46875]',
  md: 'h-[150px] w-[240px] [--k:0.1875] sm:h-[238px] sm:w-[380px] sm:[--k:0.296875] md:h-[188px] md:w-[300px] md:[--k:0.234375] lg:h-[200px] lg:w-[320px] lg:[--k:0.25] xl:h-[238px] xl:w-[380px] xl:[--k:0.296875] 2xl:h-[275px] 2xl:w-[440px] 2xl:[--k:0.34375]',
  sm: 'h-[150px] w-[240px] [--k:0.1875]',
};
