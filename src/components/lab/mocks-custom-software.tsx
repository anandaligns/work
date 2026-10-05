import product from '@/content/products/custom-software';

import { ToolMark } from '../ui/brand-logos';
import { BRANDS } from '../visuals/concept-sites';
import { Fit } from './fit';
import { Card, Head, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Bars, Dot, Stat, Steps } from './mock-parts';

/**
 * Custom Software's mockups, in the light kit, from the page's own sample business — a
 * Construction Company run by Vinod Shetty: every project and its stage, the purchases only he
 * needs to approve, the week in numbers, the system built in phases, and the crews and cranes
 * planned across the sites. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = product.accent;
/** The business's own colour: everything inside its screens. */
const A = BRANDS.construction!.accent;

/** One system: every project, its stage on site and how far along it is. */
export function OrdersMock() {
  const orders = [
    {
      t: 'Greenfield School · Block B',
      m: 'Slab 3 · 72%',
      tag: <Tag tone="ok">On time</Tag>,
    },
    {
      t: 'Lakeview Homes · Tower 2',
      m: 'Brickwork · 48%',
      tag: <Tag tone="wait">At risk</Tag>,
    },
    {
      t: 'Metro Clinic · fit-out',
      m: 'Plumbing · 85%',
      tag: <Tag tone="ok">On time</Tag>,
    },
    {
      t: 'Orchid Villas · phase 1',
      m: 'Handover · 100%',
      tag: (
        <Tag tone="accent" accent={A}>
          Ready
        </Tag>
      ),
    },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={300} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="layers" accent={P} title="Projects" meta="Estimate to handover" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {orders.map((o) => (
              <Row
                key={o.t}
                lead={<Dot icon="home" tone={P} />}
                title={o.t}
                meta={o.m}
                right={o.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={338} y={90} w={162} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Block B · slab 3</p>
          <p className="mt-1 text-[20px] leading-none font-semibold">72%</p>
          <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[#eef0f3]">
            <span className="block h-full rounded-full" style={{ width: '72%', background: A }} />
          </span>
          <p className="mt-1.5 text-[9.5px] text-ink-3">Due 18 Oct</p>
        </div>
      </Card>
      <Pill x={338} y={206} i={4} accent={P} icon="layers">
        One system, estimate to handover
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

/** Roles and approvals: what's waiting for the owner, and the one he's reading now. */
export function ApprovalsMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={272} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="userCheck" accent={P} title="Approvals" meta="Vinod Shetty · Owner" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              title="Cement · 400 bags"
              meta="Stores · Latha · ₹1,64,000"
              right={<Tag tone="wait">Owner</Tag>}
            />
            <Row
              title="Steel · 12 tonnes"
              meta="Purchase · 2 quotes · ₹8,40,000"
              right={<Tag tone="wait">Owner</Tag>}
            />
            <Row
              title="Overtime, Block B, Sat"
              meta="Site · Mahesh · ₹14,400"
              right={<Tag tone="ok">Approved</Tag>}
            />
            <Row
              title="Change order · extra toilet"
              meta="Metro Clinic · ₹62,000"
              right={<Tag tone="ok">Approved</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={310} y={80} w={190} i={2}>
        <div className="p-3">
          <p className="text-[11px] font-semibold">Cement · 400 bags</p>
          <p className="text-[9.5px] text-ink-3">Greenfield School · Block B</p>
          <p className="mt-2 text-[10px] leading-[1.45] text-ink-2">
            Latha: the better of two quotes; slab 4 starts Monday.
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-[9px] bg-[#f4f5f7] px-2 py-1.5">
            <ToolMark tool="WhatsApp" size={13} />
            <span className="truncate text-[10px]">Sent to Vinod · 9:48 am</span>
          </div>
        </div>
      </Card>
      <Pill x={310} y={222} i={4} accent={P} icon="lock">
        Only what needs the owner
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M292 90 C 302 90, 300 110, 310 110']}
        dots={[[292, 90]]}
      />
    </Fit>
  );
}

/** Reports and summaries: the week on site, and the running bills still to be paid. */
export function ReportsMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={264} i={0}>
        <div className="p-3">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            This week
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            <Stat label="Labour days" value="1,180" delta="6%" accent={A} size={16} />
            <Stat label="On schedule" value="3 of 4" accent={A} size={16} />
            <Stat label="Wastage" value="1.8%" accent={A} size={16} />
          </div>
          <div className="mt-3">
            <Bars values={[89, 94, 83, 100, 95, 55]} accent={A} height={64} />
          </div>
          <p className="mt-1.5 flex justify-between text-[8.5px] text-ink-3">
            <span>Mon</span>
            <span>Sat</span>
          </p>
        </div>
      </Card>
      <Card x={302} y={60} w={198} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="rupee" accent={P} title="Running bills due" meta="₹38.6 L" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              title="Lakeview Homes"
              meta="Bill 6 · ₹21 L · 12 days"
              right={
                <Tag tone="accent" accent={A}>
                  Late
                </Tag>
              }
            />
            <Row
              title="Metro Clinic"
              meta="Bill 3 · ₹9,40,000"
              right={<Tag tone="wait">Due Fri</Tag>}
            />
          </div>
        </div>
      </Card>
      <Pill x={40} y={268} i={4} accent={P} icon="chart">
        The week, in numbers you trust
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M284 100 C 294 100, 292 90, 302 90']}
        dots={[[284, 100]]}
      />
    </Fit>
  );
}

/** Built in phases: the roadmap, and what the phase under way adds. */
export function PhasesMock() {
  const phases = [
    { label: 'Phase 1 · Projects and site diary', value: 100 },
    { label: 'Phase 2 · Purchase and stores', value: 60 },
    { label: 'Phase 3 · Running bills', value: 0 },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={26} w={246} i={0}>
        <div className="p-3">
          <Head icon="rocket" accent={P} title="Roadmap" meta="Each phase quoted on its own" />
          <div className="mt-3 flex flex-col gap-2.5">
            {phases.map((p) => (
              <div key={p.label}>
                <p className="flex justify-between text-[10.5px]">
                  <span className="truncate">{p.label}</span>
                  <span className="text-ink-3">{p.value}%</span>
                </p>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-[#eef0f3]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${p.value}%`, background: A }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card x={284} y={60} w={216} i={2}>
        <div className="p-3">
          <Head icon="tasks" accent={P} title="Phase 2 · what it adds" meta="6 of 10 done" />
          <div className="mt-3">
            <Steps
              accent={A}
              gap={8}
              steps={[
                { title: 'Materials per project', meta: 'Live in testing', done: true },
                { title: 'Low stock raises a purchase', meta: 'Live in testing', done: true },
                { title: 'Goods received on a PO', meta: 'This week', icon: 'truck' },
              ]}
            />
          </div>
        </div>
      </Card>
      <Pill x={40} y={236} i={4} accent={P} icon="layers">
        Built in phases, each one useful
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M266 100 C 276 100, 274 110, 284 110']}
        dots={[[266, 100]]}
      />
    </Fit>
  );
}

/** Planning: every crew's and crane's week, each on the site it works. */
export function PlanMock() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const rows = [
    { m: 'Crew A · masons', from: 0, to: 3, t: 'Greenfield · slab 4' },
    { m: 'Crew B · masons', from: 1, to: 4, t: 'Lakeview · Tower 2' },
    { m: 'Crane 1', from: 0, to: 2, t: 'Greenfield · Block B' },
    { m: 'Crane 2', from: 2, to: 5, t: 'Lakeview · Tower 2' },
    { m: 'Plumbers', from: 0, to: 2, t: 'Metro Clinic · fit-out' },
    { m: 'Electricians', from: 2, to: 4, t: 'Metro Clinic · fit-out' },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={28} w={824} i={0}>
        <div className="p-3.5">
          <Head icon="calendar" accent={P} title="Crews and equipment" meta="15–20 Sep" />
          <div className="mt-3 grid grid-cols-[110px_repeat(6,minmax(0,1fr))] text-[9.5px] text-ink-3">
            <span />
            {days.map((d) => (
              <span key={d} className="border-l border-[#f0f0f3] pl-1.5">
                {d}
              </span>
            ))}
          </div>
          <div className="mt-1.5 flex flex-col gap-1.5">
            {rows.map((r, i) => (
              <div
                key={r.m}
                className="grid grid-cols-[110px_repeat(6,minmax(0,1fr))] items-center"
              >
                <span className="truncate text-[10.5px] font-medium">{r.m}</span>
                <span
                  className="truncate rounded-[7px] px-2 py-1.5 text-[10px] font-medium"
                  style={{
                    gridColumn: `${r.from + 2} / ${r.to + 2}`,
                    background: `color-mix(in srgb, ${A} ${i % 2 ? 10 : 16}%, white)`,
                  }}
                >
                  {r.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Pill x={330} y={300} i={4} accent={P} icon="calendar">
        Every site’s week, planned
      </Pill>
    </Fit>
  );
}

export const CUSTOM_SOFTWARE_MOCKS = [OrdersMock, ApprovalsMock, ReportsMock, PhasesMock, PlanMock];

/** How it's built: the office's projects, and the site engineer's diary on a tablet. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function CustomSoftwareHowScene({ box = false }: { box?: boolean }) {
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={30} w={330} i={0}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head icon="layers" accent={P} title="Projects" meta="app.constructioncompany.in" />
            <div className="mt-1.5 divide-y divide-[#f0f0f3]">
              <Row
                title="Greenfield School · Block B"
                meta="Slab 3 · 18 Oct"
                right={<Tag tone="ok">On time</Tag>}
              />
              <Row
                title="Lakeview Homes · Tower 2"
                meta="Brickwork · 30 Nov"
                right={<Tag tone="wait">At risk</Tag>}
              />
              <Row
                title="Metro Clinic · fit-out"
                meta="Plumbing · 6 Oct"
                right={<Tag tone="ok">On time</Tag>}
              />
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={434} y={44} w={300} i={2}>
          <div className="p-3.5">
            <Head
              icon="home"
              accent={P}
              title="Site diary · Block B"
              meta="Greenfield School · today"
            />
            <p className="mt-2 text-[20px] leading-none font-semibold">Slab 3 · 72%</p>
            <div className="mt-3">
              <Steps
                accent={A}
                gap={8}
                steps={[
                  { title: 'Shuttering checked', done: true },
                  { title: 'Concrete poured · 42 m³', done: true },
                  { title: 'Site photos', icon: 'scan' },
                ]}
              />
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -4, y: 258 } : HOME}>
        <Pill x={60} y={242} i={4} accent={P}>
          The office and the site on one system
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M386 126 H 438 V 260']}
          dots={[
            [386, 126],
            [438, 260],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M354 110 C 394 110, 394 100, 434 100']}
          dots={[
            [354, 110],
            [434, 100],
          ]}
        />
      )}
    </Fit>
  );
}

export function CustomSoftwareHow() {
  return <CustomSoftwareHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function CustomSoftwareHowBox() {
  return <CustomSoftwareHowScene box />;
}
