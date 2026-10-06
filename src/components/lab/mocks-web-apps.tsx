import { Fragment } from 'react';

import { ToolMark } from '../ui/brand-logos';
import { Icon } from '../ui/icon';
import { Fit } from './fit';
import { Card, Face, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Chip, Dot, Stat } from './mock-parts';
import { GRAPHITE } from '../visuals/graphite';

/**
 * Web Apps' mockups, in the light kit, from the page's own sample business — a Logistics & Fleet
 * Company and its customer Sri Sai Traders: the app from one link, a repeat pickup booked in one tap,
 * the job running through invoicing and messages on its own, the team's roles and tomorrow's
 * vehicles. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = GRAPHITE;
/** The business's own colour: everything inside its screens. */
const A = GRAPHITE;

/** Nothing to install: the customer's loads in the app, from one link on any device. */
export function InstallMock() {
  const loads = [
    {
      route: 'Peenya → Hosur',
      meta: 'LD-3321 · arriving 11:40',
      tag: <Tag tone="ok">On the way</Tag>,
    },
    { route: 'Peenya → Tumkur', meta: 'LD-3290 · delivered Mon', tag: <Tag>Delivered</Tag> },
    { route: 'Peenya → Mysuru', meta: 'LD-3244 · delivered Thu', tag: <Tag>Delivered</Tag> },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={262} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="truck" accent={P} title="Sri Sai Traders" meta="Your loads" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {loads.map((o) => (
              <Row
                key={o.route}
                lead={<Dot icon="truck" tone={P} />}
                title={o.route}
                meta={o.meta}
                right={o.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={302} y={84} w={198} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">One link, any device</p>
          <p className="mt-1 truncate text-[11px] font-semibold">logisticsfleetcompany.in</p>
          <div className="mt-2.5 flex gap-1.5">
            <Chip on accent={A}>
              Phone
            </Chip>
            <Chip accent={A}>Tablet</Chip>
            <Chip accent={A}>Desktop</Chip>
          </div>
        </div>
      </Card>
      <Pill x={302} y={200} i={4} accent={P} icon="devices">
        Nothing to install
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M282 110 C 292 110, 292 120, 302 120']}
        dots={[[282, 110]]}
      />
    </Fit>
  );
}

/** One job, done well: a saved route booked again, in one tap. */
export function ReorderMock() {
  const items = [
    { t: 'Pickup', q: 'Sri Sai Traders, Peenya', v: '2–4 pm' },
    { t: 'Drop', q: 'Hosur warehouse, gate 2', v: 'By 8 pm' },
    { t: 'Load', q: '14 pallets · 2 tonnes', v: 'Tata 407' },
    { t: 'Rate', q: 'Contract rate · 62 km', v: '₹6,800' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={18} w={270} i={0}>
        <div className="px-3 pt-3 pb-3">
          <Head
            icon="repeat"
            accent={P}
            title="Book a pickup"
            meta="Saved route · Peenya → Hosur"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {items.map((it) => (
              <Row
                key={it.t}
                title={it.t}
                meta={it.q}
                right={<span className="text-[11px] font-semibold">{it.v}</span>}
              />
            ))}
          </div>
          <span
            className="mt-2 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Book this pickup · ₹6,800
          </span>
        </div>
      </Card>
      <Card x={308} y={96} w={192} i={2}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <Dot icon="truck" tone={P} />
            <span className="min-w-0">
              <span className="block truncate text-[11.5px] font-semibold">Vehicle assigned</span>
              <span className="block truncate text-[10px] text-ink-3">KA-01 4412 · Ravi</span>
            </span>
          </div>
        </div>
      </Card>
      <Pill x={308} y={176} i={4} accent={P} icon="check">
        Booked in one tap
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M290 120 C 298 120, 298 116, 308 116']}
        dots={[[290, 120]]}
      />
    </Fit>
  );
}

/** Connected: job LD-3321 from the app to invoice, messages and the trip sheet, with no retyping. */
export function FlowMock() {
  const happened = [
    {
      lead: <ToolMark tool="Zoho Books" size={14} />,
      t: 'Invoice INV-5512 ready',
      m: 'Sent on delivery',
    },
    {
      lead: <ToolMark tool="WhatsApp" size={14} />,
      t: 'Customer told',
      m: 'Picked up, arriving 11:40',
    },
    {
      lead: <ToolMark tool="Google Sheets" size={14} />,
      t: 'Trip sheet updated',
      m: 'Kilometres and fuel logged',
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={30} w={196} i={0}>
        <div className="px-3 pt-3 pb-2">
          <Head icon="truck" accent={P} title="Job LD-3321" meta="Sri Sai Traders" />
          <ol className="relative mt-2.5 flex flex-col gap-2">
            <span className="absolute top-3 bottom-3 left-[12.5px] w-px bg-[#e6e7eb]" />
            {[
              ['Booked', '9:12 am', true],
              ['Assigned', '9:13 am', true],
              ['Picked up', 'Now', false],
            ].map(([t, m, done]) => (
              <li key={t as string} className="relative flex items-center gap-2.5">
                <Dot icon={done ? 'check' : 'truck'} tone={P} />
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium">{t as string}</span>
                  <span className="block truncate text-[9.5px] text-ink-3">{m as string}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
      <Card x={236} y={66} w={264} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="spark" accent={P} title="What happened, on its own" meta="9:40 am" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {happened.map((h) => (
              <Row
                key={h.t}
                lead={
                  <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f4f5f7]">
                    {h.lead}
                  </span>
                }
                title={h.t}
                meta={h.m}
                right={<Tag tone="ok">Done</Tag>}
              />
            ))}
          </div>
        </div>
      </Card>
      <Pill x={236} y={246} i={4} accent={P}>
        No one retyped anything
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M216 100 C 226 100, 226 110, 236 110']}
        dots={[[216, 100]]}
      />
    </Fit>
  );
}

/** Logins and roles: who is on the team, and what each role can do. */
export function RolesMock() {
  const can = [
    { label: 'See every job', v: [true, true, false, false] },
    { label: 'Change rates', v: [true, false, false, false] },
    { label: 'Mark delivered', v: [true, true, true, false] },
    { label: 'Track own loads', v: [true, true, false, true] },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={26} w={220} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="people" accent={P} title="Team" meta="Logistics & Fleet Company" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Face name="Farhan Ali" />}
              title="Farhan Ali"
              meta="Dispatch"
              right={
                <Tag tone="accent" accent={A}>
                  Owner
                </Tag>
              }
            />
            <Row
              lead={<Face name="Neha Joshi" />}
              title="Neha Joshi"
              meta="Signed in today"
              right={<Tag>Accounts</Tag>}
            />
            <Row
              lead={<Face name="Ravi Kumar" />}
              title="Ravi Kumar"
              meta="KA-01 4412"
              right={<Tag>Driver</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={258} y={60} w={242} i={2}>
        <div className="p-3">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            What each role can do
          </p>
          <div className="mt-2 grid grid-cols-[1fr_repeat(4,30px)] items-center gap-y-1.5 text-[9.5px]">
            <span />
            {['Owner', 'Desk', 'Driver', 'Client'].map((h) => (
              <span key={h} className="text-center text-[8.5px] text-ink-3">
                {h}
              </span>
            ))}
            {can.map((c) => (
              <Fragment key={c.label}>
                <span className="truncate text-[10.5px] text-ink-2">{c.label}</span>
                {c.v.map((on, k) => (
                  <span key={`${c.label}-${k}`} className="grid place-items-center">
                    {on ? (
                      <span
                        className="grid size-4 place-items-center rounded-full"
                        style={{ background: A, color: onColour(A) }}
                      >
                        <Icon name="check" size={9} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="size-1.5 rounded-full bg-[#dfe2e8]" />
                    )}
                  </span>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </Card>
      <Pill x={40} y={254} i={4} accent={P} icon="lock">
        Each person sees their part
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M240 100 C 250 100, 248 110, 258 110']}
        dots={[[240, 100]]}
      />
    </Fit>
  );
}

/** Dispatch: tomorrow's four vehicles, each stop on its route, before the day starts. */
export function RoutesMock() {
  const vans = [
    {
      van: 'KA-01 4412 · Hosur',
      stops: [
        ['Sri Sai Traders', 'Pickup 2 pm'],
        ['Hosur warehouse', 'Drop by 8 pm'],
      ],
    },
    {
      van: 'KA-05 2231 · Tumkur',
      stops: [
        ['Deccan Plastics', 'Pickup 7 am'],
        ['Nandi Foods', 'Pickup 8 am'],
        ['Tumkur depot', 'Drop 11 am'],
      ],
    },
    {
      van: 'KA-03 8812 · Mysuru',
      stops: [
        ['Venkat Textiles', 'Pickup 6 am'],
        ['Green Leaf Foods', 'Pickup 7:30 am'],
        ['Mysuru hub', 'Drop 12 pm'],
      ],
    },
    {
      van: 'KA-51 6630 · City',
      stops: [
        ['Tech Park B', 'Drop 9 am'],
        ['Orion Mall', 'Drop 10:30 am'],
      ],
    },
  ];
  return (
    <Fit w={880} h={360}>
      {vans.map((v, i) => (
        <Card key={v.van} x={28 + i * 208} y={30 + (i % 2) * 18} w={196} i={i}>
          <div className="px-3 pt-3 pb-1.5">
            <Head icon="truck" accent={P} title={v.van} meta="Tomorrow, from 6 am" />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              {v.stops.map(([name, items]) => (
                <Row key={name} lead={<Face name={name!} />} title={name!} meta={items} />
              ))}
            </div>
          </div>
        </Card>
      ))}
      <Pill x={330} y={290} i={4} accent={P} icon="truck">
        Tomorrow’s routes, planned tonight
      </Pill>
    </Fit>
  );
}

export const WEB_APPS_MOCKS = [InstallMock, ReorderMock, FlowMock, RolesMock, RoutesMock];

/** How it's built: the team's jobs view, and the customer's statement, from one app. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function WebAppsHowScene({ box = false }: { box?: boolean }) {
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={30} w={320} i={0}>
          <div className="p-3.5">
            <Head icon="dashboard" accent={P} title="Today’s jobs" meta="Signed in · Farhan Ali" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Stat label="Jobs today" value="96" delta="4" accent={A} />
              <Stat label="On the road" value="14 of 18" accent={A} />
              <Stat label="Booked in the app" value="87%" delta="9 pts" accent={A} size={17} />
              <Stat label="On time this week" value="97%" accent={A} size={17} />
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={404} y={48} w={330} i={2}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head
              icon="receipt"
              accent={P}
              title="Statement · ₹42,380"
              meta="Sri Sai Traders · due by 30 Sep"
            />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              <Row
                title="INV-5512 · ₹6,800"
                meta="LD-3321 · today"
                right={<Tag tone="wait">Due</Tag>}
              />
              <Row
                title="INV-5488 · ₹8,200"
                meta="LD-3290 · 8 Sep"
                right={<Tag tone="wait">Due</Tag>}
              />
              <Row
                title="INV-5410 · ₹6,940"
                meta="LD-3244 · 1 Sep"
                right={<Tag tone="ok">Paid</Tag>}
              />
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -4, y: 250 } : HOME}>
        <Pill x={60} y={250} i={4} accent={P}>
          One app for the team and its customers
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M376 126 H 408 V 264']}
          dots={[
            [376, 126],
            [408, 264],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M344 110 C 374 110, 374 100, 404 100']}
          dots={[
            [344, 110],
            [404, 100],
          ]}
        />
      )}
    </Fit>
  );
}

export function WebAppsHow() {
  return <WebAppsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function WebAppsHowBox() {
  return <WebAppsHowScene box />;
}
