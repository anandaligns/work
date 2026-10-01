import { SAMPLE_NOTE } from './shared';
import type { ProductPage } from './types';

/**
 * API Integrations, presented as a product: the page's words, with no screens — its pictures are
 * its own mockups (`components/lab/mocks-api-integrations.tsx`), from its sample business, an
 * Online Travel Agency, and no other page borrows one.
 */

const page: ProductPage = {
  accent: '#0891b2',
  accentDark: '#155e75',
  sub: 'Your website, payments, accounting, suppliers and messages talking to each other, so data is entered once and lands everywhere it’s needed.',

  highlights: {
    heading: 'API integrations at a glance',
    items: [
      {
        value: 'Once',
        label: 'Each booking, payment or customer typed once, by whoever creates it.',
      },
      {
        value: 'Official APIs',
        label: 'Each tool’s own APIs and webhooks, with keys only your system holds.',
      },
      {
        value: '₹700/hr',
        label: 'For a small one-off connection; larger work is quoted in writing.',
      },
      { value: 'Every run', label: 'Logged, with failures retried or sent to a person.' },
    ],
  },

  view: {
    statement: 'If you type the same thing twice, one of your tools is missing a connection.',
    body: [
      '**API integrations** connect the tools you already use, so a booking on the website, a payment at the gateway or a new customer in the CRM flows on its own to every other tool that needs it — invoice, voucher, supplier, sheet.',
      '**Nothing is changed for its own sake.** We keep the tools that work, connect them through their official APIs and webhooks, and tell you honestly when one can’t be connected reliably.',
      'Every connection is logged and watched on [Evolve](/services/evolve), and it often becomes the first step to [running the business in one place](/solutions/run-it-in-one-place).',
    ],
    photo: {
      file: 'api-integrations-travel-desk',
      alt: 'A travel agency’s desk with a laptop showing bookings beside printed itineraries.',
    },
  },

  features: {
    heading: 'What API integrations do',
    intro: 'Five things connected tools do that copying between them can’t.',
    items: [
      {
        label: 'Enter it once',
        title: 'Typed once, by whoever creates it.',
        body: '**A booking, a payment or a new customer flows to every tool that needs it** — the booking becomes an invoice, a voucher and a supplier confirmation, with fields matched so a “customer” means the same thing everywhere.',
        points: ['Bookings into accounting', 'Bookings to suppliers', 'Customers into your CRM'],
        caption: 'How a booking’s fields become an invoice’s',
      },
      {
        label: 'Books that match',
        title: 'Payments matched to invoices as they settle.',
        body: '**Each settlement is matched to its invoices**, refunds become credit notes, and anything that doesn’t fit is flagged — so month-end isn’t a hunt through two exports.',
        points: [
          'Payments matched to invoices',
          'Refunds and failures flagged',
          'A clear trail for your accountant',
        ],
        caption: 'Today’s settlement, matched invoice by invoice',
      },
      {
        label: 'Failures you hear about',
        title: 'When something breaks, someone knows.',
        body: '**Temporary failures are retried on their own; lasting ones go to a person** with what happened, what was done and what to do next — never a silent gap in your books.',
        points: [
          'Retries on their own',
          'Alerts when something needs a person',
          'A log of what moved and when',
        ],
        caption: 'Errors and retries this week',
      },
      {
        label: 'Sheets and Workspace',
        title: 'The spreadsheet people still use, kept true.',
        body: '**Google Sheets, Drive and Gmail stay part of the picture** — the bookings sheet updated with every sale, files saved in the right folder, emails sent from your own domain.',
        points: [
          'Sheets updated as things happen',
          'Files filed in Drive by rule',
          'Emails from your Workspace account',
        ],
        caption: 'The bookings sheet, with a new row from this morning’s booking',
      },
      {
        label: 'Under the hood',
        title: 'Every request logged, every key kept safe.',
        body: '**Each connection uses the tool’s own API and webhooks**, with keys held only by your system and every request logged — so when a tool changes, we can see exactly what happened and fix it.',
        points: [
          'Official APIs and webhooks',
          'Keys stored encrypted, never shared',
          'A log of every request and response',
        ],
        caption: 'The last hour’s requests, and the keys behind them',
      },
    ],
  },

  included: {
    heading: 'API integration features',
    intro: 'What every connection we build comes with.',
    items: [
      {
        icon: 'plug',
        title: 'Official APIs',
        body: 'Each tool’s own APIs and webhooks, never screen-scraping.',
      },
      {
        icon: 'link',
        title: 'Field mapping',
        body: 'Customers, products, taxes and totals matched across tools.',
      },
      {
        icon: 'receipt',
        title: 'GST handled',
        body: 'Tax by place of supply, round-offs and discounts done properly.',
      },
      {
        icon: 'people',
        title: 'No duplicates',
        body: 'A customer created once, matched by phone and email.',
      },
      {
        icon: 'refresh',
        title: 'Retries',
        body: 'Temporary failures tried again after a pause, on their own.',
      },
      { icon: 'bell', title: 'Alerts', body: 'A person told when something needs a decision.' },
      {
        icon: 'history',
        title: 'A full log',
        body: 'Every run and request, kept for your records.',
      },
      {
        icon: 'lock',
        title: 'Keys kept safe',
        body: 'Stored encrypted on your system, rotated where the tool allows.',
      },
      { icon: 'download', title: 'Exports', body: 'Reconciled data exported for your accountant.' },
    ],
  },

  compare: {
    heading: 'API integrations compared',
    intro: 'What connected tools change, against the usual ways of keeping them in step.',
    us: 'Your tools connected through their own APIs, logged and watched.',
    options: [
      {
        label: 'Copying by hand',
        note: 'Someone retypes bookings and payments into each tool.',
        rows: [
          {
            topic: 'Invoices',
            without: 'Bookings typed into accounting',
            with: 'Invoices created from the booking',
          },
          {
            topic: 'Suppliers',
            without: 'Supplier confirmations sent by hand',
            with: 'Confirmations sent from the booking',
          },
          {
            topic: 'Availability',
            without: 'Seats and rooms checked by phone',
            with: 'Availability checked with every booking',
          },
          {
            topic: 'Errors',
            without: 'Errors found at month-end',
            with: 'Failures flagged when they happen',
          },
        ],
      },
      {
        label: 'Exports and imports',
        note: 'A CSV downloaded from one tool and uploaded to another.',
        rows: [
          {
            topic: 'Timing',
            without: 'Once a day, when someone remembers',
            with: 'As each thing happens',
          },
          {
            topic: 'Mistakes',
            without: 'Columns shifted, rows doubled',
            with: 'Fields mapped once and checked',
          },
          { topic: 'History', without: 'Which file was uploaded when?', with: 'Every run logged' },
          {
            topic: 'Refunds',
            without: 'Handled by a separate sheet',
            with: 'Credit notes made on their own',
          },
        ],
      },
      {
        label: 'A no-code connector',
        note: 'A general-purpose automation tool, set up yourself.',
        rows: [
          {
            topic: 'Indian tools',
            without: 'Tally and GST left to you',
            with: 'Built for Tally, GST and UPI',
          },
          {
            topic: 'Edge cases',
            without: 'Refunds and part payments break it',
            with: 'Refunds and part payments tested',
          },
          {
            topic: 'Cost',
            without: 'A fee per task that grows with bookings',
            with: 'A fixed quote, then your Evolve plan',
          },
          {
            topic: 'When it breaks',
            without: 'An email to whoever set it up',
            with: 'Watched and fixed on Evolve',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How API integrations work',
    blocks: [
      {
        title: 'APIs and webhooks',
        body: 'Each tool’s own connection points, used with keys only your system holds.',
      },
      {
        title: 'Mapping',
        body: 'Fields matched between tools, so a “customer” means the same thing everywhere.',
      },
      {
        title: 'Idempotent by design',
        body: 'A webhook that arrives twice is handled once, never doubled.',
      },
      {
        title: 'Retries and alerts',
        body: 'Temporary failures retried; lasting ones sent to a person.',
      },
      {
        title: 'Logged',
        body: 'Every run and request kept, so any number can be traced to where it came from.',
      },
      {
        title: 'Monitored on Evolve',
        body: 'Connections watched, and fixed within [your plan’s response time](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'Most tools with an API: here are the ones we connect most often.',
    groups: [
      { name: 'Store', items: ['WooCommerce', 'Shopify'] },
      { name: 'Payments', items: ['Razorpay', 'Cashfree'] },
      { name: 'Accounts', items: ['Tally', 'Zoho Books'] },
      { name: 'Courier', items: ['Shiprocket'] },
      { name: 'Workspace', items: ['Google Sheets', 'Google Drive', 'Gmail'] },
      { name: 'CRM and messages', items: ['Zoho CRM', 'HubSpot', 'WhatsApp'] },
    ],
  },

  industries: {
    heading: 'API integrations for every industry',
    items: [
      { sector: 'Retail', text: 'Store, stock, courier and accounting kept in step.' },
      { sector: 'Clinics', text: 'Bookings, billing and reminders sharing one record.' },
      { sector: 'Hospitality', text: 'Online orders, the counter and accounting connected.' },
      { sector: 'Real Estate', text: 'Ad leads and listing portals flowing into your CRM.' },
      { sector: 'Education', text: 'Admissions, fees and messages kept in sync.' },
      { sector: 'Manufacturing', text: 'Orders, inventory and accounting connected to your ERP.' },
    ],
  },

  build: {
    heading: 'How we build API integrations',
    steps: [
      { title: 'List the tools and flows', body: 'What should move where, and when.' },
      {
        title: 'Map the fields',
        body: 'Customers, products, taxes and totals matched across tools.',
      },
      {
        title: 'Build and test with real data',
        body: 'Including the awkward cases: refunds, part payments, returns.',
      },
      { title: 'Go live with monitoring', body: 'Every run logged; failures alerted.' },
      {
        title: 'Keep it working',
        body: 'Connections watched on [Evolve](/services/evolve) as tools update.',
      },
    ],
  },

  price: {
    heading: 'API integration pricing',
    intro: 'Connections are quoted in writing, after we’ve seen your tools.',
    rows: [
      'Connections between your tools',
      'Field mapping and GST rules',
      'Retries, alerts and a full log',
      'Tested with your real data',
      'Monitoring and fixes',
    ],
    packages: [
      {
        name: 'Custom',
        summary: 'Connections between the tools you have, built, tested and logged.',
        price: 'Quoted',
        unit: 'In writing, before we start',
        values: [true, true, true, true, 'On an Evolve plan, from ₹899 a month'],
        cta: 'Ask for a quote',
        interest: 'custom',
        focal: true,
      },
      {
        name: 'Small connection',
        summary: 'A one-off link between two tools, or a fix to one you have.',
        price: '₹700',
        unit: 'An hour',
        values: [true, true, 'Basic', true, false],
        cta: 'Tell us what you need',
        interest: 'custom',
      },
    ],
    note: 'Connecting many tools as part of a larger system? See [Custom Software](/services/custom-software), after a System Blueprint.',
    notes: [
      'Some tools charge for API access or limit it by plan; we check this with you before we build. Their charges are paid to them, not to Pixel Kinetix.',
    ],
  },

  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'The price, in writing',
        body: 'A written quote before we start, never an open-ended bill.',
      },
      {
        icon: 'key',
        title: 'Your keys, your data',
        body: 'Keys and data stay on your system; nothing is shared.',
      },
      {
        icon: 'shield',
        title: 'Official, never grey',
        body: 'Only each tool’s own APIs and webhooks.',
      },
      {
        icon: 'refresh',
        title: 'Watched on Evolve',
        body: 'Connections monitored and fixed as tools change.',
      },
      {
        icon: 'rupee',
        title: 'Built for Indian tools',
        body: 'Tally, GST, UPI and the gateways and couriers you use.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'API integration questions',
    items: [
      {
        question: 'How much does an API integration cost?',
        answer:
          'A small one-off connection can be ₹700 an hour. Larger work is quoted in writing after we’ve seen your tools.',
      },
      {
        question: 'Which tools can you connect?',
        answer:
          'Most tools with an API: payment gateways, CRMs, accounting software, Google Workspace, couriers and more.',
      },
      {
        question: 'What if a tool has no API?',
        answer: 'We look for exports, webhooks or email. If there’s no reliable way, we tell you.',
      },
      {
        question: 'Can you connect Tally?',
        answer:
          'Yes, through the integration options Tally supports. We confirm your version in the first conversation.',
      },
      {
        question: 'What happens if a connection breaks?',
        answer: 'You’re alerted. On an Evolve plan we fix it within your plan’s response time.',
      },
      {
        question: 'Is our data safe in transit?',
        answer: 'Connections use each tool’s secure API, with keys held only by your system.',
      },
      {
        question: 'Do we need to change our tools?',
        answer:
          'No. We connect the tools you have; changing one is only worth it when it can’t be connected.',
      },
      {
        question: 'Can you fix an integration someone else built?',
        answer: 'Usually, yes. We review it first and tell you whether to repair or rebuild it.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'WooCommerce, Shopify, Razorpay, Cashfree, Tally, Zoho, Shiprocket, Google and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
