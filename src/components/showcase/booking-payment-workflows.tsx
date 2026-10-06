'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/booking-payment-workflows';

import { BRANDS } from '../visuals/concept-sites';
import { Card, Chip, Field, Line, Metric, Panel, Press, Stage, Status, Step, Toast } from './kit';

/**
 * Booking & Payment Workflows, in the showcase kit, from the page's own sample business — a Salon &
 * Beauty Studio: Riya's hair colour booked with Ananya for Saturday at 6 pm, the ₹500 deposit, the
 * confirmation and the reminder the day before, cancellations handled by the policy, and the
 * afternoon's calendar, stylist by stylist.
 */
const P = product.accent;
const A = BRANDS.salon!.accent;

/** Online booking: a stylist chosen, the slots really free, and a deposit to hold one. */
export function BookMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={310} label="Book a slot · Saturday" live>
        <div className="px-1">
          <div className="flex flex-wrap gap-1.5 px-1 pb-2.5">
            <Chip>Any</Chip>
            <Chip on>Ananya</Chip>
            <Chip>Rhea</Chip>
            <Chip>Farah</Chip>
          </div>
          <div className="flex flex-col gap-2">
            <Step
              lit
              icon="calendar"
              title="Hair colour · 6:00 pm"
              meta="Ananya · 90 min · ₹2,500"
              status="1 left"
              tone="wait"
            />
            <Step icon="calendar" title="Haircut · 5:30 pm" meta="Rhea · 45 min · ₹800" />
            <Step icon="calendar" title="Facial · 6:30 pm" meta="Farah · 60 min · ₹1,800" />
          </div>
          <Press className="mt-2.5 mb-1">Reserve · ₹500 deposit</Press>
        </div>
      </Panel>
      <Card x={310} y={70} w={170} i={2}>
        <div className="p-2">
          <Metric label="Booked online" value={71} suffix="%" delta="18 pts" size={26} />
          <p className="mt-1.5 text-[11px] text-ink-2">this month</p>
        </div>
      </Card>
    </Stage>
  );
}

/** Payments: the deposit at booking, UPI first, and the gateway's receipt. */
export function PayMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={280}
        label="Pay the deposit"
        badge={<Status tone="accent">Sat 6 pm</Status>}
      >
        <div className="px-2 pb-1">
          <p className="text-[12px] text-ink-2">Hair colour · with Ananya · 90 min</p>
          <p className="mt-2 font-display text-[34px] leading-none text-ink">₹500</p>
          <p className="mt-1 text-[11.5px] text-ink-2">₹2,000 at the visit</p>
          <div className="mt-3 flex gap-1.5">
            <Chip on>UPI</Chip>
            <Chip>Card</Chip>
            <Chip>Netbanking</Chip>
          </div>
          <Press className="mt-3">Pay ₹500</Press>
          <p className="mt-2 text-center text-[11px] text-ink-2">
            Free cancellation until Fri, 6 pm
          </p>
        </div>
      </Panel>
      <Toast
        x={256}
        y={200}
        w={232}
        tool="Razorpay"
        title="₹500 received · UPI"
        meta="Receipt sent to Riya"
      />
    </Stage>
  );
}

/** Confirmations: what Riya gets at once, and the reminder the day before. */
export function ConfirmedMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={280} label="You’re booked" badge={<Status>Deposit paid</Status>}>
        <div className="px-2">
          <p className="font-display text-[26px] leading-none text-ink">Sat 20 Sep</p>
          <p className="mt-1 text-[12px] text-ink-2">Hair colour · 6:00 pm · with Ananya</p>
          <div className="mt-2">
            <Line icon="calendar" title="Add to calendar" meta="Sat, 6:00 pm" />
            <Line icon="repeat" title="Change slot" meta="Free until Fri, 6 pm" />
            <Line icon="pin" title="Getting here" meta="Map pin and parking" />
          </div>
        </div>
      </Panel>
      <Toast
        x={250}
        y={220}
        w={240}
        tool="WhatsApp"
        title="See you tomorrow at 6 pm"
        meta="Riya replied 1 · confirmed"
      />
    </Stage>
  );
}

/** Cancellations: changes and cancellations handled by the policy, the deposit dealt with each time. */
export function CancellationsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={330}
        label="Changes · this month"
        badge={
          <Status tone="accent" icon="shield">
            Your policy
          </Status>
        }
      >
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            face="Vikram J"
            title="Vikram J"
            meta="Haircut · moved to next Sat"
            status="Changed"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={1}
            face="Meghna S"
            title="Meghna S"
            meta="Facial · a day before"
            status="Refunded"
          />
          <Step
            turn
            n={4}
            i={2}
            face="Arjun P"
            title="Arjun P"
            meta="Colour · 2 h before · kept ₹500"
            status="Late"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={3}
            face="Sana K"
            title="Sana K"
            meta="Didn’t come · kept ₹1,000"
            status="No-show"
            tone="accent"
          />
        </div>
      </Panel>
      <Card x={330} y={170} w={150} i={3}>
        <div className="grid gap-3 p-2">
          <Metric label="Confirmed by reply" value={88} suffix="%" size={24} />
          <Metric label="No-shows" value={1} size={24} />
        </div>
      </Card>
    </Stage>
  );
}

/** The calendar: every stylist's afternoon, Riya's new online booking among them. */
export function ChartMock() {
  const hours = ['12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'];
  const people: [string, [number, number, string, boolean?][]][] = [
    [
      'Ananya',
      [
        [0, 2, 'Mehta · global colour'],
        [3, 5, 'Iyer · highlights'],
        [6, 7, 'Riya · online', true],
      ],
    ],
    [
      'Rhea',
      [
        [0, 1, 'Rao · cut'],
        [1, 2, 'Das · cut'],
        [5, 6, 'Sharma · cut'],
      ],
    ],
    [
      'Farah',
      [
        [2, 3, 'Nair · facial'],
        [6, 7, 'Kavya · facial'],
      ],
    ],
    ['Vikas', [[5, 6, 'Walk-in · Shetty']]],
    ['Bridal room', [[0, 5, 'Bridal party · 5 hours']]],
  ];
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={20} w={860} label="Calendar · Sat 20 Sep, afternoon" live>
        <div className="grid grid-cols-[7rem_repeat(7,minmax(0,1fr))] gap-y-2 px-3 pb-3">
          <span />
          {hours.map((hour) => (
            <span key={hour} className="border-l border-line pl-2 text-[11px] text-ink-2">
              {hour}
            </span>
          ))}
          {people.map(([who, bars], r) => (
            <div key={who} className="col-span-8 grid grid-cols-subgrid items-center">
              <span className="truncate text-[12px] font-medium text-ink">{who}</span>
              {bars.map(([from, to, what, fresh], k) => (
                <span
                  key={what}
                  className={`sc-fill rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium ${fresh ? 'sc-slot--fresh' : 'sc-slot text-ink'}`}
                  style={
                    {
                      gridColumn: `${from + 2} / ${to + 2}`,
                      gridRow: 1,
                      '--i': r + k,
                    } as CSSProperties
                  }
                >
                  <span className="block truncate">{what}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </Panel>
      <Toast
        x={600}
        y={250}
        w={250}
        icon="calendar"
        title="Riya booked online"
        meta="Ananya · 6 pm · deposit paid"
      />
    </Stage>
  );
}

/** How it's built: services, prices and rules set once, and Riya's deposit that follows them. */
export function BookingHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel
        x={40}
        y={30}
        w={360}
        label="Services and prices"
        badge={<Status tone="accent">Set once</Status>}
      >
        <div className="px-2">
          <Line icon="layers" title="Haircut · 45 min" meta="Weekday ₹700 · weekend ₹800" />
          <Line icon="layers" title="Hair colour · 90 min" meta="Weekday ₹2,300 · weekend ₹2,500" />
          <Line icon="layers" title="Facial · 60 min" meta="Weekday ₹1,600 · weekend ₹1,800" />
          <div className="mt-2 grid grid-cols-2 gap-2 pb-2">
            <Field label="Deposit" value="20% at booking" focus />
            <Field label="Free cancellation" value="Until 24 h before" />
          </div>
        </div>
      </Panel>
      <Panel
        x={380}
        y={300}
        w={280}
        label="Pay the deposit"
        badge={<Status tone="accent">Sat 6 pm</Status>}
        i={2}
      >
        <div className="px-2 pb-1">
          <p className="font-display text-[30px] leading-none text-ink">₹500</p>
          <p className="mt-1 text-[11.5px] text-ink-2">Free cancellation until Fri, 6 pm</p>
          <Press className="mt-3">Pay ₹500</Press>
        </div>
      </Panel>
    </Stage>
  );
}

export const BookingHow = BookingHowBox;
