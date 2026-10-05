import type { ComponentType } from 'react';

import { productFor } from '@/content/products';

import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';
import { BRANDS } from '../visuals/concept-sites';
import { Bleed } from './fit';
import { deep, Tag } from './light-kit';
import { Bar, Check, Label, Pane, Widget } from './window-kit';

/**
 * Each service page's features, shown working on its own example business, after Lightfield's
 * dashboards: a stack of widgets down the left — a list (the pages, the templates, the orders…)
 * and three figures — and one record open on the right: what the customer sees, the setup ticked
 * off, and what comes with it, each line one of the page's features. Every name and figure is the
 * page's own sample data. Drawn on a 900 × 780 canvas that runs off the panel (`Bleed`).
 */

type Tone = 'ok' | 'wait' | 'plain' | 'accent';

export type DashboardSpec = {
  /** The example business, for its colour (`BRANDS`). */
  brand: string;
  list: {
    title: string;
    icon: IconName;
    rows: { name: string; meta: string; tag: string; tone?: Tone; strong?: boolean }[];
  };
  figures: { title: string; value: string; line: string }[];
  crumb: { icon: IconName; trail: [string, string] };
  title: string;
  preview: {
    label: string;
    icon: IconName;
    tool?: string;
    meta: string;
    heading: string;
    body: string;
  };
  ticks: string[];
  checks: { label: string; items: { title: string; meta: string; done?: boolean }[] };
};

function Figure({ value, line }: { value: string; line: string }) {
  return (
    <span className="flex flex-1 flex-col items-center justify-center text-center">
      <span
        className="leading-none font-medium tracking-[-0.02em]"
        style={{ fontSize: value.length > 12 ? 21 : 30 }}
      >
        {value}
      </span>
      <span className="mt-2.5 text-[11.5px] text-ink-3">{line}</span>
    </span>
  );
}

function Ticked({ accent, children }: { accent: string; children: string }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-[8px] border border-[#e4e6eb] bg-white px-2.5 py-1.5 text-[12.5px] whitespace-nowrap">
      <span style={{ color: accent }}>
        <Icon name="check" size={13} strokeWidth={2.6} />
      </span>
      {children}
    </span>
  );
}

export function FeatureDashboard({ spec, accent }: { spec: DashboardSpec; accent: string }) {
  const link = deep(BRANDS[spec.brand]?.accent ?? accent, 80);
  const tops = [372, 558, 744];
  return (
    <Bleed w={900} h={780}>
      <Widget x={56} y={64} w={330} h={290} i={0} title={spec.list.title} accent={accent}>
        <ul className="mt-2.5 divide-y divide-[#f0f0f3]">
          {spec.list.rows.slice(0, 6).map((row) => (
            <li
              key={row.name + row.meta}
              className={`flex items-center gap-2.5 py-[7px] ${row.strong ? 'font-semibold' : ''}`}
            >
              <span className="text-ink-3">
                <Icon name={spec.list.icon} size={13} />
              </span>
              <span className="min-w-0 truncate text-[12.5px]">{row.name}</span>
              <span className="min-w-0 truncate text-[11px] font-normal text-ink-3">
                {row.meta}
              </span>
              <span className="ml-auto shrink-0">
                <Tag tone={row.tone ?? 'ok'} accent={accent}>
                  {row.tag}
                </Tag>
              </span>
            </li>
          ))}
        </ul>
      </Widget>
      {spec.figures.slice(0, 3).map((figure, k) => (
        <Widget
          key={figure.title}
          x={56}
          y={tops[k]!}
          w={330}
          h={168}
          i={k + 1}
          title={figure.title}
          accent={accent}
        >
          <Figure value={figure.value} line={figure.line} />
        </Widget>
      ))}
      <Pane x={404} y={64} w={620} h={780} i={2}>
        <Bar icon={spec.crumb.icon}>
          <span>{spec.crumb.trail[0]}</span>
          <span className="text-ink-3">/</span>
          <span>{spec.crumb.trail[1]}</span>
        </Bar>
        <div className="px-8 pt-7">
          <p className="text-[27px] leading-none font-medium tracking-[-0.02em] whitespace-nowrap">
            {spec.title}
          </p>
          <div className="mt-6 flex gap-6">
            <span className="flex w-[96px] shrink-0 items-center gap-2 self-start pt-0.5 text-[13px] whitespace-nowrap text-ink-3">
              <Icon name={spec.preview.icon} size={14} />
              {spec.preview.label}
            </span>
            <div className="w-[460px]">
              <p className="flex items-center gap-2 text-[12px] text-ink-3">
                {spec.preview.tool ? <ToolMark tool={spec.preview.tool} size={13} /> : null}
                {spec.preview.meta}
              </p>
              <p className="mt-1 text-[16px] font-medium" style={{ color: link }}>
                {spec.preview.heading}
              </p>
              <p className="mt-1 text-[13px] leading-[1.5] text-ink-2">{spec.preview.body}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {spec.ticks.map((tick) => (
              <Ticked key={tick} accent={accent}>
                {tick}
              </Ticked>
            ))}
          </div>
          <div className="mt-7">
            <Label>{spec.checks.label}</Label>
            <ul className="mt-1.5">
              {spec.checks.items.map((item) => (
                <Check
                  key={item.title}
                  done={item.done ?? true}
                  title={item.title}
                  meta={item.meta}
                  accent={accent}
                />
              ))}
            </ul>
          </div>
        </div>
      </Pane>
    </Bleed>
  );
}

// --- every service's dashboard -----------------------------------------------------------------

const SPECS: Record<string, DashboardSpec> = {
  'business-websites': {
    brand: 'interiordesign',
    list: {
      title: 'Pages · 6',
      icon: 'file',
      rows: [
        { name: 'Home', meta: '/', tag: 'Live' },
        { name: 'Living rooms', meta: '/services/living-rooms', tag: 'Live' },
        { name: 'Modular kitchens', meta: '/services/kitchens', tag: 'Live', strong: true },
        { name: 'Offices', meta: '/services/offices', tag: 'Live' },
        { name: 'Projects', meta: '/projects', tag: 'Live' },
        { name: 'Contact', meta: '/contact', tag: 'Live' },
      ],
    },
    figures: [
      { title: 'Speed on a phone', value: '98', line: 'Performance, tested before launch' },
      { title: 'SSL', value: 'https', line: 'The padlock on every page' },
      {
        title: 'Domain and email',
        value: 'interiordesignstudio.in',
        line: 'Yours, with business email',
      },
    ],
    crumb: { icon: 'globe', trail: ['interiordesignstudio.in', 'Modular kitchens'] },
    title: 'Modular kitchens',
    preview: {
      label: 'Search',
      icon: 'search',
      tool: 'Google',
      meta: 'interiordesignstudio.in › services › kitchens',
      heading: 'Modular kitchens in Indiranagar · Interior Design Studio',
      body: 'Kitchens designed around how you cook, fitted in 45 days. A free site visit, booked online.',
    },
    ticks: ['Title', 'Meta description', 'Schema', 'In the sitemap'],
    checks: {
      label: 'On this page',
      items: [
        { title: 'WhatsApp and call buttons', meta: 'One tap from anywhere on the page' },
        { title: 'Enquiry form', meta: 'To one inbox, with this page as the source' },
        { title: 'Analytics', meta: 'Visits and enquiries counted' },
        { title: 'Google Business Profile', meta: 'Linked, so maps and search agree' },
        { title: 'Designed for phones first', meta: 'Then tablets and desktops' },
        { title: 'Content', meta: 'Written for you, if you’d rather', done: false },
      ],
    },
  },

  'whatsapp-automation': {
    brand: 'dentalclinic',
    list: {
      title: 'Templates · 6',
      icon: 'chat',
      rows: [
        { name: 'Booking confirmation', meta: 'Utility · buttons', tag: 'Approved' },
        { name: 'Reminder', meta: 'Utility · map pin', tag: 'Approved', strong: true },
        { name: 'Payment link', meta: 'Utility · UPI', tag: 'Approved' },
        { name: 'Aligner follow-up', meta: 'Marketing', tag: 'Approved' },
        { name: 'After-hours reply', meta: 'Utility', tag: 'Approved' },
        { name: 'Check-up recall', meta: 'Marketing', tag: 'In review', tone: 'wait' },
      ],
    },
    figures: [
      { title: 'First reply', value: '4 s', line: 'Day or night' },
      { title: 'Inbox', value: '24', line: '3 unread · 16 automated' },
      { title: 'Paid · UPI', value: '₹1,500', line: 'Receipt sent in the chat' },
    ],
    crumb: { icon: 'whatsapp', trail: ['Dental Clinic', 'Reminder'] },
    title: 'Reminder',
    preview: {
      label: 'Sends',
      icon: 'chat',
      tool: 'WhatsApp',
      meta: 'Dental Clinic · +91 80 •••• 4210 · verified',
      heading: 'Your check-up with Dr Nair is today at 7:00 pm',
      body: 'Tap for the location, 100 Feet Road, Indiranagar, or reply to change the time.',
    },
    ticks: ['Approved by Meta', 'Your number', 'Map pin', 'Buttons'],
    checks: {
      label: 'Around it',
      items: [
        { title: 'Email alongside', meta: 'The same message, from your own domain' },
        { title: 'Calendar sync', meta: 'Changes on WhatsApp update Google Calendar' },
        { title: 'Business hours', meta: 'Different replies in and out of hours' },
        { title: 'Routing rules', meta: 'By source, service, branch or language' },
        { title: 'Team alerts', meta: 'The moment something needs a person' },
        { title: 'Opt-in and opt-out', meta: 'Opting out always works' },
      ],
    },
  },

  'e-commerce-stores': {
    brand: 'fashionstore',
    list: {
      title: 'Products · 86',
      icon: 'store',
      rows: [
        {
          name: 'Indigo block-print kurta',
          meta: 'S 6 · M 2 · L 9 · XL 4',
          tag: 'Low',
          tone: 'wait',
          strong: true,
        },
        { name: 'Kalamkari cotton stole', meta: 'One size', tag: 'In stock' },
        { name: 'Mulmul summer dress', meta: 'S to XL', tag: 'In stock' },
        { name: 'Handloom cotton saree', meta: 'One size', tag: 'In stock' },
        { name: 'Linen kurta set', meta: 'All sizes gone', tag: 'Sold out', tone: 'plain' },
      ],
    },
    figures: [
      { title: 'New order', value: '₹2,480', line: 'Paid by UPI · 2 items' },
      { title: 'Orders', value: '12', line: 'Waiting in your admin' },
      { title: 'Returns', value: '7 days', line: 'Picked up at the door' },
    ],
    crumb: { icon: 'store', trail: ['fashionclothingstore.in', 'Kurtas'] },
    title: 'Indigo block-print kurta',
    preview: {
      label: 'In the store',
      icon: 'cart',
      meta: 'fashionclothingstore.in › kurtas',
      heading: 'Indigo block-print kurta · ₹1,890',
      body: 'Was ₹2,290. Sizes S to XL, with what’s left of each; add to bag and pay by UPI or card.',
    },
    ticks: ['Photos', 'Sizes and colours', 'Live stock', 'Instagram link'],
    checks: {
      label: 'When it sells',
      items: [
        { title: 'Cart and checkout', meta: 'A few taps, built for phones' },
        { title: 'Payment gateway', meta: 'The one that suits you; its fees are its own' },
        { title: 'Order emails', meta: 'The moment an order is paid' },
        { title: 'Shipping setup', meta: 'Your rules, and a partner if you use one' },
        { title: 'Analytics', meta: 'What people look at, add and buy' },
        { title: 'WhatsApp updates', meta: 'With an E-commerce System', done: false },
      ],
    },
  },

  'customer-portals': {
    brand: 'partsdistributor',
    list: {
      title: 'Documents · 46',
      icon: 'file',
      rows: [
        { name: 'Rate contract · 2026', meta: 'PDF · 4 pages', tag: 'Shared' },
        { name: 'Receipt · INV-2250', meta: 'PDF · 1 page', tag: 'Shared' },
        { name: 'Test certificate · 6205', meta: '2 pages', tag: 'Shared' },
        { name: 'Quote · 200 × 6205', meta: 'REQ-214', tag: 'Answered', strong: true },
        { name: 'Invoice · INV-2291', meta: '₹1,82,400', tag: 'Due 20 Oct', tone: 'wait' },
      ],
    },
    figures: [
      { title: 'Invoice due', value: '₹1,82,400', line: 'INV-2291 · 20 Oct' },
      { title: 'Credit left', value: '₹3.2 L', line: 'Of a ₹5 L limit' },
      { title: 'Open orders', value: '42', line: 'Across customers' },
    ],
    crumb: { icon: 'people', trail: ['portal.industrialpartsdistributor.in', 'Sri Lakshmi Engg.'] },
    title: 'Sri Lakshmi Engineering',
    preview: {
      label: 'Latest',
      icon: 'truck',
      meta: 'Order SO-4821 · today',
      heading: 'Packed in 3 cartons, ships today',
      body: 'Posted by your team; the customer is told on WhatsApp and sees it the next time they sign in.',
    },
    ticks: ['Signed in by code', 'Their records only', 'In your brand', 'On a phone'],
    checks: {
      label: 'In their portal',
      items: [
        { title: 'Updates timeline', meta: 'Progress, photos and notes, in order' },
        { title: 'Payments', meta: 'What’s due, what’s paid, a link to pay' },
        { title: 'Documents', meta: 'Agreements, invoices and receipts' },
        { title: 'Requests', meta: 'Tracked, with owners and replies' },
        { title: 'Notifications', meta: 'WhatsApp or email when something arrives' },
        { title: 'Connected', meta: 'To your CRM or accounting software' },
      ],
    },
  },

  'web-apps': {
    brand: 'logistics',
    list: {
      title: 'Jobs today · 96',
      icon: 'truck',
      rows: [
        {
          name: 'LD-3321',
          meta: 'Peenya → Hosur · signed',
          tag: 'Delivered',
          strong: true,
        },
        { name: 'KA-01 4412', meta: 'Ravi Kumar · job 3 of 6', tag: 'On the road', tone: 'accent' },
        { name: 'INV-5512', meta: '₹6,800 · LD-3321', tag: 'Created' },
        { name: 'INV-5488', meta: '₹8,200 · LD-3290', tag: 'Paid', tone: 'plain' },
        { name: 'Saved route', meta: 'Peenya → Hosur', tag: 'Two taps', tone: 'plain' },
      ],
    },
    figures: [
      { title: 'On the road', value: '14 of 18', line: 'Vehicles, right now' },
      { title: 'On time', value: '97%', line: 'This week' },
      { title: 'Booked in the app', value: '87%', line: 'Of today’s jobs' },
    ],
    crumb: { icon: 'devices', trail: ['Sri Sai Traders', 'Your loads'] },
    title: 'Your loads',
    preview: {
      label: 'Live status',
      icon: 'truck',
      meta: 'Job LD-3321 · 9:40 am',
      heading: 'Delivered at Hosur, signed for',
      body: 'A photo of the proof on the job, and invoice INV-5512 for ₹6,800 created on its own.',
    },
    ticks: ['Any device', 'On the home screen', 'Signed in by code', 'One version'],
    checks: {
      label: 'In the app',
      items: [
        { title: 'Saved details', meta: 'Repeat jobs in two taps' },
        { title: 'Payments', meta: 'Through a payment gateway' },
        { title: 'Notifications', meta: 'WhatsApp or email when something changes' },
        { title: 'Statements and invoices', meta: '₹42,380, due by 30 Sep' },
        { title: 'Roles', meta: 'Customers see only what’s theirs' },
        { title: 'Connected', meta: 'To your invoices and tracking' },
      ],
    },
  },

  'mobile-apps': {
    brand: 'restaurant',
    list: {
      title: 'Orders tonight · 103',
      icon: 'cart',
      rows: [
        {
          name: 'S-2210 · Arjun Rao',
          meta: 'Pickup 7:10 pm · ₹180',
          tag: 'Preparing',
          tone: 'accent',
          strong: true,
        },
        { name: 'S-2208 · Meera Pillai', meta: 'Pickup', tag: 'Ready' },
        { name: 'Table for 4', meta: 'Saturday · booked in the app', tag: 'Booked' },
        { name: 'Order again', meta: 'A saved order', tag: 'One tap', tone: 'plain' },
      ],
    },
    figures: [
      { title: 'Takings', value: '₹41,200', line: 'Tonight' },
      { title: 'Average prep', value: '12 min', line: '2 min faster' },
      { title: 'From the app', value: '37%', line: 'Of tonight’s orders' },
    ],
    crumb: { icon: 'phone', trail: ['Restaurant / Food Ordering Brand', 'iOS + Android'] },
    title: 'Good evening, Arjun',
    preview: {
      label: 'Notification',
      icon: 'bell',
      meta: 'Restaurant / Food Ordering Brand · now',
      heading: 'Order S-2210 is being prepared',
      body: 'Ready for pickup at 7:10 pm, with directions in a tap.',
    },
    ticks: ['iOS', 'Android', 'Sign in by phone', 'Store publishing'],
    checks: {
      label: 'In the app',
      items: [
        { title: 'Order again', meta: 'Saved orders and favourites, one tap away' },
        { title: 'Bookings', meta: 'A table for 4, in two taps' },
        { title: 'Payments', meta: 'Through a payment gateway' },
        { title: 'Rewards', meta: 'Points and offers, not paper cards' },
        { title: 'Maps and pickup', meta: 'Directions in a tap' },
        { title: 'Kept current', meta: 'Updated for new phone versions on Evolve' },
      ],
    },
  },

  dashboards: {
    brand: 'solarenergy',
    list: {
      title: 'Needs attention · 4',
      icon: 'alert',
      rows: [
        {
          name: 'Inverter offline · Site 14',
          meta: 'Since 6:10 am',
          tag: 'Look',
          tone: 'wait',
          strong: true,
        },
        { name: '3 invoices unpaid', meta: '₹6,800 · 7 days', tag: 'Chase', tone: 'plain' },
        { name: '5 surveys not confirmed', meta: 'Before 11 am', tag: 'Today', tone: 'plain' },
        { name: '2 leads not called back', meta: 'Over 48 hours', tag: 'Call', tone: 'plain' },
      ],
    },
    figures: [
      { title: 'Generated', value: '4,120 kWh', line: 'Yesterday' },
      { title: 'Sites online', value: '37 of 38', line: 'Right now' },
      { title: 'Saved for clients', value: '₹32,960', line: 'Yesterday' },
    ],
    crumb: { icon: 'dashboard', trail: ['dashboard.solarenergycompany.in', 'Morning summary'] },
    title: 'Morning summary',
    preview: {
      label: 'Sends',
      icon: 'whatsapp',
      tool: 'WhatsApp',
      meta: 'Every day · 8:00 am',
      heading: 'Good morning, Kavya: 4,120 kWh yesterday',
      body: '37 of 38 sites up; the inverter at Site 14 has been offline since 6:10 am.',
    },
    ticks: ['Every source', 'One data store', 'Filters', 'Comparisons'],
    checks: {
      label: 'Behind it',
      items: [
        { title: 'Roles and access', meta: 'Each person sees what they need' },
        { title: 'On your phone', meta: 'Built mobile-first' },
        { title: 'Exports', meta: 'For your accountant, in one click' },
        { title: 'Charts that read', meta: 'Plain bars and lines, labelled in words' },
        { title: 'Kept private', meta: 'Access by login and role' },
        { title: 'Backed up daily', meta: 'On Evolve, with monitoring' },
      ],
    },
  },

  'internal-tools': {
    brand: 'school',
    list: {
      title: 'My work · 5',
      icon: 'clipboard',
      rows: [
        {
          name: 'Fee concession · 6B',
          meta: '₹12,000',
          tag: 'Approve',
          tone: 'wait',
          strong: true,
        },
        { name: 'Admission · Aanya R', meta: '7 of 12 steps', tag: 'In progress', tone: 'accent' },
        { name: 'Transfer certificate', meta: 'Deepa · today', tag: 'Asked', tone: 'plain' },
        { name: 'Term exams', meta: '14 Oct', tag: 'Timetable out' },
        { name: 'Section 3A → 3B', meta: 'Imran · 9 Sep', tag: 'Done' },
      ],
    },
    figures: [
      { title: 'Attendance', value: '96%', line: 'Today, all classes' },
      { title: 'Admissions', value: '46', line: 'Applications this term' },
      { title: 'Approved in', value: '1 tap', line: 'By the principal' },
    ],
    crumb: { icon: 'clipboard', trail: ['School / Education Institute', 'Fee concession'] },
    title: 'Fee concession · Rohan Nair',
    preview: {
      label: 'Approval',
      icon: 'userCheck',
      meta: 'To Lakshmi I · Principal',
      heading: '₹12,000 concession for Rohan Nair, 6B',
      body: '₹48,000 of ₹60,000 left for concessions this term; head approval is needed over ₹10,000.',
    },
    ticks: ['Your process', 'Owners', 'Due dates', 'Approvals'],
    checks: {
      label: 'Around it',
      items: [
        { title: 'Alerts', meta: 'WhatsApp or email before deadlines' },
        { title: 'Templates', meta: 'New admission · 12 steps · 4 roles' },
        { title: 'Full history', meta: 'Every change, who and when' },
        { title: 'Search', meta: 'Across students, notes and documents' },
        { title: 'Roles and access', meta: 'Who can see, edit and approve' },
        { title: 'Phone and laptop', meta: 'Approvals on the phone' },
      ],
    },
  },

  'crm-systems': {
    brand: 'realestate',
    list: {
      title: 'Pipeline · this weekend',
      icon: 'target',
      rows: [
        {
          name: 'Rohit Verma',
          meta: '3 BHK · ₹1.3–1.5 Cr',
          tag: 'New',
          tone: 'accent',
          strong: true,
        },
        { name: 'Sneha Iyer', meta: '2 BHK · ₹92 L', tag: 'Visit' },
        { name: 'Farah Siddiqui', meta: 'Lakeside Residency', tag: 'Follow-up', tone: 'wait' },
        { name: 'Nikhil & Priya', meta: 'Visit · Sat 11 am', tag: 'Visit' },
        { name: 'Palm Grove villa', meta: '₹2.6 Cr', tag: 'Negotiation', tone: 'plain' },
        { name: 'Kavitha', meta: 'On the record', tag: 'Booked' },
      ],
    },
    figures: [
      { title: 'Alerted', value: 'Ravi', line: 'On WhatsApp, 9:42 pm' },
      { title: 'Site visit', value: 'Sat 11 am', line: 'Nikhil & Priya' },
      { title: 'Negotiation', value: '₹2.6 Cr', line: 'Villa · Palm Grove' },
    ],
    crumb: { icon: 'people', trail: ['crm.realestateagency.in', 'Rohit Verma'] },
    title: 'Rohit Verma',
    preview: {
      label: 'Came in',
      icon: 'globe',
      meta: 'Website form · from a Google search ad',
      heading: '3 BHK, ₹1.3–1.5 Cr, home loan within 6 months',
      body: 'One record, matched by phone and email, assigned to Ravi and alerted at 9:42 pm. Call back today, before 10 am.',
    },
    ticks: ['One record', 'Source saved', 'Routed', 'Alerted'],
    checks: {
      label: 'On the record',
      items: [
        { title: 'Stages and next steps', meta: 'A pipeline that matches how you sell' },
        { title: 'Follow-up reminders', meta: 'Until it’s closed either way' },
        { title: 'WhatsApp on the record', meta: 'Messages logged against the customer' },
        { title: 'Call notes', meta: 'Added in a tap' },
        { title: 'Source reports', meta: 'Which sources turn into visits and sales' },
        { title: 'Conversion tracking', meta: 'Reported back to your ads' },
      ],
    },
  },

  'custom-software': {
    brand: 'construction',
    list: {
      title: 'Approvals · 4',
      icon: 'check',
      rows: [
        {
          name: 'Cement · 400 bags',
          meta: 'Stores · ₹1,64,000',
          tag: 'Approved',
          strong: true,
        },
        { name: 'Steel · 12 tonnes', meta: '2 quotes · ₹8,40,000', tag: 'Waiting', tone: 'wait' },
        { name: 'Overtime, Block B', meta: 'Site · ₹14,400', tag: 'Waiting', tone: 'wait' },
        { name: 'Extra toilet', meta: 'Metro Clinic · ₹62,000', tag: 'Waiting', tone: 'wait' },
      ],
    },
    figures: [
      { title: 'Cost to date', value: '₹1.84 Cr', line: 'Of a ₹2.6 Cr budget' },
      { title: 'Labour on site', value: '46', line: 'Across 3 sites' },
      { title: 'Inspection', value: 'Passed', line: 'Slab 2 · 12 Sep' },
    ],
    crumb: { icon: 'layers', trail: ['app.constructioncompany.in', 'Greenfield School'] },
    title: 'Block B · slab 3',
    preview: {
      label: 'Site diary',
      icon: 'clipboard',
      meta: 'Greenfield School · today',
      heading: 'Slab 3 at 72%, due 18 Oct',
      body: 'Cement for the pour approved from 2 quotes; the owner sees every site on one screen.',
    },
    ticks: ['Your screens', 'Roles', 'Approvals', 'Full history'],
    checks: {
      label: 'Behind it',
      items: [
        { title: 'Alerts', meta: 'When something is due, late or waiting' },
        { title: 'Dashboards', meta: 'For the owner, the team and accounts' },
        { title: 'Exports', meta: 'Excel and PDF for your accountant' },
        { title: 'Any device', meta: 'In the browser, nothing to install' },
        { title: 'Connected', meta: 'To accounting, WhatsApp and payments' },
        { title: 'Yours to keep', meta: 'The code written for you, once paid' },
      ],
    },
  },

  'business-platforms': {
    brand: 'recruitment',
    list: {
      title: 'Newest workspaces',
      icon: 'layers',
      rows: [
        {
          name: 'Northstar',
          meta: 'Trial · 14 recruiters',
          tag: 'Day 11',
          tone: 'accent',
          strong: true,
        },
        { name: 'Bluebridge', meta: 'Growth plan', tag: 'Paying' },
        { name: 'Peak Hire', meta: 'Starter plan', tag: 'Paying' },
        { name: 'Northstar Pune', meta: 'Branch', tag: 'Trial', tone: 'plain' },
      ],
    },
    figures: [
      { title: 'Monthly revenue', value: '₹4.62 L', line: 'Up 9%' },
      { title: 'Paying agencies', value: '159', line: 'Up 11' },
      { title: 'Placed', value: '312', line: 'This month' },
    ],
    crumb: { icon: 'layers', trail: ['admin.recruitmentagencynetwork.in', 'Northstar'] },
    title: 'Northstar Talent',
    preview: {
      label: 'Workspace',
      icon: 'globe',
      meta: 'northstar.recruitmentagencynetwork.in',
      heading: 'Northstar Talent · Bangalore',
      body: 'Hiring for tech, retail and healthcare: 14 recruiters on a trial, their data kept apart from every other agency’s.',
    },
    ticks: ['Sign-up', 'Workspaces', 'Roles', 'Subscriptions'],
    checks: {
      label: 'Running it',
      items: [
        { title: 'Invoices', meta: 'With every charge' },
        { title: 'Your admin', meta: 'Every workspace, plan and invoice' },
        { title: 'Reports', meta: 'For your customers, and usage for you' },
        { title: 'Notifications', meta: 'Email and WhatsApp' },
        { title: 'APIs', meta: 'Connects to what your customers use' },
        { title: 'Monitored', meta: 'Uptime and errors watched on Evolve' },
      ],
    },
  },

  'booking-payment-workflows': {
    brand: 'salon',
    list: {
      title: 'Services and prices',
      icon: 'calendar',
      rows: [
        { name: 'Haircut · 45 min', meta: '₹700 · weekend ₹800', tag: 'Live' },
        {
          name: 'Hair colour · 90 min',
          meta: '₹2,300 · weekend ₹2,500',
          tag: 'Live',
          strong: true,
        },
        { name: 'Facial · 60 min', meta: '₹1,600 · weekend ₹1,800', tag: 'Live' },
        { name: 'Deposit', meta: '20% at booking', tag: 'On' },
        { name: 'Free cancellation', meta: 'Until 24 h before', tag: 'On' },
      ],
    },
    figures: [
      { title: 'Booked today', value: '38', line: 'Of 44 slots' },
      { title: 'Deposits held', value: '₹14,500', line: 'This week' },
      { title: 'Booked online', value: '71%', line: 'Up 18 points' },
    ],
    crumb: { icon: 'calendar', trail: ['salonbeautystudio.in/admin', 'Riya Mehta'] },
    title: 'Hair colour · Sat 6 pm',
    preview: {
      label: 'Booked',
      icon: 'calendar',
      meta: 'salonbeautystudio.in · Sat 20 Sep',
      heading: 'Riya Mehta, hair colour with Ananya at 6:00 pm',
      body: 'A ₹500 deposit paid by UPI; free to change until Fri, 6 pm.',
    },
    ticks: ['Live availability', 'Rates and rules', 'Deposit', 'Receipt'],
    checks: {
      label: 'After it’s booked',
      items: [
        { title: 'WhatsApp confirmations', meta: 'From approved templates' },
        { title: 'Changes and cancellations', meta: 'Within your rules' },
        { title: 'Team alerts', meta: 'To Ananya, when it’s booked or changed' },
        { title: 'Walk-ins and phone bookings', meta: 'On the same calendar' },
        { title: 'Client history', meta: 'Every visit and payment on the record' },
        { title: 'Calendar', meta: 'Held in the salon’s calendar' },
      ],
    },
  },

  'api-integrations': {
    brand: 'travelagency',
    list: {
      title: 'Sync log',
      icon: 'refresh',
      rows: [
        { name: 'Booking → invoice', meta: 'TR-2291 · 1.4 s', tag: 'Done', strong: true },
        { name: 'Settlement', meta: '9:52 am · 19 records', tag: 'Matched' },
        { name: 'Invoices → Tally', meta: '2:00 am · 48 records', tag: 'Done' },
        { name: 'Supplier timeout', meta: 'TR-2286 · after 2 min', tag: 'Retried', tone: 'wait' },
        { name: 'Bookings sheet', meta: 'Every 5 min', tag: 'Up to date' },
      ],
    },
    figures: [
      { title: 'Settled today', value: '₹2,84,600', line: '19 bookings' },
      { title: 'Matched', value: '18 of 19', line: 'In reconciliation' },
      { title: 'Fares checked', value: 'Live', line: 'Flight supplier API' },
    ],
    crumb: { icon: 'plug', trail: ['api.onlinetravelagency.in', 'Booking TR-2291'] },
    title: 'Booking TR-2291',
    preview: {
      label: 'Synced',
      icon: 'refresh',
      meta: 'TR-2291 · 10:14 am',
      heading: 'Invoice, voucher and sheet row, in 1.4 seconds',
      body: 'GST by the state, the customer matched by phone and email, and nothing copied by hand.',
    },
    ticks: ['Official APIs', 'Field mapping', 'GST handled', 'No duplicates'],
    checks: {
      label: 'Watching it',
      items: [
        { title: 'Retries', meta: 'Tried again after a pause, on their own' },
        { title: 'Alerts', meta: 'A person told when it needs a decision' },
        { title: 'A full log', meta: 'Every run and request, kept' },
        { title: 'Keys kept safe', meta: 'Encrypted, never in a spreadsheet' },
        { title: 'Exports', meta: 'Reconciled data for your accountant' },
        { title: 'Refunds → credit notes', meta: 'Linked to the invoice' },
      ],
    },
  },

  'ai-assistants': {
    brand: 'lawfirm',
    list: {
      title: 'How it answers',
      icon: 'chat',
      rows: [
        { name: 'Fees and the process', meta: 'From your documents', tag: 'Answers', strong: true },
        { name: 'Consultations', meta: 'Into the calendar', tag: 'Books' },
        { name: 'Advice on a case', meta: 'To a lawyer', tag: 'A person', tone: 'wait' },
        { name: 'Court dates', meta: 'To Adv. Menon', tag: 'A person', tone: 'wait' },
        { name: 'Languages', meta: 'English, Hindi, Kannada', tag: 'On' },
      ],
    },
    figures: [
      { title: 'Conversations', value: '1,284', line: 'Since it went live' },
      { title: 'Answered alone', value: '78%', line: 'Each with its source' },
      { title: 'Consultations', value: '96', line: 'Booked by it' },
    ],
    crumb: { icon: 'chat', trail: ['assistant.lawfirm.in', 'Anjali Rao'] },
    title: 'Anjali Rao',
    preview: {
      label: 'Answered',
      icon: 'chat',
      meta: 'On the website · 10:52 pm · from 2 documents',
      heading: 'Asked about fees and the process',
      body: 'A property dispute in Whitefield: the consultation fee is ₹2,000, booked for Saturday, 10 am.',
    },
    ticks: ['Your documents', 'Sources shown', 'Says it’s an assistant', 'Guardrails'],
    checks: {
      label: 'What happened next',
      items: [
        { title: 'Booking', meta: 'A consultation on Saturday, 10 am' },
        { title: 'Leads saved', meta: 'With the chat, at 10:54 pm' },
        { title: 'Hand-over', meta: 'To a person with the whole conversation' },
        { title: 'Website and WhatsApp', meta: 'The same answers in both' },
        { title: 'Languages', meta: 'Replies in the languages people use' },
        { title: 'Weekly insights', meta: 'What people ask, and when' },
      ],
    },
  },

  'ai-workflows': {
    brand: 'accounting',
    list: {
      title: 'Arora Traders · inbox',
      icon: 'mail',
      rows: [
        {
          name: 'Shree Balaji Traders',
          meta: 'Quantity differs',
          tag: 'A look',
          tone: 'wait',
          strong: true,
        },
        { name: 'Kaveri Steel', meta: 'PO-7764 · ₹1,18,420', tag: 'Match' },
        { name: 'Precision Tools & Co', meta: 'PO-7770 · ₹22,180', tag: 'Match' },
        { name: 'Tally', meta: '9 posted today', tag: 'Posted', tone: 'plain' },
      ],
    },
    figures: [
      { title: 'Read today', value: '14', line: 'As they arrive' },
      { title: 'Matched', value: '11', line: 'On arrival' },
      { title: 'Need a look', value: '2', line: 'Each with a suggestion' },
    ],
    crumb: { icon: 'scan', trail: ['docs.accountingtaxfirm.in', 'NST/0418'] },
    title: 'Invoice NST/0418',
    preview: {
      label: 'Read',
      icon: 'scan',
      meta: 'Shree Balaji Traders · read in 2 s',
      heading: 'Bright bar 12 mm · 180, ₹47,636 incl. GST',
      body: 'The PO says 200, so it’s flagged with a suggestion for Shalini Iyer to approve before anything is posted.',
    },
    ticks: ['Document reading', 'From your inbox', 'Checks you set', 'Exceptions flagged'],
    checks: {
      label: 'Before it’s posted',
      items: [
        { title: 'Approval steps', meta: 'By amount or supplier' },
        { title: 'Into your books', meta: 'Posted to Tally after approval' },
        { title: 'A full record', meta: 'The original, what was read, who approved' },
        { title: 'Weekly summary', meta: 'Volumes, matches and exceptions' },
        { title: 'Data agreed upfront', meta: 'The AI provider and data handling' },
        { title: 'Confidence', meta: '99% on the supplier and number' },
      ],
    },
  },
};

/** Each service page's dashboard beside what's included, by its slug. */
export const SERVICE_DASHBOARDS: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(SPECS).map(([slug, spec]) => {
    const accent = productFor(slug)?.accent ?? '#0b0d12';
    const Dashboard = () => <FeatureDashboard spec={spec} accent={accent} />;
    Dashboard.displayName = `Dashboard(${slug})`;
    return [slug, Dashboard];
  }),
);
