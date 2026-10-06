'use client';

import product from '@/content/products/web-apps';

import { Icon } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import {
  Card,
  Chip,
  Line,
  Metric,
  Money,
  Mono,
  Panel,
  Press,
  RoleGrid,
  Stage,
  Status,
  Step,
  Toast,
  Track,
} from './kit';

/**
 * Web Apps, in the showcase kit, from the page's own sample business — a Logistics & Fleet Company
 * and its customer Sri Sai Traders: the app from one link, a repeat pickup booked in one tap, the job
 * running through invoicing and messages on its own, the team's roles and tomorrow's vehicles.
 */
const P = product.accent;
const A = BRANDS.logistics!.accent;

/** Nothing to install: the customer's loads in the app, from one link on any device. */
export function InstallMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={310}
        label="Sri Sai Traders · your loads"
        live
        foot={['Opened from', 'one link']}
      >
        <div className="flex flex-col gap-2">
          <Step
            lit
            icon="truck"
            title="Peenya → Hosur"
            meta="LD-3321 · arriving 11:40"
            status="On the way"
            tone="accent"
          />
          <Step icon="truck" title="Peenya → Tumkur" meta="LD-3290 · Mon" status="Delivered" />
          <Step icon="truck" title="Peenya → Mysuru" meta="LD-3244 · Thu" status="Delivered" />
        </div>
      </Panel>
      <Card x={300} y={150} w={190} i={2}>
        <div className="p-2">
          <p className="text-[11.5px] text-ink-2">logisticsfleetcompany.in</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip on>Phone</Chip>
            <Chip>Tablet</Chip>
            <Chip>Desktop</Chip>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-ink">
            <Icon name="devices" size={14} /> Nothing to install
          </p>
        </div>
      </Card>
    </Stage>
  );
}

/** One job, done well: a saved route booked again, in one tap. */
export function ReorderMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={300}
        label="Book a pickup"
        badge={<Status tone="accent">Saved route</Status>}
      >
        <div className="px-2">
          <Line
            icon="pin"
            title="Pickup"
            meta="Sri Sai Traders, Peenya"
            right={<Money>2–4 pm</Money>}
          />
          <Line
            icon="pin"
            title="Drop"
            meta="Hosur warehouse, gate 2"
            right={<Money>By 8 pm</Money>}
          />
          <Line
            icon="layers"
            title="Load"
            meta="14 pallets · 2 tonnes"
            right={<Money>Tata 407</Money>}
          />
          <Line icon="rupee" title="Rate" meta="Contract · 62 km" right={<Money>₹6,800</Money>} />
          <Press className="mt-2 mb-1">Book this pickup</Press>
        </div>
      </Panel>
      <Toast
        x={264}
        y={258}
        w={226}
        icon="truck"
        title="Vehicle assigned"
        meta="KA-01 4412 · Ravi"
      />
    </Stage>
  );
}

/** Connected: job LD-3321 from the app to invoice, messages and the trip sheet, with no retyping. */
export function FlowMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={50} w={200} label="Job LD-3321" foot={['Sri Sai', 'Traders']}>
        <Track
          steps={[
            { title: 'Booked', meta: '9:12 am', done: true },
            { title: 'Assigned', meta: '9:13 am', done: true },
            { title: 'Picked up', meta: 'Now' },
          ]}
        />
      </Panel>
      <Panel x={204} y={20} w={290} label="On its own · 9:40 am" live i={2}>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            tool="Zoho"
            title="Invoice INV-5512 ready"
            meta="Sent on delivery"
            status="Done"
          />
          <Step
            turn
            n={3}
            i={1}
            tool="WhatsApp"
            title="Customer told"
            meta="Arriving 11:40"
            status="Done"
          />
          <Step
            turn
            n={3}
            i={2}
            tool="Google Sheets"
            title="Trip sheet updated"
            meta="Km and fuel logged"
            status="Done"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** Logins and roles: who is on the team, and what each role can do. */
export function RolesMock() {
  const roles = ['Owner', 'Desk', 'Driver', 'Client'];
  const can = [
    ['See every job', [true, true, false, false]],
    ['Change rates', [true, false, false, false]],
    ['Mark delivered', [true, true, true, false]],
    ['Track own loads', [true, true, false, true]],
  ] as const;
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={270} label="Team">
        <div className="flex flex-col gap-2">
          <Step face="Farhan Ali" title="Farhan Ali" meta="Dispatch" status="Owner" tone="accent" />
          <Step
            face="Neha Joshi"
            title="Neha Joshi"
            meta="Signed in today"
            status="Accounts"
            tone="muted"
          />
          <Step
            face="Ravi Kumar"
            title="Ravi Kumar"
            meta="KA-01 4412"
            status="Driver"
            tone="muted"
          />
        </div>
      </Panel>
      <Card x={262} y={100} w={252} i={2}>
        <div className="p-2">
          <Mono>What each role can do</Mono>
          <div className="mt-3">
            <RoleGrid heads={roles} rows={can} />
          </div>
        </div>
      </Card>
    </Stage>
  );
}

/** Dispatch: tomorrow's four vehicles, each stop on its route, before the day starts. */
export function RoutesMock() {
  const vans = [
    [
      'KA-01 4412 · Hosur',
      [
        ['Sri Sai Traders', 'Pickup 2 pm'],
        ['Hosur warehouse', 'Drop by 8 pm'],
      ],
    ],
    [
      'KA-05 2231 · Tumkur',
      [
        ['Deccan Plastics', 'Pickup 7 am'],
        ['Nandi Foods', 'Pickup 8 am'],
        ['Tumkur depot', 'Drop 11 am'],
      ],
    ],
    [
      'KA-03 8812 · Mysuru',
      [
        ['Venkat Textiles', 'Pickup 6 am'],
        ['Green Leaf Foods', 'Pickup 7:30'],
        ['Mysuru hub', 'Drop 12 pm'],
      ],
    ],
    [
      'KA-51 6630 · City',
      [
        ['Tech Park B', 'Drop 9 am'],
        ['Orion Mall', 'Drop 10:30 am'],
      ],
    ],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      {vans.map(([van, stops], i) => (
        <Panel
          key={van}
          x={20 + i * 220}
          y={20 + (i % 2) * 26}
          w={208}
          i={i}
          label={van.split(' · ')[1]}
          badge={i === 0 ? <Status tone="accent">Ready</Status> : undefined}
        >
          <p className="px-3 pb-2 text-[12.5px] font-medium text-ink">{van.split(' · ')[0]}</p>
          <Track steps={stops.map(([title, meta]) => ({ title, meta }))} />
        </Panel>
      ))}
      <Toast
        x={560}
        y={250}
        w={260}
        icon="truck"
        title="Tomorrow’s routes, planned"
        meta="4 vehicles · 10 stops"
      />
    </Stage>
  );
}

/** How it's built: the team's jobs view, and the customer's statement — from one app. */
export function WebAppsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={40} y={30} w={340} label="Today’s jobs · Farhan" live>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-3 pb-3">
          <Metric label="Jobs today" value={96} delta="4" size={26} />
          <Metric label="On the road" value="14 of 18" size={26} />
          <Metric label="Booked in the app" value={87} suffix="%" size={22} />
          <Metric label="On time this week" value={97} suffix="%" size={22} />
        </div>
      </Panel>
      <Panel
        x={330}
        y={250}
        w={360}
        label="Statement · Sri Sai Traders"
        badge={<Status tone="wait">₹42,380 due</Status>}
        i={2}
      >
        <div className="px-2 pb-1">
          <Line
            icon="receipt"
            title="INV-5512 · ₹6,800"
            meta="LD-3321 · today"
            right={<Status tone="wait">Due</Status>}
          />
          <Line
            icon="receipt"
            title="INV-5488 · ₹8,200"
            meta="LD-3290 · 8 Sep"
            right={<Status tone="wait">Due</Status>}
          />
          <Line
            icon="receipt"
            title="INV-5410 · ₹6,940"
            meta="LD-3244 · 1 Sep"
            right={<Status>Paid</Status>}
          />
        </div>
      </Panel>
    </Stage>
  );
}

export const WebAppsHow = WebAppsHowBox;
