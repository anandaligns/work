'use client';

import { Bubble, Checks, Chip, Line, Metric, Status, Step } from '../kit';
import { App, Chat, Sheet } from '../sheet';

/**
 * Lead Automation's five screens, from its sample business — a home cleaning and pest control
 * company in Bangalore: every source landing in one list, the quote that answered Priya in eight
 * seconds, today's follow-ups, Priya's record, and the week.
 */

/** Every source, one list: four ways in, and tonight's enquiries already answered. */
export function Sources() {
  return (
    <Sheet
      label="Every enquiry"
      badge={<Status tone="accent">5 new</Status>}
      foot={['Answered', '64 of 64']}
    >
      <Line
        icon="globe"
        title="Priya Menon"
        meta="Website form · 8 s"
        right={<Status tone="accent">New</Status>}
      />
      <Line
        tool="Google Ads"
        title="Rahul Bose"
        meta="Google Ads · 5 s"
        right={<Status>Booked</Status>}
      />
      <Line
        tool="Instagram"
        title="Sana Khan"
        meta="Instagram · 6 s"
        right={<Status tone="muted">Replied</Status>}
      />
      <Line
        tool="WhatsApp"
        title="Arun Pillai"
        meta="WhatsApp · 4 s"
        right={<Status>Booked</Status>}
      />
    </Sheet>
  );
}

/** Answered at once: Priya's enquiry, and the quote back in eight seconds. */
export function Reply() {
  return (
    <Chat name="Priya Menon" meta="Website enquiry · 9:01 pm">
      <Bubble meta="9:01 pm">Deep cleaning for a 3 BHK in HSR Layout, this weekend.</Bubble>
      <Bubble from="us" meta="9:02 pm · 8 s">
        A deep clean for a 3 BHK is <b>₹6,499 incl. GST</b>, a team of 3. Pick a slot:
      </Bubble>
      <div className="flex justify-end gap-1.5">
        <Chip on>Sat 10:30</Chip>
        <Chip>Sat 4:00</Chip>
      </div>
    </Chat>
  );
}

/** Tracked until it's closed: today's follow-ups, each with a next step and an owner. */
export function FollowUps() {
  return (
    <Sheet label="Follow-ups · 7" live>
      <div className="flex flex-col gap-1.5">
        <Step
          turn
          n={3}
          i={0}
          face="Sana Khan"
          title="Sana · sofa"
          meta="Due · then Ravi calls"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={1}
          face="Neha Gupta"
          title="Neha · move-in"
          meta="Needs Anita · Sunday?"
          className="!py-2"
        />
        <Step
          turn
          n={3}
          i={2}
          face="Meera S"
          title="Meera · kitchen"
          meta="Viewed · automatic"
          className="!py-2"
        />
        <Step
          muted
          face="Vikram J"
          title="Vikram · villa"
          meta="Closed · another date"
          className="!py-2"
        />
      </div>
    </Sheet>
  );
}

/** Priya's record on the team's side: where she came from and what's next. */
export function Record() {
  return (
    <App title="Priya Menon" sub="Leads · booked" icon="person" right={<Status>Booked</Status>}>
      <Line tool="Google" title="Google search" meta="“deep cleaning hsr”" />
      <div className="mt-2">
        <Checks
          items={[
            { text: 'Quote sent · 8 s', done: true },
            { text: 'Inspection · Sat 10:30', done: true },
            { text: 'Reminder the evening before' },
          ]}
        />
      </div>
      <div className="mt-3">
        <Line face="Anita" title="Anita · HSR team" meta="Alerted at 9:02 pm" />
      </div>
    </App>
  );
}

/** The week: every enquiry answered in under a minute, and the bookings. */
export function Week() {
  return (
    <Sheet label="This week" live>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <Metric label="Enquiries" value="64" delta="12%" size={22} />
        <Metric label="Under a minute" value="100%" size={22} />
        <Metric label="Booked" value="23" size={22} />
        <Metric label="For a person" value="2" size={22} />
      </div>
      <p className="mt-3.5 rounded-xl bg-fill px-3 py-2 text-[11px] leading-snug text-ink-2">
        No lead waited for a reply, day or night.
      </p>
    </Sheet>
  );
}
