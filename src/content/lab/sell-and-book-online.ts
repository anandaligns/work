import type { Screen } from '@/components/screens/types';

import product from '../products/sell-and-book-online';
import type { EngineTab } from './never-miss-a-lead';

/**
 * The solution page under test, on Sell & Book Online: its sample studio — "Your Studio" — told
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
      'Sell & Book Online runs every order and booking through one system: it takes the payment, keeps stock and seats true, tells the customer what happens next, and puts it all in one admin.',
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

export { product };
