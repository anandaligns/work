import { content } from '@/content/lab/sell-and-book-online';

import { ToolMark } from '../ui/brand-logos';
import { Bleed, Fit } from './fit';
import { Card, Face, Head, Mark, onColour, Pill, Row, Tag, Wires } from './light-kit';
import {
  Bar,
  Between,
  ChatHead,
  Check,
  Choice,
  Col,
  Composer,
  Dot,
  Figure,
  FilterRow,
  FlowStep,
  Grid,
  Label,
  Message,
  More,
  Notice,
  Pane,
  Segments,
  SideList,
  type SideItem,
  StepMark,
  SystemNote,
  Tabs,
  Tile,
  Title,
  ViewChip,
} from './window-kit';

/**
 * Online Store & Bookings's mockups, from its sample studio — "Your Studio", a pottery studio selling
 * one-of-a-kind pieces and weekend wheel workshops — and Isha Kapoor's evening: a vase and two
 * seats, paid together, then confirmed. The three behind the system are drawn in the light kit on
 * a 480 × 340 canvas; how it works and what changes are the studio's own windows, running off the
 * panel (`Bleed`). Every figure is the product page's own.
 */

const A = content.accent;
const price = (value: string) => (
  <span className="text-[11.5px] font-semibold tabular-nums">{value}</span>
);

// --- the system behind every sale ------------------------------------------------------------

/** One checkout: pieces and seats, from the site, Instagram or a link, paid together. */
export function CheckoutMock() {
  const sources = [
    { tool: 'Your website forms', title: 'yourstudio.in', y: 40 },
    { tool: 'Instagram', title: 'Instagram', y: 118 },
    { tool: 'WhatsApp', title: 'Payment link', y: 196 },
  ];
  return (
    <Fit w={480} h={340}>
      {sources.map((s, i) => (
        <Card key={s.title} x={22} y={s.y} w={150} i={i}>
          <div className="p-2.5">
            <Head tool={s.tool} accent={A} title={s.title} />
          </div>
        </Card>
      ))}
      <Card x={206} y={34} w={252} i={3}>
        <div className="px-3.5 pt-3.5 pb-3">
          <Head icon="cart" accent={A} title="Checkout" meta="Isha Kapoor · 8:13 pm" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Mark icon="store" accent={A} size={26} />}
              title="Speckled vase"
              meta="Ships in 2 days"
              right={price('₹1,650')}
            />
            <Row
              lead={<Mark icon="calendar" accent={A} size={26} />}
              title="Workshop · 2 seats"
              meta="Sat 20 Sep, 10 am"
              right={price('₹4,800')}
            />
          </div>
          <span
            className="mt-2 block rounded-lg py-[7px] text-center text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Pay ₹6,450
          </span>
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={[
          'M172 66 C 190 66, 188 132, 206 132',
          'M172 144 C 190 144, 188 132, 206 132',
          'M172 222 C 190 222, 188 132, 206 132',
        ]}
        dots={[
          [172, 66],
          [172, 144],
          [172, 222],
          [206, 132],
        ]}
      />
      <Pill x={206} y={268} i={5} accent={A}>
        One checkout, one payment
      </Pill>
    </Fit>
  );
}

/** Paid before it's promised: the gateway confirms, and the piece and the seats are hers. */
export function PaidMock() {
  const methods = ['UPI app', 'Credit or debit card', 'Net banking'];
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={34} w={214} i={0}>
        <div className="p-3.5">
          <Head
            tool="Razorpay"
            accent={A}
            title="₹6,450"
            meta="To Your Studio"
            right={<Tag tone="ok">Paid</Tag>}
          />
          <div className="mt-2.5 flex flex-col gap-1.5">
            {methods.map((m, k) => (
              <span
                key={m}
                className="flex items-center gap-2 rounded-[8px] border px-2 py-[6px] text-[11px]"
                style={{ borderColor: k === 0 ? A : '#e6e7eb' }}
              >
                <span
                  className="grid size-3 place-items-center rounded-full border"
                  style={{ borderColor: k === 0 ? A : '#cfd2da' }}
                >
                  {k === 0 ? (
                    <span className="size-1.5 rounded-full" style={{ background: A }} />
                  ) : null}
                </span>
                {m}
              </span>
            ))}
          </div>
        </div>
      </Card>
      <Card x={270} y={44} w={188} i={2}>
        <div className="p-2.5">
          <Head icon="cart" accent={A} title="Order confirmed" meta="Speckled vase · ₹1,650" />
        </div>
      </Card>
      <Card x={270} y={140} w={188} i={3}>
        <div className="p-2.5">
          <Head icon="calendar" accent={A} title="2 seats held" meta="Sat 20 · 10 am" />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M236 104 C 254 104, 252 70, 270 70', 'M236 104 C 254 104, 252 166, 270 166']}
        dots={[
          [236, 104],
          [270, 70],
          [270, 166],
        ]}
      />
      <Pill x={22} y={276} i={5} accent={A}>
        Confirmed by the gateway
      </Pill>
    </Fit>
  );
}

/** Told what happens next: the booking on WhatsApp, the same by email, the parcel's tracking. */
export function ToldMock() {
  const fields = [
    ['When', 'Sat 20 Sep, 10 am – 1 pm'],
    ['Where', '14th Main, HSR Layout'],
  ];
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={24} w={256} i={0}>
        <div className="p-3.5">
          <Head
            tool="WhatsApp"
            accent={A}
            title="You’re booked, Isha"
            meta="Your Studio · 8:14 pm"
          />
          <p className="mt-2.5 rounded-lg bg-[#f5f5f7] px-2.5 py-2 text-[11px] leading-snug text-ink-2">
            See you on Saturday at 10 am. Wear clothes that can get muddy.
          </p>
          <div className="mt-2 divide-y divide-[#f0f0f3] border-y border-[#f0f0f3]">
            {fields.map(([k, v]) => (
              <p key={k} className="flex items-center justify-between py-[6px] text-[11px]">
                <span className="text-ink-3">{k}</span>
                <span className="font-medium">{v}</span>
              </p>
            ))}
          </div>
        </div>
      </Card>
      <Card x={306} y={48} w={152} i={2}>
        <div className="p-2.5">
          <Head tool="Gmail" accent={A} title="By email" meta="The same, sent" />
        </div>
      </Card>
      <Card x={238} y={238} w={220} i={3}>
        <div className="p-2.5">
          <Head
            tool="Shiprocket"
            accent={A}
            title="Vase ships Monday"
            meta="Tracking link to follow"
          />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M278 74 H 306', 'M150 196 V 264 H 238']}
        dots={[
          [278, 74],
          [306, 74],
          [150, 196],
          [238, 264],
        ]}
      />
      <Pill x={22} y={290} i={5} accent={A}>
        Sent on their own
      </Pill>
    </Fit>
  );
}

export const SELL_BEHIND = [CheckoutMock, PaidMock, ToldMock];

// --- how it works ------------------------------------------------------------------------------

/**
 * How it works, after Lightfield's list behind its sequence: the studio's pieces and sessions
 * down the left, each with a bar of four for how much is left, and in front the order's own
 * screen — this week's figures, what it does, and its steps: paid at checkout, stock and seats
 * updated, the confirmation, and the tracking when the parcel ships.
 */
const LEFT: {
  name: string;
  icon: 'store' | 'calendar';
  left: number;
  tag?: string;
  low?: boolean;
}[] = [
  { name: 'Speckled stoneware vase', icon: 'store', left: 0, tag: 'Sold' },
  { name: 'Glazed mug, blue', icon: 'store', left: 3 },
  { name: 'Cushion cover', icon: 'store', left: 1, tag: 'Low', low: true },
  { name: 'Canvas apron tote', icon: 'store', left: 4 },
  { name: 'Sat 20 · 10 am', icon: 'calendar', left: 0, tag: 'Full' },
  { name: 'Sat 20 · 2 pm', icon: 'calendar', left: 3 },
  { name: 'Sun 21 · 10 am', icon: 'calendar', left: 1 },
  { name: 'Sun 21 · 2 pm', icon: 'calendar', left: 0, tag: 'Full' },
];

export function SellHow() {
  return (
    <Bleed w={900} h={780}>
      <Pane x={56} y={168} w={520} h={700} i={0}>
        <Bar icon="store">
          <span className="font-semibold">Pieces and seats</span>
          <ViewChip label="This week" />
        </Bar>
        <FilterRow />
        <Grid
          cols="1fr 96px 1fr"
          head={[
            <Col key="p" icon="store">
              Piece or session
            </Col>,
            <Col key="l" icon="chart">
              Left
            </Col>,
            'Price',
          ]}
          rows={LEFT.map((item) => [
            <>
              <Dot icon={item.icon} accent={A} />
              <span className="truncate text-[12.5px] font-medium">{item.name}</span>
              {item.tag ? (
                <span
                  className="mr-2 ml-auto shrink-0 text-[10.5px] font-medium"
                  style={{ color: item.low ? '#b7791f' : '#868a9a' }}
                >
                  {item.tag}
                </span>
              ) : null}
            </>,
            <Segments key="s" done={item.left} colour={item.low ? '#f0b429' : A} />,
            null,
          ])}
        />
      </Pane>
      <Pane x={356} y={44} w={640} h={800} i={2}>
        <Bar icon="cart">
          <span className="font-semibold">Order, paid and confirmed</span>
          <More />
          <Tabs items={['Overview', 'Orders', 'Bookings', 'Payments']} />
        </Bar>
        <div className="px-8 pt-7">
          <Title tile={<Tile icon="cart" accent={A} />} title="Order, paid and confirmed" />
          <div className="mt-7">
            <Label>This week</Label>
            <div className="mt-2.5 flex gap-2.5">
              <Figure value="₹58,400" share="↑ 16%" label="Sales" />
              <Figure value="19" label="Pieces sold" />
              <Figure value="26 of 32" label="Workshop seats sold" />
              <Figure value="6" label="To ship" />
            </div>
          </div>
          <div className="mt-7">
            <Label>What it does</Label>
            <p className="mt-1.5 w-[560px] text-[15.5px] leading-[1.55]">
              Take the payment at checkout or at booking, keep stock and seats true, and tell the
              customer what happens next, on WhatsApp and email.
            </p>
          </div>
          <div className="mt-7">
            <Label>Steps</Label>
            <div className="mt-2.5">
              <FlowStep
                n={1}
                lead={<StepMark tool="Razorpay" />}
                title="Paid at checkout"
                line="UPI, card or net banking"
              />
              <Between>Immediately</Between>
              <FlowStep
                n={2}
                lead={<StepMark icon="store" />}
                title="Stock and seats updated"
                line="the vase sells once"
              />
              <Between>Immediately</Between>
              <FlowStep
                n={3}
                lead={<StepMark tool="WhatsApp" />}
                title="Confirmation on WhatsApp and email"
                line="what to bring, where to come"
              />
              <Between>When it ships</Between>
              <FlowStep
                n={4}
                lead={<StepMark tool="Shiprocket" />}
                title="Tracking sent"
                line="packed in the studio"
              />
            </div>
          </div>
        </div>
      </Pane>
    </Bleed>
  );
}

// --- what changes ------------------------------------------------------------------------------

/**
 * What changes, after Lightfield's chat over its workspace: Isha's confirmation on WhatsApp at the
 * front — her paid order, the booking with what to bring, and when the vase ships — and behind it
 * the studio's admin, the week's sessions and today's orders down the left with hers open: what
 * she bought, how she paid, and what happens next.
 */
const face = (name: string) => <Face name={name} tone={`color-mix(in srgb, ${A} 14%, white)`} />;
const person = (
  name: string,
  meta: string,
  mark: string,
  open = false,
  muted = false,
): SideItem => ({
  lead: face(name),
  title: name,
  meta,
  mark: <ToolMark tool={mark} size={13} />,
  open,
  muted,
});
const session = (title: string, meta: string): SideItem => ({
  lead: <Dot icon="calendar" accent={A} />,
  title,
  meta,
});

export function SellBenefits() {
  return (
    <Bleed w={900} h={820}>
      <Pane x={232} y={262} w={720} h={640} i={0}>
        <div className="flex h-full">
          <SideList
            icon="home"
            title="Today"
            count="This week"
            groups={[
              {
                title: 'Workshops',
                count: '26 of 32 seats',
                items: [
                  session('Evening throw', 'Wed 17 · 5 of 8 seats'),
                  session('Kids’ clay club', 'Thu 18 · 9 of 10 seats'),
                  session('Glazing class', 'Fri 19 · 6 of 6 seats'),
                  session('Wheel workshop', 'Sat 20, 10 am · 8 of 8'),
                  session('Wheel workshop', 'Sun 21, 10 am · 6 of 8'),
                ],
              },
              {
                title: 'Orders and bookings',
                count: '5',
                items: [
                  person('Isha Kapoor', 'Vase + 2 workshop seats', 'Razorpay', true),
                  person('Rohit Nair', 'Set of 4 mugs · to pack', 'Razorpay'),
                  person('Maya D', 'Workshop · Sun 2 pm', 'Razorpay'),
                  person('Karan S', 'Serving bowl · delivered', 'Razorpay'),
                  person('Arjun P', 'Workshop · refunded', 'Razorpay', false, true),
                ],
              },
            ]}
          />
          <div className="min-w-0 flex-1">
            <Bar icon="people">
              <span className="text-ink-2">Customers</span>
              <span className="text-ink-3">/</span>
              <span className="font-semibold">Isha Kapoor</span>
              <More />
            </Bar>
            <div className="px-7 pt-6">
              <Title
                tile={<Tile initials="IK" accent={A} />}
                title="Isha Kapoor"
                after={<Tag tone="ok">Paid</Tag>}
              />
              <div className="mt-7">
                <Label>Bought</Label>
                <div className="mt-2 flex w-[440px] flex-col gap-2 text-[13px] whitespace-nowrap">
                  <span className="flex items-center gap-2.5">
                    <Dot icon="store" accent={A} />
                    Speckled stoneware vase
                    <span className="ml-auto font-medium tabular-nums">₹1,650</span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    <Dot icon="calendar" accent={A} />
                    Wheel workshop · 2 seats
                    <span className="ml-auto font-medium tabular-nums">₹4,800</span>
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Label>Paid</Label>
                <span className="mt-2 flex items-center gap-2.5 text-[13px] whitespace-nowrap">
                  <ToolMark tool="Razorpay" size={15} />
                  ₹6,450 by UPI
                  <span className="text-ink-3">8:13 pm · confirmed by the gateway</span>
                </span>
              </div>
              <div className="mt-6">
                <Label>Next steps</Label>
                <ul className="mt-1">
                  <Check done title="Seats held" meta="Sat 20 Sep, 10 am" accent={A} />
                  <Check done title="Confirmation sent" meta="WhatsApp and email" accent={A} />
                  <Check
                    done={false}
                    title="Vase ships"
                    meta="Monday, with the tracking link"
                    accent={A}
                  />
                </ul>
              </div>
              <div className="mt-6 w-[470px] rounded-[14px] border border-[#e4e6eb] p-4">
                <Label>Wheel workshop — Sat 20 Sep</Label>
                <p className="mt-2 text-[13px] font-semibold">
                  10 am – 1 pm · 14th Main, HSR Layout
                </p>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-2">
                  8 of 8 seats sold, so the session has closed itself. Clay, tools and firing
                  included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Pane>
      <Pane x={36} y={36} w={428} h={524} i={2} float>
        <div className="flex h-full flex-col">
          <ChatHead tool="WhatsApp" title="Isha Kapoor" meta="WhatsApp · from Your Studio" />
          <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-4 pt-3.5">
            <Notice tool="Razorpay" meta="Order · 8:13 pm">
              Speckled stoneware vase and a wheel workshop for 2. <b>₹6,450 paid by UPI.</b>
            </Notice>
            <SystemNote accent={A}>Sent on its own · 8:14 pm</SystemNote>
            <Message own time="8:14 pm" accent={A}>
              You’re booked, Isha: the wheel workshop, Saturday 20 Sep, 10 am – 1 pm, at 14th Main,
              HSR Layout. Wear clothes that can get muddy.
            </Message>
            <div className="flex justify-end gap-1.5">
              <Choice on accent={A}>
                Add to calendar
              </Choice>
              <Choice accent={A}>Directions</Choice>
            </div>
            <Message own time="8:14 pm" accent={A}>
              Your vase ships on Monday; we’ll send the tracking link.
            </Message>
          </div>
          <Composer accent={A} />
        </div>
      </Pane>
    </Bleed>
  );
}
