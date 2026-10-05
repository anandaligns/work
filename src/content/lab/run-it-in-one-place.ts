import { phone } from '../products/kit';
import product from '../products/run-it-in-one-place';
import { benefitsOf, desk, screenOf, type SolutionContent } from './solution';

/**
 * Business Dashboard & CRM in the solution pattern: its sample bakery — three outlets and online
 * orders — told as one night's numbers, from Whitefield's closing count to the owner's Monday
 * morning. Every figure is the product page's own, so the bakery and its data stay the same
 * invented ones; the two phone screens for the night are drawn from its connections screen.
 */

/** The page's colour: the home page's violet promise. */
const ACCENT = '#6e78ff';

const [WEEKLY] = product.stage?.front ?? [];

/** Last night's numbers, each matched to its own tool's total. */
const NIGHT = phone({
  title: 'Last night',
  sub: 'Checked against each tool’s own totals',
  action: 'refresh',
  grey: true,
  blocks: [
    {
      t: 'list',
      items: [
        {
          title: 'Counter sales, 3 outlets',
          meta: '1,488 bills · ₹1.32 L',
          icon: 'store',
          pill: { text: 'Matched', tone: 'green' },
        },
        {
          title: 'Online orders and refunds',
          meta: '192 orders · 5 refunds',
          logo: 'WooCommerce',
          pill: { text: 'Matched', tone: 'green' },
        },
        {
          title: 'Payments settled',
          meta: '₹54,210 · 188 payments',
          logo: 'Razorpay',
          pill: { text: 'Matched', tone: 'green' },
        },
      ],
    },
    { t: 'note', text: 'Every number entered once, at its source.', icon: 'check', tone: 'green' },
  ],
});

/** The books, posted overnight; today's roster read. */
const BOOKS = phone({
  title: 'Accounts',
  sub: 'Posted overnight',
  action: 'download',
  grey: true,
  blocks: [
    {
      t: 'list',
      items: [
        {
          title: 'Day book to accounts',
          meta: '2:00 am · 3 outlets · 1 voucher each',
          logo: 'Tally',
          pill: { text: 'Posted', tone: 'green' },
        },
        {
          title: 'Staff roster for today',
          meta: '6:00 am · 18 people · 3 outlets',
          logo: 'Google Sheets',
          pill: { text: 'Read', tone: 'grey' },
        },
      ],
    },
    {
      t: 'note',
      text: 'What your accountant needs, ready without anyone typing it in.',
      icon: 'download',
    },
  ],
});

export const content: SolutionContent = {
  accent: ACCENT,
  tint: '#eceefb',
  tasks: [
    {
      icon: 'dashboard',
      title: 'Monday morning',
      line: '₹1.86 L yesterday, across 3 outlets and online',
      screen: desk(product.stage?.back),
    },
    {
      icon: 'plug',
      title: 'Connections',
      line: 'Matching last night’s bills to each counter’s total…',
      screen: desk(screenOf(product, 'Connected')),
    },
    {
      icon: 'store',
      title: 'Outlets',
      line: 'Comparing wastage across the three outlets…',
      screen: desk(screenOf(product, 'One view')),
    },
  ],
  note: { label: 'Starts with', text: '₹10,000 · the System Blueprint', href: '#ways-in' },
  behind: {
    heading: { lead: 'The system behind', fill: 'every number.' },
    intro:
      'It works because the tools you keep are connected, not replaced, and every number is checked before it’s trusted.',
    cards: [
      {
        title: 'Every tool, connected',
        body: 'Counters, the online store, payments and accounts, linked through their APIs or exports.',
        cta: { label: 'API Integrations', href: '/services/api-integrations' },
      },
      {
        title: 'One view',
        body: 'Every outlet and channel side by side, with the same numbers for everyone.',
        cta: { label: 'Dashboards', href: '/services/dashboards' },
      },
      {
        title: 'Flagged as it happens',
        body: 'Cash that doesn’t match and stock below its reorder level, on your phone the same day.',
        cta: { label: 'Admin Panels & Internal Tools', href: '/services/internal-tools' },
      },
    ],
  },
  journey: {
    eyebrow: 'One night’s numbers',
    heading: { lead: '10:40 pm to Monday morning,', fill: 'without opening a spreadsheet.' },
    intro: 'The outlets close on Sunday night. Here is what happens next, on its own.',
    steps: [
      {
        time: '10:40 pm',
        title: 'Whitefield closes short',
        text: 'The closing count is ₹1,200 under what was billed, and it’s flagged at once.',
        screen: screenOf(product, 'Flagged'),
      },
      {
        time: '11:12 pm',
        title: 'Every number comes in',
        text: 'Counter bills, online orders and payments, each matched to its own tool’s total.',
        screen: NIGHT,
      },
      {
        time: '2:00 am',
        title: 'The books are posted',
        text: 'The day book goes to Tally, one voucher for each outlet.',
        screen: BOOKS,
      },
      {
        time: 'Monday',
        title: 'The week, on one screen',
        text: 'Three outlets and online: ₹11.4 L, up 7% on last week.',
        screen: WEEKLY!,
      },
    ],
  },
  system: {
    heading: { lead: 'How running it in', fill: 'one place works.' },
    intro: 'Across the phases, as the System Blueprint sets them.',
    points: [
      {
        icon: 'clipboard',
        title: 'Blueprint first',
        body: '[Every tool](/services/custom-software), sheet and chat mapped, with a phased plan and a fixed quote.',
      },
      {
        icon: 'plug',
        title: 'Connections',
        body: 'The tools you keep, linked through their [APIs](/services/api-integrations), exports or the systems we build.',
      },
      {
        icon: 'check',
        title: 'Clean, checked data',
        body: 'Cleaned, de-duplicated and checked against each tool’s own total.',
      },
      {
        icon: 'dashboard',
        title: 'One dashboard, by role',
        body: 'Every outlet, channel and number, updated on its own; owner, manager and accountant each see their part.',
      },
      {
        icon: 'bell',
        title: 'Flags and summaries',
        body: 'Problems flagged daily; a summary each week.',
      },
      {
        icon: 'table',
        title: 'Spreadsheets retired',
        body: 'Their jobs moved into the system, one at a time.',
      },
      {
        icon: 'download',
        title: 'Exports',
        body: 'What your accountant needs, ready each month.',
      },
      {
        icon: 'globe',
        title: 'Website, if needed',
        body: 'A redesign as part of Modernise & Connect.',
      },
      {
        icon: 'refresh',
        title: 'Growing',
        body: 'A new view or connection each month on [Evolve](/services/evolve).',
      },
    ],
  },
  benefits: {
    heading: { lead: 'What changes', fill: 'when ten tabs become one picture.' },
    intro: product.features.intro,
    points: benefitsOf(product, {
      'One view': 'dashboard',
      Connected: 'plug',
      'Spreadsheets retired': 'table',
      Flagged: 'bell',
      'In phases': 'layers',
    }),
  },
  built: {
    heading: { lead: 'Five services,', fill: 'built as one.' },
    intro:
      'Business Dashboard & CRM isn’t another tool to log in to. It’s five of our services, connecting the tools you keep and building only what’s missing.',
  },
  ways: {
    heading: { lead: 'Two ways in.', fill: 'Both start with a Blueprint.' },
    intro: product.price.intro,
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
        icon: 'clipboard',
        title: 'A Blueprint that counts',
        body: 'The ₹10,000 System Blueprint is credited in full if you go ahead.',
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
};

export { product };
