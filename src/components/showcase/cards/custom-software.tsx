'use client';

import { Line, Meter, Metric, Money, Press, Status, Step } from '../kit';
import { App, Sheet } from '../sheet';

/**
 * Custom Software's five screens, from the page's sample business — a Construction Company run by
 * Vinod Shetty: every project and its stage, the purchases waiting for him, the week on site, the
 * system built in phases, and the site engineer's diary on a tablet.
 */

/** One system: every project, its stage on site and how far along it is. */
export function Projects() {
  return (
    <Sheet label="Projects" live>
      <div className="flex flex-col gap-2.5">
        <Meter label="Greenfield" value={72} />
        <Meter label="Lakeview" value={48} i={1} />
        <Meter label="Metro Clinic" value={85} i={2} />
        <Meter label="Orchid" value={100} i={3} />
      </div>
      <div className="mt-3">
        <Line
          icon="factory"
          title="Block B · slab 3"
          meta="Due 18 Oct"
          right={<Status tone="accent">72%</Status>}
        />
      </div>
    </Sheet>
  );
}

/** Roles and approvals: what's waiting for the owner. */
export function Approvals() {
  return (
    <App title="Approvals" sub="Vinod · 2 waiting" icon="check">
      <div className="flex flex-col gap-1.5">
        <Step
          lit
          icon="layers"
          title="Cement · 400 bags"
          meta="Stores · ₹1,64,000"
          className="!py-2"
        />
        <Step icon="layers" title="Steel · 12 tonnes" meta="2 quotes · ₹8.4 L" className="!py-2" />
        <Step icon="clock" title="Overtime · Sat" meta="Approved · ₹14,400" className="!py-2" />
      </div>
      <Press className="mt-2.5">Approve cement</Press>
    </App>
  );
}

/** Reports: the week on site, and the running bills still to be paid. */
export function Week() {
  return (
    <Sheet label="This week · site" live>
      <div className="grid grid-cols-3 gap-2">
        <Metric label="Labour days" value="1,180" size={19} />
        <Metric label="On time" value="3/4" size={19} />
        <Metric label="Wastage" value="1.8%" size={19} />
      </div>
      <p className="mt-3.5 text-[11px] text-ink-2">Running bills · ₹38.6 L</p>
      <Line icon="receipt" title="Lakeview Homes" meta="Bill 6" right={<Money>₹21 L</Money>} />
      <Line icon="receipt" title="Metro Clinic" meta="Bill 3" right={<Money>₹9.4 L</Money>} />
    </Sheet>
  );
}

/** Built in phases: the roadmap, quoted phase by phase. */
export function Phases() {
  return (
    <Sheet label="Roadmap" badge={<Status tone="accent">Phase 2</Status>}>
      <div className="flex flex-col gap-1.5">
        <Step
          icon="clipboard"
          title="1 · Projects, site diary"
          meta="Done · live since June"
          className="!py-2"
        />
        <Step
          lit
          icon="layers"
          title="2 · Purchase, stores"
          meta="6 of 10 screens"
          className="!py-2"
        />
        <Step
          muted
          icon="receipt"
          title="3 · Running bills"
          meta="Quoted · next"
          className="!py-2"
        />
      </div>
      <p className="mt-2.5 text-[10.5px] leading-snug text-ink-2">
        Each phase priced before it starts.
      </p>
    </Sheet>
  );
}

/** The site engineer's diary on a tablet: today's work on Block B. */
export function Diary() {
  return (
    <App title="Site diary · Block B" sub="Today · Mahesh" icon="clipboard">
      <div className="sc-tile--accent rounded-xl p-3">
        <p className="text-[10px] font-medium tracking-[0.12em] uppercase opacity-80">Slab 3</p>
        <p className="mt-0.5 font-display text-[26px] leading-none">72%</p>
      </div>
      <Line icon="people" title="Crew on site" meta="38 · 2 cranes" />
      <Line icon="layers" title="Concrete poured" meta="42 m³ · 3 photos" />
      <Line icon="alert" title="Steel short by 2 t" meta="Sent to stores" />
    </App>
  );
}
