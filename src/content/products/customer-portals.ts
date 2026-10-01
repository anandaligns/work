import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * Customer Portals, presented as a product: the page's words, with no screens — its pictures are
 * its own mockups (`components/lab/mocks-customer-portals.tsx`), from its sample business, an
 * Industrial Parts Distributor, and no other page borrows one.
 */

const page: ProductPage = {
  accent: '#d97706',
  accentDark: '#92400e',
  sub: 'Give customers their own login to see what’s happening, what’s due and every document, so they stop having to ask.',

  highlights: {
    heading: 'Customer portals at a glance',
    items: [
      { value: '24/7', label: 'Status, payments and documents, without a call.' },
      { value: 'Private', label: 'Each customer sees only their own records.' },
      { value: '₹65,000', label: 'From, with a fixed quote after a System Blueprint.' },
      { value: '45 days', label: 'Warranty on every phase we deliver.' },
    ],
  },

  view: {
    statement:
      'Every “any update?” call is a customer telling you they can’t see what’s happening.',
    body: [
      '**A customer portal** is a private, branded space where each of your customers logs in to see where things stand, what’s next, what’s due and every document. It answers the three questions every customer has — at any hour, without a call.',
      '**Your team posts an update once, and everyone it concerns sees it**, with a WhatsApp or email note that something new has arrived. Requests become records with an owner and a status, not messages in someone’s phone.',
      'It’s the same idea as the portal every Pixel Kinetix client uses to follow their own project, built around your business and connected to your [CRM](/services/crm-systems) and accounting.',
    ],
    photo: {
      file: 'customer-portal-parts-distributor',
      alt: 'A purchase manager at a factory checking an order on a tablet beside racks of parts.',
    },
  },

  features: {
    heading: 'What a customer portal does',
    intro: 'Five things a portal does for your customers — and for the team that answers them.',
    items: [
      {
        label: 'Progress',
        title: 'Customers see it for themselves.',
        body: '**Progress, photos and what happens next**, updated by your team once and seen by everyone it concerns, with a note on WhatsApp or email when something new arrives.',
        points: [
          'Status for every order, booking or project',
          'Photos and updates in one timeline',
          'A WhatsApp or email note when something new arrives',
        ],
        caption: 'Today’s update on the customer’s phone, with dispatch photos',
      },
      {
        label: 'Payments and papers',
        title: 'Payments and papers in one place.',
        body: '**What’s due, what’s paid, and every agreement and receipt**, ready to download — and a payment link for what’s next.',
        points: [],
        caption: 'What’s due, what’s paid and the papers behind it',
      },
      {
        label: 'Requests',
        title: 'Requests that don’t get lost.',
        body: '**A request becomes a record with an owner and a status**, not a message in someone’s phone. Replies happen inside the portal, with a history both sides can see.',
        points: [
          'Requests with owners and statuses',
          'Replies inside the portal',
          'A history both sides can see',
        ],
        caption: 'Requests, each with an owner, a status and a history',
      },
      {
        label: 'Your team’s admin',
        title: 'Your team runs it, no developer needed.',
        body: '**Your team gets an admin** to post updates, upload documents, send payment requests and answer requests — with roles for who does what.',
        points: [
          'Post updates to one customer or many',
          'Upload documents and receipts',
          'Roles: who posts, who answers, who sees payments',
        ],
        caption: 'The team’s view of every customer',
      },
      {
        label: 'Documents',
        title: 'Every paper in one place, the latest on top.',
        body: '**Invoices, quotes, agreements and certificates** sit in folders on the customer’s record, with every version kept and a note when something new needs a look.',
        points: [
          'Folders by order and type',
          'Every version kept, with who added it',
          'A note when something needs approval',
        ],
        caption: 'Every document for one customer, every version kept',
      },
    ],
  },

  included: {
    heading: 'Customer portal features',
    intro: 'What a customer portal can include, chosen with you in the System Blueprint.',
    items: [
      {
        icon: 'key',
        title: 'Secure sign-in',
        body: 'By email or phone number, with a one-time code.',
      },
      {
        icon: 'lock',
        title: 'Private records',
        body: 'Each customer sees only their own information.',
      },
      { icon: 'history', title: 'Updates timeline', body: 'Progress, photos and notes, in order.' },
      { icon: 'rupee', title: 'Payments', body: 'What’s due, what’s paid, and a link to pay.' },
      {
        icon: 'file',
        title: 'Documents',
        body: 'Agreements, invoices and receipts, ready to download.',
      },
      { icon: 'chat', title: 'Requests', body: 'Tracked, with owners, statuses and replies.' },
      {
        icon: 'bell',
        title: 'Notifications',
        body: 'WhatsApp or email whenever something new arrives.',
      },
      {
        icon: 'table',
        title: 'An admin for your team',
        body: 'Post updates, upload documents and answer requests.',
      },
      { icon: 'people', title: 'Team roles', body: 'Who posts, who answers, who sees payments.' },
      {
        icon: 'device',
        title: 'Mobile-first',
        body: 'Built for phones first, like everything we make.',
      },
      {
        icon: 'plug',
        title: 'Connected',
        body: 'To your CRM, accounting software or a database we build.',
      },
      { icon: 'eye', title: 'In your brand', body: 'Your logo, colours and domain.' },
    ],
  },

  compare: {
    heading: 'Customer portals compared',
    intro: 'What changes when customers can see for themselves.',
    us: 'A private portal for every customer, with your team’s admin behind it.',
    options: [
      {
        label: 'Calls and WhatsApp',
        note: 'Updates by phone calls and WhatsApp messages.',
        rows: [
          {
            topic: 'Updates',
            without: '“Any update?” calls every week',
            with: 'Updates posted once, seen by everyone',
          },
          {
            topic: 'Receipts',
            without: 'Receipts sent again and again on WhatsApp',
            with: 'Every document downloadable at any time',
          },
          {
            topic: 'Requests',
            without: 'Requests lost in chats',
            with: 'Every request tracked to a reply',
          },
          {
            topic: 'Peace of mind',
            without: 'Customers feel in the dark',
            with: 'Customers see what’s done and what’s next',
          },
        ],
      },
      {
        label: 'Email updates',
        note: 'Updates and files sent by email.',
        rows: [
          {
            topic: 'Updates',
            without: 'Updates buried in inboxes',
            with: 'One place with everything, in order',
          },
          {
            topic: 'Documents',
            without: 'Attachments hard to find later',
            with: 'Documents kept together, always downloadable',
          },
          {
            topic: 'Replies',
            without: 'Replies scattered across threads',
            with: 'Requests and replies on one record',
          },
          {
            topic: 'What’s due',
            without: 'No way to see what’s due',
            with: 'Payments and dues at a glance',
          },
        ],
      },
      {
        label: 'Shared drive links',
        note: 'Documents shared from a cloud folder.',
        rows: [
          {
            topic: 'Access',
            without: 'Anyone with the link can open it',
            with: 'Each customer signs in to their own records',
          },
          {
            topic: 'Status',
            without: 'Folders with no status',
            with: 'Status, dues and next steps on one screen',
          },
          {
            topic: 'Something new',
            without: 'No note when something new arrives',
            with: 'A WhatsApp or email note every time',
          },
          {
            topic: 'Questions',
            without: 'Nowhere to ask a question',
            with: 'Requests with owners and replies',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How a customer portal is built',
    blocks: [
      {
        title: 'Secure login',
        body: 'By email or phone number; each customer sees only their own records.',
      },
      {
        title: 'Your data',
        body: 'Connected to where it already lives: your [CRM](/services/crm-systems), accounting software, or a database we build.',
      },
      {
        title: 'Roles for your team',
        body: 'Who posts updates, who answers requests, who sees payments.',
      },
      { title: 'Notifications', body: 'WhatsApp or email whenever something new arrives.' },
      { title: 'Mobile-first', body: 'Designed for the phone your customers will open it on.' },
      {
        title: 'Hosted and backed up',
        body: 'Monitoring, daily backups and security updates on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    groups: [
      { name: 'CRM and accounting', items: ['Zoho CRM', 'Tally', 'Your accounting software'] },
      { name: 'Documents', items: ['Google Drive'] },
      { name: 'Messaging', items: ['WhatsApp'] },
    ],
  },

  industries: {
    heading: 'Who a customer portal is for',
    items: [
      {
        sector: 'Real Estate',
        text: 'Buyers follow construction, instalments and papers in one login.',
      },
      {
        sector: 'Professional Services',
        text: 'Clients see where their matter stands and download their documents.',
      },
      {
        sector: 'Education',
        text: 'Parents check attendance, fees and reports without calling the office.',
      },
      {
        sector: 'Manufacturing',
        text: 'Dealers track orders, dispatches and invoices on their own.',
      },
      {
        sector: 'Clinics',
        text: 'Patients find their reports, prescriptions and bills in one place.',
      },
      {
        sector: 'Startups',
        text: 'Your customers’ accounts, usage and invoices, behind their own login.',
      },
    ],
  },

  build: {
    heading: 'How we build a customer portal',
    steps: [
      {
        title: 'System Blueprint',
        body: 'What customers need to see, and where that information lives today.',
      },
      { title: 'Design', body: 'The portal’s screens for customers, and the admin for your team.' },
      {
        title: 'Build and connect',
        body: 'Logins, records, documents, payments and notifications.',
      },
      { title: 'Pilot', body: 'A few customers use it first; their feedback shapes the launch.' },
      { title: 'Launch and Evolve', body: 'Everyone invited; improvements every month.' },
    ],
  },

  price: {
    heading: 'Customer portal pricing',
    intro: 'Every portal starts with a System Blueprint, credited in full if you go ahead.',
    ...blueprintAndCustom({
      built: 'The portal and its admin built, tested and launched',
      summary: 'A portal for your customers and an admin for your team, connected to your data.',
      interest: 'customer-portals',
    }),
    note: 'Email login codes cost nothing to send; SMS and WhatsApp codes are charged per message by the provider, paid by you, and estimated upfront.',
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'Customer portal questions',
    items: [
      {
        question: 'How much does a customer portal cost?',
        answer:
          'It starts with a System Blueprint for ₹10,000, credited in full if you go ahead. Portals are Custom, from ₹65,000, with a fixed quote for each phase.',
      },
      {
        question: 'Is it like your own client portal?',
        answer:
          'Yes, the same idea. Every Pixel Kinetix client follows their project in a portal; we build one for your customers, around your business.',
      },
      {
        question: 'How do customers log in?',
        answer:
          'By email or phone number, whichever suits them. Email codes cost nothing to send; SMS and WhatsApp codes are charged per message by the provider, paid by you, and we estimate them upfront.',
      },
      {
        question: 'Can each customer see only their own information?',
        answer: 'Yes. Every customer’s records are private to their login.',
      },
      {
        question: 'Can our team post updates without a developer?',
        answer:
          'Yes. Your team gets an admin to post updates, upload documents and answer requests.',
      },
      {
        question: 'Can it connect to the software we already use?',
        answer:
          'Yes, where that software has an API or an export. We check this in the System Blueprint.',
      },
      {
        question: 'Can customers pay through the portal?',
        answer:
          'Yes, through a payment link from a payment gateway, with the receipt saved to their documents. The gateway’s fees are its own.',
      },
      {
        question: 'Does it work on phones?',
        answer: 'Yes. It’s built mobile-first, like everything we make.',
      },
    ],
  },

  notes: [SAMPLE_NOTE],
};

export default page;
