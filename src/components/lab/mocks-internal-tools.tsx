import { Fit } from './fit';
import { Card, Face, Head, onColour, Pill, Row, Tag, Wires, Group } from './light-kit';
import { Chip, Dot, Field, RoleGrid, Steps } from './mock-parts';
import { GRAPHITE } from '../visuals/graphite';

/**
 * Internal Tools' mockups, in the light kit, from the page's own sample business — a School /
 * Education Institute run by its principal, Lakshmi Iyer: every task with an owner and a date, a
 * ₹12,000 fee concession waiting for her tap, Aanya's admission built from a template, the roles,
 * and the staff's week. Each on a fixed canvas.
 */

/** The page's accent: the marks, the wires and the outcome. */
const P = GRAPHITE;
/** The business's own colour: everything inside its screens. */
const A = GRAPHITE;

/** Owners and dates: every task, its job, its owner and when it's due. */
export function TasksMock() {
  const tasks = [
    {
      t: 'Check Aanya’s documents',
      m: 'Admission · Class 3 · Deepa S',
      tag: (
        <Tag tone="accent" accent={A}>
          Overdue
        </Tag>
      ),
    },
    { t: 'Parent meeting · 6B', m: 'Room 12 · Imran P', tag: <Tag tone="wait">11 am</Tag> },
    {
      t: 'Approve fee concession',
      m: 'Class 6 · Lakshmi I',
      tag: <Tag tone="wait">Today</Tag>,
    },
    { t: 'Publish exam timetable', m: 'Term 1 · Imran P', tag: <Tag>Wed</Tag> },
  ];
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={300} i={0}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="tasks" accent={P} title="My work" meta="School / Education Institute" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            {tasks.map((t) => (
              <Row
                key={t.t}
                lead={<Dot icon="check" tone={P} />}
                title={t.t}
                meta={t.m}
                right={t.tag}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card x={338} y={100} w={162} i={2}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Overdue</p>
          <p className="mt-1 text-[22px] leading-none font-semibold">2</p>
          <p className="mt-1.5 text-[10px] text-ink-3">Each with a name on it</p>
        </div>
      </Card>
      <Pill x={338} y={206} i={4} accent={P} icon="userCheck">
        An owner and a date on everything
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M320 130 C 330 130, 328 124, 338 124']}
        dots={[[320, 130]]}
      />
    </Fit>
  );
}

/** Approvals: the purchase with everything needed to decide, and one tap to approve. */
export function ApproveMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={20} w={262} i={0}>
        <div className="p-3">
          <p className="text-[10px] text-ink-3">Approval needed · fee concession</p>
          <p className="mt-1 text-[22px] leading-none font-semibold">₹12,000</p>
          <p className="mt-1 text-[10px] text-ink-2">
            Sibling concession · Term 1 · asked by Deepa S
          </p>
          <div className="mt-2 divide-y divide-[#f0f0f3]">
            <Row lead={<Dot icon="people" tone={P} />} title="Rohan Nair · 6B" meta="Student" />
            <Row
              lead={<Dot icon="rupee" tone={P} />}
              title="₹48,000 of ₹60,000"
              meta="Concessions left this term"
            />
          </div>
          <span
            className="mt-2.5 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
            style={{ background: A, color: onColour(A) }}
          >
            Approve
          </span>
        </div>
      </Card>
      <Card x={300} y={70} w={200} i={2}>
        <div className="p-3">
          <Steps
            accent={A}
            steps={[
              { title: 'Requested', meta: 'Deepa S · 10:12 am', done: true },
              { title: 'Accounts checked', meta: 'Vivek R · 10:30 am', done: true },
              { title: 'Your approval', meta: 'Reminder at 4 pm', icon: 'userCheck' },
            ]}
          />
        </div>
      </Card>
      <Pill x={300} y={218} i={4} accent={P} icon="check">
        One tap, and it’s on record
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

/** Templates and history: an admission built from a template, and every change with who and when. */
export function HistoryMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={22} w={250} i={0}>
        <div className="p-3">
          <Head
            icon="layers"
            accent={P}
            title="Admission · Aanya R"
            meta="Class 3 · 7 of 12 steps"
          />
          <div className="mt-3">
            <Steps
              accent={A}
              steps={[
                { title: 'Application and fee', meta: 'Deepa S · 2 Sep', done: true },
                { title: 'Meeting with the parents', meta: 'Held 8 Sep', done: true },
                { title: 'Transfer certificate', meta: 'Asked for · waiting', icon: 'file' },
                { title: 'Class and section', meta: '3B · from 22 Sep', icon: 'school' },
              ]}
            />
          </div>
        </div>
      </Card>
      <Card x={288} y={70} w={212} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Head icon="history" accent={P} title="History" meta="Every change, who and when" />
          <div className="mt-1.5 divide-y divide-[#f0f0f3]">
            <Row title="Transfer certificate asked for" meta="Deepa · today, 10:12 am" />
            <Row title="Section changed 3A → 3B" meta="Imran · 9 Sep, 4:40 pm" />
            <Row title="Created from the template" meta="2 Sep, 9:15 am" />
          </div>
        </div>
      </Card>
      <Pill x={288} y={272} i={4} accent={P} icon="history">
        Nothing lost in a chat group
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M270 100 C 280 100, 278 110, 288 110']}
        dots={[[270, 100]]}
      />
    </Fit>
  );
}

/** Roles: who may plan, approve, edit and see what, and the people in each. */
export function RolesMock() {
  return (
    <Fit w={520} h={340}>
      <Card x={20} y={24} w={296} i={0}>
        <div className="p-3">
          <Head icon="lock" accent={P} title="What each role can do" />
          <div className="mt-3">
            <RoleGrid
              accent={A}
              heads={['Head', 'Office', 'Teacher', 'Accts']}
              rows={[
                { label: 'Admissions and records', values: [true, true, false, false] },
                { label: 'Approve concessions', values: [true, false, false, false] },
                { label: 'Edit timetables', values: [true, true, false, false] },
                { label: 'Mark attendance', values: [true, false, true, false] },
                { label: 'See fees', values: [true, false, false, true] },
              ]}
            />
          </div>
        </div>
      </Card>
      <Card x={334} y={80} w={166} i={2}>
        <div className="px-3 pt-3 pb-1.5">
          <Row lead={<Face name="Lakshmi Iyer" />} title="Lakshmi I" meta="Principal" />
          <Row lead={<Face name="Imran P" />} title="Imran P" meta="Vice principal" />
          <Row lead={<Face name="Deepa S" />} title="Deepa S" meta="Admissions" />
        </div>
      </Card>
      <Pill x={40} y={262} i={4} accent={P} icon="lock">
        Everyone does their part, no more
      </Pill>
      <Wires
        w={520}
        h={340}
        accent={P}
        d={['M316 110 C 326 110, 324 120, 334 120']}
        dots={[[316, 110]]}
      />
    </Fit>
  );
}

/** Schedule: the staff's duties across the week, each where it happens. */
export function ScheduleMock() {
  const days = [
    { day: 'Mon 15', items: [['Unit test · Class 8', 'Invigilation · Ravi K']] },
    {
      day: 'Tue 16',
      items: [
        ['Unit test · Class 9', 'Invigilation · Latha R'],
        ['Parent meeting · 6B', 'Imran P · 11 am'],
      ],
    },
    {
      day: 'Wed 17',
      items: [
        ['Unit test · Class 10', 'Invigilation · Meena S'],
        ['Admissions tour', 'Deepa S · 10 am'],
      ],
    },
    {
      day: 'Thu 18',
      items: [
        ['Sports day practice', 'Coach Anil · 3 pm'],
        ['Science lab · Class 9', 'Meena S · period 5'],
      ],
    },
    {
      day: 'Fri 19',
      items: [
        ['Staff meeting', 'All staff · 3:30 pm'],
        ['Bus duty', 'Ravi K · 3 pm'],
      ],
    },
  ];
  return (
    <Fit w={880} h={360}>
      {days.map((d, i) => (
        <Card key={d.day} x={24 + i * 168} y={36 + (i % 2) * 16} w={158} i={i}>
          <div className="p-2.5">
            <p className="text-[10.5px] font-semibold">{d.day}</p>
            <div className="mt-2 flex flex-col gap-1.5">
              {d.items.map(([t, m]) => (
                <span
                  key={t}
                  className="block rounded-[8px] px-2 py-1.5"
                  style={{
                    background: `color-mix(in srgb, ${A} ${t!.startsWith('Unit test') ? 16 : 7}%, white)`,
                  }}
                >
                  <span className="block truncate text-[10px] font-medium">{t}</span>
                  <span className="block truncate text-[9px] text-ink-3">{m}</span>
                </span>
              ))}
            </div>
          </div>
        </Card>
      ))}
      <Pill x={320} y={268} i={5} accent={P} icon="calendar">
        Everyone’s week, on one screen
      </Pill>
    </Fit>
  );
}

export const INTERNAL_TOOLS_MOCKS = [TasksMock, ApproveMock, HistoryMock, RolesMock, ScheduleMock];

/** How it's built: the template the office sets once, and a teacher's class on her phone. */
/** Where a group sits when the picture is drawn wide, as it was. */
const HOME = { x: 0, y: 0 };

function InternalToolsHowScene({ box = false }: { box?: boolean }) {
  return (
    <Fit w={760} h={box ? 560 : 330} max={box ? 1.25 : 1.15}>
      <Group at={box ? { x: 32, y: 16 } : HOME}>
        <Card x={24} y={24} w={320} i={0}>
          <div className="p-3.5">
            <Head
              icon="layers"
              accent={P}
              title="New admission"
              meta="Template · 12 steps · 4 roles"
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Field label="For classes" value="1 to 12" accent={A} />
              <Field label="Head approval over" value="₹10,000" accent={A} />
            </div>
            <div className="mt-2">
              <Field label="Notes for the office" value="TC before the first day." accent={A} />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <Chip on accent={A}>
                Documents required
              </Chip>
            </div>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -56, y: 216 } : HOME}>
        <Card x={426} y={40} w={300} i={2}>
          <div className="p-3.5">
            <Head icon="school" accent={P} title="Today · Class 6B" meta="Room 12 · 8:30 am" />
            <div className="mt-3">
              <Steps
                accent={A}
                steps={[
                  { title: 'Attendance · 38 of 40', done: true },
                  { title: 'Homework posted', done: true },
                  { title: 'Notes to parents', icon: 'mail' },
                ]}
              />
            </div>
            <span
              className="mt-3 flex items-center justify-center rounded-[8px] py-1.5 text-[11px] font-semibold"
              style={{ background: A, color: onColour(A) }}
            >
              Mark step done
            </span>
          </div>
        </Card>
      </Group>
      <Group at={box ? { x: -4, y: 238 } : HOME}>
        <Pill x={60} y={262} i={4} accent={P}>
          Set once in the office, followed in every class
        </Pill>
      </Group>
      {box ? (
        <Wires
          w={760}
          h={560}
          accent={P}
          d={['M376 126 H 430 V 256']}
          dots={[
            [376, 126],
            [430, 256],
          ]}
        />
      ) : (
        <Wires
          w={760}
          h={330}
          accent={P}
          d={['M344 110 C 386 110, 384 100, 426 100']}
          dots={[
            [344, 110],
            [426, 100],
          ]}
        />
      )}
    </Fit>
  );
}

export function InternalToolsHow() {
  return <InternalToolsHowScene />;
}

/** The same picture, laid out for a box beside its blocks (a split section). */
export function InternalToolsHowBox() {
  return <InternalToolsHowScene box />;
}
