'use client';

import { content } from '@/content/lab/keep-it-improving';

import {
  Card,
  Line,
  Metric,
  Mono,
  Panel,
  Press,
  Ring,
  Stage,
  Status,
  Step,
  Toast,
  Track,
} from './kit';

/**
 * Website Care & Hosting's solution page, in the showcase kit, from its sample business — an
 * industrial firm's site, yourbusiness.in: moved to our hosting in one night, watched and backed up
 * from the next morning, and its changes asked for in the portal and followed until they're live.
 */
const A = content.accent;

/** Moved in one night: the move's steps, the email left alone and the old addresses redirected. */
export function MovedMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel
        x={20}
        y={20}
        w={290}
        label="Moving yourbusiness.in"
        badge={<Status tone="accent">Tonight 11 pm</Status>}
      >
        <Track
          steps={[
            { title: 'Checked', meta: 'Site, domain, hosting', done: true },
            { title: 'Access recovered', meta: 'Domain, admin, accounts', done: true },
            { title: 'Copied and tested', meta: '46 pages · 3 fixed', done: true },
            { title: 'Switch', meta: 'Tonight, 11 pm' },
          ]}
        />
      </Panel>
      <Panel x={290} y={110} w={190} label="Left alone" i={2}>
        <div className="px-1.5">
          <Line icon="mail" title="Email" meta="Left as it is" />
          <Line icon="link" title="112 redirects" meta="Old addresses" />
        </div>
      </Panel>
    </Stage>
  );
}

/** Watched: everything normal, the backup at 2 am, and the speed since the move. */
export function WatchedMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={310} label="All systems normal" live foot={['Plan', 'Standard']}>
        <div className="grid grid-cols-3 gap-3 px-3 pb-3">
          <Metric label="Uptime" value={100} suffix="%" size={24} />
          <Metric label="Backup" value="2:00 am" size={20} />
          <Metric label="Speed" value={94} size={24} />
        </div>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            icon="gauge"
            title="Monitoring"
            meta="Uptime watched"
            status="On"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="database"
            title="Nightly backups"
            meta="Kept 60 days"
            status="On"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="shield"
            title="Security updates"
            meta="Fortnightly"
            status="On"
          />
        </div>
      </Panel>
      <Card x={300} y={230} w={180} i={3}>
        <div className="flex items-center gap-3 p-2">
          <Ring value={94} size={52} />
          <span>
            <span className="block text-[13px] font-medium text-ink">38 → 94</span>
            <span className="block text-[11px] text-ink-2">Speed score</span>
          </span>
        </div>
      </Card>
    </Stage>
  );
}

/** Changes: asked in the portal, picked up within the plan's time, live on the site. */
export function ChangesMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={300} label="This month · 5 of 5 changes" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            icon="pen"
            title="Sales phone number"
            meta="Contact · today"
            status="In progress"
            tone="accent"
          />
          <Step
            turn
            n={3}
            i={1}
            icon="pen"
            title="Product list for 2025"
            meta="Products"
            status="Live"
          />
          <Step
            turn
            n={3}
            i={2}
            icon="pen"
            title="New CNC machine photos"
            meta="Capabilities"
            status="Live"
          />
        </div>
      </Panel>
      <Toast
        x={262}
        y={250}
        w={226}
        icon="check"
        tone="ok"
        title="Picked up"
        meta="Within your plan’s time"
      />
    </Stage>
  );
}

/** How it works: the move, step by step, and its night — the speed, the pages and redirects tested. */
export function KeepHow() {
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={150} w={256} label="The move · everything">
        <div className="px-2">
          <Line icon="search" title="Site, domain, hosting" right={<Status>Done</Status>} />
          <Line icon="key" title="Access recovered" right={<Status>Done</Status>} />
          <Line icon="server" title="Copied to our hosting" right={<Status>Done</Status>} />
          <Line icon="eye" title="Every page checked" meta="46" right={<Status>Done</Status>} />
          <Line
            icon="mail"
            title="Email left untouched"
            right={<Status tone="muted">Kept</Status>}
          />
          <Line
            icon="globe"
            title="Domain switched"
            right={<Status tone="accent">Tonight</Status>}
          />
        </div>
      </Panel>
      <Panel x={296} y={20} w={500} label="Moving yourbusiness.in" live i={2}>
        <div className="grid grid-cols-4 gap-3 px-3 pb-3">
          <Metric label="Speed score" value="38 → 94" size={20} />
          <Metric label="Pages tested" value={46} size={22} />
          <Metric label="Redirects" value={112} size={22} />
          <Metric label="Logins noted" value={6} size={22} />
        </div>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            icon="search"
            title="1 · Checked"
            meta="Site, domain, hosting and access"
          />
          <Step
            turn
            n={4}
            i={1}
            icon="key"
            title="2 · Access recovered"
            meta="Starting with the registrar"
          />
          <Step
            turn
            n={4}
            i={2}
            icon="server"
            title="3 · Copied and tested"
            meta="46 pages, on our hosting"
          />
          <Step
            turn
            n={4}
            i={3}
            icon="globe"
            title="4 · Domain switched"
            meta="Tonight, 11 pm · checked from outside"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** What changes: the site's month since the move, and a change asked for and followed until it's live. */
export function KeepBenefits() {
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={20} w={330} label="Your site · since the move" live>
        <div className="px-2">
          <Line icon="gauge" title="Monitoring" meta="Uptime watched" right={<Status>On</Status>} />
          <Line
            icon="database"
            title="Nightly backups"
            meta="Kept 60 days"
            right={<Status>On</Status>}
          />
          <Line
            icon="shield"
            title="Security updates"
            meta="Fortnightly"
            right={<Status>On</Status>}
          />
          <Line
            tool="Google Search Console"
            title="Search Console"
            meta="Sitemap sent"
            right={<Status>On</Status>}
          />
          <Line
            tool="Google Analytics"
            title="Google Analytics"
            meta="New property, yours"
            right={<Status>On</Status>}
          />
        </div>
      </Panel>
      <Panel
        x={330}
        y={170}
        w={410}
        label="Changes / Sales phone number"
        badge={<Status tone="accent">Asked today</Status>}
        i={3}
      >
        <div className="px-2 pb-2">
          <p className="text-[12px] text-ink-2">Where · the contact page</p>
          <div className="mt-2">
            <Track
              steps={[
                { title: 'Asked in your portal', meta: 'Today', done: true },
                { title: 'In progress', meta: 'Within your plan’s response time' },
                { title: 'Live on the site', meta: 'Followed until it is' },
              ]}
            />
          </div>
          <div className="mt-2 flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
            <span>
              <Mono>Your plan — Standard</Mono>
              <span className="mt-1 block text-[12px] text-ink">
                5 changes a month · 5 of 5 asked
              </span>
            </span>
          </div>
          <Press className="mt-2.5">Ask for a change</Press>
        </div>
      </Panel>
    </Stage>
  );
}
