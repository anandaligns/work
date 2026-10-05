import product from '@/content/products/customer-portals';

import { ToolMark } from '../ui/brand-logos';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, Face, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Chip, Dot, Field, Stat } from './mock-parts';

/**
 * Customer Portals' mockups, in the light kit, from the page's own sample business — an Industrial
 * Parts Distributor and its customer Sri Lakshmi Engineering: order SO-4821 packed and shipping
 * today, invoice INV-2291 due, Ramesh's quote request for 200 bearings, the team's customers and
 * the test certificates. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.partsdistributor!.accent;

/** Progress: the order's stages, and today's update from dispatch. */
export function ProgressMock() {
  const stages = [
    { title: 'Order placed', meta: 'Done · 16 Sep', done: true },
    { title: 'Picked and checked', meta: 'Done · 17 Sep', done: true },
    { title: 'Packing', meta: '3 cartons · ships today', done: false },
    { title: 'Delivery', meta: 'Tomorrow, by noon', done: false, next: true },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={236} i={0}>
        <div className="px-3 pt-3 pb-2">
          <Head icon="truck" accent={P} title="Order SO-4821" meta="Sri Lakshmi Engineering" />
          <ol className="relative mt-2.5 flex flex-col gap-2.5">
            <span className="absolute top-3 bottom-3 left-[12.5px] w-px bg-[#e6e7eb]" />
            {stages.map((s) => (
              <li key={s.title} className="relative flex items-center gap-2.5">
                <Dot icon={s.done ? 'check' : s.next ? 'truck' : 'layers'} tone={P} />
                <span className="min-w-0">
                  <span className="block truncate text-[11.5px] font-medium">{s.title}</span>
                  <span className="block truncate text-[10px] text-ink-3">{s.meta}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
      <Card x={276} y={80} w={224} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Today’s update · Arun, dispatch</p>
          <div className="mt-2 flex flex-col gap-1.5 text-[10.5px]">
            {[
              ['6205 bearings × 200, packed', true],
              ['V-belts B-52 × 40, packed', true],
              ['Test certificates attached', false],
            ].map(([text, done]) => (
              <span key={text as string} className="flex items-center gap-2">
                <span
                  className="grid size-3.5 shrink-0 place-items-center rounded-[4px] border text-[8px]"
                  style={
                    done
                      ? { background: A, borderColor: A, color: onColour(A) }
                      : { borderColor: '#d9dce4' }
                  }
                >
                  {done ? '✓' : ''}
                </span>
                <span className={done ? '' : 'text-ink-3'}>{text as string}</span>
              </span>
            ))}
          </div>
          <div className="mt-2.5 flex gap-1.5">
            <Chip accent={A}>3 photos</Chip>
            <Chip accent={A}>Ships today, 4 pm</Chip>
          </div>
        </div>
      </Card>
      <Pill x={276} y={236} i={4} accent={P} icon="eye">
        Seen without a single call
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M256 110 C 266 110, 264 120, 276 120']}
        dots={[[256, 110]]}
      />
    </Fit>
  );
}

/** Payments and papers: what's due, what's paid, and the receipts beside them. */
export function PaymentsMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={254} i={0}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Invoice INV-2291 · due 20 Oct</p>
          <p className="mt-1 text-[22px] leading-none font-semibold">₹1,82,400</p>
          <p className="mt-1 text-[10px] text-ink-3">Credit left ₹3.2 L of ₹5 L</p>
          <span
            className="mt-2.5 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Pay ₹1,82,400
          </span>
          <div className="mt-2 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Dot icon="check" tone={P} />}
              title="INV-2250 · SO-4790"
              meta="2 Oct · NEFT · ₹96,300"
              right={<Tag tone="ok">Paid</Tag>}
            />
            <Row
              lead={<Dot icon="check" tone={P} />}
              title="INV-2204 · SO-4712"
              meta="18 Sep · UPI · ₹42,800"
              right={<Tag tone="ok">Paid</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={294} y={96} w={206} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="file" accent={P} title="Documents" meta="Always here" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Dot icon="file" tone={P} />}
              title="Rate contract · 2026"
              meta="PDF · 4 pages"
            />
            <Row
              lead={<Dot icon="receipt" tone={P} />}
              title="Receipt · INV-2250"
              meta="PDF · 1 page"
            />
          </div>
        </div>
      </Card>
      <Pill x={40} y={274} i={4} accent={P} icon="card">
        Paid in the portal, receipt kept
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M274 110 C 284 110, 282 130, 294 130']}
        dots={[[274, 110]]}
      />
    </Fit>
  );
}

/** Requests: Ramesh's quote request, assigned and answered, with the others waiting. */
export function RequestsMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={262} i={0}>
        <div className="p-3">
          <Head
            icon="chat"
            accent={P}
            title="Quote · 200 × 6205"
            meta="REQ-214 · Sri Lakshmi Engg."
            right={
              <Tag tone="accent" accent={A}>
                New
              </Tag>
            }
          />
          <ol className="relative mt-3 flex flex-col gap-2.5">
            <span className="absolute top-3 bottom-3 left-[12.5px] w-px bg-[#e6e7eb]" />
            {[
              { icon: 'chat' as const, t: 'Ramesh asked in the portal', m: 'Today, 9:20 am' },
              { icon: 'userCheck' as const, t: 'Assigned to Kiran, sales', m: 'Today, 9:22 am' },
              {
                icon: 'receipt' as const,
                t: 'Quote sent · ₹92 each',
                m: 'Kiran · valid 15 days · 11:05 am',
              },
            ].map((s) => (
              <li key={s.t} className="relative flex items-center gap-2.5">
                <Dot icon={s.icon} tone={P} />
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium">{s.t}</span>
                  <span className="block truncate text-[9.5px] text-ink-3">{s.m}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
      <Card x={300} y={70} w={200} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="layers" accent={P} title="Open requests" meta="6 across customers" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              title="Return · 4 belts"
              meta="Apex Tools · Farhan"
              right={<Tag tone="wait">Approved</Tag>}
            />
            <Row title="Price for 6308" meta="Metro Pumps · Deepa" right={<Tag>Waiting</Tag>} />
          </div>
        </div>
      </Card>
      <Pill x={300} y={218} i={4} accent={P} icon="userCheck">
        Every request has an owner
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M282 100 C 292 100, 290 110, 300 110']}
        dots={[[282, 100]]}
      />
    </Fit>
  );
}

/** Your team's admin: every customer, their open order, what's due and how it's going. */
export function ProjectsMock() {
  const rows = [
    {
      firm: 'Sri Lakshmi Engg.',
      who: 'Ramesh Kumar',
      stage: 'SO-4821 · packing',
      tag: <Tag tone="ok">On track</Tag>,
    },
    {
      firm: 'Apex Tools',
      who: 'Farhan Ali',
      stage: 'SO-4818 · picked',
      tag: <Tag tone="ok">On track</Tag>,
    },
    {
      firm: 'Metro Pumps',
      who: 'Deepa Rao',
      stage: 'Invoice 5 days late',
      tag: <Tag tone="wait">Chase</Tag>,
    },
    {
      firm: 'Kaveri Motors',
      who: 'Sanjay Iyer',
      stage: 'SO-4809 · delivering',
      tag: (
        <Tag tone="accent" accent={A}>
          Today
        </Tag>
      ),
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={296} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="layers" accent={P} title="Customers" meta="Priya Nair · Accounts" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {rows.map((r) => (
              <Row
                key={r.firm}
                lead={<Face name={r.who} />}
                title={r.firm}
                meta={r.stage}
                right={r.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={334} y={86} w={166} i={2}>
        <div className="flex flex-col gap-3 p-3">
          <Stat label="Open orders" value="42" accent={A} size={18} />
          <Stat label="Updates this week" value="64" delta="12" accent={A} size={18} />
          <Stat label="Due this month" value="₹11.4 L" accent={A} size={18} />
        </div>
      </Card>
      <Pill x={40} y={272} i={4} accent={P} icon="dashboard">
        Every customer, one screen
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M316 120 C 326 120, 324 130, 334 130']}
        dots={[[316, 120]]}
      />
    </Fit>
  );
}

/** Documents: certificates, invoices and the rate contract, each with who added it and when. */
export function DocumentsMock() {
  const docs = [
    {
      name: 'Test certificate · 6205.pdf',
      kind: 'Certificates',
      who: 'Quality',
      when: 'Today',
      icon: 'file' as const,
    },
    {
      name: 'Invoice INV-2291.pdf',
      kind: 'Invoices',
      who: 'Accounts',
      when: '16 Sep',
      icon: 'receipt' as const,
    },
    {
      name: 'Receipt · INV-2250.pdf',
      kind: 'Receipts',
      who: 'Accounts',
      when: '2 Oct',
      icon: 'receipt' as const,
    },
    {
      name: 'Rate contract · 2026.pdf',
      kind: 'Agreements',
      who: 'Sales',
      when: '1 Apr',
      icon: 'file' as const,
    },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={30} w={380} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="file"
            accent={P}
            title="Documents"
            meta="Sri Lakshmi Engg. · 46 files"
            right={<Tag>Private</Tag>}
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {docs.map((d) => (
              <Row
                key={d.name}
                lead={<Dot icon={d.icon} tone={P} />}
                title={d.name}
                meta={`${d.kind} · ${d.who}`}
                right={<span className="text-[10px] text-ink-3">{d.when}</span>}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={440} y={62} w={228} i={2}>
        <div className="p-3.5">
          <Head
            icon="file"
            accent={P}
            title="Test certificate · 6205"
            meta="Certificates · 2 pages"
          />
          <div className="mt-3 h-[112px] rounded-[10px] border border-[#e6e7eb] bg-[#fafafb] p-2">
            <svg
              viewBox="0 0 200 96"
              className="size-full"
              fill="none"
              stroke={A}
              strokeWidth="1.2"
            >
              <circle cx="52" cy="48" r="38" />
              <circle cx="52" cy="48" r="16" />
              {Array.from({ length: 10 }, (_, k) => (
                <circle
                  key={k}
                  cx={52 + 27 * Math.cos((k * Math.PI) / 5)}
                  cy={48 + 27 * Math.sin((k * Math.PI) / 5)}
                  r="4.5"
                />
              ))}
              <line x1="112" y1="22" x2="190" y2="22" />
              <line x1="112" y1="38" x2="176" y2="38" />
              <line x1="112" y1="54" x2="186" y2="54" />
              <line x1="112" y1="70" x2="166" y2="70" />
            </svg>
          </div>
        </div>
      </Card>
      <Card x={694} y={112} w={160} i={3}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <Face name="Ramesh Kumar" />
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-semibold">Ramesh</span>
              <span className="block truncate text-[9.5px] text-ink-3">Viewed today</span>
            </span>
          </div>
          <span className="mt-2.5 block">
            <Tag tone="ok">Only his account</Tag>
          </span>
        </div>
      </Card>
      <Pill x={440} y={272} i={4} accent={P} icon="lock">
        Each customer sees only their own
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M408 110 C 424 110, 424 120, 440 120', 'M668 150 C 680 150, 680 160, 694 160']}
        dots={[
          [408, 110],
          [668, 150],
        ]}
      />
    </Fit>
  );
}

export const CUSTOMER_PORTALS_MOCKS = [
  ProgressMock,
  PaymentsMock,
  RequestsMock,
  ProjectsMock,
  DocumentsMock,
];

/** How it's built: the team posts an update; the customer signs in with a code and sees it. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function CustomerPortalsHowScene({ box = false }: { box?: boolean }) {
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={24} w={300} i={0}>
          <div className="p-3.5">
            <Head
              icon="pen"
              accent={P}
              title="Post an update"
              meta="portal.industrialpartsdistributor.in"
            />
            <div className="mt-3 flex flex-col gap-2">
              <Field label="Customer" value="Sri Lakshmi Engg. · SO-4821" accent={A} />
              <Field label="What happened" value="Packed in 3 cartons, ships today." accent={A} />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <Chip accent={A}>3 photos</Chip>
              <Chip on accent={A}>
                Tell them on WhatsApp
              </Chip>
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={400} y={44} w={260} i={2}>
          <div className="p-3.5">
            <Head icon="lock" accent={P} title="Sign in" meta="No password to remember" />
            <div className="mt-3 flex flex-col gap-2">
              <Field label="Phone number" value="+91 98450 44412" accent={A} />
              <Field label="One-time code" value="4  8  2  6  1  9" focus accent={A} />
            </div>
          </div>
        </Card>
        <Card x={496} y={236} w={236} i={3}>
          <div className="flex items-center gap-2.5 p-2.5">
            <ToolMark tool="WhatsApp" size={18} />
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-semibold">SO-4821 packed</span>
              <span className="block truncate text-[9.5px] text-ink-3">Ships today · 3 photos</span>
            </span>
          </div>
        </Card>
        <Wires w={760} h={330} accent={P} d={['M530 206 C 530 220, 560 220, 560 236']} />
      </Group>
      <Group at={box ? { x: -4, y: 238 } : HOME}>
        <Pill x={60} y={262} i={4} accent={P}>
          Posted once, seen by the right customer
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M356 126 H 404 V 260']}
          dots={[
            [356, 126],
            [404, 260],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M324 110 C 362 110, 362 120, 400 120', 'M530 206 C 530 220, 560 220, 560 236']}
          dots={[
            [324, 110],
            [400, 120],
          ]}
        />
      )}
    </Fit>
  );
}

export function CustomerPortalsHow() {
  return <CustomerPortalsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function CustomerPortalsHowBox() {
  return <CustomerPortalsHowScene box />;
}
