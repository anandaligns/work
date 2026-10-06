import { Fit } from './fit';
import { Bubble, Frag, FragHead, Line, Pill, Tag, Wires, lit } from './kit';
import { GRAPHITE } from '../visuals/graphite';

/**
 * Online Store & Bookings's mockups for the solution page under test, from its sample studio: pieces
 * and seats counting down, the day's orders and bookings together, the week's workshops with
 * their seats, and — for the cards — a piece paid for, a workshop booked, and the confirmation.
 */

const A = GRAPHITE;

/** A wheel-thrown vase, drawn simply. */
function Vase({ size = 120 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <ellipse cx="60" cy="104" rx="30" ry="5" fill="rgb(0 0 0 / 0.25)" />
      <path
        d="M48 18h24v8c0 6 14 14 14 36 0 24-12 40-26 40S34 86 34 62c0-22 14-30 14-36z"
        fill="#e9dccb"
        stroke="#0b0d12"
        strokeWidth="2"
      />
      {[
        [52, 48],
        [66, 58],
        [56, 72],
        [70, 80],
        [46, 64],
        [62, 90],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="#6b5a48" />
      ))}
    </svg>
  );
}

export function StockScene() {
  const pieces = [
    { title: 'Speckled stoneware vase', left: '0 left', tag: <Tag>Sold</Tag> },
    { title: 'Glazed mug, blue', left: '8 left', tag: <Tag tone="ok">In stock</Tag> },
    { title: 'Cushion cover, block print', left: '3 left', tag: <Tag tone="wait">Low</Tag> },
    { title: 'Canvas apron tote', left: '12 left', tag: <Tag tone="ok">In stock</Tag> },
  ];
  const seats = [
    { label: 'Sat 20 · 10 am', value: 100, note: '8 of 8' },
    { label: 'Sat 20 · 2 pm', value: 38, note: '3 of 8' },
    { label: 'Sun 21 · 10 am', value: 75, note: '6 of 8' },
    { label: 'Sun 21 · 2 pm', value: 100, note: '8 of 8' },
  ];
  return (
    <Fit w={600} h={600}>
      <Frag x={20} y={30} w={340} i={0}>
        <div className="px-4 pt-4 pb-1.5">
          <FragHead icon="store" accent={A} title="Pieces" meta="This week" />
          <div className="mt-2 divide-y divide-white/[0.06]">
            {pieces.map((p, i) => (
              <Line
                key={p.title}
                icon="spark"
                title={p.title}
                meta={p.left}
                right={p.tag}
                dim={i === 0}
              />
            ))}
          </div>
        </div>
      </Frag>
      <Frag x={236} y={290} w={344} i={2}>
        <div className="p-4">
          <FragHead icon="calendar" accent={A} title="Workshop seats" meta="Wheel workshop" />
          <div className="mt-3 flex flex-col gap-3">
            {seats.map((s) => (
              <div key={s.label}>
                <p className="flex justify-between text-[12.5px]">
                  <span className="text-white/70">{s.label}</span>
                  <span className="font-semibold">{s.note}</span>
                </p>
                <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${s.value}%`,
                      background: s.value === 100 ? lit(A) : 'rgb(255 255 255 / 0.45)',
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Frag>
      <Wires
        w={600}
        h={600}
        accent={A}
        d={['M190 300 C 190 350, 210 360, 236 360']}
        dots={[
          [190, 300],
          [236, 360],
        ]}
      />
      <Pill x={20} y={540} i={4} accent={A}>
        The last piece sells once
      </Pill>
    </Fit>
  );
}

export function AdminScene() {
  const kpis = [
    { label: 'Sales this week', value: '₹58,400', note: '↑ 16%' },
    { label: 'Workshop seats sold', value: '26 of 32' },
    { label: 'To ship', value: '6' },
  ];
  const rows = [
    {
      title: 'Isha Kapoor',
      meta: 'Vase + 2 workshop seats · Sat 10 am',
      tag: (
        <Tag tone="accent" accent={A}>
          New
        </Tag>
      ),
    },
    { title: 'Rohit Nair', meta: 'Set of 4 mugs · ships Mon', tag: <Tag tone="wait">To pack</Tag> },
    { title: 'Maya D', meta: 'Workshop · 1 seat · Sun 2 pm', tag: <Tag tone="ok">Booked</Tag> },
    { title: 'Karan S', meta: 'Serving bowl · delivered', tag: <Tag>Done</Tag> },
  ];
  return (
    <Fit w={600} h={600}>
      <Frag x={20} y={30} w={560} i={0}>
        <div className="grid grid-cols-3 divide-x divide-white/[0.07] py-4">
          {kpis.map((k) => (
            <div key={k.label} className="px-5">
              <p className="text-[12px] text-white/55">{k.label}</p>
              <p className="mt-1.5 flex items-baseline gap-2 font-display text-[1.625rem] leading-none font-bold tracking-[-0.03em]">
                {k.value}
                {k.note ? (
                  <span className="text-[12px] font-semibold" style={{ color: lit(A) }}>
                    {k.note}
                  </span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </Frag>
      <Frag x={20} y={150} w={380} i={2}>
        <div className="px-4 pt-4 pb-1.5">
          <FragHead icon="home" accent={A} title="Today" meta="Orders and bookings, together" />
          <div className="mt-2 divide-y divide-white/[0.06]">
            {rows.map((r) => (
              <Line key={r.title} icon="person" title={r.title} meta={r.meta} right={r.tag} />
            ))}
          </div>
        </div>
      </Frag>
      <Frag x={416} y={200} w={168} i={4} glow={lit(A)}>
        <div className="p-4">
          <FragHead tool="Razorpay" title="₹6,450" meta="Vase + 2 seats" />
          <p className="mt-3 flex items-center gap-2 text-[12.5px] font-semibold text-[#4ade80]">
            <span className="size-2 rounded-full bg-[#4ade80]" />
            Paid · UPI
          </p>
        </div>
      </Frag>
      <Wires
        w={600}
        h={600}
        accent={A}
        d={['M400 244 C 408 244, 404 250, 416 250']}
        dots={[
          [400, 244],
          [416, 250],
        ]}
      />
      <Pill x={130} y={528} i={5} accent={A}>
        Walk-ins and phone orders on the same list
      </Pill>
    </Fit>
  );
}

export function WeekScene() {
  const heads = ['Wed 17', 'Thu 18', 'Fri 19', 'Sat 20', 'Sun 21'];
  const events = [
    { col: 0, from: 18, to: 20, title: 'Evening throw', meta: '5 of 8 seats' },
    { col: 1, from: 11, to: 13, title: 'Kids’ clay club', meta: '9 of 10 seats' },
    { col: 2, from: 18, to: 20, title: 'Glazing class', meta: '6 of 6 seats' },
    { col: 3, from: 10, to: 13, title: 'Wheel workshop', meta: '8 of 8 seats', glow: true },
    { col: 3, from: 14, to: 17, title: 'Wheel workshop', meta: '3 of 8 seats' },
    { col: 4, from: 10, to: 13, title: 'Wheel workshop', meta: '6 of 8 seats' },
    { col: 4, from: 14, to: 17, title: 'Wheel workshop', meta: '8 of 8 seats' },
  ];
  const col = 100;
  const hour = 30;
  const top = 9;
  return (
    <Fit w={600} h={600}>
      <Frag x={20} y={30} w={560} i={0}>
        <div className="p-4">
          <FragHead
            icon="calendar"
            accent={A}
            title="Workshops"
            meta="This week"
            right={<Tag>Next week</Tag>}
          />
          <div className="mt-4 grid grid-cols-5 gap-2 pl-8">
            {heads.map((h, i) => (
              <p
                key={h}
                className={`text-center text-[12px] font-semibold ${i === 3 ? '' : 'text-white/55'}`}
                style={i === 3 ? { color: lit(A) } : undefined}
              >
                {h}
              </p>
            ))}
          </div>
          <div className="relative mt-2 h-[330px]">
            {[10, 12, 14, 16, 18].map((h) => (
              <p
                key={h}
                className="absolute left-0 text-[10.5px] text-white/40"
                style={{ top: (h - top) * hour - 6 }}
              >
                {h > 12 ? h - 12 : h} {h >= 12 ? 'pm' : 'am'}
              </p>
            ))}
            {events.map((e) => (
              <div
                key={`${e.col}-${e.from}`}
                className="absolute overflow-hidden rounded-lg border-l-[3px] bg-white/[0.07] px-2 py-1.5"
                style={{
                  left: 32 + e.col * (col + 1.5),
                  width: col - 6,
                  top: (e.from - top) * hour,
                  height: (e.to - e.from) * hour - 4,
                  borderColor: e.glow ? lit(A) : 'rgb(255 255 255 / 0.3)',
                  ...(e.glow
                    ? {
                        boxShadow: `0 0 24px -6px ${lit(A)}`,
                        background: 'rgb(255 255 255 / 0.12)',
                      }
                    : null),
                }}
              >
                <p className="truncate text-[11.5px] font-semibold">{e.title}</p>
                <p className="truncate text-[10.5px] text-white/60">{e.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </Frag>
      <Pill x={40} y={520} i={3} accent={A}>
        Sat 20, 10 am · 8 of 8 seats sold
      </Pill>
    </Fit>
  );
}

/** For the cards: a piece, and its payment. */
export function StoreCard() {
  return (
    <Fit w={480} h={340}>
      <Frag x={40} y={30} w={210} tone="light" i={0}>
        <div className="p-3">
          <div
            className="grid h-[150px] place-items-center rounded-xl"
            style={{ background: `color-mix(in srgb, ${A} 14%, #f5f1ea)` }}
          >
            <Vase size={124} />
          </div>
          <p className="mt-3 text-[14px] font-semibold">Speckled stoneware vase</p>
          <p className="mt-0.5 flex items-center justify-between text-[12.5px] text-ink-2">
            One of a kind <span className="font-semibold text-ink">₹1,650</span>
          </p>
        </div>
      </Frag>
      <Frag x={286} y={150} w={160} i={2} glow={lit(A)}>
        <div className="p-3.5">
          <FragHead tool="Razorpay" title="Paid" meta="₹1,650 · UPI" />
        </div>
      </Frag>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M250 120 C 290 120, 270 180, 286 180']}
        dots={[
          [250, 120],
          [286, 180],
        ]}
      />
      <Pill x={250} y={262} i={4} accent={A}>
        Paid first
      </Pill>
    </Fit>
  );
}

/** For the cards: a workshop, its days and its free seats. */
export function BookingCard() {
  const days = [
    ['Sat', '20'],
    ['Sun', '21'],
    ['Sat', '27'],
    ['Sun', '28'],
  ];
  const slots = [
    { t: '10 am', n: '2 left', on: true },
    { t: '2 pm', n: '5 left' },
    { t: '5 pm', n: 'Full', off: true },
  ];
  return (
    <Fit w={480} h={340}>
      <Frag x={40} y={26} w={400} i={0}>
        <div className="p-4">
          <FragHead
            icon="calendar"
            accent={A}
            title="Weekend wheel workshop"
            meta="3 hours · clay, tools and firing included"
          />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {days.map(([d, n], i) => (
              <span
                key={n}
                className="rounded-xl py-2 text-center"
                style={
                  i === 0
                    ? { background: lit(A), color: '#0b0d12' }
                    : { background: 'rgb(255 255 255 / 0.06)' }
                }
              >
                <span className="block text-[11px] opacity-70">{d}</span>
                <span className="block text-[16px] font-bold">{n}</span>
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {slots.map((s) => (
              <span
                key={s.t}
                className={`rounded-xl py-2 text-center text-[12.5px] ${s.off ? 'line-through opacity-40' : ''}`}
                style={
                  s.on
                    ? { border: `1px solid ${lit(A)}`, color: lit(A) }
                    : { background: 'rgb(255 255 255 / 0.06)' }
                }
              >
                {s.t} · {s.n}
              </span>
            ))}
          </div>
        </div>
      </Frag>
      <Pill x={128} y={262} i={3} accent={A}>
        2 seats · ₹4,800
      </Pill>
    </Fit>
  );
}

/** For the cards: the confirmation, on WhatsApp and by email. */
export function UpdatesCard() {
  return (
    <Fit w={480} h={340}>
      <Bubble
        x={36}
        y={24}
        w={290}
        i={0}
        header="You’re booked: wheel workshop"
        text={
          'Sat 20 Sep, 10 am – 1 pm.\nWear clothes that can get muddy. Your vase ships on Monday.'
        }
        footer="Your Studio"
        time="8:14 pm"
        buttons={['Add to calendar', 'Directions']}
      />
      <Frag x={236} y={222} w={224} i={2}>
        <div className="p-3.5">
          <FragHead
            tool="Gmail"
            title="Email too"
            meta="Seats, address, parcel"
            right={<Tag tone="ok">Sent</Tag>}
          />
        </div>
      </Frag>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M326 150 C 360 150, 350 222, 348 222']}
        dots={[
          [326, 150],
          [348, 222],
        ]}
      />
    </Fit>
  );
}
