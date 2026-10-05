import { type Desk, duo, mac, phone } from './kit';
import { SAMPLE_NOTE } from './shared';
import type { ProductPage } from './types';

/**
 * Evolve, presented as a product: the care plan behind everything we build — a client portal
 * with the system's status, change requests, backups, security and a monthly report. The client
 * and its sample data are invented.
 */

const NAV: Desk['nav'] = [
  { label: 'Status', icon: 'gauge' },
  { label: 'Requests', icon: 'chat', count: '2' },
  { label: 'Monitoring', icon: 'trend' },
  { label: 'Backups', icon: 'database' },
  { label: 'Security', icon: 'shield' },
  { label: 'Reports', icon: 'chart' },
  { label: 'Plan', icon: 'receipt' },
];

const desk = (over: Omit<Desk, 'kind' | 'nav'>): Desk => ({
  kind: 'desk',
  app: 'Evolve · Your Business',
  nav: NAV,
  group: { title: 'Looked after', items: ['yourbusiness.in', 'Booking system', 'Admin'] },
  user: { name: 'Nandini Rao', role: 'Standard plan' },
  ...over,
});

const DAYS = [
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
];

/** The portal's first screen: everything normal, and what's being worked on. */
const STATUS = desk({
  active: 0,
  title: 'All systems normal',
  actions: ['New request'],
  blocks: [
    {
      type: 'uptime',
      span: 7,
      title: 'yourbusiness.in',
      value: '99.98%',
      days: DAYS,
      meta: 'Monitored',
    },
    {
      type: 'list',
      span: 5,
      title: 'Checks',
      items: [
        { title: 'SSL certificate', meta: 'Valid for 84 more days', icon: 'lock', hue: 'green' },
        { title: 'Last backup', meta: 'Today, 2:00 am · 1.2 GB', icon: 'database', hue: 'green' },
        { title: 'Security updates', meta: 'Applied Tuesday', icon: 'shield', hue: 'green' },
        {
          title: 'Speed on a phone',
          meta: 'Score 96 · checked today',
          icon: 'gauge',
          hue: 'green',
        },
      ],
    },
    {
      type: 'table',
      title: 'This month’s requests',
      meta: '3 of 5 changes used',
      columns: ['Request', 'Page', 'Asked'],
      rows: [
        {
          cells: ['Add Dr Farah’s photo and bio', 'Our team', 'Today'],
          icon: 'chat',
          pill: { text: 'In progress', tone: 'accent' },
          fresh: true,
        },
        {
          cells: ['New Diwali timings banner', 'Home', 'Mon'],
          icon: 'chat',
          pill: { text: 'Done', tone: 'green' },
        },
        {
          cells: ['Update aligner prices', 'Treatments', '8 Sep'],
          icon: 'chat',
          pill: { text: 'Done', tone: 'green' },
        },
      ],
    },
  ],
});

/** The monthly report on the phone. */
const REPORT = phone({
  title: 'September report',
  sub: 'yourbusiness.in · Standard plan',
  action: 'download',
  grey: true,
  blocks: [
    {
      t: 'stats',
      items: [
        { label: 'Uptime', value: '99.98%' },
        { label: 'Changes', value: '5 of 5' },
        { label: 'Speed', value: '96', delta: '4' },
      ],
    },
    {
      t: 'list',
      title: 'Done this month',
      items: [
        { title: 'Diwali timings banner', meta: 'Home · 2 Sep', done: true },
        { title: 'Aligner prices updated', meta: 'Treatments · 8 Sep', done: true },
        { title: 'Security updates, twice', meta: 'Every other Tuesday', done: true },
      ],
    },
    {
      t: 'note',
      text: 'Suggested next: a “Book online” button on every treatment page.',
      icon: 'bulb',
    },
  ],
  cta: 'Book the monthly call',
});

/** Asking for a change, in a sentence. */
const REQUEST = phone({
  back: true,
  title: 'New request',
  sub: '2 changes left this month',
  blocks: [
    {
      t: 'fields',
      items: [
        { label: 'Which page?', value: 'Our team' },
        { label: 'What should change?', value: 'Add Dr Farah’s photo and bio', focus: true },
      ],
    },
    {
      t: 'check',
      title: 'Attached',
      items: [
        { text: 'farah-photo.jpg', done: true },
        { text: 'bio.docx', done: true },
      ],
    },
    { t: 'note', text: 'You can follow it here until it’s done.', icon: 'history' },
  ],
  cta: 'Send request',
});

/** Requests on a board: received, being done, done. */
const REQUESTS = desk({
  active: 1,
  title: 'Requests',
  tabs: ['This month', 'All'],
  actions: ['New request'],
  blocks: [
    {
      type: 'board',
      columns: [
        {
          name: 'Received',
          hue: 'grey',
          cards: [
            {
              title: 'Add a careers page',
              meta: 'New page · quoted separately',
              tag: { text: 'Quote sent', tone: 'amber' },
            },
          ],
        },
        {
          name: 'In progress',
          hue: 'accent',
          cards: [
            {
              title: 'Add Dr Farah’s photo and bio',
              meta: 'Our team · asked today',
              people: ['Arun P'],
              fresh: true,
            },
          ],
        },
        {
          name: 'Done',
          hue: 'green',
          cards: [
            {
              title: 'Diwali timings banner',
              meta: 'Home · Mon',
              tag: { text: 'Live', tone: 'green' },
            },
            {
              title: 'Aligner prices updated',
              meta: 'Treatments · 8 Sep',
              tag: { text: 'Live', tone: 'green' },
            },
            {
              title: 'Fix the map pin',
              meta: 'Contact · 3 Sep',
              tag: { text: 'Live', tone: 'green' },
            },
          ],
        },
      ],
    },
  ],
});

/** Watched: uptime, response time and the one incident. */
const MONITOR = desk({
  active: 2,
  title: 'Monitoring',
  tabs: ['Last 90 days', '30 days'],
  blocks: [
    {
      type: 'uptime',
      span: 12,
      title: 'Uptime',
      value: '99.98%',
      days: DAYS,
      meta: 'yourbusiness.in',
    },
    {
      type: 'chart',
      span: 7,
      title: 'Response time',
      style: 'line',
      unit: '{} ms',
      labels: ['Jun', 'Jul', 'Aug', 'Sep'],
      series: [{ name: 'Response', points: [420, 310, 280, 240] }],
      height: 170,
    },
    {
      type: 'log',
      span: 5,
      title: 'Incidents',
      items: [
        {
          time: '14 Aug',
          title: 'Down for 6 minutes',
          meta: 'Hosting provider · fixed and noted',
          icon: 'alert',
          pill: { text: 'Resolved', tone: 'green' },
        },
        {
          time: '2 Jul',
          title: 'Slow for 20 minutes',
          meta: 'Traffic spike · cache warmed',
          icon: 'gauge',
          pill: { text: 'Resolved', tone: 'green' },
        },
      ],
    },
  ],
});

/** Every night's backup, kept by plan, restorable on request. */
const BACKUPS = desk({
  active: 3,
  title: 'Backups',
  tabs: ['Kept 60 days'],
  actions: ['Request a restore'],
  blocks: [
    {
      type: 'table',
      span: 8,
      columns: ['Backup', 'Size', 'Includes'],
      rows: [
        {
          cells: ['Today, 2:00 am', '1.2 GB', 'Site, database, uploads'],
          icon: 'database',
          pill: { text: 'Complete', tone: 'green' },
          fresh: true,
        },
        {
          cells: ['Yesterday, 2:00 am', '1.2 GB', 'Site, database, uploads'],
          icon: 'database',
          pill: { text: 'Complete', tone: 'green' },
        },
        {
          cells: ['Mon, 2:00 am', '1.1 GB', 'Site, database, uploads'],
          icon: 'database',
          pill: { text: 'Complete', tone: 'green' },
        },
        {
          cells: ['Sun, 2:00 am', '1.1 GB', 'Site, database, uploads'],
          icon: 'database',
          pill: { text: 'Complete', tone: 'green' },
        },
        {
          cells: ['1 Sep, 2:00 am', '1.1 GB', 'Monthly copy, kept longer'],
          icon: 'database',
          pill: { text: 'Monthly', tone: 'accent' },
        },
      ],
    },
    {
      type: 'note',
      span: 4,
      title: 'A restore, when you need one',
      text: 'Ask from your portal and we bring back any kept backup — the whole site, or one page.',
      icon: 'refresh',
    },
  ],
});

/** Security: certificates and updates, on your plan's schedule. */
const SECURITY = desk({
  active: 4,
  title: 'Security',
  tabs: ['This month'],
  blocks: [
    {
      type: 'kpis',
      items: [
        { label: 'Updates this month', value: '2' },
        { label: 'Your schedule', value: 'Fortnightly' },
        { label: 'SSL', value: '84 days left' },
        { label: 'CDN', value: 'On' },
      ],
    },
    {
      type: 'log',
      span: 7,
      title: 'Updates',
      items: [
        {
          time: 'Tue',
          title: 'Framework security release',
          meta: 'Tried on a copy, then applied',
          icon: 'shield',
          pill: { text: 'Applied', tone: 'green' },
        },
        {
          time: 'Tue',
          title: '3 packages updated',
          meta: 'No changes to your pages',
          icon: 'refresh',
          pill: { text: 'Applied', tone: 'green' },
        },
        {
          time: '2 Sep',
          title: 'Server patches',
          meta: 'Applied overnight',
          icon: 'server',
          pill: { text: 'Applied', tone: 'green' },
        },
      ],
    },
    {
      type: 'list',
      span: 5,
      title: 'By plan',
      items: [
        { title: 'Essential', meta: 'Security updates monthly', icon: 'shield', hue: 'grey' },
        { title: 'Standard', meta: 'Security updates fortnightly', icon: 'shield' },
        { title: 'Complete', meta: 'Security updates weekly', icon: 'shield', hue: 'green' },
      ],
    },
  ],
});

/** The months add up: speed, changes done and what to do next. */
const REPORTS = desk({
  active: 5,
  title: 'Reports',
  tabs: ['2025'],
  actions: ['Book the monthly call'],
  blocks: [
    {
      type: 'chart',
      span: 7,
      title: 'Speed score on a phone',
      style: 'area',
      labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      series: [{ name: 'Score', points: [71, 78, 84, 89, 92, 96] }],
      height: 190,
    },
    {
      type: 'list',
      span: 5,
      title: 'Suggested for October',
      items: [
        {
          title: 'Book online from every treatment page',
          meta: 'Most visits start there',
          icon: 'calendar',
        },
        { title: 'Compress the gallery images', meta: 'Saves about 1.4 MB', icon: 'gauge' },
        { title: 'Add evening timings to Google', meta: 'Asked about 18 times', icon: 'search' },
      ],
    },
  ],
});

/** The plan: what's included, what's used, what's billed. */
const PLAN = desk({
  active: 6,
  title: 'Plan',
  actions: ['Change plan'],
  blocks: [
    {
      type: 'plans',
      title: 'Evolve plans',
      items: [
        { name: 'Essential', price: '₹899/mo', line: '2 changes a month' },
        { name: 'Standard', price: '₹2,199/mo', line: '5 changes · monthly report', current: true },
        { name: 'Complete', price: '₹4,499/mo', line: '12 changes · monthly call' },
      ],
    },
    {
      type: 'progress',
      span: 6,
      title: 'This month',
      items: [
        { label: 'Content changes', value: 60, note: '3 of 5' },
        { label: 'Days left', value: 47, note: '14 of 30', hue: 'grey' },
      ],
    },
    {
      type: 'table',
      span: 6,
      title: 'Invoices',
      columns: ['Month', 'Amount'],
      rows: [
        { cells: ['September', '₹2,595'], icon: 'receipt', pill: { text: 'Paid', tone: 'green' } },
        { cells: ['August', '₹2,595'], icon: 'receipt', pill: { text: 'Paid', tone: 'green' } },
      ],
    },
  ],
});

const page: ProductPage = {
  accent: '#a16207',
  sub: 'Hosting, security, backups, monitoring and a set number of improvements every month, so what we build keeps getting better.',

  stage: {
    tagline: 'Launch day is the start, not the peak.',
    toast: { title: 'Request done', line: 'Diwali timings banner is live' },
    back: STATUS,
    front: [REPORT, REQUEST],
    photo: { file: 'evolve-stage', alt: '' },
  },

  highlights: {
    heading: 'Evolve at a glance',
    items: [
      { value: '₹899', label: 'A month, for Essential; Standard and Complete add more.' },
      { value: '2 · 5 · 12', label: 'Content changes a month, by plan, sent by message.' },
      { value: 'Every night', label: 'Backups, kept 30, 60 or 90 days by plan.' },
      { value: '2 months free', label: 'When you pay yearly.' },
    ],
  },

  view: {
    statement: 'A website doesn’t stay good by itself.',
    body: [
      '**Software ages.** Its parts need security updates, prices and offers change, and the business moves on. Evolve is the plan that keeps pace: someone watching your system every day, backups every night, and changes by message every month.',
      '**Everything happens in your client portal**: ask for a change in a sentence and follow it until it’s done, see your system’s status, and read the monthly report on Standard and Complete.',
      'It covers everything we build — websites, apps and software — and the [Connected Website](/solutions/lead-automation) comes with its first three months. Sites we didn’t build can [move to us](/solutions/website-care-hosting) first.',
    ],
    photo: {
      file: 'evolve-owner-reading-report',
      alt: 'A business owner reading a monthly website report on a tablet over morning tea.',
    },
  },

  features: {
    heading: 'What Evolve does',
    intro: 'Five things that keep what we built fast, safe and getting better.',
    items: [
      {
        label: 'Changes by message',
        title: 'Ask in a sentence. Follow it until it’s done.',
        body: '**Send a change from your portal** — a price, a photo, a new offer — and your plan sets how quickly it’s done. Every request has a status you can see.',
        points: [
          '2, 5 or 12 content changes a month',
          'Requests tracked in your portal',
          'Response times written into your plan',
        ],
        caption: 'This month’s requests, from received to live',
        screen: REQUESTS,
      },
      {
        label: 'Monitoring',
        title: 'Watched, so you don’t have to.',
        body: '**Your system’s uptime is monitored on every plan**, and performance too on Complete, so a problem is noticed and dealt with within your plan’s response time — with every incident written down.',
        points: [
          'Uptime monitoring on every plan',
          'Performance watched on Complete',
          'Every incident recorded',
        ],
        caption: '90 days of uptime, response time and the one incident',
        screen: MONITOR,
      },
      {
        label: 'Backups',
        title: 'A copy every night, kept by your plan.',
        body: '**Everything is backed up every night** and kept 30, 60 or 90 days by plan, so a change you regret or a problem you didn’t cause can be undone from any kept day.',
        points: ['Nightly backups', 'Kept 30, 60 or 90 days', 'A restore on request'],
        caption: 'Every night’s backup, with a monthly copy kept longer',
        screen: BACKUPS,
      },
      {
        label: 'Security',
        title: 'Updated, patched and watched.',
        body: '**Security updates are tried on a copy, then applied** on a schedule set by your plan — monthly, fortnightly or weekly — with SSL and a CDN on every plan.',
        points: [
          'Updates monthly, fortnightly or weekly',
          'SSL and a CDN on every plan',
          'Every update recorded',
        ],
        caption: 'This month’s updates, on the Standard schedule',
        screen: SECURITY,
      },
      {
        label: 'Getting better',
        title: 'Every month, a little better.',
        body: '**A monthly report on Standard and Complete**, and a call on Complete, with what changed, how the system is doing and what to improve next.',
        points: [
          'A monthly report',
          'Suggestions for next month',
          'A call to plan it, on Complete',
        ],
        caption: 'Six months of speed, and what to do next',
        screen: REPORTS,
      },
    ],
  },

  included: {
    heading: 'What Evolve includes',
    intro: 'On every plan, unless marked.',
    items: [
      {
        icon: 'server',
        title: 'Hosting',
        body: 'Managed hosting, with no panel for you to learn.',
      },
      {
        icon: 'lock',
        title: 'SSL and CDN',
        body: 'Secure and fast from every city, on every plan.',
      },
      {
        icon: 'gauge',
        title: 'Uptime monitoring',
        body: 'On every plan; performance too on Complete.',
      },
      { icon: 'database', title: 'Nightly backups', body: 'Kept 30, 60 or 90 days by plan.' },
      {
        icon: 'shield',
        title: 'Security updates',
        body: 'Monthly, fortnightly or weekly, by plan.',
      },
      { icon: 'pen', title: 'Content changes', body: '2, 5 or 12 a month, sent by message.' },
      { icon: 'chat', title: 'Client portal', body: 'Requests, status and reports in one place.' },
      { icon: 'chart', title: 'Monthly report', body: 'On Standard and Complete.' },
      { icon: 'people', title: 'Monthly call', body: 'On Complete, to plan what comes next.' },
    ],
  },

  compare: {
    heading: 'Evolve compared',
    intro: 'What a care plan changes, against the ways sites are usually left.',
    us: 'A care plan for everything we build, with changes every month.',
    options: [
      {
        label: 'Nobody',
        note: 'The site launched, and nobody has touched it since.',
        rows: [
          {
            topic: 'Changes',
            without: 'Nobody updates the site',
            with: 'Changes every month, by message',
          },
          {
            topic: 'Downtime',
            without: 'Down for hours before anyone notices',
            with: 'Monitored, with a response time in your plan',
          },
          {
            topic: 'Backups',
            without: 'No backups, or old ones',
            with: 'Nightly backups, 30 to 90 days kept',
          },
          {
            topic: 'Security',
            without: 'Security updates skipped',
            with: 'Updates applied monthly to weekly',
          },
        ],
      },
      {
        label: 'A freelancer',
        note: 'Someone who built it, reached when they can be.',
        rows: [
          {
            topic: 'Reaching them',
            without: 'Waiting for a reply',
            with: 'Requests tracked in a portal',
          },
          {
            topic: 'Response',
            without: 'When they have time',
            with: 'A response time written into your plan',
          },
          {
            topic: 'Records',
            without: 'Changes nobody wrote down',
            with: 'Every request and incident recorded',
          },
          { topic: 'Cover', without: 'Nobody when they’re away', with: 'A team, not one person' },
        ],
      },
      {
        label: 'Hosting only',
        note: 'A hosting account, and nothing on top.',
        rows: [
          { topic: 'Updates', without: 'Left to you', with: 'Tested and applied for you' },
          { topic: 'Changes', without: 'A panel to learn', with: 'A sentence in your portal' },
          {
            topic: 'Problems',
            without: 'A support ticket about the server',
            with: 'Someone who knows your site',
          },
          {
            topic: 'Improving',
            without: 'Nothing gets better',
            with: 'A report and suggestions every month',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How Evolve works',
    screen: duo(mac('evolve.pixelkinetix.com', 'Plan · Evolve', PLAN), REQUEST),
    blocks: [
      { title: 'Hosting', body: 'Managed for you, with SSL and a CDN on every plan.' },
      { title: 'Monitoring', body: 'Uptime on every plan, plus performance on Complete.' },
      { title: 'Backups and recovery', body: 'Every night; kept 30, 60 or 90 days by plan.' },
      { title: 'Requests', body: 'Through your client portal, each with its status.' },
      { title: 'Response times', body: 'Written into your plan, for requests and for problems.' },
      {
        title: 'Yours, always',
        body: 'Your domain and content, with a full export within 10 working days if you leave.',
      },
    ],
  },

  tools: {
    heading: 'What we look after',
    intro: 'Everything we build, and the services it runs on.',
    groups: [
      { name: 'What we build', items: ['Your website forms', 'Firebase', 'Android'] },
      { name: 'Search and analytics', items: ['Google Search Console', 'Google Analytics'] },
      { name: 'Messages', items: ['WhatsApp', 'Gmail'] },
    ],
  },

  industries: {
    heading: 'Who Evolve suits',
    items: [
      { sector: 'Clinics', text: 'Doctors, timings and treatments kept current on every page.' },
      { sector: 'Retail', text: 'Products, prices and offers updated every month.' },
      { sector: 'Hospitality', text: 'Menus, timings and festive specials changed by message.' },
      { sector: 'Education', text: 'Batches, fees and results updated each term.' },
      { sector: 'Real Estate', text: 'Projects, prices and availability kept true.' },
      { sector: 'Manufacturing', text: 'Product lists and certifications kept current.' },
    ],
  },

  build: {
    heading: 'How Evolve starts',
    steps: [
      {
        title: 'Choose a plan',
        body: 'Essential, Standard or Complete; the Connected Website comes with its first three months.',
      },
      {
        title: 'Hand over access',
        body: 'Your domain and access set up, and monitoring switched on.',
      },
      { title: 'Your portal', body: 'Your login, your system’s status and your first request.' },
      {
        title: 'Every month',
        body: 'Changes by message, updates on schedule and backups every night.',
      },
      {
        title: 'The report',
        body: 'A monthly report on Standard and Complete, and a call on Complete.',
      },
    ],
  },

  price: {
    heading: 'Evolve plans',
    intro: 'Three plans, monthly or yearly. Two months free when you pay yearly.',
    notes: [
      'Prices are monthly and exclude GST. A brand-new page counts as new work and is quoted separately; moving a site we didn’t build costs ₹5,000 to ₹12,000 once.',
    ],
  },

  why: {
    heading: 'Why Evolve with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'Published prices',
        body: 'Every plan’s price and what it includes, on this page.',
      },
      {
        icon: 'key',
        title: 'Yours, always',
        body: 'Your domain and your content, with a full export if you leave.',
      },
      {
        icon: 'clock',
        title: 'Response times in writing',
        body: 'How quickly requests and problems are handled, in your plan.',
      },
      {
        icon: 'people',
        title: 'The people who built it',
        body: 'Looked after by the team that knows your system.',
      },
      {
        icon: 'history',
        title: 'Everything recorded',
        body: 'Every request, update and incident, in your portal.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team looking after businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'Evolve questions',
    items: [
      {
        question: 'How much does Evolve cost?',
        answer:
          'From ₹899 a month for Essential. Standard and Complete add more changes, a monthly report and, on Complete, a monthly call. Paying yearly gives two months free.',
      },
      {
        question: 'What counts as one content change?',
        answer:
          'One set of edits, sent together, to one page. Five staff photos on one page is one change. Three different pages is three changes. A brand-new page is quoted separately.',
      },
      {
        question: 'Is hosting included?',
        answer:
          'Yes, in all three plans. The Connected Website comes with its first three months of Evolve.',
      },
      {
        question: 'What are the terms?',
        answer: 'Three months minimum, then monthly. Cancel with 30 days’ notice.',
      },
      {
        question: 'Can you look after a site you didn’t build?',
        answer:
          'Yes. Moving an existing site to us costs ₹5,000 to ₹12,000; after that it joins a plan like any other.',
      },
      {
        question: 'Do you look after apps and software too?',
        answer: 'Yes. Evolve covers everything we build, not only websites.',
      },
      {
        question: 'How quickly are changes done?',
        answer: 'Your plan sets the response time for requests and for problems, in writing.',
      },
      {
        question: 'What happens if I leave?',
        answer:
          'You own your domain and your content. We hand over a full export within 10 working days.',
      },
    ],
  },

  notes: [SAMPLE_NOTE],
};

export default page;
