import type { IconName } from '@/components/ui/icon';
import type { Screen } from '@/components/screens/types';
import type { ShowcasePoint } from '@/components/solutions/showcase';

import product from '../products/never-miss-a-lead';
import { desk, type SolutionContent } from './solution';

/**
 * A test of a page pattern of the solutions' own: Lead Automation told as a goal rather than a
 * product — where enquiries go missing, the one system behind every enquiry, one lead's evening
 * from the form to the booking, the services it's built from and the two ways in. Served at
 * `/solutions/never-miss-a-lead-test`, out of search and the sitemap. Every screen is the product
 * page's own, so the sample business and its data stay the same invented ones.
 */

/** Something on the window's face: a tool's logo (a `brand-logos` key) or one of our glyphs. */
export type EngineNode = { logo: string } | { icon: IconName };

export type EngineTab = {
  title: string;
  text: string;
  /** Where the work comes from, down the left of the window. */
  from: [EngineNode, EngineNode, EngineNode];
  /** Where it goes, down the right. */
  to: [EngineNode, EngineNode, EngineNode];
};

const [QUOTE, ALERT] = product.stage?.front ?? [];
const screen = (label: string) => product.features.items.find((i) => i.label === label)!.screen!;
const plain = (text: string) => text.replace(/\*\*/g, '');

/** Each benefit's glyph, by its label in the product file. */
const BENEFIT_ICONS: Record<string, IconName> = {
  'Answered at once': 'clock',
  'Booked in the reply': 'calendar',
  'Nothing slips': 'repeat',
  'Team alerts': 'bell',
  Sources: 'chart',
};

export const lab = {
  accent: product.accent,

  /** The opening's four facts, short enough to sit in a row under the actions. */
  facts: [
    { value: 'At once', label: 'Every enquiry answered' },
    { value: 'One list', label: 'Every lead, every source' },
    { value: '₹45,000', label: 'From, one-time' },
    { value: '4–6 weeks', label: 'From first call to live' },
  ],

  leaks: {
    heading: { lead: 'Leads rarely say no.', fill: 'They just stop waiting.' },
    intro:
      'An enquiry at 9 pm, a message during a job, a DM on Sunday: each is someone ready to book, and each cools while it waits.',
    items: product.compare.options[0]!.rows.map((row) => ({
      topic: row.topic ?? '',
      without: row.without,
      with: row.with,
    })),
  },

  engine: {
    eyebrow: 'How it works',
    heading: { lead: 'One system,', fill: 'behind every enquiry.' },
    intro:
      'The Connected Website runs every enquiry through one system: it gathers them from your website, ads and WhatsApp, answers at once, tells the right person and keeps each one in view until it’s closed.',
    tabs: [
      {
        title: 'Every source, one inbox',
        text: 'Website forms, ads and WhatsApp land together, each with its source.',
        from: [{ icon: 'globe' }, { logo: 'googleads' }, { logo: 'instagram' }],
        to: [{ icon: 'clipboard' }, { icon: 'target' }, { icon: 'userCheck' }],
      },
      {
        title: 'Answered at once',
        text: 'A reply with the price or the next free slots, on WhatsApp and email.',
        from: [{ icon: 'globe' }, { logo: 'whatsapp' }, { logo: 'instagram' }],
        to: [{ logo: 'whatsapp' }, { logo: 'gmail' }, { logo: 'googlecalendar' }],
      },
      {
        title: 'The right person, told',
        text: 'Anything that needs a person goes to the right one, by area or service.',
        from: [{ logo: 'googleads' }, { icon: 'globe' }, { logo: 'googlemaps' }],
        to: [{ icon: 'bell' }, { icon: 'userCheck' }, { icon: 'pin' }],
      },
      {
        title: 'Tracked until closed',
        text: 'A next step, an owner and a date on every lead, with follow-ups until it’s done.',
        from: [{ logo: 'whatsapp' }, { logo: 'googlecalendar' }, { icon: 'repeat' }],
        to: [{ icon: 'dashboard' }, { icon: 'chart' }, { logo: 'googleanalytics' }],
      },
    ] satisfies EngineTab[],
  },

  journey: {
    eyebrow: 'One lead’s evening',
    heading: { lead: '9:01 pm to booked,', fill: 'before anyone picks up a phone.' },
    intro: 'Priya asks for a deep clean after dinner. Here is what happens next, on its own.',
    steps: [
      {
        time: '9:01 pm',
        title: 'She asks for a quote',
        text: 'A 3 BHK deep clean, from the website, on her phone.',
        screen: QUOTE!,
      },
      {
        time: '9:02 pm',
        title: 'The quote reaches her',
        text: 'Eight seconds later, on WhatsApp and email, with a way to book.',
        screen: screen('Answered at once'),
      },
      {
        time: '9:02 pm',
        title: 'Anita is told',
        text: 'The HSR team’s phone gets the enquiry, and the reply that already went.',
        screen: ALERT!,
      },
      {
        time: '9:06 pm',
        title: 'Saturday, 10:30 am',
        text: 'Booked from the reply, with a reminder the evening before.',
        screen: screen('Booked in the reply'),
      },
    ] satisfies { time: string; title: string; text: string; screen: Screen }[],
  },

  /**
   * How the Connected Website works, and everything that's in it, as one list: the product
   * page's six "how" blocks and nine included items, each said once.
   */
  system: {
    eyebrow: 'How it works',
    heading: { lead: 'How the Connected', fill: 'Website works.' },
    intro:
      'One system, built together: your website, the replies, booking and a dashboard of every lead.',
    points: [
      {
        icon: 'globe',
        title: 'Your website',
        body: 'Designed from scratch for your brand, with three revision rounds.',
      },
      {
        icon: 'mail',
        title: 'One inbox for every source',
        body: 'Website forms, ads and WhatsApp land in one place.',
      },
      {
        icon: 'whatsapp',
        title: 'Instant replies, on official WhatsApp',
        body: 'On WhatsApp and email, from your own number, through the [WhatsApp Business Platform](/services/whatsapp-automation) and an approved provider.',
      },
      {
        icon: 'calendar',
        title: 'Booking or callbacks',
        body: '[Your slots and rules](/services/booking-payment-workflows), or a callback request your team picks up.',
      },
      {
        icon: 'bell',
        title: 'Team alerts',
        body: 'The right person told as it happens, by area or service.',
      },
      {
        icon: 'repeat',
        title: 'Follow-ups',
        body: 'Timed follow-ups that stop on a reply or a booking.',
      },
      {
        icon: 'dashboard',
        title: 'Lead dashboard',
        body: '[Every lead](/services/dashboards), its source, its status and who’s on it.',
      },
      {
        icon: 'search',
        title: 'Set up for search',
        body: 'Every service on its own page, [found on Google](/services/business-websites), with titles, descriptions, sitemap and schema.',
      },
      {
        icon: 'refresh',
        title: 'Looked after',
        body: 'Three months of [Evolve](/services/evolve) included — hosting, backups, monitoring and changes — then a plan of your choice.',
      },
    ] satisfies ShowcasePoint[],
  },

  /** What changes: the product page's five features, as the benefits. */
  benefits: {
    eyebrow: 'Benefits',
    heading: { lead: 'What changes', fill: 'when no enquiry waits.' },
    intro: product.features.intro,
    points: product.features.items.map((item): ShowcasePoint => ({
      icon: BENEFIT_ICONS[item.label] ?? 'check',
      title: item.title,
      body: plain(item.body),
    })),
  },

  built: {
    eyebrow: 'Built from',
    heading: { lead: 'Five services,', fill: 'built as one.' },
    intro:
      'Lead Automation isn’t a plugin on a website. It’s five of our services, designed together and looked after as one.',
  },

  ways: {
    eyebrow: 'Pricing',
    heading: { lead: 'Two ways in.', fill: 'One system.' },
    intro: product.price.intro,
  },
};

/** The live page's words, in the solution pattern (`components/solutions/solution-page`). */
export const content: SolutionContent = {
  accent: lab.accent,
  tasks: [
    {
      icon: 'target',
      title: 'New enquiry',
      line: 'Priya Menon · deep cleaning · replied in 8 seconds',
      screen: desk(product.stage?.back),
    },
    {
      icon: 'repeat',
      title: 'Follow-ups',
      line: 'Sending Sana Khan’s second reminder…',
      screen: desk(screen('Nothing slips')),
    },
    {
      icon: 'chart',
      title: 'Sources',
      line: 'Counting this month’s bookings by source…',
      screen: desk(screen('Sources')),
    },
  ],
  note: { label: 'From', text: '₹45,000 · the Connected Website', href: '#ways-in' },
  behind: {
    heading: { lead: 'The system behind', fill: 'every enquiry.' },
    intro: 'It works because it’s wired into the rest of your business, not bolted on.',
    cards: [
      {
        title: 'Every source, one list',
        body: 'Website forms, ads, Instagram and WhatsApp land in one place, each with where it came from.',
        cta: { label: 'CRM-Connected Systems', href: '/services/crm-systems' },
      },
      {
        title: 'Answered at once',
        body: 'A reply with the price or the next free slots, on WhatsApp and email, at any hour.',
        cta: { label: 'WhatsApp & Email Automation', href: '/services/whatsapp-automation' },
      },
      {
        title: 'Tracked until it’s closed',
        body: 'A next step, an owner and a date on every lead, with follow-ups until it’s booked or closed.',
        cta: { label: 'Dashboards', href: '/services/dashboards' },
      },
    ],
  },
  journey: lab.journey,
  system: lab.system,
  benefits: lab.benefits,
  built: { heading: lab.built.heading, intro: lab.built.intro },
  ways: lab.ways,
  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'The price, in writing',
        body: 'A published starting price, and a written quote for anything custom.',
      },
      {
        icon: 'key',
        title: 'Your leads stay yours',
        body: 'Your number, your contacts and your data, always.',
      },
      {
        icon: 'download',
        title: 'Free to leave',
        body: 'Stop after Evolve’s three months and get a full export within 10 working days.',
      },
      {
        icon: 'device',
        title: 'Tested on real phones',
        body: 'Every path checked before launch, from the search to the reminder.',
      },
      {
        icon: 'pen',
        title: 'No content needed first',
        body: 'We shape the words with you, so you don’t start from a blank page.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },
};

export { product };
