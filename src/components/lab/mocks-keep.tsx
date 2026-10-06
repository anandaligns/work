import { content } from '@/content/lab/keep-it-improving';

import { Bleed, Fit } from './fit';
import { Card, Head, Pill, Row, Tag, Wires } from './light-kit';
import { Stat, Steps } from './mock-parts';
import {
  Bar,
  Between,
  ChatHead,
  Check,
  Choice,
  Col,
  Composer,
  Dot,
  Figure,
  FilterRow,
  FlowStep,
  Grid,
  Label,
  Message,
  More,
  Notice,
  Pane,
  Segments,
  SideList,
  type SideItem,
  StepMark,
  SystemNote,
  Tabs,
  Tile,
  Title,
  ViewChip,
} from './window-kit';

/**
 * Website Care & Hosting's mockups, from its sample precision-parts maker and its old site,
 * yourbusiness.in: moved to our hosting and tested before the switch at 11 pm, watched from the
 * first day, and changed by message after. The three behind the system are drawn in the light kit
 * on a 480 × 340 canvas; how it works and what changes are the client portal's own windows,
 * running off the panel (`Bleed`). Every figure is the product page's own.
 */

const A = content.accent;

// --- the system behind a looked-after site -------------------------------------------------------

/** Moved, tested first: the move step by step, with email and the old addresses kept. */
export function MovedMock() {
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={22} w={252} i={0}>
        <div className="p-3.5">
          <Head
            icon="move"
            accent={A}
            title="Moving yourbusiness.in"
            meta="Switch tonight, 11 pm"
          />
          <div className="mt-3">
            <Steps
              accent={A}
              gap={9}
              steps={[
                { title: 'Checked', meta: 'Site, domain, hosting', done: true },
                { title: 'Access recovered', meta: 'Domain, admin, accounts', done: true },
                { title: 'Copied', meta: 'On our hosting', done: true },
                { title: 'Tested', meta: '46 pages · 3 fixed', done: true },
                { title: 'Switch', meta: 'Tonight, 11 pm', icon: 'globe' },
              ]}
            />
          </div>
        </div>
      </Card>
      <Card x={302} y={52} w={156} i={2}>
        <div className="p-2.5">
          <Head icon="mail" accent={A} title="Email" meta="Left as it is" />
        </div>
      </Card>
      <Card x={302} y={132} w={156} i={3}>
        <div className="p-2.5">
          <Head icon="link" accent={A} title="112 redirects" meta="Old addresses" />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M274 110 C 288 110, 288 78, 302 78', 'M274 110 C 288 110, 288 158, 302 158']}
        dots={[
          [274, 110],
          [302, 78],
          [302, 158],
        ]}
      />
      <Pill x={274} y={276} i={5} accent={A}>
        Tested before the switch
      </Pill>
    </Fit>
  );
}

/** Watched from the first day: normal, backed up, updated — and faster. */
export function WatchedMock() {
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={22} w={270} i={0}>
        <div className="px-3.5 pt-3.5 pb-1.5">
          <Head icon="gauge" accent={A} title="All systems normal" meta="Standard plan" />
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-[10px] bg-[#f7f7f9] p-2.5">
            <Stat label="Uptime" value="100%" accent={A} size={15} />
            <Stat label="Backup" value="2:00 am" accent={A} size={15} />
            <Stat label="Speed" value="94" accent={A} size={15} />
          </div>
          <div className="mt-1 divide-y divide-[#f0f0f3]">
            <Row
              lead={<Dot icon="gauge" accent={A} />}
              title="Monitoring"
              meta="Uptime watched"
              right={<Tag tone="ok">On</Tag>}
            />
            <Row
              lead={<Dot icon="database" accent={A} />}
              title="Nightly backups"
              meta="Kept 60 days"
              right={<Tag tone="ok">On</Tag>}
            />
            <Row
              lead={<Dot icon="shield" accent={A} />}
              title="Security updates"
              meta="Fortnightly"
              right={<Tag tone="ok">On</Tag>}
            />
          </div>
        </div>
      </Card>
      <Card x={312} y={118} w={146} i={3}>
        <div className="p-2.5">
          <Head icon="trend" accent={A} title="38 → 94" meta="Speed score" />
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M292 144 H 312']}
        dots={[
          [292, 144],
          [312, 144],
        ]}
      />
      <Pill x={22} y={290} i={5} accent={A}>
        Watched from day one
      </Pill>
    </Fit>
  );
}

/** Changes by message: asked in the portal, picked up, and the month's others already live. */
export function ChangesMock() {
  return (
    <Fit w={480} h={340}>
      <Card x={22} y={22} w={226} i={0}>
        <div className="p-3.5">
          <Head icon="pen" accent={A} title="New request" meta="Your portal · today" />
          <p className="mt-2.5 rounded-lg bg-[#f5f5f7] px-2.5 py-2 text-[11px] leading-snug text-ink-2">
            Change the sales phone number on the contact page.
          </p>
        </div>
      </Card>
      <Card x={276} y={44} w={182} i={2}>
        <div className="p-2.5">
          <Head icon="refresh" accent={A} title="Picked up" meta="Within your plan’s time" />
        </div>
      </Card>
      <Card x={196} y={156} w={262} i={3}>
        <div className="px-3.5 pt-3 pb-1">
          <Head icon="check" accent={A} title="This month" meta="5 of 5 changes" />
          <div className="mt-1 divide-y divide-[#f0f0f3]">
            <Row title="Product list for 2025" meta="Products" right={<Tag tone="ok">Live</Tag>} />
            <Row
              title="New CNC machine photos"
              meta="Capabilities"
              right={<Tag tone="ok">Live</Tag>}
            />
          </div>
        </div>
      </Card>
      <Wires
        w={480}
        h={340}
        accent={A}
        d={['M248 70 H 276', 'M366 96 V 156']}
        dots={[
          [248, 70],
          [276, 70],
          [366, 96],
          [366, 156],
        ]}
      />
      <Pill x={22} y={292} i={5} accent={A}>
        Changed in a sentence
      </Pill>
    </Fit>
  );
}

export const KEEP_BEHIND = [MovedMock, WatchedMock, ChangesMock];

// --- how it works ------------------------------------------------------------------------------

/**
 * How it works, after Lightfield's list behind its sequence: the move's checklist down the left,
 * each with a bar of four for how far it has got, and in front the move's own screen — its
 * figures, what it does, and its steps from the first check to the switch at 11 pm.
 */
const MOVE: {
  name: string;
  icon: 'search' | 'key' | 'server' | 'eye' | 'mail' | 'link' | 'globe' | 'gauge';
  done: number;
  tag?: string;
}[] = [
  { name: 'Site, domain and hosting', icon: 'search', done: 4 },
  { name: 'Access recovered', icon: 'key', done: 4 },
  { name: 'Copied to our hosting', icon: 'server', done: 4 },
  { name: 'Every page checked', icon: 'eye', done: 4, tag: '46' },
  { name: 'Email left untouched', icon: 'mail', done: 4 },
  { name: 'Old addresses redirected', icon: 'link', done: 4, tag: '112' },
  { name: 'Domain switched', icon: 'globe', done: 2, tag: 'Tonight' },
  { name: 'Watched', icon: 'gauge', done: 0, tag: 'From tomorrow' },
];

export function KeepHow() {
  return (
    <Bleed w={900} h={780}>
      <Pane x={56} y={168} w={520} h={700} i={0}>
        <Bar icon="move">
          <span className="font-semibold">The move</span>
          <ViewChip label="Everything" />
        </Bar>
        <FilterRow />
        <Grid
          cols="1fr 96px 1fr"
          head={[
            <Col key="s" icon="check">
              Step
            </Col>,
            <Col key="d" icon="chart">
              Done
            </Col>,
            'When',
          ]}
          rows={MOVE.map((step) => [
            <>
              <Dot icon={step.icon} accent={A} />
              <span className="truncate text-[12.5px] font-medium">{step.name}</span>
              {step.tag ? (
                <span className="mr-2 ml-auto shrink-0 text-[10.5px] font-medium text-ink-3">
                  {step.tag}
                </span>
              ) : null}
            </>,
            <Segments key="s" done={step.done} colour={A} />,
            null,
          ])}
        />
      </Pane>
      <Pane x={356} y={44} w={640} h={800} i={2}>
        <Bar icon="move">
          <span className="font-semibold">Moving yourbusiness.in</span>
          <More />
          <Tabs items={['Overview', 'Access', 'Speed', 'Hosting']} />
        </Bar>
        <div className="px-8 pt-7">
          <Title tile={<Tile icon="move" accent={A} />} title="Moving yourbusiness.in" />
          <div className="mt-7">
            <Label>The move</Label>
            <div className="mt-2.5 flex gap-2.5">
              <Figure value="38 → 94" label="Speed score" />
              <Figure value="46" label="Pages tested" />
              <Figure value="112" label="Redirects tested" />
              <Figure value="6" label="Logins written down" />
            </div>
          </div>
          <div className="mt-7">
            <Label>What it does</Label>
            <p className="mt-1.5 w-[560px] text-[15.5px] leading-[1.55]">
              Copy the site to our hosting, check it page by page, then switch the domain at a quiet
              hour, with email left untouched and old addresses redirected.
            </p>
          </div>
          <div className="mt-7">
            <Label>Steps</Label>
            <div className="mt-2.5">
              <FlowStep
                n={1}
                lead={<StepMark icon="search" />}
                title="Checked"
                line="site, domain, hosting and access"
              />
              <Between>Then</Between>
              <FlowStep
                n={2}
                lead={<StepMark icon="key" />}
                title="Access recovered"
                line="starting with the registrar"
              />
              <Between>Then</Between>
              <FlowStep
                n={3}
                lead={<StepMark icon="server" />}
                title="Copied and tested"
                line="46 pages, on our hosting"
              />
              <Between>Tonight, 11 pm</Between>
              <FlowStep
                n={4}
                lead={<StepMark icon="globe" />}
                title="Domain switched"
                line="checked from outside straight after"
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
 * What changes, after Lightfield's chat over its workspace: a change asked for in the portal at
 * the front — the request, picked up within the plan's time, and the month's tally — and behind it
 * the portal, what's switched on since the move and this month's changes down the left with the
 * new sales number open: what was asked, where, and how far it has got.
 */
const item = (
  icon: 'gauge' | 'database' | 'shield' | 'search' | 'chart' | 'pen' | 'file',
  title: string,
  meta: string,
  open = false,
): SideItem => ({ lead: <Dot icon={icon} accent={A} />, title, meta, open });

export function KeepBenefits() {
  return (
    <Bleed w={900} h={820}>
      <Pane x={232} y={262} w={720} h={640} i={0}>
        <div className="flex h-full">
          <SideList
            icon="pen"
            title="Your site"
            count="Standard plan"
            groups={[
              {
                title: 'Since the move',
                count: '5',
                items: [
                  item('gauge', 'Monitoring', 'Uptime watched'),
                  item('database', 'Nightly backups', 'Kept 60 days'),
                  item('shield', 'Security updates', 'Fortnightly'),
                  item('search', 'Search Console', 'Added, sitemap sent'),
                  item('chart', 'Google Analytics', 'New property, yours'),
                ],
              },
              {
                title: 'Changes this month',
                count: '5 of 5',
                items: [
                  item('pen', 'Sales phone number', 'Contact · in progress', true),
                  item('file', 'Careers page', 'New page · quote sent'),
                  item('pen', 'Product list for 2025', 'Products · live'),
                  item('pen', 'CNC machine photos', 'Capabilities · live'),
                  item('pen', 'ISO certificate PDF', 'Quality · live'),
                ],
              },
            ]}
          />
          <div className="min-w-0 flex-1">
            <Bar icon="pen">
              <span className="text-ink-2">Changes</span>
              <span className="text-ink-3">/</span>
              <span className="font-semibold">Sales phone number</span>
              <More />
            </Bar>
            <div className="px-7 pt-6">
              <Title
                tile={<Tile icon="pen" accent={A} />}
                title="Sales phone number"
                after={
                  <Tag tone="accent" accent={A}>
                    In progress
                  </Tag>
                }
              />
              <div className="mt-7">
                <Label>Asked</Label>
                <p className="mt-1.5 w-[440px] text-[15px] leading-[1.5]">
                  Change the sales phone number on the contact page.
                </p>
              </div>
              <div className="mt-6">
                <Label>Where</Label>
                <span className="mt-2 flex items-center gap-2.5 text-[13px] whitespace-nowrap">
                  <Dot icon="globe" accent={A} />
                  yourbusiness.in/contact
                  <span className="text-ink-3">The contact page</span>
                </span>
              </div>
              <div className="mt-6">
                <Label>How far it has got</Label>
                <ul className="mt-1">
                  <Check done title="Asked in your portal" meta="Today" accent={A} />
                  <Check
                    done={false}
                    title="In progress"
                    meta="Within your plan’s response time"
                    accent={A}
                  />
                  <Check
                    done={false}
                    title="Live on the site"
                    meta="Followed until it is"
                    accent={A}
                  />
                </ul>
              </div>
              <div className="mt-6 w-[470px] rounded-[14px] border border-[#e4e6eb] p-4">
                <Label>Your plan — Standard</Label>
                <p className="mt-2 text-[13px] font-semibold">5 changes a month · 5 of 5 asked</p>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-2">
                  Uptime 100% since the move, a backup every night at 2:00 am, and a speed score of
                  94.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Pane>
      <Pane x={36} y={36} w={428} h={524} i={2} float>
        <div className="flex h-full flex-col">
          <ChatHead
            icon="pen"
            title="Change the sales phone number"
            meta="Contact page · your portal"
          />
          <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-4 pt-3.5">
            <Notice icon="pen" meta="Request · today">
              Please change the sales phone number on the contact page.
            </Notice>
            <SystemNote accent={A}>Picked up within your plan’s response time</SystemNote>
            <Message own time="Today" accent={A}>
              On it. You can follow it here until it’s live.
            </Message>
            <div className="flex justify-end gap-1.5">
              <Choice on accent={A}>
                In progress
              </Choice>
              <Choice accent={A}>Live</Choice>
            </div>
            <Message own time="Today" accent={A}>
              That’s the fifth of five changes this month. The careers page you asked for is a new
              page, so it’s quoted separately: the quote is in your portal.
            </Message>
          </div>
          <Composer accent={A} placeholder="Ask for a change" />
        </div>
      </Pane>
    </Bleed>
  );
}
