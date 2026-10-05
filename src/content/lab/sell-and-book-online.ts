import type { Screen } from '@/components/screens/types';

import product from '../products/sell-and-book-online';
import type { EngineTab } from './never-miss-a-lead';
import { benefitsOf, desk, screenOf, type SolutionContent } from './solution';

/**
 * The solution page under test, on Online Store & Bookings: its sample studio — "Your Studio" — told
 * as one customer's evening, the one system behind it, and the tools it works with. Served at
 * `/solutions/sell-and-book-online-test`, out of search and the sitemap. Every screen is the
 * product page's own, so the studio and its data stay the same invented ones.
 */

const [PIECE, WORKSHOP] = product.stage?.front ?? [];
const screen = (label: string) => product.features.items.find((i) => i.label === label)!.screen!;

export const studio = {
  accent: product.accent,

  tools: [
    'Razorpay',
    'Cashfree',
    'Shiprocket',
    'Google Calendar',
    'WhatsApp',
    'Gmail',
    'Instagram',
  ],

  journey: {
    eyebrow: 'One customer’s evening',
    heading: { lead: '8:02 pm to booked,', fill: 'while the studio is closed.' },
    intro:
      'Isha finds a vase after dinner, and a workshop to go with it. Here is what happens next, on its own.',
    steps: [
      {
        time: '8:02 pm',
        title: 'She finds a piece',
        text: 'A speckled vase, the only one of its kind, on her phone.',
        screen: PIECE!,
      },
      {
        time: '8:06 pm',
        title: 'She books two seats',
        text: 'Saturday’s wheel workshop, with only the free seats on offer.',
        screen: WORKSHOP!,
      },
      {
        time: '8:13 pm',
        title: 'She pays once',
        text: 'The vase and both seats together, ₹6,450 by UPI.',
        screen: screen('Paid upfront'),
      },
      {
        time: '8:14 pm',
        title: 'It’s all confirmed',
        text: 'What to bring, where to come, and when the vase ships.',
        screen: screen('Customers hear from you'),
      },
    ] satisfies { time: string; title: string; text: string; screen: Screen }[],
  },

  engine: {
    eyebrow: 'How it works',
    heading: { lead: 'One system,', fill: 'behind every sale.' },
    intro:
      'Online Store & Bookings runs every order and booking through one system: it takes the payment, keeps stock and seats true, tells the customer what happens next, and puts it all in one admin.',
    tabs: [
      {
        title: 'One checkout',
        text: 'Pieces and workshop seats, bought together from your site, Instagram or a link.',
        from: [{ icon: 'globe' }, { logo: 'instagram' }, { logo: 'whatsapp' }],
        to: [{ icon: 'cart' }, { icon: 'calendar' }, { icon: 'receipt' }],
      },
      {
        title: 'Paid before it’s promised',
        text: 'Paid at checkout or at booking, confirmed by your payment gateway.',
        from: [{ icon: 'cart' }, { icon: 'calendar' }, { icon: 'repeat' }],
        to: [{ logo: 'razorpay' }, { icon: 'receipt' }, { icon: 'rupee' }],
      },
      {
        title: 'Told what happens next',
        text: 'Confirmations, reminders and shipping updates on WhatsApp and email.',
        from: [{ icon: 'cart' }, { icon: 'calendar' }, { icon: 'truck' }],
        to: [{ logo: 'whatsapp' }, { logo: 'gmail' }, { logo: 'googlecalendar' }],
      },
      {
        title: 'One admin',
        text: 'Orders, bookings, stock and payments in one place, for you and your team.',
        from: [{ icon: 'cart' }, { icon: 'calendar' }, { icon: 'rupee' }],
        to: [{ icon: 'dashboard' }, { icon: 'database' }, { icon: 'truck' }],
      },
    ] satisfies EngineTab[],
  },
};

/** The page's colour: the home page's sky, from its second service card. */
const ACCENT = '#1e9be0';

/** The live page's words, in the solution pattern (`components/solutions/solution-page`). */
export const content: SolutionContent = {
  accent: ACCENT,
  tint: '#e5f3fb',
  tasks: [
    {
      icon: 'cart',
      title: 'New order',
      line: 'Isha Kapoor · a vase and 2 workshop seats · ₹6,450',
      screen: desk(screenOf(product, 'One admin')),
    },
    {
      icon: 'store',
      title: 'Stock and seats',
      line: 'Marking the speckled vase sold, and Saturday’s 10 am full…',
      screen: desk(screenOf(product, 'Stock and seats')),
    },
    {
      icon: 'calendar',
      title: 'Your week',
      line: 'Counting the seats sold on every session…',
      screen: desk(screenOf(product, 'Your week')),
    },
  ],
  note: { label: 'From', text: '₹42,000 · the Store', href: '#ways-in' },
  behind: {
    heading: { lead: 'The system behind', fill: 'every sale.' },
    intro:
      'It works because the store, the bookings and the messages share one admin, not three tools.',
    cards: [
      {
        title: 'One checkout',
        body: 'Pieces and workshop seats, bought together from your site, Instagram or a link.',
        cta: { label: 'E-commerce Stores', href: '/services/e-commerce-stores' },
      },
      {
        title: 'Paid before it’s promised',
        body: 'Paid at checkout or at booking, confirmed by your payment gateway.',
        cta: { label: 'Booking & Payment Workflows', href: '/services/booking-payment-workflows' },
      },
      {
        title: 'Told what happens next',
        body: 'Confirmations, reminders and shipping updates on WhatsApp and email.',
        cta: { label: 'WhatsApp & Email Automation', href: '/services/whatsapp-automation' },
      },
    ],
  },
  journey: studio.journey,
  system: {
    heading: { lead: 'How selling and booking', fill: 'online works.' },
    intro:
      'For a store, for bookings, or for both: one admin, one set of customers and one payment gateway.',
    points: [
      {
        icon: 'store',
        title: 'Catalogue or availability',
        body: '[Products](/services/e-commerce-stores) with photos, sizes, colours and stock, or sessions, slots and tables with their rules.',
      },
      {
        icon: 'rupee',
        title: 'Payments',
        body: '[Checkout](/services/booking-payment-workflows), deposits and payment links through your gateway; the gateway’s fees are its own.',
      },
      {
        icon: 'whatsapp',
        title: 'Updates on WhatsApp',
        body: '[Confirmations](/services/whatsapp-automation), updates and reminders from your number, on approved templates.',
      },
      {
        icon: 'truck',
        title: 'Shipping',
        body: 'Orders and shipping set up with a courier, with tracking sent to the customer.',
      },
      {
        icon: 'repeat',
        title: 'Changes and refunds',
        body: 'Customers change bookings within your rules; refunds recorded.',
      },
      {
        icon: 'people',
        title: 'Customers',
        body: 'One list of customers, whether they bought or booked.',
      },
      {
        icon: 'dashboard',
        title: 'One admin',
        body: 'Orders, bookings, stock and payments together.',
      },
      {
        icon: 'refresh',
        title: 'Looked after',
        body: 'Hosting, SSL, backups, security and changes on [Evolve](/services/evolve).',
      },
    ],
  },
  benefits: {
    heading: { lead: 'What changes', fill: 'when customers buy and book on their own.' },
    intro: product.features.intro,
    points: benefitsOf(product, {
      'Paid upfront': 'rupee',
      'Customers hear from you': 'whatsapp',
      'One admin': 'dashboard',
      'Stock and seats': 'store',
      'Your week': 'calendar',
    }),
  },
  built: {
    heading: { lead: 'Four services,', fill: 'built as one.' },
    intro:
      'Online Store & Bookings isn’t a checkout bolted onto a website. It’s four of our services, designed together and sharing one admin.',
  },
  ways: { heading: { lead: 'Two ways in.', fill: 'One admin.' }, intro: product.price.intro },
  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'Published prices',
        body: 'The Store at ₹42,000, booking from ₹45,000, custom work quoted in writing.',
      },
      {
        icon: 'key',
        title: 'Customers stay yours',
        body: 'Your customer list, orders and bookings belong to you.',
      },
      {
        icon: 'rupee',
        title: 'No cut of your sales',
        body: 'Only your payment gateway’s fee, never a commission on every sale.',
      },
      {
        icon: 'shield',
        title: 'A warranty',
        body: '45 days on the Store, then your Evolve plan.',
      },
      {
        icon: 'check',
        title: 'Tested with real orders',
        body: 'Real orders and bookings run end to end before launch.',
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
