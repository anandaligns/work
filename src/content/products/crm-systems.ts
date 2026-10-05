import { SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import { phone } from './kit';
import type { ProductPage } from './types';

/**
 * CRM Systems, presented as a product: the page's words. Its pictures are its own mockups
 * (`components/lab/mocks-crm-systems.tsx`), from its sample business, a Real Estate Agency; the one
 * screen kept here is a new lead on a salesperson's phone, which `/services` borrows for the front
 * of its group's picture. The agency and its sample data are invented, never a client.
 */

/** The new lead on the salesperson's phone, a minute after it arrived. */
const LEAD = phone({
  back: true,
  title: 'Rohit Verma',
  sub: '3 BHK · Lakeside Residency',
  action: 'phone',
  grey: true,
  blocks: [
    { t: 'note', text: 'New lead assigned to you · 9:42 pm', icon: 'bell' },
    { t: 'buttons', items: ['Call', 'WhatsApp'] },
    {
      t: 'list',
      items: [
        { title: 'Source', meta: 'Website form · Google search ad', icon: 'globe' },
        { title: 'Budget', meta: '₹1.3–1.5 Cr · home loan', icon: 'rupee' },
        { title: 'Looking to move', meta: 'Within 6 months', icon: 'calendar' },
      ],
    },
    {
      t: 'steps',
      title: 'Next steps',
      items: [
        { title: 'Call back', meta: 'Today, before 10 am', state: 'now' },
        { title: 'Send brochure and floor plan', state: 'next' },
        { title: 'Book a site visit', state: 'next' },
      ],
    },
  ],
  cta: 'Log a call',
});

const page: ProductPage = {
  accent: '#6366f1',
  accentDark: '#4338ca',
  sub: 'Every enquiry from your website, ads, WhatsApp and calls becomes one customer record, routed to the right person and followed up until it’s closed.',

  stage: { front: [LEAD] },

  highlights: {
    heading: 'CRM systems at a glance',
    items: [
      { value: '1 record', label: 'Per customer, from every source, duplicates merged.' },
      { value: 'Instantly', label: 'Routed to the right person, with an alert.' },
      { value: 'Every lead', label: 'Tagged with its source, so you know what works.' },
      { value: '₹65,000', label: 'From, for a CRM build or integration, after a Blueprint.' },
    ],
  },

  view: {
    statement: 'Leads don’t go cold on their own. They go cold in someone’s inbox.',
    body: [
      '**A CRM** keeps one record for every customer, with every enquiry, call, message and next step on it. When enquiries arrive from an ad, a listing site, a WhatsApp forward or a call and each lives in a different place, follow-ups depend on memory and the same buyer gets called twice or not at all.',
      '**A CRM-connected system brings every source into one record**, routes each lead to whoever handles it the moment it arrives, and reminds them of every next step until it’s closed either way. We connect the CRM you use — most with an API — or build a simple one around how you sell.',
      'It works hand in hand with [WhatsApp automation](/services/whatsapp-automation) and, for businesses that want the whole system at once, the [Connected Website](/solutions/lead-automation).',
    ],
    photo: {
      file: 'crm-real-estate-show-flat',
      alt: 'A property adviser showing a floor plan to a couple in a show flat.',
    },
  },

  features: {
    heading: 'What a connected CRM does',
    intro: 'Five things that stop leads going cold.',
    items: [
      {
        label: 'One record',
        title: 'Every lead, one record.',
        body: '**Enquiries from every source land in one place**, and a returning buyer is recognised, not duplicated — with the source kept on every lead.',
        points: [
          'Website, ads, WhatsApp and calls in one record',
          'Duplicates merged by phone and email',
          'The source kept on every lead',
        ],
        caption: 'One buyer, one record: every form, ad, message and call',
      },
      {
        label: 'Routing',
        title: 'The right person, straight away.',
        body: '**Rules send each lead to whoever handles it**, and they’re alerted at once on WhatsApp or email. Reassigning takes a tap.',
        points: [
          'Routing by project, budget or area',
          'Instant alerts to the owner',
          'Reassignment in a tap',
        ],
        stats: [
          { value: 'Instantly', label: 'Assigned and alerted' },
          { value: 'Your rules', label: 'By project, budget or area' },
        ],
        caption: 'The rules that send each lead to the right person',
      },
      {
        label: 'Pipeline',
        title: 'Follow-ups that happen.',
        body: '**Every lead has a stage and a next step**, with reminders until it’s closed either way — and a pipeline that shows where every buyer stands.',
        points: [
          'Stages that match how you sell',
          'Reminders for every next step',
          'Reports on where buyers come from',
        ],
        caption: 'Today’s follow-ups on a salesperson’s phone',
      },
      {
        label: 'WhatsApp on the record',
        title: 'Conversations where the lead is.',
        body: '**Messages on the WhatsApp Business Platform are logged against the customer’s record**, so whoever picks up the lead sees everything that was said.',
        points: [
          'WhatsApp messages on the record',
          'Templates for brochures and reminders',
          'Call notes in a tap',
        ],
        caption: 'A WhatsApp conversation on the buyer’s record',
      },
      {
        label: 'Reports',
        title: 'Know which ads bring buyers.',
        body: '**Every lead keeps its source from the first click to the booking**, so you see where buyers come from and where they drop off — and ad budgets follow what actually sells.',
        points: [
          'A funnel from enquiry to booking',
          'Leads, visits and bookings by source',
          'Bookings reported back to your ad accounts',
        ],
        caption: 'Where buyers come from, and where they drop off',
      },
    ],
  },

  included: {
    heading: 'CRM features',
    intro: 'What a CRM-connected system can include, in your CRM or one we build.',
    items: [
      {
        icon: 'plug',
        title: 'Every source connected',
        body: 'Website, ad lead forms, listing sites, WhatsApp and calls.',
      },
      {
        icon: 'person',
        title: 'One record per customer',
        body: 'Matched by phone and email, duplicates merged.',
      },
      { icon: 'userShare', title: 'Routing rules', body: 'By project, budget, area or language.' },
      {
        icon: 'bell',
        title: 'Instant alerts',
        body: 'On WhatsApp or email when a lead is assigned.',
      },
      {
        icon: 'tasks',
        title: 'Stages and next steps',
        body: 'A pipeline that matches how you sell.',
      },
      {
        icon: 'repeat',
        title: 'Follow-up reminders',
        body: 'Until every lead is closed either way.',
      },
      {
        icon: 'whatsapp',
        title: 'WhatsApp on the record',
        body: 'Messages logged against the customer.',
      },
      {
        icon: 'phone',
        title: 'Call notes',
        body: 'Added in a tap; automatic logging where your phone system allows.',
      },
      { icon: 'chart', title: 'Source reports', body: 'Which sources turn into visits and sales.' },
      {
        icon: 'target',
        title: 'Conversion tracking',
        body: 'Leads and sales reported back to your ads.',
      },
      {
        icon: 'upload',
        title: 'Old leads brought in',
        body: 'From a spreadsheet or your current tool.',
      },
      {
        icon: 'people',
        title: 'Team roles',
        body: 'Who sees which leads, and who manages the team.',
      },
    ],
  },

  compare: {
    heading: 'CRM systems compared',
    intro: 'What changes when every lead has one record and a next step.',
    us: 'A CRM connected to your website, ads and WhatsApp.',
    options: [
      {
        label: 'Inboxes and sheets',
        note: 'Leads spread across email, WhatsApp and a spreadsheet.',
        rows: [
          {
            topic: 'Where leads land',
            without: 'Leads in five inboxes',
            with: 'One record per customer',
          },
          {
            topic: 'Duplicates',
            without: 'The same buyer called twice',
            with: 'Duplicates merged',
          },
          {
            topic: 'Follow-ups',
            without: 'Follow-ups forgotten',
            with: 'Reminders until each lead is closed',
          },
          {
            topic: 'What works',
            without: 'No idea which ad works',
            with: 'Every lead tagged with its source',
          },
        ],
      },
      {
        label: 'A CRM on its own',
        note: 'A CRM that isn’t connected to anything.',
        rows: [
          {
            topic: 'Getting leads in',
            without: 'Leads typed in by hand',
            with: 'Every source flowing in on its own',
          },
          {
            topic: 'Assigning',
            without: 'Assigned when someone remembers',
            with: 'Routed and alerted the moment they arrive',
          },
          {
            topic: 'WhatsApp',
            without: 'WhatsApp chats outside it',
            with: 'WhatsApp messages on the record',
          },
          {
            topic: 'Ads',
            without: 'Ads that never hear what converted',
            with: 'Conversions tracked back to the source',
          },
        ],
      },
      {
        label: 'A diary and calls',
        note: 'A diary, and the phone.',
        rows: [
          {
            topic: 'Next steps',
            without: 'Next steps in a notebook',
            with: 'Every next step with a reminder',
          },
          {
            topic: 'Handovers',
            without: 'Handovers lose the history',
            with: 'The whole history on one record',
          },
          {
            topic: 'Updates',
            without: 'The owner asks for updates',
            with: 'The pipeline shows where every lead stands',
          },
          {
            topic: 'When someone leaves',
            without: 'Leads leave with the salesperson',
            with: 'Leads stay with the business',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How a CRM-connected system is built',
    blocks: [
      {
        icon: 'target',
        title: 'Capture',
        body: 'Website forms, ad lead forms, WhatsApp, call notes, and listing sites by email or [API](/services/api-integrations).',
      },
      {
        icon: 'userCheck',
        title: 'One record',
        body: 'Matched by phone and email, with every touch on its timeline.',
      },
      {
        icon: 'repeat',
        title: 'Routing and reminders',
        body: 'Rules you set, alerts on WhatsApp or email.',
      },
      {
        icon: 'database',
        title: 'Your CRM or ours',
        body: 'We connect the one you use, or build a simple one around how you sell.',
      },
      {
        icon: 'phone',
        title: 'Calls',
        body: 'A call note in a tap; automatic logging depends on your phone system, checked in the Blueprint.',
      },
      {
        icon: 'eye',
        title: 'Watched',
        body: 'Connections monitored, and rules tuned each month on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with your CRM and lead sources',
    intro: 'Most CRMs with an API. We confirm yours in the System Blueprint.',
    groups: [
      { name: 'CRMs', items: ['Zoho CRM', 'HubSpot'] },
      {
        name: 'Lead sources',
        items: ['Google Ads lead forms', 'Meta lead ads', 'Your website forms'],
      },
      { name: 'Messaging', items: ['WhatsApp'] },
      { name: 'Data', items: ['Google Sheets'] },
    ],
  },

  industries: {
    heading: 'Who a connected CRM is for',
    items: [
      {
        sector: 'Real Estate',
        text: 'Every enquiry from ads, portals and WhatsApp on one record, followed to a site visit.',
      },
      { sector: 'Education', text: 'Admission enquiries followed up until a seat is booked.' },
      { sector: 'Clinics', text: 'Patient enquiries routed to the right branch and followed up.' },
      {
        sector: 'Professional Services',
        text: 'Prospects, proposals and follow-ups tracked to a yes or no.',
      },
      { sector: 'Retail', text: 'Bulk and corporate enquiries routed to sales and followed up.' },
      { sector: 'Startups', text: 'Leads, demos and trials in one pipeline from day one.' },
    ],
  },

  build: {
    heading: 'How we connect your CRM',
    steps: [
      { title: 'System Blueprint', body: 'Your lead sources, your stages, and who handles what.' },
      { title: 'Connect the sources', body: 'Each one tested with real enquiries.' },
      { title: 'Records, routing and reminders', body: 'Set up in your CRM, or in one we build.' },
      { title: 'Bring across old leads', body: 'Where they’re in a usable shape.' },
      { title: 'Launch and Evolve', body: 'Reports and rules tuned each month.' },
    ],
  },

  price: {
    heading: 'CRM pricing',
    intro: 'Add routing and follow-ups to what you have, or have a CRM built or connected in full.',
    rows: [
      'Lead routing',
      'Follow-up reminders',
      'WhatsApp message templates',
      'CRM sync',
      'Conversion tracking',
      'A simple CRM built around how you sell',
      'Old leads brought across',
      'System Blueprint first',
      'Payment',
      'Evolve care',
    ],
    packages: [
      {
        name: 'Lead Follow-up Automation',
        summary: 'Routing and follow-ups added to the website and CRM you already have.',
        price: 'Quoted',
        unit: 'In writing, before we start',
        values: [
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          false,
          'Set in the quote',
          'Optional, from ₹899 a month',
        ],
        cta: 'Ask for a quote',
        interest: 'lead-follow-up',
      },
      {
        name: 'Custom',
        summary: 'A CRM built or integrated in full, around how you sell.',
        price: 'From ₹65,000',
        unit: 'Fixed quote per phase',
        timeline: 'Timeline set in the quote',
        values: [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          '₹10,000, credited in full',
          'In stages, set by the project value',
          'Optional, from ₹899 a month',
        ],
        cta: 'Ask for a quote',
        interest: 'crm-systems',
        focal: true,
      },
    ],
    note: 'Custom builds come with a 45-day warranty.',
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'CRM questions',
    items: [
      {
        question: 'How much does a CRM system cost?',
        answer:
          'Lead routing and follow-ups for the tools you have come as Lead Follow-up Automation, quoted in writing. A CRM build or integration is Custom, from ₹65,000, after a ₹10,000 System Blueprint that’s credited in full if you go ahead.',
      },
      {
        question: 'Do we need a new CRM?',
        answer:
          'Not always. We can connect the one you use, or build a simple one around how you sell.',
      },
      {
        question: 'Which CRMs can you connect?',
        answer: 'Most CRMs with an API. We confirm yours in the System Blueprint.',
      },
      {
        question: 'Can WhatsApp chats go into the CRM?',
        answer:
          'Yes. Messages on the WhatsApp Business Platform can be logged against the customer’s record.',
      },
      {
        question: 'Can leads from Google and Meta ads come in on their own?',
        answer:
          'Yes. Lead forms from Google Ads and Meta ads can flow straight into the CRM, with the source kept on each lead.',
      },
      {
        question: 'Can we bring our old leads across?',
        answer:
          'Yes, where they’re in a usable shape, such as a spreadsheet or an export from your current tool.',
      },
      {
        question: 'Are calls logged automatically?',
        answer:
          'Your team adds a call note in a tap. Automatic call logging depends on your phone system, and we check it in the Blueprint.',
      },
      {
        question: 'Can we see which source brings buyers?',
        answer:
          'Yes. Every lead keeps its source, and reports show which sources turn into site visits and sales.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Zoho, HubSpot, Google Ads, Meta and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
