'use client';

import product from '@/content/products/never-miss-a-lead';

import { ToolMark } from '../ui/brand-logos';
import {
  Bubble,
  Checks,
  Chip,
  Face,
  Line,
  Metric,
  Mono,
  Panel,
  Stage,
  Status,
  Step,
  Toast,
} from './kit';

/**
 * Lead Automation's solution page, in the showcase kit, from its own sample business — a home
 * cleaning and pest control company in Bangalore: every source landing in one list, the quote that
 * answered Priya in eight seconds, today's follow-ups with a next step on each, the system's own
 * screen, and Priya's evening from enquiry to booking.
 */
const A = product.accent;

/** Every source, one list: four ways in, and tonight's enquiries already answered. */
export function SourcesMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={40} w={200} label="Ways in">
        <div className="flex flex-col gap-2">
          <Step turn n={4} i={0} icon="globe" title="Website form" />
          <Step turn n={4} i={1} tool="Google Ads" title="Google Ads" />
          <Step turn n={4} i={2} tool="Instagram" title="Instagram" />
          <Step turn n={4} i={3} tool="WhatsApp" title="WhatsApp" />
        </div>
      </Panel>
      <Panel
        x={196}
        y={20}
        w={290}
        label="Every enquiry"
        badge={<Status tone="accent">5 new</Status>}
        foot={['Answered', '64 of 64']}
        i={2}
      >
        <div className="flex flex-col gap-2">
          <Step
            face="Priya Menon"
            title="Priya Menon"
            meta="Website form · 8 s"
            status="New"
            tone="accent"
          />
          <Step face="Rahul Bose" title="Rahul Bose" meta="Google Ads · 5 s" status="Booked" />
          <Step
            face="Sana Khan"
            title="Sana Khan"
            meta="Instagram · 6 s"
            status="Replied"
            tone="muted"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** Answered at once: Priya's enquiry, the quote back on WhatsApp in eight seconds, and by email. */
export function ReplyMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={220} label="New enquiry · 9:02 pm">
        <div className="px-2 pb-2">
          <div className="flex items-center gap-2.5">
            <Face name="Priya Menon" />
            <span>
              <span className="block text-[13.5px] font-medium text-ink">Priya Menon</span>
              <span className="block text-[11.5px] text-ink-2">Website form</span>
            </span>
          </div>
          <p className="mt-3 rounded-xl bg-fill px-3 py-2.5 text-[12.5px] leading-snug text-ink">
            Deep cleaning for a 3 BHK in HSR Layout, this weekend.
          </p>
        </div>
      </Panel>
      <Panel x={226} y={60} w={260} label="Your quote, Priya" badge={<Status>8 s</Status>} i={2}>
        <div className="px-2 pb-1">
          <div className="flex items-center gap-2 pb-1 text-[11.5px] text-ink-2">
            <ToolMark tool="WhatsApp" size={14} /> Sent at 9:02 pm
          </div>
          <Line
            title="Service"
            right={<span className="text-[12.5px] font-medium text-ink">Deep cleaning</span>}
          />
          <Line
            title="Home"
            right={<span className="text-[12.5px] font-medium text-ink">3 BHK · HSR</span>}
          />
          <Line
            title="Price"
            right={<span className="text-[12.5px] font-medium text-ink">₹6,499 incl. GST</span>}
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <span className="sc-press flex h-9 items-center justify-center rounded-[10px] text-[12px] font-semibold">
              Book a slot
            </span>
            <span className="flex h-9 items-center justify-center rounded-[10px] bg-fill text-[12px] font-semibold text-ink">
              Call us
            </span>
          </div>
        </div>
      </Panel>
      <Toast
        x={30}
        y={250}
        w={210}
        tool="Gmail"
        title="And by email"
        meta="The same quote · sent"
      />
    </Stage>
  );
}

/** Tracked until it's closed: today's follow-ups, each with a next step and an owner. */
export function FollowUpMock() {
  return (
    <Stage w={500} accent={A}>
      <Panel x={20} y={20} w={330} label="Follow-ups · due today 7" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={3}
            i={0}
            face="Sana Khan"
            title="Sana Khan · sofa"
            meta="Second reminder, then a call · Ravi"
            status="Due"
            tone="wait"
          />
          <Step
            turn
            n={3}
            i={1}
            face="Neha Gupta"
            title="Neha Gupta · move-in"
            meta="Asked about a Sunday · Anita"
            status="Person"
            tone="accent"
          />
          <Step
            turn
            n={3}
            i={2}
            face="Meera S"
            title="Meera S · kitchen"
            meta="Quote viewed, no reply"
            status="Automatic"
            tone="muted"
          />
        </div>
      </Panel>
      <Toast
        x={260}
        y={250}
        w={230}
        icon="check"
        tone="ok"
        title="Vikram J · villa, closed"
        meta="Chose another date"
      />
    </Stage>
  );
}

/** Four bars for how far an enquiry has got: asked, replied, booked, closed. */
function Stages({ done, tone }: { done: number; tone?: 'wait' | 'closed' }) {
  return (
    <span className="flex gap-[3px]">
      {[0, 1, 2, 3].map((k) => (
        <span
          key={k}
          className={`h-1.5 w-4 rounded-full ${k < done ? (tone === 'wait' ? 'bg-[#f0b429]' : tone === 'closed' ? 'bg-ink-3' : 'sc-meter') : 'bg-line'}`}
        />
      ))}
    </span>
  );
}

/** How it works: every enquiry and how far it has got, and the system's own screen — its week and its steps. */
export function SystemMock() {
  const stages: [string, number, ('wait' | 'closed')?][] = [
    ['Priya Menon', 2],
    ['Rahul Bose', 3],
    ['Sana Khan', 2],
    ['Arun Pillai', 3],
    ['Neha Gupta', 2, 'wait'],
    ['Vikram J', 4, 'closed'],
  ];
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={150} w={256} label="Every enquiry · stage">
        <div className="px-2">
          {stages.map(([name, done, tone]) => (
            <Line key={name} face={name} title={name} right={<Stages done={done} tone={tone} />} />
          ))}
        </div>
      </Panel>
      <Panel x={296} y={20} w={500} label="New enquiry, answered" live i={2}>
        <div className="grid grid-cols-4 gap-3 px-3 pb-3">
          <Metric label="Enquiries" value={64} size={24} />
          <Metric label="Under a minute" value={100} suffix="%" size={24} />
          <Metric label="Booked" value={23} size={24} />
          <Metric label="For a person" value={2} size={24} />
        </div>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            tool="WhatsApp"
            title="1 · Instant reply"
            meta="The quote, with a booking link · immediately"
          />
          <Step
            turn
            n={4}
            i={1}
            tool="Gmail"
            title="2 · The same quote by email"
            meta="Alongside it"
          />
          <Step
            turn
            n={4}
            i={2}
            icon="bell"
            title="3 · Alert the area’s team"
            meta="If it needs a person · HSR: Anita"
          />
          <Step
            turn
            n={4}
            i={3}
            icon="repeat"
            title="4 · Follow up"
            meta="If there’s no reply · stops on a booking"
          />
        </div>
      </Panel>
    </Stage>
  );
}

/** What changes: Priya's evening, from her enquiry to a booking, and her record on the team's side. */
export function WorkspaceMock() {
  return (
    <Stage w={780} accent={A}>
      <Panel x={20} y={20} w={360} label="WhatsApp · Priya Menon" live>
        <div className="flex flex-col gap-2 px-1 pb-2">
          <p className="sc-rise rounded-xl border border-line bg-fill px-3 py-2 text-[12px] text-ink">
            <span className="block text-[10.5px] text-ink-2">Website enquiry · 9:01 pm</span>
            Deep cleaning · 3 BHK · HSR Layout. An inspection this weekend.
          </p>
          <Mono className="px-1">Instant reply · 8 seconds</Mono>
          <Bubble from="us" meta="9:02 pm" i={2}>
            Thanks, Priya. A deep clean for a 3 BHK is <b>₹6,499 incl. GST</b>: 5–6 hours, a team of
            3. Pick a slot for the inspection:
          </Bubble>
          <div className="sc-rise flex justify-end gap-1.5" style={{ ['--i' as string]: 3 }}>
            <Chip on>Sat 10:30</Chip>
            <Chip>Sat 4:00</Chip>
            <Chip>Sun 11:00</Chip>
          </div>
          <Bubble meta="9:06 pm" i={4}>
            Saturday 10:30, please.
          </Bubble>
          <Bubble from="us" meta="9:06 pm" i={5}>
            Booked for Saturday, 10:30 am, with Anita. A reminder comes the evening before.
          </Bubble>
        </div>
      </Panel>
      <Panel
        x={360}
        y={180}
        w={380}
        label="Leads / Priya Menon"
        badge={<Status>Booked</Status>}
        i={3}
      >
        <div className="px-2 pb-2">
          <p className="text-[12px] text-ink-2">Came from</p>
          <div className="mt-1">
            <Line tool="Google" title="Google search" meta="“deep cleaning hsr”" />
            <Line icon="globe" title="The website’s quote form" meta="9:01 pm" />
          </div>
          <p className="mt-2 mb-2 text-[12px] text-ink-2">Next steps</p>
          <Checks
            items={[
              { text: 'Quote sent · WhatsApp and email · 8 s', done: true },
              { text: 'Inspection booked · Sat 10:30 am', done: true },
              { text: 'Reminder · the evening before' },
            ]}
          />
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-line p-2.5">
            <Face name="Anita" />
            <span>
              <span className="block text-[13px] font-medium text-ink">Anita · HSR team</span>
              <span className="block text-[11px] text-ink-2">
                Alerted at 9:02 pm, with the whole enquiry
              </span>
            </span>
          </div>
        </div>
      </Panel>
    </Stage>
  );
}
