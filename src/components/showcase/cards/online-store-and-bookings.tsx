'use client';

import { Bubble, Chip, Line, Money, Press, Status, Step } from '../kit';
import { App, Chat, Picture, Sheet, Web } from '../sheet';

/**
 * Online Store & Bookings' five screens, from its sample studio — "Your Studio", a pottery studio
 * selling one-of-a-kind pieces and weekend wheel workshops — and Isha Kapoor's evening: a vase and
 * two seats, paid together, confirmed, and what's left after.
 */

/** The shop: a one-of-a-kind piece and the weekend's workshop, on one page. */
export function Shop() {
  return (
    <Web address="yourstudio.in" className="px-3.5 pt-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Picture h={84} icon="store" />
          <p className="mt-1.5 text-[11.5px] font-medium">Speckled vase</p>
          <p className="text-[10.5px] text-ink-2">₹1,650 · one of a kind</p>
        </div>
        <div>
          <Picture h={84} icon="calendar" style={{ opacity: 0.8 }} />
          <p className="mt-1.5 text-[11.5px] font-medium">Wheel workshop</p>
          <p className="text-[10.5px] text-ink-2">₹2,400 a seat</p>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <Chip on>Sat 20 · 10 am</Chip>
        <Chip>Sat 20 · 2 pm</Chip>
      </div>
      <Press className="mt-2.5">Add 2 seats</Press>
    </Web>
  );
}

/** One checkout: the piece and the seats, paid together. */
export function Checkout() {
  return (
    <App title="Checkout" sub="Isha Kapoor · 8:13 pm" icon="cart">
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
      <div className="mt-2 flex gap-1.5">
        <Chip on>UPI</Chip>
        <Chip>Card</Chip>
        <Chip>Net banking</Chip>
      </div>
      <Press className="mt-3">Pay ₹6,450</Press>
    </App>
  );
}

/** Paid before it's promised: the gateway confirms, and the piece and seats are hers. */
export function Paid() {
  return (
    <Sheet label="Razorpay" badge={<Status>Paid</Status>}>
      <p className="font-display text-[34px] leading-none text-ink">₹6,450</p>
      <p className="mt-1 text-[11px] text-ink-2">UPI · to Your Studio</p>
      <div className="mt-3 flex flex-col gap-1.5">
        <Step
          turn
          n={2}
          i={0}
          icon="cart"
          title="Order confirmed"
          meta="The vase is hers"
          className="!py-2"
        />
        <Step
          turn
          n={2}
          i={1}
          icon="calendar"
          title="2 seats held"
          meta="Sat 20 · 10 am"
          className="!py-2"
        />
      </div>
    </Sheet>
  );
}

/** Told what happens next: the booking on WhatsApp, a minute later. */
export function Told() {
  return (
    <Chat name="Your Studio" meta="Business account" business>
      <span className="self-center rounded-full bg-white px-2.5 py-1 text-[10px] text-ink-2">
        ₹6,450 paid by UPI · 8:13 pm
      </span>
      <Bubble from="us" meta="8:14 pm">
        You’re booked for the wheel workshop — Sat 20 Sep, 10 am. Wear clothes that can get muddy.
        Your vase ships Monday.
      </Bubble>
      <div className="flex justify-end">
        <Chip on>Directions</Chip>
      </div>
    </Chat>
  );
}

/** What's left: each piece and session, updated the moment it sells. */
export function Left() {
  const left: [string, 'store' | 'calendar', number, string?][] = [
    ['Speckled vase', 'store', 0, 'Sold'],
    ['Blue mug', 'store', 3],
    ['Sat 20 · 10 am', 'calendar', 0, 'Full'],
    ['Sun 21 · 10 am', 'calendar', 1, 'Low'],
  ];
  return (
    <Sheet label="Left" live foot={['Seats sold', '26 of 32']}>
      {left.map(([name, icon, n, tag]) => (
        <Line
          key={name}
          icon={icon}
          title={name}
          meta={tag ?? `${n} left`}
          right={
            <span className="flex gap-[3px]">
              {[0, 1, 2, 3].map((k) => (
                <span
                  key={k}
                  className={`h-1.5 w-3.5 rounded-full ${k < n ? (tag === 'Low' ? 'bg-[#f0b429]' : 'sc-meter') : 'bg-line'}`}
                />
              ))}
            </span>
          }
        />
      ))}
    </Sheet>
  );
}
