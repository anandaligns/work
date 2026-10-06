'use client';

import type { CSSProperties } from 'react';

import product from '@/content/products/internal-tools';

import { BRANDS } from '../visuals/concept-sites';
import {
  Card,
  Checks,
  Chip,
  Field,
  Line,
  Metric,
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
 * Internal Tools, in the showcase kit, from the page's own sample business — a School / Education
 * Institute run by its principal, Lakshmi Iyer: every task with an owner and a date, a ₹12,000 fee
 * concession waiting for her tap, Aanya's admission built from a template, the roles, and the
 * staff's week.
 */
const P = product.accent;
const A = BRANDS.school!.accent;

/** Owners and dates: every task, its job, its owner and when it's due. */
export function TasksMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={330} label="My work · the school" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            face="Deepa S"
            title="Check Aanya’s documents"
            meta="Admission · Class 3 · Deepa S"
            status="Overdue"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={1}
            face="Imran P"
            title="Parent meeting · 6B"
            meta="Room 12 · Imran P"
            status="11 am"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={2}
            face="Lakshmi Iyer"
            title="Approve fee concession"
            meta="Class 6 · Lakshmi I"
            status="Today"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={3}
            face="Imran P"
            title="Publish exam timetable"
            meta="Term 1 · Imran P"
            status="Wed"
            tone="muted"
          />
        </div>
      </Panel>
      <Card x={330} y={200} w={150} i={3}>
        <div className="p-2">
          <Metric label="Overdue" value={2} size={28} />
          <p className="mt-1.5 text-[11px] text-ink-2">Each with a name on it</p>
        </div>
      </Card>
    </Stage>
  );
}

/** Approvals: the request with everything needed to decide, and one tap to approve. */
export function ApproveMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={280}
        label="Approval needed"
        badge={<Status tone="wait">Today</Status>}
      >
        <div className="px-2">
          <p className="text-[11.5px] text-ink-2">Fee concession · sibling · Term 1</p>
          <p className="mt-1 font-display text-[30px] leading-none text-ink">₹12,000</p>
          <div className="mt-2">
            <Line icon="people" title="Rohan Nair · 6B" meta="Asked by Deepa S" />
            <Line icon="rupee" title="₹48,000 of ₹60,000" meta="Concessions left this term" />
          </div>
          <Press className="mt-2 mb-1">Approve</Press>
        </div>
      </Panel>
      <Panel x={282} y={90} w={200} label="On record" i={2}>
        <Track
          steps={[
            { title: 'Requested', meta: 'Deepa · 10:12', done: true },
            { title: 'Accounts checked', meta: 'Vivek · 10:30', done: true },
            { title: 'Your approval', meta: 'Reminder 4 pm' },
          ]}
        />
      </Panel>
    </Stage>
  );
}

/** Templates and history: an admission built from a template, and every change with who and when. */
export function HistoryMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={260}
        label="Admission · Aanya R"
        badge={<Status tone="accent">7 of 12</Status>}
      >
        <Track
          steps={[
            { title: 'Application and fee', meta: 'Deepa S · 2 Sep', done: true },
            { title: 'Meeting the parents', meta: 'Held 8 Sep', done: true },
            { title: 'Transfer certificate', meta: 'Asked for · waiting' },
            { title: 'Class and section', meta: '3B · from 22 Sep' },
          ]}
        />
      </Panel>
      <Panel x={262} y={120} w={230} label="History" i={2}>
        <div className="px-2">
          <Line face="Deepa S" title="TC asked for" meta="Today, 10:12 am" />
          <Line face="Imran P" title="Section 3A → 3B" meta="9 Sep, 4:40 pm" />
          <Line icon="layers" title="From the template" meta="2 Sep, 9:15 am" />
        </div>
      </Panel>
    </Stage>
  );
}

/** Roles: who may plan, approve, edit and see what, and the people in each. */
export function RolesMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={330} label="What each role can do">
        <div className="px-3 pb-3">
          <RoleGrid
            heads={['Head', 'Office', 'Teacher', 'Accts']}
            rows={[
              ['Admissions, records', [true, true, false, false]],
              ['Approve concessions', [true, false, false, false]],
              ['Edit timetables', [true, true, false, false]],
              ['Mark attendance', [true, false, true, false]],
              ['See fees', [true, false, false, true]],
            ]}
          />
        </div>
      </Panel>
      <Card x={320} y={150} w={170} i={2}>
        <div className="px-1.5">
          <Line face="Lakshmi Iyer" title="Lakshmi I" meta="Principal" />
          <Line face="Imran P" title="Imran P" meta="Vice principal" />
          <Line face="Deepa S" title="Deepa S" meta="Admissions" />
        </div>
      </Card>
    </Stage>
  );
}

/** Schedule: the staff's duties across the week, each where it happens. */
export function ScheduleMock() {
  const days = [
    ['Mon 15', [['Unit test · Class 8', 'Invigilation · Ravi K']]],
    [
      'Tue 16',
      [
        ['Unit test · Class 9', 'Invigilation · Latha R'],
        ['Parent meeting · 6B', 'Imran P · 11 am'],
      ],
    ],
    [
      'Wed 17',
      [
        ['Unit test · Class 10', 'Invigilation · Meena S'],
        ['Admissions tour', 'Deepa S · 10 am'],
      ],
    ],
    [
      'Thu 18',
      [
        ['Sports day practice', 'Coach Anil · 3 pm'],
        ['Science lab · 9', 'Meena S · period 5'],
      ],
    ],
    [
      'Fri 19',
      [
        ['Staff meeting', 'All staff · 3:30 pm'],
        ['Bus duty', 'Ravi K · 3 pm'],
      ],
    ],
  ] as const;
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={20} w={860} label="Staff week · 15–19 Sep" live>
        <div className="grid grid-cols-5 gap-2">
          {days.map(([day, items], d) => (
            <div key={day} className="rounded-xl border border-line p-2.5">
              <p className="text-[12.5px] font-semibold text-ink">{day}</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {items.map(([title, meta], k) => (
                  <span
                    key={title}
                    className={`sc-rise block rounded-lg px-2.5 py-2 ${title.startsWith('Unit test') ? 'sc-slot--on' : 'sc-slot'}`}
                    style={{ '--i': d + k } as CSSProperties}
                  >
                    <span className="block truncate text-[11.5px] font-medium text-ink">
                      {title}
                    </span>
                    <span className="block truncate text-[10.5px] text-ink-2">{meta}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Toast
        x={560}
        y={250}
        w={260}
        icon="calendar"
        title="Everyone’s week, one screen"
        meta="Duties, rooms and times"
      />
    </Stage>
  );
}

/** How it's built: the template the office sets once, and a teacher's class on her phone. */
export function InternalToolsHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel
        x={40}
        y={30}
        w={340}
        label="Template · New admission"
        badge={<Status tone="accent">12 steps</Status>}
      >
        <div className="flex flex-col gap-2.5 px-2 pb-2">
          <Field label="For classes" value="1 to 12" />
          <Field label="Head approval over" value="₹10,000" focus />
          <Field label="Notes for the office" value="TC before the first day." />
          <div>
            <Chip on>Documents required</Chip>
          </div>
        </div>
      </Panel>
      <Panel x={350} y={270} w={310} label="Today · Class 6B" live i={2}>
        <div className="px-2 pb-2">
          <Checks
            items={[
              { text: 'Attendance · 38 of 40', done: true },
              { text: 'Homework posted', done: true },
              { text: 'Notes to parents' },
            ]}
          />
          <Press className="mt-3">Mark step done</Press>
        </div>
      </Panel>
    </Stage>
  );
}

export const InternalToolsHow = InternalToolsHowBox;
