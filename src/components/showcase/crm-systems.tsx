'use client';

import product from '@/content/products/crm-systems';

import { BRANDS } from '../visuals/concept-sites';
import {
  Bubble,
  Card,
  Funnel,
  Line,
  Metric,
  Panel,
  Stage,
  Status,
  Step,
  Toast,
  Typing,
} from './kit';

/**
 * CRM Systems, in the showcase kit, from the page's own sample business — a developer selling homes
 * at Lakeside Residency and Palm Grove: Rohit Verma's one record, the rules that sent him to Ravi at
 * 9:42 pm, today's follow-ups, Farah's WhatsApp on her record, and the funnel from enquiry to
 * booking.
 */
const P = product.accent;
const A = BRANDS.realestate!.accent;

/** One record: every touch Rohit made, in order, on one record. */
export function RecordMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel
        x={20}
        y={20}
        w={320}
        label="Rohit Verma · one record"
        badge={<Status tone="accent">Returning</Status>}
        foot={['Budget', '₹1.3–1.5 Cr']}
      >
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            tool="Google Ads"
            title="Clicked “3 BHK Whitefield”"
            meta="12 Sep · Google Ads"
          />
          <Step
            turn
            n={4}
            i={1}
            icon="file"
            title="Downloaded the brochure"
            meta="12 Sep · website form"
          />
          <Step
            turn
            n={4}
            i={2}
            tool="WhatsApp"
            title="Asked about the payment plan"
            meta="14 Sep · replied by Ravi"
          />
          <Step
            turn
            n={4}
            i={3}
            icon="calendar"
            title="Filled the site-visit form"
            meta="Today"
            status="New"
            tone="accent"
          />
        </div>
      </Panel>
      <Toast x={300} y={60} w={180} icon="layers" title="One record" meta="Not three" />
    </Stage>
  );
}

/** Routing: the rules in order, and who got the lead that came in at 9:42 pm. */
export function RoutingMock() {
  const rules = [
    ['Budget over ₹2 Cr', 'To Meera · senior sales'],
    ['Lakeside Residency', 'Ravi and Anita, by turns'],
    ['Palm Grove', 'Sameer'],
    ['After 8 pm', 'First in tomorrow’s queue'],
  ] as const;
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={300} label="Rules, in order" badge={<Status>On</Status>}>
        <div className="flex flex-col gap-2">
          {rules.map(([title, meta], i) => (
            <Step key={title} mark={i + 1} title={title} meta={meta} lit={i === 1} />
          ))}
        </div>
      </Panel>
      <Toast
        x={262}
        y={250}
        w={230}
        tool="WhatsApp"
        title="Rohit Verma → Ravi"
        meta="Assigned and alerted · 9:42 pm"
      />
    </Stage>
  );
}

/** Pipeline: today's follow-ups with times, and where each buyer stands. */
export function FollowUpsMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={320} label="Follow-ups · today" live>
        <div className="flex flex-col gap-2">
          <Step
            turn
            n={4}
            i={0}
            face="Arvind Kulkarni"
            title="Arvind Kulkarni"
            meta="Call · brochure sent Tue"
            status="Overdue"
            tone="accent"
          />
          <Step
            turn
            n={4}
            i={1}
            face="Nikhil Priya"
            title="Nikhil & Priya"
            meta="Confirm Saturday’s visit"
            status="11 am"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={2}
            face="Farah Siddiqui"
            title="Farah Siddiqui"
            meta="Share the payment plan"
            status="2 pm"
            tone="wait"
          />
          <Step
            turn
            n={4}
            i={3}
            face="Suresh Menon"
            title="Dr Suresh Menon"
            meta="Revised offer"
            status="5 pm"
            tone="muted"
          />
        </div>
      </Panel>
      <Card x={322} y={170} w={170} i={3}>
        <div className="px-1.5">
          <Line icon="spark" title="New enquiry" meta="Rohit · ₹1.4 Cr" />
          <Line icon="calendar" title="Site visit" meta="Nikhil · ₹1.2 Cr" />
          <Line icon="rupee" title="Negotiation" meta="Suresh · ₹2.6 Cr" />
        </div>
      </Card>
    </Stage>
  );
}

/** WhatsApp on the record: Farah's chat, and the record it's kept on. */
export function ChatMock() {
  return (
    <Stage w={500} accent={P} brand={A}>
      <Panel x={20} y={20} w={300} label="WhatsApp · Farah Siddiqui" live>
        <div className="flex flex-col gap-2 px-1 pb-2">
          <Bubble meta="7:12 pm" i={1}>
            Is the 2 BHK in Tower A still available? What’s the payment plan?
          </Bubble>
          <Bubble from="us" meta="7:12 pm" i={2}>
            Yes, three 2 BHK homes are open in Tower A. Here’s the brochure and plan.
          </Bubble>
          <Bubble meta="7:30 pm" i={3}>
            Can I visit on Sunday morning?
          </Bubble>
          <Typing i={4} />
        </div>
      </Panel>
      <Panel x={300} y={150} w={190} label="Her record" i={3}>
        <div className="px-1.5">
          <Line icon="chat" title="4 messages" meta="On the record" />
          <Line icon="calendar" title="Sun, 11 am" meta="Visit with Anita" />
        </div>
      </Panel>
    </Stage>
  );
}

/** Reports: from enquiry to booking, and which sources bring buyers. */
export function ReportsMock() {
  return (
    <Stage w={900} accent={P} brand={A}>
      <Panel x={20} y={30} w={380} label="Enquiry to booking · quarter" live>
        <div className="px-3 pb-3">
          <Funnel
            stages={[
              ['Enquiries', '1,240', 100],
              ['Contacted', '1,012', 82],
              ['Site visits', '318', 26],
              ['Negotiation', '96', 8],
              ['Booked', '41', 3.3],
            ]}
          />
        </div>
      </Panel>
      <Panel x={416} y={20} w={290} label="By source · leads → booked" i={1}>
        <div className="flex flex-col gap-2">
          <Step
            tool="Google Ads"
            title="Google Ads"
            meta="412 leads"
            status="17 booked"
            tone="accent"
          />
          <Step tool="Meta" title="Meta ads" meta="386 leads" status="9 booked" tone="accent" />
          <Step
            icon="globe"
            title="Website forms"
            meta="214 leads"
            status="8 booked"
            tone="accent"
          />
        </div>
      </Panel>
      <Card x={722} y={80} w={160} i={2}>
        <div className="p-2">
          <Metric label="Booked" value={41} delta="12%" size={30} />
          <p className="mt-2 text-[11px] text-ink-2">17 from Google Ads</p>
        </div>
      </Card>
    </Stage>
  );
}

/** How it's built: the weekend's site visits in the office, the new lead on Ravi's phone. */
export function CrmHowBox() {
  return (
    <Stage w={760} accent={P} brand={A}>
      <Panel x={40} y={30} w={360} label="Site visits · this weekend" live>
        <div className="flex flex-col gap-2">
          <Step face="Nikhil Priya" title="Nikhil & Priya" meta="Sat 11 am · Lakeside · Sameer" />
          <Step face="Arvind Kulkarni" title="Arvind Kulkarni" meta="Sat 2 pm · Lakeside · Ravi" />
          <Step face="Sneha Iyer" title="Sneha Iyer" meta="Sun 12:30 pm · Lakeside · Anita" />
          <Step face="Rao Family" title="Rao family" meta="Sun 3 pm · Palm Grove · Sameer" />
        </div>
      </Panel>
      <Panel
        x={360}
        y={300}
        w={320}
        label="New lead · Ravi’s phone"
        badge={<Status tone="accent">9:42 pm</Status>}
        i={2}
      >
        <div className="px-2">
          <p className="pb-1 text-[14px] font-medium text-ink">Rohit Verma</p>
          <Line icon="globe" title="Website form" meta="From a Google search ad" />
          <Line icon="rupee" title="₹1.3–1.5 Cr" meta="Home loan · within 6 months" />
          <Line
            icon="phone"
            title="Call back"
            meta="Today, before 10 am"
            right={<Status tone="wait">Next</Status>}
          />
        </div>
      </Panel>
    </Stage>
  );
}

export const CrmHow = CrmHowBox;
