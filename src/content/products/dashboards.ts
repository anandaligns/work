import { SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { Desk } from './kit';
import type { ProductPage } from './types';

/**
 * Business Dashboards, presented as a product: the page's words. Its pictures are its own mockups
 * (`components/lab/mocks-dashboards.tsx`), from its sample business, a Solar Energy Company; the
 * one screen kept here is the overview, which `/services` borrows for the back of its group's
 * picture. The company and its sample data are invented, never a client.
 */

const NAV: Desk['nav'] = [
  { label: 'Overview', icon: 'dashboard' },
  { label: 'Generation', icon: 'chart' },
  { label: 'Payments', icon: 'rupee' },
  { label: 'Leads', icon: 'target' },
  { label: 'Needs attention', icon: 'alert', count: '4' },
  { label: 'Targets', icon: 'trend' },
  { label: 'Connections', icon: 'plug' },
];

const desk = (over: Omit<Desk, 'kind' | 'nav'>): Desk => ({
  kind: 'desk',
  app: 'Solar Energy Company',
  nav: NAV,
  group: { title: 'Regions', items: ['Bangalore North', 'Bangalore South', 'Mysuru'] },
  user: { name: 'Kavya Reddy', role: 'Operations' },
  ...over,
});

const WEEKS = [
  'Jul 7',
  'Jul 14',
  'Jul 21',
  'Jul 28',
  'Aug 4',
  'Aug 11',
  'Aug 18',
  'Aug 25',
  'Sep 1',
  'Sep 8',
];

/** Everything at once: the figures, the trend, where leads come from and each region. */
const OVERVIEW = desk({
  active: 0,
  title: 'Overview',
  tabs: ['Today', 'This week', 'This month'],
  actions: ['Share', 'Export'],
  blocks: [
    {
      type: 'kpis',
      items: [
        { label: 'Generated', value: '118 MWh', delta: '9%', spark: [40, 42, 41, 46, 50, 53, 58] },
        {
          label: 'Saved for clients',
          value: '₹9.4 L',
          delta: '11%',
          spark: [60, 62, 61, 64, 66, 70, 71],
        },
        { label: 'New leads', value: '236', delta: '21%', spark: [20, 24, 22, 28, 31, 30, 36] },
        { label: 'Unpaid', value: '₹48,200', delta: '₹6,800', down: true },
      ],
    },
    {
      type: 'chart',
      span: 8,
      title: 'Generation by week',
      style: 'line',
      unit: '{} MWh',
      labels: WEEKS,
      series: [
        { name: 'This year', points: [24, 26, 25, 27, 29, 28, 30, 31, 29, 32] },
        {
          name: 'Forecast',
          points: [25, 25, 26, 26, 27, 27, 28, 28, 29, 29],
          hue: 'grey',
          dashed: true,
        },
      ],
      height: 200,
    },
    {
      type: 'donut',
      span: 4,
      title: 'Leads by source',
      parts: [
        { label: 'Google search', value: 41 },
        { label: 'Referrals', value: 23 },
        { label: 'Instagram', value: 17 },
        { label: 'Solar expos', value: 12 },
        { label: 'WhatsApp', value: 7 },
      ],
      centre: { value: '236', label: 'leads' },
    },
    {
      type: 'table',
      title: 'Regions',
      columns: ['Region', 'Generated', 'Sites', 'Unpaid'],
      barLabel: 'Uptime',
      rows: [
        { cells: ['Bangalore North', '46 MWh', '16', '₹12,400'], icon: 'pin', bar: 99 },
        { cells: ['Bangalore South', '41 MWh', '14', '₹29,300'], icon: 'pin', bar: 96 },
        { cells: ['Mysuru', '31 MWh', '8', '₹6,500'], icon: 'pin', bar: 98 },
      ],
    },
  ],
});

const page: ProductPage = {
  accent: '#eab308',
  accentDark: '#a16207',
  sub: 'Leads, bookings, payments and performance from every tool you use, in one live view, with a summary on your phone each morning.',

  stage: { back: OVERVIEW },

  highlights: {
    heading: 'Business dashboards at a glance',
    items: [
      { value: '8:00 am', label: 'A summary on WhatsApp or email, every morning.' },
      { value: 'Every tool', label: 'Numbers from the tools you use, in one view.' },
      { value: '₹45,000', label: 'A lead dashboard comes with the Connected Website.' },
      { value: '₹65,000', label: 'From, for a full business dashboard, after a Blueprint.' },
    ],
  },

  view: {
    statement: 'If you have to ask for the numbers, they’re already late.',
    body: [
      '**A business dashboard** brings the numbers you run the business on — enquiries, bookings, sales, payments, no-shows — into one live view, from the tools you already use. Most owners get them from someone who puts them together at the end of the day or the month; by then the moment to act has passed.',
      '**It changes the question** from “how many?” to “why?”. Filters by date, site, person or slot turn a number into a reason, and a summary on [WhatsApp](/services/whatsapp-automation) each morning means you know before you ask.',
      'A lead dashboard comes with the [Connected Website](/solutions/lead-automation). A full business dashboard connects your tools through their [APIs](/services/api-integrations) and is built after a System Blueprint.',
    ],
    photo: {
      file: 'dashboard-solar-operations',
      alt: 'A solar company’s operations lead reviewing the morning’s generation on a tablet beside rooftop panels.',
    },
  },

  features: {
    heading: 'What a business dashboard does',
    intro: 'Five things a dashboard does that end-of-day spreadsheets can’t.',
    items: [
      {
        label: 'Morning summary',
        title: 'The day, before you ask.',
        body: '**A summary arrives on its own each morning**, on WhatsApp or email: yesterday’s key numbers, what needs attention today, and one tap to the full view.',
        points: [
          'Yesterday’s key numbers',
          'What needs attention today',
          'One tap to the full view',
        ],
        stats: [
          { value: 'Daily', label: 'On WhatsApp or email' },
          { value: '1 tap', label: 'To the full view' },
        ],
        caption: 'The morning summary by email, yesterday in six lines',
      },
      {
        label: 'One source',
        title: 'One set of numbers everyone trusts.',
        body: '**The same figures for the owner, the operations team and the accountant**, each seeing what their role needs. No private spreadsheets, no arguments about whose total is right.',
        points: [],
        caption: 'Every tool connected, and when it last synced',
      },
      {
        label: 'Filters',
        title: 'From “how many” to “why”.',
        body: '**Filters by date, site, person or slot** turn a number into a reason, and week-on-week comparisons show whether a change is working.',
        points: [
          'Filters by date, site and person',
          'Comparisons week on week',
          'Exports and reports',
        ],
        caption: 'One region’s sites, day by day',
      },
      {
        label: 'Flags',
        title: 'Problems flagged the next morning.',
        body: '**Unpaid invoices, unconfirmed bookings and quiet leads** are listed where you’ll see them — the day after, not at month-end.',
        points: [
          'Overdue payments listed daily',
          'Unconfirmed bookings flagged',
          'Leads with no reply highlighted',
        ],
        caption: 'What needs a look today, flagged before the day starts',
      },
      {
        label: 'Targets',
        title: 'Targets you can see coming.',
        body: '**Each region’s target for the month, and where it stands today**, with the month so far drawn against the plan — so a slow week shows while there’s still time to fix it.',
        points: [
          'Targets by region, team or service',
          'The month so far against the plan',
          'A note when a target falls behind',
        ],
        caption: 'Each region against its target, and the month so far',
      },
    ],
  },

  included: {
    heading: 'Business dashboard features',
    intro: 'What a business dashboard can include, chosen with you in the System Blueprint.',
    items: [
      {
        icon: 'plug',
        title: 'Every source connected',
        body: 'Your tools linked through their APIs or exports.',
      },
      {
        icon: 'database',
        title: 'One data store',
        body: 'Cleaned, de-duplicated and updated on its own.',
      },
      { icon: 'whatsapp', title: 'Morning summaries', body: 'On WhatsApp or email, every day.' },
      { icon: 'filter', title: 'Filters', body: 'By date, site, person, service or slot.' },
      { icon: 'trend', title: 'Comparisons', body: 'Week on week and month on month.' },
      { icon: 'alert', title: 'Flags', body: 'What needs attention, listed daily.' },
      { icon: 'people', title: 'Roles and access', body: 'Each person sees what they need.' },
      {
        icon: 'device',
        title: 'On your phone',
        body: 'Built mobile-first, like everything we make.',
      },
      { icon: 'download', title: 'Exports', body: 'For your accountant, in one click.' },
      {
        icon: 'chart',
        title: 'Charts that read',
        body: 'Plain bars and lines, labelled in words.',
      },
      {
        icon: 'lock',
        title: 'Kept private',
        body: 'Access by login and role; nothing shared outside your business.',
      },
      { icon: 'database', title: 'Backed up daily', body: 'On Evolve, with monitoring.' },
    ],
  },

  compare: {
    heading: 'Business dashboards compared',
    intro: 'What changes when the numbers come in on their own.',
    us: 'One live view of every tool, shaped around how you run the business.',
    options: [
      {
        label: 'End-of-day sheets',
        note: 'Numbers typed into a spreadsheet at the end of each day.',
        rows: [
          {
            topic: 'Putting it together',
            without: 'Numbers put together by hand at day’s end',
            with: 'Numbers update as things happen',
          },
          {
            topic: 'Sites',
            without: 'Each site reports differently',
            with: 'One view for every site',
          },
          {
            topic: 'Problems',
            without: 'Problems found at month-end',
            with: 'Problems flagged the next morning',
          },
          {
            topic: 'Versions',
            without: 'Everyone keeps their own spreadsheet',
            with: 'Roles decide who sees what',
          },
        ],
      },
      {
        label: 'Each tool’s reports',
        note: 'The reports inside each tool you use.',
        rows: [
          { topic: 'Reports', without: 'A report in every tool', with: 'Every tool in one view' },
          {
            topic: 'Totals',
            without: 'Totals that don’t match each other',
            with: 'Each figure checked against its source',
          },
          {
            topic: 'Logging in',
            without: 'Logging in to five places',
            with: 'One dashboard and a morning summary',
          },
          {
            topic: 'Comparing',
            without: 'No way to compare across tools',
            with: 'Filters that cut across every source',
          },
        ],
      },
      {
        label: 'Asking the team',
        note: 'Calling or messaging the team for the numbers.',
        rows: [
          {
            topic: 'Getting a number',
            without: '“How many today?” on the phone',
            with: 'The answer on your phone at 8 am',
          },
          {
            topic: 'Accuracy',
            without: 'Numbers depend on who you ask',
            with: 'One set of numbers for everyone',
          },
          {
            topic: 'Time',
            without: 'Hours of someone’s time each week',
            with: 'Summaries and exports made on their own',
          },
          {
            topic: 'Detail',
            without: 'Only the totals',
            with: 'Totals, and the reasons behind them',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How a business dashboard is built',
    blocks: [
      {
        icon: 'plug',
        title: 'Connections',
        body: 'To your tools through their [APIs](/services/api-integrations) or exports, and to the systems we build.',
      },
      {
        icon: 'database',
        title: 'One data store',
        body: 'Cleaned, de-duplicated and updated on its own.',
      },
      { icon: 'lock', title: 'Roles and access', body: 'Each person sees what they need.' },
      {
        icon: 'download',
        title: 'Summaries and exports',
        body: 'Daily on WhatsApp or email; exports for your accountant.',
      },
      {
        icon: 'clock',
        title: 'As live as the source',
        body: 'Many connections update as things happen; some tools only allow a daily export. The Blueprint shows which.',
      },
      {
        icon: 'shield',
        title: 'Safe',
        body: 'Access by login and role, and daily backups on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'If it has an API or an export, we can usually bring it in.',
    groups: [
      { name: 'Bookings and sales', items: ['Your booking system', 'Your website', 'WhatsApp'] },
      { name: 'Payments', items: ['Razorpay'] },
      { name: 'Accounting and CRM', items: ['Tally', 'Zoho'] },
      { name: 'Data', items: ['Google Sheets'] },
    ],
  },

  industries: {
    heading: 'Who a business dashboard is for',
    items: [
      { sector: 'Clinics', text: 'Appointments, no-shows and collections across every branch.' },
      { sector: 'Real Estate', text: 'Enquiries, site visits and bookings by project and source.' },
      { sector: 'Education', text: 'Admissions, attendance and fees due, by batch and centre.' },
      { sector: 'Retail', text: 'Sales, stock and top products by store and channel.' },
      { sector: 'Hospitality', text: 'Covers, orders and takings by day, shift and outlet.' },
      { sector: 'Manufacturing', text: 'Orders, output and payments due, updated from the floor.' },
    ],
  },

  build: {
    heading: 'How we build a dashboard',
    steps: [
      {
        title: 'System Blueprint',
        body: 'Which decisions the numbers should support, and where the data lives today.',
      },
      { title: 'Connect', body: 'Each source linked and checked against its own totals.' },
      { title: 'Design the views', body: 'Owner, team and accountant views, built mobile-first.' },
      { title: 'Pilot', body: 'You use it for a few weeks; we adjust what it shows.' },
      { title: 'Launch and Evolve', body: 'New views as the business asks new questions.' },
    ],
  },

  price: {
    heading: 'Business dashboard pricing',
    intro:
      'A lead dashboard comes with the Connected Website; a full business dashboard is built after a System Blueprint.',
    rows: [
      'Every lead and its status',
      'Where the data comes from',
      'Bookings, payments and performance',
      'Morning summary on WhatsApp or email',
      'Roles and access',
      'Exports for your accountant',
      'A new website',
      'System Blueprint first',
      'Evolve care',
    ],
    packages: [
      {
        name: 'Connected Website',
        summary:
          'A new website with every enquiry answered, booked and tracked on a lead dashboard.',
        price: 'From ₹45,000',
        unit: 'One-time',
        timeline: '4–6 weeks',
        values: [
          true,
          'Your website, ads and WhatsApp',
          false,
          false,
          false,
          false,
          true,
          false,
          '3 months included',
        ],
        cta: 'Start with the Connected Website',
        interest: 'connected-website',
      },
      {
        name: 'Custom',
        summary: 'A full business dashboard across every tool you use.',
        price: 'From ₹65,000',
        unit: 'Fixed quote per phase',
        timeline: 'Timeline set in the quote',
        values: [
          true,
          'Every tool with an API or export',
          true,
          true,
          true,
          true,
          false,
          '₹10,000, credited in full',
          'Optional, from ₹899 a month',
        ],
        cta: 'Ask for a quote',
        interest: 'dashboards',
        focal: true,
      },
    ],
    note: 'Custom builds come with a 45-day warranty and payment in stages, set by the project value.',
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'Business dashboard questions',
    items: [
      {
        question: 'How much does a business dashboard cost?',
        answer:
          'A lead dashboard comes with the Connected Website, from ₹45,000. A full business dashboard is Custom, from ₹65,000, after a ₹10,000 System Blueprint that’s credited in full if you go ahead.',
      },
      {
        question: 'Where does the data come from?',
        answer:
          'From the tools you already use: your website, WhatsApp, payment gateway, spreadsheets, or software with an API. We map them in the System Blueprint.',
      },
      {
        question: 'Can different people see different things?',
        answer: 'Yes. Team roles decide who sees what.',
      },
      {
        question: 'Can I check it on my phone?',
        answer: 'Yes. It’s built mobile-first, like everything we make.',
      },
      {
        question: 'How up to date is it?',
        answer:
          'Many connections update as things happen; some tools only allow an export once a day. We show you which in the System Blueprint.',
      },
      {
        question: 'Can I get a summary without opening it?',
        answer:
          'Yes. A summary of yesterday’s key numbers and what needs attention arrives each morning on WhatsApp or email.',
      },
      {
        question: 'Can we add new numbers later?',
        answer: 'Yes. Small changes come with your Evolve plan; new views are quoted as a phase.',
      },
      {
        question: 'Is our data kept safe?',
        answer:
          'Access is by login and role, and data is backed up daily on Evolve. Nothing is shared outside your business.',
      },
    ],
  },

  notes: [SAMPLE_NOTE],
};

export default page;
