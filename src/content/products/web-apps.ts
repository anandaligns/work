import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * Web Apps, presented as a product: the page's words, with no screens — its pictures are its own
 * mockups (`components/lab/mocks-web-apps.tsx`), from its sample business, a Logistics & Fleet
 * Company, and no other page borrows one.
 */

const page: ProductPage = {
  accent: '#2563eb',
  accentDark: '#1e40af',
  sub: 'Tools that run in any browser, on any device, with nothing to install: built for one job and connected to the rest of your business.',

  highlights: {
    heading: 'Web apps at a glance',
    items: [
      {
        value: 'Any device',
        label: 'Phone, tablet or desktop, from one link — nothing to install.',
      },
      { value: '₹10,000', label: 'The System Blueprint, credited in full if you go ahead.' },
      { value: '₹65,000', label: 'From, with a fixed quote for each phase.' },
      { value: '45 days', label: 'Warranty on every phase we deliver.' },
    ],
  },

  view: {
    statement: 'The best app is often the one nobody has to download.',
    body: [
      '**A web app** is software that runs in the browser: it opens from a link on any phone, tablet or computer, remembers who you are, and can sit on the home screen like an app. For one clear job — reordering, checking a status, filling a form, approving a request — it’s quicker to build and easier for people to adopt than an app they have to download.',
      '**Built for one job, connected to everything behind it.** Bookings go straight into your plan and invoices; statuses and proof of delivery come back without anyone typing them.',
      'If the job needs deep use of the phone or notifications all day, a [mobile app](/services/mobile-apps) may suit better — we’ll tell you which in the System Blueprint.',
    ],
    photo: {
      file: 'web-app-logistics-dispatch',
      alt: 'A dispatcher at a logistics yard checking the day’s jobs on a tablet beside a loaded truck.',
    },
  },

  features: {
    heading: 'What a web app does',
    intro: 'Five things a web app does better than calls, chats and spreadsheets.',
    items: [
      {
        label: 'Nothing to install',
        title: 'Opens anywhere, from a link.',
        body: '**A link that opens on any phone, tablet or computer**, can sit on the home screen and opens full screen. There’s one version to keep up to date, so every change reaches everyone at once — with no app-store review.',
        points: [
          'Works on phone, tablet and desktop',
          'Added to the home screen in a tap',
          'One version to keep up to date',
        ],
        caption: 'Added to the home screen from Safari, with nothing to install',
      },
      {
        label: 'One job, done well',
        title: 'Built around one job.',
        body: '**Booking a pickup, checking where a load is, downloading a proof of delivery** — nothing the user doesn’t need. Saved addresses and repeat loads turn a phone call into two taps.',
        points: [
          'Saved addresses and repeat loads',
          'Live job status',
          'Proof of delivery on demand',
        ],
        caption: 'Booking a repeat pickup from a link, in one tap',
      },
      {
        label: 'Connected',
        title: 'Connected to the business behind it.',
        body: '**Bookings go straight into your dispatch plan and invoices**, with no retyping. When something changes, the customer is told on their own.',
        points: [
          'Bookings into your dispatch plan',
          'Invoices made from the delivery',
          'Messages when something changes',
        ],
        caption: 'One booking, from the app to dispatch, invoice and the customer',
      },
      {
        label: 'Logins and roles',
        title: 'Everyone sees what’s theirs.',
        body: '**Each customer sees their own loads and statements; each driver sees their own jobs; your team sees what their role needs.** Sign-in is by a one-time code, so there’s no password to forget.',
        points: [
          'Sign-in by a one-time code',
          'Customers see only their own records',
          'Roles for your team',
        ],
        caption: 'Roles for dispatch, drivers and accounts, and each customer’s own login',
      },
      {
        label: 'Dispatch',
        title: 'Every job planned onto a route.',
        body: '**Confirmed jobs fall into tomorrow’s routes** by area and slot, so the yard loads in the right order and drivers leave with a plan, not a stack of messages.',
        points: [
          'Jobs grouped by vehicle, area and slot',
          'Loading lists in route order',
          'Deliveries marked from the driver’s phone, with a photo',
        ],
        caption: 'Tomorrow’s jobs, planned onto vehicles and slots',
      },
    ],
  },

  included: {
    heading: 'Web app features',
    intro: 'What a web app can include, chosen with you in the System Blueprint.',
    items: [
      {
        icon: 'devices',
        title: 'Any device',
        body: 'One app for phones, tablets and desktops.',
      },
      {
        icon: 'download',
        title: 'Add to home screen',
        body: 'It sits next to their other apps and opens full screen.',
      },
      {
        icon: 'key',
        title: 'Sign in with a code',
        body: 'A one-time code by email or phone — no passwords to forget.',
      },
      {
        icon: 'people',
        title: 'Roles',
        body: 'Customers see what’s theirs; your team sees what their role needs.',
      },
      {
        icon: 'repeat',
        title: 'Saved details',
        body: 'Saved addresses and repeat jobs turn a call into two taps.',
      },
      {
        icon: 'clock',
        title: 'Live status',
        body: 'Where an order, request or job stands, at any hour.',
      },
      {
        icon: 'rupee',
        title: 'Payments',
        body: 'Through a payment gateway; the gateway’s fees are its own.',
      },
      {
        icon: 'bell',
        title: 'Notifications',
        body: 'WhatsApp or email when something changes.',
      },
      {
        icon: 'file',
        title: 'Statements and invoices',
        body: 'Ready to download, so nobody has to ask.',
      },
      {
        icon: 'table',
        title: 'An admin for your team',
        body: 'Jobs, rates, vehicles and customers, managed in one place.',
      },
      {
        icon: 'plug',
        title: 'Connected',
        body: 'To your invoices, tracking and tools through their APIs.',
      },
      {
        icon: 'refresh',
        title: 'One version',
        body: 'Every change reaches everyone at once, with no app-store review.',
      },
    ],
  },

  compare: {
    heading: 'Web apps compared',
    intro: 'Where a web app fits, next to the other ways businesses take orders and requests.',
    us: 'A web app built for one job, and connected to the rest.',
    options: [
      {
        label: 'Calls and chats',
        note: 'Bookings by phone calls, texts and WhatsApp.',
        rows: [
          {
            topic: 'Booking',
            without: 'Pickups booked by calls and texts',
            with: 'Pickups booked in two taps, at any time',
          },
          {
            topic: 'Records',
            without: 'Jobs copied into a sheet',
            with: 'Jobs go straight to the plan',
          },
          {
            topic: 'Delivery updates',
            without: '“Where is my load?” calls',
            with: 'Status and delivery time sent on their own',
          },
          {
            topic: 'Statements',
            without: 'Statements made by hand',
            with: 'Statements downloaded by the customer',
          },
        ],
      },
      {
        label: 'A mobile app',
        note: 'An app from the App Store and Google Play.',
        rows: [
          {
            topic: 'Getting it',
            without: 'Downloaded from a store before it can be used',
            with: 'Opens from a link, on any device',
          },
          {
            topic: 'Building it',
            without: 'Two apps to build, for iOS and Android',
            with: 'One app for every device',
          },
          {
            topic: 'Updates',
            without: 'Updates wait for store review',
            with: 'Changes reach everyone at once',
          },
          {
            topic: 'Best for',
            without: 'Best for daily, phone-heavy use',
            with: 'Best for one clear job, now and then',
          },
        ],
      },
      {
        label: 'Online forms',
        note: 'A form on your website or a shared form link.',
        rows: [
          {
            topic: 'Details',
            without: 'The same details typed every time',
            with: 'Saved addresses and repeat loads',
          },
          {
            topic: 'What happened next',
            without: 'No way to see what happened next',
            with: 'Live status for every load and request',
          },
          {
            topic: 'Your data',
            without: 'Answers land in a sheet to sort by hand',
            with: 'Straight into your plan and invoices',
          },
          {
            topic: 'Access',
            without: 'Anyone with the link sees the same thing',
            with: 'Sign-in, and each customer sees only their own',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How a web app is built',
    blocks: [
      {
        icon: 'globe',
        title: 'Runs in the browser',
        body: 'One codebase for phone, tablet and desktop.',
      },
      {
        icon: 'download',
        title: 'Installable',
        body: 'It can be added to the home screen and opens full screen, like an app.',
      },
      {
        icon: 'lock',
        title: 'Logins and roles',
        body: 'Each customer or team member sees what’s theirs.',
      },
      {
        icon: 'plug',
        title: 'Connected',
        body: 'To your stock, invoices and tools through their [APIs](/services/api-integrations).',
      },
      {
        icon: 'refresh',
        title: 'One version',
        body: 'Changes go live for everyone at once, with nothing to download.',
      },
      {
        icon: 'server',
        title: 'Hosted and watched',
        body: 'Hosting, backups, monitoring and security updates on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    groups: [
      { name: 'Accounting', items: ['Tally', 'Zoho Books'] },
      { name: 'Payments', items: ['Razorpay'] },
      { name: 'Messaging', items: ['WhatsApp'] },
      { name: 'Data', items: ['Google Sheets'] },
    ],
  },

  industries: {
    heading: 'Who a web app is for',
    items: [
      {
        sector: 'Startups',
        text: 'A first product in the browser, on any device, without an app store.',
      },
      {
        sector: 'Education',
        text: 'Tests, homework and schedules that open from a link, on any phone.',
      },
      {
        sector: 'Professional Services',
        text: 'Client intake and document requests in one simple flow.',
      },
      {
        sector: 'Manufacturing',
        text: 'Dealer reordering and order status from any phone.',
      },
      {
        sector: 'Retail',
        text: 'Trade accounts for the shops you supply, with the usual order one tap away.',
      },
      {
        sector: 'Clinics',
        text: 'Forms patients fill on their own phone before the visit.',
      },
    ],
  },

  build: {
    heading: 'How we build a web app',
    steps: [
      {
        title: 'System Blueprint',
        body: 'The one job the app must do first, and what can wait.',
      },
      {
        title: 'Design',
        body: 'Screens for the people who’ll use it, tested on their phones.',
      },
      {
        title: 'Build and connect',
        body: 'The app, its admin, and the tools behind it.',
      },
      { title: 'Pilot', body: 'A few customers use it for real before everyone does.' },
      { title: 'Launch and Evolve', body: 'Each month, the next improvement.' },
    ],
  },

  price: {
    heading: 'Web app pricing',
    intro: 'Every web app starts with a System Blueprint, credited in full if you go ahead.',
    ...blueprintAndCustom({
      built: 'The web app built, tested and launched',
      summary: 'A web app for one job, with its admin, connected to your tools.',
      interest: 'web-apps',
    }),
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'Web app questions',
    items: [
      {
        question: 'How much does a web app cost?',
        answer:
          'It starts with a System Blueprint for ₹10,000, credited in full if you go ahead. Web apps are Custom, from ₹65,000, with a fixed quote for each phase.',
      },
      {
        question: 'Web app or mobile app?',
        answer:
          'If people use it now and then, or on many kinds of device, a web app is quicker to build and costs less. If it needs deep use of the phone or notifications all day, a mobile app may suit better. We’ll tell you which.',
      },
      {
        question: 'Can it work like an app on a phone?',
        answer: 'Yes. It can be added to the home screen and opens full screen, like an app.',
      },
      {
        question: 'Is a web app the same as a progressive web app (PWA)?',
        answer:
          'A progressive web app is a web app that can be installed on the home screen and opens full screen. That’s how we build them when it suits the job.',
      },
      {
        question: 'Can we start with a small first version?',
        answer:
          'Yes. The System Blueprint decides what the first version must do and what can wait.',
      },
      {
        question: 'Can people log in without a password?',
        answer: 'Yes, with a one-time code by email or phone, if that suits them.',
      },
      {
        question: 'Can it take payments?',
        answer: 'Yes, through a payment gateway. The gateway’s fees are its own.',
      },
      {
        question: 'Can it become a mobile app later?',
        answer:
          'Yes. If the need grows, a mobile app can run on the same system, so nothing is built twice.',
      },
      {
        question: 'Who hosts it?',
        answer: 'We do, on Evolve: hosting, backups, monitoring and security updates.',
      },
    ],
  },

  notes: [SAMPLE_NOTE],
};

export default page;
