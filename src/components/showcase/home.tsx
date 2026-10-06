'use client';

import type { CSSProperties } from 'react';

import { Bubble, Line, Panel, Stage, Status, Toast, Track } from './kit';

/**
 * The home page's pictures, in the showcase kit, as its Services pictures are drawn: the four
 * promises (a fixed quote, a timeline in writing, a change by message, the warranty) and the four
 * solutions at work beside their list, with the deck of all four when none is open. Every
 * business, figure and time on them is an example.
 */

// The promises' colours, one each, as the cards had them.
const AMBER = '#d98a00';
const VIOLET = '#6e78ff';
const ROSE = '#f0506e';
const GREEN = '#1fb866';

// --- the promises ----------------------------------------------------------------------------------

/** Your price is fixed before we build: the quote, signed and fixed, and the advance due. */
export function PriceMock() {
  return (
    <Stage w={480} accent={AMBER}>
      <Panel x={20} y={14} w={270} label="Fixed quote">
        <div className="px-2">
          <Line
            icon="file"
            title="Scope"
            meta="Agreed in writing"
            right={<Status>Signed</Status>}
          />
          <Line
            icon="rupee"
            title="Price"
            meta="₹45,000, one-time"
            right={<Status>Fixed</Status>}
          />
          <Line
            icon="clock"
            title="Advance"
            meta="Work starts once it clears"
            right={<Status tone="wait">Due</Status>}
          />
        </div>
      </Panel>
      <Toast
        x={268}
        y={-6}
        w={210}
        icon="check"
        title="No surprises later"
        meta="The price is the price"
      />
    </Stage>
  );
}

/** Clear timelines, written down: the six weeks, this one lit, and where the build is. */
export function TimelineMock() {
  const weeks = [1, 2, 3, 4, 5, 6];
  return (
    <Stage w={480} accent={VIOLET}>
      <Panel
        x={20}
        y={14}
        w={300}
        label="Connected Website"
        badge={<Status tone="accent">4–6 weeks</Status>}
      >
        <div className="mb-2 flex gap-1.5 px-2">
          {weeks.map((week) => (
            <span
              key={week}
              className={`sc-pop grid h-7 flex-1 place-items-center rounded-lg text-[11.5px] font-semibold ${week === 4 ? 'sc-status--ink' : week < 4 ? 'sc-tile--accent' : 'bg-fill text-ink-2'}`}
              style={{ '--i': week / 2 } as CSSProperties}
            >
              {week}
            </span>
          ))}
        </div>
        <Track
          steps={[
            { title: 'Design approved', meta: 'Week 2', done: true },
            { title: 'Build and connect', meta: 'Week 4 · now' },
            { title: 'Launch', meta: 'Week 6' },
          ]}
        />
      </Panel>
    </Stage>
  );
}

/** Changes by message, not meetings: asked in the portal, done and marked done. */
export function ChangesMock() {
  return (
    <Stage w={480} accent={ROSE}>
      <Panel x={20} y={14} w={320} label="Request #214 · your portal" badge={<Status>Done</Status>}>
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble meta="Mon 10:12 am" i={1}>
            Can you add our new branch timings to the contact page?
          </Bubble>
          <Bubble from="us" meta="Pixel Kinetix · 1:40 pm" i={3}>
            Done — the new timings are live.
          </Bubble>
        </div>
      </Panel>
    </Stage>
  );
}

/** Covered after launch: the warranty's dates, and a defect fixed under it. */
export function WarrantyMock() {
  return (
    <Stage w={480} accent={GREEN}>
      <Panel x={20} y={14} w={280} label="Covered after launch" badge={<Status>Active</Status>}>
        <div className="px-2">
          <Line icon="rocket" title="Launched" meta="12 Sep" />
          <Line icon="shield" title="Warranty until" meta="12 Oct · 30 days" />
        </div>
      </Panel>
      <Toast
        x={250}
        y={110}
        w={210}
        icon="wrench"
        tone="ok"
        title="Form fix · covered"
        meta="A defect we built"
      />
    </Stage>
  );
}
