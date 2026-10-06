import { ToolMark } from '../ui/brand-logos';
import { Bleed, Fit } from './fit';
import { Card, Face, Head, Mark, onColour, Pill, Row, Tag, Wires } from './light-kit';
import { Bars } from './mock-parts';
import {
  Bar,
  Between,
  ChatHead,
  Col,
  Dot,
  Figure,
  FilterRow,
  FlowStep,
  Grid,
  Label,
  More,
  Pane,
  Segments,
  SideList,
  type SideItem,
  StepMark,
  Tabs,
  Tile,
  Title,
  ViewChip,
} from './window-kit';
import { GRAPHITE } from '../visuals/graphite';

/**
 * Business Dashboard & CRM's mockups, from its sample bakery — three outlets (Jayanagar, Indiranagar,
 * Whitefield) and online orders, owned by Sameera Khan — and one Sunday night's numbers: the tools
 * connected and checked, the outlets side by side, and Whitefield's cash flagged ₹1,200 short.
 * The three behind the system are drawn in the light kit on a 480 × 340 canvas; how it works and
 * what changes are the bakery's own windows, running off the panel (`Bleed`). Every figure is the
 * product page's own.
 */

const A = GRAPHITE;

// --- the system behind every number ----------------------------------------------------------

/** Every tool, connected: counters, the store, payments and accounts into one view. */
export function ConnectedMock() {
  const sources = [
    { icon: 'store' as const, title: 'Counters', y: 26 },
    { tool: 'WooCommerce', title: 'WooCommerce', y: 96 },
    { tool: 'Razorpay', title: 'Razorpay', y: 166 },
    { tool: 'Tally', title: 'Tally', y: 236 },
  ];
  return (
    <Fit w={480} h={340}>
      {sources.map((s, i) => (
        <Card key={s.title} x={22} y={s.y} w={164} i={i}>
          <div className="p-2.5">
            <Head
              icon={'icon' in s ? s.icon : undefined}
              tool={'tool' in s ? s.tool : undefined}
              accent={A}
              title={s.title}
            />
          </div>
        </Card>
      ))}
      <Card x={226} y={46} w={232} i={4}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head
            icon="dashboard"
            accent={A}
            title="Monday, 15 Sep"
            meta="Every outlet and channel"
          />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Mark icon="trend" accent={A} size={26} />}
              title="₹1.86 L"
              meta="Sales yesterday"
              right={<Tag tone="ok">↑ 9%</Tag>}
            />
            <Row
              lead={<Mark icon="cart" accent={A} size={26} />}
              title="642"
              meta="Orders"
              right={<Tag tone="ok">↑ 31</Tag>}
            />
            <Row
              lead={<Mark icon="rupee" accent={A} size={26} />}
              title="₹42,300"
              meta="Cash to bank"
              right={<Tag>Matched</Tag>}
            />
          </div>
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={[
          'M186 52 C 210 52, 202 146, 226 146',
          'M186 122 C 210 122, 202 146, 226 146',
          'M186 192 C 210 192, 202 146, 226 146',
          'M186 262 C 210 262, 202 146, 226 146',
        ]}
        dots={[
          [186, 52],
          [186, 122],
          [186, 192],
          [186, 262],
          [226, 146],
        ]}
      />
      <Pill x={246} y={274} i={6} accent={A}>
        Every number entered once
      </Pill>
    </Fit>
  );
}

/** One view: the outlets side by side, the same figures for everyone. */
export function OutletsMock() {
  const outlets: [string, string, 'ok' | 'wait', string][] = [
    ['Jayanagar', '₹4.6 L · wastage 2.4%', 'ok', 'On track'],
    ['Indiranagar', '₹3.9 L · wastage 3.0%', 'ok', 'On track'],
    ['Whitefield', '₹2.9 L · wastage 4.2%', 'wait', 'Check'],
    ['Online', '₹2.8 L · 842 orders', 'ok', 'On track'],
  ];
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={22} w={292} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="store" accent={A} title="Outlets" meta="This week" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {outlets.map(([name, meta, tone, tag]) => (
              <Row
                key={name}
                lead={<Mark icon={name === 'Online' ? 'globe' : 'store'} accent={A} size={26} />}
                title={name}
                meta={meta}
                right={<Tag tone={tone}>{tag}</Tag>}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={332} y={30} w={126} i={3}>
        <div className="p-2.5">
          <Head icon="people" accent={A} title="Everyone" meta="One set" />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M314 56 H 332']}
        dots={[
          [314, 56],
          [332, 56],
        ]}
      />
      <Pill x={22} y={276} i={5} accent={A}>
        The same figures for everyone
      </Pill>
    </Fit>
  );
}

/** Flagged as it happens: today's three, on the owner's phone. */
export function FlagsMock() {
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={24} w={284} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="bell" accent={A} title="Flagged" meta="Today · 3" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Mark icon="rupee" accent={A} size={26} />}
              title="Whitefield cash short ₹1,200"
              meta="Closing count, 10:40 pm"
              right={<Tag tone="wait">Check</Tag>}
            />
            <Row
              lead={<Mark icon="database" accent={A} size={26} />}
              title="Butter: 6 kg left"
              meta="Jayanagar · reorder at 10 kg"
              right={
                <Tag tone="accent" accent={A}>
                  Reorder
                </Tag>
              }
            />
            <Row
              lead={<Mark icon="alert" accent={A} size={26} />}
              title="5 online refunds"
              meta="Late deliveries, Indiranagar"
              right={<Tag>Look</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={250} y={232} w={208} i={3}>
        <div className="p-2.5">
          <Head icon="rupee" accent={A} title="Counted vs billed" meta="Whitefield · −₹1,200" />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M200 212 V 257 H 250']}
        dots={[
          [200, 212],
          [250, 257],
        ]}
      />
      <Pill x={22} y={290} i={5} accent={A}>
        Not found at month-end
      </Pill>
    </Fit>
  );
}

export const RUN_BEHIND = [ConnectedMock, OutletsMock, FlagsMock];

// --- how it works ------------------------------------------------------------------------------

/**
 * How it works, after Lightfield's list behind its sequence: every connection and sheet down the
 * left, each with a bar of four for how far it's in (connected, read, moving, retired), and in
 * front last night's sync — yesterday's figures, what it does, and its steps from the counters'
 * bills at 11:05 pm to the day book posted to Tally at 2:00 am.
 */
const LINKS: {
  name: string;
  mark: { tool: string } | { icon: 'store' | 'people' | 'table' | 'rupee' };
  done: number;
  tag?: string;
  grey?: boolean;
}[] = [
  { name: 'Counter sales', mark: { icon: 'store' }, done: 4, tag: '3 outlets' },
  { name: 'WooCommerce', mark: { tool: 'WooCommerce' }, done: 4 },
  { name: 'Razorpay', mark: { tool: 'Razorpay' }, done: 4 },
  { name: 'Tally', mark: { tool: 'Tally' }, done: 4 },
  { name: 'Google Sheets', mark: { tool: 'Google Sheets' }, done: 3, tag: 'Roster' },
  { name: 'Staff roster', mark: { icon: 'people' }, done: 2, tag: 'Moving' },
  { name: 'Daily sales sheet', mark: { icon: 'table' }, done: 4, tag: 'Retired', grey: true },
  { name: 'Supplier payments', mark: { icon: 'rupee' }, done: 0, tag: 'Phase 3' },
];

export function RunHow() {
  return (
    <Bleed w={900} h={780}>
      <Pane x={56} y={168} w={520} h={700} i={0}>
        <Bar icon="plug">
          <span className="font-semibold">Connections</span>
          <ViewChip label="Kept and connected" />
        </Bar>
        <FilterRow />
        <Grid
          cols="1fr 96px 1fr"
          head={[
            <Col key="t" icon="plug">
              Tool or sheet
            </Col>,
            <Col key="s" icon="chart">
              Status
            </Col>,
            'Last run',
          ]}
          rows={LINKS.map((link) => [
            <>
              {'tool' in link.mark ? (
                <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f2f3f5]">
                  <ToolMark tool={link.mark.tool} size={13} />
                </span>
              ) : (
                <Dot icon={link.mark.icon} accent={A} />
              )}
              <span className="truncate text-[12.5px] font-medium">{link.name}</span>
              {link.tag ? (
                <span className="mr-2 ml-auto shrink-0 text-[10.5px] font-medium text-ink-3">
                  {link.tag}
                </span>
              ) : null}
            </>,
            <Segments key="s" done={link.done} colour={link.grey ? '#b9bdc7' : A} />,
            null,
          ])}
        />
      </Pane>
      <Pane x={356} y={44} w={640} h={800} i={2}>
        <Bar icon="plug">
          <span className="font-semibold">Last night’s sync</span>
          <More />
          <Tabs items={['Overview', 'Connections', 'Checks', 'Exports']} />
        </Bar>
        <div className="px-8 pt-7">
          <Title tile={<Tile icon="plug" accent={A} />} title="Last night’s sync" />
          <div className="mt-7">
            <Label>Yesterday</Label>
            <div className="mt-2.5 flex gap-2.5">
              <Figure value="₹1.86 L" share="↑ 9%" label="Sales" />
              <Figure value="642" label="Orders" />
              <Figure value="₹42,300" label="Cash to bank" />
              <Figure value="3.1%" label="Wastage" />
            </div>
          </div>
          <div className="mt-7">
            <Label>What it does</Label>
            <p className="mt-1.5 w-[560px] text-[15.5px] leading-[1.55]">
              Every tool you keep is linked through its API or exports, and every number is checked
              against the tool’s own total before it reaches the dashboard.
            </p>
          </div>
          <div className="mt-7">
            <Label>Steps</Label>
            <div className="mt-2.5">
              <FlowStep
                n={1}
                lead={<StepMark icon="store" />}
                title="Counter sales, 3 outlets"
                line="1,488 bills · ₹1.32 L"
              />
              <Between>11:10 pm</Between>
              <FlowStep
                n={2}
                lead={<StepMark tool="WooCommerce" />}
                title="Online orders and refunds"
                line="192 orders · 5 refunds"
              />
              <Between>11:12 pm</Between>
              <FlowStep
                n={3}
                lead={<StepMark tool="Razorpay" />}
                title="Payments settled"
                line="₹54,210 · 188 payments"
              />
              <Between>2:00 am</Between>
              <FlowStep
                n={4}
                lead={<StepMark tool="Tally" />}
                title="Day book to accounts"
                line="one voucher for each outlet"
              />
            </div>
          </div>
        </div>
      </Pane>
    </Bleed>
  );
}

// --- what changes ------------------------------------------------------------------------------

/**
 * What changes, after Lightfield's chat over its workspace: the week's summary on the owner's
 * screen at the front — ₹11.4 L, the outlets, and today's flags — and behind it the bakery's
 * workspace, its connections and outlets down the left with Whitefield open: the week's figures,
 * the cash that didn't match, eight weeks of wastage and who sees it.
 */
const tool = (name: string, meta: string): SideItem => ({
  lead: (
    <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#f2f3f5]">
      <ToolMark tool={name} size={13} />
    </span>
  ),
  title: name,
  meta,
});
const outlet = (name: string, meta: string, open = false): SideItem => ({
  lead: <Dot icon={name === 'Online' ? 'globe' : 'store'} accent={A} />,
  title: name,
  meta,
  open,
});
const face = (name: string) => <Face name={name} tone={`color-mix(in srgb, ${A} 14%, white)`} />;

/** Whitefield's wastage over eight weeks, as bars. */
const WASTAGE = [5.1, 4.9, 4.6, 4.8, 4.4, 4.3, 4.1, 4.2];

export function RunBenefits() {
  return (
    <Bleed w={900} h={820}>
      <Pane x={232} y={262} w={720} h={640} i={0}>
        <div className="flex h-full">
          <SideList
            icon="store"
            title="Outlets"
            count="This week"
            groups={[
              {
                title: 'Connected',
                count: '5',
                items: [
                  {
                    lead: <Dot icon="store" accent={A} />,
                    title: 'Counters',
                    meta: '1,488 bills · matched',
                  },
                  tool('WooCommerce', '192 orders · matched'),
                  tool('Razorpay', '188 payments · matched'),
                  tool('Tally', 'Day book · posted'),
                  tool('Google Sheets', 'Roster · read'),
                ],
              },
              {
                title: 'Outlets',
                count: '4',
                items: [
                  outlet('Jayanagar', '₹4.6 L · on track'),
                  outlet('Indiranagar', '₹3.9 L · on track'),
                  outlet('Whitefield', '₹2.9 L · check the cash', true),
                  outlet('Online', '₹2.8 L · on track'),
                ],
              },
            ]}
          />
          <div className="min-w-0 flex-1">
            <Bar icon="store">
              <span className="text-ink-2">Outlets</span>
              <span className="text-ink-3">/</span>
              <span className="font-semibold">Whitefield</span>
              <More />
            </Bar>
            <div className="px-7 pt-6">
              <Title
                tile={<Tile icon="store" accent={A} />}
                title="Whitefield"
                after={<Tag tone="wait">Check</Tag>}
              />
              <div className="mt-7">
                <Label>This week</Label>
                <div className="mt-2.5 flex gap-2.5">
                  <Figure value="₹2.9 L" label="Sales" w={140} />
                  <Figure value="1,122" label="Orders" w={140} />
                  <Figure value="4.2%" label="Wastage" w={140} />
                </div>
              </div>
              <div className="mt-6">
                <Label>Cash</Label>
                <span className="mt-2 flex items-center gap-2.5 text-[13px] whitespace-nowrap">
                  <Dot icon="rupee" accent={A} />
                  Short ₹1,200
                  <span className="text-ink-3">Counted vs billed · closing count, 10:40 pm</span>
                </span>
              </div>
              <div className="mt-6 w-[300px]">
                <Label>Wastage, last 8 weeks</Label>
                <div className="mt-2.5">
                  <Bars values={WASTAGE.map((v) => Math.round((v / 5.1) * 100))} accent={A} />
                </div>
                <p className="mt-1.5 flex justify-between text-[10.5px] text-ink-3">
                  <span>Wk 30 · 5.1%</span>
                  <span>Wk 37 · 4.2%</span>
                </p>
              </div>
              <div className="mt-6 w-[470px] rounded-[14px] border border-[#e4e6eb] p-4">
                <Label>Who sees it</Label>
                <div className="mt-2.5 flex items-center gap-2.5 text-[13px]">
                  {face('Sameera Khan')}
                  <span className="font-semibold">Sameera Khan</span>
                  <span className="text-ink-3">Owner · every outlet</span>
                </div>
                <div className="mt-2 flex items-center gap-2.5 text-[13px]">
                  {face('Joseph D')}
                  <span className="font-semibold">Joseph D</span>
                  <span className="text-ink-3">Manager · Whitefield</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Pane>
      <Pane x={36} y={36} w={428} h={524} i={2} float>
        <div className="flex h-full flex-col">
          <ChatHead icon="chart" title="Week 37" meta="Three outlets and online · Monday" />
          <div className="flex flex-1 flex-col overflow-hidden px-5 pt-4">
            <Label>Sales this week</Label>
            <p className="mt-1.5 flex items-baseline gap-3">
              <span className="text-[34px] leading-none font-medium tracking-[-0.02em]">
                ₹11.4 L
              </span>
              <Tag tone="ok">↑ 7% on last week</Tag>
            </p>
            <p className="mt-2 text-[12px] text-ink-3">Best day: Saturday, ₹2.1 L</p>
            <div className="mt-5">
              <Label>By outlet</Label>
              <div className="mt-1 divide-y divide-[#f0f0f3]">
                <Row
                  lead={<Dot icon="store" accent={A} />}
                  title="Jayanagar"
                  right={<span className="text-[12px] font-semibold">₹4.6 L</span>}
                />
                <Row
                  lead={<Dot icon="store" accent={A} />}
                  title="Indiranagar"
                  right={<span className="text-[12px] font-semibold">₹3.9 L</span>}
                />
                <Row
                  lead={<Dot icon="store" accent={A} />}
                  title="Whitefield"
                  meta="Cash short ₹1,200"
                  right={<span className="text-[12px] font-semibold">₹2.9 L</span>}
                />
              </div>
            </div>
            <div className="mt-4">
              <Label>Flagged today</Label>
              <div className="mt-1 divide-y divide-[#f0f0f3]">
                <Row
                  lead={<Dot icon="database" accent={A} />}
                  title="Butter: 6 kg left"
                  meta="Jayanagar · reorder at 10 kg"
                  right={
                    <Tag tone="accent" accent={A}>
                      Reorder
                    </Tag>
                  }
                />
              </div>
            </div>
          </div>
          <div className="shrink-0 border-t border-[#eef0f3] p-3">
            <span
              className="block rounded-[11px] py-2.5 text-center text-[12.5px] font-semibold"
              style={{ background: A, color: onColour(A) }}
            >
              Open the full view
            </span>
          </div>
        </div>
      </Pane>
    </Bleed>
  );
}
