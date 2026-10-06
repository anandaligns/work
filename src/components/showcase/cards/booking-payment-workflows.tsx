'use client';

import { Icon } from '../../ui/icon';
import { Bubble, Chip, Line, Money, Press, Status, Track } from '../kit';
import { App, Chat, Sheet, Slot } from '../sheet';

/**
 * Booking & Payment Workflows' five screens, from the page's sample business — a Salon & Beauty
 * Studio: Riya's hair colour with Ananya on Saturday at 6 pm, the ₹500 deposit, the confirmation
 * and the reminder, changes handled by the policy, and the afternoon's calendar.
 */

/** Online booking: a stylist chosen, the slots really free. */
export function Slots() {
  return (
    <App title="Book a slot" sub="Saturday, 20 Sep" icon="calendar">
      <div className="flex gap-1.5">
        <Chip on>Ananya</Chip>
        <Chip>Rhea</Chip>
        <Chip>Farah</Chip>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        <Slot off>4:30</Slot>
        <Slot>5:00</Slot>
        <Slot off>5:30</Slot>
        <Slot on>6:00</Slot>
        <Slot>6:30</Slot>
        <Slot off>7:00</Slot>
      </div>
      <Line icon="spark" title="Hair colour" meta="Ananya · 90 min" right={<Money>₹2,500</Money>} />
      <Press className="mt-1">Reserve · ₹500 deposit</Press>
    </App>
  );
}

/** Payments: the deposit at booking, UPI first. */
export function Deposit() {
  return (
    <App title="Pay the deposit" sub="Sat 6 pm · hair colour" icon="lock">
      <p className="text-center font-display text-[38px] leading-none text-ink">₹500</p>
      <p className="mt-1 text-center text-[11px] text-ink-2">₹2,000 at the visit</p>
      <div className="mt-3 flex justify-center gap-1.5">
        <Chip on>UPI</Chip>
        <Chip>Card</Chip>
        <Chip>Netbanking</Chip>
      </div>
      <Press className="mt-3">Pay ₹500</Press>
      <p className="mt-2 flex items-center justify-center gap-1 text-[10.5px] text-ink-2">
        <Icon name="clock" size={10} /> Free to cancel until Fri, 6 pm
      </p>
    </App>
  );
}

/** Confirmations: what Riya gets at once, and the reminder the day before. */
export function Confirmed() {
  return (
    <Chat name="Beauty Studio" meta="Business account" business>
      <Bubble from="us" meta="Thu 8:12 pm">
        You’re booked, Riya — hair colour with Ananya, Sat 20 Sep at 6 pm. Deposit ₹500 paid.
      </Bubble>
      <Bubble from="us" meta="Fri 6:00 pm">
        See you tomorrow at 6 pm.
      </Bubble>
      <Bubble meta="Fri 6:04 pm">Confirmed, thank you!</Bubble>
    </Chat>
  );
}

/** Cancellations: changes handled by the policy, the deposit dealt with each time. */
export function Changes() {
  return (
    <Sheet label="Changes · Sep" foot={['No-shows', '1']}>
      <Line face="Vikram J" title="Vikram J" meta="Next Saturday" right={<Status>Moved</Status>} />
      <Line face="Meghna S" title="Meghna S" meta="A day before" right={<Status>Refund</Status>} />
      <Line
        face="Arjun P"
        title="Arjun P"
        meta="2 h before"
        right={<Status tone="wait">Kept ₹500</Status>}
      />
      <Line
        face="Sana K"
        title="Sana K"
        meta="Didn’t come"
        right={<Status tone="wait">Kept</Status>}
      />
    </Sheet>
  );
}

/** The calendar: every stylist's afternoon, Riya's new booking among them. */
export function Calendar() {
  const rows: [string, [number, number, string, boolean?][]][] = [
    [
      'Ananya',
      [
        [0, 2, 'Cut'],
        [3, 3, 'Riya · colour', true],
      ],
    ],
    [
      'Rhea',
      [
        [0.5, 2, 'Facial'],
        [4, 2, 'Cut'],
      ],
    ],
    [
      'Farah',
      [
        [0, 2, 'Cut'],
        [2.5, 3.5, 'Bridal'],
      ],
    ],
  ];
  return (
    <Sheet label="Sat 20 · afternoon" live foot={['Booked online', '71%']}>
      <div className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-y-2">
        <span />
        <div className="flex justify-between text-[9.5px] text-ink-3">
          <span>4 pm</span>
          <span>5</span>
          <span>6</span>
          <span>7 pm</span>
        </div>
        {rows.map(([who, blocks]) => (
          <div key={who} className="contents">
            <span className="text-[11px] leading-8 text-ink-2">{who}</span>
            <div className="relative h-8 rounded-md bg-fill">
              {blocks.map(([start, span, what, lit]) => (
                <span
                  key={what}
                  className={`absolute inset-y-0.5 truncate rounded-[5px] px-1.5 text-[9.5px] leading-7 font-medium ${lit ? 'sc-chip--on' : 'sc-tile--accent'}`}
                  style={{ left: `${(start / 6) * 100}%`, width: `${(span / 6) * 100}%` }}
                >
                  {what}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Track
          steps={[
            { title: 'Riya booked online', meta: 'Ananya · 6 pm · deposit paid', done: true },
          ]}
        />
      </div>
    </Sheet>
  );
}
