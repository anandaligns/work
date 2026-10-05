import { safari } from './kit';
import { SAMPLE_NOTE } from './shared';
import type { ProductPage } from './types';

/**
 * Booking & Payment Workflows, presented as a product: the page's words. Its pictures are its own
 * mockups (`components/lab/mocks-booking-payment-workflows.tsx`), from its sample business, a Salon
 * & Beauty Studio; the one screen kept here is the booking page in Safari, which the home hero
 * borrows for the booking tile. The salon and its sample data are invented, never a client.
 */

/** The booking page in Safari: a day, a stylist and the slots really free. */
const BOOK = safari(
  'salonbeautystudio.in/book',
  {
    title: 'Book a slot',
    sub: 'Salon & Beauty Studio · Koramangala',
    blocks: [
      {
        t: 'dates',
        label: 'Day',
        items: [
          ['Fri', '19'],
          ['Sat', '20'],
          ['Sun', '21'],
          ['Mon', '22'],
        ],
        active: 1,
      },
      {
        t: 'chips',
        label: 'Stylist',
        items: ['Any', 'Ananya', 'Rhea', 'Farah'],
        active: 1,
      },
      {
        t: 'list',
        title: 'Free on Saturday',
        items: [
          {
            title: 'Hair colour · 6:00 pm',
            meta: 'With Ananya · 90 min',
            value: '₹2,500',
            icon: 'calendar',
            pill: { text: '1 left', tone: 'amber' },
          },
          {
            title: 'Haircut · 5:30 pm',
            meta: 'With Rhea · 45 min',
            value: '₹800',
            icon: 'calendar',
          },
          {
            title: 'Facial · 6:30 pm',
            meta: 'With Farah · 60 min',
            value: '₹1,800',
            icon: 'calendar',
          },
        ],
      },
    ],
    cta: 'Reserve · ₹500 deposit',
  },
  'salon',
);

const page: ProductPage = {
  accent: '#ec4899',
  accentDark: '#be185d',
  sub: 'Clients book and pay on their own, confirmations and reminders go out on WhatsApp, and every stylist’s week sits on one calendar.',

  stage: { front: [BOOK] },

  highlights: {
    heading: 'Online booking at a glance',
    items: [
      { value: 'Direct', label: 'Rooms, tables or slots booked on your own website, at any hour.' },
      { value: 'Deposits', label: 'A deposit or full payment at booking, through your gateway.' },
      { value: '₹45,000', label: 'From, with the Connected Website and three months of Evolve.' },
      { value: '1 reply', label: 'To confirm or change, from the message on WhatsApp.' },
    ],
  },

  view: {
    statement: 'An empty chair this evening is an hour you can’t sell again.',
    body: [
      '**Bookings by phone and WhatsApp tie up the person who should be looking after clients.** A booking page takes them at any hour, shows only slots that are really free, and asks for a deposit — so the booking counts.',
      '**Messages do the rest.** A confirmation the moment they book, a reminder and the location the day before, and your cancellation rules applied the same way every time.',
      'It comes with the [Connected Website](/solutions/lead-automation), or as a Booking & Appointment System on its own — for [rooms, tables, appointments and classes](/solutions/online-store-and-bookings).',
    ],
    photo: {
      file: 'booking-salon-reception',
      alt: 'A salon’s reception in the evening, with a client checking in for her appointment.',
    },
  },

  features: {
    heading: 'What online booking does',
    intro: 'Five jobs that leave the front desk free for the clients in front of it.',
    items: [
      {
        label: 'Online booking',
        title: 'Slots booked without the phone.',
        body: '**Clients pick a service, a stylist and a slot that’s really free**, at any hour, from your own website — and walk-ins and phone bookings go on the same calendar, so no slot is sold twice.',
        points: [
          'Live availability, no double bookings',
          'Prices by service, weekday and weekend',
          'Walk-ins added by your team',
        ],
        caption: 'The booking page, with only slots that are free',
      },
      {
        label: 'Payments',
        title: 'The deposit comes with the booking.',
        body: '**A deposit or full payment at booking, through your payment gateway**, with a receipt sent on its own — and a payment link for the balance, if you want it paid before the visit.',
        points: [
          'Deposit or full payment',
          'Receipts sent on their own',
          'Payment links for the balance',
        ],
        caption: 'Paying the deposit, UPI first',
      },
      {
        label: 'Confirmations',
        title: 'Everything for the visit, before they arrive.',
        body: '**A confirmation the moment they book, and a reminder the day before** on WhatsApp, with the time, the stylist, the location and a way to change the slot.',
        points: [
          'Confirmation, receipt and directions',
          'A reminder the day before',
          'Slot changes within your rules',
        ],
        caption: 'The confirmation, and what the client can do from it',
      },
      {
        label: 'Cancellations',
        title: 'Your rules, applied every time.',
        body: '**Cancellations and changes follow the rules you set** — free until a cut-off, the deposit kept after it — and a no-show is recorded with what happened to the deposit.',
        points: [
          'Free cancellation until your cut-off',
          'Deposits kept or refunded by rule',
          'Changes carried over, not lost',
        ],
        caption: 'This month’s changes and cancellations',
      },
      {
        label: 'Calendar',
        title: 'Every stylist’s day, on one calendar.',
        body: '**Every stylist, every booking, on one calendar**, with online, phone and walk-in bookings together — so the front desk sees what’s free at a glance.',
        points: [
          'Every chair, room or person',
          'Online, phone and walk-in bookings together',
          'Blocks for breaks, training and events',
        ],
        caption: 'The afternoon’s calendar, stylist by stylist',
      },
    ],
  },

  included: {
    heading: 'Online booking features',
    intro: 'Everything that comes with it, set up for you.',
    items: [
      {
        icon: 'calendar',
        title: 'Live availability',
        body: 'Only rooms, tables or slots that are really free.',
      },
      {
        icon: 'layers',
        title: 'Rates and rules',
        body: 'Prices by service, weekday and weekend, gaps and cut-offs.',
      },
      {
        icon: 'rupee',
        title: 'Deposits and payments',
        body: 'A deposit or the full amount at booking, through your gateway.',
      },
      {
        icon: 'receipt',
        title: 'Receipts',
        body: 'A receipt for every payment, sent the moment it’s made.',
      },
      {
        icon: 'whatsapp',
        title: 'WhatsApp confirmations',
        body: 'Confirmations and reminders from approved templates.',
      },
      {
        icon: 'repeat',
        title: 'Changes and cancellations',
        body: 'Clients change or cancel within your rules.',
      },
      {
        icon: 'bell',
        title: 'Team alerts',
        body: 'A note to the right person when a booking is made or changed.',
      },
      {
        icon: 'people',
        title: 'Walk-ins and phone bookings',
        body: 'Added by your team on the same calendar.',
      },
      {
        icon: 'history',
        title: 'Client history',
        body: 'Every visit, payment and request on the client’s record.',
      },
    ],
  },

  compare: {
    heading: 'Online booking compared',
    intro: 'What changes when clients book and pay on their own.',
    us: 'Direct bookings, deposits and messages on your own website and number.',
    options: [
      {
        label: 'Phone and WhatsApp',
        note: 'Bookings taken by phone and WhatsApp through the day.',
        rows: [
          {
            topic: 'Taking bookings',
            without: 'Bookings by phone between clients',
            with: 'Bookings online, at any hour',
          },
          {
            topic: 'Deposits',
            without: 'Deposits chased by hand',
            with: 'Deposits paid with the booking',
          },
          {
            topic: 'Before the visit',
            without: 'Reminders typed for every client',
            with: 'Reminders sent on their own',
          },
          {
            topic: 'Cancellations',
            without: 'Rules applied differently each time',
            with: 'Your rules, applied every time',
          },
        ],
      },
      {
        label: 'A register',
        note: 'A register or a shared spreadsheet at the front desk.',
        rows: [
          {
            topic: 'Availability',
            without: 'Only the front desk knows what’s free',
            with: 'Clients see what’s free for themselves',
          },
          {
            topic: 'Double bookings',
            without: 'Two names in the same slot',
            with: 'A slot taken is gone for everyone',
          },
          {
            topic: 'History',
            without: 'Past visits in old pages',
            with: 'Every visit on the client’s record',
          },
          {
            topic: 'Payments',
            without: 'Deposits noted by hand',
            with: 'Every payment recorded with its booking',
          },
        ],
      },
      {
        label: 'Booking sites',
        note: 'Booking apps and marketplaces that list you with others.',
        rows: [
          {
            topic: 'Your brand',
            without: 'Your slots next to the salon down the road',
            with: 'Your own page, your own name',
          },
          {
            topic: 'The client',
            without: 'The app keeps the client’s details',
            with: 'Your client list is yours',
          },
          {
            topic: 'Fees',
            without: 'A commission on every booking',
            with: 'Only your payment gateway’s fee',
          },
          {
            topic: 'Messages',
            without: 'Their messages, their templates',
            with: 'Messages from your own number',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How online booking and payments work',
    blocks: [
      {
        icon: 'clock',
        title: 'Availability',
        body: 'Your rooms, tables or people with their rules, so nothing is double-booked.',
      },
      {
        icon: 'rupee',
        title: 'Payments',
        body: 'Through a payment gateway, with receipts; the gateway’s fees are its own.',
      },
      {
        icon: 'whatsapp',
        title: 'Messages',
        body: 'Confirmations and reminders on [WhatsApp](/services/whatsapp-automation), from approved templates.',
      },
      {
        icon: 'calendar',
        title: 'Calendar',
        body: 'Synced with Google Calendar where you need it.',
      },
      {
        icon: 'filter',
        title: 'Rules',
        body: 'Prices, gaps between slots, deposits and cancellation cut-offs, set by you.',
      },
      {
        icon: 'history',
        title: 'Records',
        body: 'Every booking, payment and message kept on the client’s record.',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'We connect the tools you have, so bookings and payments land where you already look.',
    groups: [
      { name: 'Payments', items: ['Razorpay', 'Cashfree'] },
      { name: 'Calendar', items: ['Google Calendar'] },
      { name: 'Messaging', items: ['WhatsApp Business Platform', 'Gmail'] },
      { name: 'Accounts', items: ['Zoho Books', 'Tally'] },
      { name: 'Sheets', items: ['Google Sheets'] },
    ],
  },

  industries: {
    heading: 'Who online booking suits',
    items: [
      {
        sector: 'Hospitality',
        text: 'Rooms booked direct with deposits, and tables for large groups.',
      },
      {
        sector: 'Clinics',
        text: 'Appointments at every branch, with reminders before each visit.',
      },
      { sector: 'Education', text: 'Demo classes and workshops, booked and paid online.' },
      {
        sector: 'Professional Services',
        text: 'Consultations booked into your calendar and paid in advance.',
      },
      {
        sector: 'Retail',
        text: 'Fittings, alterations and pick-up slots, booked by the customer.',
      },
      { sector: 'Real Estate', text: 'Site visits booked into each salesperson’s day.' },
    ],
  },

  build: {
    heading: 'How we set up online booking',
    steps: [
      {
        title: 'Map the rules',
        body: 'Services and slots, prices, deposits, gaps and cancellations.',
      },
      { title: 'Set up payments', body: 'Your payment gateway, payment links and receipts.' },
      {
        title: 'Build the flow',
        body: 'The booking page, the front desk’s calendar and every message.',
      },
      {
        title: 'Test with real bookings',
        body: 'Every path, including changes, refunds and no-shows.',
      },
      {
        title: 'Launch and improve',
        body: 'Rules adjusted as you learn what works, on [Evolve](/services/evolve).',
      },
    ],
  },

  price: {
    heading: 'Online booking pricing',
    intro:
      'Online booking comes with the Connected Website, or as a Booking & Appointment System with payments.',
    rows: [
      'Online booking page',
      'Confirmations and reminders on WhatsApp',
      'Deposits and payments',
      'Cancellation and no-show rules',
      'Google Calendar sync',
      'A new website, designed for your brand',
      'Evolve care',
    ],
    packages: [
      {
        name: 'Connected Website',
        summary: 'A new website with every enquiry answered, booked and tracked.',
        price: 'From ₹45,000',
        unit: 'One-time',
        timeline: '4–6 weeks',
        values: [
          true,
          true,
          'Optional',
          false,
          false,
          'Three revision rounds',
          '3 months included',
        ],
        cta: 'Start with the Connected Website',
        interest: 'connected-website',
        focal: true,
      },
      {
        name: 'Booking & Appointment System',
        summary:
          'Booking and payments for more rooms, people and rules, on your own site or a new one.',
        price: 'Quoted',
        unit: 'In writing, before we start',
        values: [true, true, true, true, true, false, 'Optional, from ₹899 a month'],
        cta: 'Ask for a quote',
        interest: 'booking-system',
      },
    ],
    note: 'For booking inside your own software, see [Custom](/services/custom-software), after a System Blueprint.',
    notes: [
      'Payment gateways charge a fee on each payment, set by the gateway and paid to it, not to Pixel Kinetix. Meta charges for some WhatsApp messages by category; we estimate them upfront.',
    ],
  },

  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'The price, in writing',
        body: 'A published starting price and a written quote before any custom work.',
      },
      {
        icon: 'key',
        title: 'Your clients stay yours',
        body: 'Your client list, bookings and payments belong to you, not to a booking app.',
      },
      {
        icon: 'whatsapp',
        title: 'Your own number',
        body: 'Messages from your number on the official WhatsApp Business Platform.',
      },
      {
        icon: 'refresh',
        title: 'Looked after on Evolve',
        body: 'Rates, rules and messages changed by message, every month.',
      },
      {
        icon: 'plug',
        title: 'Connected',
        body: 'Calendar, payments and accounts kept in step with every booking.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'Online booking questions',
    items: [
      {
        question: 'How much does online booking cost?',
        answer:
          'Online booking comes with the Connected Website, from ₹45,000. A Booking & Appointment System with payments is quoted in writing before we start.',
      },
      {
        question: 'Can clients book directly instead of through booking apps?',
        answer:
          'Yes. Clients book on your own website, pay a deposit through your payment gateway, and the booking lands on your calendar — with no commission to anyone.',
      },
      {
        question: 'Can it sync with Google Calendar?',
        answer:
          'Yes, where you need it to. Calendar sync is part of the Booking & Appointment System.',
      },
      {
        question: 'Can customers pay when they book?',
        answer:
          'Yes, if you want them to: a deposit or the full amount. The payment gateway’s fees are its own.',
      },
      {
        question: 'Can clients change their slot themselves?',
        answer: 'Yes. Every confirmation carries a link to change or cancel, within your rules.',
      },
      {
        question: 'What about walk-ins and phone bookings?',
        answer: 'Your team adds them on the same calendar, so availability stays true.',
      },
      {
        question: 'Does it work for tables, appointments and classes too?',
        answer:
          'Yes. The same system books rooms, tables, people or seats, each with its own rules.',
      },
      {
        question: 'Can you send payment reminders for the balance?',
        answer: 'Yes. Payment links and reminders go out on WhatsApp and email until it’s paid.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Google Calendar is a trademark of Google LLC. WhatsApp is a trademark of Meta Platforms, Inc. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
