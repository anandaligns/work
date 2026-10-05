import type { ProductPage } from './types';

/**
 * Custom Software, presented as a product: the page's words, with no screens — its pictures are its
 * own mockups (`components/lab/mocks-custom-software.tsx`), from its sample business, a
 * Construction Company, and no other page borrows one.
 */

const page: ProductPage = {
  accent: '#ea580c',
  accentDark: '#c2410c',
  sub: 'Software built around the way your business works — projects, purchases, site progress, approvals and reports in one system — priced in a System Blueprint before we start, and built in phases you can use.',

  highlights: {
    heading: 'Custom software at a glance',
    items: [
      {
        value: '₹10,000',
        label: 'The System Blueprint: 1–2 weeks, credited in full if you go ahead.',
      },
      { value: '₹65,000', label: 'From, for a custom build, with a fixed quote for each phase.' },
      { value: '45 days', label: 'Warranty on every phase we deliver.' },
      { value: 'Yours', label: 'The code written for you, once it’s paid for in full.' },
    ],
  },

  view: {
    statement:
      'Off-the-shelf software makes you work its way. Your way is why customers choose you.',
    body: [
      '**Custom business software** is a system built around how your business actually runs: how orders come in, how work moves between people, who approves what, and the reports you need at the end of the day. Instead of five tools and a spreadsheet holding them together, there’s one place where the work happens.',
      '**It starts with a System Blueprint.** In one to two weeks we map how you work today, where time is lost and what the software must do, then give you a fixed quote for each phase — so you know the price before anything is built.',
      'It’s built in phases you can use, connects to the [accounting software and tools](/services/api-integrations) you keep, and is looked after on [Evolve](/services/evolve) once it’s live. If you mostly need one view of your numbers, see [Business Dashboard & CRM](/solutions/business-dashboard-crm).',
    ],
    photo: {
      file: 'custom-software-construction-site',
      alt: 'A site engineer checking the day’s progress on a tablet at a building site.',
    },
  },

  features: {
    heading: 'What custom business software does',
    intro:
      'Five things it does for a growing business, each built around how yours works rather than how a template assumes it does.',
    items: [
      {
        label: 'One system',
        title: 'One place for the whole job.',
        body: '**Estimates, purchases, site progress, labour and billing in one system**, each step feeding the next. No retyping between tools, no hunting through chats, and everyone sees the same, current picture.',
        points: [
          'Every project from estimate to final bill',
          'Status everyone can see, updated as work moves',
          'Your steps, not a generic template',
        ],
        caption: 'Every project in one list, with its stage and date',
      },
      {
        label: 'Roles and approvals',
        title: 'The right screen for every person.',
        body: '**Each person sees what their role needs** — the owner the whole picture, site engineers their sites, accounts their invoices. Anything that needs a yes goes to the right person, and the answer is on record.',
        points: [
          'Roles and permissions you control',
          'Approvals on phone or desktop',
          'A history of every change: who, what and when',
        ],
        caption: 'A purchase waiting for the project manager, and the rule behind it',
      },
      {
        label: 'Reports and summaries',
        title: 'Numbers you don’t have to put together.',
        body: '**Dashboards update as the work happens**, and the reports you build by hand today — daily progress, payments due, materials to reorder — are one click away, or sent on their own each morning.',
        points: [
          'Dashboards for each role',
          'Morning summaries on WhatsApp or email',
          'Excel and PDF exports for your accountant',
        ],
        caption: 'Each project’s cost against its budget, and payments due',
      },
      {
        label: 'Built in phases',
        title: 'Useful from the first phase.',
        body: '**Each phase goes live on its own**, so the business benefits long before everything is done. The next phase is planned with what the first one taught us, and priced before it starts.',
        points: [
          'A fixed quote for every phase',
          'Each phase usable on its own',
          'Grows as the business does',
        ],
        stats: [
          { value: '₹10,000', label: 'System Blueprint, credited in full' },
          { value: '45 days', label: 'Warranty on every phase' },
        ],
        caption: 'What’s live, what’s being built and what’s next',
      },
      {
        label: 'Planning',
        title: 'Every site’s week, planned around the work.',
        body: '**Crews and equipment are planned onto sites by their deadlines**, so a delay shows what it pushes back — before anyone promises a date.',
        points: [
          'Crews, equipment and sites on one plan',
          'Deadlines checked as you plan',
          'Today’s plan on each site engineer’s phone',
        ],
        caption: 'Every site’s week, planned around the work',
      },
    ],
  },

  included: {
    heading: 'Custom software features',
    intro: 'What every custom build can include, chosen with you in the System Blueprint.',
    items: [
      {
        icon: 'layers',
        title: 'Screens for your process',
        body: 'Site diaries, purchase requests, approvals — laid out the way your team thinks about the work.',
      },
      {
        icon: 'people',
        title: 'Roles and permissions',
        body: 'Who can see, edit and approve what, set by you and changeable any time.',
      },
      {
        icon: 'userCheck',
        title: 'Approvals',
        body: 'Anything that needs a yes goes to the right person, on phone or desktop.',
      },
      {
        icon: 'history',
        title: 'A full history',
        body: 'Every change recorded, with who made it and when.',
      },
      {
        icon: 'bell',
        title: 'Alerts',
        body: 'WhatsApp or email when something is due, late or waiting for someone.',
      },
      {
        icon: 'dashboard',
        title: 'Dashboards',
        body: 'Live numbers for the owner, the team and the accounts desk.',
      },
      {
        icon: 'download',
        title: 'Exports',
        body: 'Excel and PDF exports for your accountant and your records.',
      },
      {
        icon: 'devices',
        title: 'Any device',
        body: 'Runs in the browser on desktops, tablets and phones — nothing to install.',
      },
      {
        icon: 'plug',
        title: 'Connected',
        body: 'To your accounting software, WhatsApp, payments and the tools you keep.',
      },
      {
        icon: 'upload',
        title: 'Your data brought in',
        body: 'Spreadsheets and records from your current tools, moved across at the start.',
      },
      {
        icon: 'lock',
        title: 'Secure by default',
        body: 'Logins and roles, encrypted connections and nightly backups on Evolve.',
      },
      {
        icon: 'key',
        title: 'Yours to keep',
        body: 'The code written for you is yours once it’s paid for; our shared building blocks are licensed to you for good.',
      },
    ],
  },

  compare: {
    heading: 'Custom software compared',
    intro: 'How a system built for your business compares with the usual alternatives.',
    us: 'Software shaped around your business, built in priced phases.',
    options: [
      {
        label: 'Spreadsheets',
        note: 'Projects, purchases and billing kept in spreadsheets.',
        rows: [
          {
            topic: 'Versions',
            without: 'Several versions of the same sheet',
            with: 'One system, always the current version',
          },
          {
            topic: 'Editing',
            without: 'Anyone can overwrite anything',
            with: 'Roles decide who can see and change what',
          },
          {
            topic: 'Totals',
            without: 'Totals built by hand at month-end',
            with: 'Dashboards that update as the work happens',
          },
          {
            topic: 'Changes',
            without: 'No record of who changed what',
            with: 'Every change recorded, with who and when',
          },
        ],
      },
      {
        label: 'Off-the-shelf',
        note: 'Software bought off the shelf.',
        rows: [
          {
            topic: 'Fit',
            without: 'You change your process to fit the software',
            with: 'The software fits your process',
          },
          {
            topic: 'Workarounds',
            without: 'Workarounds for the steps it doesn’t cover',
            with: 'Every step covered, including the unusual ones',
          },
          {
            topic: 'Cost',
            without: 'Features you pay for and never use',
            with: 'Built for what you need, phase by phase',
          },
          {
            topic: 'Your data',
            without: 'Your data in someone else’s format',
            with: 'Your data in your structure, exportable any time',
          },
        ],
      },
      {
        label: 'Build without a plan',
        note: 'A build that starts without a plan or a fixed price.',
        rows: [
          {
            topic: 'Price',
            without: 'A price that grows as the work does',
            with: 'A fixed quote for each phase, before it starts',
          },
          {
            topic: 'Delivery',
            without: 'Everything delivered at once, months later',
            with: 'Each phase usable as soon as it’s live',
          },
          {
            topic: 'Testing',
            without: 'Testing left to launch day',
            with: 'Tried by your team on real work first',
          },
          {
            topic: 'Afterwards',
            without: 'Nobody looking after it afterwards',
            with: 'A 45-day warranty, then Evolve every month',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How custom software is built',
    blocks: [
      {
        icon: 'clipboard',
        title: 'System Blueprint',
        body: 'How the business works today, where it loses time, and the system it needs, in phases.',
      },
      {
        icon: 'layers',
        title: 'Phases',
        body: 'Each one usable on its own, each with its own fixed quote.',
      },
      {
        icon: 'globe',
        title: 'Built for the web',
        body: 'Runs in the browser on any device, so there’s nothing to install and nothing to update by hand.',
      },
      {
        icon: 'database',
        title: 'Your data, structured',
        body: 'A database designed around your projects, vendors and steps, backed up every night on Evolve.',
      },
      {
        icon: 'plug',
        title: 'Connected to what stays',
        body: 'Your [accounting software](/services/api-integrations) and the tools you keep, through their APIs.',
      },
      {
        icon: 'shield',
        title: 'Built to last',
        body: 'Roles, security, daily backups and monitoring on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you keep',
    intro:
      'We connect what stays and retire what doesn’t. If it has an API or an export, we can usually work with it.',
    groups: [
      { name: 'Accounting', items: ['Tally', 'Zoho Books'] },
      { name: 'Messaging', items: ['WhatsApp', 'Google Workspace'] },
      { name: 'Data', items: ['Your existing database', 'Google Sheets', 'Excel'] },
    ],
  },

  industries: {
    heading: 'Who custom software is for',
    items: [
      {
        sector: 'Manufacturing',
        text: 'Orders, production, stock and dispatch in one system, with job cards on the shop floor and invoices made from the order.',
      },
      {
        sector: 'Professional Services',
        text: 'Your way of running engagements — intake, tasks, approvals and billing — built into the software.',
      },
      {
        sector: 'Education',
        text: 'Admissions, batches, fees and results shaped to how you teach, with a view for every role.',
      },
      {
        sector: 'Startups',
        text: 'The system your business model needs, built in phases so you can use it while it grows.',
      },
      {
        sector: 'Real Estate',
        text: 'Bookings, payment schedules, documents and handovers for every unit, in one place.',
      },
      {
        sector: 'Retail',
        text: 'Stock across stores, purchase orders and supplier payments, joined to what sells online.',
      },
    ],
  },

  build: {
    heading: 'How we build custom software',
    steps: [
      {
        title: 'System Blueprint',
        body: '₹10,000, 1–2 weeks: the map, the phases and a fixed quote.',
      },
      {
        title: 'Design phase one',
        body: 'Screens tested with the people who’ll use them.',
      },
      {
        title: 'Build and pilot',
        body: 'A few people use it for real; their feedback shapes the launch.',
      },
      {
        title: 'Go live',
        body: 'Phase one in daily use, with a 45-day warranty.',
      },
      {
        title: 'Next phases and Evolve',
        body: 'Each phase on its own quote; improvements every month.',
      },
    ],
  },

  price: {
    heading: 'Custom software pricing',
    intro:
      'Every custom build starts with a System Blueprint. Its fee is credited in full if you go ahead.',
    rows: [
      'How your business works, mapped',
      'Screens and roles planned',
      'A fixed quote for each phase',
      'The software built, tested and launched',
      'Your data moved across',
      '45-day warranty',
      'Payment',
      'Evolve care',
    ],
    packages: [
      {
        name: 'System Blueprint',
        summary: 'A fixed-fee study of how your business works, with a roadmap and a fixed quote.',
        price: '₹10,000',
        unit: 'Credited in full if you go ahead',
        timeline: '1–2 weeks',
        values: [true, true, true, false, false, false, 'One fixed fee', false],
        cta: 'Start with a Blueprint',
        interest: 'blueprint',
        focal: true,
      },
      {
        name: 'Custom',
        summary: 'Business software, portals, dashboards and automation, built in phases.',
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
          'In stages, set by the project value',
          'Optional, from ₹899 a month',
        ],
        cta: 'Ask for a quote',
        interest: 'custom-software',
      },
    ],
    note: 'Building a product to sell to other businesses? See [Business Platforms & SaaS](/services/business-platforms).',
  },

  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'The price before the build',
        body: 'A System Blueprint and a fixed quote for each phase — never an open-ended bill.',
      },
      {
        icon: 'key',
        title: 'Yours to keep',
        body: 'You own the code written for you once it’s paid for in full.',
      },
      {
        icon: 'layers',
        title: 'Useful early',
        body: 'Phases that go live on their own, so you benefit long before the end.',
      },
      {
        icon: 'shield',
        title: 'A 45-day warranty',
        body: 'On every phase we deliver, then Evolve for the months after.',
      },
      {
        icon: 'people',
        title: 'Tested by your team',
        body: 'The people who’ll use it try it on real work before everyone gets it.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'Custom software questions',
    items: [
      {
        question: 'How much does custom software cost?',
        answer:
          'It starts with a System Blueprint for ₹10,000, credited in full if you go ahead. Custom builds start from ₹65,000, with a fixed quote for each phase.',
      },
      {
        question: 'How can you fix a price for something new?',
        answer:
          'With a System Blueprint. In 1–2 weeks we map how you work and what the software must do, then give you a fixed quote for each phase.',
      },
      {
        question: 'What is a System Blueprint?',
        answer:
          'A fixed-fee study of how your business works: how work moves today, where time is lost, the screens and roles the software needs, and a roadmap in phases with a fixed quote for each.',
      },
      {
        question: 'Who owns the code?',
        answer:
          'You own the code written for you once it’s paid for in full. Our shared building blocks are licensed to you for good.',
      },
      {
        question: 'How long does the first phase take?',
        answer: 'Its timeline is set in the fixed quote, after the Blueprint.',
      },
      {
        question: 'Can our team try it before it’s final?',
        answer:
          'Yes. Each phase goes to a few people first, and their feedback shapes what follows.',
      },
      {
        question: 'Can it work with Tally or the software we already use?',
        answer:
          'Usually, yes — through the software’s API or its exports. We check each connection in the System Blueprint.',
      },
      {
        question: 'Can we bring our data from spreadsheets?',
        answer:
          'Yes, where it’s in a usable shape. Moving it across is planned in the Blueprint and done before launch.',
      },
      {
        question: 'Does it work on phones and tablets?',
        answer:
          'Yes. It runs in the browser on desktops, tablets and phones, so site engineers can use tablets and the owner a phone.',
      },
      {
        question: 'What if we need changes after launch?',
        answer:
          'Evolve covers a set number of changes every month. Bigger additions are quoted as a new phase.',
      },
      {
        question: 'What if we outgrow it?',
        answer: 'It’s built in phases, so it grows with you: each new phase builds on the last.',
      },
    ],
  },

  notes: [
    'Screens on this page show sample data. The names, orders and figures in them are invented.',
    'Tally, Zoho Books, Google Workspace and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
