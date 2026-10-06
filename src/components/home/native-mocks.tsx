import type { CSSProperties, ReactNode } from 'react';

import { Fit } from '../lab/fit';
import { Card, Head, Row, Tag, Wires } from '../lab/light-kit';
import { BrandSymbol, KINETIC } from '../ui/brand';
import { ToolMark } from '../ui/brand-logos';
import { GRAPHITE } from '../visuals/graphite';
import { Icon, type IconName } from '../ui/icon';
import { p, Slab, topMatrix } from '../visuals/iso';

/**
 * The home page's pictures, after Native's: not a drawing of the product but a few pieces of it —
 * white cards with small, quiet type, fine dashed wires, a dock of the tools it talks to, a date
 * strip, a document read into fields — each on the light tint of the card it sits in. Every piece
 * is placed on a fixed canvas (`Fit`) so it reads the same at any width. The sample people and
 * figures are the same invented ones the product pages use.
 */

// The signal colours of the home page's tints, one per picture.
// Graphite, after the home Services pictures (`visuals/graphite.ts`); green stays for "done".
const VIOLET = GRAPHITE;
const AMBER = GRAPHITE;
const ROSE = GRAPHITE;

/** A small line of grey, standing in for text. */
function Bar({ w, tone = '#e4e5ea', h = 6 }: { w: number | string; tone?: string; h?: number }) {
  return <span className="block rounded-full" style={{ width: w, height: h, background: tone }} />;
}

/** A glyph in a colour, on nothing. */
function Glyph({ icon, color, size = 14 }: { icon: IconName; color: string; size?: number }) {
  return (
    <span className="shrink-0" style={{ color }}>
      <Icon name={icon} size={size} strokeWidth={2} />
    </span>
  );
}

/**
 * The four solution pictures stand on white with a fine grid, as the home Services pictures do,
 * and every one of them is drawn in graphite.
 */
const SOLUTION_ACCENT: Record<string, string> = {
  'lead-automation': GRAPHITE,
  'online-store-and-bookings': GRAPHITE,
  'business-dashboard-crm': GRAPHITE,
  'website-care-hosting': GRAPHITE,
};

/** Lead Automation: new enquiries, and the note that no lead goes cold. */
function LeadMock() {
  const A = SOLUTION_ACCENT['lead-automation']!;
  const rows = [
    ['Priya asked for a quote', 'Just now'],
    ['Rahul is waiting for a reply', '1m ago'],
    ['Sana’s follow-up is due today', '3m ago'],
  ];
  return (
    <Fit w={520} h={360}>
      <div
        className="frag-in absolute rounded-lg"
        style={
          {
            left: 318,
            top: 34,
            width: 140,
            height: 104,
            '--i': 0,
            backgroundImage: `repeating-linear-gradient(135deg, color-mix(in srgb, ${A} 9%, white) 0 6px, color-mix(in srgb, ${A} 3%, white) 6px 12px)`,
          } as CSSProperties
        }
      />
      <Card x={70} y={80} w={330} i={1}>
        <div className="px-4 pt-3.5 pb-2">
          <p className="flex items-center gap-2 text-[12px] font-semibold" style={{ color: A }}>
            <Icon name="bell" size={14} strokeWidth={2} />
            New enquiries
          </p>
          <div className="mt-2">
            {rows.map(([text, time]) => (
              <p key={text} className="flex items-center justify-between py-[7px] text-[12px]">
                <span>{text}</span>
                <span className="text-ink-3">{time}</span>
              </p>
            ))}
          </div>
        </div>
      </Card>
      <div
        className="frag-in absolute flex items-start gap-3"
        style={{ left: 70, top: 252, width: 360, '--i': 3 } as CSSProperties}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white shadow-[0_4px_12px_-4px_rgb(11_13_18/0.25)]">
          <BrandSymbol className="size-4" />
        </span>
        <span>
          <span className="block text-[12.5px] leading-snug text-ink">
            All 5 enquiries were answered in seconds. 2 follow-ups go out today, so no lead goes
            cold.
          </span>
          <span className="mt-1.5 block text-[11px] text-ink-2">Just now</span>
        </span>
      </div>
    </Fit>
  );
}

/** Online Store & Bookings: the day chosen, and the booking paid. */
function SellMock() {
  const A = SOLUTION_ACCENT['online-store-and-bookings']!;
  const days = ['18', '19', '20', '21', '22'];
  const rows: { icon: IconName; text: string }[] = [
    { icon: 'check', text: 'Payment received · ₹6,450' },
    { icon: 'calendar', text: '2 seats reserved · Sat, 10 am' },
    { icon: 'whatsapp', text: 'Confirmation sent on WhatsApp' },
  ];
  return (
    <Fit w={520} h={360}>
      <div
        className="frag-in absolute flex items-center gap-3 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-ink ring-1 ring-line shadow-[0_12px_28px_-16px_rgb(11_13_18/0.35)]"
        style={
          {
            left: 150,
            top: 44,
            width: 220,
            height: 46,
            '--i': 0,
          } as CSSProperties
        }
      >
        {days.map((d) => (
          <span
            key={d}
            className={`grid flex-1 place-items-center ${d === '20' ? 'size-[34px] flex-none rounded-full bg-ink text-white' : 'text-ink-2'}`}
          >
            {d}
          </span>
        ))}
      </div>
      <Card x={130} y={110} w={260} i={2}>
        <div className="flex items-center justify-between border-b border-[#f0f0f3] px-4 py-3">
          <p className="text-[13px] font-semibold">Booking paid</p>
          <span className="flex gap-1">
            {['rotate-180', ''].map((r) => (
              <span
                key={r}
                className="grid size-6 place-items-center rounded-md border border-[#e6e7eb] text-ink-2"
              >
                <span className={r}>
                  <Icon name="arrow" size={11} />
                </span>
              </span>
            ))}
          </span>
        </div>
        <div className="px-4 py-2">
          {rows.map((r) => (
            <p key={r.text} className="flex items-center gap-2.5 py-[7px] text-[12px] text-ink-2">
              <Glyph icon={r.icon} color={A} size={13} />
              {r.text}
            </p>
          ))}
        </div>
      </Card>
      <svg
        className="frag-in absolute"
        style={{ left: 372, top: 128, '--i': 4 } as CSSProperties}
        width="18"
        height="22"
        viewBox="0 0 18 22"
      >
        <path
          d="M1 1 L1 17 L5.5 13 L8.5 20 L11 19 L8 12 L14 12 Z"
          fill="#0b0d12"
          stroke="#fff"
          strokeWidth="1.2"
        />
      </svg>
    </Fit>
  );
}

/** Business Dashboard & CRM: the tools on one board, and the view they feed. */
function RunMock() {
  const A = SOLUTION_ACCENT['business-dashboard-crm']!;
  const raised: Record<number, string> = {
    1: 'Tally',
    3: 'Google Sheets',
    4: 'WhatsApp',
    7: 'Razorpay',
  };
  return (
    <Fit w={520} h={360}>
      <div
        className="frag-in absolute"
        style={{ left: 150, top: 104, width: 220, height: 220, '--i': 0 } as CSSProperties}
      >
        <div
          className="grid size-full grid-cols-3 gap-2.5 rounded-2xl border border-dashed border-line-2 bg-fill/70 p-2.5"
          style={{
            transform: 'rotateX(58deg) rotateZ(-45deg)',
            boxShadow: '0 30px 40px -20px rgb(11 13 18 / 0.25)',
          }}
        >
          {Array.from({ length: 9 }, (_, k) =>
            raised[k] ? (
              <span
                key={k}
                className="grid place-items-center rounded-xl border border-[#e2e4ea] bg-white"
                style={{ boxShadow: `0 6px 0 #d9dce4, 0 14px 18px -6px rgb(11 13 18 / 0.25)` }}
              >
                <ToolMark tool={raised[k]!} size={26} />
              </span>
            ) : (
              <span key={k} className="rounded-xl border border-dashed border-line-2" />
            ),
          )}
        </div>
      </div>
      <Card x={24} y={34} w={190} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            Spreadsheets, retired
          </p>
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {['Daily sales v7.xlsx', 'Stock register.xlsx', 'Outlet cash book.xlsx'].map((file) => (
              <p key={file} className="flex items-center gap-2 py-[7px] text-[11px] text-ink-3">
                <ToolMark tool="Excel" size={14} />
                <span className="flex-1 truncate line-through decoration-ink-3/50">{file}</span>
              </p>
            ))}
          </div>
        </div>
      </Card>
      <Card x={24} y={278} w={172} i={4}>
        <div className="p-2.5">
          <p className="text-[10px] text-ink-3">Sales yesterday</p>
          <p className="mt-1 flex items-baseline gap-1.5 text-[16px] leading-none font-semibold">
            ₹1.86 L
            <span className="text-[9.5px] font-semibold" style={{ color: A }}>
              ↑ 9%
            </span>
          </p>
        </div>
      </Card>
      <Card x={300} y={32} w={204} i={3}>
        <div className="p-2.5">
          <Head
            icon="dashboard"
            accent={A}
            title="One view"
            meta="Updated 2 min ago"
            right={<Tag tone="ok">Live</Tag>}
          />
        </div>
      </Card>
      <Wires
        w={520}
        h={360}
        accent={A}
        d={['M300 58 C 280 58, 290 118, 272 128', 'M196 302 C 222 302, 214 262, 218 252']}
        dots={[
          [300, 58],
          [196, 302],
        ]}
      />
    </Fit>
  );
}

/** Website Care & Hosting: a request read into what was done, and when. */
function KeepMock() {
  const A = SOLUTION_ACCENT['website-care-hosting']!;
  const fields = [
    ['Request', 'New offer banner'],
    ['Raised', 'Mon, 10:12 am'],
    ['Live', 'Mon, 1:40 pm'],
  ];
  return (
    <Fit w={520} h={360}>
      <Card x={44} y={36} w={190} h={288} i={0}>
        <div className="p-4">
          <p className="text-[14px] font-medium">Change request</p>
          <div className="mt-4 flex flex-col gap-2">
            <Bar w="100%" h={7} />
            <Bar w="62%" h={7} />
            <Bar w="100%" h={7} />
            <Bar w="84%" h={7} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <span className="h-11 rounded-md bg-[#eeeff2]" />
            <span className="h-11 rounded-md bg-[#eeeff2]" />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Bar w="70%" h={5} />
            <Bar w="50%" h={5} />
            <Bar w="100%" h={7} />
            <Bar w="62%" h={7} />
          </div>
        </div>
      </Card>
      <div
        className="frag-in absolute rounded-[14px] p-[6px]"
        style={{ left: 292, top: 96, width: 196, '--i': 2, background: A } as CSSProperties}
      >
        <div className="rounded-[9px] bg-white px-3 py-2">
          {fields.map(([k, v]) => (
            <p key={k} className="flex items-center justify-between py-[7px] text-[11px]">
              <span>{k}</span>
              <span className="text-ink-2">{v}</span>
            </p>
          ))}
          <p className="flex items-center justify-between py-[7px] text-[11px]">
            <span>Status</span>
            <span className="flex items-center gap-1.5" style={{ color: '#15803d' }}>
              <span className="size-1.5 rounded-full bg-[#22c55e]" />
              Done
            </span>
          </p>
        </div>
      </div>
      <Wires
        w={520}
        h={360}
        accent={A}
        d={['M234 180 H 262 V 174 H 292']}
        dots={[
          [234, 180],
          [292, 174],
        ]}
      />
    </Fit>
  );
}

/** One solution card's tint: its top, its side, its edge, and the colour of what is on it. */
const DECK: [string, string, string, string][] = [
  ['#ffffff', '#eef0f3', '#d9dce4', '#5b6070'],
  ['#fbfbfc', '#e9ebf0', '#d3d7df', '#5b6070'],
  ['#f6f7f9', '#e4e6eb', '#cdd1d9', '#5b6070'],
  ['#ffffff', '#eef0f3', '#d9dce4', GRAPHITE],
];

/**
 * The Solutions picture while every row is closed: the four solutions as a deck of cards on a
 * platform, each in its tint, and one lifted over the empty slot beside it — hovering, ready to
 * drop in. The lifted card is the one thing that moves, so its dot is the one touch of orange.
 */
export function SolutionsRestMock() {
  const Z = 16;
  const slot = { x: 168, y: 40, w: 118, d: 84 };
  const lift = 64;
  const [dx0, dy0] = p(slot.x + slot.w / 2, slot.y + slot.d / 2, Z + lift);
  const [dx1, dy1] = p(slot.x + slot.w / 2, slot.y + slot.d / 2, Z);
  const bar = (u: number, v: number, w: number, fill: string, h = 7) => (
    <rect x={u} y={v} width={w} height={h} rx={h / 2} fill={fill} />
  );
  return (
    <Fit w={520} h={360}>
      <svg
        className="frag-in absolute"
        style={{ left: 13, top: 40, '--i': 0 } as CSSProperties}
        width={494}
        height={320}
        viewBox="-222 -44 494 320"
        fill="none"
      >
        <defs>
          <filter id="rest-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={9} />
          </filter>
        </defs>
        <Slab
          x={0}
          y={0}
          w={300}
          d={240}
          h={Z}
          r={28}
          top="#f6f7f9"
          side="#e9ebf0"
          stroke="#d3d7df"
          shadow="url(#rest-soft)"
        />
        {/* The route across the back of the platform to the lifted card. */}
        {[12, 28, 44, 60, 76, 92].map((x) => {
          const [cx, cy] = p(x, 60, Z);
          return <circle key={x} cx={cx} cy={cy} r={2.5} fill="#b8bdc8" />;
        })}
        <rect
          width={slot.w}
          height={slot.d}
          rx={12}
          transform={topMatrix(slot.x, slot.y, Z)}
          fill="rgb(11 13 18 / 0.03)"
          stroke="rgb(11 13 18 / 0.3)"
          strokeWidth={1.25}
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        {DECK.map(([top, side, edge, ink], k) => (
          <Slab
            key={top}
            x={34}
            y={128}
            z={Z + k * 10}
            w={118}
            d={84}
            h={6}
            r={12}
            top={top}
            side={side}
            stroke={edge}
          >
            {k === DECK.length - 1 ? (
              <g transform={topMatrix(34, 128, Z + k * 10 + 6)}>
                <rect x={14} y={14} width={34} height={16} rx={8} fill={ink} />
                {bar(14, 44, 78, `${ink}66`)}
                {bar(14, 58, 58, `${ink}66`)}
              </g>
            ) : null}
          </Slab>
        ))}
        <g className="iso-float">
          <line
            x1={dx0}
            y1={dy0}
            x2={dx1}
            y2={dy1}
            stroke="#0b0d12"
            strokeOpacity={0.35}
            strokeWidth={1.25}
            strokeDasharray="3 4"
          />
          <Slab
            x={slot.x}
            y={slot.y}
            z={Z + lift}
            w={slot.w}
            d={slot.d}
            h={6}
            r={12}
            stroke="#cfd3db"
          >
            <g transform={topMatrix(slot.x, slot.y, Z + lift + 6)}>
              {bar(14, 16, 44, '#dfe2e8')}
              {bar(14, 30, 60, '#dfe2e8')}
              {bar(14, 44, 36, '#dfe2e8')}
              {bar(14, 62, 74, '#0b0d12', 8)}
              <circle cx={98} cy={24} r={9} fill={KINETIC} />
            </g>
          </Slab>
        </g>
      </svg>
      <Card x={16} y={16} w={214} i={2}>
        <div className="p-2.5">
          <Head
            icon="layers"
            accent="#0b0d12"
            title="Four solutions"
            meta="Open one to see it at work"
          />
        </div>
      </Card>
    </Fit>
  );
}

export const SOLUTION_MOCKS: Record<string, () => ReactNode> = {
  'lead-automation': LeadMock,
  'online-store-and-bookings': SellMock,
  'business-dashboard-crm': RunMock,
  'website-care-hosting': KeepMock,
};

// --- the promises ------------------------------------------------------------------------------

/** The price, fixed before the build. */
function PriceMock() {
  return (
    <Fit w={440} h={220}>
      <Card x={30} y={16} w={236} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="receipt"
            accent={AMBER}
            title="Fixed quote"
            meta="After your System Blueprint"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Scope" meta="Agreed in writing" right={<Tag tone="ok">Signed</Tag>} />
            <Row title="Price" meta="₹45,000, one-time" right={<Tag tone="ok">Fixed</Tag>} />
            <Row
              title="Advance"
              meta="Work starts once it clears"
              right={<Tag tone="wait">Due</Tag>}
            />
          </div>
        </div>
      </Card>
      <div
        className="frag-in absolute flex items-center gap-2 rounded-full border border-[#e6e7eb] bg-white py-1.5 pr-3.5 pl-1.5 text-[12px] font-medium shadow-[0_12px_28px_-12px_rgb(11_13_18/0.25)]"
        style={{ left: 286, top: 150, '--i': 3 } as CSSProperties}
      >
        <span
          className="grid size-[22px] place-items-center rounded-full text-white"
          style={{ background: AMBER }}
        >
          <Icon name="check" size={12} strokeWidth={2.6} />
        </span>
        No surprises later
      </div>
      <Wires
        w={440}
        h={220}
        accent={AMBER}
        d={['M266 84 C 300 84, 300 150, 316 150']}
        dots={[[266, 84]]}
      />
    </Fit>
  );
}

/** The timeline, written down: the weeks, and where the build is. */
function TimelineMock() {
  const weeks = ['1', '2', '3', '4', '5', '6'];
  const rows: { icon: IconName; text: string; when: string; on?: boolean }[] = [
    { icon: 'check', text: 'Design approved', when: 'Week 2' },
    { icon: 'code', text: 'Build and connect', when: 'Week 4', on: true },
    { icon: 'rocket', text: 'Launch', when: 'Week 6' },
  ];
  return (
    <Fit w={440} h={220}>
      <div
        className="frag-in absolute flex items-center rounded-full px-3 py-1.5 text-[12px] font-semibold text-white"
        style={
          {
            left: 110,
            top: 8,
            width: 220,
            height: 36,
            '--i': 0,
            background: 'linear-gradient(90deg, #3a3d46, #0b0d12 30%, #0b0d12 70%, #3a3d46)',
          } as CSSProperties
        }
      >
        {weeks.map((w) => (
          <span
            key={w}
            className={`grid flex-1 place-items-center ${w === '4' ? 'size-[28px] flex-none rounded-full bg-white text-ink' : 'text-white/80'}`}
          >
            {w}
          </span>
        ))}
      </div>
      <Card x={100} y={54} w={240} i={2}>
        <div className="border-b border-[#f0f0f3] px-3.5 py-2">
          <p className="text-[12.5px] font-semibold">Connected Website</p>
          <p className="text-[10.5px] text-ink-3">4–6 weeks, in writing</p>
        </div>
        <div className="px-3.5 py-1.5">
          {rows.map((r) => (
            <p
              key={r.text}
              className={`flex items-center gap-2.5 py-[5px] text-[11.5px] ${r.on ? 'text-ink' : 'text-ink-2'}`}
            >
              <Glyph icon={r.icon} color={VIOLET} size={12} />
              <span className="flex-1">{r.text}</span>
              <span className="text-ink-3">{r.when}</span>
            </p>
          ))}
        </div>
      </Card>
    </Fit>
  );
}

/** Changes by message: asked in a sentence, done and marked done. */
function ChangesMock() {
  return (
    <Fit w={440} h={220}>
      <Card x={24} y={20} w={222} i={0}>
        <div className="p-3">
          <p className="flex items-center justify-between text-[10.5px] text-ink-3">
            <span>Request #214 · from your portal</span>
          </p>
          <p className="mt-2 rounded-lg bg-[#f5f5f7] px-2.5 py-2 text-[12px] leading-snug">
            Can you add our new branch timings to the contact page?
          </p>
        </div>
      </Card>
      <Card x={186} y={124} w={230} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-[#0b0d12]">
              <BrandSymbol className="size-3.5" ink="#fff" />
            </span>
            <span className="flex-1 text-[11.5px] font-semibold">Pixel Kinetix</span>
            <Tag tone="ok">Done</Tag>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-ink-2">
            Done — the new timings are live.
          </p>
        </div>
      </Card>
      <Wires
        w={440}
        h={220}
        accent={ROSE}
        d={['M135 98 C 135 140, 160 150, 186 150']}
        dots={[
          [135, 98],
          [186, 150],
        ]}
      />
    </Fit>
  );
}

/** Covered after launch: the warranty's dates, and a fix under it. */
function WarrantyMock() {
  return (
    <Fit w={440} h={220}>
      <Card x={36} y={18} w={236} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="shield"
            accent={GRAPHITE}
            title="Covered after launch"
            meta="Your Business · website"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Launched" meta="12 Sep" />
            <Row
              title="Warranty until"
              meta="12 Oct · 30 days"
              right={<Tag tone="ok">Active</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={196} y={150} w={226} i={2}>
        <div className="p-2.5">
          <Head
            icon="wrench"
            accent={GRAPHITE}
            title="Form fix"
            meta="A defect we built"
            right={<Tag tone="ok">Covered</Tag>}
          />
        </div>
      </Card>
      <Wires
        w={440}
        h={220}
        accent={GRAPHITE}
        d={['M154 132 C 154 164, 176 175, 196 175']}
        dots={[
          [154, 132],
          [196, 175],
        ]}
      />
    </Fit>
  );
}

export const PROMISE_MOCKS = [PriceMock, TimelineMock, ChangesMock, WarrantyMock];

// --- the portal --------------------------------------------------------------------

/** A stage's progress, as Lightfield scores a row: five short dashes, filled from the left. */
function Dashes({ filled, color }: { filled: number; color: string }) {
  return (
    <span className="flex gap-[3px]">
      {[0, 1, 2, 3, 4].map((k) => (
        <span
          key={k}
          className="h-[3px] w-[14px] rounded-full"
          style={{ background: k < filled ? color : '#e6e7eb' }}
        />
      ))}
    </span>
  );
}

const STATUS = {
  done: { text: 'Done', bg: '#eaf7ef', fg: '#15803d', line: '#cfeedd' },
  now: { text: 'In progress', bg: '#eceef2', fg: GRAPHITE, line: '#dcdfe6' },
  next: { text: 'Up next', bg: '#f6f6f8', fg: '#4a4f5c', line: '#e6e7eb' },
  later: { text: 'Planned', bg: '#f3f3f5', fg: '#6b7080', line: '#e6e7eb' },
} as const;

export type PortalView = 'stage' | 'files' | 'agreement' | 'invoices' | 'requests';

/** A status pill, in Lightfield's soft greys; green only for done. */
function Status({ kind }: { kind: keyof typeof STATUS }) {
  const st = STATUS[kind];
  return (
    <span
      className="rounded-[7px] border px-2 py-[3px] text-[11.5px] whitespace-nowrap"
      style={{ background: st.bg, color: st.fg, borderColor: st.line }}
    >
      {st.text}
    </span>
  );
}

const AVATAR_TONES = ['#eceef2', '#e2e5eb', '#f1f2f5', '#e7e9ee'];

function Avatars({ who, seed = 0 }: { who: string[]; seed?: number }) {
  return (
    <span className="flex -space-x-1.5">
      {who.map((name, k) => (
        <span
          key={name}
          className="grid size-[22px] place-items-center rounded-full border-[1.5px] border-white text-[8.5px] font-semibold text-ink-2"
          style={{ background: AVATAR_TONES[(k + seed) % AVATAR_TONES.length] }}
        >
          {name}
        </span>
      ))}
    </span>
  );
}

/** A row's lead cell: a glyph on grey and its name. */
function Lead({ icon, name, dot }: { icon: IconName; name: string; dot?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-[#f3f3f5] text-ink-2">
        <Icon name={icon} size={13} />
      </span>
      <span className="truncate">{name}</span>
      {dot ? <span className="mr-3 ml-auto size-1.5 shrink-0 rounded-full bg-[#1d2130]" /> : null}
    </span>
  );
}

const muted = (text: string) => <span className="text-[12px] text-ink-3">{text}</span>;

type Table = {
  chip: [string, string];
  title: string;
  icon: IconName;
  view: string;
  columns: { icon: IconName; label: string }[];
  grid: string;
  rows: ReactNode[][];
};

/** What the portal shows for each of its five parts. */
function tableFor(view: PortalView): Table {
  const bar = (k: keyof typeof STATUS) =>
    k === 'done' ? '#22c55e' : k === 'now' ? GRAPHITE : '#a3a8b4';
  switch (view) {
    case 'files':
      return {
        chip: ['Homepage design v2 added', 'Waiting in Files for you'],
        title: 'Files',
        icon: 'file',
        view: 'All files',
        columns: [
          { icon: 'file', label: 'File' },
          { icon: 'layers', label: 'Kind' },
          { icon: 'clock', label: 'Added' },
          { icon: 'people', label: 'By' },
        ],
        grid: 'grid-cols-[1.6fr_0.9fr_0.9fr_0.6fr]',
        rows: [
          [
            <Lead key="n" icon="pen" name="Homepage design · v2" dot />,
            muted('Design'),
            muted('Today'),
            <Avatars key="a" who={['MR']} seed={2} />,
          ],
          [
            <Lead key="n" icon="file" name="Content sheet" />,
            muted('Document'),
            muted('Mon'),
            <Avatars key="a" who={['YB']} />,
          ],
          [
            <Lead key="n" icon="spark" name="Logo files" />,
            muted('Brand'),
            muted('4 Sep'),
            <Avatars key="a" who={['YB']} />,
          ],
          [
            <Lead key="n" icon="eye" name="Service photos · 24" />,
            muted('Images'),
            muted('3 Sep'),
            <Avatars key="a" who={['YB']} />,
          ],
          [
            <Lead key="n" icon="clipboard" name="System Blueprint" />,
            muted('Document'),
            muted('1 Sep'),
            <Avatars key="a" who={['AK']} seed={1} />,
          ],
          [
            <Lead key="n" icon="tasks" name="Launch checklist" />,
            muted('Document'),
            muted('1 Sep'),
            <Avatars key="a" who={['AK']} seed={1} />,
          ],
          [
            <Lead key="n" icon="table" name="Price list" />,
            muted('Sheet'),
            muted('30 Aug'),
            <Avatars key="a" who={['YB']} />,
          ],
        ],
      };
    case 'agreement':
      return {
        chip: ['Agreement signed', 'By you, on 2 Sep'],
        title: 'Agreement',
        icon: 'pen',
        view: 'Connected Website',
        columns: [
          { icon: 'file', label: 'Term' },
          { icon: 'layers', label: 'What we agreed' },
          { icon: 'refresh', label: 'Status' },
        ],
        grid: 'grid-cols-[1fr_1.6fr_0.8fr]',
        rows: [
          [
            <Lead key="n" icon="clipboard" name="Scope" />,
            muted('Website, replies, booking, dashboard'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="rupee" name="Price" />,
            muted('₹45,000, fixed'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="calendar" name="Timeline" />,
            muted('4–6 weeks'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="receipt" name="Payments" />,
            muted('Start, design approval, launch'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="shield" name="Warranty" />,
            muted('30 days from launch'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="refresh" name="Evolve" />,
            muted('3 months included'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="pen" name="Signed" />,
            muted('By you, 2 Sep'),
            <Status key="s" kind="done" />,
          ],
        ],
      };
    case 'invoices':
      return {
        chip: ['Invoice 2 of 3 paid', 'Receipt added to Invoices'],
        title: 'Invoices',
        icon: 'receipt',
        view: 'All invoices',
        columns: [
          { icon: 'receipt', label: 'Invoice' },
          { icon: 'rupee', label: 'Amount' },
          { icon: 'clock', label: 'When' },
          { icon: 'refresh', label: 'Status' },
        ],
        grid: 'grid-cols-[1.5fr_0.8fr_1fr_0.8fr]',
        rows: [
          [
            <Lead key="n" icon="receipt" name="1 of 3 · Start" />,
            muted('₹15,000'),
            muted('Paid 2 Sep'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="receipt" name="2 of 3 · Design approval" dot />,
            muted('₹15,000'),
            muted('Paid today'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="receipt" name="3 of 3 · Launch" />,
            muted('₹15,000'),
            muted('At launch'),
            <Status key="s" kind="later" />,
          ],
          [
            <Lead key="n" icon="refresh" name="Evolve · month 4" />,
            muted('Your plan'),
            muted('After 3 months'),
            <Status key="s" kind="later" />,
          ],
        ],
      };
    case 'requests':
      return {
        chip: ['Request #214 done', 'The new branch timings are live'],
        title: 'Requests',
        icon: 'chat',
        view: 'All requests',
        columns: [
          { icon: 'chat', label: 'Request' },
          { icon: 'clock', label: 'Raised' },
          { icon: 'refresh', label: 'Status' },
          { icon: 'people', label: 'With' },
        ],
        grid: 'grid-cols-[1.6fr_0.9fr_0.9fr_0.6fr]',
        rows: [
          [
            <Lead key="n" icon="chat" name="New branch timings" dot />,
            muted('Mon, 10:12 am'),
            <Status key="s" kind="done" />,
            <Avatars key="a" who={['SV']} seed={1} />,
          ],
          [
            <Lead key="n" icon="chat" name="Diwali offer banner" />,
            muted('Tue, 4:30 pm'),
            <Status key="s" kind="now" />,
            <Avatars key="a" who={['MR']} seed={2} />,
          ],
          [
            <Lead key="n" icon="chat" name="Add a team member" />,
            muted('Today, 9:05 am'),
            <Status key="s" kind="next" />,
            <Avatars key="a" who={['AK']} />,
          ],
          [
            <Lead key="n" icon="chat" name="New service page" />,
            muted('28 Aug'),
            <Status key="s" kind="done" />,
            <Avatars key="a" who={['SV']} seed={1} />,
          ],
          [
            <Lead key="n" icon="chat" name="Change the enquiry form" />,
            muted('26 Aug'),
            <Status key="s" kind="done" />,
            <Avatars key="a" who={['AK']} />,
          ],
        ],
      };
    default: {
      const stages: {
        name: string;
        icon: IconName;
        filled: number;
        status: keyof typeof STATUS;
        with: string[];
        dot?: boolean;
      }[] = [
        {
          name: 'Plan and content',
          icon: 'clipboard',
          filled: 5,
          status: 'done',
          with: ['YB', 'AK'],
        },
        { name: 'Design', icon: 'pen', filled: 5, status: 'done', with: ['YB', 'MR'] },
        {
          name: 'Website build',
          icon: 'code',
          filled: 3,
          status: 'now',
          with: ['SV', 'AK'],
          dot: true,
        },
        {
          name: 'WhatsApp replies',
          icon: 'whatsapp',
          filled: 2,
          status: 'now',
          with: ['SV'],
          dot: true,
        },
        { name: 'Online booking', icon: 'calendar', filled: 1, status: 'next', with: ['MR'] },
        { name: 'Lead dashboard', icon: 'dashboard', filled: 1, status: 'next', with: ['AK'] },
        {
          name: 'Test on real phones',
          icon: 'phone',
          filled: 0,
          status: 'later',
          with: ['YB', 'SV'],
        },
        { name: 'Launch', icon: 'rocket', filled: 0, status: 'later', with: ['YB', 'AK', 'MR'] },
      ];
      return {
        chip: ['Design signed off', 'Stage moved to Website build'],
        title: 'Connected Website',
        icon: 'target',
        view: 'All stages',
        columns: [
          { icon: 'layers', label: 'Stage' },
          { icon: 'chart', label: 'Progress' },
          { icon: 'refresh', label: 'Status' },
          { icon: 'people', label: 'With' },
        ],
        grid: 'grid-cols-[1.5fr_1fr_0.95fr_0.7fr]',
        rows: stages.map((row, k) => [
          <Lead key="n" icon={row.icon} name={row.name} dot={row.dot} />,
          <span key="p" className="flex items-center gap-2.5">
            <Dashes filled={row.filled} color={bar(row.status)} />
            <span className="text-[11.5px] text-ink-3">{row.filled * 20}%</span>
          </span>,
          <Status key="s" kind={row.status} />,
          <Avatars key="a" who={row.with} seed={k} />,
        ]),
      };
    }
  }
}

/** The parts the portal's dashboard turns through, in order. */
export const PORTAL_VIEWS: { view: PortalView; label: string }[] = [
  { view: 'stage', label: 'Project stage' },
  { view: 'files', label: 'Files' },
  { view: 'agreement', label: 'Agreement' },
  { view: 'invoices', label: 'Invoices' },
  { view: 'requests', label: 'Requests' },
];

/**
 * The client portal, after the dashboard in Lightfield's opening: a chip saying what just
 * happened, then the portal itself — its sidebar of what it holds, and the open part as a table —
 * fading out at the foot. `view` picks the part: the project's stages, its files, the agreement,
 * the invoices or the requests.
 */
export function PortalMock({ view = 'stage' }: { view?: PortalView }) {
  const A = GRAPHITE;
  const table = tableFor(view);
  const nav: { view?: PortalView; icon: IconName; label: string }[] = [
    { icon: 'clock', label: 'Up next' },
    { view: 'stage', icon: 'gauge', label: 'Project stage' },
    { view: 'files', icon: 'file', label: 'Files' },
    { view: 'agreement', icon: 'pen', label: 'Agreement' },
    { view: 'invoices', icon: 'receipt', label: 'Invoices' },
    { view: 'requests', icon: 'chat', label: 'Requests' },
  ];
  const recent = ['New branch timings', 'Diwali offer banner', 'Add a team member'];
  return (
    <Fit w={900} h={540} max={1.2}>
      <div
        key={`chip-${view}`}
        className="view-swap absolute flex items-center gap-3 rounded-[14px] border border-[#e8e9ed] bg-white/90 py-3 pr-4 pl-4 text-[13px] shadow-[0_10px_30px_-18px_rgb(11_13_18/0.35)]"
        style={{ left: 30, top: 0, width: 470 }}
      >
        <span className="text-ink-2">
          <Icon name="check" size={15} strokeWidth={2.2} />
        </span>
        <span className="shrink-0 font-semibold">{table.chip[0]}</span>
        <span className="truncate text-ink-3">{table.chip[1]}</span>
      </div>
      <div
        className="frag-in absolute overflow-hidden rounded-[16px] border border-[#e8e9ed] bg-[#fbfbfc] shadow-[0_30px_70px_-40px_rgb(11_13_18/0.35)] [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)]"
        style={{ left: 30, top: 62, width: 870, height: 478, '--i': 1 } as CSSProperties}
      >
        <div className="flex h-full">
          <aside className="w-[232px] shrink-0 border-r border-[#eeeff2] px-3 py-3.5">
            <div className="flex items-center gap-2.5 px-2">
              <span className="grid size-7 place-items-center rounded-[8px] bg-[#0b0d12]">
                <BrandSymbol className="size-4" ink="#fff" />
              </span>
              <span className="flex-1 text-[14px] font-medium">Your portal</span>
              <span className="text-ink-3">
                <Icon name="bell" size={15} />
              </span>
              <span className="text-ink-3">
                <Icon name="search" size={15} />
              </span>
            </div>
            <div className="mt-4">
              {nav.map((item) => (
                <p
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-[8px] px-2 py-[7px] text-[13px] transition-colors duration-300 ${item.view === view ? 'bg-[#efeff2] text-ink' : 'text-ink-2'}`}
                >
                  <Icon name={item.icon} size={15} />
                  <span className="truncate">{item.label}</span>
                </p>
              ))}
            </div>
            <p className="mt-4 px-2 pb-1.5 text-[11.5px] text-ink-3">Recent requests</p>
            {recent.map((label) => (
              <p
                key={label}
                className="flex items-center gap-2.5 px-2 py-[7px] text-[13px] text-ink-2"
              >
                <Icon name="chat" size={15} />
                <span className="truncate">{label}</span>
              </p>
            ))}
          </aside>
          <div key={view} className="view-swap min-w-0 flex-1 bg-white">
            <div className="flex items-center gap-2.5 border-b border-[#eeeff2] px-5 py-3">
              <span className="text-ink-2">
                <Icon name={table.icon} size={16} />
              </span>
              <span className="text-[14px] font-medium">{table.title}</span>
              <span className="flex items-center gap-1.5 rounded-[7px] border border-[#e6e7eb] px-2 py-[3px] text-[12px]">
                <Icon name="table" size={13} />
                {table.view}
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-[12px] text-ink-3">
                <span className="size-1.5 rounded-full" style={{ background: A }} />
                Review on Thursday
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-[#eeeff2] px-5 py-2.5 text-[12.5px] text-ink-2">
              <Icon name="filter" size={14} />
              Filter
            </div>
            <div
              className={`grid ${table.grid} border-b border-[#eeeff2] px-5 py-2.5 text-[12px] text-ink-3`}
            >
              {table.columns.map((c) => (
                <span key={c.label} className="flex items-center gap-2">
                  <Icon name={c.icon} size={13} />
                  {c.label}
                </span>
              ))}
            </div>
            {table.rows.map((cells, k) => (
              <div
                key={k}
                className={`grid ${table.grid} items-center border-b border-[#f2f2f4] px-5 py-[9px] text-[13px]`}
              >
                {cells.map((cell, j) => (
                  <span key={j} className="min-w-0">
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fit>
  );
}
