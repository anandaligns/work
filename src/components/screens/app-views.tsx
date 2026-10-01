import type { ReactNode } from 'react';

import type { Dish, MobileView } from './types';
import { PhoneScreen } from './phone-screen';
import { WhatsAppChat } from './whatsapp-views';

/**
 * Real app screens, as a customer would see them in a food-ordering app: a home with its banner,
 * categories and dishes, a dish page, the cart, live tracking on a map, a loyalty card, table
 * booking, sign-in by code and the app's own page. Dishes are drawn in SVG — a plate, a steel
 * tumbler, a thali — shaded to read like photographs at this size, so nothing is loaded.
 *
 * The colour is the business's own (`--accent`); everything else is the app's ink and greys.
 */

// Gradients need ids that are unique in the page: several of these can be on one page at once.
let serial = 0;
const uid = () => `d${(serial++).toString(36)}`;

// --- the dishes ------------------------------------------------------------------------------

function Plate({ id, children }: { id: string; children: ReactNode }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}p`} cx="0.42" cy="0.36" r="0.75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f3f1ed" />
          <stop offset="1" stopColor="#dcd8d1" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="44" ry="6" fill="#3b2a1a" opacity="0.14" />
      <circle cx="60" cy="60" r="50" fill={`url(#${id}p)`} />
      <circle cx="60" cy="60" r="41" fill="none" stroke="#e7e3dc" strokeWidth="1.2" />
      {children}
    </>
  );
}

function Katori({
  x,
  y,
  r,
  fill,
  id,
  speck,
}: {
  x: number;
  y: number;
  r: number;
  fill: string;
  id: string;
  speck?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y + 1.5} r={r + 1} fill="#000" opacity="0.1" />
      <circle cx={x} cy={y} r={r} fill={`url(#${id}s)`} />
      <circle cx={x} cy={y} r={r * 0.78} fill={fill} />
      <ellipse
        cx={x - r * 0.25}
        cy={y - r * 0.3}
        rx={r * 0.35}
        ry={r * 0.18}
        fill="#fff"
        opacity="0.35"
      />
      {speck ? (
        <>
          <circle cx={x + r * 0.2} cy={y + r * 0.1} r={r * 0.09} fill={speck} />
          <circle cx={x - r * 0.25} cy={y + r * 0.25} r={r * 0.07} fill={speck} />
          <circle cx={x + r * 0.05} cy={y - r * 0.28} r={r * 0.06} fill={speck} />
        </>
      ) : null}
    </g>
  );
}

function Steel({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}s`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#fbfbfb" />
        <stop offset="0.55" stopColor="#c9ccd1" />
        <stop offset="1" stopColor="#8e939b" />
      </radialGradient>
    </defs>
  );
}

export function DishArt({ dish, className = '' }: { dish: Dish; className?: string }) {
  const id = uid();
  let art: ReactNode;
  switch (dish) {
    case 'dosa':
      art = (
        <Plate id={id}>
          <Steel id={id} />
          <defs>
            <linearGradient id={`${id}d`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f6cf7a" />
              <stop offset="0.5" stopColor="#dc8f2f" />
              <stop offset="1" stopColor="#a4561a" />
            </linearGradient>
          </defs>
          <path
            d="M16 74 L97 34 Q106 41 101 52 L25 86 Q13 84 16 74Z"
            fill="#6b3a12"
            opacity="0.18"
            transform="translate(1 4)"
          />
          <path d="M16 74 L97 34 Q106 41 101 52 L25 86 Q13 84 16 74Z" fill={`url(#${id}d)`} />
          <path
            d="M30 76 L92 47 M38 79 L96 52 M26 70 L86 42"
            stroke="#9a4d15"
            strokeWidth="0.8"
            opacity="0.45"
          />
          <path
            d="M20 76 Q30 72 40 70"
            stroke="#fff3d6"
            strokeWidth="1.4"
            opacity="0.6"
            fill="none"
          />
          <Katori id={id} x={40} y={96} r={9} fill="#c2410c" speck="#fbbf24" />
          <Katori id={id} x={62} y={100} r={9} fill="#f5f0dc" speck="#4d7c0f" />
          <Katori id={id} x={84} y={94} r={8} fill="#b91c1c" />
        </Plate>
      );
      break;
    case 'coffee':
      art = (
        <>
          <defs>
            <linearGradient id={`${id}m`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#8a8f97" />
              <stop offset="0.28" stopColor="#f4f5f6" />
              <stop offset="0.5" stopColor="#b9bdc4" />
              <stop offset="0.78" stopColor="#e9ebee" />
              <stop offset="1" stopColor="#7c818a" />
            </linearGradient>
            <radialGradient id={`${id}c`} cx="0.45" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#e3c29a" />
              <stop offset="0.6" stopColor="#b98452" />
              <stop offset="1" stopColor="#7a4a22" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="106" rx="42" ry="6" fill="#3b2a1a" opacity="0.14" />
          {/* the dabarah */}
          <path d="M20 82 Q20 100 60 102 Q100 100 100 82Z" fill={`url(#${id}m)`} />
          <ellipse cx="60" cy="82" rx="40" ry="9" fill="#d6d9de" />
          <ellipse cx="60" cy="82" rx="34" ry="6.5" fill="#6b3f1d" />
          {/* the tumbler */}
          <path d="M40 30 L80 30 L76 84 Q60 90 44 84Z" fill={`url(#${id}m)`} />
          <ellipse cx="60" cy="30" rx="20" ry="5" fill="#dfe2e6" />
          <ellipse cx="60" cy="30.5" rx="17" ry="4" fill={`url(#${id}c)`} />
          <ellipse cx="55" cy="29.5" rx="6" ry="1.4" fill="#f3dfc4" opacity="0.8" />
          <path
            d="M48 12 q4 6 0 10 q-4 5 1 10 M60 8 q4 6 0 10 q-4 5 1 10 M72 12 q4 6 0 10"
            stroke="#ffffff"
            strokeWidth="1.6"
            fill="none"
            opacity="0.7"
            strokeLinecap="round"
          />
          <path d="M46 36 L48 80" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
        </>
      );
      break;
    case 'thali':
      art = (
        <>
          <Steel id={id} />
          <defs>
            <radialGradient id={`${id}t`} cx="0.4" cy="0.35" r="0.8">
              <stop offset="0" stopColor="#f7f8f9" />
              <stop offset="0.6" stopColor="#c7cbd1" />
              <stop offset="1" stopColor="#8f949c" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="110" rx="46" ry="6" fill="#3b2a1a" opacity="0.14" />
          <circle cx="60" cy="60" r="52" fill={`url(#${id}t)`} />
          <circle cx="60" cy="60" r="46" fill="#e6e8eb" />
          <Katori id={id} x={34} y={40} r={12} fill="#e7b53c" />
          <Katori id={id} x={60} y={30} r={11} fill="#c2410c" speck="#fde68a" />
          <Katori id={id} x={86} y={40} r={12} fill="#f8f5ec" speck="#65a30d" />
          <Katori id={id} x={90} y={68} r={11} fill="#4d7c0f" speck="#bef264" />
          <Katori id={id} x={30} y={70} r={11} fill="#991b1b" />
          <ellipse cx="60" cy="72" rx="17" ry="13" fill="#ffffff" />
          <ellipse cx="55" cy="68" rx="7" ry="4" fill="#f1efe8" />
          <circle cx="62" cy="96" r="11" fill="#f3d9a4" />
          <circle cx="59" cy="93" r="1" fill="#b45309" />
          <circle cx="65" cy="98" r="1" fill="#b45309" />
        </>
      );
      break;
    case 'idli':
      art = (
        <>
          <Steel id={id} />
          <defs>
            <radialGradient id={`${id}i`} cx="0.4" cy="0.35" r="0.7">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#e7e1d3" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="106" rx="46" ry="6" fill="#1f3b12" opacity="0.16" />
          <path d="M8 62 Q30 18 92 22 Q118 40 110 70 Q84 108 22 96 Q2 84 8 62Z" fill="#3f7d20" />
          <path
            d="M14 70 Q56 52 106 38"
            stroke="#a3d977"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          <ellipse cx="44" cy="54" rx="18" ry="12" fill={`url(#${id}i)`} />
          <ellipse cx="72" cy="48" rx="18" ry="12" fill={`url(#${id}i)`} />
          <ellipse cx="60" cy="72" rx="18" ry="12" fill={`url(#${id}i)`} />
          <Katori id={id} x={94} y={78} r={9} fill="#f5f0dc" speck="#4d7c0f" />
        </>
      );
      break;
    case 'vada':
      art = (
        <Plate id={id}>
          <Steel id={id} />
          <defs>
            <radialGradient id={`${id}v`} cx="0.4" cy="0.35" r="0.75">
              <stop offset="0" stopColor="#f2c26b" />
              <stop offset="0.6" stopColor="#c97d25" />
              <stop offset="1" stopColor="#8a4512" />
            </radialGradient>
          </defs>
          {[
            [44, 52],
            [74, 56],
          ].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r="17" fill={`url(#${id}v)`} />
              <circle cx={x} cy={y} r="5" fill="#f3f1ed" />
            </g>
          ))}
          <Katori id={id} x={58} y={86} r={11} fill="#c2410c" speck="#fbbf24" />
        </Plate>
      );
      break;
  }
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {art}
    </svg>
  );
}

// --- small parts ----------------------------------------------------------------------------

function Pad({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-3.5 ${className}`}>{children}</div>;
}

function Button({ children }: { children: ReactNode }) {
  return (
    <span
      className="flex h-[34px] items-center justify-center rounded-[12px] text-[11.5px] font-semibold text-white shadow-[0_6px_14px_-6px_var(--accent)]"
      style={{ background: 'var(--accent)' }}
    >
      {children}
    </span>
  );
}

const Tile = ({ dish, className }: { dish: Dish; className: string }) => (
  <span className={`block overflow-hidden rounded-[12px] bg-[#fbf3ea] ${className}`}>
    <DishArt dish={dish} className="size-full" />
  </span>
);

// --- the views --------------------------------------------------------------------------------

function Home({ view }: { view: Extract<MobileView, { type: 'home' }> }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Pad className="flex items-center justify-between pt-1">
        <span className="min-w-0">
          <span className="block text-[8.5px] text-ink-3">Pickup from</span>
          <span className="flex items-center gap-0.5 text-[11px] font-semibold text-ink">
            {view.place}
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M1.5 3 4 5.5 6.5 3" stroke="currentColor" fill="none" strokeWidth="1.3" />
            </svg>
          </span>
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-[#fbe7da] text-[10px] font-bold text-[#7a3a12]">
          A
        </span>
      </Pad>
      <Pad className="mt-2.5">
        <p className="text-[16px] leading-tight font-bold tracking-[-0.02em] text-ink">
          {view.greeting}
        </p>
        <span className="mt-2 flex h-[28px] items-center gap-1.5 rounded-[10px] bg-[#f2f3f5] px-2.5 text-[10px] text-ink-3">
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="5" cy="5" r="3.5" />
            <path d="m8 8 2.5 2.5" />
          </svg>
          Search dosas, coffee, meals
        </span>
      </Pad>
      <Pad className="mt-3">
        <div
          className="relative flex h-[92px] overflow-hidden rounded-[16px] text-white"
          style={{
            background:
              'linear-gradient(120deg, color-mix(in srgb, var(--accent) 88%, black), var(--accent) 60%, color-mix(in srgb, var(--accent) 70%, #fbbf24))',
          }}
        >
          <div className="z-10 flex flex-col justify-center pl-3">
            <span className="text-[8.5px] font-semibold tracking-[0.08em] uppercase opacity-85">
              {view.promo.eyebrow}
            </span>
            <span className="mt-0.5 text-[13.5px] leading-tight font-bold">{view.promo.title}</span>
            <span className="mt-1 text-[9px] opacity-90">{view.promo.line}</span>
          </div>
          <DishArt dish={view.promo.dish} className="absolute -right-4 -bottom-5 size-[112px]" />
        </div>
      </Pad>
      <Pad className="mt-3 flex gap-1.5 overflow-hidden">
        {view.chips.map((chip, i) => (
          <span
            key={chip}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-medium ${i === 0 ? 'bg-ink text-white' : 'bg-[#f2f3f5] text-ink'}`}
          >
            {chip}
          </span>
        ))}
      </Pad>
      <Pad className="mt-3 flex items-baseline justify-between">
        <span className="text-[12px] font-bold text-ink">Order again</span>
        <span className="text-[9.5px] font-semibold text-[var(--accent)]">See all</span>
      </Pad>
      <div className="mt-2 flex gap-2 overflow-hidden pl-3.5">
        {view.again.map((item) => (
          <div key={item.name} className="w-[46%] shrink-0">
            <Tile dish={item.dish} className="aspect-[4/3] w-full" />
            <p className="mt-1.5 truncate text-[10px] font-semibold text-ink">{item.name}</p>
            <p className="flex items-center justify-between text-[9.5px] text-ink-2">
              {item.price}
              <span
                className="grid size-[18px] place-items-center rounded-full text-[12px] leading-none text-white"
                style={{ background: 'var(--accent)' }}
              >
                +
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Item({ view }: { view: Extract<MobileView, { type: 'item' }> }) {
  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="relative h-[46%] shrink-0 overflow-hidden rounded-b-[20px] bg-[#fbf1e6]">
        <DishArt
          dish={view.dish}
          className="absolute top-1/2 left-1/2 size-[92%] -translate-x-1/2 -translate-y-[46%]"
        />
        <span className="absolute top-1 left-3 grid size-7 place-items-center rounded-full bg-white/90 shadow-sm">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="#0b0d12"
            strokeWidth="1.5"
          >
            <path d="M6.5 1.5 3 5l3.5 3.5" />
          </svg>
        </span>
        <span className="absolute top-1 right-3 grid size-7 place-items-center rounded-full bg-white/90 shadow-sm">
          <svg width="11" height="10" viewBox="0 0 12 11" fill="#e11d48">
            <path d="M6 10.5 1.3 5.8A2.8 2.8 0 0 1 6 1.9a2.8 2.8 0 0 1 4.7 3.9Z" />
          </svg>
        </span>
      </div>
      <Pad className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[15px] leading-tight font-bold tracking-[-0.02em] text-ink">
            {view.name}
          </p>
          <p className="text-[13px] font-bold text-ink">{view.price}</p>
        </div>
        <p className="mt-1 text-[9.5px] leading-[1.45] text-ink-2">{view.line}</p>
      </Pad>
      {view.options.map((option) => (
        <Pad key={option.label} className="mt-2.5">
          <p className="text-[9.5px] font-semibold text-ink">{option.label}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {option.choices.map((choice, i) => (
              <span
                key={choice}
                className={`rounded-[9px] border px-2 py-1 text-[9px] font-medium ${i === 0 ? 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,white)] text-[var(--accent)]' : 'border-black/[0.08] text-ink-2'}`}
              >
                {choice}
              </span>
            ))}
          </div>
        </Pad>
      ))}
      <Pad className="mt-auto flex items-center gap-2 pb-2">
        <span className="flex h-[34px] items-center gap-2.5 rounded-[12px] bg-[#f2f3f5] px-2.5 text-[12px] font-semibold text-ink">
          <span>−</span>1<span>+</span>
        </span>
        <span className="flex-1">
          <Button>{view.cta}</Button>
        </span>
      </Pad>
    </div>
  );
}

function Cart({ view }: { view: Extract<MobileView, { type: 'cart' }> }) {
  return (
    <div className="flex h-full flex-col bg-[#f6f6f8]">
      <Pad className="bg-white pt-1 pb-2.5">
        <p className="text-[15px] font-bold tracking-[-0.02em] text-ink">Your order</p>
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--accent)_9%,white)] px-2 py-0.5 text-[9px] font-semibold text-[var(--accent)]">
          <svg
            width="8"
            height="8"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="5" cy="5" r="4" />
            <path d="M5 2.8V5l1.6 1" />
          </svg>
          {view.pickup}
        </span>
      </Pad>
      <Pad className="mt-2">
        <div className="rounded-[14px] bg-white p-2.5">
          {view.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 border-b border-black/[0.05] py-1.5 last:border-b-0"
            >
              <Tile dish={item.dish} className="size-9 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-semibold text-ink">
                  {item.name}
                </span>
                <span className="block text-[9px] text-ink-2">{item.price}</span>
              </span>
              <span className="flex items-center gap-1.5 rounded-[8px] border border-[var(--accent)] px-1.5 py-0.5 text-[9.5px] font-semibold text-[var(--accent)]">
                − {item.qty} +
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-[14px] bg-white p-2.5">
          {view.bill.map(([label, value]) => (
            <p key={label} className="flex justify-between py-0.5 text-[9.5px] text-ink-2">
              <span>{label}</span>
              <span className={value.startsWith('−') ? 'text-[#15803d]' : 'text-ink'}>{value}</span>
            </p>
          ))}
          <p className="mt-1 flex justify-between border-t border-dashed border-black/[0.1] pt-1.5 text-[11px] font-bold text-ink">
            <span>To pay</span>
            <span>{view.total}</span>
          </p>
        </div>
      </Pad>
      <Pad className="mt-auto bg-white pt-2 pb-2">
        <p className="mb-1.5 flex items-center justify-between text-[9px] text-ink-2">
          <span>Pay with</span>
          <span className="font-semibold text-ink">{view.method}</span>
        </p>
        <Button>{view.cta}</Button>
      </Pad>
    </div>
  );
}

function Track({ view }: { view: Extract<MobileView, { type: 'track' }> }) {
  return (
    <div className="relative flex h-full flex-col bg-[#eef0ec]">
      {/* the map: blocks, roads, a park, the route and the two pins */}
      <svg
        viewBox="0 0 200 180"
        className="h-[52%] w-full shrink-0"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="200" height="180" fill="#eceee8" />
        <path
          d="M0 40 H200 M0 104 H200 M0 150 H200 M46 0 V180 M120 0 V180 M170 0 V180"
          stroke="#ffffff"
          strokeWidth="9"
        />
        <path d="M0 70 L90 0 M60 180 L200 60" stroke="#ffffff" strokeWidth="5" />
        <rect x="128" y="112" width="36" height="32" rx="4" fill="#cfe6c3" />
        <rect x="54" y="48" width="58" height="48" rx="4" fill="#e3e5df" />
        <path
          d="M150 150 C150 120 120 104 120 80 S70 40 46 40"
          stroke="var(--accent)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M150 150 C150 120 120 104 120 80 S70 40 46 40"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="3 5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="46" cy="40" r="9" fill="var(--accent)" opacity="0.2" />
        <circle cx="46" cy="40" r="5.5" fill="var(--accent)" stroke="#fff" strokeWidth="2" />
        <g transform="translate(150 150)">
          <circle r="10" fill="#0b0d12" />
          <path d="M-4 -1 h8 v4 h-8z M-3 -1 v-2 h6 v2" fill="#fff" />
        </g>
      </svg>
      <div className="relative -mt-4 flex flex-1 flex-col rounded-t-[20px] bg-white px-3.5 pt-3 shadow-[0_-6px_16px_rgb(0_0_0/0.06)]">
        <span className="mx-auto mb-2 h-[3px] w-8 rounded-full bg-black/15" />
        <p className="text-[9px] font-semibold tracking-[0.06em] text-[var(--accent)] uppercase">
          {view.status}
        </p>
        <p className="mt-0.5 text-[16px] font-bold tracking-[-0.02em] text-ink">{view.eta}</p>
        <div className="mt-2.5 flex items-center gap-1">
          {view.steps.map((step, i) => (
            <span key={step} className="flex-1">
              <span
                className="block h-[4px] rounded-full"
                style={{ background: i <= view.current ? 'var(--accent)' : '#e5e7eb' }}
              />
              <span
                className={`mt-1 block text-[8.5px] ${i <= view.current ? 'font-semibold text-ink' : 'text-ink-3'}`}
              >
                {step}
              </span>
            </span>
          ))}
        </div>
        <div className="mt-auto mb-2 flex items-center justify-between rounded-[12px] bg-[#f4f5f7] px-2.5 py-2">
          <span>
            <span className="block text-[8.5px] text-ink-2">Pickup code</span>
            <span className="block text-[15px] font-bold tracking-[0.12em] text-ink">
              {view.code}
            </span>
          </span>
          <span className="text-right text-[9px] text-ink-2">{view.place}</span>
        </div>
      </div>
    </div>
  );
}

function Rewards({ view }: { view: Extract<MobileView, { type: 'rewards' }> }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Pad className="pt-1">
        <p className="text-[15px] font-bold tracking-[-0.02em] text-ink">Rewards</p>
      </Pad>
      <Pad className="mt-2.5">
        <div
          className="relative overflow-hidden rounded-[16px] p-3 text-white"
          style={{
            background:
              'linear-gradient(135deg, #16181f 0%, color-mix(in srgb, var(--accent) 55%, #16181f) 100%)',
          }}
        >
          <span className="absolute -top-8 -right-8 size-24 rounded-full bg-white/10" />
          <span className="absolute -right-2 -bottom-10 size-20 rounded-full bg-white/5" />
          <p className="text-[8.5px] font-semibold tracking-[0.1em] uppercase opacity-80">
            {view.tier}
          </p>
          <p className="mt-1 text-[24px] leading-none font-bold tracking-[-0.02em]">
            {view.points}
          </p>
          <p className="text-[9px] opacity-75">points</p>
          <span className="mt-3 block h-[5px] overflow-hidden rounded-full bg-white/20">
            <span
              className="block h-full rounded-full bg-white"
              style={{ width: `${view.progress}%` }}
            />
          </span>
          <p className="mt-1.5 text-[9px] opacity-85">{view.next}</p>
        </div>
      </Pad>
      <Pad className="mt-3">
        <p className="text-[11.5px] font-bold text-ink">Spend your points</p>
      </Pad>
      <Pad className="mt-2 grid grid-cols-2 gap-2">
        {view.perks.map((perk) => (
          <div key={perk.title} className="rounded-[12px] border border-black/[0.06] p-1.5">
            <Tile dish={perk.dish} className="aspect-[4/3] w-full" />
            <p className="mt-1 truncate text-[9.5px] font-semibold text-ink">{perk.title}</p>
            <p className="text-[8.5px] font-semibold text-[var(--accent)]">{perk.cost}</p>
          </div>
        ))}
      </Pad>
    </div>
  );
}

function Booking({ view }: { view: Extract<MobileView, { type: 'booking' }> }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Pad className="pt-1">
        <p className="text-[15px] font-bold tracking-[-0.02em] text-ink">Book a table</p>
        <p className="text-[9.5px] text-ink-2">Indiranagar · open till 11 pm</p>
      </Pad>
      <div className="mt-2.5 flex gap-1.5 overflow-hidden pl-3.5">
        {view.dates.map((d, i) => (
          <span
            key={d.date}
            className={`flex w-[38px] shrink-0 flex-col items-center rounded-[12px] py-1.5 ${i === view.date ? 'text-white' : 'bg-[#f4f5f7] text-ink'}`}
            style={i === view.date ? { background: 'var(--accent)' } : undefined}
          >
            <span className="text-[8px] opacity-80">{d.day}</span>
            <span className="text-[13px] font-bold">{d.date}</span>
          </span>
        ))}
      </div>
      <Pad className="mt-3 flex items-center justify-between rounded-none">
        <span className="text-[10.5px] font-semibold text-ink">Guests</span>
        <span className="flex items-center gap-3 rounded-[10px] bg-[#f4f5f7] px-2.5 py-1 text-[11px] font-semibold text-ink">
          <span>−</span>
          {view.guests}
          <span>+</span>
        </span>
      </Pad>
      <Pad className="mt-3">
        <p className="text-[10.5px] font-semibold text-ink">Time</p>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {view.times.map((t, i) => (
            <span
              key={t}
              className={`rounded-[9px] border py-1.5 text-center text-[9.5px] font-medium ${i === view.time ? 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,white)] text-[var(--accent)]' : 'border-black/[0.08] text-ink'}`}
            >
              {t}
            </span>
          ))}
        </div>
      </Pad>
      <Pad className="mt-3">
        <span className="flex items-center justify-between rounded-[10px] bg-[#f4f5f7] px-2.5 py-2 text-[9.5px] text-ink-2">
          {view.note}
          <span
            className="relative h-[16px] w-[28px] rounded-full"
            style={{ background: 'var(--accent)' }}
          >
            <span className="absolute top-[2px] right-[2px] size-[12px] rounded-full bg-white" />
          </span>
        </span>
      </Pad>
      <Pad className="mt-auto pb-2">
        <Button>{view.cta}</Button>
      </Pad>
    </div>
  );
}

function SignIn({ view }: { view: Extract<MobileView, { type: 'signin' }> }) {
  return (
    <div className="flex h-full flex-col bg-white px-4">
      <span
        className="mt-5 grid size-11 place-items-center rounded-[13px] text-[17px] font-bold text-white shadow-[0_8px_18px_-8px_var(--accent)]"
        style={{ background: 'var(--accent)' }}
      >
        Y
      </span>
      <p className="mt-4 text-[17px] leading-tight font-bold tracking-[-0.02em] text-ink">
        {view.title}
      </p>
      <p className="mt-1 text-[10px] leading-[1.45] text-ink-2">{view.line}</p>
      <span className="mt-4 flex h-[34px] items-center rounded-[11px] border border-black/[0.1] px-2.5 text-[11px] text-ink">
        <span className="border-r border-black/[0.1] pr-2 font-semibold">+91</span>
        <span className="pl-2">{view.phone}</span>
      </span>
      <p className="mt-3 text-[9.5px] text-ink-2">Enter the code we sent</p>
      <div className="mt-1.5 grid grid-cols-6 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className={`grid h-[32px] place-items-center rounded-[9px] border text-[13px] font-bold text-ink ${i === view.code.length ? 'border-[var(--accent)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)]' : 'border-black/[0.1]'}`}
          >
            {view.code[i] ?? ''}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[9px] text-ink-3">Resend code in 0:24</p>
      <div className="mt-auto pb-3">
        <Button>{view.cta}</Button>
      </div>
    </div>
  );
}

function About({ view }: { view: Extract<MobileView, { type: 'about' }> }) {
  return (
    <div className="flex h-full flex-col items-center bg-[#f6f6f8] px-3.5">
      <span
        className="mt-5 grid size-16 place-items-center rounded-[18px] text-[26px] font-bold text-white shadow-[0_12px_24px_-10px_var(--accent)]"
        style={{
          background:
            'linear-gradient(145deg, color-mix(in srgb, var(--accent) 80%, white), var(--accent))',
        }}
      >
        Y
      </span>
      <p className="mt-2.5 text-[14px] font-bold text-ink">Your Business</p>
      <p className="text-[9.5px] text-ink-2">{view.version}</p>
      <div className="mt-3 w-full rounded-[14px] bg-white px-2.5 py-1">
        {view.rows.map(([label, value]) => (
          <p
            key={label}
            className="flex justify-between border-b border-black/[0.05] py-1.5 text-[9.5px] last:border-b-0"
          >
            <span className="text-ink-2">{label}</span>
            <span className="font-medium text-ink">{value}</span>
          </p>
        ))}
      </div>
      <div className="mt-2.5 w-full rounded-[14px] bg-white p-2.5">
        <p className="text-[10px] font-bold text-ink">What’s new</p>
        {view.notes.map((note) => (
          <p key={note} className="mt-1 flex gap-1.5 text-[9.5px] text-ink-2">
            <span
              className="mt-[5px] size-1 shrink-0 rounded-full"
              style={{ background: 'var(--accent)' }}
            />
            {note}
          </p>
        ))}
      </div>
    </div>
  );
}

export function MobileScreen({ view }: { view: MobileView }) {
  switch (view.type) {
    case 'home':
      return <Home view={view} />;
    case 'item':
      return <Item view={view} />;
    case 'cart':
      return <Cart view={view} />;
    case 'track':
      return <Track view={view} />;
    case 'rewards':
      return <Rewards view={view} />;
    case 'booking':
      return <Booking view={view} />;
    case 'signin':
      return <SignIn view={view} />;
    case 'about':
      return <About view={view} />;
    case 'whatsapp':
      return <WhatsAppChat view={view} />;
    case 'screen':
      return <PhoneScreen screen={view} />;
  }
}
