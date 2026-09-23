import catalogue from './catalogue.json';

/**
 * Everything the site says.
 *
 * `catalogue.json` is a snapshot of the platform's own seed — the three services, fifteen
 * sub-services, four solutions, nineteen offers, ten pricing questions and nineteen home blocks,
 * word for word and rupee for rupee, dumped from `packages/domain` on 23 Sep 2026. When this site is
 * brought into the platform, every read below becomes a read of the CMS collection it came from.
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
 * The hero's second line is revised over the seed, in plainer words and the ones people search
 * for. The platform's `docs/10-public-surface.md` §7 and its seed take the same line when this
 * build moves across; until then `catalogue.json` stays a verbatim snapshot.
 */
export const hero = {
  ...ofKind('HERO')[0]!,
  body: 'Website design, hosting and care for businesses in Bangalore and across India. No agencies to chase, no plugins to babysit, no surprise invoices.',
};
/**
 * Titles revised over the seed in the copy review of 23 Sep 2026 — the bodies under them are
 * unchanged. They move into `docs/10-public-surface.md` §7 and the seed with the rest.
 */
const REVISED_TITLES: Record<string, string> = {
  'You never have to ask where things stand.': 'Track your project anytime, in your own portal.',
  'You see the price before we start': 'Your price is fixed before we start',
  'The timeline is on the price list too': 'Clear timelines, written down',
  'A change takes a message, not a meeting': 'Changes by message, not meetings',
};
const revised = <T extends { title: string }>(block: T): T => ({
  ...block,
  title: REVISED_TITLES[block.title] ?? block.title,
});

export const portal = revised(ofKind('PORTAL')[0]!);
export const sectors = ofKind('SECTOR').map((block) => block.title);

/**
 * What each kind of business most often asks for — the sector strip's second row. Each is a thing
 * the catalogue sells (a store, booking, landing pages, custom builds), said in the words people
 * search with. Page copy, not a CMS block yet: it moves to §7 with the rest.
 */
export const sectorNeeds: Record<string, string> = {
  Retail: 'Online stores for retail',
  Clinics: 'Appointment booking for clinics',
  Hospitality: 'Menus and table bookings for restaurants',
  'Real Estate': 'Property listings for real estate',
  Education: 'Course and batch pages for schools',
  'Professional Services': 'Enquiry forms for consultants',
  Startups: 'Launch pages for startups',
  Manufacturing: 'Product catalogues for manufacturers',
};
export const promises = ofKind('PROMISE').map(revised);
export const steps = ofKind('PROCESS_STEP');

export const categories = catalogue.serviceCategories.map((category) => ({
  ...category,
  services: catalogue.services.filter((service) => service.categorySlug === category.slug),
}));

export type Category = (typeof categories)[number];

export const solutions = catalogue.solutions;
export type Solution = (typeof solutions)[number];

const offers = catalogue.offers as Offer[];
export const websitePackages = offers.filter((offer) => offer.kind === 'WEBSITE_PACKAGE');
export const carePlans = offers.filter((offer) => offer.kind === 'CARE_PLAN');
export const faqs = catalogue.faqs;

/**
 * A fourth promise, beside the three from the CMS: the warranty, in the words of the price list's
 * own answer to "What does the warranty cover?" — no wider than that answer.
 */
export const warrantyPromise = {
  title: 'Covered after launch',
  body: 'Thirty days from launch — 45 for Store and Custom. A defect in what we built is ours to fix; the changes you ask for later are what a care plan is for.',
};

/** `PK_Pricing_India.md`: what every website includes, whatever the package. */
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
 * What the two larger builds add, line by line from `PK_Pricing_India.md`: Store and Custom carry a
 * 45-day warranty rather than 30, Store's ₹42,000 falls in the three-stage payment band, and
 * product descriptions are an add-on at ₹120 each.
 */
export const largerBuilds: Record<string, { tag: string; unit: string; lines: string[] }> = {
  store: {
    tag: 'Sell online',
    unit: 'one-time',
    lines: [
      'Up to 50 products',
      'Payments and order management',
      'Everything every website includes',
      '45-day warranty from launch',
      'Paid in three stages — start, design approval, launch',
      'Product descriptions written for you, ₹120 each',
    ],
  },
  custom: {
    tag: 'Built to order',
    unit: 'quoted in writing',
    lines: [
      'Booking systems, portals and dashboards',
      'Scope and price agreed in writing before work starts',
      'Everything every website includes',
      '45-day warranty from launch',
      'Paid in stages set by the project value',
      'Timeline agreed with the quote',
    ],
  },
};

/** A heading in two halves: the first set in ink, the second filling with ink as it scrolls in. */
export type Heading = { lead: string; fill: string };

export const headings = {
  services: { lead: 'We build it, host it,', fill: 'and look after it.' },
  solutions: { lead: 'Tell us your goal.', fill: 'We’ll handle the rest.' },
  work: { lead: 'See the kind of', fill: 'websites we design.' },
  promises: { lead: 'No surprises.', fill: 'Here’s how we work.' },
  numbers: { lead: 'Clear terms,', fill: 'upfront.' },
  process: { lead: 'From first message to live website,', fill: 'and after.' },
  pricing: { lead: 'Simple pricing.', fill: 'See it before we start.' },
  reviews: { lead: 'What our', fill: 'clients say.' },
  faq: { lead: 'Frequently asked', fill: 'questions.' },
  cta: { lead: 'Tell us what you need.', fill: 'We’ll reply with a plan and a fixed price.' },
} satisfies Record<string, Heading>;

/**
 * Four figures, each one already on the price list or in the catalogue — nothing here is a
 * statistic about clients this business does not have yet.
 */
export const numbers = [
  { value: 15, suffix: '', label: 'Services in one place', note: 'Build, host and care' },
  { value: 30, suffix: '-day', label: 'Warranty on every build', note: '45 for Store and Custom' },
  { value: 90, suffix: ' days', label: 'Of daily backups kept', note: 'On the Complete care plan' },
  { value: 2, suffix: ' months', label: 'Free on yearly care', note: 'Any of the three plans' },
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
      { value: 'Business', label: 'Package, up to six pages' },
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
export const contact = {
  phone: '+91 63099 66099',
  phoneHref: 'tel:+916309966099',
  email: 'contact@pixelkinetix.com',
  whatsappHref:
    'https://wa.me/916309966099?text=Hi%20Pixel%20Kinetix%2C%20I%20would%20like%20to%20discuss%20a%20website.',
  instagram: '@pixelkinetix',
  instagramHref: 'https://www.instagram.com/pixelkinetix/',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Pixel+Kinetix+Kalyan+Nagar+Bangalore',
  locality: 'Kalyan Nagar · HRBR Layout · Bangalore',
};

/**
 * The ten pricing questions, sorted into three shelves for the FAQ's category rail. Matched by the
 * question's own words, so a reordered catalogue cannot put an answer on the wrong shelf; a
 * question nobody has shelved lands on the last one rather than disappearing.
 */
const SHELVES = [
  {
    id: 'website',
    label: 'Your website',
    icon: 'device' as const,
    asks: [
      'What does every website include?',
      'How do Business and Signature differ?',
      'Do you need my content before you start?',
      'What does the warranty cover?',
    ],
  },
  {
    id: 'care',
    label: 'Hosting and care',
    icon: 'server' as const,
    asks: [
      'Is hosting included in a website package?',
      'What counts as one content change?',
      'What are the Care plan terms?',
    ],
  },
  {
    id: 'money',
    label: 'Payments and terms',
    icon: 'receipt' as const,
    asks: ['How does payment work?', 'Is GST charged?', 'What is not included in any package?'],
  },
];

export const faqGroups = SHELVES.map((shelf, index) => ({
  id: shelf.id,
  label: shelf.label,
  icon: shelf.icon,
  items: faqs.filter((faq) =>
    index === SHELVES.length - 1
      ? shelf.asks.includes(faq.question) || !SHELVES.some((s) => s.asks.includes(faq.question))
      : shelf.asks.includes(faq.question),
  ),
}));

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', menu: 'services' as const },
  { label: 'Solutions', menu: 'solutions' as const },
  { label: 'Work', href: '/#work' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#process' },
  { label: 'Contact', href: '/#start' },
];

export const START = { label: 'Get Started', href: '/#start' };
