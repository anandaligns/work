import product from '@/content/products/booking-payment-workflows';

import { ToolMark } from '../ui/brand-logos';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, deep, Face, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Chip, Dot, Field, Stat } from './mock-parts';

/**
 * Booking & Payment Workflows' mockups, in the light kit, from the page's own sample business — a
 * Salon & Beauty Studio: Riya's hair colour booked with Ananya for Saturday at 6 pm, the ₹500
 * deposit, the confirmation and the reminder the day before, cancellations handled by the policy,
 * and the afternoon's calendar, stylist by stylist. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.salon!.accent;

/** Online booking: a stylist chosen, the slots really free, and a deposit to hold one. */
export function BookMock() {
  const slots = [
    {
      t: 'Hair colour · 6:00 pm',
      m: 'With Ananya · 90 min · ₹2,500',
      tag: <Tag tone="wait">1 left</Tag>,
    },
    { t: 'Haircut · 5:30 pm', m: 'With Rhea · 45 min · ₹800' },
    { t: 'Facial · 6:30 pm', m: 'With Farah · 60 min · ₹1,800' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={18} w={282} i={0}>
        <div className="p-3">
          <Head icon="calendar" accent={P} title="Book a slot" meta="salonbeautystudio.in" />
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip accent={A}>Any</Chip>
            <Chip on accent={A}>
              Ananya
            </Chip>
            <Chip accent={A}>Rhea</Chip>
            <Chip accent={A}>Farah</Chip>
          </div>
          <p className="mt-2.5 text-[9.5px] text-ink-3">Free on Saturday</p>
          <div className="divide-y divide-[#f0f0f3]">
            {slots.map((r) => (
              <Row
                key={r.t}
                lead={<Dot icon="calendar" tone={P} />}
                title={r.t}
                meta={r.m}
                right={r.tag}
              />
            ))}
          </div>
          <span
            className="mt-2 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Reserve · ₹500 deposit
          </span>
        </div>
      </Card>
      <Card x={320} y={70} w={180} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2.5">
            <Face name="Ananya S" />
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-semibold">Ananya</span>
              <span className="block truncate text-[10px] text-ink-3">Senior colourist</span>
            </span>
          </div>
          <div className="mt-2.5">
            <Stat label="Booked online this month" value="71%" delta="18 pts" accent={A} />
          </div>
        </div>
      </Card>
      <Pill x={320} y={214} i={4} accent={P} icon="calendar">
        Only the slots really free
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M302 110 C 312 110, 310 104, 320 104']}
        dots={[[302, 110]]}
      />
    </Fit>
  );
}

/** Payments: the deposit at booking, UPI first, and the gateway's receipt. */
export function PayMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={264} i={0}>
        <div className="p-3">
          <Head icon="card" accent={P} title="Pay the deposit" meta="Sat 20 Sep · 6:00 pm" />
          <p className="mt-2 text-[10.5px] text-ink-2">Hair colour · with Ananya · 90 min</p>
          <p className="mt-2 text-[24px] leading-none font-semibold">₹500</p>
          <p className="mt-1 text-[10px] text-ink-3">₹2,000 at the visit</p>
          <div className="mt-2.5 flex gap-1.5">
            <Chip on accent={A}>
              UPI
            </Chip>
            <Chip accent={A}>Card</Chip>
            <Chip accent={A}>Netbanking</Chip>
          </div>
          <span
            className="mt-3 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Pay ₹500
          </span>
          <p className="mt-1.5 text-center text-[9.5px] text-ink-3">
            Free cancellation until Fri, 6 pm
          </p>
        </div>
      </Card>
      <Card x={302} y={110} w={198} i={2}>
        <div className="p-3">
          <Head
            tool="Razorpay"
            accent={P}
            title="Received"
            meta="UPI · just now"
            right={<Tag tone="ok">Paid</Tag>}
          />
          <p className="mt-2 text-[10.5px] text-ink-2">Receipt sent to Riya</p>
        </div>
      </Card>
      <Pill x={302} y={206} i={4} accent={P} icon="card">
        Deposit taken at booking
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M284 140 C 294 140, 292 140, 302 140']}
        dots={[[284, 140]]}
      />
    </Fit>
  );
}

/** Confirmations: what Riya gets at once, and the reminder the day before. */
export function ConfirmedMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={262} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <p className="text-[10px] text-ink-3">You’re booked</p>
          <p className="mt-1 text-[20px] leading-none font-semibold">Sat 20 Sep</p>
          <p className="mt-1 text-[10px] text-ink-2">Hair colour · 6:00 pm · with Ananya</p>
          <p className="mt-0.5 text-[10px]" style={{ color: deep(A) }}>
            Deposit ₹500 paid · receipt sent
          </p>
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Dot icon="calendar" tone={P} />}
              title="Add to calendar"
              meta="Sat, 6:00 pm"
            />
            <Row
              lead={<Dot icon="repeat" tone={P} />}
              title="Change slot"
              meta="Free until Fri, 6 pm"
            />
            <Row
              lead={<Dot icon="pin" tone={P} />}
              title="Getting here"
              meta="Map pin and parking"
            />
          </div>
        </div>
      </Card>
      <Card x={300} y={112} w={200} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <ToolMark tool="WhatsApp" size={15} />
            <span className="text-[10.5px] font-semibold">Salon & Beauty Studio</span>
          </div>
          <p className="mt-1.5 text-[10.5px] leading-[1.45] text-ink-2">
            See you tomorrow at 6 pm with Ananya. Reply 1 to confirm, 2 to change.
          </p>
          <div className="mt-2 flex justify-end">
            <Tag tone="ok">Confirmed · 1</Tag>
          </div>
        </div>
      </Card>
      <Pill x={40} y={280} i={4} accent={P} icon="check">
        Everything they need, before they ask
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M282 140 C 292 140, 290 140, 300 140']}
        dots={[[282, 140]]}
      />
    </Fit>
  );
}

/** Cancellations: changes and cancellations handled by the policy, the deposit dealt with each time. */
export function CancellationsMock() {
  const rows = [
    {
      who: 'Vikram J',
      m: 'Haircut · moved to next Saturday',
      tag: (
        <Tag tone="accent" accent={A}>
          Changed
        </Tag>
      ),
    },
    { who: 'Meghna S', m: 'Facial · cancelled a day before', tag: <Tag tone="ok">Refunded</Tag> },
    { who: 'Arjun P', m: 'Colour · 2 h before · kept ₹500', tag: <Tag tone="wait">Late</Tag> },
    {
      who: 'Sana K',
      m: 'Keratin · didn’t come · kept ₹1,000',
      tag: (
        <Tag tone="accent" accent={A}>
          No-show
        </Tag>
      ),
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={300} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="repeat" accent={P} title="Cancellations and changes" meta="This month" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {rows.map((r) => (
              <Row
                key={r.who}
                lead={<Face name={r.who} />}
                title={r.who}
                meta={r.m}
                right={r.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={338} y={84} w={162} i={2}>
        <div className="flex flex-col gap-3 p-3">
          <Stat label="Confirmed by reply" value="88%" accent={A} size={18} />
          <Stat label="No-shows" value="1" accent={A} size={18} />
        </div>
      </Card>
      <Pill x={40} y={270} i={4} accent={P} icon="shield">
        Your policy, applied every time
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M320 110 C 330 110, 328 120, 338 120']}
        dots={[[320, 110]]}
      />
    </Fit>
  );
}

/** The calendar: every stylist's afternoon, Riya's new online booking among them. */
export function ChartMock() {
  const hours = ['12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'];
  const people = [
    {
      who: 'Ananya',
      bars: [
        { from: 0, to: 2, t: 'Mehta · global colour' },
        { from: 3, to: 5, t: 'Iyer · highlights' },
        { from: 6, to: 7, t: 'Riya · online', fresh: true },
      ],
    },
    {
      who: 'Rhea',
      bars: [
        { from: 0, to: 1, t: 'Rao · cut' },
        { from: 1, to: 2, t: 'Das · cut' },
        { from: 5, to: 6, t: 'Sharma · cut' },
      ],
    },
    {
      who: 'Farah',
      bars: [
        { from: 2, to: 3, t: 'Nair · facial' },
        { from: 6, to: 7, t: 'Kavya · facial' },
      ],
    },
    { who: 'Vikas', bars: [{ from: 5, to: 6, t: 'Walk-in · Shetty' }] },
    { who: 'Bridal room', bars: [{ from: 0, to: 5, t: 'Bridal party · 5 hours' }] },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={24} w={824} i={0}>
        <div className="p-3.5">
          <Head icon="calendar" accent={P} title="Calendar" meta="Sat 20 Sep · afternoon" />
          <div className="mt-3 grid grid-cols-[92px_repeat(7,minmax(0,1fr))] text-[9.5px] text-ink-3">
            <span />
            {hours.map((d) => (
              <span key={d} className="border-l border-[#f0f0f3] pl-1.5">
                {d}
              </span>
            ))}
          </div>
          <div className="mt-1.5 flex flex-col gap-1.5">
            {people.map((r) => (
              <div
                key={r.who}
                className="grid grid-cols-[92px_repeat(7,minmax(0,1fr))] items-center gap-x-1"
              >
                <span className="truncate text-[10.5px] font-medium">{r.who}</span>
                {r.bars.map((b) => (
                  <span
                    key={b.t}
                    className="truncate rounded-[7px] px-2 py-1.5 text-[10px] font-medium"
                    style={{
                      gridColumn: `${b.from + 2} / ${b.to + 2}`,
                      gridRow: 1,
                      background:
                        'fresh' in b && b.fresh ? A : `color-mix(in srgb, ${A} 16%, white)`,
                      color: 'fresh' in b && b.fresh ? onColour(A) : undefined,
                    }}
                  >
                    {b.t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Pill x={320} y={296} i={4} accent={P} icon="people">
        Every stylist’s day, one calendar
      </Pill>
    </Fit>
  );
}

export const BOOKING_MOCKS = [BookMock, PayMock, ConfirmedMock, CancellationsMock, ChartMock];

/** How it's built: services, prices and rules set once, and Riya's deposit that follows them. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function BookingHowScene({ box = false }: { box?: boolean }) {
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={24} w={320} i={0}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head
              icon="layers"
              accent={P}
              title="Services and prices"
              meta="salonbeautystudio.in/admin"
            />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              <Row title="Haircut · 45 min" meta="Weekday ₹700 · weekend ₹800" />
              <Row title="Hair colour · 90 min" meta="Weekday ₹2,300 · weekend ₹2,500" />
              <Row title="Facial · 60 min" meta="Weekday ₹1,600 · weekend ₹1,800" />
            </div>
          </div>
        </Card>
        <Card x={24} y={196} w={320} i={1}>
          <div className="grid grid-cols-2 gap-2 p-3">
            <Field label="Deposit" value="20% at booking" accent={A} />
            <Field label="Free cancellation" value="Until 24 h before" accent={A} />
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={434} y={60} w={300} i={2}>
          <div className="p-3.5">
            <Head icon="card" accent={P} title="Pay the deposit" meta="Hair colour · Sat 6 pm" />
            <p className="mt-2 text-[22px] leading-none font-semibold">₹500</p>
            <p className="mt-1.5 text-[10px] text-ink-3">Free cancellation until Fri, 6 pm</p>
          </div>
        </Card>
        <Pill x={434} y={196} i={4} accent={P}>
          Your rules, followed on every booking
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M376 116 H 438 V 276', 'M376 246 H 438 V 276']}
          dots={[
            [376, 116],
            [438, 276],
            [376, 246],
            [438, 276],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M344 100 C 389 100, 389 110, 434 110', 'M344 230 C 389 230, 389 130, 434 130']}
          dots={[
            [344, 100],
            [344, 230],
          ]}
        />
      )}
    </Fit>
  );
}

export function BookingHow() {
  return <BookingHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function BookingHowBox() {
  return <BookingHowScene box />;
}
