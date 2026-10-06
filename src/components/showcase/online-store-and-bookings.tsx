'use client';

import { content } from '@/content/lab/sell-and-book-online';

import { ToolMark } from '../ui/brand-logos';
import {
  Bubble,
  Checks,
  Chip,
  Line,
  Metric,
  Money,
  Mono,
  Panel,
  Press,
  Stage,
  Status,
  Step,
  Toast,
} from './kit';

/**
 * Online Store & Bookings' solution page, in the showcase kit, from its sample studio — "Your
 * Studio", a pottery studio selling one-of-a-kind pieces and weekend wheel workshops — and Isha
 * Kapoor's evening: a vase and two seats, paid together, then confirmed.
 */
const A = content.accent;

/** One checkout: pieces and seats, from the site, Instagram or a link, paid together. */
export function CheckoutMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={50} w={190} label="Ways in">
        <div className="flex flex-col gap-2">
          <Step turn n={3} i={0} icon="globe" title="yourstudio.in" />
          <Step turn n={3} i={1} tool="Instagram" title="Instagram" />
          <Step turn n={3} i={2} tool="WhatsApp" title="Payment link" />
        </div>
      </Panel>
      <Panel
        x={190}
        y={20}
        w={290}
        label="Checkout · Isha Kapoor"
        badge={<Status tone="accent">8:13 pm</Status>}
        i={2}
      >
        <div className="px-2 pb-1">
          <Line
            icon="store"
            title="Speckled vase"
            meta="Ships in 2 days"
            right={<Money>₹1,650</Money>}
          />
          <Line
            icon="calendar"
            title="Workshop · 2 seats"
            meta="Sat 20 Sep, 10 am"
            right={<Money>₹4,800</Money>}
          />
          <Press className="mt-2 mb-1">Pay ₹6,450</Press>
        </div>
      </Panel>
      <Toast
        x={230}
        y={250}
        w={240}
        icon="cart"
        title="One checkout, one payment"
        meta="Pieces and seats together"
      />
    </Stage>
  );
}

/** Paid before it's promised: the gateway confirms, and the piece and the seats are hers. */
export function PaidMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={230} label="Razorpay" badge={<Status>Paid</Status>}>
        <div className="px-2 pb-2">
          <p className="font-display text-[34px] leading-none text-ink">₹6,450</p>
          <p className="mt-1 text-[11.5px] text-ink-2">To Your Studio</p>
          <div className="mt-3 flex flex-col gap-1.5">
            <Chip on>UPI app</Chip>
            <Chip>Credit or debit card</Chip>
            <Chip>Net banking</Chip>
          </div>
        </div>
      </Panel>
      <Panel x={236} y={60} w={240} label="Confirmed by the gateway" i={2}>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={2}
            i={0}
            icon="cart"
            title="Order confirmed"
            meta="Speckled vase · ₹1,650"
            status="Hers"
          />
          <Step
            turn
            n={2}
            i={1}
            icon="calendar"
            title="2 seats held"
            meta="Sat 20 · 10 am"
            status="Held"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** Told what happens next: the booking on WhatsApp, the same by email, the parcel's tracking. */
export function ToldMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={290} label="WhatsApp · 8:14 pm" badge={<Status>Sent</Status>}>
        <div className="px-2 pb-1">
          <p className="text-[14px] font-medium text-ink">You’re booked, Isha</p>
          <p className="mt-2 rounded-xl bg-fill px-3 py-2 text-[12px] leading-snug text-ink">
            See you on Saturday at 10 am. Wear clothes that can get muddy.
          </p>
          <div className="mt-1">
            <Line icon="clock" title="When" meta="Sat 20 Sep, 10 am – 1 pm" />
            <Line icon="pin" title="Where" meta="14th Main, HSR Layout" />
          </div>
        </div>
      </Panel>
      <Toast x={290} y={100} w={196} tool="Gmail" title="By email" meta="The same, sent" />
      <Toast
        x={250}
        y={250}
        w={230}
        tool="Shiprocket"
        title="Vase ships Monday"
        meta="Tracking link to follow"
        i={2}
      />
    </Stage>
  );
}

/** How much is left, as four bars. */
function Left({ left, low = false }: { left: number; low?: boolean }) {
  return (
    <span className="flex gap-[3px]">
      {[0, 1, 2, 3].map((k) => (
        <span
          key={k}
          className={`h-1.5 w-4 rounded-full ${k < left ? (low ? 'bg-[#f0b429]' : 'sc-meter') : 'bg-line'}`}
        />
      ))}
    </span>
  );
}

/** How it works: what's left of each piece and session, and the order's own screen and steps. */
export function SellHow() {
  const left: [string, 'store' | 'calendar', number, string?][] = [
    ['Speckled vase', 'store', 0, 'Sold'],
    ['Glazed mug, blue', 'store', 3],
    ['Cushion cover', 'store', 1, 'Low'],
    ['Sat 20 · 10 am', 'calendar', 0, 'Full'],
    ['Sat 20 · 2 pm', 'calendar', 3],
    ['Sun 21 · 10 am', 'calendar', 1],
  ];
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={150} w={256} label="Pieces and seats · left">
        <div className="px-2">
          {left.map(([name, icon, n, tag]) => (
            <Line
              key={name}
              icon={icon}
              title={name}
              meta={tag}
              right={<Left left={n} low={tag === 'Low'} />}
            />
          ))}
        </div>
      </Panel>
      <Panel x={296} y={20} w={500} label="Order, paid and confirmed" live i={2}>
        <div className="grid grid-cols-4 gap-3 px-3 pb-3">
          <Metric label="Sales" value={58400} prefix="₹" delta="16%" size={22} />
          <Metric label="Pieces sold" value={19} size={22} />
          <Metric label="Seats sold" value="26/32" size={22} />
          <Metric label="To ship" value={6} size={22} />
        </div>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            tool="Razorpay"
            title="1 · Paid at checkout"
            meta="UPI, card or net banking"
          />
          <Step
            turn
            n={4}
            i={1}
            icon="store"
            title="2 · Stock and seats updated"
            meta="Immediately · the vase sells once"
          />
          <Step
            turn
            n={4}
            i={2}
            tool="WhatsApp"
            title="3 · Confirmation, WhatsApp and email"
            meta="What to bring, where to come"
          />
          <Step
            turn
            n={4}
            i={3}
            tool="Shiprocket"
            title="4 · Tracking sent"
            meta="When it ships · packed in the studio"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** What changes: Isha's confirmation on WhatsApp, and her order in the studio's admin. */
export function SellBenefits() {
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={20} w={340} label="WhatsApp · from Your Studio" live>
        <div className="flex flex-col gap-2 px-1 pb-2">
          <div className="sc-rise flex items-center gap-2 rounded-xl border border-line bg-fill px-3 py-2 text-[12px] text-ink">
            <ToolMark tool="Razorpay" size={14} /> ₹6,450 paid by UPI · order 8:13 pm
          </div>
          <Bubble from="us" meta="Sent on its own · 8:14 pm" i={2}>
            You’re booked for the wheel workshop — Sat 20 Sep, 10 am. Wear clothes that can get
            muddy. Your vase ships Monday.
          </Bubble>
          <div className="sc-rise flex justify-end" style={{ ['--i' as string]: 3 }}>
            <Chip on>Directions</Chip>
          </div>
        </div>
      </Panel>
      <Panel
        x={340}
        y={170}
        w={400}
        label="Orders and bookings · Isha Kapoor"
        badge={<Status>Paid</Status>}
        i={3}
      >
        <div className="px-2 pb-2">
          <Mono>Bought</Mono>
          <div className="mt-1">
            <Line icon="store" title="Speckled vase" right={<Money>₹1,650</Money>} />
            <Line icon="calendar" title="Workshop · 2 seats" right={<Money>₹4,800</Money>} />
          </div>
          <Mono className="mt-3 mb-2">Next steps</Mono>
          <Checks
            items={[
              { text: 'Seats held · Sat 20 Sep, 10 am', done: true },
              { text: 'Confirmation sent · WhatsApp and email', done: true },
              { text: 'Vase ships · Monday, with tracking' },
            ]}
          />
        </div>
      </Panel>
    </Stage>
  );
}
