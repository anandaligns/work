import { SAMPLE_NOTE } from './shared';
import { safari } from './kit';
import type { ProductPage } from './types';

/**
 * E-commerce Stores, presented as a product: the page's words. Its pictures are its own mockups
 * (`components/lab/mocks-e-commerce-stores.tsx`), from its sample business, a Fashion / Clothing
 * Store; the one screen kept here is a product page on a phone, which `/services` borrows for the
 * front of its group's picture and the home hero for the store's tile. The store and its sample
 * data are invented, never a client.
 */

/** A product page on a phone: pictures, sizes, what's left and when it arrives. */
const PRODUCT = safari(
  'fashionclothingstore.in/indigo-kurta',
  {
    back: true,
    title: 'Kurtas',
    action: 'cart',
    blocks: [
      {
        t: 'product',
        art: 'kurta',
        name: 'Indigo block-print kurta',
        line: 'Hand block-printed cotton · Bagru, Rajasthan',
        price: '₹1,890',
        was: '₹2,290',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        size: 1,
      },
      { t: 'note', text: 'Only 2 left in M', icon: 'alert', tone: 'amber' },
      {
        t: 'list',
        items: [
          { title: 'Arrives by Thu, 18 Sep', meta: 'Free delivery over ₹999', icon: 'truck' },
          { title: 'Easy 7-day returns', meta: 'Pick-up from your door', icon: 'repeat' },
        ],
      },
    ],
    cta: 'Add to bag',
  },
  'fashionstore',
);

const page: ProductPage = {
  accent: '#7c3aed',
  accentDark: '#5b21b6',
  sub: 'An online store that takes the payment, updates the stock and tells the customer where their order is, so selling stops living in your DMs.',

  stage: { front: [PRODUCT] },

  highlights: {
    heading: 'Online stores at a glance',
    items: [
      { value: '₹42,000', label: 'The Store: up to 50 products, in three payments.' },
      { value: '4–5 weeks', label: 'From your catalogue to taking orders.' },
      { value: 'Paid', label: 'Before the order exists — confirmed by the gateway.' },
      { value: '45 days', label: 'Warranty after launch, then your Evolve plan.' },
    ],
  },

  view: {
    statement: 'Instagram finds you the customers. A store is where they can actually buy.',
    body: [
      '**An e-commerce store** is a website where customers choose, pay and get updates without messaging you. Most small brands start by selling in DMs: a photo, a price, a payment screenshot, an address typed out by hand. It works until the orders pile up.',
      '**A store does the same job for every customer at once.** It takes the payment itself through a gateway, updates the stock with every sale, keeps the record of every order, and — as an E-commerce System — sends order and shipping updates on [WhatsApp](/services/whatsapp-automation).',
      'Your posts can link straight to products, so a DM becomes a checkout. If you also take bookings, see [Sell & Book Online](/solutions/sell-and-book-online).',
    ],
    photo: {
      file: 'ecommerce-store-handloom-order-packing',
      alt: 'Packing a handloom order for shipping.',
    },
  },

  features: {
    heading: 'What an e-commerce store does',
    intro: 'Five jobs a store takes off your phone.',
    items: [
      {
        label: 'Checkout and payments',
        title: 'Customers pay without messaging you.',
        body: '**A catalogue with sizes and colours, a cart and a checkout connected to a payment gateway.** The order exists only once the payment is confirmed — no screenshots, no chasing.',
        points: [
          'Catalogue with variants and photos',
          'Cart and checkout, built for phones',
          'Payment confirmed by the gateway, not by a screenshot',
        ],
        caption: 'Checkout on a phone, with UPI first',
      },
      {
        label: 'Stock',
        title: 'Stock that tells the truth.',
        body: '**Every sale updates the count**, per size and colour, so you never sell the last piece twice — and the admin warns you when something runs low.',
        points: [
          'Stock per size and colour',
          'Updated with every sale',
          'Low-stock warnings in the admin',
        ],
        caption: 'Stock by size, and what is about to run out',
      },
      {
        label: 'Order updates',
        title: 'Customers know where their order is.',
        body: '**Order and shipping are set up from the start**, with confirmations by email and — with an E-commerce System — updates on WhatsApp at every step.',
        points: [
          'Order confirmation by email',
          'Shipping details from the order',
          'WhatsApp updates with an E-commerce System',
        ],
        caption: 'The shipping email, with the tracking number',
      },
      {
        label: 'Your admin',
        title: 'Run the store yourself.',
        body: '**The store admin lets you add products, change prices and manage stock** without a developer, and every order is there with its payment and shipping details.',
        points: [
          'Add and edit products',
          'Change prices and run sales',
          'Every order, paid and shipped, in one list',
        ],
        caption: 'Every order on a board, from new to delivered',
      },
      {
        label: 'Reports',
        title: 'See what sells, and where it sells.',
        body: '**Sales, orders and best sellers by day, week or month**, with where each order came from — Instagram, Google or a WhatsApp share — so you know what to restock and where to post.',
        points: [
          'Sales and orders by day, week and month',
          'Best sellers and slow movers',
          'Where every order came from',
        ],
        caption: 'Sales, best sellers and where orders came from',
      },
    ],
  },

  included: {
    heading: 'E-commerce store features',
    intro: 'What the Store comes with, and what an E-commerce System adds.',
    items: [
      {
        icon: 'store',
        title: 'A catalogue',
        body: 'Up to 50 products on the Store, each with sizes, colours and photos.',
      },
      { icon: 'cart', title: 'Cart and checkout', body: 'Built for phones first, in a few taps.' },
      {
        icon: 'card',
        title: 'Payment gateway',
        body: 'The one that suits your business; its fees are its own.',
      },
      {
        icon: 'database',
        title: 'Live stock',
        body: 'Per size and colour, updated with every sale.',
      },
      {
        icon: 'truck',
        title: 'Shipping setup',
        body: 'Your shipping rules, and a shipping partner if you use one.',
      },
      {
        icon: 'mail',
        title: 'Order emails',
        body: 'Confirmations sent the moment an order is paid.',
      },
      {
        icon: 'whatsapp',
        title: 'WhatsApp updates',
        body: 'Confirmed, shipped and delivered, with an E-commerce System.',
      },
      {
        icon: 'table',
        title: 'Your admin',
        body: 'Add products, change prices and manage stock yourself.',
      },
      {
        icon: 'link',
        title: 'Instagram product links',
        body: 'Posts that link straight to the product.',
      },
      { icon: 'chart', title: 'Analytics', body: 'What people look at, add to cart and buy.' },
      {
        icon: 'lock',
        title: 'SSL and backups',
        body: 'Secure checkout, with daily backups and monitoring on Evolve.',
      },
      {
        icon: 'pen',
        title: 'Product descriptions',
        body: 'Written for you for ₹120 each, if you’d like.',
      },
    ],
  },

  compare: {
    heading: 'Online stores compared',
    intro: 'What changes when selling moves out of the DMs and into a store.',
    us: 'A store of your own, set up, tested and looked after.',
    options: [
      {
        label: 'Selling in DMs',
        note: 'Taking orders and payments in Instagram DMs and WhatsApp.',
        rows: [
          {
            topic: 'Orders',
            without: 'Orders in DMs and screenshots',
            with: 'Orders and payments in one admin',
          },
          {
            topic: 'Stock',
            without: 'Stock counted by hand',
            with: 'Stock updated with every sale',
          },
          {
            topic: 'Order updates',
            without: '“Where is my order?” messages',
            with: 'Shipping updates sent on their own',
          },
          {
            topic: 'Payments',
            without: 'Payments checked against screenshots',
            with: 'Payments confirmed by the gateway',
          },
        ],
      },
      {
        label: 'Marketplaces',
        note: 'Listing on the big online marketplaces.',
        rows: [
          {
            topic: 'Competition',
            without: 'Your products next to a competitor’s',
            with: 'Your store, your brand, only your products',
          },
          {
            topic: 'The customer',
            without: 'The customer belongs to the marketplace',
            with: 'Every customer and order is yours',
          },
          {
            topic: 'Presentation',
            without: 'Their rules for how you present things',
            with: 'Your photos, your words, your layout',
          },
          {
            topic: 'Fees',
            without: 'A commission on every sale',
            with: 'Only the gateway’s own fees per payment',
          },
        ],
      },
      {
        label: 'DIY store builders',
        note: 'A template store you set up yourself.',
        rows: [
          {
            topic: 'Setup',
            without: 'A template you set up yourself',
            with: 'Designed in your brand and set up for you',
          },
          {
            topic: 'Payments and shipping',
            without: 'Payments and shipping left to figure out',
            with: 'Gateway and shipping set up and tested',
          },
          {
            topic: 'Testing',
            without: 'Real orders never tested before launch',
            with: 'Real orders placed end to end before launch',
          },
          {
            topic: 'Support',
            without: 'Nobody to call when something breaks',
            with: 'A 45-day warranty, then Evolve',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How an e-commerce store is built',
    blocks: [
      {
        title: 'Payment gateway',
        body: 'The customer pays, the gateway confirms, the order is created. The gateway’s fees are its own.',
      },
      {
        title: 'Catalogue',
        body: 'Up to 50 products on the Store package, each with sizes, colours and photos.',
      },
      {
        title: 'Orders and shipping',
        body: 'Set up with your shipping rules, and connected to a shipping partner if you use one.',
      },
      {
        title: 'Stock',
        body: 'One count per size and colour, changed only by a confirmed sale or by you.',
      },
      {
        title: 'Built for phones',
        body: 'Most orders are placed on a phone, so every step is designed for one first.',
      },
      {
        title: 'Looked after',
        body: 'SSL, daily backups and monitoring on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools stores use',
    groups: [
      { name: 'Payments', items: ['Razorpay', 'Cashfree'] },
      { name: 'Shipping', items: ['Shiprocket'] },
      { name: 'Messaging and social', items: ['WhatsApp', 'Instagram product links'] },
      { name: 'Analytics', items: ['Google Analytics'] },
    ],
  },

  industries: {
    heading: 'Who an online store is for',
    items: [
      { sector: 'Retail', text: 'Sizes, colours and stock kept right across every sale.' },
      {
        sector: 'Hospitality',
        text: 'Gift cards, packaged food and merchandise, paid for online.',
      },
      {
        sector: 'Manufacturing',
        text: 'Spare parts and standard products sold direct, with shipping set up.',
      },
      {
        sector: 'Startups',
        text: 'A direct-to-customer store for a new brand, ready for its first orders.',
      },
    ],
  },

  build: {
    heading: 'How we build your store',
    steps: [
      {
        title: 'Catalogue and rules',
        body: 'Your products, photos, sizes, and your shipping and returns rules.',
      },
      { title: 'Design', body: 'The store in your brand, built for phones first.' },
      { title: 'Build', body: 'Catalogue, cart, checkout, gateway and shipping setup.' },
      { title: 'Test', body: 'Real orders placed end to end before launch.' },
      {
        title: 'Launch and Evolve',
        body: 'Live on your domain; a 45-day warranty, then your Evolve plan.',
      },
    ],
  },

  price: {
    heading: 'E-commerce store pricing',
    intro: 'Start with the Store, grow into an E-commerce System, or build a custom store.',
    rows: [
      'Products',
      'Catalogue with sizes, colours and photos',
      'Cart, checkout and payment gateway',
      'Stock updated with every sale',
      'Order and shipping setup',
      'Order updates on WhatsApp',
      'Custom features and connections',
      '45-day warranty',
      'Payment',
    ],
    packages: [
      {
        name: 'Store',
        summary: 'Up to 50 products, set up and tested, in your brand.',
        price: '₹42,000',
        unit: 'One-time',
        timeline: '4–5 weeks',
        values: [
          'Up to 50',
          true,
          true,
          true,
          true,
          false,
          false,
          true,
          'In three stages: start, design approval, launch',
        ],
        cta: 'Start with the Store',
        interest: 'store',
        focal: true,
      },
      {
        name: 'E-commerce System',
        summary: 'The store, with WhatsApp order updates and room for a larger catalogue.',
        price: 'Quoted',
        unit: 'In writing, before we start',
        values: [
          'Larger catalogues',
          true,
          true,
          true,
          true,
          true,
          false,
          true,
          'Set in the quote',
        ],
        cta: 'Ask for a quote',
        interest: 'e-commerce-system',
      },
      {
        name: 'Custom store',
        summary: 'A store built around how you sell, with the features you need.',
        price: 'From ₹65,000',
        unit: 'Fixed quote per phase',
        values: [
          'As scoped',
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          'In stages, set by the project value',
        ],
        cta: 'Ask for a quote',
        interest: 'e-commerce-stores',
      },
    ],
    note: 'Product descriptions written for you: ₹120 each. The payment gateway’s and courier’s charges are their own. Evolve care from ₹899 a month.',
  },

  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'A published price',
        body: '₹42,000 for the Store, paid in three stages.',
      },
      {
        icon: 'check',
        title: 'Tested with real orders',
        body: 'Placed end to end before anyone else buys.',
      },
      {
        icon: 'key',
        title: 'Yours to keep',
        body: 'Your domain, your products and every customer record.',
      },
      { icon: 'shield', title: 'A 45-day warranty', body: 'After launch, then your Evolve plan.' },
      { icon: 'device', title: 'Phones first', body: 'Designed for where most orders are placed.' },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'E-commerce store questions',
    items: [
      {
        question: 'How much does an online store cost?',
        answer:
          'The Store is ₹42,000 for up to 50 products, in 4–5 weeks, paid in three stages. WhatsApp order updates and larger catalogues are quoted as an E-commerce System; custom stores start from ₹65,000.',
      },
      {
        question: 'How many products can the store have?',
        answer: 'Up to 50 on the Store package. Larger catalogues are quoted as a custom store.',
      },
      {
        question: 'Which payment gateway do you use?',
        answer:
          'The one that suits your business, and we set it up. The gateway’s own fees are charged by the gateway.',
      },
      {
        question: 'Can you write the product descriptions?',
        answer: 'Yes, for ₹120 per product. It’s optional.',
      },
      {
        question: 'Can I add products myself?',
        answer: 'Yes. The store admin lets you add products, change prices and manage stock.',
      },
      {
        question: 'Do you handle shipping?',
        answer:
          'We set up the shipping flow and connect a shipping partner if you use one. The courier’s charges are theirs.',
      },
      {
        question: 'Can I keep selling on Instagram?',
        answer:
          'Yes. Your posts can link straight to products in the store, so a DM becomes a checkout.',
      },
      {
        question: 'Can customers get order updates on WhatsApp?',
        answer:
          'Yes, with an E-commerce System: confirmed, shipped and delivered, sent on their own. It’s quoted in writing.',
      },
      {
        question: 'How are the payments made?',
        answer: 'In three stages: at the start, at design approval, and at launch.',
      },
    ],
  },

  notes: [SAMPLE_NOTE, 'Instagram and WhatsApp are trademarks of Meta Platforms, Inc.'],
};

export default page;
