import type { Screen } from '@/components/screens/types';

import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * Mobile Apps, presented as a product: the page's words. Its pictures are its own mockups
 * (`components/lab/mocks-mobile-apps.tsx`), from its sample business, a Restaurant / Food Ordering
 * Brand; the one screen kept here is the app's home, which the home hero borrows for the app's
 * tile. The restaurant and its sample data are invented, never a client.
 */

const TABS = ['Home', 'Orders', 'Book', 'Rewards', 'Account'];

const HOME = {
  kind: 'mobile',
  brand: 'restaurant',
  tabs: TABS,
  view: {
    type: 'home',
    place: 'Indiranagar',
    greeting: 'Good evening, Arjun',
    promo: {
      eyebrow: 'Sunday special',
      title: 'Mangalorean thali',
      line: '₹420 · pre-order by Saturday',
      dish: 'thali',
    },
    chips: ['All', 'Dosas', 'Coffee', 'Meals', 'Sweets'],
    again: [
      { name: 'Masala dosa', price: '₹120', dish: 'dosa' },
      { name: 'Filter coffee', price: '₹60', dish: 'coffee' },
      { name: 'Idli, 2 pcs', price: '₹70', dish: 'idli' },
    ],
  },
} satisfies Screen;

const page: ProductPage = {
  accent: '#f43f5e',
  accentDark: '#be123c',
  sub: 'iOS and Android apps for the customers who come back again and again, or the team that works away from a desk.',

  stage: { front: [HOME] },

  highlights: {
    heading: 'Mobile apps at a glance',
    items: [
      { value: 'iOS + Android', label: 'Both apps, usually from one codebase.' },
      { value: 'Yours', label: 'Published under your own App Store and Google Play accounts.' },
      { value: '₹65,000', label: 'From, with a fixed quote after a System Blueprint.' },
      { value: '45 days', label: 'Warranty on every phase we deliver.' },
    ],
  },

  view: {
    statement: 'Your regulars deserve a shortcut.',
    body: [
      '**A mobile app** is for the people who come back every week. [A website](/services/business-websites) is how new customers find you; an app is one tap to order the usual, book a table or check their rewards — with a notification when it’s ready. It turns a habit into a channel you own.',
      '**It can also be for your team**: the people on the road, on the shop floor or at a site, who need their jobs, forms and photos in their pocket.',
      'Both iOS and Android are usually built from one codebase, on the same system as your website and admin, so menus, prices, orders and [bookings](/services/booking-payment-workflows) stay in step everywhere.',
    ],
    photo: {
      file: 'mobile-app-restaurant-takeaway-pickup',
      alt: 'A customer collecting a takeaway order at a restaurant counter.',
    },
  },

  features: {
    heading: 'What a mobile app does',
    intro: 'Five things an app does that a website and social media can’t.',
    items: [
      {
        label: 'Regulars',
        title: 'The quickest way back.',
        body: '**Saved orders, saved details and favourites**, so a regular’s weekly order takes seconds instead of a call.',
        points: [
          '“Order again” and favourites',
          'Saved payment and pickup details',
          'Offers where regulars already look',
        ],
        caption: 'The app’s home screen',
      },
      {
        label: 'Notifications',
        title: 'A direct line to your customers.',
        body: '**Notifications for the moments that matter**, to people who chose to get them — without depending on social media reach.',
        points: [
          'Order ready and booking reminders',
          'Offers, sparingly',
          'No reliance on social media reach',
        ],
        caption: 'Notifications on the lock screen',
      },
      {
        label: 'Bookings',
        title: 'A table in two taps.',
        body: '**Dates, times and party size, with the slots that are really free**, and a reminder the day before.',
        points: [
          'Live availability',
          'Reminders with confirm or change',
          'Bookings in your admin at once',
        ],
        caption: 'Booking a table in the app',
      },
      {
        label: 'Yours',
        title: 'Published under your name.',
        body: '**The app goes out under your own App Store and Google Play accounts**, so it stays yours. We plan the launch around the stores’ reviews and keep it current on Evolve.',
        points: [
          'Your own store accounts',
          'Store review planned into the launch',
          'Kept current with new phone versions',
        ],
        caption: 'The app’s own page',
      },
      {
        label: 'One system',
        title: 'One system behind the app, the website and the counter.',
        body: '**The same menu, orders and bookings everywhere**, so nothing is updated twice and every customer has one record — whether they ordered in the app, on the website, on WhatsApp or at the counter.',
        points: [
          'One menu and price list',
          'One order list for every channel',
          'One customer record',
        ],
        caption: 'Every channel’s orders in one admin',
      },
    ],
  },

  included: {
    heading: 'Mobile app features',
    intro: 'What a business app can include, chosen with you in the System Blueprint.',
    items: [
      { icon: 'devices', title: 'iOS and Android', body: 'Both apps, usually from one codebase.' },
      { icon: 'key', title: 'Sign in by phone', body: 'A one-time code, no passwords to forget.' },
      { icon: 'repeat', title: 'Order again', body: 'Saved orders and favourites, one tap away.' },
      { icon: 'calendar', title: 'Bookings', body: 'Tables, slots or appointments in two taps.' },
      {
        icon: 'rupee',
        title: 'Payments',
        body: 'Through a payment gateway; its fees are its own.',
      },
      {
        icon: 'bell',
        title: 'Notifications',
        body: 'Order ready, reminders and offers, with permission.',
      },
      {
        icon: 'target',
        title: 'Rewards',
        body: 'Points and offers in the app, not on paper cards.',
      },
      { icon: 'pin', title: 'Maps and pickup', body: 'Directions and pickup details in a tap.' },
      {
        icon: 'table',
        title: 'An admin for your team',
        body: 'Menu, prices, orders and customers, managed in one place.',
      },
      {
        icon: 'plug',
        title: 'Connected',
        body: 'To your website, payments and the tools behind them.',
      },
      {
        icon: 'store',
        title: 'Store publishing',
        body: 'Under your own App Store and Google Play accounts.',
      },
      { icon: 'refresh', title: 'Kept current', body: 'Updated for new phone versions on Evolve.' },
    ],
  },

  compare: {
    heading: 'Mobile apps compared',
    intro: 'What an app changes, against the ways regulars reach you today.',
    us: 'An app of your own, on the App Store and Google Play.',
    options: [
      {
        label: 'Calls and chats',
        note: 'Regulars ordering by phone and WhatsApp.',
        rows: [
          {
            topic: 'Ordering',
            without: 'Regulars call to order',
            with: 'Regulars order in one tap',
          },
          {
            topic: 'Details',
            without: 'Details asked for every time',
            with: 'Saved details and favourites',
          },
          { topic: 'Loyalty', without: 'Loyalty on paper cards', with: 'Rewards in the app' },
          {
            topic: 'Orders',
            without: 'Orders in different places',
            with: 'One order list for every channel',
          },
        ],
      },
      {
        label: 'Social media',
        note: 'An Instagram or Facebook page.',
        rows: [
          {
            topic: 'Reach',
            without: 'Posts reach whoever the platform chooses',
            with: 'Notifications to people who chose them',
          },
          { topic: 'Orders', without: 'Orders in DMs', with: 'Orders paid in the app' },
          {
            topic: 'Offers',
            without: 'Offers lost in the feed',
            with: 'Offers where regulars already look',
          },
          {
            topic: 'The customer',
            without: 'Customers belong to the platform',
            with: 'A channel you own',
          },
        ],
      },
      {
        label: 'A web app',
        note: 'A web app opened from a link.',
        rows: [
          {
            topic: 'Opening it',
            without: 'Opened from a link when needed',
            with: 'On the home screen, always one tap away',
          },
          {
            topic: 'Best for',
            without: 'Best for now-and-then use',
            with: 'Best for daily, habit-driven use',
          },
          {
            topic: 'Phone features',
            without: 'Limited use of the phone',
            with: 'Notifications and the phone’s features',
          },
          {
            topic: 'Being found',
            without: 'Found by link or search',
            with: 'Found in the App Store and Google Play',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How a mobile app is built',
    blocks: [
      {
        icon: 'code',
        title: 'One codebase, two apps',
        body: 'iOS and Android built together, so they stay in step.',
      },
      {
        icon: 'bell',
        title: 'Notifications',
        body: 'Sent at the right moment, with the customer’s permission.',
      },
      { icon: 'plug', title: 'Connected', body: 'The same system as your website and admin.' },
      {
        icon: 'key',
        title: 'Yours',
        body: 'Published under your own App Store and Google Play accounts.',
      },
      {
        icon: 'check',
        title: 'Store review',
        body: 'Apple and Google review every app before it goes live; the launch date is planned around it.',
      },
      {
        icon: 'refresh',
        title: 'Kept current',
        body: 'Updates for new phone versions, and your changes each month, on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the stores and tools you need',
    groups: [
      { name: 'Stores', items: ['App Store', 'Google Play'] },
      { name: 'Payments', items: ['Razorpay'] },
      { name: 'Messaging', items: ['WhatsApp'] },
      { name: 'Maps', items: ['Google Maps'] },
    ],
  },

  industries: {
    heading: 'Who a mobile app is for',
    items: [
      { sector: 'Retail', text: 'Reorders, offers and loyalty points one tap away.' },
      { sector: 'Hospitality', text: 'Order ahead, book a table and collect rewards.' },
      { sector: 'Education', text: 'Timetables, results and notices for students and parents.' },
      { sector: 'Startups', text: 'Your product on iOS and Android, usually from one codebase.' },
      {
        sector: 'Clinics',
        text: 'Appointments, reports and reminders for patients who come back.',
      },
      {
        sector: 'Manufacturing',
        text: 'Field and shop-floor apps: jobs, forms and photos in the team’s pocket.',
      },
    ],
  },

  build: {
    heading: 'How we build a mobile app',
    steps: [
      {
        title: 'System Blueprint',
        body: 'Who the app is for, and the few things it must do first.',
      },
      { title: 'Design', body: 'Screens tested on real phones before anything is built.' },
      { title: 'Build and test', body: 'Both apps, the admin, and the connections behind them.' },
      {
        title: 'Store review',
        body: 'Apple and Google review every app before it goes live; we plan for it.',
      },
      {
        title: 'Launch and Evolve',
        body: 'Updates for new phone versions, and your improvements each month.',
      },
    ],
  },

  price: {
    heading: 'Mobile app pricing',
    intro: 'Every app starts with a System Blueprint, credited in full if you go ahead.',
    ...blueprintAndCustom({
      built: 'Both apps built, tested and published',
      summary: 'iOS and Android apps with their admin, on one system with your website.',
      interest: 'mobile-apps',
    }),
    note: 'The stores’ own fees are paid to Apple and Google.',
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'Mobile app questions',
    items: [
      {
        question: 'How much does a mobile app cost?',
        answer:
          'It starts with a System Blueprint for ₹10,000, credited in full if you go ahead. Apps are Custom, from ₹65,000, with a fixed quote for each phase. The stores’ own fees are paid to Apple and Google.',
      },
      {
        question: 'Do we need both iOS and Android?',
        answer:
          'Most businesses do. We usually build both from one codebase, so it costs less than two separate apps.',
      },
      {
        question: 'Whose account is the app published under?',
        answer:
          'Yours. It goes out under your own App Store and Google Play accounts, so the app stays yours. The stores’ fees are paid to Apple and Google.',
      },
      {
        question: 'Do we need a website too?',
        answer:
          'Most businesses do: people find you on Google, then download the app. We connect both to the same system.',
      },
      {
        question: 'How long does store approval take?',
        answer:
          'Apple and Google review every app before it goes live, and the time varies. We plan the launch date around it.',
      },
      {
        question: 'Who keeps the app working with new phone versions?',
        answer: 'We do, on Evolve, along with the changes you ask for each month.',
      },
      {
        question: 'Can the app work with our existing website?',
        answer: 'Yes. Both run on one system, so menus, prices and orders stay in step.',
      },
      {
        question: 'Can we send notifications to customers?',
        answer:
          'Yes, to people who allow them — order updates, reminders and the occasional offer. We keep them to the moments that matter.',
      },
      {
        question: 'Can it take payments?',
        answer: 'Yes, through a payment gateway. The gateway’s fees are its own.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'App Store is a trademark of Apple Inc. Google Play is a trademark of Google LLC.',
  ],
};

export default page;
