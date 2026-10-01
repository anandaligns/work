import type { ReactNode } from 'react';

import { productFor } from '@/content/products';

import { ToolMark } from '../ui/brand-logos';
import { surfaceOf } from '../lab/mock-parts';
import { BRANDS } from '../visuals/concept-sites';
import { Icon, type IconName } from '../ui/icon';
import type { ServiceStageProps, StageCard } from './service-stage';

/**
 * Every service page's opening picture: the example business whose website the laptop and the
 * iPhone show — a different kind of business on every page — and six moments from it, the same
 * people, figures and times its mockups use, so nothing here says more than the page does. The
 * stage and the cards are drawn in the page's accent; the site, in the business's own colour.
 */

/** A card's mark: a glyph in the page's dark accent on a pale chip of its accent. */
function Glyph({ icon, accent, dark }: { icon: IconName; accent: string; dark: string }) {
  return (
    <span
      className="grid size-6 shrink-0 place-items-center rounded-[7px]"
      style={{ background: `color-mix(in srgb, ${accent} 12%, white)`, color: dark }}
    >
      <Icon name={icon} size={13} strokeWidth={2.1} />
    </span>
  );
}

/** A person's initials, on a pale step of the page's accent. */
function Initials({ name, accent, dark }: { name: string; accent: string; dark: string }) {
  return (
    <span
      className="grid size-6 shrink-0 place-items-center rounded-full text-[9px] font-semibold"
      style={{ background: `color-mix(in srgb, ${accent} 14%, white)`, color: dark }}
    >
      {name}
    </span>
  );
}

/** A tool's own mark, on grey. */
function Tool({ tool }: { tool: string }) {
  return (
    <span className="grid size-6 place-items-center rounded-[7px] bg-[#f4f5f7]">
      <ToolMark tool={tool} size={14} />
    </span>
  );
}

type Lead = { icon: IconName } | { initials: string } | { tool: string };
type Moment = [lead: Lead, label: string, value: string, line: string];

const lead = (l: Lead, accent: string, dark: string): ReactNode =>
  'icon' in l ? (
    <Glyph icon={l.icon} accent={accent} dark={dark} />
  ) : 'tool' in l ? (
    <Tool tool={l.tool} />
  ) : (
    <Initials name={l.initials} accent={accent} dark={dark} />
  );

/** Each page's example business and six moments, in the order the cards run. */
const PAGES: Record<string, { brand: string; moments: Moment[] }> = {
  'business-websites': {
    brand: 'interiordesign',
    moments: [
      [{ tool: 'Google' }, 'Enquiry', 'Sat 11 am', 'Kitchen · from Google'],
      [{ icon: 'search' }, 'Clicks from Google', '3,862', 'This period'],
      [{ icon: 'eye' }, 'Times shown', '96.4k', 'Up 22%'],
      [{ icon: 'mail' }, 'Enquiries', '118', 'From search'],
      [{ initials: 'NR' }, 'Nikhil · 9:14 pm', 'Booked', 'Kitchen consultation'],
      [{ icon: 'gauge' }, 'Average position', '6.1', 'On Google'],
    ],
  },
  'e-commerce-stores': {
    brand: 'fashionstore',
    moments: [
      [{ tool: 'Razorpay' }, 'New order', '₹2,480', 'Paid by UPI · 2 items'],
      [{ icon: 'truck' }, 'Order YS-1048', 'Out today', 'By 6 pm'],
      [{ icon: 'alert' }, 'Stock', '2 left', 'Block-print kurta · M'],
      [{ icon: 'store' }, 'Products', '86', 'In your admin'],
      [{ icon: 'cart' }, 'Orders', '12', 'Waiting in admin'],
      [{ icon: 'repeat' }, 'Returns', '7 days', 'Picked up at the door'],
    ],
  },
  'customer-portals': {
    brand: 'partsdistributor',
    moments: [
      [{ initials: 'SL' }, 'Sri Lakshmi Engg.', 'SO-4821', 'Packed · ships today'],
      [{ icon: 'receipt' }, 'Invoice due', '₹1,82,400', 'INV-2291 · 20 Oct'],
      [{ icon: 'card' }, 'Credit left', '₹3.2 L', 'Of a ₹5 L limit'],
      [{ icon: 'file' }, 'Documents', '46', 'In the portal'],
      [{ icon: 'chat' }, 'Quote request', 'Answered', '200 × 6205 bearings'],
      [{ icon: 'truck' }, 'Delivered', 'SO-4790', 'Signed · 9:40 am'],
    ],
  },
  'web-apps': {
    brand: 'logistics',
    moments: [
      [{ initials: 'RK' }, 'Ravi · KA-01 4412', 'Job 3 of 6', 'Hosur drop · 11:40'],
      [{ icon: 'truck' }, 'On the road', '14', 'Of 18 vehicles'],
      [{ icon: 'check' }, 'Delivered today', '96', 'Proof on each'],
      [{ icon: 'clock' }, 'On time', '97%', 'This week'],
      [{ icon: 'scan' }, 'Proof of delivery', 'Photo', 'LD-3321 · signed'],
      [{ tool: 'Zoho Books' }, 'INV-5512', 'Created', 'On delivery'],
    ],
  },
  'mobile-apps': {
    brand: 'restaurant',
    moments: [
      [{ initials: 'AR' }, 'Arjun · S-2210', '₹180', 'Pickup 7:10 pm'],
      [{ icon: 'cart' }, 'Orders tonight', '103', 'Every order, one list'],
      [{ icon: 'trend' }, 'Takings', '₹41,200', 'Tonight'],
      [{ icon: 'clock' }, 'Average prep', '12 min', '2 min faster'],
      [{ icon: 'devices' }, 'From the app', '37%', 'Of tonight’s orders'],
      [{ icon: 'bell' }, 'Ready', 'S-2208', 'Meera Pillai'],
    ],
  },
  dashboards: {
    brand: 'solarenergy',
    moments: [
      [{ tool: 'WhatsApp' }, 'Morning summary', '8:00 am', 'On WhatsApp'],
      [{ icon: 'trend' }, 'Generated', '4,120 kWh', 'Yesterday'],
      [{ icon: 'rupee' }, 'Saved for clients', '₹32,960', 'Yesterday'],
      [{ icon: 'gauge' }, 'Sites online', '37 of 38', 'Right now'],
      [{ icon: 'alert' }, 'Inverter offline', 'Site 14', 'Since 6:10 am'],
      [{ icon: 'spark' }, 'Carbon avoided', '2.9 t', 'This month'],
    ],
  },
  'internal-tools': {
    brand: 'school',
    moments: [
      [{ icon: 'alert' }, 'Approval needed', '₹12,000', 'Fee concession'],
      [{ icon: 'file' }, 'Admissions', '46', 'Applications this term'],
      [{ icon: 'userCheck' }, 'Attendance', '96%', 'Today, all classes'],
      [{ icon: 'people' }, 'Staff', '58', 'Teaching and office'],
      [{ icon: 'calendar' }, 'Term exams', '14 Oct', 'Timetable out'],
      [{ icon: 'check' }, 'Approved in', '1 tap', 'By the principal'],
    ],
  },
  'crm-systems': {
    brand: 'realestate',
    moments: [
      [{ initials: 'RV' }, 'New lead · Rohit', '₹1.4 Cr', '3 BHK · website form'],
      [{ tool: 'WhatsApp' }, 'Alerted', 'Ravi', 'On WhatsApp'],
      [{ icon: 'calendar' }, 'Site visit', 'Sat 11 am', 'Nikhil & Priya'],
      [{ tool: 'Instagram' }, 'Sneha Iyer', '₹92 L', '2 BHK · Instagram ad'],
      [{ icon: 'trend' }, 'Negotiation', '₹2.6 Cr', 'Villa · Palm Grove'],
      [{ icon: 'check' }, 'Booked', 'Kavitha', 'On the record'],
    ],
  },
  'custom-software': {
    brand: 'construction',
    moments: [
      [{ icon: 'layers' }, 'Block B · slab 3', '72%', 'Greenfield School'],
      [{ icon: 'receipt' }, 'PO approved', '400 bags', 'Cement · 2 quotes'],
      [{ icon: 'people' }, 'Labour on site', '46', 'Across 3 sites'],
      [{ icon: 'trend' }, 'Cost to date', '₹1.84 Cr', 'Of ₹2.6 Cr budget'],
      [{ icon: 'check' }, 'Inspection', 'Passed', 'Slab 2 · 12 Sep'],
      [{ icon: 'userCheck' }, 'Owner view', 'Every site', 'On one screen'],
    ],
  },
  'business-platforms': {
    brand: 'recruitment',
    moments: [
      [{ icon: 'layers' }, 'New workspace', 'Northstar', 'Trial · 14 recruiters'],
      [{ icon: 'briefcase' }, 'Paying agencies', '159', 'Up 11'],
      [{ icon: 'receipt' }, 'Monthly revenue', '₹4.62 L', 'Up 9%'],
      [{ icon: 'people' }, 'Candidates', '38,400', 'In pipelines'],
      [{ icon: 'file' }, 'Open jobs', '1,260', 'Across agencies'],
      [{ icon: 'userCheck' }, 'Placed', '312', 'This month'],
    ],
  },
  'whatsapp-automation': {
    brand: 'dentalclinic',
    moments: [
      [{ initials: 'PS' }, 'Priya · 11:52 pm', 'Sundays?', 'From an Instagram ad'],
      [{ icon: 'clock' }, 'First reply', '4 s', 'Day or night'],
      [{ icon: 'bell' }, 'Reminder', '6:00 pm', 'With the location'],
      [{ icon: 'calendar' }, 'Check-up', '7:00 pm', 'Tomorrow · Arjun'],
      [{ tool: 'Razorpay' }, 'Paid · UPI', '₹1,500', 'Cleaning · receipt sent'],
      [{ initials: 'SK' }, 'Handed over', 'Sameer', 'With the history'],
    ],
  },
  'booking-payment-workflows': {
    brand: 'salon',
    moments: [
      [{ initials: 'RM' }, 'Riya Mehta', 'Sat 6 pm', 'Colour · with Ananya'],
      [{ icon: 'receipt' }, 'Deposits held', '₹14,500', 'This week'],
      [{ icon: 'calendar' }, 'Booked today', '38', 'Of 44 slots'],
      [{ icon: 'trend' }, 'Booked online', '71%', 'Up 18 points'],
      [{ tool: 'WhatsApp' }, 'Reminder sent', 'Confirmed', 'Fri · by reply'],
      [{ icon: 'refresh' }, 'Rescheduled', 'Sun 11 am', 'In one tap'],
    ],
  },
  'api-integrations': {
    brand: 'travelagency',
    moments: [
      [{ icon: 'refresh' }, 'TR-2291 synced', '1.4 s', 'Invoice and voucher'],
      [{ tool: 'Razorpay' }, 'Settlement', '₹2,84,600', '19 bookings'],
      [{ tool: 'Zoho Books' }, 'INV-1182', 'Created', 'GST 5% · 9:41 am'],
      [{ icon: 'globe' }, 'Fares checked', 'Live', 'Flight supplier API'],
      [{ tool: 'Google Sheets' }, 'Bookings sheet', 'Up to date', 'Every 5 min'],
      [{ icon: 'alert' }, 'Supplier timeout', 'Retried', 'TR-2286 · after 2 min'],
    ],
  },
  'ai-assistants': {
    brand: 'lawfirm',
    moments: [
      [{ initials: 'AR' }, 'Anjali · 10:52 pm', 'Booked', 'Sat 10 am'],
      [{ icon: 'chat' }, 'Answered', '₹2,000', 'Consultation fee'],
      [{ icon: 'clock' }, 'Answers', 'Any hour', 'On the website'],
      [{ icon: 'userShare' }, 'Handed over', 'Adv. Menon', 'Asked for a lawyer'],
      [{ icon: 'book' }, 'Sources', 'Your docs', 'Nothing else'],
      [{ tool: 'WhatsApp' }, 'Reminder', 'Sent', 'For Saturday'],
    ],
  },
  'ai-workflows': {
    brand: 'accounting',
    moments: [
      [{ icon: 'scan' }, 'Invoice read', '2 s', 'NST/0418'],
      [{ icon: 'alert' }, 'Quantity differs', '180', 'PO says 200'],
      [{ icon: 'receipt' }, 'Total incl. GST', '₹47,636', 'Shree Balaji Traders'],
      [{ icon: 'check' }, 'Kaveri Steel', 'Match', 'PO-7764 · ₹1,18,420'],
      [{ icon: 'target' }, 'Confidence', '99%', 'Supplier and number'],
      [{ icon: 'userCheck' }, 'Approved by', 'A person', 'Before it’s posted'],
    ],
  },
};

/** The example business's own colour on a service page, for its screens inside the mockups. */
export function businessColour(slug: string): string | undefined {
  const page = PAGES[slug];
  return page ? BRANDS[page.brand]?.accent : undefined;
}

/** A service page's stage, or nothing for a page without one. */
export function stageFor(slug: string): ServiceStageProps | undefined {
  const page = PAGES[slug];
  const product = productFor(slug);
  if (!page || !product) return undefined;
  const accent = product.accent;
  const dark = product.accentDark ?? accent;
  return {
    brand: page.brand,
    ground: surfaceOf(accent),
    cards: page.moments.map(([l, label, value, line]): StageCard => ({
      lead: lead(l, accent, dark),
      label,
      value,
      line,
    })),
  };
}
