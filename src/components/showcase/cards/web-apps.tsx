'use client';

import { Icon } from '../../ui/icon';
import { Chip, Line, Metric, Money, Press, Status, Step } from '../kit';
import { Sheet, Web } from '../sheet';

/**
 * Web Apps' five screens, from the page's sample business — a Logistics & Fleet Company and its
 * customer Sri Sai Traders: the customer's loads from one link, a saved route booked again, job
 * LD-3321 invoicing itself, the team's roles, and today's jobs.
 */

/** Nothing to install: the customer's loads, from one link on any device. */
export function Loads() {
  return (
    <Web address="app.fleet.in/loads" className="px-3.5 pt-3">
      <p className="text-[13px] font-semibold">Sri Sai Traders</p>
      <p className="text-[10.5px] text-ink-2">Your loads</p>
      <div className="mt-2 flex flex-col gap-1.5">
        <Step
          lit
          icon="truck"
          title="Peenya → Hosur"
          meta="LD-3321 · arriving 11:40"
          className="!py-2"
        />
        <Step icon="truck" title="Peenya → Tumkur" meta="LD-3290 · Monday" className="!py-2" />
        <Step icon="truck" title="Peenya → Mysuru" meta="LD-3244 · Thursday" className="!py-2" />
      </div>
      <div className="mt-2.5 flex gap-1.5">
        <Chip on>Phone</Chip>
        <Chip>Tablet</Chip>
        <Chip>Desktop</Chip>
      </div>
    </Web>
  );
}

/** One job, done well: a saved route booked again, in one tap. */
export function Pickup() {
  return (
    <Sheet label="Book a pickup" badge={<Status tone="accent">Saved route</Status>}>
      <Line icon="pin" title="Pickup" meta="Peenya" right={<Chip>2–4 pm</Chip>} />
      <Line icon="move" title="Drop" meta="Hosur, gate 2" right={<Chip>By 8 pm</Chip>} />
      <Line icon="truck" title="Load" meta="14 pallets · 2 t" right={<Chip>Tata 407</Chip>} />
      <Line icon="rupee" title="Rate" meta="Contract · 62 km" right={<Money>₹6,800</Money>} />
      <Press className="mt-1.5">Book this pickup</Press>
    </Sheet>
  );
}

/** Connected: job LD-3321 from the app to invoice, messages and trip sheet, with no retyping. */
export function Job() {
  return (
    <Sheet label="Job LD-3321" badge={<Status>Delivered</Status>} foot={['Retyped', 'Nothing']}>
      <p className="text-[11px] text-ink-2">On its own · 9:40 am</p>
      <div className="mt-2 flex flex-col gap-2">
        <Step turn n={3} i={0} icon="receipt" title="Invoice INV-5512" meta="Sent on delivery" />
        <Step turn n={3} i={1} tool="WhatsApp" title="Customer told" meta="Arriving 11:40" />
        <Step turn n={3} i={2} icon="table" title="Trip sheet updated" meta="Km and fuel" />
      </div>
    </Sheet>
  );
}

/** Logins and roles: who is on the team, and what each can do. */
export function Team() {
  return (
    <Sheet label="Team" badge={<Status tone="muted">3 roles</Status>}>
      <Line face="Farhan Ali" title="Farhan Ali" meta="Dispatch" right={<Chip on>Admin</Chip>} />
      <Line face="Neha Joshi" title="Neha Joshi" meta="Accounts" right={<Chip>Billing</Chip>} />
      <Line face="Ravi Kumar" title="Ravi Kumar" meta="KA-01 4412" right={<Chip>Driver</Chip>} />
      <p className="mt-2 flex items-center gap-1.5 text-[10.5px] text-ink-2">
        <Icon name="lock" size={11} /> Each sees only what their role needs
      </p>
    </Sheet>
  );
}

/** Dispatch: today's jobs on the team's screen. */
export function Today() {
  return (
    <Sheet label="Today · Farhan" live>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <Metric label="Jobs today" value="96" size={24} />
        <Metric label="On the road" value="14/18" size={24} />
        <Metric label="Booked in app" value="87%" size={24} />
        <Metric label="On time" value="97%" delta="3%" size={24} />
      </div>
      <div className="mt-3 rounded-xl border border-line px-3 py-2.5">
        <p className="text-[12px] font-medium text-ink">Tomorrow’s routes, planned</p>
        <p className="text-[10.5px] text-ink-2">4 vehicles · 10 stops</p>
      </div>
    </Sheet>
  );
}
