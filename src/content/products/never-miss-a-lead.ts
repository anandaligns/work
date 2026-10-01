import { type Desk, duo, mac, phone, safari } from './kit';
import { SAMPLE_NOTE } from './shared';
import type { ProductPage } from './types';

/**
 * The Connected Website, presented as a product: a home-cleaning and pest-control company whose
 * enquiries — from the website, Google, Instagram and WhatsApp — are answered at once, booked in
 * the reply and tracked until they're closed. The company and its sample data are invented.
 */

const NAV: Desk['nav'] = [
  { label: 'Enquiries', icon: 'target', count: '12' },
  { label: 'Follow-ups', icon: 'clock', count: '7' },
  { label: 'Inspections', icon: 'calendar' },
  { label: 'Sources', icon: 'chart' },
  { label: 'Replies', icon: 'chat' },
  { label: 'Settings', icon: 'wrench' },
];

const desk = (over: Omit<Desk, 'kind' | 'nav'>): Desk => ({
  kind: 'desk',
  nav: NAV,
  user: { name: 'Sunil Varghese', role: 'Owner' },
  ...over,
});

/** Every enquiry, from every source, and how fast each was answered. */
const ENQUIRIES = desk({
  active: 0,
  title: 'Every enquiry',
  tabs: ['New · 5', 'Replied', 'Booked', 'Closed'],
  actions: ['Export', 'Add enquiry'],
  blocks: [
    {
      type: 'kpis',
      items: [
        { label: 'Enquiries this week', value: '64', delta: '11' },
        { label: 'Replied in under a minute', value: '64 of 64' },
        { label: 'Inspections booked', value: '23', delta: '6' },
        { label: 'Waiting on a person', value: '2' },
      ],
    },
    {
      type: 'table',
      columns: ['Name', 'Asked for', 'First reply'],
      rows: [
        {
          cells: ['Priya Menon', 'Deep cleaning · 3 BHK', '9:02 pm · 8 s'],
          logo: 'Website forms',
          pill: { text: 'New', tone: 'accent' },
          fresh: true,
        },
        {
          cells: ['Rahul Bose', 'Termite treatment', '8:41 pm · 5 s'],
          logo: 'Google Ads',
          pill: { text: 'Booked', tone: 'green' },
        },
        {
          cells: ['Sana Khan', 'Sofa cleaning', '7:15 pm · 6 s'],
          logo: 'Instagram',
          pill: { text: 'Replied', tone: 'grey' },
        },
        {
          cells: ['Arun Pillai', 'Cockroach control', '6:58 pm · 4 s'],
          logo: 'WhatsApp',
          pill: { text: 'Booked', tone: 'green' },
        },
        {
          cells: ['Neha Gupta', 'Move-in cleaning', '5:30 pm · 7 s'],
          logo: 'Google Maps',
          pill: { text: 'Needs a person', tone: 'amber' },
        },
      ],
    },
  ],
});

/** The quote form on the website, on a phone. */
const QUOTE = safari('yourbusiness.in/quote', {
  title: 'Get a free quote',
  sub: 'Reply in seconds, on WhatsApp and email',
  blocks: [
    {
      t: 'chips',
      label: 'Service',
      items: ['Deep cleaning', 'Pest control', 'Sofa cleaning', 'Kitchen'],
      active: 0,
    },
    { t: 'chips', label: 'Home', items: ['1 BHK', '2 BHK', '3 BHK', 'Villa'], active: 2 },
    {
      t: 'fields',
      items: [
        { label: 'Name', value: 'Priya Menon' },
        { label: 'WhatsApp number', value: '+91 98860 44 102', focus: true },
        { label: 'Area', value: 'HSR Layout' },
      ],
    },
  ],
  cta: 'Get my quote',
});

/** The team's alert: who, what, and that the reply already went. */
const ALERT = phone({
  title: 'New enquiry',
  sub: 'Website · 9:02 pm',
  action: 'bell',
  grey: true,
  blocks: [
    {
      t: 'hero',
      eyebrow: 'Deep cleaning · 3 BHK',
      value: 'Priya Menon',
      label: 'HSR Layout · +91 98860 •• 102',
      line: 'Quote sent on WhatsApp and email at 9:02 pm',
    },
    { t: 'buttons', items: ['Call', 'WhatsApp'] },
    {
      t: 'list',
      items: [
        { title: 'Asked for', meta: 'Inspection this weekend', icon: 'calendar' },
        { title: 'Came from', meta: 'Google search · “deep cleaning hsr”', logo: 'Google' },
        { title: 'Assigned to', meta: 'Anita · HSR team', icon: 'userCheck' },
      ],
    },
  ],
});

/** The instant reply: the quote and the next step, in the same message. */
const REPLY = phone({
  chrome: 'mail',
  blocks: [
    {
      t: 'mail',
      from: 'Your Business',
      subject: 'Your deep-cleaning quote, Priya',
      time: '9:02 pm',
      lines: [
        'Thanks for asking. Here is your quote for a 3 BHK in HSR Layout.',
        'Book an inspection slot below, or call us any time.',
      ],
      fields: [
        ['Service', 'Deep cleaning'],
        ['Home', '3 BHK · about 1,450 sq ft'],
        ['Price', '₹6,499 incl. GST'],
        ['Takes', '5–6 hours, a team of 3'],
      ],
    },
    { t: 'buttons', items: ['Book a slot', 'Call us'] },
  ],
});

/** Booked from the reply: an inspection slot, chosen in a tap. */
const BOOKED = phone({
  back: true,
  title: 'Book an inspection',
  sub: 'Deep cleaning · 3 BHK',
  grey: true,
  blocks: [
    {
      t: 'list',
      title: 'This weekend',
      items: [
        {
          title: 'Saturday, 10:30 am',
          meta: 'Anita · HSR team',
          icon: 'calendar',
          pill: { text: 'Chosen', tone: 'accent' },
        },
        {
          title: 'Saturday, 4:00 pm',
          meta: 'Anita · HSR team',
          icon: 'calendar',
          pill: { text: 'Free', tone: 'green' },
        },
        {
          title: 'Sunday, 11:00 am',
          meta: 'Ravi · HSR team',
          icon: 'calendar',
          pill: { text: 'Free', tone: 'green' },
        },
      ],
    },
    {
      t: 'note',
      text: 'A reminder with the team’s name and number comes the evening before.',
      icon: 'bell',
    },
  ],
  cta: 'Book Saturday, 10:30 am',
});

/** Follow-ups: every open enquiry, its next step and who owns it. */
const FOLLOW_UPS = desk({
  active: 1,
  title: 'Follow-ups',
  tabs: ['Due today · 7', 'This week'],
  blocks: [
    {
      type: 'table',
      columns: ['Enquiry', 'Next step', 'Owner', 'Due'],
      rows: [
        {
          cells: ['Sana Khan · sofa', 'Second reminder, then a call', 'Ravi', 'Today, 11 am'],
          avatar: true,
          pill: { text: 'Due', tone: 'amber' },
        },
        {
          cells: ['Neha Gupta · move-in', 'Call: asked about a Sunday', 'Anita', 'Today'],
          avatar: true,
          pill: { text: 'Person', tone: 'accent' },
        },
        {
          cells: ['Karthik R · termites', 'Send inspection report', 'Imran', 'Today'],
          avatar: true,
          pill: { text: 'Due', tone: 'amber' },
        },
        {
          cells: ['Meera S · kitchen', 'Quote viewed, no reply', 'Auto', 'Tomorrow'],
          avatar: true,
          pill: { text: 'Automatic', tone: 'grey' },
        },
        {
          cells: ['Vikram J · villa', 'Closed: chose another date', 'Anita', 'Done'],
          avatar: true,
          pill: { text: 'Closed', tone: 'green' },
          muted: true,
        },
      ],
    },
  ],
});

/** Where enquiries come from, and which of them book. */
const SOURCES = desk({
  active: 3,
  title: 'Sources',
  tabs: ['This month', 'Last month'],
  actions: ['Share'],
  blocks: [
    {
      type: 'table',
      span: 7,
      title: 'Enquiries and bookings, by source',
      columns: ['Source', 'Enquiries', 'Booked'],
      barLabel: 'Books',
      rows: [
        { cells: ['Google search', '112', '41'], logo: 'Google', bar: 37 },
        { cells: ['Google Ads', '76', '22'], logo: 'Google Ads', bar: 29 },
        { cells: ['Instagram', '58', '11'], logo: 'Instagram', bar: 19 },
        { cells: ['WhatsApp', '44', '19'], logo: 'WhatsApp', bar: 43 },
        { cells: ['Google Maps', '31', '12'], logo: 'Google Maps', bar: 39 },
      ],
    },
    {
      type: 'donut',
      span: 5,
      title: 'Where they came from',
      parts: [
        { label: 'Google search', value: 112 },
        { label: 'Google Ads', value: 76 },
        { label: 'Instagram', value: 58 },
        { label: 'WhatsApp', value: 44 },
        { label: 'Google Maps', value: 31 },
      ],
      centre: { value: '321', label: 'enquiries' },
    },
  ],
});

/** The replies and rules behind it: what goes out, when, and to whom. */
const SETTINGS = desk({
  active: 5,
  title: 'Replies and routing',
  actions: ['Save'],
  blocks: [
    {
      type: 'list',
      span: 6,
      title: 'Instant replies',
      items: [
        {
          title: 'Quote, with a booking link',
          meta: 'Website and ad forms',
          icon: 'mail',
          pill: { text: 'On', tone: 'green' },
        },
        {
          title: 'Prices and next free slots',
          meta: 'WhatsApp messages',
          icon: 'whatsapp',
          pill: { text: 'On', tone: 'green' },
        },
        {
          title: 'After-hours note',
          meta: '9 pm to 8 am',
          icon: 'clock',
          pill: { text: 'On', tone: 'green' },
        },
      ],
    },
    {
      type: 'list',
      span: 6,
      title: 'Who gets told',
      items: [
        { title: 'HSR and Koramangala', meta: 'Anita · WhatsApp alert', icon: 'pin' },
        { title: 'Whitefield', meta: 'Ravi · WhatsApp alert', icon: 'pin' },
        { title: 'Termite and villa jobs', meta: 'Imran · call first', icon: 'userCheck' },
      ],
    },
  ],
});

const page: ProductPage = {
  accent: '#166534',
  sub: 'The Connected Website catches every enquiry from your site, ads and WhatsApp, replies instantly, books the next step and keeps every lead in view until it’s closed.',

  stage: {
    tagline: 'Leads rarely say no. They just stop waiting.',
    toast: { title: 'New enquiry answered in 8 seconds', line: 'Deep cleaning · 3 BHK' },
    back: ENQUIRIES,
    front: [QUOTE, ALERT],
    photo: { file: 'never-miss-a-lead-stage', alt: '' },
  },

  highlights: {
    heading: 'The Connected Website at a glance',
    items: [
      { value: 'At once', label: 'A reply to every enquiry, from the website, ads and WhatsApp.' },
      { value: 'One list', label: 'Every lead, its source, its status and who’s on it.' },
      { value: '₹45,000', label: 'From, designed for your brand, with three months of Evolve.' },
      { value: '4–6 weeks', label: 'From the first call to live.' },
    ],
  },

  view: {
    statement: 'Leads rarely say no. They just stop waiting.',
    body: [
      '**An enquiry at 9 pm, a message during a job, a DM on Sunday.** Each is someone ready to book, and each cools while it waits. The Connected Website answers them all at once, with the next step in the reply.',
      '**Nothing slips off the list.** Every enquiry, from every source, lands in one place with where it came from, what happened and who’s on it — and follow-ups run until it’s booked or closed.',
      'It brings together a [business website](/services/business-websites), [WhatsApp automation](/services/whatsapp-automation), [booking](/services/booking-payment-workflows) and a [lead dashboard](/services/dashboards), built as one.',
    ],
    photo: {
      file: 'connected-website-home-services-van',
      alt: 'A home-services team loading equipment into a van outside an apartment block in the morning.',
    },
  },

  features: {
    heading: 'What the Connected Website does',
    intro: 'Five things that keep an enquiry from cooling while it waits.',
    items: [
      {
        label: 'Answered at once',
        title: 'Every enquiry answered, the moment it arrives.',
        body: '**From the website, ads and WhatsApp, a reply goes out at once** — with the price or the next free slots — on WhatsApp and email, at any hour.',
        points: [
          'Enquiries from every source in one place',
          'Instant WhatsApp and email replies',
          'Different replies for each service',
        ],
        caption: 'The instant reply: the quote and the next step',
        screen: REPLY,
      },
      {
        label: 'Booked in the reply',
        title: 'Booked, not just answered.',
        body: '**The reply carries the next step**: a slot or a callback, chosen in a tap — with a reminder the evening before.',
        points: ['Online booking or callbacks', 'Confirmations and reminders', 'Changes by reply'],
        caption: 'An inspection booked from the reply',
        screen: BOOKED,
      },
      {
        label: 'Nothing slips',
        title: 'Every lead in view until it’s closed.',
        body: '**Every open enquiry has a next step, an owner and a date**, and automatic follow-ups run until it’s booked or closed either way.',
        points: [
          'A next step on every lead',
          'Automatic follow-ups',
          'Closed leads kept, with the reason',
        ],
        caption: 'Today’s follow-ups, with who owns each',
        screen: FOLLOW_UPS,
      },
      {
        label: 'Team alerts',
        title: 'The right person, told straight away.',
        body: '**Anything that needs a person goes to the right one** by area or service, on their phone, with the reply that already went out.',
        points: [
          'Alerts by area or service',
          'Call or WhatsApp in one tap',
          'The whole enquiry in the alert',
        ],
        caption: 'A new enquiry on the team’s phone',
        screen: ALERT,
      },
      {
        label: 'Sources',
        title: 'Know which searches and ads bring work.',
        body: '**Every lead keeps its source**, so you see which searches, ads and pages bring enquiries — and which of them book.',
        points: ['The source of every lead', 'Bookings by source', 'Monthly, weekly or daily'],
        caption: 'Enquiries and bookings, by source',
        screen: SOURCES,
      },
    ],
  },

  included: {
    heading: 'What’s in the Connected Website',
    intro: 'One system, built together.',
    items: [
      {
        icon: 'globe',
        title: 'Your website',
        body: 'Designed from scratch for your brand, with three revision rounds.',
      },
      {
        icon: 'mail',
        title: 'Every source, one place',
        body: 'Website forms, ads and WhatsApp land together.',
      },
      {
        icon: 'whatsapp',
        title: 'Instant replies',
        body: 'On WhatsApp and email, from your own number.',
      },
      {
        icon: 'calendar',
        title: 'Booking or callbacks',
        body: 'Slots with your rules, or a callback your team picks up.',
      },
      { icon: 'bell', title: 'Team alerts', body: 'The right person told, by area or service.' },
      {
        icon: 'repeat',
        title: 'Follow-ups',
        body: 'Timed follow-ups that stop on a reply or a booking.',
      },
      {
        icon: 'dashboard',
        title: 'Lead dashboard',
        body: 'Every lead, its source, its status and who’s on it.',
      },
      {
        icon: 'search',
        title: 'Set up for search',
        body: 'Titles, descriptions, sitemap and schema on every page.',
      },
      {
        icon: 'refresh',
        title: 'Three months of Evolve',
        body: 'Hosting, backups, monitoring and changes, included.',
      },
    ],
  },

  compare: {
    heading: 'The Connected Website compared',
    intro: 'What changes when every enquiry is answered and tracked.',
    us: 'One system: website, replies, booking and a dashboard of every lead.',
    options: [
      {
        label: 'Website only',
        note: 'A website with a contact form, and nothing behind it.',
        rows: [
          {
            topic: 'After hours',
            without: 'Enquiries after hours wait until morning',
            with: 'Every enquiry answered at once',
          },
          {
            topic: 'Where they land',
            without: 'Enquiries spread across calls, DMs and email',
            with: 'One place for every enquiry',
          },
          {
            topic: 'Callbacks',
            without: '“We’ll call you back” that nobody tracks',
            with: 'Bookings made in the conversation',
          },
          {
            topic: 'Sources',
            without: 'No idea which source brings customers',
            with: 'Every lead tagged with its source',
          },
        ],
      },
      {
        label: 'Separate tools',
        note: 'A website, a WhatsApp app and a spreadsheet, each on its own.',
        rows: [
          {
            topic: 'Copying',
            without: 'Leads copied from one tool to another',
            with: 'Each lead entered once',
          },
          {
            topic: 'Replies',
            without: 'Quick replies still typed by someone',
            with: 'Replies sent on their own',
          },
          {
            topic: 'Follow-ups',
            without: 'Remembered, or not',
            with: 'Run until booked or closed',
          },
          {
            topic: 'Picture',
            without: 'Three tools, three versions',
            with: 'One list, everyone sees it',
          },
        ],
      },
      {
        label: 'Paying for leads',
        note: 'Lead marketplaces that sell the same lead to several businesses.',
        rows: [
          { topic: 'The lead', without: 'Shared with your competitors', with: 'Yours alone' },
          {
            topic: 'Speed',
            without: 'Whoever calls first wins',
            with: 'You reply first, every time',
          },
          {
            topic: 'Cost',
            without: 'A fee for every lead, forever',
            with: 'A one-time build and your Evolve plan',
          },
          { topic: 'Your brand', without: 'Found under their name', with: 'Found under yours' },
        ],
      },
    ],
  },

  how: {
    heading: 'How the Connected Website works',
    screen: duo(mac('yourbusiness.in/admin', 'Replies · Your Business', SETTINGS), REPLY),
    blocks: [
      {
        title: 'One inbox for every source',
        body: 'Website forms, ads and WhatsApp land in one place.',
      },
      {
        title: 'Official WhatsApp',
        body: 'The [WhatsApp Business Platform](/services/whatsapp-automation), through an approved provider, on your number.',
      },
      {
        title: 'Booking or callbacks',
        body: '[Your slots and rules](/services/booking-payment-workflows), or a callback request your team picks up.',
      },
      {
        title: 'Dashboard and alerts',
        body: '[Every lead](/services/dashboards), its source and status; your team alerted as it happens.',
      },
      {
        title: 'Set up for search',
        body: 'Every service on its own page, [found on Google](/services/business-websites) by the people already looking.',
      },
      {
        title: 'Looked after',
        body: 'Three months of [Evolve](/services/evolve) included, then a plan of your choice.',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'Where your enquiries come from, and where they go.',
    groups: [
      {
        name: 'Enquiries from',
        items: ['Your website forms', 'Google Ads', 'Meta ads', 'Google Maps'],
      },
      { name: 'Replies on', items: ['WhatsApp Business Platform', 'Gmail'] },
      { name: 'Bookings in', items: ['Google Calendar'] },
      { name: 'Measured with', items: ['Google Analytics', 'Search Console'] },
    ],
  },

  industries: {
    heading: 'Who the Connected Website suits',
    items: [
      {
        sector: 'Clinics',
        text: 'Appointment requests answered and booked, reminders with the map pin.',
      },
      {
        sector: 'Real Estate',
        text: 'Project enquiries answered with the brochure, site visits booked.',
      },
      { sector: 'Education', text: 'Admission questions answered, demo classes booked.' },
      {
        sector: 'Professional Services',
        text: 'Consultation requests answered, calls booked into your day.',
      },
      { sector: 'Hospitality', text: 'Event and group enquiries answered with menus and dates.' },
      { sector: 'Retail', text: 'Product questions answered, store visits and orders booked.' },
    ],
  },

  build: {
    heading: 'How we build it (4–6 weeks)',
    steps: [
      {
        title: 'Plan the content',
        body: 'Your services, your customers’ questions and the content plan, shaped with you.',
      },
      { title: 'Design', body: 'From scratch for your brand, with three revision rounds.' },
      {
        title: 'Build and connect',
        body: 'The website, the replies, booking or callbacks, and the dashboard.',
      },
      { title: 'Test on real phones', body: 'Every path, from the search to the reminder.' },
      {
        title: 'Launch',
        body: 'Live on your domain, with three months of [Evolve](/services/evolve) included.',
      },
    ],
  },

  price: {
    heading: 'Two ways in',
    intro: 'The Connected Website, or the same system added to the website you already have.',
    rows: [
      'A new website, designed for your brand',
      'Enquiries from every source in one place',
      'Instant WhatsApp and email replies',
      'Online booking or callbacks',
      'Team alerts',
      'Dashboard of every lead',
      'Lead routing and follow-up reminders',
      'CRM sync and conversion tracking',
      'Evolve care',
    ],
    packages: [
      {
        name: 'Connected Website',
        summary: 'A new website with every enquiry answered, booked and tracked.',
        price: 'From ₹45,000',
        unit: 'One-time',
        timeline: '4–6 weeks',
        values: [
          'Three revision rounds',
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          '3 months included',
        ],
        cta: 'Start with the Connected Website',
        interest: 'connected-website',
        focal: true,
      },
      {
        name: 'Lead Follow-up Automation',
        summary: 'The same system, added to the website you already have.',
        price: 'Quoted',
        unit: 'In writing, before we start',
        values: [false, true, true, false, true, false, true, true, 'Optional, from ₹899 a month'],
        cta: 'Ask for a quote',
        interest: 'lead-follow-up',
      },
    ],
    notes: [
      'Meta charges for some WhatsApp messages, by category and country. Charges are paid to the provider, not to Pixel Kinetix, and we estimate them upfront.',
    ],
  },

  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'The price, in writing',
        body: 'A published starting price, and a written quote for anything custom.',
      },
      {
        icon: 'key',
        title: 'Your leads stay yours',
        body: 'Your number, your contacts and your data, always.',
      },
      {
        icon: 'layers',
        title: 'Built as one',
        body: 'Website, replies, booking and dashboard designed together, not bolted on.',
      },
      {
        icon: 'refresh',
        title: 'Looked after on Evolve',
        body: 'Three months included, then from ₹899 a month.',
      },
      {
        icon: 'shield',
        title: 'Official WhatsApp',
        body: 'Only the official WhatsApp Business Platform.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'Connected Website questions',
    items: [
      {
        question: 'How much does the Connected Website cost?',
        answer:
          'From ₹45,000, one-time, with three months of Evolve included. Adding the same system to a website you already have is quoted in writing.',
      },
      {
        question: 'How do the Website and the Connected Website differ?',
        answer:
          'The Website gets you online quickly: proven layouts, one revision round, 10–14 days. The Connected Website is designed for your brand, with three revision rounds, and adds instant replies, online booking or callbacks and a lead dashboard, in 4–6 weeks, with three months of Evolve.',
      },
      {
        question: 'Can you connect WhatsApp to our website and CRM?',
        answer:
          'Yes. We use the official WhatsApp Business Platform through an approved provider, and connect it to your website, CRM, payments and email. Meta charges for some messages; we estimate this for you upfront.',
      },
      {
        question: 'Do we need a new WhatsApp number?',
        answer:
          'We set up your business number on the WhatsApp Business Platform. If that number is in use on the WhatsApp app today, we’ll walk you through the options before we start.',
      },
      {
        question: 'Do you need my content before you start?',
        answer: 'No. For the Connected Website, we shape the content with you.',
      },
      {
        question: 'Can we see where our leads come from?',
        answer:
          'Yes. Every lead carries its source, so you can see which searches, ads and pages bring people in.',
      },
      {
        question: 'What happens after the three months of Evolve?',
        answer:
          'You choose an Evolve plan to carry on, from ₹899 a month. If you’d rather not, you get a full export of your site and content within 10 working days.',
      },
      {
        question: 'Can it book appointments as well as answer?',
        answer:
          'Yes. The reply can carry the next free slots, or a callback request your team picks up.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Google, Google Ads, Google Maps, Meta, Instagram and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
