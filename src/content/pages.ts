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

/**
 * A service's search details, opening line, prices and closing. Everything else on its page — the
 * product panel, what it does, how it compares, the packages, the questions — is in
 * `content/products/<slug>.ts`.
 */
export type ServicePage = Seo & {
  slug: string;
  group: GroupSlug;
  /** The line under the H1 in the page's opening. */
  intro: string;
  /** The solution that puts this service to work. */
  solution: string;
  closing: Heading;
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
    solution: 'lead-automation',
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
    solution: 'online-store-and-bookings',
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
    solution: 'business-dashboard-crm',
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
    solution: 'business-dashboard-crm',
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
    solution: 'online-store-and-bookings',
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
    solution: 'business-dashboard-crm',
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
    solution: 'business-dashboard-crm',
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
    solution: 'lead-automation',
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
    solution: 'business-dashboard-crm',
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
    solution: 'business-dashboard-crm',
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
    solution: 'lead-automation',
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
    solution: 'online-store-and-bookings',
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
    solution: 'business-dashboard-crm',
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
    solution: 'lead-automation',
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
    solution: 'business-dashboard-crm',
    closing: { lead: 'Drowning in paperwork?', fill: 'Let AI do the reading.' },
  },
];

// --- Evolve -------------------------------------------------------------------------------------

export const evolvePage = {
  title: 'Evolve Care Plans: Prices & What’s Included',
  description:
    'Hosting, SSL, backups, monitoring, security updates and monthly changes for everything we build. Evolve plans from ₹899 a month; two months free yearly.',
  keyword: 'website care plans',
  from: 899,
  monthly: true,
  chip: 'Services',
  intro: 'Hosting, security, backups, monitoring and monthly improvements for everything we build.',
  terms: {
    heading: 'The terms',
    body: 'Three months minimum, then monthly. Cancel with 30 days’ notice. You own your domain and your content, always, and get a full export within 10 working days if you leave. Hosting is included in all three plans.',
  },
  closing: {
    lead: 'Launched something that’s standing still?',
    fill: 'Let’s keep it improving.',
  } satisfies Heading,
};

// --- the four solutions -------------------------------------------------------------------------

/**
 * A solution's search details, opening line and closing; the rest of its page, its ways in among it, is in
 * `content/products/<slug>.ts`, as a service's is.
 */
export type SolutionPage = Seo & {
  slug: string;
  /** The line under the H1 in the page's opening. */
  intro: string;
  tint: Tint;
  services: string[];
  closing: Heading;
};

export const solutionPages: SolutionPage[] = [
  {
    slug: 'lead-automation',
    title: 'Lead Automation: Catch Every Enquiry',
    description:
      'The Connected Website catches every enquiry from your site, ads and WhatsApp, replies instantly and tracks every lead on one dashboard. From ₹45,000.',
    keyword: 'website with WhatsApp integration',
    from: 45000,
    intro:
      'We catch every enquiry: from your website, your ads and WhatsApp, answered at once and tracked until it’s closed.',
    tint: 'mint',
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
    slug: 'online-store-and-bookings',
    title: 'Online Store & Booking System, Bangalore',
    description:
      'An online store or a booking system that takes the payment and keeps every customer updated on WhatsApp. Store from ₹42,000; booking from ₹45,000.',
    keyword: 'online store and booking system',
    from: 42000,
    intro:
      'We help you sell: an online store or a booking system that takes the payment and keeps the customer updated on WhatsApp.',
    tint: 'sky',
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
    slug: 'business-dashboard-crm',
    title: 'Business Dashboard & CRM, Bangalore',
    description:
      'One view of your leads, bookings and payments, with the tools you already use connected and the spreadsheets retired. Starts with a ₹10,000 Blueprint.',
    keyword: 'business dashboard and CRM',
    from: 10000,
    intro:
      'We connect your operations: one dashboard for the business, and your tools talking to each other.',
    tint: 'violet',
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
    slug: 'website-care-hosting',
    title: 'Website Hosting & Maintenance, Bangalore',
    description:
      'Move your website to us and keep it fast, safe and improving: managed hosting, migration, backups, monitoring and monthly changes. Plans from ₹899 a month.',
    keyword: 'website maintenance and migration',
    from: 899,
    monthly: true,
    intro: 'You run your business. We keep your system fast, safe and getting better.',
    tint: 'blush',
    services: ['evolve'],
    closing: { lead: 'Stuck with a site nobody looks after?', fill: 'Bring it to us.' },
  },
];

export const servicePageFor = (slug: string) => servicePages.find((page) => page.slug === slug);
export const solutionPageFor = (slug: string) => solutionPages.find((page) => page.slug === slug);

/** Is a page live? A paused one is out of the menus and the sitemap, and marked `noindex`. */
export const isLive = (slug: string) =>
  ![...groupPages, ...servicePages, ...solutionPages].some(
    (page) => page.slug === slug && page.paused,
  );
