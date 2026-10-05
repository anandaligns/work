import { type Desk, duo, mac, phone } from './kit';
import { SAMPLE_NOTE } from './shared';
import type { ProductPage } from './types';

/**
 * Website Care & Hosting, presented as a product: a precision-parts maker's old website, moved to our
 * hosting — access recovered, the move tested before the switch, speed fixed — then looked after
 * on Evolve with changes by message. The company and its sample data are invented.
 */

const NAV: Desk['nav'] = [
  { label: 'The move', icon: 'move' },
  { label: 'Access', icon: 'key' },
  { label: 'Speed', icon: 'gauge' },
  { label: 'Hosting', icon: 'server' },
  { label: 'Changes', icon: 'pen', count: '2' },
  { label: 'Reports', icon: 'chart' },
];

const desk = (over: Omit<Desk, 'kind' | 'nav'>): Desk => ({
  kind: 'desk',
  app: 'Evolve · Your Business',
  nav: NAV,
  user: { name: 'Deepak Menon', role: 'Director' },
  ...over,
});

/** The move, step by step: checked, copied, tested, switched. */
const MOVE = desk({
  active: 0,
  title: 'Moving yourbusiness.in',
  actions: ['Share with the team'],
  blocks: [
    {
      type: 'stages',
      items: [
        { label: 'Checked', meta: 'Site, domain, hosting', state: 'done' },
        { label: 'Access', meta: 'Recovered', state: 'done' },
        { label: 'Copied', meta: 'On our hosting', state: 'done' },
        { label: 'Tested', meta: '46 pages', state: 'done' },
        { label: 'Switch', meta: 'Tonight, 11 pm', state: 'now' },
        { label: 'Watched', meta: 'From tomorrow', state: 'next' },
      ],
    },
    {
      type: 'list',
      span: 6,
      title: 'Before the switch',
      items: [
        { title: 'Every page checked on the copy', meta: '46 pages · 3 fixed', done: true },
        {
          title: 'Business email left untouched',
          meta: 'Mail records copied as they were',
          done: true,
        },
        { title: 'SSL ready on the new hosting', meta: 'Issued this morning', done: true },
        { title: 'Old addresses redirected', meta: '112 redirects tested', done: true },
        { title: 'Domain switched to the new hosting', meta: 'Tonight, 11 pm', done: false },
      ],
    },
    {
      type: 'log',
      span: 6,
      title: 'Today',
      items: [
        {
          time: '4:10 pm',
          title: 'Contact form tested end to end',
          meta: 'Enquiry reached sales@',
          icon: 'mail',
          pill: { text: 'Passed', tone: 'green' },
        },
        {
          time: '2:30 pm',
          title: 'Product pages compared with the old site',
          meta: 'All 38 match',
          icon: 'eye',
          pill: { text: 'Passed', tone: 'green' },
        },
        {
          time: '11:05 am',
          title: 'Old plugin removed',
          meta: 'Unmaintained since 2021',
          icon: 'shield',
          pill: { text: 'Done', tone: 'green' },
          fresh: true,
        },
      ],
    },
  ],
});

/** Access, recovered and written down. */
const ACCESS = desk({
  active: 1,
  title: 'Access',
  tabs: ['Everything · 6'],
  blocks: [
    {
      type: 'table',
      columns: ['What', 'Where it was', 'Now'],
      rows: [
        {
          cells: ['Domain', 'Registrar, old email', 'Recovered to your email'],
          icon: 'globe',
          pill: { text: 'Recovered', tone: 'green' },
        },
        {
          cells: ['Website admin', 'With the old developer', 'Reset · 2 admins'],
          icon: 'key',
          pill: { text: 'Recovered', tone: 'green' },
        },
        {
          cells: ['Hosting', 'Shared server, unknown', 'Moved to managed hosting'],
          icon: 'server',
          pill: { text: 'Moved', tone: 'accent' },
        },
        {
          cells: ['Search Console', 'Not set up', 'Added, sitemap sent'],
          logo: 'Search Console',
          pill: { text: 'Added', tone: 'green' },
        },
        {
          cells: ['Google Analytics', 'Old property, no access', 'New property, yours'],
          logo: 'Google Analytics',
          pill: { text: 'Added', tone: 'green' },
        },
        {
          cells: ['Business email', 'Separate provider', 'Checked, left as it is'],
          icon: 'mail',
          pill: { text: 'Checked', tone: 'grey' },
        },
      ],
    },
  ],
  aside: [
    {
      type: 'note',
      title: 'Written down, in your portal',
      text: 'Every login, who holds it and where it lives — so you’re never again stuck with someone who’s gone.',
      icon: 'key',
    },
  ],
});

/** Speed, before and after the move. */
const SPEED = desk({
  active: 2,
  title: 'Speed',
  tabs: ['Phone', 'Desktop'],
  actions: ['Run the check'],
  blocks: [
    {
      type: 'scores',
      span: 6,
      title: 'Before · old hosting',
      meta: 'Tested 2 Sep',
      items: [
        { label: 'Performance', value: 38 },
        { label: 'Accessibility', value: 71 },
        { label: 'Best practices', value: 67 },
        { label: 'SEO', value: 82 },
      ],
      metrics: [
        ['Largest paint', '6.8 s'],
        ['Page weight', '7.2 MB'],
      ],
    },
    {
      type: 'scores',
      span: 6,
      title: 'After · moved and fixed',
      meta: 'Tested today',
      items: [
        { label: 'Performance', value: 94 },
        { label: 'Accessibility', value: 96 },
        { label: 'Best practices', value: 100 },
        { label: 'SEO', value: 100 },
      ],
      metrics: [
        ['Largest paint', '1.6 s'],
        ['Page weight', '1.1 MB'],
      ],
    },
    {
      type: 'list',
      title: 'What changed',
      items: [
        {
          title: 'Images resized and converted',
          meta: '5.4 MB saved on the home page',
          icon: 'download',
        },
        { title: 'Unused plugins removed', meta: '9 of 14', icon: 'shield' },
        { title: 'Served over a CDN', meta: 'Closest server to each visitor', icon: 'cloud' },
      ],
    },
  ],
});

/** After the move: normal, watched and backed up. */
const STATUS = phone({
  title: 'All systems normal',
  sub: 'yourbusiness.in · Standard plan',
  action: 'bell',
  grey: true,
  blocks: [
    {
      t: 'stats',
      items: [
        { label: 'Uptime', value: '100%' },
        { label: 'Backup', value: '2:00 am' },
        { label: 'Speed', value: '94' },
      ],
    },
    {
      t: 'list',
      title: 'Since the move',
      items: [
        { title: 'Monitoring switched on', meta: 'Uptime watched', icon: 'gauge', hue: 'green' },
        { title: 'Nightly backups', meta: 'Kept 60 days', icon: 'database', hue: 'green' },
        { title: 'Security updates', meta: 'Fortnightly', icon: 'shield', hue: 'green' },
      ],
    },
  ],
  cta: 'Ask for a change',
});

/** The owner's side of the switch: what to do at the registrar, if anything. */
const SWITCH = phone({
  back: true,
  title: 'Tonight’s switch',
  sub: 'yourbusiness.in',
  grey: true,
  blocks: [
    {
      t: 'steps',
      items: [
        { title: 'Copy tested on our hosting', meta: 'Done this afternoon', state: 'done' },
        { title: 'Domain pointed to the new hosting', meta: 'We do it · 11 pm', state: 'now' },
        { title: 'Checked from outside', meta: 'Straight after the switch', state: 'next' },
        { title: 'Old hosting cancelled', meta: 'After a week, when you say so', state: 'next' },
      ],
    },
    {
      t: 'note',
      text: 'Nothing for you to do tonight. Email keeps working as it does now.',
      icon: 'check',
      tone: 'green',
    },
  ],
});

/** Changes by message: the product list, the people, the offers. */
const CHANGES = desk({
  active: 4,
  title: 'Changes',
  tabs: ['This month · 5 of 5', 'Earlier'],
  actions: ['New request'],
  blocks: [
    {
      type: 'table',
      columns: ['Request', 'Page', 'Asked', 'Done'],
      rows: [
        {
          cells: ['Update the product list for 2025', 'Products', '4 Sep', '5 Sep'],
          icon: 'pen',
          pill: { text: 'Live', tone: 'green' },
        },
        {
          cells: ['Add the new CNC machine photos', 'Capabilities', '9 Sep', '10 Sep'],
          icon: 'pen',
          pill: { text: 'Live', tone: 'green' },
        },
        {
          cells: ['New ISO certificate PDF', 'Quality', '11 Sep', '11 Sep'],
          icon: 'pen',
          pill: { text: 'Live', tone: 'green' },
        },
        {
          cells: ['Change the sales phone number', 'Contact', 'Today', '—'],
          icon: 'pen',
          pill: { text: 'In progress', tone: 'accent' },
          fresh: true,
        },
        {
          cells: ['Add a careers page', 'New page', 'Today', '—'],
          icon: 'file',
          pill: { text: 'Quote sent', tone: 'amber' },
        },
      ],
    },
  ],
});

/** The new home: hosting, monitoring and backups, all in one place. */
const HOSTING = desk({
  active: 3,
  title: 'Hosting',
  blocks: [
    {
      type: 'uptime',
      span: 7,
      title: 'Uptime since the move',
      value: '100%',
      days: [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      ],
    },
    {
      type: 'list',
      span: 5,
      title: 'Included',
      items: [
        { title: 'Managed hosting', meta: 'No panel to learn', icon: 'server' },
        { title: 'SSL and a CDN', meta: 'On every plan', icon: 'lock' },
        { title: 'Nightly backups', meta: 'Kept 30 to 90 days', icon: 'database' },
        { title: 'Security updates', meta: 'Monthly to weekly', icon: 'shield' },
      ],
    },
  ],
});

const page: ProductPage = {
  accent: '#86198f',
  sub: 'Move your website to us and keep it fast, safe and improving, with changes by message every month.',

  stage: {
    tagline: 'Looked after, from the day it moves.',
    toast: { title: 'Site moved', line: 'Speed 38 → 94 · switched at 11 pm' },
    back: MOVE,
    front: [STATUS, SWITCH],
    photo: { file: 'keep-it-improving-stage', alt: '' },
  },

  highlights: {
    heading: 'Moving and looking after your site at a glance',
    items: [
      { value: '₹5,000–12,000', label: 'Once, to move an existing site to us.' },
      { value: '₹899', label: 'A month, from, for an Evolve plan after the move.' },
      { value: 'Tested first', label: 'On our hosting before the domain is switched.' },
      { value: 'Written down', label: 'Every login recovered and recorded in your portal.' },
    ],
  },

  view: {
    statement: 'Every website is looked after by someone. Too often, it’s nobody.',
    body: [
      '**Sites get stuck.** The developer who built it can’t be reached, the logins are with someone who left, it loads slowly and still shows last year’s products. Nobody is watching it, and nobody is backing it up.',
      '**We move it and look after it.** We check what you have, recover the access, move the site to our hosting and test it there before switching the domain — then it joins an [Evolve](/services/evolve) plan like anything we built.',
      'After that, changes are a message away, and a redesign can follow whenever you’re ready, on its own or as part of [running it in one place](/solutions/business-dashboard-crm).',
    ],
    photo: {
      file: 'keep-it-improving-factory-office',
      alt: 'A factory office with a director checking the company website on a laptop, machines visible through the glass.',
    },
  },

  features: {
    heading: 'What keeping it improving changes',
    intro: 'Five things that turn a stuck website into a looked-after one.',
    items: [
      {
        label: 'Moved properly',
        title: 'Tested before the switch, not after.',
        body: '**The site is copied to our hosting and checked page by page** before the domain moves, with email left untouched and old addresses redirected — so any downtime is short and planned.',
        points: [
          'Tested on our hosting first',
          'Email and old addresses kept working',
          'A planned switch, at a quiet hour',
        ],
        caption: 'Tonight’s switch, from the owner’s side',
        screen: SWITCH,
      },
      {
        label: 'Access',
        title: 'Every login recovered and written down.',
        body: '**We help recover the domain, the admin and the accounts around it**, usually starting with your domain registrar, and record who holds what in your portal.',
        points: ['Domain recovered to your email', 'Admin logins reset', 'Every login recorded'],
        caption: 'Every login: where it was, and where it is now',
        screen: ACCESS,
      },
      {
        label: 'Watched and backed up',
        title: 'Watched from the first day.',
        body: '**Monitoring, nightly backups and security updates start the day it moves**, on the schedule your plan sets.',
        points: [
          'Uptime monitoring',
          'Nightly backups, kept 30 to 90 days',
          'Security updates on schedule',
        ],
        caption: 'After the move: normal, watched and backed up',
        screen: STATUS,
      },
      {
        label: 'Changes by message',
        title: 'Products, people and offers, updated in a sentence.',
        body: '**Send a change from your portal** and follow it until it’s live, within your plan’s response time — new pages quoted separately.',
        points: [
          '2, 5 or 12 content changes a month',
          'Response times written into the plan',
          'A monthly report on Standard and Complete',
        ],
        caption: 'This month’s changes, and one still in progress',
        screen: CHANGES,
      },
      {
        label: 'Faster',
        title: 'Speed checked, and fixed if it needs it.',
        body: '**Every moved site gets a speed check**; if it needs work — images, old plugins, no CDN — it’s done for ₹5,000, and the difference is measured before and after.',
        points: [
          'A speed check on every move',
          'Fixes for ₹5,000 when needed',
          'Measured before and after',
        ],
        caption: 'Speed before and after the move',
        screen: SPEED,
      },
    ],
  },

  included: {
    heading: 'What’s included',
    intro: 'In the move, and on every Evolve plan after it.',
    items: [
      {
        icon: 'search',
        title: 'A check first',
        body: 'Site, domain, hosting and access reviewed before anything moves.',
      },
      {
        icon: 'key',
        title: 'Access recovered',
        body: 'Domain, admin and accounts recovered and recorded.',
      },
      { icon: 'move', title: 'The move', body: 'Copied, tested on our hosting, then switched.' },
      {
        icon: 'mail',
        title: 'Email untouched',
        body: 'Your business email keeps working through the move.',
      },
      { icon: 'link', title: 'Redirects', body: 'Old addresses sent to the right new pages.' },
      { icon: 'server', title: 'Managed hosting', body: 'With SSL and a CDN, on every plan.' },
      { icon: 'database', title: 'Nightly backups', body: 'Kept 30, 60 or 90 days by plan.' },
      {
        icon: 'shield',
        title: 'Security updates',
        body: 'Monthly, fortnightly or weekly by plan.',
      },
      {
        icon: 'pen',
        title: 'Changes by message',
        body: '2, 5 or 12 a month, tracked in your portal.',
      },
    ],
  },

  compare: {
    heading: 'Keeping it improving compared',
    intro: 'What changes when someone is looking after your site.',
    us: 'Moved, then looked after on Evolve, with changes every month.',
    options: [
      {
        label: 'Left alone',
        note: 'The site as it is, looked after by nobody.',
        rows: [
          {
            topic: 'Changes',
            without: 'Nobody updates it',
            with: 'Changes every month, by message',
          },
          {
            topic: 'Speed',
            without: 'Slow, and nobody knows why',
            with: 'Speed checked, and improved if needed',
          },
          { topic: 'Downtime', without: 'Down, and nobody notices', with: 'Monitored every day' },
          {
            topic: 'Access',
            without: 'Logins with someone who’s gone',
            with: 'Access recovered and documented',
          },
        ],
      },
      {
        label: 'Cheap hosting',
        note: 'A low-cost shared hosting account, and nothing else.',
        rows: [
          { topic: 'Updates', without: 'Left to you', with: 'Applied on your plan’s schedule' },
          { topic: 'Backups', without: 'Maybe, somewhere', with: 'Nightly, kept 30 to 90 days' },
          {
            topic: 'Help',
            without: 'A ticket about the server',
            with: 'Someone who knows your site',
          },
          { topic: 'Speed', without: 'Crowded servers', with: 'Managed hosting and a CDN' },
        ],
      },
      {
        label: 'Rebuild from scratch',
        note: 'Starting over with a new site straight away.',
        rows: [
          {
            topic: 'Cost',
            without: 'A full build before anything improves',
            with: '₹5,000–12,000 to move, then a plan',
          },
          {
            topic: 'Time',
            without: 'Weeks before anything changes',
            with: 'Looked after from the move',
          },
          {
            topic: 'Risk',
            without: 'Content and links lost in the rebuild',
            with: 'Everything kept, old links redirected',
          },
          {
            topic: 'Later',
            without: 'A decision forced now',
            with: 'A redesign when you’re ready',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How website migration and maintenance work',
    screen: duo(mac('evolve.pixelkinetix.com', 'Hosting · Evolve', HOSTING), SWITCH),
    blocks: [
      {
        title: 'Check',
        body: 'The site, domain, hosting and access checked before anything moves.',
      },
      {
        title: 'Recover access',
        body: 'Starting with your domain registrar, then the admin and accounts.',
      },
      {
        title: 'Move',
        body: 'Tested on our hosting first, then the domain switched, to keep any downtime short.',
      },
      {
        title: 'Look after',
        body: 'Hosting, monitoring, backups, security updates and [monthly changes](/services/evolve).',
      },
      { title: 'Requests', body: 'Through your client portal, each with its status.' },
      { title: 'Redesign later', body: 'Quoted on its own, or as part of Modernise & Connect.' },
    ],
  },

  tools: {
    heading: 'What we move and look after',
    intro: 'Most website platforms, and the services around them.',
    groups: [
      { name: 'Platforms', items: ['Your website forms', 'WooCommerce', 'Shopify'] },
      { name: 'Search and analytics', items: ['Search Console', 'Google Analytics'] },
      { name: 'Email', items: ['Gmail', 'Outlook'] },
    ],
  },

  industries: {
    heading: 'Website maintenance for every industry',
    items: [
      {
        sector: 'Manufacturing',
        text: 'Product lists, capabilities and certificates kept current.',
      },
      { sector: 'Clinics', text: 'Doctors, timings and treatments updated by message.' },
      { sector: 'Retail', text: 'Offers and products refreshed every month.' },
      { sector: 'Education', text: 'Batches, results and admissions kept up to date.' },
      { sector: 'Professional Services', text: 'People, services and articles added as you grow.' },
      { sector: 'Hospitality', text: 'Menus, timings and events changed by message.' },
    ],
  },

  build: {
    heading: 'How we move and look after your site',
    steps: [
      { title: 'Check', body: 'What you have, what can move, and what needs fixing.' },
      {
        title: 'Recover access',
        body: 'Domain, hosting and site logins, starting with your domain registrar.',
      },
      { title: 'Move and test', body: 'On our hosting first, then switch.' },
      { title: 'Improve', body: 'Your first changes, and speed work if needed (₹5,000).' },
      { title: 'Look after', body: 'Your [Evolve](/services/evolve) plan.' },
    ],
  },

  price: {
    heading: 'Two ways in',
    intro: 'Move your site to us once, then keep it improving on an Evolve plan.',
    rows: [
      'Site, domain and access checked',
      'Access recovered',
      'Moved, tested and switched',
      'Managed hosting, SSL and CDN',
      'Monitoring and nightly backups',
      'Security updates',
      'Content changes every month',
    ],
    packages: [
      {
        name: 'Move to Better Hosting',
        summary: 'Your existing site moved to our managed hosting, tested before the switch.',
        price: '₹5,000–12,000',
        unit: 'Once',
        values: [true, true, true, true, 'Baseline', false, false],
        cta: 'Move your site to us',
        interest: 'move-to-better-hosting',
      },
      {
        name: 'Evolve Plan',
        summary: 'Hosting, monitoring, backups, updates and changes, every month.',
        price: 'From ₹899',
        unit: 'A month · two months free yearly',
        values: [false, false, false, true, true, true, '2, 5 or 12 a month'],
        cta: 'See the Evolve plans',
        interest: 'evolve',
        focal: true,
      },
    ],
    note: 'Speed work on an existing site: ₹5,000. A redesign is quoted on its own.',
  },

  why: {
    heading: 'Why move to Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'Published prices',
        body: 'The move, the plans and speed work, priced on this page.',
      },
      {
        icon: 'key',
        title: 'Yours, always',
        body: 'Your domain and content, with a full export if you leave.',
      },
      {
        icon: 'shield',
        title: 'Tested first',
        body: 'Every move tested on our hosting before the switch.',
      },
      {
        icon: 'history',
        title: 'Everything recorded',
        body: 'Logins, requests and incidents, in your portal.',
      },
      {
        icon: 'people',
        title: 'A team, not one person',
        body: 'Nobody gets stuck when someone is away.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team looking after businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'Website maintenance questions',
    items: [
      {
        question: 'How much does it cost to move my site?',
        answer:
          'Moving an existing site costs ₹5,000 to ₹12,000 once, depending on its size and platform. After that, Evolve plans start at ₹899 a month.',
      },
      {
        question: 'Can you look after a site you didn’t build?',
        answer:
          'Yes. We move it to us first (₹5,000 to ₹12,000), and then it joins an Evolve plan like any other.',
      },
      {
        question: 'What if we don’t have the old logins?',
        answer: 'We help you recover access, which usually starts with your domain registrar.',
      },
      {
        question: 'Will my site go offline during the move?',
        answer:
          'We move it with a planned switch and test it before switching, to keep any downtime short.',
      },
      {
        question: 'Will our email stop working?',
        answer:
          'No. We copy your mail records as they are, so email keeps working through the move.',
      },
      {
        question: 'What counts as one content change?',
        answer:
          'One set of edits, sent together, to one page. A brand-new page is quoted separately.',
      },
      {
        question: 'Can you redesign it later?',
        answer: 'Yes. A redesign is quoted on its own, or as part of Modernise & Connect.',
      },
      {
        question: 'What are the terms?',
        answer:
          'Three months minimum, then monthly, with 30 days’ notice to cancel. You own your domain and your content, always.',
      },
    ],
  },

  notes: [SAMPLE_NOTE],
};

export default page;
