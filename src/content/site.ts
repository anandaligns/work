import catalogue from './catalogue.json';

/**
 * Everything the site says.
 *
 * `catalogue.json` began as a snapshot of the platform's own seed, dumped from `packages/domain` on
 * 23 Sep 2026. Since 25 Sep 2026 it holds catalogue v2 — the repositioning to one connected system
 * (FOUNDATION.md v2.4): three service groups, fifteen services, four solutions, nineteen offers,
 * twelve questions and nineteen home blocks. The platform's seed and `docs/10-public-surface.md` §7
 * take the same text when this build moves across; until then this file is the source of truth, and
 * every read below becomes a read of the CMS collection it came from.
 *
 * The rest of this file is the page's own voice: section headings written as two halves, because
 * the second half is the part that fills with ink as it scrolls into view. None of them makes a
 * claim the price list does not already make.
 */

export type Price = { label: string | null; text: string };
export type Feature = { label: string; value: string };

export type Offer = {
  kind: 'WEBSITE_PACKAGE' | 'CARE_PLAN' | 'ADD_ON';
  slug: string;
  name: string;
  summary: string | null;
  timeline: string | null;
  features: Feature[];
  notes: string[];
  headline: Price[];
};

type HomeBlock = {
  kind: 'HERO' | 'SECTOR' | 'PROMISE' | 'PROCESS_STEP' | 'PORTAL';
  title: string;
  body: string | null;
};

const blocks = catalogue.homeBlocks as HomeBlock[];
const ofKind = (kind: HomeBlock['kind']) => blocks.filter((block) => block.kind === kind);

/**
 * The hero, with the reach the catalogue's line leaves out: where the business works. `lines` is
 * the title as it breaks on a wide screen — two lines, the break carried by a newline.
 */
const heroBlock = ofKind('HERO')[0]!;
export const hero = {
  ...heroBlock,
  body: `${heroBlock.body} For businesses in Bangalore and across India.`,
  lines: 'Technology built\naround your business.',
};

export const portal = ofKind('PORTAL')[0]!;
export const sectors = ofKind('SECTOR').map((block) => block.title);

/**
 * What each kind of business most often asks for — the sector strip's second row. Each is a thing
 * the catalogue sells (a store, booking, automation, dashboards), said in the words people search
 * with. Page copy, not a CMS block yet: it moves to §7 with the rest.
 */
export const sectorNeeds: Record<string, string> = {
  Retail: 'Online stores with order updates for retail',
  Clinics: 'Appointment booking with WhatsApp reminders for clinics',
  Hospitality: 'Table bookings and order alerts for restaurants',
  'Real Estate': 'Site-visit booking and lead follow-up for real estate',
  Education: 'Admission enquiries and fee reminders for schools',
  'Professional Services': 'Client intake and follow-ups for consultants',
  Startups: 'Portals, dashboards and MVPs for startups',
  Manufacturing: 'Dealer enquiries and order tracking for manufacturers',
};
export const promises = ofKind('PROMISE');
export const steps = ofKind('PROCESS_STEP');

export const categories = catalogue.serviceCategories.map((category) => ({
  ...category,
  services: catalogue.services.filter((service) => service.categorySlug === category.slug),
}));

export type Category = (typeof categories)[number];

/**
 * A service group's opening line on its own page: what the group covers, said through the
 * services in it. Page copy, not a CMS block yet: it moves to §7 with the rest.
 */
export const groupIntros: Record<string, string> = {
  'digital-experiences':
    'Websites, stores, portals and apps: everything your customers see and use, designed around them and connected to the rest of your business.',
  'business-systems':
    'Dashboards, internal tools, CRM and custom software: the systems your team runs the business on, shaped around how it actually works.',
  'automation-ai':
    'WhatsApp and email automation, booking and payment workflows, integrations and AI: the work that should happen without anyone doing it.',
};

/** The site's own address, for canonical links, the sitemap and structured data. */
export const SITE_URL = 'https://pixelkinetix.com';

export const solutions = catalogue.solutions;
export type Solution = (typeof solutions)[number];

/**
 * The fourth thing we do, under all three service groups: hosting, security, backups, monitoring
 * and monthly improvements. Not a group of its own in the catalogue — its plans are the three
 * `CARE_PLAN` offers, shown as "Evolve plans" — but it has a page, `/services/evolve`.
 */
export const evolve = {
  slug: 'evolve',
  name: 'Evolve',
  line: 'Keeps it improving.',
  summary:
    'Hosting, security, backups, monitoring and monthly improvements for everything we build.',
};

const offers = catalogue.offers as Offer[];
/**
 * Everything built for a one-time price — the Build tab. The catalogue still calls the kind
 * `WEBSITE_PACKAGE`, the platform's name for it; the System Blueprint and Custom sit in it too.
 */
export const websitePackages = offers.filter((offer) => offer.kind === 'WEBSITE_PACKAGE');
export const carePlans = offers.filter((offer) => offer.kind === 'CARE_PLAN');
export const faqs = catalogue.faqs;

/**
 * A fourth promise, beside the three from the CMS: the warranty, in the words of the price list's
 * own answer to "What does the warranty cover?" — no wider than that answer.
 */
export const warrantyPromise = {
  title: 'Covered after launch',
  body: 'Thirty days from launch — 45 for Store and Custom. A defect in what we built is ours to fix; the changes you ask for later are what an Evolve plan is for.',
};

/** `PK_Pricing_India.md`: what every build includes, whatever the package. */
export const everyWebsiteIncludes = [
  'Mobile-first design',
  'Contact form',
  'WhatsApp and call buttons',
  'SEO setup — titles, meta, sitemap, schema',
  'Analytics',
  'Custom 404 page',
  '30-day warranty',
];

/**
 * The two cards under the Build tab's main three, line by line: the System Blueprint (a fixed fee,
 * credited in full if the build goes ahead) and Custom, which starts with one and carries a 45-day
 * warranty rather than 30.
 */
export const largerBuilds: Record<string, { tag: string; unit: string; lines: string[] }> = {
  blueprint: {
    tag: 'Plan it first',
    unit: 'fixed fee',
    lines: [
      'A map of how your business works today',
      'Where it loses time and money',
      'The system it needs, in phases',
      'A fixed quote for the build',
      'Fee credited in full if you go ahead',
    ],
  },
  custom: {
    tag: 'Built to order',
    unit: 'quoted in writing',
    lines: [
      'Business software, portals, dashboards and automation',
      'Starts with a System Blueprint',
      'Scope and price agreed in writing before work starts',
      'Everything every build includes',
      '45-day warranty from launch',
      'Paid in stages set by the project value',
    ],
  },
};

/** A heading in two halves: the first set in ink, the second filling with ink as it scrolls in. */
export type Heading = { lead: string; fill: string };

export const headings = {
  services: { lead: 'We build it, connect it,', fill: 'and keep it improving.' },
  solutions: { lead: 'Tell us the problem.', fill: 'We’ll build the system.' },
  work: { lead: 'See the kind of', fill: 'systems we design.' },
  promises: { lead: 'No surprises.', fill: 'Here’s how we work.' },
  numbers: { lead: 'Clear terms,', fill: 'upfront.' },
  process: { lead: 'From first message to a working system,', fill: 'and after.' },
  pricing: { lead: 'Simple pricing.', fill: 'See it before we start.' },
  reviews: { lead: 'What our', fill: 'clients say.' },
  faq: { lead: 'Frequently asked', fill: 'questions.' },
  cta: {
    lead: 'Tell us what’s slowing your business down.',
    fill: 'We’ll reply with a clear next step.',
  },
} satisfies Record<string, Heading>;

/**
 * Four figures, each one already on the price list or in the catalogue — nothing here is a
 * statistic about clients this business does not have yet.
 */
export const numbers = [
  {
    value: catalogue.services.length,
    suffix: '',
    label: 'Services in one place',
    note: 'Build, connect and evolve',
  },
  { value: 30, suffix: '-day', label: 'Warranty on every build', note: '45 for Store and Custom' },
  {
    value: 90,
    suffix: ' days',
    label: 'Of daily backups kept',
    note: 'On the Complete Evolve plan',
  },
  { value: 2, suffix: ' months', label: 'Free on yearly Evolve', note: 'Any of the three plans' },
];

/**
 * Client reviews, for automatix's testimonial section.
 *
 * There are none to publish yet, and pk-static's own rule stands: never invent a testimonial. So
 * every entry below is a **sample** — written to show the design, set against the concept brands
 * from the Work section, and labelled "Sample" wherever it appears. `shownReviews` keeps samples
 * to the dev server: a production build drops them, and with no real review left the section does
 * not render at all. A real review goes in with `sample: false`, the client's own words, and their
 * permission to print their name.
 */
export type Review = {
  sample: boolean;
  business: string;
  kind: string;
  /** The colour of the business's mark. */
  accent: string;
  /** A concept site to picture beside a featured review — samples only. */
  site?: string;
  quote: string;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Two facts about the project, shown under the featured review. */
  facts?: { value: string; label: string }[];
};

const reviews: Review[] = [
  {
    sample: true,
    business: 'Saffron & Salt',
    kind: 'Restaurant',
    accent: '#c2410c',
    site: 'saffron',
    quote:
      'We had a menu on Instagram and nothing else. Now the website takes the table bookings, and the WhatsApp button brings us the rest.',
    name: 'Meera K.',
    role: 'Owner',
    rating: 5,
    facts: [
      { value: 'Website', label: 'Package, up to six pages' },
      { value: '12 days', label: 'From enquiry to launch' },
    ],
  },
  {
    sample: true,
    business: 'Kora Dental',
    kind: 'Clinic',
    accent: '#0b7d71',
    quote:
      'Patients find our timings and book without calling the front desk. When we need a change, it is live the same week.',
    name: 'Dr. Arjun R.',
    role: 'Founder',
    rating: 5,
  },
  {
    sample: true,
    business: 'Loom & Thread',
    kind: 'Online store',
    accent: '#be1e4f',
    quote:
      'Orders used to live in our DMs. Now the store takes the payment, and we see every order in one place.',
    name: 'Nisha P.',
    role: 'Founder',
    rating: 5,
  },
  {
    sample: true,
    business: 'Brightpath Academy',
    kind: 'Education',
    accent: '#3656d9',
    quote:
      'Parents see the batches and the fees before they call, so the enquiries we get now are the right ones.',
    name: 'Rahul S.',
    role: 'Director',
    rating: 5,
  },
];

export const shownReviews = reviews.filter(
  (review) => !review.sample || process.env.NODE_ENV === 'development',
);

/**
 * From pk-static's business facts (`_tools/site_data.py` → `BUSINESS`). The Maps link is a search
 * for the locality rather than a pin — no street address or Business Profile has been verified —
 * and should become the Business Profile's short link the day there is one.
 */
/** The business number, in the international form `tel:` and `wa.me` links take. */
const NUMBER = '918074211007';

export const contact = {
  phone: '+91 80742 11007',
  phoneHref: `tel:+${NUMBER}`,
  email: 'contact@pixelkinetix.com',
  whatsappHref: `https://wa.me/${NUMBER}?text=Hi%20Pixel%20Kinetix%2C%20I%27d%20like%20to%20talk%20about%20my%20business.`,
  instagram: '@pixelkinetix',
  instagramHref: 'https://www.instagram.com/pixelkinetix/',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Pixel+Kinetix+Kalyan+Nagar+Bangalore',
  locality: 'Kalyan Nagar · HRBR Layout · Bangalore - 560043',
  /** The postal parts, for structured data. No street until the office address is confirmed. */
  address: {
    area: 'HRBR Layout, Kalyan Nagar',
    city: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560043',
    country: 'IN',
  },
};

/** A WhatsApp link that opens with a message about one topic — a service, a solution, a plan. */
export const whatsappAbout = (topic: string) =>
  `https://wa.me/${NUMBER}?text=${encodeURIComponent(`Hi Pixel Kinetix, I'd like to know about ${topic}.`)}`;

/**
 * Social profiles, the footer's last column. Instagram is the business's real address; LinkedIn
 * is a placeholder (`href: null`) — its name is shown, but it is not a link until its address is
 * added here.
 */
export type SocialId = 'instagram' | 'linkedin';
export const socials: { id: SocialId; label: string; href: string | null }[] = [
  { id: 'instagram', label: 'Instagram', href: contact.instagramHref },
  { id: 'linkedin', label: 'LinkedIn', href: null },
];

/**
 * The AI assistant's launcher, in the lower right of every page. The assistant itself is not built
 * yet: the launcher opens a short note from it and the three ways to reach the team today. Rename
 * it here and the button, the panel and every label follow.
 */
export const assistant = {
  name: 'Kix',
  role: 'Pixel Kinetix AI assistant',
  avatar: '/brand/assistant.webp',
};

/**
 * The thirty-one questions, on four shelves for the FAQ's category rail — each with a one-word name
 * for the phone's tabs. Each answer carries its shelf (`topic` in the catalogue), so a reordered
 * catalogue cannot put an answer on the wrong one.
 */
const SHELVES = [
  { id: 'project', label: 'Your project', short: 'Project', icon: 'clipboard' as const },
  { id: 'website', label: 'Your website', short: 'Website', icon: 'globe' as const },
  { id: 'evolve', label: 'Evolve and support', short: 'Evolve', icon: 'shield' as const },
  {
    id: 'payments',
    label: 'Payments and working with us',
    short: 'Payments',
    icon: 'receipt' as const,
  },
];

export const faqGroups = SHELVES.map((shelf) => ({
  ...shelf,
  items: faqs.filter((faq) => faq.topic === shelf.id),
}));

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', menu: 'services' as const },
  { label: 'Solutions', menu: 'solutions' as const },
  { label: 'Work', href: '/#work' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Every "Get Started" and "Start a Project": the contact page, where every way to reach us is. */
export const START = { label: 'Get Started', href: '/contact' };

/**
 * The form's "Interested in" choices, and which one a page's `?interest=` picks: a package slug
 * picks its package, and a service, solution or bundle picks the package it is sold as. Anything
 * else is "Not sure yet"; the slug itself travels with the enquiry, so its source is never lost.
 */
export const INTERESTS = [
  'Website',
  'Connected Website',
  'Store',
  'System Blueprint',
  'Custom system',
  'Evolve',
  'Not sure yet',
] as const;
export type Interest = (typeof INTERESTS)[number];

const INTEREST_OF: Record<string, Interest> = {
  website: 'Website',
  'business-websites': 'Website',
  'connected-website': 'Connected Website',
  'never-miss-a-lead': 'Connected Website',
  'whatsapp-automation': 'Connected Website',
  'booking-payment-workflows': 'Connected Website',
  'booking-system': 'Connected Website',
  store: 'Store',
  'e-commerce-stores': 'Store',
  'e-commerce-system': 'Store',
  'sell-and-book-online': 'Store',
  blueprint: 'System Blueprint',
  'business-systems': 'System Blueprint',
  'run-it-in-one-place': 'System Blueprint',
  custom: 'Custom system',
  'customer-portals': 'Custom system',
  'web-apps': 'Custom system',
  'mobile-apps': 'Custom system',
  dashboards: 'Custom system',
  'internal-tools': 'Custom system',
  'crm-systems': 'Custom system',
  'custom-software': 'Custom system',
  'business-platforms': 'Custom system',
  'api-integrations': 'Custom system',
  'ai-assistants': 'Custom system',
  'ai-workflows': 'Custom system',
  'lead-follow-up': 'Custom system',
  'business-dashboard': 'Custom system',
  'modernise-and-connect': 'Custom system',
  evolve: 'Evolve',
  'evolve-plan': 'Evolve',
  essential: 'Evolve',
  standard: 'Evolve',
  complete: 'Evolve',
  'keep-it-improving': 'Evolve',
  'move-to-better-hosting': 'Evolve',
};

export const interestFor = (slug?: string | null): Interest =>
  (slug && INTEREST_OF[slug]) || 'Not sure yet';

/** A "Get Started" that tells the form where it came from. */
export const startFor = (interest?: string) =>
  interest ? `${START.href}?interest=${encodeURIComponent(interest)}` : START.href;

/** Every closing band's line, under its heading. */
export const CLOSING_LINE =
  'Message us on WhatsApp, call or email. We’ll tell you honestly if we’re the right fit.';
