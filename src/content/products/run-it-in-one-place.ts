import { type Desk, duo, mac, phone } from './kit';
import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * Business Dashboard & CRM, presented as a product: a bakery with three outlets and online orders —
 * sales, stock, cash and staff in one view, the tools it keeps connected, and the spreadsheets
 * retired one job at a time. The bakery and its sample data are invented.
 */

const NAV: Desk['nav'] = [
  { label: 'Today', icon: 'dashboard' },
  { label: 'Outlets', icon: 'store' },
  { label: 'Stock', icon: 'database' },
  { label: 'Cash and bank', icon: 'rupee' },
  { label: 'Staff', icon: 'people' },
  { label: 'Connections', icon: 'plug' },
  { label: 'Plan', icon: 'layers' },
];

const desk = (over: Omit<Desk, 'kind' | 'nav'>): Desk => ({
  kind: 'desk',
  nav: NAV,
  group: { title: 'Outlets', items: ['Jayanagar', 'Indiranagar', 'Whitefield'] },
  user: { name: 'Sameera Khan', role: 'Owner' },
  ...over,
});

/** Monday morning: every outlet and channel, on one screen. */
const TODAY = desk({
  active: 0,
  title: 'Monday, 15 Sep',
  tabs: ['Yesterday', 'This week', 'This month'],
  actions: ['Share', 'Export'],
  blocks: [
    {
      type: 'kpis',
      items: [
        {
          label: 'Sales yesterday',
          value: '₹1.86 L',
          delta: '9%',
          spark: [60, 62, 58, 66, 70, 68, 74],
        },
        { label: 'Orders', value: '642', delta: '31' },
        { label: 'Cash to bank', value: '₹42,300' },
        { label: 'Wastage', value: '3.1%', delta: '0.8 pts' },
      ],
    },
    {
      type: 'chart',
      span: 8,
      title: 'Sales by channel, last 14 days',
      style: 'line',
      unit: '₹{}k',
      labels: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      series: [
        {
          name: 'Counters',
          points: [98, 102, 96, 110, 118, 142, 138, 101, 104, 99, 112, 121, 146, 132],
        },
        {
          name: 'Online',
          points: [34, 38, 36, 40, 44, 58, 55, 37, 41, 39, 45, 49, 61, 54],
          hue: 'violet',
        },
      ],
      height: 190,
    },
    {
      type: 'list',
      span: 4,
      title: 'Needs a look',
      items: [
        {
          title: 'Whitefield cash short ₹1,200',
          meta: 'Counted vs billed',
          icon: 'rupee',
          hue: 'amber',
        },
        {
          title: 'Butter below reorder level',
          meta: 'Jayanagar · 6 kg left',
          icon: 'database',
          hue: 'red',
        },
        {
          title: 'Online refunds up',
          meta: '5 yesterday · usually 1',
          icon: 'alert',
          hue: 'violet',
        },
      ],
    },
  ],
});

/** The weekly summary on the owner's phone. */
const WEEKLY = phone({
  title: 'Week 37',
  sub: 'Three outlets and online',
  action: 'download',
  grey: true,
  blocks: [
    {
      t: 'hero',
      eyebrow: 'Sales this week',
      value: '₹11.4 L',
      label: 'Up 7% on last week',
      line: 'Best day: Saturday, ₹2.1 L',
    },
    {
      t: 'list',
      title: 'By outlet',
      items: [
        { title: 'Jayanagar', value: '₹4.6 L', icon: 'store' },
        { title: 'Indiranagar', value: '₹3.9 L', icon: 'store' },
        {
          title: 'Whitefield',
          value: '₹2.9 L',
          icon: 'store',
          pill: { text: 'Cash short', tone: 'amber' },
        },
      ],
    },
  ],
  cta: 'Open the full view',
});

/** Problems flagged as they happen, not at month-end. */
const ALERTS = phone({
  title: 'Flagged',
  sub: 'Today · 3',
  action: 'bell',
  grey: true,
  blocks: [
    {
      t: 'list',
      items: [
        {
          title: 'Whitefield cash short ₹1,200',
          meta: 'Closing count, 10:40 pm',
          icon: 'rupee',
          hue: 'amber',
          pill: { text: 'Check', tone: 'amber' },
        },
        {
          title: 'Butter: 6 kg left',
          meta: 'Jayanagar · reorder at 10 kg',
          icon: 'database',
          hue: 'red',
          pill: { text: 'Reorder', tone: 'red' },
        },
        {
          title: '5 online refunds',
          meta: 'Late deliveries, Indiranagar',
          icon: 'alert',
          hue: 'violet',
          pill: { text: 'Look', tone: 'grey' },
        },
      ],
    },
    { t: 'note', text: 'Flagged the moment the numbers came in, not at month-end.', icon: 'clock' },
  ],
});

/** Outlets side by side, with the same numbers for everyone. */
const OUTLETS = desk({
  active: 1,
  title: 'Outlets',
  tabs: ['This week', 'This month'],
  blocks: [
    {
      type: 'table',
      columns: ['Outlet', 'Sales', 'Orders', 'Wastage', 'Cash matched'],
      barLabel: 'Target',
      rows: [
        {
          cells: ['Jayanagar', '₹4.6 L', '1,812', '2.4%', 'Yes'],
          icon: 'store',
          bar: 92,
          pill: { text: 'On track', tone: 'green' },
        },
        {
          cells: ['Indiranagar', '₹3.9 L', '1,506', '3.0%', 'Yes'],
          icon: 'store',
          bar: 81,
          pill: { text: 'On track', tone: 'green' },
        },
        {
          cells: ['Whitefield', '₹2.9 L', '1,122', '4.2%', 'Short ₹1,200'],
          icon: 'store',
          bar: 64,
          pill: { text: 'Check', tone: 'amber' },
          highlight: true,
        },
        {
          cells: ['Online', '₹2.8 L', '842', '—', 'Yes'],
          icon: 'globe',
          bar: 88,
          pill: { text: 'On track', tone: 'green' },
        },
      ],
    },
    {
      type: 'chart',
      title: 'Wastage by outlet, last 8 weeks',
      style: 'line',
      unit: '{}%',
      labels: ['Wk 30', 'Wk 31', 'Wk 32', 'Wk 33', 'Wk 34', 'Wk 35', 'Wk 36', 'Wk 37'],
      series: [
        { name: 'Whitefield', points: [5.1, 4.9, 4.6, 4.8, 4.4, 4.3, 4.1, 4.2], hue: 'amber' },
        { name: 'Jayanagar', points: [3.2, 3.0, 2.9, 2.8, 2.6, 2.5, 2.5, 2.4] },
      ],
      height: 160,
    },
  ],
});

/** The tools kept, connected: every number entered once. */
const CONNECTED = desk({
  active: 5,
  title: 'Connections',
  actions: ['Add a connection'],
  blocks: [
    {
      type: 'log',
      span: 7,
      title: 'Last night',
      meta: 'Checked against each tool’s own totals',
      items: [
        {
          time: '11:05 pm',
          title: 'Counter sales from 3 outlets',
          meta: '1,488 bills · ₹1.32 L',
          icon: 'store',
          pill: { text: 'Matched', tone: 'green' },
        },
        {
          time: '11:10 pm',
          title: 'Online orders and refunds',
          meta: '192 orders · 5 refunds',
          logo: 'WooCommerce',
          pill: { text: 'Matched', tone: 'green' },
        },
        {
          time: '11:12 pm',
          title: 'Payments settled',
          meta: '₹54,210 · 188 payments',
          logo: 'Razorpay',
          pill: { text: 'Matched', tone: 'green' },
        },
        {
          time: '2:00 am',
          title: 'Day book to accounts',
          meta: '3 outlets · 1 voucher each',
          logo: 'Tally',
          pill: { text: 'Posted', tone: 'green' },
        },
        {
          time: '6:00 am',
          title: 'Staff roster for today',
          meta: '18 people · 3 outlets',
          logo: 'Google Sheets',
          pill: { text: 'Read', tone: 'grey' },
        },
      ],
    },
    {
      type: 'list',
      span: 5,
      title: 'Kept and connected',
      items: [
        {
          title: 'Tally',
          meta: 'Accounts · kept',
          logo: 'Tally',
          pill: { text: 'Connected', tone: 'green' },
        },
        {
          title: 'Razorpay',
          meta: 'Online payments · kept',
          logo: 'Razorpay',
          pill: { text: 'Connected', tone: 'green' },
        },
        {
          title: 'WooCommerce',
          meta: 'Online orders · kept',
          logo: 'WooCommerce',
          pill: { text: 'Connected', tone: 'green' },
        },
        {
          title: 'Daily sales sheet',
          meta: 'Retired in phase 1',
          icon: 'table',
          pill: { text: 'Retired', tone: 'grey' },
        },
      ],
    },
  ],
});

/** The spreadsheets' jobs, moved into the system one at a time. */
const RETIRED = desk({
  active: 6,
  title: 'Spreadsheets, retired',
  blocks: [
    {
      type: 'sheet',
      span: 7,
      title: 'Daily sales – ALL OUTLETS (final) v7.xlsx',
      columns: ['Date', 'Outlet', 'Cash', 'Card/UPI', 'Total'],
      rows: [
        { cells: ['12/9', 'Jayanagar', '41,200', '52,880', '94,080'] },
        { cells: ['12/9', 'Indiranagar', '33,150', '47,700', '80,850'] },
        { cells: ['12/9', 'Whitefield', '28,400', '31,900', '#REF!'] },
        { cells: ['13/9', 'Jayanagar', '44,900', '58,120', '1,03,020'] },
      ],
    },
    {
      type: 'progress',
      span: 5,
      title: 'Jobs moved into the system',
      items: [
        { label: 'Daily sales', value: 100, note: 'Moved · phase 1', hue: 'green' },
        { label: 'Stock and reorders', value: 100, note: 'Moved · phase 1', hue: 'green' },
        { label: 'Staff roster', value: 55, note: 'Moving · phase 2' },
        { label: 'Supplier payments', value: 0, note: 'Phase 3', hue: 'grey' },
      ],
    },
  ],
});

/** The plan from the Blueprint, in priced phases. */
const PLAN = desk({
  active: 6,
  crumbs: ['Plan'],
  title: 'System Blueprint · roadmap',
  actions: ['Download the Blueprint'],
  blocks: [
    {
      type: 'roadmap',
      title: 'Phases',
      heads: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      now: 2.5,
      rows: [
        { label: 'Blueprint', from: 0, to: 1, text: 'Tools mapped · fixed quote', hue: 'grey' },
        { label: 'Phase 1', from: 1, to: 3, text: 'Connections and the dashboard', hue: 'green' },
        { label: 'Phase 2', from: 3, to: 4, text: 'Staff and rosters', hue: 'accent' },
        { label: 'Phase 3', from: 4, to: 5, text: 'Supplier payments', hue: 'violet' },
        { label: 'Every month', from: 3, to: 6, text: 'A new view or connection', hue: 'amber' },
      ],
    },
    {
      type: 'table',
      title: 'Tools mapped',
      columns: ['Tool', 'Does', 'Plan'],
      rows: [
        {
          cells: ['Tally', 'Accounts', 'Keep and connect'],
          logo: 'Tally',
          pill: { text: 'Keep', tone: 'green' },
        },
        {
          cells: ['WooCommerce', 'Online orders', 'Keep and connect'],
          logo: 'WooCommerce',
          pill: { text: 'Keep', tone: 'green' },
        },
        {
          cells: ['Daily sales sheet', 'Totals by outlet', 'Move into the system'],
          icon: 'table',
          pill: { text: 'Retire', tone: 'amber' },
        },
        {
          cells: ['WhatsApp groups', 'Shift handovers', 'Move into the system'],
          logo: 'WhatsApp',
          pill: { text: 'Retire', tone: 'amber' },
        },
      ],
    },
  ],
});

/** Who sees what: owner, managers and the accountant. */
const ACCESS = desk({
  active: 4,
  crumbs: ['Settings'],
  title: 'Roles and views',
  actions: ['Invite'],
  blocks: [
    {
      type: 'matrix',
      span: 7,
      title: 'What each role sees',
      heads: ['Owner', 'Outlet manager', 'Accountant'],
      rows: [
        { label: 'Every outlet', values: [true, false, true] },
        { label: 'Sales and cash', values: [true, true, true] },
        { label: 'Stock and reorders', values: [true, true, false] },
        { label: 'Staff and rosters', values: [true, true, false] },
        { label: 'Exports for accounts', values: [true, false, true] },
      ],
    },
    {
      type: 'list',
      span: 5,
      title: 'People',
      items: [
        {
          title: 'Sameera Khan',
          meta: 'All outlets',
          avatar: true,
          pill: { text: 'Owner', tone: 'accent' },
        },
        {
          title: 'Joseph D',
          meta: 'Whitefield',
          avatar: true,
          pill: { text: 'Manager', tone: 'grey' },
        },
        {
          title: 'Priya S',
          meta: 'Jayanagar',
          avatar: true,
          pill: { text: 'Manager', tone: 'grey' },
        },
        {
          title: 'K. Ramesh & Co',
          meta: 'Monthly',
          avatar: true,
          pill: { text: 'Accountant', tone: 'grey' },
        },
      ],
    },
  ],
});

const page: ProductPage = {
  accent: '#2563eb',
  sub: 'One view of orders, leads, bookings and payments, with the tools you already use connected and the spreadsheets retired.',

  stage: {
    tagline: 'You can’t run what you can’t see.',
    toast: { title: 'Weekly summary ready', line: '₹11.4 L across 3 outlets and online' },
    back: TODAY,
    front: [WEEKLY, ALERTS],
    photo: { file: 'run-it-in-one-place-stage', alt: '' },
  },

  highlights: {
    heading: 'Running it in one place at a glance',
    items: [
      { value: 'One view', label: 'Every outlet, channel and number, updated on its own.' },
      { value: 'Kept', label: 'The tools that work, connected rather than replaced.' },
      { value: '₹10,000', label: 'For the System Blueprint, credited in full if you go ahead.' },
      { value: 'In phases', label: 'Each priced upfront and useful on its own.' },
    ],
  },

  view: {
    statement: 'You can’t run what you can’t see.',
    body: [
      '**Most growing businesses run on ten tabs**: a billing counter, an online store, accounts, a courier, a spreadsheet for everything in between, and a WhatsApp group for the rest. Each works; together, nobody can see the whole picture.',
      '**We connect what works and build only what’s missing.** A System Blueprint maps every tool, sheet and chat, then the tools are [connected](/services/api-integrations), a [dashboard](/services/dashboards) goes on top and the spreadsheets are retired, one job at a time.',
      'It’s built in priced phases, each useful on its own, with a new view or connection each month after on [Evolve](/services/evolve).',
    ],
    photo: {
      file: 'run-it-in-one-place-bakery-counter',
      alt: 'A bakery counter in the morning, with fresh bread on racks and a tablet by the till.',
    },
  },

  features: {
    heading: 'What running it in one place changes',
    intro: 'Five things that turn ten tabs into one picture.',
    items: [
      {
        label: 'One view',
        title: 'Every outlet side by side.',
        body: '**Every channel’s and outlet’s numbers side by side**, updated on their own, with the same figures for the owner, the managers and the accountant.',
        points: [
          'Sales, orders, stock and cash together',
          'Filters by outlet, channel or person',
          'The same numbers for everyone',
        ],
        caption: 'Outlets side by side, with wastage over eight weeks',
        screen: OUTLETS,
      },
      {
        label: 'Connected',
        title: 'The tools you keep, connected.',
        body: '**The tools that work stay, linked through their APIs or exports**, and every number is checked against the tool’s own total before it’s trusted.',
        points: [
          'Counters, store, payments and accounts linked',
          'Checked against each tool’s totals',
          'Failures flagged when they happen',
        ],
        caption: 'Last night’s connections, each matched to its source',
        screen: CONNECTED,
      },
      {
        label: 'Spreadsheets retired',
        title: 'The spreadsheets’ jobs, moved one at a time.',
        body: '**Each spreadsheet’s job moves into the system**, with its data brought across where it’s usable — so “final v7” is replaced, not just renamed.',
        points: [
          'Data moved across where it’s usable',
          'Each spreadsheet’s job replaced',
          'Nothing lost on the way',
        ],
        caption: 'The old sales sheet, and the jobs already moved',
        screen: RETIRED,
      },
      {
        label: 'Flagged',
        title: 'Problems as they happen.',
        body: '**Cash that doesn’t match, stock below its reorder level, refunds that jump** — flagged on your phone the day they happen, not found at month-end.',
        points: [
          'Cash matched to billing, daily',
          'Stock checked against reorder levels',
          'Unusual days flagged',
        ],
        caption: 'Today’s flags on the owner’s phone',
        screen: ALERTS,
      },
      {
        label: 'In phases',
        title: 'A plan you can see, priced before it starts.',
        body: '**The System Blueprint maps every tool and sets the order**, and each phase is priced upfront and goes live on its own — so the business benefits long before the end.',
        points: [
          'Every tool mapped: keep, connect or retire',
          'Phases priced upfront',
          'A new view or connection each month',
        ],
        caption: 'The roadmap from the Blueprint, and the tools it maps',
        screen: PLAN,
      },
    ],
  },

  included: {
    heading: 'What’s included',
    intro: 'Across the phases, as the Blueprint sets them.',
    items: [
      {
        icon: 'clipboard',
        title: 'System Blueprint',
        body: 'Every tool, sheet and chat mapped, with a phased plan and a fixed quote.',
      },
      {
        icon: 'plug',
        title: 'Connections',
        body: 'The tools you keep, linked through their APIs or exports.',
      },
      {
        icon: 'dashboard',
        title: 'One dashboard',
        body: 'Every outlet, channel and number, updated on its own.',
      },
      {
        icon: 'people',
        title: 'Roles and views',
        body: 'Owner, manager and accountant, each seeing their part.',
      },
      {
        icon: 'bell',
        title: 'Flags and summaries',
        body: 'Problems flagged daily; a summary each week.',
      },
      {
        icon: 'table',
        title: 'Spreadsheets retired',
        body: 'Their jobs moved into the system, one at a time.',
      },
      { icon: 'download', title: 'Exports', body: 'What your accountant needs, ready each month.' },
      {
        icon: 'globe',
        title: 'Website, if needed',
        body: 'A redesign as part of Modernise & Connect.',
      },
      {
        icon: 'refresh',
        title: 'Evolve',
        body: 'A new view or connection each month, on your plan.',
      },
    ],
  },

  compare: {
    heading: 'Running it in one place compared',
    intro: 'What changes when the business is visible in one place.',
    us: 'Your tools connected, a dashboard on top, built in priced phases.',
    options: [
      {
        label: 'Ten tabs',
        note: 'Each tool on its own, and a spreadsheet in between.',
        rows: [
          { topic: 'Seeing it', without: 'Numbers in ten tabs', with: 'One view on top' },
          {
            topic: 'Copying',
            without: 'Data copied between tools',
            with: 'Tools connected, data entered once',
          },
          {
            topic: 'Spreadsheets',
            without: 'Spreadsheets holding it together',
            with: 'Spreadsheets retired, one job at a time',
          },
          {
            topic: 'Surprises',
            without: 'Month-end surprises',
            with: 'Problems flagged as they happen',
          },
        ],
      },
      {
        label: 'One big system',
        note: 'Replacing everything with one large software package.',
        rows: [
          {
            topic: 'Your tools',
            without: 'Everything replaced at once',
            with: 'What works, kept and connected',
          },
          {
            topic: 'Risk',
            without: 'One big switch-over day',
            with: 'Phases that go live one by one',
          },
          {
            topic: 'Fit',
            without: 'Your process bent to the software',
            with: 'Built around how you work',
          },
          {
            topic: 'Cost',
            without: 'Licences for features nobody uses',
            with: 'Only what’s missing, priced upfront',
          },
        ],
      },
      {
        label: 'A reports person',
        note: 'Someone who puts the numbers together each week.',
        rows: [
          { topic: 'Speed', without: 'Numbers ready days later', with: 'Updated on their own' },
          {
            topic: 'Accuracy',
            without: 'Totals that depend on who made them',
            with: 'Checked against each tool',
          },
          {
            topic: 'Time',
            without: 'Hours of someone’s week',
            with: 'Their time back for real work',
          },
          { topic: 'Detail', without: 'Only the totals', with: 'Drill into any outlet or day' },
        ],
      },
    ],
  },

  how: {
    heading: 'How running it in one place works',
    screen: duo(mac('app.yourbusiness.in', 'Roles · Your Business', ACCESS), WEEKLY),
    blocks: [
      {
        title: 'Blueprint first',
        body: '[Every tool](/services/custom-software), sheet and chat mapped, and the order to fix them in.',
      },
      {
        title: 'Connections',
        body: 'Each tool linked through its [API](/services/api-integrations), exports or the systems we build.',
      },
      { title: 'Clean data', body: 'Cleaned and de-duplicated, feeding the dashboard.' },
      {
        title: 'Views by role',
        body: 'Owner, manager and accountant views, each with what they need.',
      },
      { title: 'Checked', body: 'Every number checked against its source tool’s own total.' },
      {
        title: 'Growing',
        body: 'A new view or connection each month on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'We connect what works and build only what’s missing.',
    groups: [
      { name: 'Accounts', items: ['Tally', 'Zoho Books'] },
      { name: 'Selling', items: ['WooCommerce', 'Shopify', 'Razorpay'] },
      { name: 'Sheets', items: ['Google Sheets', 'Excel'] },
      { name: 'Messages', items: ['WhatsApp', 'Gmail'] },
    ],
  },

  industries: {
    heading: 'Who runs it in one place',
    items: [
      { sector: 'Hospitality', text: 'Outlets, online orders, stock and cash in one view.' },
      { sector: 'Retail', text: 'Stores, the website and accounts connected.' },
      { sector: 'Clinics', text: 'Branches, bookings and billing side by side.' },
      { sector: 'Education', text: 'Centres, admissions and fees together.' },
      { sector: 'Manufacturing', text: 'Orders, production and dispatch on one screen.' },
      { sector: 'Professional Services', text: 'Clients, work in progress and billing together.' },
    ],
  },

  build: {
    heading: 'How we build it',
    steps: [
      { title: 'System Blueprint', body: 'The map, the phases and a fixed quote.' },
      {
        title: 'Connect',
        body: 'The tools you keep, linked and checked against their own totals.',
      },
      { title: 'The dashboard', body: 'The views each person needs.' },
      { title: 'Retire the spreadsheets', body: 'One job at a time.' },
      { title: 'Keep growing', body: 'A new view or connection each month.' },
    ],
  },

  price: {
    heading: 'Two ways in',
    intro: 'Business Dashboard & CRM, or Modernise & Connect — both start with a System Blueprint.',
    ...blueprintAndCustom({
      built: 'The system built, phase by phase',
      summary: 'Dashboard, CRM and connections, in priced phases.',
      interest: 'business-dashboard',
    }),
    note: 'Speed optimisation of an existing site on its own: ₹5,000.',
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'Running it in one place: questions',
    items: [
      {
        question: 'How much does it cost?',
        answer:
          'It starts with a ₹10,000 System Blueprint, credited in full if you go ahead. Each phase is then quoted in writing before it starts; custom builds start from ₹65,000.',
      },
      {
        question: 'Do we have to replace our software?',
        answer: 'No. We connect what works and build only what’s missing.',
      },
      {
        question: 'Can we move off Excel?',
        answer: 'Yes. Your spreadsheet data comes across where it’s in a usable shape.',
      },
      {
        question: 'Why start with a System Blueprint?',
        answer:
          'Because a fixed price needs a clear picture. In 1–2 weeks we map how you work and where it loses time, and hand you a phased plan and a fixed quote.',
      },
      {
        question: 'What comes first?',
        answer:
          'Usually the connections and the dashboard, because every later step builds on them. The Blueprint sets the order.',
      },
      {
        question: 'Can our accountant get what they need?',
        answer: 'Yes. Accountant views and exports are part of the dashboard.',
      },
      {
        question: 'Can you redesign our current website as well?',
        answer: 'Yes. A redesign is part of Modernise & Connect, quoted with the rest.',
      },
      {
        question: 'Can we check it on a phone?',
        answer: 'Yes. Summaries and flags arrive on your phone, and the full view works there too.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Tally, Zoho, WooCommerce, Shopify, Razorpay, Microsoft Excel, Google and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
