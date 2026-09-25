import type { IconName } from '@/components/ui/icon';

import type { Heading } from './site';

/**
 * The words of every page beyond home: the three service groups, the fifteen services, Evolve and
 * the four solutions — word for word from "Pixel Kinetix — Remaining Pages: Content & Visuals"
 * (25 Sep 2026). Every price is one the published price list already carries. The pictures are in
 * `components/visuals/page-scenes.tsx`, keyed by the same slugs.
 *
 * A page that has to come down for a while is paused here (`paused: true`): out of the menus and
 * the sitemap, and `noindex` — never left thin.
 */

export type Faq = { question: string; answer: string };
/** A line with its mark: a problem, something we build, a chore we take away. */
export type Point = { icon: IconName; text: string };
/** One step of a flow strip. */
export type Step = { icon: IconName; label: string };

/** A price card, as the home page's Pricing draws them. `price` keeps its "From". */
export type PriceCard = {
  name: string;
  price: string;
  unit: string;
  timeline?: string;
  lines: string[];
  /** What the form preselects when the card's button is used. */
  interest: string;
  cta?: string;
  focal?: boolean;
};

export type Sector =
  | 'Retail'
  | 'Clinics'
  | 'Hospitality'
  | 'Real Estate'
  | 'Education'
  | 'Professional Services'
  | 'Startups'
  | 'Manufacturing';

type Seo = {
  /** The page's own words, primary keyword first; the layout adds " · Pixel Kinetix". */
  title: string;
  description: string;
  keyword: string;
  /** The lowest price the page states, for its Service data — per month where `monthly`. */
  from?: number;
  monthly?: boolean;
  paused?: boolean;
};

export type GroupSlug = 'digital-experiences' | 'business-systems' | 'automation-ai';

/** A group's tint — its Services card's — and the matching well and scene tone. */
export const GROUP_TINT: Record<GroupSlug, Tint> = {
  'digital-experiences': 'violet',
  'business-systems': 'sky',
  'automation-ai': 'mint',
};
export type Tint = 'violet' | 'sky' | 'mint' | 'butter' | 'blush';

export const BLUEPRINT: PriceCard = {
  name: 'System Blueprint',
  price: '₹10,000',
  unit: 'fixed fee',
  timeline: '1–2 weeks',
  lines: [
    'A map of how your business works',
    'A fixed quote for the build',
    'Credited in full if you go ahead',
  ],
  interest: 'blueprint',
  cta: 'Book a Blueprint',
};

const CUSTOM = (lines: string[]): PriceCard => ({
  name: 'Custom',
  price: 'From ₹65,000',
  unit: 'quoted in writing',
  lines,
  interest: 'custom',
  cta: 'Ask for a quote',
});

const CONNECTED = (lines: string[]): PriceCard => ({
  name: 'Connected Website',
  price: 'From ₹45,000',
  unit: 'one-time',
  timeline: '4–6 weeks',
  lines,
  interest: 'connected-website',
  focal: true,
});

// --- the service groups ---------------------------------------------------------------------

export type GroupPage = Seo & {
  slug: GroupSlug;
  chip: string;
  h1: string;
  intro: string;
  servicesHeading: string;
  built: { heading: string; body?: string; steps?: Step[]; points?: Point[] };
  prices: PriceCard[];
  priceNote?: string;
  faqs: Faq[];
  closing: Heading;
};

export const groupPages: GroupPage[] = [
  {
    slug: 'digital-experiences',
    title: 'Websites, Online Stores & Apps in Bangalore',
    description:
      'Business websites, online stores, customer portals, web apps and mobile apps, designed around your customers and connected to the rest of your business.',
    keyword: 'website and app development Bangalore',
    from: 12000,
    chip: 'Digital Experiences',
    h1: 'Websites, stores and apps, built around your customers.',
    intro:
      'Everything your customers see and use — websites, stores, portals and apps — designed around them and connected to the rest of your business.',
    servicesHeading: 'Five ways customers meet you',
    built: {
      heading: 'Built as one',
      body: 'A website on its own is a brochure. Ours send every enquiry, order and booking into one place, so your team sees it and can act on it.',
      steps: [
        { icon: 'globe', label: 'Customer visits' },
        { icon: 'cart', label: 'Enquires, books or buys' },
        { icon: 'dashboard', label: 'Lands on your dashboard' },
        { icon: 'whatsapp', label: 'WhatsApp and email go out on their own' },
      ],
    },
    prices: [
      {
        name: 'Website',
        price: '₹12,000',
        unit: 'one-time',
        timeline: '10–14 days',
        lines: ['Up to 6 pages, logo included'],
        interest: 'website',
      },
      CONNECTED(['Instant replies, booking and a lead dashboard']),
      {
        name: 'Store',
        price: '₹42,000',
        unit: 'one-time',
        timeline: '4–5 weeks',
        lines: ['Up to 50 products, payments and orders'],
        interest: 'store',
      },
    ],
    priceNote:
      'Portals, web apps and mobile apps are Custom, from ₹65,000, quoted after a System Blueprint.',
    faqs: [
      {
        question: 'Which one do I need?',
        answer:
          'Tell us what you want customers to do — enquire, book, buy or log in — and we’ll point you to the one that fits. Most businesses start with a Website or a Connected Website.',
      },
      {
        question: 'Can we start small and add more later?',
        answer:
          'Yes. Everything we build is part of one system, so a portal or an app can join your website later without starting again.',
      },
      {
        question: 'Do you build apps as well as websites?',
        answer:
          'Yes: web apps that run in the browser, and iOS and Android apps. The System Blueprint decides which one your customers need.',
      },
      {
        question: 'How long does it take?',
        answer:
          'A Website takes 10–14 days, a Connected Website 4–6 weeks and a Store 4–5 weeks, counted from the day your content is complete. Portals and apps are timed in their quote.',
      },
    ],
    closing: {
      lead: 'Where do your customers meet you today?',
      fill: 'We’ll make it work harder.',
    },
  },
  {
    slug: 'business-systems',
    title: 'Business Software & Dashboards in Bangalore',
    description:
      'Dashboards, admin panels, CRM-connected systems, custom business software and SaaS platforms, shaped around how your team actually works. From ₹65,000.',
    keyword: 'custom business software Bangalore',
    from: 65000,
    chip: 'Business Systems',
    h1: 'Software shaped around how your team works.',
    intro:
      'Dashboards, internal tools, CRM and custom software: the systems your team runs the business on, shaped around how it actually works.',
    servicesHeading: 'Five systems your team can run on',
    built: {
      heading: 'Built around how you work',
      body: 'We start by looking at how the work happens today — the spreadsheets, the WhatsApp groups, the registers — and build the system around that, not the other way round.',
      steps: [
        { icon: 'table', label: 'How you work today' },
        { icon: 'clipboard', label: 'System Blueprint' },
        { icon: 'layers', label: 'Built in phases' },
        { icon: 'trend', label: 'Evolve keeps it improving' },
      ],
    },
    prices: [
      { ...BLUEPRINT, lines: ['Credited in full if you go ahead'] },
      CUSTOM(['A fixed quote per phase']),
    ],
    priceNote: 'A lead dashboard already comes with the Connected Website.',
    faqs: [
      {
        question: 'Why do you start with a System Blueprint?',
        answer:
          'Because a fixed price needs a clear picture. In 1–2 weeks we map how you work and where it loses time, and hand you a phased plan and a fixed quote.',
      },
      {
        question: 'Can we move off Excel?',
        answer:
          'Yes. Moving off spreadsheets is one of the most common first steps, and your existing data comes across where it’s in a usable shape.',
      },
      {
        question: 'Do we have to replace the software we use?',
        answer: 'No. We connect what works and build only what’s missing.',
      },
      {
        question: 'How long does it take?',
        answer: 'Each phase has its own timeline, set in the fixed quote after the Blueprint.',
      },
    ],
    closing: {
      lead: 'Running the business on spreadsheets and chats?',
      fill: 'Let’s build the system it needs.',
    },
  },
  {
    slug: 'automation-ai',
    title: 'Business Automation & AI in Bangalore',
    description:
      'WhatsApp and email automation, booking and payment workflows, API integrations and AI assistants that take repeat work off your team, from ₹45,000.',
    keyword: 'business automation Bangalore',
    from: 45000,
    chip: 'Automation & AI',
    h1: 'Automation and AI that take the repeat work off your team.',
    intro:
      'WhatsApp and email automation, booking and payment workflows, integrations and AI: the work that should happen without anyone doing it.',
    servicesHeading: 'Five kinds of work that can run on their own',
    built: {
      heading: 'What it takes off your plate',
      points: [
        { icon: 'chat', text: 'Replying to every enquiry.' },
        { icon: 'bell', text: 'Sending reminders and follow-ups.' },
        { icon: 'rupee', text: 'Chasing payments.' },
        { icon: 'repeat', text: 'Copying data between tools.' },
        { icon: 'question', text: 'Answering the same questions again and again.' },
      ],
    },
    prices: [
      CONNECTED(['Instant WhatsApp and email replies', 'Online booking', 'A lead dashboard']),
      CUSTOM(['Larger automation and AI work', 'After a System Blueprint']),
    ],
    priceNote: 'A small one-off connection can be ₹700 an hour.',
    faqs: [
      {
        question: 'Do we need a new website for this?',
        answer:
          'No. Automation works with the website and tools you already have. A System Blueprint shows what’s worth automating first.',
      },
      {
        question: 'What do WhatsApp and AI cost to run?',
        answer:
          'Meta charges for some WhatsApp messages, and AI providers charge per use. Those are paid to the provider, not to us, and we estimate them upfront.',
      },
      {
        question: 'Is it safe to let AI answer customers?',
        answer:
          'Our assistants answer only from the information you give them, and hand over to a person when they aren’t sure. We test them on your real questions before launch.',
      },
      {
        question: 'Where should we start?',
        answer:
          'Usually with the replies and reminders your team types most. The Connected Website covers those; a System Blueprint finds the rest.',
      },
    ],
    closing: {
      lead: 'What does your team do again and again?',
      fill: 'Let’s make it run on its own.',
    },
  },
];

// --- the fifteen services ---------------------------------------------------------------------

export type ServicePage = Seo & {
  slug: string;
  group: GroupSlug;
  intro: string;
  problems: Point[];
  builds: Point[];
  steps: Step[];
  goodFor: Sector[] | 'all';
  prices: PriceCard[];
  priceNote?: string;
  faqs: Faq[];
  /** The solution that puts this service to work. */
  solution: string;
  closing: Heading;
};

const WEBSITE: PriceCard = {
  name: 'Website',
  price: '₹12,000',
  unit: 'one-time',
  timeline: '10–14 days',
  lines: ['Up to 6 pages', 'Logo included'],
  interest: 'website',
};

export const servicePages: ServicePage[] = [
  // Digital Experiences
  {
    slug: 'business-websites',
    group: 'digital-experiences',
    title: 'Business Website Design in Bangalore',
    description:
      'Fast, search-ready business websites from ₹12,000, or a Connected Website from ₹45,000 that answers every enquiry on WhatsApp as it arrives.',
    keyword: 'website design Bangalore',
    from: 12000,
    intro: 'Fast, search-ready websites designed around your customers.',
    problems: [
      {
        icon: 'phone',
        text: 'Enquiries arrive by phone, Instagram and email, and some are never answered.',
      },
      { icon: 'device', text: 'The site is hard to use on a phone.' },
      { icon: 'search', text: 'Nobody finds it on Google.' },
    ],
    builds: [
      { icon: 'device', text: 'Mobile-first design' },
      { icon: 'search', text: 'SEO setup: titles, meta, sitemap, schema' },
      { icon: 'chat', text: 'Enquiry form, WhatsApp and call buttons' },
      { icon: 'chart', text: 'Analytics' },
      { icon: 'file', text: 'Custom 404 page' },
      {
        icon: 'link',
        text: 'With the Connected Website: instant WhatsApp and email replies, online booking or callbacks, and a dashboard of every lead',
      },
    ],
    steps: [
      { icon: 'search', label: 'Someone finds you on Google' },
      { icon: 'globe', label: 'Reads and enquires' },
      {
        icon: 'mail',
        label: 'The enquiry reaches you: your inbox, or your dashboard and WhatsApp',
      },
      { icon: 'chat', label: 'You reply, or the system replies first' },
    ],
    goodFor: 'all',
    prices: [WEBSITE, CONNECTED(['Three months of Evolve included'])],
    faqs: [
      {
        question: 'Website or Connected Website: which do I need?',
        answer:
          'Need to be online quickly, choose the Website: proven layouts, up to 6 pages, in 10–14 days. Need every enquiry answered, choose the Connected Website: designed for your brand, with instant replies, booking and a lead dashboard.',
      },
      {
        question: 'Will my website show up on Google?',
        answer:
          'Every build includes SEO setup (titles, meta descriptions, a sitemap and schema), so Google can read and list your pages. Climbing higher for competitive searches takes ongoing SEO campaigns, which are not part of any package.',
      },
      {
        question: 'Do you need my content before you start?',
        answer:
          'For the Website, yes: content must be supplied in full before we start. For the Connected Website, we shape the content with you. Content writing is ₹900 a page.',
      },
    ],
    solution: 'never-miss-a-lead',
    closing: {
      lead: 'Want a website that answers every enquiry?',
      fill: 'Tell us about your business.',
    },
  },
  {
    slug: 'e-commerce-stores',
    group: 'digital-experiences',
    title: 'E-commerce Website Development Bangalore',
    description:
      'Online stores with payments, orders and stock that stay in sync. The Store package is ₹42,000 for up to 50 products, ready in 4–5 weeks.',
    keyword: 'ecommerce website development Bangalore',
    from: 42000,
    intro: 'Online stores with payments, orders and stock that stay in sync.',
    problems: [
      { icon: 'chat', text: 'Orders come in through DMs and get lost.' },
      { icon: 'database', text: 'Stock online and on the shelf don’t match.' },
      { icon: 'truck', text: 'Customers keep asking where their order is.' },
    ],
    builds: [
      { icon: 'store', text: 'In the Store package: a product catalogue of up to 50 products' },
      { icon: 'cart', text: 'Cart, checkout and payment gateway' },
      { icon: 'truck', text: 'Order and shipping setup' },
      { icon: 'check', text: 'Everything every build includes' },
      { icon: 'shield', text: 'A 45-day warranty' },
      {
        icon: 'plug',
        text: 'When you need more, as an E-commerce System (quoted): order updates on WhatsApp, stock synced with your billing software, larger catalogues',
      },
    ],
    steps: [
      { icon: 'search', label: 'Customer browses' },
      { icon: 'card', label: 'Pays at checkout' },
      { icon: 'database', label: 'Order and stock update' },
      { icon: 'chat', label: 'Customer gets an update' },
      { icon: 'truck', label: 'You pack and ship' },
    ],
    goodFor: ['Retail', 'Hospitality', 'Manufacturing'],
    prices: [
      {
        name: 'Store',
        price: '₹42,000',
        unit: 'one-time',
        timeline: '4–5 weeks',
        lines: ['Up to 50 products', 'Paid in three stages', 'Product descriptions ₹120 each'],
        interest: 'store',
        focal: true,
      },
      CUSTOM(['Larger or custom stores']),
    ],
    faqs: [
      {
        question: 'How many products can the store have?',
        answer: 'Up to 50 on the Store package. Larger catalogues are quoted as a custom store.',
      },
      {
        question: 'Which payment gateway do you use?',
        answer:
          'The one that suits your business, and we set it up. The gateway’s own fees are charged by the gateway.',
      },
      {
        question: 'Can you write the product descriptions?',
        answer: 'Yes, for ₹120 per product. It’s optional.',
      },
    ],
    solution: 'sell-and-book-online',
    closing: { lead: 'Ready to sell online?', fill: 'Tell us what you sell and how you ship.' },
  },
  {
    slug: 'customer-portals',
    group: 'digital-experiences',
    title: 'Customer Portal Development in Bangalore',
    description:
      'A private, branded space where your customers log in to see orders, bookings, invoices and documents, so your team answers fewer “any update?” calls.',
    keyword: 'customer portal development',
    from: 65000,
    intro: 'A private space where customers see orders, bookings and documents.',
    problems: [
      { icon: 'phone', text: 'Customers call or message only to ask for an update.' },
      { icon: 'file', text: 'Documents and invoices are sent again and again on WhatsApp.' },
      { icon: 'layers', text: 'Nothing is in one place for the customer.' },
    ],
    builds: [
      { icon: 'key', text: 'Secure login' },
      { icon: 'tasks', text: 'Orders, bookings and their status' },
      { icon: 'receipt', text: 'Invoices and payments' },
      { icon: 'file', text: 'Documents and files' },
      { icon: 'chat', text: 'Requests to your team' },
      { icon: 'pen', text: 'Your branding throughout' },
    ],
    steps: [
      { icon: 'key', label: 'Customer logs in' },
      { icon: 'eye', label: 'Sees status, files and invoices' },
      { icon: 'chat', label: 'Raises a request' },
      { icon: 'people', label: 'Your team picks it up in the admin' },
    ],
    goodFor: ['Professional Services', 'Education', 'Real Estate', 'Manufacturing'],
    prices: [BLUEPRINT, CUSTOM(['Quoted after a System Blueprint'])],
    faqs: [
      {
        question: 'Is it like your own client portal?',
        answer:
          'Yes, the same idea. Every Pixel Kinetix client follows their project in a portal; we build one for your customers, around your business.',
      },
      {
        question: 'How do customers log in?',
        answer:
          'By email or phone number, whichever suits them. Email codes cost nothing to send; SMS and WhatsApp codes are charged per message by the provider, paid by you, and we estimate them upfront.',
      },
      {
        question: 'Can it connect to the software we already use?',
        answer:
          'Yes, where that software has an API or an export. We check this in the System Blueprint.',
      },
    ],
    solution: 'run-it-in-one-place',
    closing: { lead: 'Tired of “any update?” calls?', fill: 'Let’s give your customers a portal.' },
  },
  {
    slug: 'web-apps',
    group: 'digital-experiences',
    title: 'Web App Development in Bangalore',
    description:
      'App-like tools that run in any browser, on phone or desktop, with no app store needed: booking tools, calculators, order systems and team apps.',
    keyword: 'web app development Bangalore',
    from: 65000,
    intro: 'App-like tools that run in the browser. No app store needed.',
    problems: [
      { icon: 'file', text: 'A process lives on paper, in forms or in messages.' },
      { icon: 'device', text: 'An app-store app would be slow and costly for what you need.' },
      { icon: 'devices', text: 'Your people use different devices.' },
    ],
    builds: [
      { icon: 'devices', text: 'Works in any browser, phone to desktop' },
      { icon: 'apps', text: 'Can be added to the home screen and opens full screen' },
      { icon: 'key', text: 'Logins and roles' },
      { icon: 'plug', text: 'Connected to your data and tools' },
      { icon: 'shield', text: 'Hosted, backed up and monitored on Evolve' },
    ],
    steps: [
      { icon: 'bulb', label: 'Your idea' },
      { icon: 'clipboard', label: 'System Blueprint' },
      { icon: 'rocket', label: 'First version' },
      { icon: 'trend', label: 'Used, measured, improved' },
    ],
    goodFor: ['Startups', 'Education', 'Professional Services', 'Manufacturing'],
    prices: [BLUEPRINT, CUSTOM(['Quoted after a System Blueprint'])],
    faqs: [
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
        question: 'Can we start with a small first version?',
        answer:
          'Yes. The System Blueprint decides what the first version must do and what can wait.',
      },
    ],
    solution: 'run-it-in-one-place',
    closing: {
      lead: 'Got a process that should be an app?',
      fill: 'Tell us how it works today.',
    },
  },
  {
    slug: 'mobile-apps',
    group: 'digital-experiences',
    title: 'Mobile App Development in Bangalore',
    description:
      'iOS and Android apps for your customers or your team, connected to your website, payments and data, and published on the App Store and Google Play.',
    keyword: 'mobile app development Bangalore',
    from: 65000,
    intro: 'iOS and Android apps for your customers or your team.',
    problems: [
      {
        icon: 'device',
        text: 'Customers want to order or book from their phone, again and again.',
      },
      { icon: 'pin', text: 'Your team works in the field, away from a desk.' },
      { icon: 'bell', text: 'You want to reach people with notifications on their phone.' },
    ],
    builds: [
      { icon: 'device', text: 'iOS and Android apps' },
      { icon: 'bell', text: 'Login, profiles and notifications' },
      { icon: 'calendar', text: 'Orders, bookings or field work, as your business needs' },
      { icon: 'plug', text: 'Connected to your website and data' },
      { icon: 'upload', text: 'Published on the App Store and Google Play' },
    ],
    steps: [
      { icon: 'clipboard', label: 'System Blueprint' },
      { icon: 'pen', label: 'Screens designed' },
      { icon: 'code', label: 'Built and tested' },
      { icon: 'upload', label: 'Published' },
      { icon: 'shield', label: 'Evolve' },
    ],
    goodFor: ['Retail', 'Hospitality', 'Education', 'Startups'],
    prices: [BLUEPRINT, CUSTOM(['Quoted after a System Blueprint'])],
    faqs: [
      {
        question: 'Do we need both iOS and Android?',
        answer:
          'Most businesses do. We usually build both from one codebase, so it costs less than two separate apps.',
      },
      {
        question: 'Whose account is the app published under?',
        answer:
          'Yours. It goes out under your own App Store and Google Play accounts, so the app stays yours. The stores’ own fees are paid to Apple and Google.',
      },
      {
        question: 'Do we need a website too?',
        answer:
          'Most businesses do: people find you on Google, then download the app. We connect both to the same system.',
      },
    ],
    solution: 'sell-and-book-online',
    closing: {
      lead: 'Want your business on their home screen?',
      fill: 'Tell us who the app is for.',
    },
  },

  // Business Systems
  {
    slug: 'dashboards',
    group: 'business-systems',
    title: 'Business Dashboards in Bangalore',
    description:
      'Leads, bookings, payments and performance in one live view, fed straight from your website, WhatsApp and tools, with daily summaries. From ₹65,000.',
    keyword: 'business dashboard development',
    from: 65000,
    intro: 'Leads, bookings, payments and performance in one live view.',
    problems: [
      {
        icon: 'table',
        text: 'Numbers live in five places, and someone compiles them by hand.',
      },
      { icon: 'clock', text: 'You hear about a problem at month-end.' },
      { icon: 'people', text: 'Each person works from a different version.' },
    ],
    builds: [
      { icon: 'dashboard', text: 'One live view of leads, bookings and payments' },
      { icon: 'filter', text: 'Filters by date, branch or person' },
      { icon: 'key', text: 'Team roles and access' },
      { icon: 'mail', text: 'Daily summaries on email or WhatsApp' },
      { icon: 'download', text: 'Exports and reports' },
    ],
    steps: [
      { icon: 'apps', label: 'Your tools' },
      { icon: 'plug', label: 'Connected' },
      { icon: 'dashboard', label: 'The dashboard updates on its own' },
      { icon: 'mail', label: 'A daily summary reaches you' },
    ],
    goodFor: ['Clinics', 'Real Estate', 'Education', 'Retail'],
    prices: [
      CONNECTED(['A lead dashboard included']),
      CUSTOM(['A full business dashboard', 'After a System Blueprint']),
    ],
    faqs: [
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
    ],
    solution: 'run-it-in-one-place',
    closing: { lead: 'Still adding it up by hand?', fill: 'Let’s put it in one view.' },
  },
  {
    slug: 'internal-tools',
    group: 'business-systems',
    title: 'Admin Panel & Internal Tool Development',
    description:
      'Admin panels and internal tools shaped around how your team works: approvals, stock, tasks and records in one place, instead of spreadsheets and chats.',
    keyword: 'admin panel development',
    from: 65000,
    intro: 'Tools shaped around how your team actually works.',
    problems: [
      { icon: 'table', text: 'The team runs on spreadsheets that break.' },
      { icon: 'chat', text: 'Approvals get stuck in WhatsApp chats.' },
      { icon: 'person', text: 'Only one person knows how the process works.' },
    ],
    builds: [
      { icon: 'window', text: 'Screens for the tasks your team does every day' },
      { icon: 'tasks', text: 'Approvals and status tracking' },
      { icon: 'key', text: 'Roles and access' },
      { icon: 'search', text: 'Records you can search' },
      { icon: 'bell', text: 'Alerts when something needs a person' },
      { icon: 'table', text: 'Your spreadsheet data moved across' },
    ],
    steps: [
      { icon: 'clipboard', label: 'Map the task' },
      { icon: 'pen', label: 'Design the screens' },
      { icon: 'code', label: 'Build' },
      { icon: 'people', label: 'Your team uses it' },
      { icon: 'trend', label: 'It improves every month on Evolve' },
    ],
    goodFor: ['Manufacturing', 'Education', 'Hospitality', 'Professional Services'],
    prices: [BLUEPRINT, CUSTOM(['Quoted after a System Blueprint'])],
    faqs: [
      {
        question: 'Can you bring our spreadsheet data across?',
        answer: 'Yes, where it’s in a usable shape. We check it during the System Blueprint.',
      },
      {
        question: 'Will my team find it easy to use?',
        answer: 'It’s built around the way they already work, so there is less to learn.',
      },
      {
        question: 'Can it grow as we do?',
        answer: 'Yes. It’s built in phases, and Evolve adds improvements every month.',
      },
    ],
    solution: 'run-it-in-one-place',
    closing: {
      lead: 'Is a spreadsheet running your business?',
      fill: 'Let’s build the tool it should be.',
    },
  },
  {
    slug: 'crm-systems',
    group: 'business-systems',
    title: 'CRM Integration & Custom CRM in Bangalore',
    description:
      'Your website, WhatsApp, calls and team feeding one customer record: in the CRM you already use, or a simple one built around how you sell.',
    keyword: 'CRM integration Bangalore',
    from: 65000,
    intro: 'Your website, WhatsApp and team feeding one customer record.',
    problems: [
      { icon: 'chat', text: 'Leads are scattered across WhatsApp, calls and email.' },
      { icon: 'clock', text: 'Follow-ups depend on someone remembering.' },
      { icon: 'history', text: 'Nobody knows the full history with a customer.' },
    ],
    builds: [
      { icon: 'database', text: 'Every enquiry into one customer record' },
      { icon: 'plug', text: 'Connected to your website, WhatsApp and email' },
      { icon: 'userShare', text: 'Leads routed to the right person' },
      { icon: 'bell', text: 'Follow-up reminders' },
      { icon: 'people', text: 'Your existing CRM, or a simple one built for you' },
      { icon: 'chart', text: 'Reports on where leads come from' },
    ],
    steps: [
      { icon: 'mail', label: 'Enquiry arrives' },
      { icon: 'database', label: 'Record created' },
      { icon: 'userShare', label: 'Routed to a person' },
      { icon: 'bell', label: 'Reminders until it’s closed' },
      { icon: 'chart', label: 'Reported' },
    ],
    goodFor: ['Real Estate', 'Education', 'Clinics', 'Professional Services'],
    prices: [
      {
        name: 'Lead Follow-up Automation',
        price: 'Quoted',
        unit: 'in writing',
        lines: ['Lead routing', 'Follow-up reminders'],
        interest: 'lead-follow-up',
        cta: 'Ask for a quote',
      },
      CUSTOM(['A CRM build or integration']),
    ],
    faqs: [
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
    ],
    solution: 'never-miss-a-lead',
    closing: { lead: 'Losing track of leads?', fill: 'Let’s give every customer one record.' },
  },
  {
    slug: 'custom-software',
    group: 'business-systems',
    title: 'Custom Software Development in Bangalore',
    description:
      'Software built around your process, not the other way round. It starts with a ₹10,000 System Blueprint and a fixed quote, and is built in phases.',
    keyword: 'custom software development Bangalore',
    from: 65000,
    intro: 'Software built around your process, not the other way round.',
    problems: [
      { icon: 'wrench', text: 'Off-the-shelf software makes you change how you work.' },
      { icon: 'apps', text: 'You pay for five tools that don’t talk to each other.' },
      { icon: 'target', text: 'Your process is your edge, and no product fits it.' },
    ],
    builds: [
      { icon: 'clipboard', text: 'A System Blueprint first: your process, mapped' },
      { icon: 'layers', text: 'Software built in phases, each one usable' },
      { icon: 'plug', text: 'Connected to the tools you keep' },
      { icon: 'lock', text: 'Roles, security and daily backups' },
      { icon: 'shield', text: 'Evolve after launch' },
    ],
    steps: [
      { icon: 'clipboard', label: 'System Blueprint' },
      { icon: 'rocket', label: 'Phase one live' },
      { icon: 'chat', label: 'Your feedback' },
      { icon: 'layers', label: 'The next phase' },
    ],
    goodFor: ['Manufacturing', 'Professional Services', 'Education', 'Startups'],
    prices: [BLUEPRINT, CUSTOM(['A fixed quote per phase', 'A 45-day warranty'])],
    faqs: [
      {
        question: 'How can you fix a price for something new?',
        answer:
          'With a System Blueprint. In 1–2 weeks we map how you work and what the software must do, then give you a fixed quote for each phase.',
      },
      {
        question: 'Who owns the code?',
        answer:
          'You own the code written for you once it’s paid for in full. Our shared building blocks are licensed to you for good.',
      },
      {
        question: 'What if we need changes after launch?',
        answer:
          'Evolve covers a set number of changes every month. Bigger additions are quoted as a new phase.',
      },
    ],
    solution: 'run-it-in-one-place',
    closing: { lead: 'Your process is your edge.', fill: 'Let’s build software around it.' },
  },
  {
    slug: 'business-platforms',
    group: 'business-systems',
    title: 'SaaS & Platform Development in Bangalore',
    description:
      'Multi-team platforms and software products built to scale, from a first version customers can use to a product you can sell. Starts with a Blueprint.',
    keyword: 'SaaS development Bangalore',
    from: 65000,
    intro: 'Multi-team platforms and software products, built to scale.',
    problems: [
      { icon: 'bulb', text: 'You have a product idea but no tech team.' },
      {
        icon: 'people',
        text: 'A platform must serve many teams or customers, each with their own data.',
      },
      { icon: 'rocket', text: 'The first version has to be real enough to sell.' },
    ],
    builds: [
      { icon: 'clipboard', text: 'A first version, scoped in a System Blueprint' },
      { icon: 'lock', text: 'Accounts for many teams or customers, each kept separate' },
      { icon: 'card', text: 'Subscriptions and payments' },
      { icon: 'dashboard', text: 'An admin for your team' },
      { icon: 'trend', text: 'Built to grow in phases' },
    ],
    steps: [
      { icon: 'clipboard', label: 'System Blueprint' },
      { icon: 'rocket', label: 'First version' },
      { icon: 'people', label: 'First customers' },
      { icon: 'layers', label: 'The next phases' },
    ],
    goodFor: ['Startups'],
    prices: [BLUEPRINT, CUSTOM(['Starting with a System Blueprint'])],
    faqs: [
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
    ],
    solution: 'run-it-in-one-place',
    closing: { lead: 'Building a product?', fill: 'Let’s plan the first version.' },
  },

  // Automation & AI
  {
    slug: 'whatsapp-automation',
    group: 'automation-ai',
    title: 'WhatsApp Business Automation in Bangalore',
    description:
      'Instant WhatsApp and email replies, reminders and follow-ups on the official WhatsApp Business Platform, so no enquiry waits. Part of the Connected Website.',
    keyword: 'WhatsApp automation for business',
    from: 45000,
    intro: 'Instant replies, reminders and follow-ups without anyone typing them.',
    problems: [
      { icon: 'clock', text: 'Enquiries after hours wait until morning.' },
      { icon: 'bell', text: 'Reminders and follow-ups depend on someone remembering.' },
      { icon: 'repeat', text: 'The same messages are typed again and again.' },
    ],
    builds: [
      { icon: 'chat', text: 'Instant replies to every enquiry' },
      { icon: 'bell', text: 'Reminders for bookings and payments' },
      { icon: 'userCheck', text: 'Follow-ups that stop once the customer replies' },
      { icon: 'people', text: 'Team alerts for new leads' },
      {
        icon: 'whatsapp',
        text: 'Message templates approved for the WhatsApp Business Platform',
      },
      { icon: 'mail', text: 'Email copies for your records' },
    ],
    steps: [
      { icon: 'mail', label: 'Enquiry arrives' },
      { icon: 'whatsapp', label: 'Reply goes out on WhatsApp and email' },
      { icon: 'bell', label: 'Your team is alerted' },
      { icon: 'calendar', label: 'A follow-up is scheduled' },
    ],
    goodFor: ['Clinics', 'Real Estate', 'Education', 'Hospitality'],
    prices: [CONNECTED(['Instant WhatsApp and email replies included'])],
    priceNote: 'For your existing website or CRM: quoted in writing.',
    faqs: [
      {
        question: 'Is this the official WhatsApp?',
        answer:
          'Yes. We use the official WhatsApp Business Platform through an approved provider, and connect it to your website, CRM, payments and email.',
      },
      {
        question: 'Will messages come from our own number?',
        answer: 'Yes, from your business’s own number, set up on the WhatsApp Business Platform.',
      },
      {
        question: 'What does WhatsApp charge?',
        answer:
          'Meta charges for some messages. It’s paid to the provider, not to us, and we estimate it for you upfront.',
      },
      {
        question: 'Can our team still reply by hand?',
        answer:
          'Yes. Automation sends the first reply and the reminders; your team takes over whenever a conversation needs a person.',
      },
    ],
    solution: 'never-miss-a-lead',
    closing: {
      lead: 'How long does an enquiry wait today?',
      fill: 'Let’s make the reply instant.',
    },
  },
  {
    slug: 'booking-payment-workflows',
    group: 'automation-ai',
    title: 'Online Booking & Payment Systems, Bangalore',
    description:
      'Customers book and pay online on their own. Confirmations and reminders go out on WhatsApp, and missed appointments get a follow-up. From ₹45,000.',
    keyword: 'online booking system for business',
    from: 45000,
    intro: 'Customers book and pay themselves; confirmations go out on their own.',
    problems: [
      { icon: 'phone', text: 'Booking by phone ties up your front desk.' },
      { icon: 'calendar', text: 'No-shows cost you the slot.' },
      { icon: 'rupee', text: 'Payments are chased by hand.' },
    ],
    builds: [
      { icon: 'calendar', text: 'Online booking' },
      { icon: 'whatsapp', text: 'Confirmations and reminders on WhatsApp' },
      { icon: 'card', text: 'Optional payment at booking' },
      { icon: 'refresh', text: 'Calendar integration where required' },
      { icon: 'bell', text: 'No-show follow-ups' },
      { icon: 'receipt', text: 'Payment links and payment reminders' },
    ],
    steps: [
      { icon: 'calendar', label: 'Customer picks a slot' },
      { icon: 'card', label: 'Pays, if you ask them to' },
      { icon: 'whatsapp', label: 'Confirmation on WhatsApp' },
      { icon: 'bell', label: 'Reminder before the visit' },
      { icon: 'repeat', label: 'Follow-up if it’s missed' },
    ],
    goodFor: ['Clinics', 'Hospitality', 'Education', 'Professional Services'],
    prices: [
      CONNECTED(['Online booking included']),
      {
        name: 'Booking & Appointment System',
        price: 'Quoted',
        unit: 'in writing',
        lines: ['With payments'],
        interest: 'booking-system',
        cta: 'Ask for a quote',
      },
    ],
    faqs: [
      {
        question: 'Can it sync with Google Calendar?',
        answer:
          'Yes, where you need it to. Calendar integration is part of the Booking & Appointment System.',
      },
      {
        question: 'Can customers pay when they book?',
        answer: 'Yes, if you want them to. The payment gateway’s fees are its own.',
      },
      {
        question: 'Can you send payment reminders for invoices too?',
        answer:
          'Yes. Payment links and reminders go out on WhatsApp and email until the invoice is paid.',
      },
    ],
    solution: 'sell-and-book-online',
    closing: { lead: 'Still booking by phone?', fill: 'Let customers book themselves.' },
  },
  {
    slug: 'api-integrations',
    group: 'automation-ai',
    title: 'API Integration Services in Bangalore',
    description:
      'Payments, CRM, accounting and Google Workspace talking to each other, so data is entered once and reaches every tool that needs it. Monitored on Evolve.',
    keyword: 'API integration services',
    intro: 'Payments, CRM, accounting and Google Workspace, talking to each other.',
    problems: [
      { icon: 'repeat', text: 'The same data is typed into three tools.' },
      { icon: 'question', text: 'Tools disagree, and nobody knows which is right.' },
      { icon: 'alert', text: 'Small errors slip in when data is copied by hand.' },
    ],
    builds: [
      { icon: 'plug', text: 'Connections between the tools you use' },
      { icon: 'refresh', text: 'Data entered once, synced everywhere' },
      { icon: 'bell', text: 'Checks and alerts when a sync fails' },
      { icon: 'history', text: 'A log of what moved and when' },
      { icon: 'shield', text: 'Monitored on Evolve' },
    ],
    steps: [
      { icon: 'apps', label: 'Something happens in one tool' },
      { icon: 'plug', label: 'The connection picks it up' },
      { icon: 'layers', label: 'It lands in the others' },
      { icon: 'bell', label: 'You’re alerted if anything fails' },
    ],
    goodFor: 'all',
    prices: [
      {
        name: 'Custom',
        price: 'Quoted',
        unit: 'in writing',
        lines: ['Connections between your tools', 'Monitored on Evolve'],
        interest: 'custom',
        cta: 'Ask for a quote',
      },
    ],
    priceNote: 'A small one-off connection can be ₹700 an hour.',
    faqs: [
      {
        question: 'Which tools can you connect?',
        answer:
          'Most tools with an API: payment gateways, CRMs, accounting software, Google Workspace and more.',
      },
      {
        question: 'What if a tool has no API?',
        answer: 'We look for exports, webhooks or email. If there’s no reliable way, we tell you.',
      },
      {
        question: 'What happens if a connection breaks?',
        answer: 'You’re alerted. On an Evolve plan we fix it within your plan’s response time.',
      },
    ],
    solution: 'run-it-in-one-place',
    closing: { lead: 'Typing the same thing twice?', fill: 'Let’s connect your tools.' },
  },
  {
    slug: 'ai-assistants',
    group: 'automation-ai',
    title: 'AI Assistant for Business in Bangalore',
    description:
      'An AI assistant that answers customers on your website or WhatsApp from your business’s own information, and hands over to your team when it should.',
    keyword: 'AI chatbot for business',
    from: 65000,
    intro: 'An assistant that answers customers using your business’s own information.',
    problems: [
      {
        icon: 'question',
        text: 'The same questions arrive all day: prices, timings, availability.',
      },
      { icon: 'clock', text: 'After hours, nobody answers.' },
      { icon: 'repeat', text: 'Your team loses time on questions a page already answers.' },
    ],
    builds: [
      {
        icon: 'book',
        text: 'Answers from your own information: services, prices, timings, policies',
      },
      { icon: 'whatsapp', text: 'On your website and WhatsApp' },
      { icon: 'userCheck', text: 'Hands over to a person when it should' },
      { icon: 'database', text: 'Saves the lead with the conversation' },
      { icon: 'eye', text: 'Every conversation visible to you' },
    ],
    steps: [
      { icon: 'chat', label: 'Customer asks' },
      { icon: 'spark', label: 'The assistant answers from your information' },
      { icon: 'userCheck', label: 'Hands over if needed' },
      { icon: 'database', label: 'The lead is saved' },
    ],
    goodFor: ['Clinics', 'Education', 'Real Estate', 'Hospitality'],
    prices: [BLUEPRINT, CUSTOM(['After a System Blueprint'])],
    faqs: [
      {
        question: 'Will it make things up?',
        answer:
          'It’s set up to answer only from the information you give it, and to hand over to a person when it isn’t sure. We test it on your real questions before launch.',
      },
      {
        question: 'What does it cost to run?',
        answer:
          'AI providers charge per use. It’s paid to the provider, and we estimate it upfront.',
      },
      {
        question: 'Can it book appointments?',
        answer: 'Yes. Connected to your booking system, it can offer free slots and book them.',
      },
    ],
    solution: 'never-miss-a-lead',
    closing: {
      lead: 'Answering the same questions all day?',
      fill: 'Let an assistant take the first reply.',
    },
  },
  {
    slug: 'ai-workflows',
    group: 'automation-ai',
    title: 'AI Workflow Automation in Bangalore',
    description:
      'AI that reads documents, enters data and flags what needs attention, with a person checking before anything is final. Your team decides; AI types.',
    keyword: 'AI workflow automation',
    from: 65000,
    intro: 'AI that reads documents, enters data and spots what needs attention.',
    problems: [
      { icon: 'file', text: 'Invoices, forms and documents are typed in by hand.' },
      { icon: 'mail', text: 'Important emails get buried.' },
      { icon: 'eye', text: 'Patterns show only when someone has time to look.' },
    ],
    builds: [
      { icon: 'scan', text: 'Documents read and data entered: invoices, forms, emails' },
      { icon: 'userCheck', text: 'A person approves before anything is final' },
      { icon: 'bell', text: 'Alerts when something needs attention' },
      { icon: 'file', text: 'Summaries of what changed' },
      { icon: 'plug', text: 'Connected to your tools' },
    ],
    steps: [
      { icon: 'file', label: 'Document arrives' },
      { icon: 'fileSpark', label: 'AI reads it' },
      { icon: 'userCheck', label: 'A person checks' },
      { icon: 'database', label: 'Data lands in your system' },
      { icon: 'mail', label: 'You get a summary' },
    ],
    goodFor: ['Professional Services', 'Manufacturing', 'Real Estate', 'Education'],
    prices: [BLUEPRINT, CUSTOM(['After a System Blueprint'])],
    faqs: [
      {
        question: 'What kind of work suits AI?',
        answer: 'Repetitive reading and typing: invoices, forms, emails, documents.',
      },
      {
        question: 'How accurate is it?',
        answer:
          'It depends on your documents, so we test it on real samples before your team relies on it, and a person approves the results.',
      },
      {
        question: 'Will it replace my team?',
        answer: 'No. It takes the typing off them; the decisions stay with people.',
      },
    ],
    solution: 'run-it-in-one-place',
    closing: { lead: 'Drowning in paperwork?', fill: 'Let AI do the reading.' },
  },
];

// --- Evolve -------------------------------------------------------------------------------------

export const evolvePage = {
  title: 'Evolve: Hosting & Maintenance Plans',
  description:
    'Hosting, SSL, backups, monitoring, security updates and monthly changes for everything we build. Evolve plans from ₹899 a month; two months free yearly.',
  keyword: 'website maintenance plans Bangalore',
  from: 899,
  monthly: true,
  chip: 'Services',
  intro: 'Hosting, security, backups, monitoring and monthly improvements for everything we build.',
  why: {
    heading: 'Launch is where it starts',
    body: 'A system left alone after launch falls behind the business. Evolve keeps it moving: a set number of changes every month, and someone watching that it stays up and safe.',
  },
  includes: [
    { icon: 'server', text: 'Hosting, SSL and CDN' },
    { icon: 'database', text: 'Daily backups' },
    { icon: 'gauge', text: 'Uptime monitoring' },
    { icon: 'shield', text: 'Security updates' },
    { icon: 'pen', text: 'Content changes every month' },
    { icon: 'chat', text: 'Technical support' },
  ] satisfies Point[],
  terms: {
    heading: 'The terms',
    body: 'Three months minimum, then monthly. Cancel with 30 days’ notice. You own your domain and your content, always, and get a full export within 10 working days if you leave. Hosting is included in all three plans.',
  },
  faqs: [
    {
      question: 'What counts as one content change?',
      answer:
        'One content change is one set of edits, sent together, to one page. Five staff photos on one page is one change. Three different pages is three changes. A brand-new page is quoted separately.',
    },
    {
      question: 'Is hosting included?',
      answer:
        'Yes, in all three Evolve plans. The Connected Website comes with its first three months of Evolve.',
    },
    {
      question: 'Can you look after a site you didn’t build?',
      answer:
        'Yes. Moving an existing site to us costs ₹5,000 to ₹12,000; after that it joins an Evolve plan like any other.',
    },
    {
      question: 'What does Evolve not cover?',
      answer:
        'Brand-new pages and new features, which are quoted separately, and third-party fees, which are paid at cost.',
    },
    {
      question: 'What happens if I leave?',
      answer:
        'You own your domain and your content. We hand over a full export within 10 working days.',
    },
  ] satisfies Faq[],
  closing: {
    lead: 'Launched something that’s standing still?',
    fill: 'Let’s keep it improving.',
  } satisfies Heading,
};

// --- the four solutions -------------------------------------------------------------------------

/** One way into a solution: a card listing what it includes. */
export type Way = {
  /** Its own heading (an H2), when the section has none. */
  heading?: string;
  name: string;
  intro?: string;
  lines: string[];
  price?: string;
  timeline?: string;
  note?: string;
  interest: string;
  cta?: string;
  href?: string;
  focal?: boolean;
};

export type SolutionPage = Seo & {
  slug: string;
  intro: string;
  tint: Tint;
  problem: { heading: string; points: Point[] };
  ways: { heading?: string; cards: Way[] };
  steps: Step[];
  extras?: { heading: string; body: string }[];
  prices?: PriceCard[];
  priceNote?: string;
  goodFor: Sector[] | 'all';
  faqs: Faq[];
  /** The services it is built from, by anchor — each linked from the page. */
  services: string[];
  closing: Heading;
};

export const solutionPages: SolutionPage[] = [
  {
    slug: 'never-miss-a-lead',
    title: 'Connected Website: Never Miss a Lead',
    description:
      'The Connected Website catches every enquiry from your site, ads and WhatsApp, replies instantly and tracks every lead on one dashboard. From ₹45,000.',
    keyword: 'website with WhatsApp integration',
    from: 45000,
    intro:
      'We catch every enquiry: from your website, your ads and WhatsApp, answered at once and tracked until it’s closed.',
    tint: 'mint',
    problem: {
      heading: 'Where leads go missing',
      points: [
        { icon: 'phone', text: 'Calls after hours ring out.' },
        { icon: 'chat', text: 'DMs and WhatsApp messages get buried.' },
        { icon: 'clock', text: 'Follow-ups depend on someone remembering.' },
      ],
    },
    ways: {
      cards: [
        {
          heading: 'The Connected Website',
          name: 'Connected Website',
          lines: [
            'Designed from scratch for your brand',
            'Three revision rounds',
            'Enquiries from your site, ads and WhatsApp in one place',
            'Instant WhatsApp and email replies',
            'Online booking or callbacks',
            'Team alerts',
            'A dashboard of every lead and its status',
            'Three months of Evolve',
          ],
          price: 'From ₹45,000',
          timeline: '4–6 weeks',
          interest: 'connected-website',
          cta: 'Start with the Connected Website',
          focal: true,
        },
        {
          heading: 'Already have a website?',
          name: 'Lead Follow-up Automation',
          intro: 'Lead Follow-up Automation adds the system to the site you have:',
          lines: [
            'Lead routing',
            'Follow-up reminders',
            'WhatsApp message templates',
            'CRM sync',
            'Conversion tracking',
          ],
          price: 'Quoted in writing',
          interest: 'lead-follow-up',
          cta: 'Ask for a quote',
        },
      ],
    },
    steps: [
      { icon: 'globe', label: 'Enquiry: site, ads, WhatsApp' },
      { icon: 'chat', label: 'Instant reply: WhatsApp and email' },
      { icon: 'phone', label: 'Team alert' },
      { icon: 'dashboard', label: 'Lead on your dashboard' },
      { icon: 'check', label: 'Reminders until it’s closed' },
    ],
    extras: [
      {
        heading: 'What your dashboard shows',
        body: 'Every lead, where it came from, its status and who is on it.',
      },
    ],
    goodFor: ['Clinics', 'Real Estate', 'Education', 'Professional Services'],
    faqs: [
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
        question: 'Do you need my content before you start?',
        answer: 'No. For the Connected Website, we shape the content with you.',
      },
      {
        question: 'What happens after the three months of Evolve?',
        answer:
          'You choose an Evolve plan to carry on, from ₹899 a month. If you’d rather not, you get a full export of your site and content within 10 working days.',
      },
    ],
    services: [
      'business-websites',
      'whatsapp-automation',
      'crm-systems',
      'dashboards',
      'ai-assistants',
    ],
    closing: {
      lead: 'How many enquiries went unanswered last month?',
      fill: 'Let’s catch the next one.',
    },
  },
  {
    slug: 'sell-and-book-online',
    title: 'Sell & Take Bookings Online, Bangalore',
    description:
      'An online store or a booking system that takes the payment and keeps every customer updated on WhatsApp. Store from ₹42,000; booking from ₹45,000.',
    keyword: 'online store and booking system',
    from: 42000,
    intro:
      'We help you sell: an online store or a booking system that takes the payment and keeps the customer updated on WhatsApp.',
    tint: 'butter',
    problem: {
      heading: 'Where sales slip away',
      points: [
        { icon: 'chat', text: 'Orders arrive in DMs and get lost.' },
        { icon: 'phone', text: 'Bookings tie up the phone.' },
        { icon: 'calendar', text: 'No-shows cost you the slot.' },
        { icon: 'rupee', text: 'Payments are chased by hand.' },
      ],
    },
    ways: {
      heading: 'Two ways in',
      cards: [
        {
          name: 'E-commerce System',
          lines: [
            'Online store',
            'Product catalogue',
            'Payment gateway',
            'Order and shipping setup',
            'Order updates on WhatsApp',
            'Hosting and security',
          ],
          price: '₹42,000',
          note: 'It starts with the Store package, ₹42,000 for up to 50 products; WhatsApp order updates are quoted.',
          interest: 'store',
          cta: 'Start with the Store',
        },
        {
          name: 'Booking & Appointment System',
          lines: [
            'Online booking',
            'Confirmations and reminders on WhatsApp',
            'Optional payments',
            'Calendar integration where required',
            'No-show follow-ups',
          ],
          price: 'From ₹45,000',
          note: 'Online booking comes with the Connected Website, from ₹45,000.',
          interest: 'booking-system',
          cta: 'Talk to us about booking',
        },
      ],
    },
    steps: [
      { icon: 'cart', label: 'Customer buys or books' },
      { icon: 'card', label: 'Pays' },
      { icon: 'whatsapp', label: 'Confirmation on WhatsApp' },
      { icon: 'bell', label: 'An update or a reminder' },
      { icon: 'check', label: 'You fulfil' },
    ],
    goodFor: ['Retail', 'Hospitality', 'Clinics', 'Education'],
    faqs: [
      {
        question: 'A store or a booking system: which do I need?',
        answer:
          'Selling products, the store. Selling time (appointments, tables, classes), the booking system. Some businesses need both, and they share one system.',
      },
      {
        question: 'Which payment gateway do you use?',
        answer:
          'The one that suits your business, and we set it up. The gateway’s own fees are charged by the gateway.',
      },
      {
        question: 'Do customers get updates on WhatsApp?',
        answer:
          'Yes: order confirmations and updates from the store, confirmations and reminders for bookings.',
      },
      {
        question: 'Can you write the product descriptions?',
        answer: 'Yes, for ₹120 per product. It’s optional.',
      },
    ],
    services: [
      'e-commerce-stores',
      'booking-payment-workflows',
      'whatsapp-automation',
      'mobile-apps',
    ],
    closing: {
      lead: 'Ready to take orders and bookings online?',
      fill: 'Tell us what you sell.',
    },
  },
  {
    slug: 'run-it-in-one-place',
    title: 'Business Dashboard & CRM, Bangalore',
    description:
      'One view of your leads, bookings and payments, with the tools you already use connected and the spreadsheets retired. Starts with a ₹10,000 Blueprint.',
    keyword: 'business dashboard and CRM',
    from: 10000,
    intro:
      'We connect your operations: one dashboard for the business, and your tools talking to each other.',
    tint: 'sky',
    problem: {
      heading: 'Where the time goes',
      points: [
        { icon: 'table', text: 'Numbers live in five places.' },
        { icon: 'alert', text: 'Spreadsheets break.' },
        { icon: 'plug', text: 'Tools don’t talk to each other.' },
      ],
    },
    ways: {
      heading: 'Two ways in',
      cards: [
        {
          name: 'Business Dashboard & CRM',
          lines: [
            'Leads, bookings and payments in one view',
            'Team roles and access',
            'Daily summaries',
            'Exports and reports',
          ],
          interest: 'business-dashboard',
          cta: 'Talk to us about a dashboard',
        },
        {
          name: 'Modernise & Connect',
          lines: [
            'Website redesign',
            'Connect the tools you already use',
            'Move off spreadsheets',
            'Speed improvements',
            'Security review',
          ],
          interest: 'modernise-and-connect',
          cta: 'Talk to us about connecting',
        },
      ],
    },
    steps: [
      { icon: 'clipboard', label: 'System Blueprint' },
      { icon: 'plug', label: 'Your tools connected' },
      { icon: 'dashboard', label: 'The dashboard goes live' },
      { icon: 'trend', label: 'It improves every month' },
    ],
    prices: [BLUEPRINT, CUSTOM(['A fixed quote per phase'])],
    priceNote: 'Speed optimisation of an existing site on its own: ₹5,000.',
    goodFor: ['Manufacturing', 'Education', 'Real Estate', 'Clinics'],
    faqs: [
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
        question: 'Can you redesign our current website as well?',
        answer: 'Yes. A redesign is part of Modernise & Connect, quoted with the rest.',
      },
    ],
    services: [
      'dashboards',
      'crm-systems',
      'internal-tools',
      'api-integrations',
      'custom-software',
    ],
    closing: {
      lead: 'Running the business across ten tabs?',
      fill: 'Let’s put it in one place.',
    },
  },
  {
    slug: 'keep-it-improving',
    title: 'Website Maintenance & Migration, Bangalore',
    description:
      'Move your website to us and keep it fast, safe and improving: managed hosting, migration, backups, monitoring and monthly changes. Plans from ₹899 a month.',
    keyword: 'website maintenance and migration',
    from: 899,
    monthly: true,
    intro: 'You run your business. We keep your system fast, safe and getting better.',
    tint: 'blush',
    problem: {
      heading: 'Signs your site needs looking after',
      points: [
        { icon: 'pen', text: 'Nobody updates it.' },
        { icon: 'gauge', text: 'It’s slow, or it went down and nobody noticed.' },
        { icon: 'person', text: 'The person who built it has moved on.' },
      ],
    },
    ways: {
      heading: 'Two ways in',
      cards: [
        {
          name: 'Move to Better Hosting',
          lines: [
            'Managed hosting',
            'Migration',
            'Domain and DNS',
            'SSL',
            'Backups',
            'Performance',
            'CDN',
            'Monitoring baseline',
          ],
          price: '₹5,000–12,000',
          note: 'Moving an existing site costs ₹5,000 to ₹12,000.',
          interest: 'move-to-better-hosting',
          cta: 'Move your site to us',
        },
        {
          name: 'Evolve Plan',
          lines: [
            'Hosting, SSL and CDN',
            'Uptime monitoring',
            'Daily backups',
            'Security updates',
            'Content changes every month',
            'Technical support',
          ],
          price: 'From ₹899',
          note: 'From ₹899 a month; the full table is on the Evolve page.',
          interest: 'evolve',
          cta: 'See the Evolve plans',
          href: '/services/evolve#evolve-plans',
        },
      ],
    },
    steps: [
      { icon: 'search', label: 'We review your site' },
      { icon: 'move', label: 'Move it, testing before the switch' },
      { icon: 'shield', label: 'It joins an Evolve plan' },
      { icon: 'chat', label: 'Changes by message, every month' },
    ],
    goodFor: 'all',
    faqs: [
      {
        question: 'Can you look after a site you didn’t build?',
        answer:
          'Yes. We move it to us first (₹5,000 to ₹12,000), and then it joins an Evolve plan like any other.',
      },
      {
        question: 'Will my site go offline during the move?',
        answer:
          'We move it with a planned cutover and test it before switching, to keep any downtime short.',
      },
      {
        question: 'What counts as one content change?',
        answer:
          'One content change is one set of edits, sent together, to one page. A brand-new page is quoted separately.',
      },
      {
        question: 'What are the terms?',
        answer:
          'Three months minimum, then monthly, with 30 days’ notice to cancel. You own your domain and your content, always.',
      },
    ],
    services: ['evolve'],
    closing: { lead: 'Stuck with a site nobody looks after?', fill: 'Bring it to us.' },
  },
];

export const groupPageFor = (slug: string) => groupPages.find((page) => page.slug === slug);
export const servicePageFor = (slug: string) => servicePages.find((page) => page.slug === slug);
export const solutionPageFor = (slug: string) => solutionPages.find((page) => page.slug === slug);

/** Is a page live? A paused one is out of the menus and the sitemap, and marked `noindex`. */
export const isLive = (slug: string) =>
  ![...groupPages, ...servicePages, ...solutionPages].some(
    (page) => page.slug === slug && page.paused,
  );
