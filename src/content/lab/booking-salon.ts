import type { IconName } from '@/components/ui/icon';

import { type Desk, duo, mac, phone, safari } from '../products/kit';
import { SAMPLE_NOTE } from '../products/shared';
import type { ProductPage } from '../products/types';

/**
 * A test page: Booking & Payment Workflows with the salon example — "Your Salon" — to try the
 * full-width dark opening before it replaces the page intro and panel on every product page.
 * Served at `/services/booking-salon-test`, kept out of search and the sitemap. The salon, its
 * clients and sample data are invented.
 */

const NAV: Desk['nav'] = [
  { label: 'Calendar', icon: 'calendar' },
  { label: 'Bookings', icon: 'clipboard', count: '38' },
  { label: 'Clients', icon: 'people' },
  { label: 'Services', icon: 'layers' },
  { label: 'Payments', icon: 'rupee' },
  { label: 'Settings', icon: 'wrench' },
];

const desk = (over: Omit<Desk, 'kind' | 'nav'>): Desk => ({
  kind: 'desk',
  brand: 'yoursalon',
  app: 'Your Salon',
  nav: NAV,
  group: { title: 'Stylists', items: ['Ritu', 'Aman', 'Zoya'] },
  user: { name: 'Pooja Menon', role: 'Front desk' },
  ...over,
});

/** Saturday at the salon: every chair's day, with the booking that just came in online. */
const DAY = desk({
  active: 0,
  title: 'Saturday, 20 Sep',
  tabs: ['Day', 'Week'],
  actions: ['Block time', 'New booking'],
  blocks: [
    {
      type: 'calendar',
      heads: ['Ritu', 'Aman', 'Zoya', 'Spa room'],
      start: 10,
      hours: 9,
      now: 12.4,
      events: [
        { col: 0, from: 10, to: 11, title: 'Haircut · Neha S', meta: 'Paid', hue: 'green' },
        { col: 0, from: 11.5, to: 13.5, title: 'Global colour · Divya R', meta: 'Deposit ₹500' },
        {
          col: 0,
          from: 16.5,
          to: 17.25,
          title: 'Haircut & blow-dry',
          meta: 'Kavya M · booked online',
          fresh: true,
        },
        {
          col: 1,
          from: 10.5,
          to: 11.25,
          title: 'Beard trim · Arjun',
          meta: 'Walk-in',
          hue: 'grey',
        },
        { col: 1, from: 12, to: 13, title: 'Haircut · Rahul P', meta: 'Confirmed', hue: 'blue' },
        { col: 1, from: 15, to: 16, title: 'Hair spa · Sameer', meta: 'Confirmed', hue: 'blue' },
        {
          col: 2,
          from: 11,
          to: 12.5,
          title: 'Keratin · Farah K',
          meta: 'Deposit ₹1,000',
          hue: 'violet',
        },
        { col: 2, from: 14, to: 15, title: 'Haircut · Isha N', meta: 'Confirmed', hue: 'violet' },
        { col: 3, from: 10, to: 11.5, title: 'Facial · Meera J', meta: 'Paid', hue: 'amber' },
        { col: 3, from: 13, to: 14.5, title: 'Massage · Ananya', meta: 'Confirmed', hue: 'amber' },
        { col: 3, from: 17, to: 18.5, title: 'Pedicure · Sana', meta: 'Not confirmed', hue: 'red' },
      ],
    },
  ],
  aside: [
    {
      type: 'record',
      title: 'Kavya M',
      subtitle: 'Haircut & blow-dry · 4:30 pm · Ritu',
      avatar: true,
      fields: [
        ['Booked', 'Online, 11:48 pm'],
        ['Deposit', '₹300 · paid by UPI'],
        ['At the salon', '₹900'],
        ['Visits', '4th'],
      ],
      timeline: [
        { time: 'Thu, 11:48 pm', text: 'Booked from the website', icon: 'calendar' },
        { time: 'Thu, 11:49 pm', text: 'Deposit paid · receipt sent', icon: 'receipt' },
        { time: 'Fri, 6:00 pm', text: 'Reminder sent · confirmed by reply', logo: 'WhatsApp' },
      ],
      actions: ['Check in', 'Reschedule'],
    },
  ],
});

/** The week at a glance: every booking, coloured by stylist. */
const WEEK = desk({
  active: 0,
  title: 'This week',
  tabs: ['Week', 'Day'],
  actions: ['Share with the team'],
  blocks: [
    {
      type: 'calendar',
      heads: ['Mon 15', 'Tue 16', 'Wed 17', 'Thu 18', 'Fri 19', 'Sat 20'],
      start: 10,
      hours: 9,
      today: 4,
      now: 14.6,
      events: [
        { col: 0, from: 11, to: 12, title: 'Haircut', meta: 'Ritu' },
        { col: 0, from: 15, to: 17, title: 'Colour', meta: 'Zoya', hue: 'violet' },
        { col: 1, from: 10, to: 11.5, title: 'Facial', meta: 'Spa', hue: 'amber' },
        { col: 1, from: 13, to: 14, title: 'Haircut', meta: 'Aman', hue: 'blue' },
        { col: 2, from: 12, to: 14, title: 'Keratin', meta: 'Zoya', hue: 'violet' },
        { col: 2, from: 17, to: 18, title: 'Beard', meta: 'Aman', hue: 'blue' },
        { col: 3, from: 11, to: 12, title: 'Haircut', meta: 'Ritu' },
        { col: 3, from: 16, to: 17.5, title: 'Spa', meta: 'Spa', hue: 'amber' },
        { col: 4, from: 10.5, to: 11.5, title: 'Haircut', meta: 'Ritu' },
        { col: 4, from: 14, to: 15.5, title: 'Colour', meta: 'Zoya', hue: 'violet' },
        { col: 4, from: 17, to: 18, title: 'Haircut', meta: 'Aman', hue: 'blue' },
        { col: 5, from: 10, to: 11, title: 'Haircut', meta: 'Ritu' },
        { col: 5, from: 11.5, to: 13.5, title: 'Colour', meta: 'Ritu' },
        { col: 5, from: 16.5, to: 17.25, title: 'Blow-dry', meta: 'Ritu · new', fresh: true },
      ],
    },
  ],
});

/** The booking page in Safari: a service, a stylist, a day and a time that's really free. */
const BOOK = safari(
  'yoursalon.in/book',
  {
    title: 'Book at Your Salon',
    sub: '80 Feet Road, Koramangala',
    blocks: [
      {
        t: 'list',
        items: [
          {
            title: 'Haircut & blow-dry',
            meta: '45 min · with a stylist',
            value: '₹1,200',
            icon: 'spark',
          },
        ],
      },
      { t: 'chips', label: 'Stylist', items: ['Anyone', 'Ritu', 'Aman', 'Zoya'], active: 1 },
      {
        t: 'dates',
        label: 'Day',
        items: [
          ['Thu', '18'],
          ['Fri', '19'],
          ['Sat', '20'],
          ['Sun', '21'],
        ],
        active: 2,
      },
      {
        t: 'slots',
        label: 'Time',
        items: ['10:00', '11:30', '1:00', '2:30', '4:30', '6:00'],
        active: 4,
        taken: [0, 1, 3],
      },
    ],
    cta: 'Continue · ₹300 deposit',
  },
  'yoursalon',
);

/** Paying the deposit: what's paid now, what's paid at the salon. */
const PAY = phone(
  {
    back: true,
    title: 'Pay the deposit',
    grey: true,
    blocks: [
      {
        t: 'doc',
        title: 'Sat 20 Sep · 4:30 pm',
        meta: 'Haircut & blow-dry · with Ritu',
        lines: [
          ['Service', '₹1,200'],
          ['Deposit now', '₹300'],
          ['At the salon', '₹900'],
        ],
      },
      {
        t: 'pay',
        to: 'Your Salon',
        amount: '₹300',
        methods: ['UPI app', 'Credit or debit card', 'Net banking'],
        active: 0,
      },
    ],
    cta: 'Pay ₹300',
    ctaNote: 'Free to change until Fri, 4:30 pm',
  },
  'yoursalon',
);

/** Booked: the confirmation, and what the client can do from it. */
const CONFIRMED = phone(
  {
    title: 'You’re booked',
    sub: 'Booking YS-5821',
    action: 'close',
    grey: true,
    blocks: [
      {
        t: 'hero',
        eyebrow: 'Confirmed',
        value: 'Sat, 4:30 pm',
        label: 'Haircut & blow-dry · with Ritu',
        line: 'Deposit ₹300 paid · receipt sent',
      },
      {
        t: 'list',
        items: [
          { title: 'Add to calendar', meta: 'Google or Apple', icon: 'calendar' },
          { title: 'Change or cancel', meta: 'Free until Fri, 4:30 pm', icon: 'repeat' },
          { title: 'Directions', meta: '80 Feet Road, Koramangala', icon: 'pin' },
        ],
      },
      {
        t: 'note',
        text: 'A reminder comes on WhatsApp the evening before: reply 1 to confirm, 2 to change.',
        icon: 'bell',
      },
    ],
  },
  'yoursalon',
);

/** Missed bookings and what happened next. */
const NO_SHOWS = desk({
  active: 1,
  title: 'Missed and cancelled',
  tabs: ['This month', 'Last month'],
  actions: ['Export'],
  blocks: [
    {
      type: 'kpis',
      items: [
        { label: 'Confirmed by reply', value: '82%' },
        { label: 'Rescheduled from a reminder', value: '31' },
        { label: 'Missed this month', value: '6' },
        { label: 'Rebooked after a follow-up', value: '4' },
      ],
    },
    {
      type: 'table',
      columns: ['Client', 'Missed', 'Service', 'Deposit'],
      rows: [
        {
          cells: ['Sana A', 'Today, 5:00 pm', 'Pedicure', 'Kept · ₹300'],
          avatar: true,
          pill: { text: 'Follow-up sent', tone: 'accent' },
          fresh: true,
        },
        {
          cells: ['Rohan K', 'Thu, 12:00 pm', 'Haircut', 'None'],
          avatar: true,
          pill: { text: 'Rebooked', tone: 'green' },
        },
        {
          cells: ['Meghna S', 'Tue, 3:30 pm', 'Colour', 'Kept · ₹500'],
          avatar: true,
          pill: { text: 'Rebooked', tone: 'green' },
        },
        {
          cells: ['Vikram J', 'Mon, 6:00 pm', 'Beard trim', 'None'],
          avatar: true,
          pill: { text: 'No reply', tone: 'grey' },
        },
      ],
    },
  ],
});

/** Services, durations, deposits and the rules the booking page follows. */
const RULES = desk({
  active: 3,
  title: 'Services and rules',
  actions: ['Save'],
  blocks: [
    {
      type: 'table',
      span: 7,
      title: 'Services',
      columns: ['Service', 'Time', 'Price', 'Deposit'],
      rows: [
        { cells: ['Haircut & blow-dry', '45 min', '₹1,200', '₹300'], icon: 'spark' },
        { cells: ['Global colour', '2 h', '₹3,800', '₹500'], icon: 'spark' },
        { cells: ['Keratin treatment', '1 h 30', '₹5,500', '₹1,000'], icon: 'spark' },
        { cells: ['Facial', '1 h 30', '₹2,400', '₹300'], icon: 'spark' },
        { cells: ['Beard trim', '30 min', '₹450', 'None'], icon: 'spark' },
      ],
    },
    {
      type: 'form',
      span: 5,
      title: 'Booking rules',
      fields: [
        { label: 'Book up to', value: '30 days ahead', kind: 'select' },
        { label: 'Gap between clients', value: '10 minutes', kind: 'select' },
        { label: 'Free changes until', value: '24 hours before', kind: 'select' },
        { label: 'Reminder', value: 'Evening before, 6 pm', kind: 'select' },
        { label: 'Take a deposit', value: 'On', kind: 'toggle' },
        { label: 'Follow up no-shows', value: 'On', kind: 'toggle' },
      ],
    },
  ],
});

const page: ProductPage = {
  accent: '#be185d',
  sub: 'Customers book and pay on their own, confirmations and reminders go out on WhatsApp, and missed bookings get a follow-up.',

  stage: {
    tagline: 'A booked chair, not a ringing phone.',
    toast: { title: 'New booking · Sat 4:30 pm', line: 'Haircut & blow-dry · deposit paid' },
    back: DAY,
    front: [BOOK, CONFIRMED],
    photo: { file: 'booking-salon-test-stage', alt: '' },
  },

  highlights: {
    heading: 'Online booking at a glance',
    items: [
      { value: 'Any hour', label: 'Bookings taken from your website or a link, day or night.' },
      { value: 'Optional', label: 'A deposit or full payment at booking, through your gateway.' },
      { value: '₹45,000', label: 'From, with the Connected Website and three months of Evolve.' },
      { value: '1 reply', label: 'To confirm or change, from the reminder on WhatsApp.' },
    ],
  },

  view: {
    statement: 'A no-show is a slot you turned someone else away from.',
    body: [
      '**Bookings by phone tie up the person who should be serving.** A booking page takes them at any hour, shows only slots that are really free, and asks for a small deposit where you want one — so the booking counts.',
      '**Reminders do the rest.** The evening before, a message asks the client to confirm or change in one reply; a missed booking gets a polite follow-up to rebook.',
      'It comes with the [Connected Website](/solutions/lead-automation), or as a Booking & Appointment System on its own, for [salons, clinics, classes and rooms](/solutions/online-store-and-bookings).',
    ],
    photo: {
      file: 'booking-salon-front-desk',
      alt: 'A salon’s front desk in the evening, with a tablet showing the day’s bookings.',
    },
  },

  features: {
    heading: 'What online booking does',
    intro: 'Five jobs that leave the front desk free for the people in front of it.',
    items: [
      {
        label: 'Online booking',
        title: 'Bookings without the phone.',
        body: '**Clients pick a service, a person, a day and a time that’s really free**, at any hour, from your website or a link you share — and walk-ins and phone bookings go on the same calendar, so nothing is booked twice.',
        points: [
          'Live availability, no double bookings',
          'Rules for each service and person',
          'Walk-ins added by your team',
        ],
        caption: 'The booking page, with only free slots on offer',
        screen: BOOK,
      },
      {
        label: 'Payments',
        title: 'The payment comes with the booking.',
        body: '**A deposit or full payment at booking, through your payment gateway**, with a receipt sent on its own — and payment links for anything paid later.',
        points: [
          'Optional deposit or full payment',
          'Receipts sent on their own',
          'Payment links and reminders until paid',
        ],
        caption: 'Paying a deposit at booking, UPI first',
        screen: PAY,
      },
      {
        label: 'Reminders',
        title: 'Reminders people answer.',
        body: '**A confirmation the moment they book, and a reminder the evening before** on WhatsApp, with confirm or change in one reply and a link to add it to their calendar.',
        points: [
          'Confirmation, receipt and directions',
          'A reminder with confirm or change',
          'Changes within your rules, on their own',
        ],
        caption: 'The confirmation, and what the client can do from it',
        screen: CONFIRMED,
      },
      {
        label: 'No-shows',
        title: 'A missed booking gets a second chance.',
        body: '**Anyone who misses a booking gets a polite follow-up** with a link to rebook, and your list shows who came back — so an empty slot doesn’t become a lost client.',
        points: [
          'A follow-up after every missed booking',
          'Deposits kept or refunded by your rules',
          'Missed and rebooked, counted each month',
        ],
        caption: 'Missed bookings, and what happened next',
        screen: NO_SHOWS,
      },
      {
        label: 'Your calendar',
        title: 'The whole week, on one screen.',
        body: '**Every booking for every person, room or chair**, with online, phone and walk-in bookings together — and Google Calendar kept in step where you use it.',
        points: [
          'Every person, room or chair',
          'Online, phone and walk-in bookings together',
          'Synced with Google Calendar where needed',
        ],
        caption: 'The week, every booking coloured by stylist',
        screen: WEEK,
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
        body: 'Only slots that are really free, for each person or room.',
      },
      {
        icon: 'layers',
        title: 'Services and durations',
        body: 'Each service with its own time, price, gap and who can do it.',
      },
      {
        icon: 'rupee',
        title: 'Deposits and payments',
        body: 'A deposit or the full amount at booking, through your payment gateway.',
      },
      {
        icon: 'receipt',
        title: 'Receipts',
        body: 'A receipt for every payment, sent the moment it’s made.',
      },
      {
        icon: 'whatsapp',
        title: 'WhatsApp confirmations',
        body: 'Confirmations and reminders from approved templates, on your own number.',
      },
      {
        icon: 'repeat',
        title: 'Change or cancel',
        body: 'Clients change or cancel from the message, within your rules.',
      },
      {
        icon: 'bell',
        title: 'Team alerts',
        body: 'A note to the right person when a booking is made, changed or missed.',
      },
      {
        icon: 'people',
        title: 'Walk-ins and phone bookings',
        body: 'Added by your team on the same calendar, so the list stays true.',
      },
      {
        icon: 'history',
        title: 'Client history',
        body: 'Every booking, payment and message on the client’s record.',
      },
    ],
  },

  compare: {
    heading: 'Online booking compared',
    intro: 'What changes when clients book and pay on their own.',
    us: 'Bookings, payments and reminders on your own website and number.',
    options: [
      {
        label: 'Phone and WhatsApp',
        note: 'Bookings taken by phone and WhatsApp during the day.',
        rows: [
          {
            topic: 'Taking bookings',
            without: 'Bookings by phone during service',
            with: 'Bookings online, at any hour',
          },
          {
            topic: 'No-shows',
            without: 'No-shows with no warning',
            with: 'Reminders with confirm or change',
          },
          {
            topic: 'Deposits',
            without: 'Deposits chased by hand',
            with: 'Deposits paid with the booking',
          },
          {
            topic: 'Payment reminders',
            without: 'Payment reminders typed one by one',
            with: 'Payment links and reminders sent on their own',
          },
        ],
      },
      {
        label: 'A diary',
        note: 'A paper diary or a shared spreadsheet at the front desk.',
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
            topic: 'Missed bookings',
            without: 'Nobody follows up',
            with: 'A follow-up goes out on its own',
          },
        ],
      },
      {
        label: 'A booking app',
        note: 'A marketplace or booking app that lists you with others.',
        rows: [
          {
            topic: 'Your brand',
            without: 'Your salon next to the one down the road',
            with: 'Your own page, your own name',
          },
          {
            topic: 'The client',
            without: 'The app owns the client’s details',
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
    screen: duo(mac('yoursalon.in/admin', 'Services · Your Salon', RULES, 'yoursalon'), PAY),
    blocks: [
      {
        title: 'Availability',
        body: 'Your slots, people and rooms with their rules, so nothing is double-booked.',
      },
      {
        title: 'Payments',
        body: 'Through a payment gateway, with receipts; the gateway’s fees are its own.',
      },
      {
        title: 'Messages',
        body: 'Confirmations and reminders on [WhatsApp](/services/whatsapp-automation), from approved templates.',
      },
      { title: 'Calendar', body: 'Synced with Google Calendar where you need it, both ways.' },
      {
        title: 'Rules',
        body: 'How far ahead, gaps between clients, deposits and free changes, set by you.',
      },
      { title: 'Records', body: 'Every booking, payment and message kept on the client’s record.' },
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
        sector: 'Clinics',
        text: 'Appointments at every branch, with reminders that cut no-shows.',
      },
      {
        sector: 'Hospitality',
        text: 'Table bookings with deposits for large groups and set menus.',
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
        body: 'Services, people, capacities, deposits, changes and cancellations.',
      },
      { title: 'Set up payments', body: 'Your payment gateway, payment links and receipts.' },
      { title: 'Build the flow', body: 'The booking page, the team’s calendar and every message.' },
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
      'No-show follow-ups',
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
          'Booking and payments for more people, rooms and rules, on your own site or a new one.',
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
        body: 'Your client list, bookings and payments belong to you, not to an app.',
      },
      {
        icon: 'whatsapp',
        title: 'Your own number',
        body: 'Messages from your number on the official WhatsApp Business Platform.',
      },
      {
        icon: 'refresh',
        title: 'Looked after on Evolve',
        body: 'Rules, prices and messages changed by message, every month.',
      },
      {
        icon: 'plug',
        title: 'Connected',
        body: 'Calendar, payments, accounts and CRM kept in step with every booking.',
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
        question: 'Can customers reschedule themselves?',
        answer:
          'Yes. Every confirmation and reminder carries a link to change or cancel, within your rules.',
      },
      {
        question: 'What about walk-ins and phone bookings?',
        answer: 'Your team adds them on the same calendar, so the list stays true.',
      },
      {
        question: 'Can it handle several people, rooms or tables?',
        answer: 'Yes. Each one has its own slots, services and rules.',
      },
      {
        question: 'What happens when someone doesn’t turn up?',
        answer:
          'They get a polite follow-up with a link to rebook, and the deposit is kept or refunded by the rules you set.',
      },
      {
        question: 'Can you send payment reminders for invoices too?',
        answer:
          'Yes. Payment links and reminders go out on WhatsApp and email until the invoice is paid.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Google Calendar is a trademark of Google LLC. WhatsApp is a trademark of Meta Platforms, Inc. Pixel Kinetix is not affiliated with them.',
  ],
};

/**
 * What the opening shows the system doing, one task at a time: a line in the chip over the
 * window, and the screen it's done on.
 */
export const tasks: { icon: IconName; title: string; line: string; screen: Desk }[] = [
  {
    icon: 'calendar',
    title: 'New booking',
    line: 'Kavya M · Sat 4:30 pm · deposit paid',
    screen: DAY,
  },
  {
    icon: 'whatsapp',
    title: 'Reminders',
    line: 'Sending tomorrow’s reminders on WhatsApp…',
    screen: WEEK,
  },
  {
    icon: 'repeat',
    title: 'No-show follow-up',
    line: 'Asking Sana A to rebook…',
    screen: NO_SHOWS,
  },
  {
    icon: 'wrench',
    title: 'Booking rules',
    line: 'Holding a 10-minute gap between clients…',
    screen: RULES,
  },
];

export default page;
