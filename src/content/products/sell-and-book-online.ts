import { type Desk, duo, mac, phone, safari } from './kit';
import { SAMPLE_NOTE } from './shared';
import type { ProductPage } from './types';

/**
 * Sell & Book Online, presented as a product: a pottery studio — "Your Studio" — that sells its
 * pieces online and takes paid bookings for weekend workshops, with one admin for orders, seats,
 * stock and payments. The studio and its sample data are invented.
 */

const NAV: Desk['nav'] = [
  { label: 'Today', icon: 'home' },
  { label: 'Orders', icon: 'cart', count: '6' },
  { label: 'Workshops', icon: 'calendar', count: '4' },
  { label: 'Pieces', icon: 'store' },
  { label: 'Customers', icon: 'people' },
  { label: 'Payments', icon: 'rupee' },
];

const desk = (over: Omit<Desk, 'kind' | 'nav'>): Desk => ({
  kind: 'desk',
  brand: 'yourstudio',
  app: 'Your Studio',
  nav: NAV,
  user: { name: 'Tara Mehta', role: 'Owner' },
  ...over,
});

/** The studio's site on a laptop. */
const SITE = mac(
  'yourstudio.in',
  'Your Studio · Pieces and workshops',
  { kind: 'site', brand: 'yourstudio', device: 'desktop' },
  'yourstudio',
);

/** A piece on a phone: the vase, what's left, when it ships. */
const PIECE = safari(
  'yourstudio.in/shop/speckled-vase',
  {
    back: true,
    title: 'This week’s pieces',
    action: 'cart',
    blocks: [
      {
        t: 'product',
        art: 'vase',
        name: 'Speckled stoneware vase',
        line: 'Wheel-thrown · one of a kind',
        price: '₹1,650',
      },
      { t: 'note', text: 'Only this one. Each piece is made once.', icon: 'spark', tone: 'amber' },
      {
        t: 'list',
        items: [
          { title: 'Ships in 2 days', meta: 'Packed in the studio, with care', icon: 'truck' },
        ],
      },
    ],
    cta: 'Add to bag',
  },
  'yourstudio',
);

/** A workshop seat, booked and paid on a phone. */
const WORKSHOP = safari(
  'yourstudio.in/workshops',
  {
    title: 'Weekend wheel workshop',
    sub: '3 hours · clay, tools and firing included',
    blocks: [
      {
        t: 'dates',
        label: 'Day',
        items: [
          ['Sat', '20'],
          ['Sun', '21'],
          ['Sat', '27'],
          ['Sun', '28'],
        ],
        active: 0,
      },
      {
        t: 'slots',
        label: 'Time · seats left',
        items: ['10 am · 2', '2 pm · 5', '5 pm · 0'],
        active: 0,
        taken: [2],
      },
      { t: 'chips', label: 'Seats', items: ['1', '2', '3', '4'], active: 1 },
    ],
    cta: 'Book 2 seats · ₹4,800',
  },
  'yourstudio',
);

/** Paid before anything is promised. */
const PAY = phone(
  {
    back: true,
    title: 'Checkout',
    grey: true,
    blocks: [
      {
        t: 'list',
        items: [
          {
            art: 'vase',
            title: 'Speckled stoneware vase',
            meta: 'Piece · ships in 2 days',
            value: '₹1,650',
          },
          {
            title: 'Wheel workshop · 2 seats',
            meta: 'Sat 20 Sep, 10 am',
            value: '₹4,800',
            icon: 'calendar',
          },
        ],
      },
      {
        t: 'pay',
        to: 'Your Studio',
        amount: '₹6,450',
        methods: ['UPI app', 'Credit or debit card', 'Net banking'],
        active: 0,
      },
    ],
    cta: 'Pay ₹6,450',
  },
  'yourstudio',
);

/** The confirmation that follows: seats, what to bring, and the parcel. */
const CONFIRMED = phone(
  {
    chrome: 'mail',
    blocks: [
      {
        t: 'mail',
        from: 'Your Studio',
        subject: 'You’re booked: wheel workshop, Sat 20 Sep',
        time: '8:14 pm',
        lines: [
          'See you on Saturday at 10 am. Wear clothes that can get muddy.',
          'Your vase ships on Monday; we’ll send the tracking link.',
        ],
        fields: [
          ['Workshop', 'Wheel workshop · 2 seats'],
          ['When', 'Sat 20 Sep, 10 am – 1 pm'],
          ['Where', '14th Main, HSR Layout'],
          ['Paid', '₹6,450 · UPI'],
        ],
      },
      { t: 'buttons', items: ['Add to calendar', 'Directions'] },
    ],
  },
  'yourstudio',
);

/** Orders and bookings in one list. */
const TODAY = desk({
  active: 0,
  title: 'Today',
  tabs: ['Everything', 'Orders', 'Bookings'],
  actions: ['Add a booking'],
  blocks: [
    {
      type: 'kpis',
      items: [
        { label: 'Sales this week', value: '₹58,400', delta: '16%' },
        { label: 'Pieces sold', value: '19' },
        { label: 'Workshop seats sold', value: '26 of 32' },
        { label: 'To ship', value: '6' },
      ],
    },
    {
      type: 'table',
      columns: ['Customer', 'What', 'When', 'Paid'],
      rows: [
        {
          cells: ['Isha Kapoor', 'Vase + 2 workshop seats', 'Sat 10 am', '₹6,450'],
          avatar: true,
          pill: { text: 'New', tone: 'accent' },
          fresh: true,
        },
        {
          cells: ['Rohit Nair', 'Set of 4 mugs', 'Ships Mon', '₹2,800'],
          avatar: true,
          pill: { text: 'To pack', tone: 'amber' },
        },
        {
          cells: ['Maya D', 'Workshop · 1 seat', 'Sun 2 pm', '₹2,400'],
          avatar: true,
          pill: { text: 'Booked', tone: 'green' },
        },
        {
          cells: ['Karan S', 'Serving bowl', 'Delivered', '₹1,950'],
          avatar: true,
          pill: { text: 'Done', tone: 'grey' },
        },
      ],
    },
  ],
});

/** Pieces and seats: what's left of each. */
const STOCK = desk({
  active: 3,
  title: 'Pieces and seats',
  tabs: ['This week'],
  actions: ['Add a piece'],
  blocks: [
    {
      type: 'table',
      span: 7,
      title: 'Pieces',
      columns: ['Piece', 'Left', 'Price'],
      rows: [
        {
          cells: ['Speckled stoneware vase', '0', '₹1,650'],
          art: 'vase',
          pill: { text: 'Sold', tone: 'grey' },
        },
        {
          cells: ['Glazed mug, blue', '8', '₹700'],
          art: 'mug',
          pill: { text: 'In stock', tone: 'green' },
        },
        {
          cells: ['Cushion cover, block print', '3', '₹1,100'],
          art: 'cushion',
          pill: { text: 'Low', tone: 'amber' },
        },
        {
          cells: ['Canvas apron tote', '12', '₹900'],
          art: 'tote',
          pill: { text: 'In stock', tone: 'green' },
        },
      ],
    },
    {
      type: 'progress',
      span: 5,
      title: 'Workshop seats',
      items: [
        { label: 'Sat 20 · 10 am', value: 100, note: '8 of 8', hue: 'green' },
        { label: 'Sat 20 · 2 pm', value: 38, note: '3 of 8' },
        { label: 'Sun 21 · 10 am', value: 75, note: '6 of 8' },
        { label: 'Sun 21 · 2 pm', value: 100, note: '8 of 8', hue: 'green' },
      ],
    },
  ],
});

/** The studio's week: workshops and their seats. */
const WEEK = desk({
  active: 2,
  title: 'Workshops',
  tabs: ['This week', 'Next week'],
  actions: ['Add a workshop'],
  blocks: [
    {
      type: 'calendar',
      heads: ['Wed 17', 'Thu 18', 'Fri 19', 'Sat 20', 'Sun 21'],
      start: 9,
      hours: 10,
      today: 3,
      events: [
        { col: 0, from: 18, to: 20, title: 'Evening throw', meta: '5 of 8 seats', hue: 'blue' },
        { col: 1, from: 11, to: 13, title: 'Kids’ clay club', meta: '9 of 10 seats', hue: 'amber' },
        { col: 2, from: 18, to: 20, title: 'Glazing class', meta: '6 of 6 seats', hue: 'violet' },
        { col: 3, from: 10, to: 13, title: 'Wheel workshop', meta: '8 of 8 seats', fresh: true },
        { col: 3, from: 14, to: 17, title: 'Wheel workshop', meta: '3 of 8 seats' },
        { col: 4, from: 10, to: 13, title: 'Wheel workshop', meta: '6 of 8 seats' },
        { col: 4, from: 14, to: 17, title: 'Wheel workshop', meta: '8 of 8 seats' },
      ],
    },
  ],
});

/** Payments: every one matched to an order or a booking. */
const PAYMENTS = desk({
  active: 5,
  title: 'Payments',
  tabs: ['This week'],
  actions: ['Export'],
  blocks: [
    {
      type: 'table',
      span: 8,
      columns: ['For', 'Customer', 'Amount'],
      rows: [
        {
          cells: ['Order + workshop', 'Isha Kapoor', '₹6,450'],
          logo: 'Razorpay',
          pill: { text: 'Paid', tone: 'green' },
        },
        {
          cells: ['Order · 4 mugs', 'Rohit Nair', '₹2,800'],
          logo: 'Razorpay',
          pill: { text: 'Paid', tone: 'green' },
        },
        {
          cells: ['Workshop · 1 seat', 'Maya D', '₹2,400'],
          logo: 'Razorpay',
          pill: { text: 'Paid', tone: 'green' },
        },
        {
          cells: ['Workshop · cancelled', 'Arjun P', '−₹2,400'],
          logo: 'Razorpay',
          pill: { text: 'Refunded', tone: 'amber' },
        },
      ],
    },
    {
      type: 'donut',
      span: 4,
      title: 'This week',
      parts: [
        { label: 'Pieces', value: 31200 },
        { label: 'Workshops', value: 27200 },
      ],
      centre: { value: '₹58.4k', label: 'sales' },
    },
  ],
});

const page: ProductPage = {
  accent: '#4d7c0f',
  sub: 'An online store or a booking system that takes the payment and keeps every customer updated on WhatsApp.',

  stage: {
    tagline: 'Paid, and told what happens next.',
    toast: { title: 'New order · ₹6,450', line: 'A vase and 2 workshop seats' },
    back: SITE,
    front: [PIECE, WORKSHOP],
    photo: { file: 'sell-and-book-online-stage', alt: '' },
  },

  highlights: {
    heading: 'Selling and booking online at a glance',
    items: [
      { value: '₹42,000', label: 'The Store: up to 50 products, payments and orders.' },
      { value: '₹45,000', label: 'From, for booking with the Connected Website.' },
      { value: 'Paid first', label: 'At checkout or at booking, confirmed by the gateway.' },
      { value: 'One admin', label: 'For orders, bookings, stock and payments.' },
    ],
  },

  view: {
    statement:
      'A sale isn’t done when they say yes. It’s done when they’ve paid and know what happens next.',
    body: [
      '**Whether you sell things or time, three moments decide it**: can people buy or book without messaging you, do they pay up front, and do they hear from you afterwards?',
      '**Get those right and orders and bookings run themselves.** An [online store](/services/e-commerce-stores) takes the payment and updates the stock; a [booking system](/services/booking-payment-workflows) takes the slot and the deposit; [WhatsApp](/services/whatsapp-automation) tells the customer what happens next.',
      'Many businesses need both, and they share one admin, one set of customers and one payment gateway.',
    ],
    photo: {
      file: 'sell-and-book-pottery-studio',
      alt: 'A pottery studio with finished pieces on shelves and a workshop table set with wheels.',
    },
  },

  features: {
    heading: 'What selling and booking online does',
    intro: 'Five things that turn a yes into a paid, informed customer.',
    items: [
      {
        label: 'Paid upfront',
        title: 'Paid before anything is promised.',
        body: '**Customers pay at checkout or when they book**, and the gateway confirms it before the order or the seat is theirs — no screenshots, no chasing.',
        points: [
          'Checkout or payment at booking',
          'Payment links for anything later',
          'Receipts sent on their own',
        ],
        caption: 'A piece and two workshop seats, paid together',
        screen: PAY,
      },
      {
        label: 'Customers hear from you',
        title: 'Told what happens next, on their own.',
        body: '**Order updates, booking confirmations and reminders** go out on WhatsApp and email, without anyone typing them.',
        points: [
          'Order confirmations and shipping updates',
          'Booking confirmations and reminders',
          'Follow-ups after a missed booking',
        ],
        caption: 'The confirmation: seats, what to bring, and the parcel',
        screen: CONFIRMED,
      },
      {
        label: 'One admin',
        title: 'Orders and bookings in one list.',
        body: '**Orders, bookings, stock and payments in one place**, for you and your team — with walk-ins and phone orders added to the same list.',
        points: [
          'Orders and bookings together',
          'Stock and seats kept true',
          'Walk-ins and phone orders added by the team',
        ],
        caption: 'Today’s orders and bookings, together',
        screen: TODAY,
      },
      {
        label: 'Stock and seats',
        title: 'Never sell the last piece twice.',
        body: '**Every sale updates what’s left**, and every booking takes a seat, so a sold-out workshop closes itself and a one-of-a-kind piece sells once.',
        points: ['Stock by piece or variant', 'Seats by session', 'Sold out closes on its own'],
        caption: 'Pieces and seats, and what’s left of each',
        screen: STOCK,
      },
      {
        label: 'Your week',
        title: 'Every session, and every seat.',
        body: '**The week’s sessions on one calendar**, with seats sold on each, so you know which to promote and which to add.',
        points: [
          'Sessions and seats on one calendar',
          'Waitlists when a session fills',
          'Synced with Google Calendar where needed',
        ],
        caption: 'The studio’s week, with seats sold on each session',
        screen: WEEK,
      },
    ],
  },

  included: {
    heading: 'What’s included',
    intro: 'For a store, for bookings, or for both.',
    items: [
      {
        icon: 'store',
        title: 'Catalogue',
        body: 'Products with photos, sizes, colours and stock.',
      },
      {
        icon: 'calendar',
        title: 'Availability',
        body: 'Sessions, slots or tables, with their rules.',
      },
      {
        icon: 'rupee',
        title: 'Payments',
        body: 'Checkout, deposits and payment links through your gateway.',
      },
      { icon: 'truck', title: 'Shipping', body: 'Order and shipping set up, with tracking.' },
      {
        icon: 'whatsapp',
        title: 'Updates on WhatsApp',
        body: 'Confirmations, updates and reminders from your number.',
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
        icon: 'shield',
        title: 'Hosting and security',
        body: 'SSL, backups and updates on Evolve.',
      },
    ],
  },

  compare: {
    heading: 'Selling and booking online compared',
    intro: 'What changes when customers buy and book on their own.',
    us: 'A store and bookings of your own, with one admin behind them.',
    options: [
      {
        label: 'DMs and calls',
        note: 'Orders and bookings taken in messages and on the phone.',
        rows: [
          {
            topic: 'Buying and booking',
            without: 'Orders and bookings in DMs and calls',
            with: 'Customers buy and book on their own',
          },
          {
            topic: 'Payment',
            without: 'Payments chased afterwards',
            with: 'Paid at checkout or at booking',
          },
          {
            topic: 'After the sale',
            without: '“Where’s my order?” and no-shows',
            with: 'Updates and reminders on WhatsApp',
          },
          {
            topic: 'Keeping track',
            without: 'Orders, bookings and stock in different places',
            with: 'One admin for all of it',
          },
        ],
      },
      {
        label: 'Marketplaces',
        note: 'Selling and booking through someone else’s platform.',
        rows: [
          {
            topic: 'Your brand',
            without: 'Listed next to competitors',
            with: 'Your own site and name',
          },
          {
            topic: 'Customers',
            without: 'They belong to the platform',
            with: 'Your customer list is yours',
          },
          {
            topic: 'Fees',
            without: 'A commission on every sale',
            with: 'Only your payment gateway’s fee',
          },
          { topic: 'Rules', without: 'Their policies, their layout', with: 'Your rules, your way' },
        ],
      },
      {
        label: 'Two separate tools',
        note: 'A store builder and a booking app, each on its own.',
        rows: [
          { topic: 'Customers', without: 'Two lists of the same people', with: 'One list' },
          {
            topic: 'Checkout',
            without: 'Two checkouts, two gateways',
            with: 'Pieces and seats in one basket',
          },
          { topic: 'Admin', without: 'Two places to check each morning', with: 'One admin' },
          {
            topic: 'Messages',
            without: 'Different messages from each',
            with: 'One voice, from your number',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How selling and booking online works',
    screen: duo(
      mac('yourstudio.in/admin', 'Payments · Your Studio', PAYMENTS, 'yourstudio'),
      WORKSHOP,
    ),
    blocks: [
      {
        title: 'Catalogue or availability',
        body: '[Products](/services/e-commerce-stores) with sizes and stock, or slots with their rules.',
      },
      {
        title: 'Payments',
        body: '[Checkout](/services/booking-payment-workflows), deposits and links; the gateway’s fees are its own.',
      },
      {
        title: 'Messages',
        body: '[Confirmations](/services/whatsapp-automation), updates and reminders from approved templates.',
      },
      { title: 'One admin', body: 'Orders, bookings, stock and payments together.' },
      { title: 'Shipping', body: 'Courier set up, with tracking sent to the customer.' },
      {
        title: 'Looked after',
        body: 'Hosting, security and changes on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'Payments, shipping, calendars and messages, set up for you.',
    groups: [
      { name: 'Payments', items: ['Razorpay', 'Cashfree'] },
      { name: 'Shipping', items: ['Shiprocket'] },
      { name: 'Calendar', items: ['Google Calendar'] },
      { name: 'Messages', items: ['WhatsApp', 'Gmail'] },
      { name: 'Selling on', items: ['Instagram'] },
    ],
  },

  industries: {
    heading: 'Who sells and books online with us',
    items: [
      { sector: 'Retail', text: 'Products sold online, with stock and shipping handled.' },
      { sector: 'Hospitality', text: 'Tables and events booked, with deposits for groups.' },
      { sector: 'Clinics', text: 'Appointments booked and paid, with reminders.' },
      { sector: 'Education', text: 'Classes and workshops booked, with seats and fees.' },
      { sector: 'Professional Services', text: 'Consultations booked and paid in advance.' },
      { sector: 'Manufacturing', text: 'Spare parts and small orders sold direct.' },
    ],
  },

  build: {
    heading: 'How we build it',
    steps: [
      {
        title: 'Your products or your slots',
        body: 'Catalogue and shipping rules, or availability and booking rules.',
      },
      { title: 'Design', body: 'The store or booking pages in your brand, phones first.' },
      { title: 'Build', body: 'Checkout or booking, payments, messages and the admin.' },
      { title: 'Test', body: 'Real orders and bookings, end to end.' },
      {
        title: 'Launch',
        body: 'A 45-day warranty on the Store, then your [Evolve](/services/evolve) plan.',
      },
    ],
  },

  price: {
    heading: 'Two ways in',
    intro:
      'A store for selling things, a booking system for selling time — or both, sharing one admin.',
    rows: [
      'Online store and catalogue',
      'Payment gateway',
      'Order and shipping setup',
      'Online booking',
      'Confirmations and reminders on WhatsApp',
      'No-show follow-ups',
      'Hosting and security',
    ],
    packages: [
      {
        name: 'E-commerce System',
        summary: 'Starts with the Store, for up to 50 products; WhatsApp order updates quoted.',
        price: '₹42,000',
        unit: 'One-time, for the Store',
        timeline: '4–5 weeks',
        values: [true, true, true, false, 'Quoted', false, true],
        cta: 'Start with the Store',
        interest: 'store',
      },
      {
        name: 'Booking & Appointment System',
        summary: 'Online booking with payments, reminders and follow-ups.',
        price: 'From ₹45,000',
        unit: 'With the Connected Website',
        timeline: '4–6 weeks',
        values: [false, 'Optional', false, true, true, true, true],
        cta: 'Talk to us about booking',
        interest: 'booking-system',
        focal: true,
      },
    ],
    note: 'Product descriptions written for you: ₹120 each, optional.',
    notes: [
      'Payment gateways and couriers charge their own fees, paid to them, not to Pixel Kinetix. Meta charges for some WhatsApp messages; we estimate them upfront.',
    ],
  },

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
        icon: 'layers',
        title: 'One system',
        body: 'Store and bookings sharing one admin and one gateway.',
      },
      { icon: 'shield', title: 'A warranty', body: '45 days on the Store, then your Evolve plan.' },
      {
        icon: 'whatsapp',
        title: 'Your own number',
        body: 'Updates from your number on the official WhatsApp Business Platform.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'Selling and booking questions',
    items: [
      {
        question: 'How much does it cost to sell and book online?',
        answer:
          'The Store starts at ₹42,000 for up to 50 products. Online booking comes with the Connected Website, from ₹45,000. WhatsApp order updates and larger systems are quoted in writing.',
      },
      {
        question: 'A store or a booking system: which do I need?',
        answer:
          'Selling products, the store. Selling time (appointments, tables, classes), the booking system. Some businesses need both, and they share one system.',
      },
      {
        question: 'Can I have both a store and bookings?',
        answer: 'Yes. They share one admin, one set of customers and one payment gateway.',
      },
      {
        question: 'Which payment gateway do you use?',
        answer:
          'The one that suits your business, and we set it up. It offers the usual ways to pay, and its fees are its own.',
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
      {
        question: 'Can customers change their booking?',
        answer:
          'Yes. Every confirmation and reminder carries a link to change or cancel, within your rules.',
      },
      {
        question: 'Can I sell one-of-a-kind pieces?',
        answer: 'Yes. A piece with a stock of one closes itself once it’s sold.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Razorpay, Cashfree, Shiprocket, Google, Instagram and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
