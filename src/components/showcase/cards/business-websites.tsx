'use client';

import { ToolMark } from '../../ui/brand-logos';
import { Icon } from '../../ui/icon';
import { Bars, Chip, Field, Line, Meter, Metric, Press, Status } from '../kit';
import { App, Picture, Sheet, Web } from '../sheet';

/**
 * Business Websites' five screens, from the page's sample business — an Interior Design Studio in
 * Indiranagar: first on Google, its homepage, Nikhil's consultation booked from a phone at 9:14 pm,
 * every enquiry in one inbox, and the month measured.
 */

/** Found on Google: the studio first in the local results. */
export function Found() {
  return (
    <Sheet
      label="Google · nearby"
      badge={<Status tone="accent">#1</Status>}
      foot={['Clicks', '+38%']}
    >
      <span className="flex h-8 items-center gap-2 rounded-full border border-line px-3 text-[11.5px] text-ink-2">
        <ToolMark tool="Google" size={12} />
        interior designer indiranagar
      </span>
      <div className="sc-step--lit mt-3 rounded-xl border border-line p-2.5">
        <p className="text-[13px] font-medium">Interior Design Studio</p>
        <p className="mt-0.5 text-[11px] text-ink-2">4.9 ★ (212) · Open till 7 pm</p>
        <div className="mt-2 flex gap-1.5">
          <Chip on>Website</Chip>
          <Chip>Call</Chip>
          <Chip>Route</Chip>
        </div>
      </div>
      <div className="mt-1.5 opacity-60">
        <Line icon="home" title="Nest & Nook Interiors" meta="4.6 ★ (98) · 1.2 km" />
        <Line icon="home" title="Oak Lane Design" meta="4.5 ★ (64) · 1.8 km" />
      </div>
    </Sheet>
  );
}

/** The homepage: the studio's own words and work, and the one thing to do. */
export function Home() {
  return (
    <Web address="studio.in" className="px-3.5 pt-3">
      <span className="flex items-center justify-between text-[11px] font-semibold">
        Interior Design Studio
        <Icon name="menu" size={13} className="text-ink-2" />
      </span>
      <p className="mt-3 text-[17px] leading-[1.15] font-semibold">
        Homes designed around how you live
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-ink-2">
        Kitchens, wardrobes and full homes in Indiranagar, fixed price.
      </p>
      <Press className="mt-3">Book a free consultation</Press>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <Picture h={58} icon="home" />
        <Picture h={58} style={{ opacity: 0.75 }} />
        <Picture h={58} style={{ opacity: 0.55 }} />
      </div>
      <p className="mt-2 text-[10.5px] text-ink-2">312 homes · 4.9 ★ on Google</p>
    </Web>
  );
}

/** Designed to sell: the consultation page on a phone, Nikhil's slot chosen and his number in. */
export function Book() {
  return (
    <App title="Book a consultation" sub="Free · 45 minutes" icon="calendar">
      <Field label="Project" value="Kitchen · 2 BHK" />
      <span className="mt-2.5 block text-[11px] text-ink-2">Saturday</span>
      <div className="mt-1 flex gap-1.5">
        <Chip>10:30</Chip>
        <Chip on>11:00 am</Chip>
        <Chip>11:30</Chip>
      </div>
      <div className="mt-2.5">
        <Field label="Phone" value="+91 98450 21784" focus />
      </div>
      <Press className="mt-3">Request this slot</Press>
    </App>
  );
}

/** Every enquiry: one inbox, each with the page it came from, the reply already sent. */
export function Inbox() {
  return (
    <Sheet label="Enquiries" live foot={['Replied', '3 of 3']}>
      <Line
        face="Nikhil Rao"
        title="Nikhil Rao"
        meta="Kitchens · 9:14 pm"
        right={<Status tone="accent">New</Status>}
      />
      <Line tool="WhatsApp" title="Divya M" meta="Projects page" right={<Status>Replied</Status>} />
      <Line icon="phone" title="Call · Arjun" meta="Contact page" right={<Status>Called</Status>} />
      <Line face="Sneha P" title="Sneha P" meta="Wardrobes" right={<Status>Booked</Status>} />
    </Sheet>
  );
}

/** Measured: the month's visitors and requests, and where they come from. */
export function Measured() {
  return (
    <Sheet label="This month" live>
      <div className="grid grid-cols-2 gap-2">
        <Metric label="Visitors" value="6,412" delta="18%" size={21} />
        <Metric label="Requests" value="142" delta="26%" size={21} />
      </div>
      <div className="mt-3">
        <Bars values={[38, 44, 41, 52, 57, 63]} height={52} />
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <Meter label="Google" value={58} />
        <Meter label="Instagram" value={24} i={1} />
        <Meter label="Direct" value={18} i={2} />
      </div>
    </Sheet>
  );
}
