import { Fit } from './fit';
import { Card, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Bars, Chip, Dot, RoleGrid, Stat } from './mock-parts';
import { GRAPHITE } from '../visuals/graphite';

/**
 * Dashboards' mockups, in the light kit, from the page's own sample business — a Solar Energy
 * Company with 38 rooftop sites in three regions: yesterday's summary at 7:00 am, five tools
 * feeding one set of numbers, Bangalore North's sites, four things flagged (an inverter offline
 * among them), and September's generation targets. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = GRAPHITE;
/** The business's own colour: everything inside its screens. */
const A = GRAPHITE;

/** Morning summary: yesterday across 38 sites, in the inbox at 7:00 am. */
export function DigestMock() {
  const lines = [
    ['Generated', '4,120 kWh · up 6%'],
    ['Saved for clients', '₹32,960'],
    ['Sites online', '37 of 38'],
    ['New leads', '9 · 5 from Google'],
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={20} w={290} i={0}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <Dot icon="mail" tone={P} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11.5px] font-semibold">
                Yesterday: 4,120 kWh generated
              </span>
              <span className="block truncate text-[9.5px] text-ink-3">
                Solar Energy Company · Dashboard
              </span>
            </span>
            <span className="text-[9.5px] text-ink-3">7:00 am</span>
          </div>
          <p className="mt-2 text-[10.5px] text-ink-2">
            Good morning, Kavya. Here is yesterday across your 38 sites.
          </p>
          <div className="mt-2 divide-y divide-[#f0f0f3] rounded-[10px] border border-[#eef0f3] px-2.5">
            {lines.map(([k, v]) => (
              <p key={k} className="flex items-center justify-between py-1.5 text-[10.5px]">
                <span className="text-ink-3">{k}</span>
                <span className="font-medium">{v}</span>
              </p>
            ))}
          </div>
          <span
            className="mt-2.5 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Open the dashboard
          </span>
        </div>
      </Card>
      <Card x={328} y={110} w={172} i={2}>
        <div className="p-3">
          <Head icon="alert" accent={P} title="4 need a look" meta="Today" />
          <p className="mt-2 text-[10px] leading-[1.45] text-ink-2">
            Inverter offline at Site 14, 5 surveys not confirmed…
          </p>
        </div>
      </Card>
      <Pill x={328} y={220} i={4} accent={P} icon="clock">
        Before the day starts
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M310 150 C 318 150, 318 140, 328 140']}
        dots={[[310, 150]]}
      />
    </Fit>
  );
}

/** One source: every tool connected, live, into one set of numbers. */
export function SourcesMock() {
  const tools = [
    { tool: 'Razorpay', meta: 'Payments', y: 18 },
    { tool: 'Zoho CRM', meta: 'Leads', y: 70 },
    { tool: 'Google Sheets', meta: 'Site readings', y: 122 },
    { tool: 'Tally', meta: 'Invoices', y: 174 },
    { tool: 'WhatsApp', meta: 'Messages', y: 226 },
  ];
  return (
    <Fit w={520} h={340}>
      {tools.map((t, i) => (
        <Card key={t.tool} x={20} y={t.y} w={196} i={i}>
          <div className="p-2">
            <Head
              tool={t.tool}
              accent={P}
              title={t.tool}
              meta={t.meta}
              right={<Tag tone="ok">Live</Tag>}
            />
          </div>
        </Card>
      ))}
      <Card x={290} y={96} w={210} i={5}>
        <div className="p-3">
          <Head
            icon="dashboard"
            accent={P}
            title="One set of numbers"
            meta="Same totals for everyone"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Generated" value="118 MWh" accent={A} size={16} />
            <Stat label="New leads" value="236" accent={A} size={16} />
          </div>
        </div>
      </Card>
      <Pill x={290} y={236} i={6} accent={P} icon="refresh">
        Every tool, one set of numbers
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={[
          'M216 42 C 254 42, 252 120, 290 120',
          'M216 94 C 254 94, 252 128, 290 128',
          'M216 146 C 254 146, 252 136, 290 136',
          'M216 198 C 254 198, 252 144, 290 144',
          'M216 250 C 254 250, 252 152, 290 152',
        ]}
        dots={[[290, 136]]}
      />
    </Fit>
  );
}

/** Filters: Bangalore North's rooftop sites this week, and generation through the day. */
export function FiltersMock() {
  const rows = [
    { who: 'Site 03 · Hebbal', meta: '1,240 kWh · 99.8% up', v: '₹9,920' },
    { who: 'Site 07 · Yelahanka', meta: '1,110 kWh · 97.2% up', v: '₹8,880' },
    { who: 'Site 14 · Jakkur', meta: '860 kWh · offline 6:10 am', v: '₹6,880' },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={280} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="filter" accent={P} title="Sites" meta="This week · savings" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip on accent={A}>
              Bangalore North
            </Chip>
            <Chip on accent={A}>
              Homes
            </Chip>
            <Chip accent={A}>Weekdays</Chip>
          </div>
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {rows.map((r) => (
              <Row
                key={r.who}
                lead={<Dot icon="pin" tone={P} />}
                title={r.who}
                meta={r.meta}
                right={<span className="text-[11px] font-semibold">{r.v}</span>}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={318} y={82} w={182} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Generation by hour</p>
          <div className="mt-2.5">
            <Bars values={[8, 30, 62, 88, 100, 84, 52, 20]} accent={A} height={64} />
          </div>
          <p className="mt-1.5 flex justify-between text-[8.5px] text-ink-3">
            <span>6 am</span>
            <span>12 pm</span>
            <span>6 pm</span>
          </p>
        </div>
      </Card>
      <Pill x={40} y={262} i={4} accent={P} icon="filter">
        Your own question, answered in two taps
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M300 110 C 310 110, 308 120, 318 120']}
        dots={[[300, 110]]}
      />
    </Fit>
  );
}

/** Flags: what the dashboard noticed overnight, each with what to do. */
export function FlagsMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={290} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="alert" accent={P} title="Needs attention" meta="Flagged at 7:00 am" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Dot icon="alert" tone={P} />}
              title="Inverter offline · Site 14"
              meta="Since 6:10 am · Jakkur"
              right={
                <Tag tone="accent" accent={A}>
                  New
                </Tag>
              }
            />
            <Row
              lead={<Dot icon="receipt" tone={P} />}
              title="3 invoices unpaid, 7 days"
              meta="₹6,800 · Bangalore South"
              right={<Tag tone="wait">Chase</Tag>}
            />
            <Row
              lead={<Dot icon="calendar" tone={P} />}
              title="5 surveys not confirmed"
              meta="Today before 11 am"
              right={
                <Tag tone="accent" accent={A}>
                  Today
                </Tag>
              }
            />
            <Row
              lead={<Dot icon="phone" tone={P} />}
              title="2 leads not called back"
              meta="Waiting over 48 hours"
              right={<Tag>Call</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={328} y={96} w={172} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Site 14, this week</p>
          <div className="mt-2.5">
            <Bars values={[92, 95, 90, 94, 93, 96, 8]} accent={A} height={56} />
          </div>
        </div>
      </Card>
      <Pill x={328} y={214} i={4} accent={P} icon="bell">
        Found for you, not by you
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M310 70 C 320 70, 318 120, 328 120']}
        dots={[[310, 70]]}
      />
    </Fit>
  );
}

/** Targets: each region against September's generation target, sixteen days in. */
export function TargetsMock() {
  const regions = [
    { name: 'Bangalore North', value: 82, note: '46 of 56 MWh' },
    { name: 'Bangalore South', value: 64, note: '41 of 64 MWh' },
    { name: 'Mysuru', value: 91, note: '31 of 34 MWh' },
  ];
  return (
    <Fit w={880} h={360}>
      <Card x={28} y={40} w={320} i={0}>
        <div className="p-3.5">
          <Head icon="target" accent={P} title="Targets · September" meta="Day 16 of 30" />
          <div className="mt-3 flex flex-col gap-3">
            {regions.map((b) => (
              <div key={b.name}>
                <p className="flex justify-between text-[11px]">
                  <span className="font-medium">{b.name}</span>
                  <span className="text-ink-3">{b.note}</span>
                </p>
                <span className="mt-1 block h-2 overflow-hidden rounded-full bg-[#eef0f3]">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${b.value}%`,
                      background: b.value < 70 ? `color-mix(in srgb, ${A} 45%, white)` : A,
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card x={376} y={60} w={260} i={2}>
        <div className="p-3.5">
          <Head icon="chart" accent={P} title="Month so far" meta="Generation against the plan" />
          <div className="mt-3">
            <Bars values={[8, 25, 42, 58, 77, 100]} accent={A} height={100} />
          </div>
        </div>
      </Card>
      <Card x={664} y={112} w={188} i={3}>
        <div className="p-3">
          <Stat label="All regions" value="118 MWh" delta="9%" accent={A} />
          <p className="mt-2 text-[10px] text-ink-3">Bangalore South needs 23 MWh more</p>
        </div>
      </Card>
      <Pill x={376} y={288} i={4} accent={P} icon="target">
        Where each region stands, mid-month
      </Pill>
      <Wires
        w={880}
        h={360}
        accent={P}
        d={['M348 110 C 362 110, 362 120, 376 120', 'M636 150 C 650 150, 650 140, 664 140']}
        dots={[
          [348, 110],
          [636, 150],
        ]}
      />
    </Fit>
  );
}

export const DASHBOARDS_MOCKS = [DigestMock, SourcesMock, FiltersMock, FlagsMock, TargetsMock];

/** How it's built: what each role sees, and the owner's morning on her phone. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function DashboardsHowScene({ box = false }: { box?: boolean }) {
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={28} w={380} i={0}>
          <div className="p-3.5">
            <Head
              icon="lock"
              accent={P}
              title="Roles and access"
              meta="dashboard.solarenergycompany.in"
            />
            <div className="mt-3">
              <RoleGrid
                accent={A}
                heads={['Owner', 'Ops', 'Sales', 'Accts']}
                rows={[
                  { label: 'Generation and savings', values: [true, true, false, true] },
                  { label: 'Payments and invoices', values: [true, false, false, true] },
                  { label: 'Leads and surveys', values: [true, true, true, false] },
                  { label: 'Every region', values: [true, true, false, true] },
                ]}
              />
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={462} y={40} w={272} i={2}>
          <div className="px-3.5 pt-3.5 pb-1.5">
            <Head icon="devices" accent={P} title="Good morning, Kavya" meta="On her phone" />
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              <Stat label="kWh made" value="4,120" accent={A} size={15} />
              <Stat label="Sites up" value="37/38" accent={A} size={15} />
              <Stat label="Leads" value="9" accent={A} size={15} />
            </div>
            <div className="mt-2 divide-y divide-[#f0f0f3]">
              <Row
                lead={<Dot icon="alert" tone={P} />}
                title="Inverter offline"
                meta="Site 14 · since 6:10 am"
              />
            </div>
          </div>
        </Card>
        <Wires w={760} h={330} accent={P} d={['M404 110 C 434 110, 432 100, 462 100']} />
      </Group>
      <Group at={box ? { x: -4, y: 250 } : HOME}>
        <Pill x={60} y={250} i={4} accent={P}>
          Everyone sees their numbers, no more
        </Pill>
      </Group>
      {box ? (
        <Wires w={760} h={560} accent={P} d={[]} dots={[]} />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M404 110 C 434 110, 432 100, 462 100']}
          dots={[
            [404, 110],
            [462, 100],
          ]}
        />
      )}
    </Fit>
  );
}

export function DashboardsHow() {
  return <DashboardsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function DashboardsHowBox() {
  return <DashboardsHowScene box />;
}
