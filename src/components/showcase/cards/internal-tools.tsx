'use client';

import { Icon } from '../../ui/icon';
import { Checks, Line, Press, RoleGrid, Status, Step } from '../kit';
import { App, Sheet } from '../sheet';

/**
 * Internal Tools' five screens, from the page's sample business — a School / Education Institute
 * run by its principal, Lakshmi Iyer: everyone's tasks with an owner and a date, a ₹12,000 fee
 * concession waiting for her tap, Aanya's admission from a template, the roles, and a teacher's
 * class on her phone.
 */

/** Owners and dates: every task, its owner and when it's due. */
export function Tasks() {
  return (
    <Sheet label="My work · school" live foot={['Overdue', '2']}>
      <div className="flex flex-col gap-1.5">
        <Step
          turn
          n={3}
          i={0}
          face="Deepa S"
          title="Aanya’s documents"
          meta="Admission · Deepa"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={1}
          face="Imran P"
          title="Parent meeting · 6B"
          meta="Room 12 · Imran"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={2}
          face="Lakshmi I"
          title="Fee concession"
          meta="Class 6 · Lakshmi"
          className="!py-2"
        />
        <Step muted face="Imran P" title="Exam timetable" meta="Term 1 · Imran" className="!py-2" />
      </div>
    </Sheet>
  );
}

/** Approvals: the request with everything needed to decide, and one tap to approve. */
export function Approve() {
  return (
    <App title="Approval needed" sub="Today · from Deepa S" icon="check">
      <div className="sc-step--lit rounded-xl border border-line p-3">
        <p className="text-[11px] text-ink-2">Fee concession · sibling · Term 1</p>
        <p className="mt-1 font-display text-[26px] leading-none text-ink">₹12,000</p>
        <p className="mt-1.5 text-[11.5px] text-ink">Rohan Nair · 6B</p>
      </div>
      <Line icon="rupee" title="₹48,000 of ₹60,000" meta="Concessions left this term" />
      <div className="mt-1 grid grid-cols-2 gap-2">
        <span className="flex h-9 items-center justify-center rounded-[10px] bg-fill text-[12.5px] font-semibold text-ink">
          Ask
        </span>
        <Press>Approve</Press>
      </div>
    </App>
  );
}

/** Templates and history: Aanya's admission, built from the template, every change kept. */
export function Admission() {
  return (
    <Sheet label="Admission · Aanya" badge={<Status tone="accent">7 of 12</Status>}>
      <Checks
        items={[
          { text: 'Birth certificate', done: true },
          { text: 'Previous report card', done: true },
          { text: 'Transfer certificate' },
        ]}
      />
      <p className="mt-3 text-[11px] text-ink-2">History</p>
      <Line icon="history" title="TC asked for" meta="Today, 10:12 am" />
      <Line icon="history" title="Section 3A → 3B" meta="9 Sep, 4:40 pm" />
    </Sheet>
  );
}

/** Roles: who may plan, approve, edit and see what. */
export function Roles() {
  return (
    <Sheet label="Roles" badge={<Status tone="muted">4 roles</Status>}>
      <RoleGrid
        heads={['Plan', 'Approve', 'Edit']}
        rows={[
          ['Principal', [true, true, true]],
          ['Vice principal', [true, false, true]],
          ['Admissions', [false, false, true]],
          ['Teacher', [false, false, false]],
        ]}
      />
      <p className="mt-4 flex items-center gap-1.5 text-[10.5px] leading-snug text-ink-2">
        <Icon name="lock" size={11} /> Fees are seen only by the office
      </p>
    </Sheet>
  );
}

/** A teacher's class on her phone: today's steps, one tap each. */
export function Class() {
  return (
    <App title="Class 6B" sub="Today · Ms Meera" icon="school">
      <div className="flex flex-col gap-1.5">
        <Step icon="people" title="Attendance" meta="Done · 31 of 33" className="!py-2" />
        <Step icon="book" title="Maths homework" meta="Done · 28 checked" className="!py-2" />
        <Step lit icon="clipboard" title="Unit test marks" meta="Due Friday" className="!py-2" />
      </div>
      <Press className="mt-2.5">Mark step done</Press>
    </App>
  );
}
