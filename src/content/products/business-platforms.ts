import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * Business Platforms & SaaS, presented as a product: the page's words, with no screens — its
 * pictures are its own mockups (`components/lab/mocks-business-platforms.tsx`), from its sample
 * business, a Recruitment Agency Network, and no other page borrows one.
 */

const page: ProductPage = {
  accent: '#9333ea',
  accentDark: '#6b21a8',
  sub: 'From a product idea to a first version real customers pay for: multi-team platforms and software products, built to grow in phases.',

  highlights: {
    heading: 'Platform development at a glance',
    items: [
      { value: 'Phase 1', label: 'A first version customers can use, scoped in a Blueprint.' },
      { value: 'Workspaces', label: 'Each customer’s users and data kept apart.' },
      { value: '₹65,000', label: 'From, with a fixed quote for each phase.' },
      { value: 'Yours', label: 'The product and the code written for it, once paid in full.' },
    ],
  },

  view: {
    statement:
      'Your first version doesn’t need every feature. It needs the one people will pay for.',
    body: [
      '**A business platform** — or SaaS product — is software many customer companies use at once, each in its own workspace, usually paying by subscription. The risk in a new product is spending months building before anyone uses it.',
      '**A [System Blueprint](/services/custom-software) cuts the first version down** to the one job a real customer needs done, and the rest follows in phases — billing, reports, an admin for your team — shaped by the people actually using it.',
      'It’s built to grow: workspaces, roles and subscriptions from the start, [APIs](/services/api-integrations) for what connects to it later, and monitoring and backups on [Evolve](/services/evolve).',
    ],
    photo: {
      file: 'saas-platform-recruitment-team',
      alt: 'A recruitment team going through a candidate pipeline together on a large screen.',
    },
  },

  features: {
    heading: 'What a SaaS platform build gives you',
    intro: 'Five foundations every platform needs, built in from the first phase.',
    items: [
      {
        label: 'First version',
        title: 'A first version you can sell.',
        body: '**Scoped to one job, built properly, in front of customers early.** Real users from the first phase, and their feedback shaping every phase after it.',
        points: [
          'One clear job, done well',
          'Real users from the first phase',
          'Feedback shaping every next phase',
        ],
        caption: 'Signing up: a workspace set up in four steps',
      },
      {
        label: 'Workspaces',
        title: 'Many customers, each kept separate.',
        body: '**Every customer company gets its own workspace, users and data**, with owners, managers and members inside each one.',
        points: [
          'Workspaces per customer',
          'Roles within each workspace',
          'Data never mixed between customers',
        ],
        caption: 'A workspace and the people in it, each with a role',
      },
      {
        label: 'Billing',
        title: 'Billing built in.',
        body: '**Plans, trials and subscriptions charged through a payment gateway** that supports them, with invoices and access that follows payment.',
        points: [],
        caption: 'The plan, the invoices and autopay',
      },
      {
        label: 'Your admin',
        title: 'Run the business behind the product.',
        body: '**An admin for your own team**: every workspace, plan, invoice and usage figure in one place, so you can support customers and see what’s growing.',
        points: [],
        caption: 'The makers’ admin: revenue and every workspace',
      },
      {
        label: 'Growth',
        title: 'See who stays, not just who signs up.',
        body: '**Signups, trials and paying workspaces month by month**, with how many are still paying later — so you know which changes keep customers, not only which bring them in.',
        points: [
          'Signups, trials and conversions',
          'Workspaces still paying, by signup month',
          'Usage by feature, for each workspace',
        ],
        caption: 'Workspaces still paying, by the month they signed up',
      },
    ],
  },

  included: {
    heading: 'SaaS platform features',
    intro: 'What a platform can include, planned phase by phase in the System Blueprint.',
    items: [
      { icon: 'person', title: 'Sign-up and sign-in', body: 'By email, phone or Google sign-in.' },
      {
        icon: 'apps',
        title: 'Workspaces',
        body: 'Each customer company’s users and data kept apart.',
      },
      {
        icon: 'people',
        title: 'Roles',
        body: 'Owners, managers and members within each workspace.',
      },
      {
        icon: 'card',
        title: 'Subscriptions',
        body: 'Plans and trials through a gateway that supports them.',
      },
      {
        icon: 'receipt',
        title: 'Invoices',
        body: 'Sent with every charge, ready for the customer’s accounts.',
      },
      {
        icon: 'table',
        title: 'Your admin',
        body: 'Every workspace, plan and invoice in one place.',
      },
      { icon: 'chart', title: 'Reports', body: 'For your customers, and usage for you.' },
      {
        icon: 'bell',
        title: 'Notifications',
        body: 'Email and WhatsApp for the moments that matter.',
      },
      { icon: 'code', title: 'APIs', body: 'So your product connects to what your customers use.' },
      {
        icon: 'devices',
        title: 'Web and mobile',
        body: 'A web app first, and a mobile app on the same system.',
      },
      { icon: 'gauge', title: 'Monitored', body: 'Uptime and errors watched on Evolve.' },
      {
        icon: 'key',
        title: 'Yours',
        body: 'The product and the code written for it, once paid in full.',
      },
    ],
  },

  compare: {
    heading: 'SaaS development compared',
    intro: 'Where a phased build fits, next to the other ways products get made.',
    us: 'A first version you can sell, built to grow in phases.',
    options: [
      {
        label: 'Build it all first',
        note: 'Building every feature before launch.',
        rows: [
          {
            topic: 'First users',
            without: 'Months of building before anyone uses it',
            with: 'A first version in customers’ hands early',
          },
          {
            topic: 'Features',
            without: 'Every feature guessed in advance',
            with: 'Each phase shaped by real users',
          },
          {
            topic: 'Budget',
            without: 'One large, open-ended budget',
            with: 'A fixed quote for each phase',
          },
          {
            topic: 'Revenue',
            without: 'Nothing to sell until the end',
            with: 'Billing added as soon as pilots convert',
          },
        ],
      },
      {
        label: 'A no-code prototype',
        note: 'A prototype on a no-code tool.',
        rows: [
          {
            topic: 'Growing',
            without: 'Quick to start, hard to grow',
            with: 'Built properly from the first phase',
          },
          {
            topic: 'Customer data',
            without: 'Customers’ data in one pile',
            with: 'Each customer’s workspace kept separate',
          },
          {
            topic: 'Limits',
            without: 'Limits you find later',
            with: 'APIs and an admin you control',
          },
          {
            topic: 'What comes next',
            without: 'Rebuilt from scratch when it works',
            with: 'Each phase builds on the last',
          },
        ],
      },
      {
        label: 'Paying by bank transfer',
        note: 'Customers paying by bank transfer.',
        rows: [
          {
            topic: 'Invoices',
            without: 'Invoices and reminders by hand',
            with: 'Subscriptions charged by the gateway',
          },
          {
            topic: 'Access',
            without: 'Access switched on and off manually',
            with: 'Access that follows payment',
          },
          {
            topic: 'Trials',
            without: 'No trials without admin work',
            with: 'Trials that start and end on their own',
          },
          {
            topic: 'Revenue',
            without: 'Revenue counted in a spreadsheet',
            with: 'Plans, invoices and revenue in your admin',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How a SaaS platform works',
    blocks: [
      { title: 'Workspaces', body: 'Each customer’s users and data kept apart.' },
      { title: 'Roles and access', body: 'Owners, managers and members within each workspace.' },
      { title: 'Subscriptions', body: 'Through a payment gateway that supports them.' },
      {
        title: 'Built to grow',
        body: 'APIs, an admin for your team, monitoring and backups on [Evolve](/services/evolve).',
      },
      { title: 'Phases', body: 'Each one usable on its own, each with its own fixed quote.' },
      {
        title: 'Web and mobile',
        body: 'The [mobile app](/services/mobile-apps), when it comes, runs on the same system.',
      },
    ],
  },

  tools: {
    heading: 'Works with the services products need',
    groups: [
      { name: 'Payments', items: ['Razorpay subscriptions'] },
      { name: 'Sign-in', items: ['Google sign-in', 'Email'] },
      { name: 'Messaging', items: ['WhatsApp', 'Email'] },
      { name: 'Stores', items: ['App Store and Google Play'] },
    ],
  },

  industries: {
    heading: 'Who we build platforms for',
    items: [
      {
        sector: 'Startups',
        text: 'A first version customers can use and pay for, then phases shaped by them.',
      },
      {
        sector: 'Professional Services',
        text: 'Turn the way you work into software other firms subscribe to.',
      },
      {
        sector: 'Education',
        text: 'A platform many schools or centres use, each in its own workspace.',
      },
      {
        sector: 'Manufacturing',
        text: 'A dealer or supplier platform your whole network signs in to.',
      },
    ],
  },

  build: {
    heading: 'How we build a SaaS platform',
    steps: [
      {
        title: 'System Blueprint',
        body: 'The first customer, the one job, and the phases after it, with a fixed quote.',
      },
      { title: 'Phase 1', body: 'The first version, designed and built.' },
      { title: 'Pilot', body: 'Real users, real feedback.' },
      { title: 'Next phases', body: 'Billing, reports, admin, each on its own quote.' },
      { title: 'Evolve', body: 'Hosting, monitoring and improvements every month.' },
    ],
  },

  price: {
    heading: 'SaaS platform pricing',
    intro: 'Every platform starts with a System Blueprint, credited in full if you go ahead.',
    ...blueprintAndCustom({
      built: 'Phase one built, tested and launched',
      summary: 'A platform built in phases, from a first version to a product you can sell.',
      interest: 'business-platforms',
    }),
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'SaaS platform questions',
    items: [
      {
        question: 'How much does it cost to build a SaaS product?',
        answer:
          'It starts with a System Blueprint for ₹10,000, credited in full if you go ahead. Platforms are Custom, from ₹65,000, with a fixed quote for each phase.',
      },
      {
        question: 'Can you build our first version (MVP)?',
        answer:
          'Yes. The System Blueprint decides what the first version must do, and what can wait.',
      },
      {
        question: 'Can it grow after launch?',
        answer: 'Yes. It’s built in phases, and Evolve keeps it running and improving.',
      },
      {
        question: 'Can it take subscription payments?',
        answer:
          'Yes, through a payment gateway that supports subscriptions. The gateway’s fees are its own.',
      },
      {
        question: 'Who owns the product?',
        answer:
          'You own the product and the code written for it once it’s paid for in full. Our shared building blocks are licensed to you for good.',
      },
      {
        question: 'Can you build the mobile app too?',
        answer: 'Yes, on the same system, so the web and phone versions stay in step.',
      },
      {
        question: 'Will it handle many customers?',
        answer:
          'Each customer gets their own workspace, and the platform grows in phases as customers arrive.',
      },
      {
        question: 'Do we need a technical co-founder?',
        answer:
          'Not to start. The Blueprint turns your idea into a scoped first version, and we build and look after it while you find customers.',
      },
    ],
  },

  notes: [SAMPLE_NOTE],
};

export default page;
