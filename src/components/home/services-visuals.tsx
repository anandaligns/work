import type { CSSProperties } from 'react';

import { TurnOnView } from '../motion/turn-on-view';
import { BrandSymbol, KINETIC, SYMBOL } from '../ui/brand';
import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';

/**
 * The pictures under the home page's service groups. Each repeats what its group says, so each is
 * hidden from assistive tech where it is placed (`services.tsx`). Every business, figure and time
 * on them is an example, in the same example businesses the service pages use.
 */

const STEPS: {
  icon: IconName;
  title: string;
  meta: string;
  status: string;
  tint: string;
  accent: string;
}[] = [
  {
    icon: 'calendar',
    title: 'Consultation booked',
    meta: 'Interior Design Studio · Sat 11:00',
    status: 'confirmed',
    tint: 'var(--color-tint-sky)',
    accent: 'var(--color-signal-sky)',
  },
  {
    icon: 'chat',
    title: 'Quote asked for',
    meta: 'Deep cleaning · 3 BHK · 9:02 pm',
    status: 'reply sent',
    tint: 'var(--color-haze)',
    accent: KINETIC,
  },
  {
    icon: 'card',
    title: 'Order paid',
    meta: 'Block-print kurta · ₹1,890',
    status: 'stock updated',
    tint: 'var(--color-tint-mint)',
    accent: '#16804a',
  },
];

/**
 * Digital Experiences — a website that answers back: three things customers did, each already
 * turned into its next step. The rows take turns being the one that just happened: its edge lights
 * Kinetic Blue and its tick pops in again, a row every three seconds.
 */
export function NextStepCard() {
  return (
    <div className="relative w-full max-w-[26rem] rounded-2xl border border-line bg-white p-2 shadow-[0_28px_56px_-32px_rgb(11_13_18/0.4)]">
      <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-2 uppercase">
          Customer → next step
        </p>
        <span className="svc-live">Live</span>
      </div>
      <ul className="flex flex-col gap-2">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="svc-step flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-3"
            style={{ '--i': i } as CSSProperties}
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg"
              style={{ background: step.tint, color: step.accent }}
            >
              <Icon name={step.icon} size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.875rem] font-medium text-ink">
                {step.title}
              </span>
              <span className="block truncate text-xs text-ink-2">{step.meta}</span>
            </span>
            <span className="svc-step__status inline-flex shrink-0 items-center gap-1 rounded-full border border-line bg-white px-2 py-1 text-[0.6875rem] font-medium whitespace-nowrap text-ink">
              <Icon name="check" size={11} strokeWidth={2.2} />
              {step.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-between gap-3 border-t border-line px-3 pt-3 pb-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-ink-2 uppercase">
        <span>Reply time</span>
        <span>Seconds, not hours</span>
      </div>
    </div>
  );
}

// A pointy-topped hexagon, centred on its origin.
const R = 44;
const HW = (Math.sqrt(3) / 2) * R;
const HEX = `M0 ${-R} L${HW} ${-R / 2} L${HW} ${R / 2} L0 ${R} L${-HW} ${R / 2} L${-HW} ${-R / 2} Z`;
const DX = 2 * HW + 7;
const DY = 1.5 * R + 6;

/** The honeycomb: where each cell sits (in cells from the centre), and the tool it holds. */
const CELLS: { x: number; y: number; tool?: string }[] = [
  { x: -1, y: -2 },
  { x: 0, y: -2 },
  { x: 1, y: -2 },
  { x: -1.5, y: -1 },
  { x: -0.5, y: -1, tool: 'Google Calendar' },
  { x: 0.5, y: -1, tool: 'Gmail' },
  { x: 1.5, y: -1 },
  { x: -2, y: 0 },
  { x: -1, y: 0, tool: 'Razorpay' },
  { x: 1, y: 0, tool: 'WhatsApp' },
  { x: 2, y: 0 },
  { x: -1.5, y: 1 },
  { x: -0.5, y: 1, tool: 'Google Sheets' },
  { x: 0.5, y: 1, tool: 'Zoho' },
  { x: 1.5, y: 1 },
  { x: -1, y: 2 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
];
/** The order the tools light in, round the centre. */
const LIGHT_ORDER = ['Google Calendar', 'Gmail', 'WhatsApp', 'Zoho', 'Google Sheets', 'Razorpay'];

/**
 * Automation & AI — your tools, working as one: the tools a business already uses in a honeycomb
 * round our mark, which sits on the lit Kinetic Blue. A ring breathes out from the centre, the
 * tools' edges light in turn round it, and the mark's pixel makes its quarter-turn when the
 * picture comes into view and whenever it is pointed at.
 */
export function ToolHive() {
  const symbol = 42;
  const k = symbol / SYMBOL.size;
  return (
    <TurnOnView className="w-full max-w-[34rem]">
      <svg viewBox="-250 -170 500 340" className="h-auto w-full overflow-visible">
        <defs>
          <linearGradient id="svc-lit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0753bf" />
            <stop offset="0.48" stopColor="#0069e9" />
            <stop offset="1" stopColor="#0755c4" />
          </linearGradient>
          <radialGradient id="svc-glow">
            <stop offset="0" stopColor="#0077ff" stopOpacity="0.32" />
            <stop offset="0.55" stopColor="#0069e9" stopOpacity="0.1" />
            <stop offset="1" stopColor="#0069e9" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r={150} fill="url(#svc-glow)" />
        {CELLS.map((cell) => {
          const cx = cell.x * DX;
          const cy = cell.y * DY;
          if (!cell.tool) {
            const far = Math.abs(cell.x) + Math.abs(cell.y) > 2.5;
            return (
              <path
                key={`${cell.x},${cell.y}`}
                d={HEX}
                transform={`translate(${cx} ${cy})`}
                fill="#f4f5f8"
                stroke="#eceef2"
                strokeWidth={1}
                strokeLinejoin="round"
                opacity={far ? 0.55 : 0.9}
              />
            );
          }
          return (
            <g key={cell.tool} transform={`translate(${cx} ${cy})`}>
              <path
                d={HEX}
                fill="#fff"
                strokeWidth={1.25}
                strokeLinejoin="round"
                className="svc-hex"
                style={{ '--i': LIGHT_ORDER.indexOf(cell.tool) } as CSSProperties}
              />
              <g transform="translate(-14 -14)">
                <ToolMark tool={cell.tool} size={28} />
              </g>
            </g>
          );
        })}
        <path d={HEX} fill="none" stroke={KINETIC} strokeWidth={1.5} className="svc-ripple" />
        <path d={HEX} fill="url(#svc-lit)" strokeLinejoin="round" />
        <g transform={`translate(${-symbol / 2} ${-symbol / 2}) scale(${k})`}>
          <path d={SYMBOL.p} fill="#fff" />
          {/* On the lit blue, the pixel turns ink, so it is always the contrasting part. */}
          <path d={SYMBOL.pixel} fill="#0b0d12" className="pk-px" data-turn="" />
        </g>
      </svg>
    </TurnOnView>
  );
}

/** Six months of bookings, the last month still to come. */
const BOOKINGS = [
  { month: 'May', value: 34 },
  { month: 'Jun', value: 48 },
  { month: 'Jul', value: 58 },
  { month: 'Aug', value: 40 },
  { month: 'Sep', value: 51 },
  { month: 'Oct', value: 74 },
  { month: 'Nov', value: 0 },
];
const MOST = Math.max(...BOOKINGS.map((b) => b.value));
/** This month's enquiries, day by day: one hue, light to dark as the days get busier. */
const HEAT = [0, 1, 0, 2, 1, 1, 2, 1, 3, 2, 2, 3, 2, 4, 3, 3, 4, 4];
const HEAT_STEPS = ['#edeef3', '#d6e5fb', '#9cc3f6', '#5ca6ff', KINETIC];

const FIRING: { tool: string; label: string; meta: string }[] = [
  { tool: 'WhatsApp', label: 'Quote sent', meta: 'in 8 sec' },
  { tool: 'Google Calendar', label: 'Visit booked', meta: 'Sat 10:30' },
  { tool: 'Razorpay', label: 'Deposit paid', meta: '₹2,400' },
];

/**
 * Business Systems — one place to run the business: the overview of a business's own dashboard in
 * a browser window, cropped by the panel's foot. Enquiries this month, bookings by month (the bars
 * rise as the panel arrives, this month's in Kinetic Blue) and the automations firing right now.
 */
export function OverviewWindow() {
  return (
    <div className="w-full max-w-[64rem] rounded-t-[1.25rem] border border-b-0 border-line bg-[#f4f5f8] p-2 pb-0 shadow-[0_-12px_48px_-36px_rgb(11_13_18/0.35)]">
      <div className="flex gap-1.5 px-2.5 pt-1.5 pb-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="rounded-t-xl border border-b-0 border-line bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink">
              <BrandSymbol ink="#fff" className="size-4" />
            </span>
            <span className="truncate text-[0.9375rem] font-medium text-ink">
              Your Business <span className="font-normal text-ink-2">/ Overview</span>
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-tint-mint px-2.5 py-1 text-xs font-medium text-[#136b3d]">
            <span className="size-1.5 rounded-full bg-signal-green" />
            Running live
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_1.25fr_1.15fr] md:divide-x md:divide-line">
          <div className="px-5 py-6">
            <Label icon="target">Enquiries this month</Label>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="font-display text-[2.75rem] leading-none tracking-[var(--tracking-display)] text-ink">
                86
              </p>
              <div className="grid grid-cols-6 gap-1 pb-1">
                {HEAT.map((level, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-[2px]"
                    style={{ background: HEAT_STEPS[level] }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5 font-medium text-ink">
                <Icon name="arrow" size={11} strokeWidth={2} className="-rotate-45" />
                28
              </span>
              on last month
            </p>
            <div className="mt-6 flex justify-between gap-3 border-t border-line pt-4 text-[0.8125rem]">
              <span className="text-ink-2">Answered in a minute</span>
              <span className="font-medium whitespace-nowrap text-ink">86 of 86</span>
            </div>
          </div>

          <div className="px-5 py-6 max-md:border-t max-md:border-line">
            <Label icon="calendar">Bookings by month</Label>
            <div className="mt-5 flex h-28 items-end gap-3">
              {BOOKINGS.map((b, i) => {
                const now = b.month === 'Oct';
                return (
                  <div key={b.month} className="flex h-full flex-1 flex-col justify-end">
                    {b.value ? (
                      <span
                        className="svc-bar block rounded-t-[4px]"
                        style={
                          {
                            '--i': i,
                            height: `${(b.value / MOST) * 100}%`,
                            background: now
                              ? `linear-gradient(${KINETIC} 0 5px, #5ca6ff 5px, rgb(231 240 252 / 0.6))`
                              : 'linear-gradient(#e6e8ee, rgb(244 245 248 / 0.4))',
                          } as CSSProperties
                        }
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex gap-3 text-center text-[0.6875rem] text-ink-2">
              {BOOKINGS.map((b) => (
                <span key={b.month} className="flex-1">
                  {b.month}
                </span>
              ))}
            </div>
          </div>

          <div className="px-5 py-6 max-md:border-t max-md:border-line">
            <Label icon="spark">Automations firing now</Label>
            <ul className="mt-4 flex flex-col gap-2">
              {FIRING.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-md border border-line bg-white">
                    <ToolMark tool={row.tool} size={15} />
                  </span>
                  <span className="flex-1 text-[0.8125rem] font-medium text-ink">{row.label}</span>
                  <span className="text-xs text-ink-2">{row.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ icon, children }: { icon: IconName; children: string }) {
  return (
    <p className="flex items-center gap-2 text-[0.8125rem] text-ink-2">
      <Icon name={icon} size={14} />
      {children}
    </p>
  );
}
