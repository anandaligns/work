import type { Screen } from '@/components/screens/types';

import type { ProductPage } from './types';

/**
 * WhatsApp & Email Automation, presented as a product: the page's words and the screens other pages
 * borrow — the team inbox, for the back of its group's picture on `/services`; the chat on the
 * customer's phone, for the home hero's chat tile; and each feature's screen, which the test page
 * (`/services/whatsapp-automation-test`) draws its scenes from. The service page's own pictures are
 * its mockups (`components/lab/mocks-whatsapp.tsx`). The Dental Clinic and its sample data are
 * invented, never a client.
 */

type Inbox = Extract<Screen, { kind: 'inbox' }>;

const LIVE = { text: 'Live', tone: 'green' } as const;

const CHATS: Inbox['chats'] = [
  {
    name: 'Priya Sharma',
    text: 'Do you open on Sundays?',
    time: '11:52 pm',
    source: 'Instagram ad',
    tag: { text: 'New enquiry', tone: 'accent' },
    unread: 2,
    fresh: true,
  },
  {
    name: 'Arjun Rao',
    text: 'Booked: tomorrow, 7:00 pm',
    time: '11:49 pm',
    source: 'Website form',
    tag: { text: 'Booked', tone: 'green' },
    auto: true,
  },
  {
    name: 'Meera Pillai',
    text: 'Receipt sent · ₹1,500',
    time: '10:02 pm',
    source: 'WhatsApp',
    tag: { text: 'Paid', tone: 'green' },
    auto: true,
  },
  {
    name: 'Lakshmi Menon',
    text: 'Can I bring my mother along?',
    time: '9:15 pm',
    source: 'Website form',
    tag: { text: 'With Sameer', tone: 'amber' },
    unread: 1,
  },
  {
    name: 'Kiran Das',
    text: 'Reminder: tomorrow, 10:00 am',
    time: '8:30 pm',
    source: 'Google',
    tag: { text: 'Reminded', tone: 'grey' },
    auto: true,
  },
  {
    name: 'Divya S.',
    text: 'Follow-up 1 sent',
    time: '6:10 pm',
    source: 'Website form',
    tag: { text: 'Following up', tone: 'grey' },
    auto: true,
  },
  {
    name: 'Imran Shaikh',
    text: 'Thanks, see you then!',
    time: '5:44 pm',
    source: 'WhatsApp',
    tag: { text: 'Booked', tone: 'green' },
  },
];

/** The conversations, with one of them open. */
const chats = (open: string): Inbox['chats'] =>
  CHATS.map((chat) =>
    chat.name === open ? { ...chat, active: true, unread: undefined, fresh: false } : chat,
  );

const VIEWS: Inbox['views'] = [
  { label: 'All', count: '24' },
  { label: 'Unread', count: '3' },
  { label: 'Mine', count: '5' },
  { label: 'Automated', count: '16' },
];

/** The team inbox the morning after: a late enquiry, answered and booked with nobody awake. */
const INBOX = {
  kind: 'inbox',
  brand: 'dentalclinic',
  views: VIEWS,
  chats: chats('Arjun Rao'),
  thread: {
    name: 'Arjun Rao',
    phone: '+91 98450 •• •21',
    line: 'Website form',
    messages: [
      { from: 'day', text: 'Today' },
      {
        from: 'customer',
        text: 'Hi, do you have any slots tomorrow evening?',
        time: '11:48 pm',
      },
      {
        from: 'business',
        auto: 'Instant reply',
        text: 'Hi Arjun, thanks for writing to Dental Clinic. Tomorrow we have 5:30 pm and 7:00 pm free. Tap one to book it.',
        time: '11:48 pm',
        buttons: ['5:30 pm', '7:00 pm', 'Other days'],
      },
      { from: 'customer', text: '7:00 pm', time: '11:49 pm' },
      {
        from: 'business',
        auto: 'Booking confirmation',
        text: 'Booked: tomorrow at 7:00 pm. We’ll send a reminder with the location an hour before. Reply here any time if you need to change it.',
        time: '11:49 pm',
      },
    ],
  },
  contact: {
    fields: [
      ['Source', 'Website form'],
      ['First message', '11:48 pm'],
      ['First reply', '11:48 pm · automatic'],
      ['Visits', '3'],
    ],
    tags: [
      { text: 'Booked', tone: 'green' },
      { text: 'Returning', tone: 'grey' },
      { text: 'Evenings', tone: 'grey' },
    ],
    next: { title: 'Tomorrow · 7:00 pm', line: 'Reminder goes out at 6:00 pm' },
    automations: [
      {
        title: 'Instant reply',
        meta: '11:48 pm · WhatsApp and email',
        pill: { text: 'Sent', tone: 'green' },
      },
      { title: 'Booking confirmation', meta: '11:49 pm', pill: { text: 'Sent', tone: 'green' } },
      {
        title: 'Reminder, an hour before',
        meta: 'Tomorrow, 6:00 pm · with location',
        pill: { text: 'Scheduled', tone: 'accent' },
      },
      {
        title: 'Enquiry follow-up',
        meta: 'Stopped when he booked',
        pill: { text: 'Stopped', tone: 'grey' },
      },
    ],
  },
} satisfies Screen;

/** The same enquiry on the customer's phone: asked at 11:48 pm, booked a minute later. */
const CHAT = {
  kind: 'mobile',
  view: {
    type: 'whatsapp',
    name: 'Dental Clinic',
    messages: [
      {
        from: 'system',
        text: 'This business uses a secure service from Meta to manage this chat.',
      },
      { from: 'day', text: 'Today' },
      {
        from: 'customer',
        text: 'Hi, do you have any slots tomorrow evening?',
        time: '11:48 pm',
      },
      {
        from: 'business',
        text: 'Hi Arjun, thanks for writing to Dental Clinic. Tomorrow we have 5:30 pm and 7:00 pm free. Tap one to book it.',
        time: '11:48 pm',
        buttons: ['5:30 pm', '7:00 pm', 'Other days'],
      },
      { from: 'customer', text: '7:00 pm', time: '11:49 pm' },
      {
        from: 'business',
        text: 'Booked: tomorrow at 7:00 pm. We’ll send a reminder with the location an hour before.',
        time: '11:49 pm',
      },
    ],
  },
} satisfies Screen;

/** The customer's lock screen: the confirmation, a receipt and today's reminder. */
const LOCK = {
  kind: 'iphone',
  lock: {
    date: 'Friday, 25 September',
    notes: [
      {
        title: 'Dental Clinic',
        text: 'Reminder: see you today at 7:00 pm. Tap for the location.',
        time: 'now',
        via: 'whatsapp',
      },
      {
        title: 'Dental Clinic',
        text: 'Payment received: ₹1,500. Thank you, Arjun. Your receipt is attached.',
        time: '2h ago',
        via: 'whatsapp',
      },
      {
        title: 'Dental Clinic',
        text: 'Booked: Friday at 7:00 pm. Reply here if you need to change it.',
        time: 'Yesterday',
        via: 'whatsapp',
      },
    ],
  },
} satisfies Screen;

/** A question from an ad, late on a Saturday, answered the same minute. */
const SUNDAY = {
  kind: 'mobile',
  view: {
    type: 'whatsapp',
    name: 'Dental Clinic',
    messages: [
      { from: 'day', text: 'Today' },
      { from: 'customer', text: 'Hi! Saw your ad. Do you open on Sundays?', time: '11:52 pm' },
      {
        from: 'business',
        text: 'Hi Priya, yes: Sundays from 10 am to 2 pm. Would you like to book a time?',
        time: '11:52 pm',
        buttons: ['Book Sunday', 'See prices', 'Talk to the team'],
      },
      { from: 'customer', text: 'See prices', time: '11:53 pm' },
      {
        from: 'business',
        header: 'Prices',
        text: 'Consultation: ₹800\nFull session: ₹1,500\nPackage of four: ₹5,200',
        footer: 'Tap to book, or ask us anything',
        time: '11:53 pm',
        buttons: ['Book Sunday'],
      },
    ],
  },
} satisfies Screen;

/** A payment asked for, paid and receipted, in one chat. */
const PAYMENT = {
  kind: 'mobile',
  view: {
    type: 'whatsapp',
    name: 'Dental Clinic',
    messages: [
      { from: 'day', text: 'Yesterday' },
      {
        from: 'business',
        header: 'Your booking',
        text: 'Hi Meera, your session on Tuesday at 11:00 am is held for you. Pay ₹1,500 to confirm it.',
        footer: 'Secure payment link',
        time: '1:30 pm',
        buttons: ['Pay ₹1,500'],
      },
      { from: 'customer', text: 'Done, paid just now', time: '1:31 pm' },
      {
        from: 'business',
        text: 'Payment received: ₹1,500. Thank you, Meera. Your receipt is attached, and we’ll remind you the day before.',
        time: '1:31 pm',
      },
    ],
  },
} satisfies Screen;

/** The automation builder, open on the follow-up for quotes nobody has answered. */
const FOLLOW_UP = {
  kind: 'automation',
  flows: [
    {
      name: 'Instant reply',
      line: 'When a form or ad lead arrives',
      status: LIVE,
      runs: '1,284 runs',
    },
    {
      name: 'Booking confirmation',
      line: 'When a booking is made',
      status: LIVE,
      runs: '642 runs',
    },
    {
      name: 'Reminder, an hour before',
      line: 'Before each booking',
      status: LIVE,
      runs: '598 runs',
    },
    { name: 'Quote follow-up', line: 'When a quote is sent', status: LIVE, runs: '312 runs' },
    {
      name: 'Missed appointment',
      line: 'When a booking is marked missed',
      status: LIVE,
      runs: '48 runs',
    },
    { name: 'Payment receipt', line: 'When a payment lands', status: LIVE, runs: '406 runs' },
    {
      name: 'Six-month check-in',
      line: 'Six months after a visit',
      status: { text: 'Draft', tone: 'grey' },
    },
  ],
  open: 3,
  stats: ['312 started', '128 replied', '41 accepted'],
  nodes: [
    { kind: 'trigger', title: 'Quote sent', text: 'From your CRM, when a quote is marked sent' },
    { kind: 'wait', title: 'Wait 2 days', text: 'Sends between 9 am and 8 pm' },
    { kind: 'send', title: 'Any questions?', text: 'Template: quote_followup_1' },
    {
      kind: 'check',
      title: 'Replied, accepted or opted out?',
      branches: ['Yes · stop here', 'No'],
    },
    { kind: 'wait', title: 'Wait 5 days' },
    {
      kind: 'alert',
      title: 'Tell the owner',
      text: 'Assigned to Ritu in the inbox, with the history',
    },
  ],
  selected: 2,
  inspector: {
    title: 'Send WhatsApp message',
    fields: [
      ['Template', 'quote_followup_1'],
      ['Category', 'Utility'],
      ['Language', 'English'],
    ],
    status: 'Approved by Meta',
    preview: {
      from: 'business',
      header: 'About your quote',
      text: 'Hi Arjun, just checking in on the quote we sent on Tuesday. Happy to walk you through it: reply here or tap below.',
      footer: 'Reply STOP to opt out',
      time: '10:00 am',
      buttons: ['Call me back', 'Accept the quote'],
    },
    rules: ['No reply since the quote', 'Between 9 am and 8 pm', 'Not opted out'],
  },
} satisfies Screen;

/** A question that needs a person, handed over with its history and answered by the team. */
const HANDOVER = {
  kind: 'inbox',
  views: VIEWS,
  chats: chats('Lakshmi Menon'),
  thread: {
    name: 'Lakshmi Menon',
    phone: '+91 99001 •• •58',
    line: 'Website form',
    messages: [
      { from: 'day', text: 'Today' },
      { from: 'customer', text: 'Hello, I’d like to book for Thursday evening.', time: '9:12 pm' },
      {
        from: 'business',
        auto: 'Instant reply',
        text: 'Hi Lakshmi, Thursday has 5:30 pm and 7:00 pm free. Tap one to book it.',
        time: '9:12 pm',
        buttons: ['5:30 pm', '7:00 pm'],
      },
      {
        from: 'customer',
        text: 'Can I bring my mother along? She uses a wheelchair.',
        time: '9:15 pm',
      },
      {
        from: 'note',
        by: 'Automation',
        text: 'Needs a person: handed to Sameer, with the history.',
      },
      {
        from: 'business',
        by: 'Sameer',
        text: 'Of course, Lakshmi. We have step-free access and parking right at the entrance. I’ve booked you both for Thursday at 5:30 pm.',
        time: '9:21 pm',
      },
    ],
  },
  contact: {
    fields: [
      ['Source', 'Website form'],
      ['Assigned', 'Sameer'],
      ['Handed over', '9:15 pm'],
      ['Visits', 'First'],
    ],
    tags: [
      { text: 'Booked', tone: 'green' },
      { text: 'Step-free access', tone: 'amber' },
    ],
    next: { title: 'Thursday · 5:30 pm', line: 'Two people · step-free entrance' },
    automations: [
      { title: 'Instant reply', meta: '9:12 pm', pill: { text: 'Sent', tone: 'green' } },
      {
        title: 'Hand-over to a person',
        meta: '9:15 pm · needs a person',
        pill: { text: 'Done', tone: 'green' },
      },
      { title: 'Booking confirmation', meta: '9:21 pm', pill: { text: 'Sent', tone: 'green' } },
      {
        title: 'Reminder, an hour before',
        meta: 'Thursday, 4:30 pm',
        pill: { text: 'Scheduled', tone: 'accent' },
      },
    ],
  },
} satisfies Screen;

const page: ProductPage = {
  accent: '#16a34a',
  accentDark: '#166534',
  sub: 'Instant replies, reminders and follow-ups on the official WhatsApp Business Platform and email, sent from your own number and connected to your website, bookings and CRM.',

  stage: { back: INBOX, front: [CHAT] },

  highlights: {
    heading: 'WhatsApp automation at a glance',
    items: [
      { value: '24/7', label: 'Replies at any hour, including nights, Sundays and holidays.' },
      { value: 'Your number', label: 'Every message comes from your own business number.' },
      { value: '₹45,000', label: 'From, with the Connected Website and three months of Evolve.' },
      { value: '4–6 weeks', label: 'From the first call to live, with the Connected Website.' },
    ],
  },

  view: {
    statement: 'An enquiry that waits until morning may not be there in the morning.',
    body: [
      '**WhatsApp automation** means the messages your business sends again and again — the first reply, the booking confirmation, the reminder, the follow-up — go out on their own, at the right moment, from your own number. It runs on the official WhatsApp Business Platform, with email alongside for the people who prefer it.',
      '**Your team keeps every conversation.** Automation starts each one on time and remembers every reminder; a person takes over whenever a conversation needs one, with the whole history in front of them.',
      'It comes with the [Connected Website](/solutions/lead-automation), or we add it to the website and [CRM](/services/crm-systems) you already have.',
    ],
    photo: {
      file: 'whatsapp-automation-dental-clinic',
      alt: 'A woman at home in the evening, messaging a dental clinic on her phone.',
    },
  },

  features: {
    heading: 'What WhatsApp automation does',
    intro:
      'Five jobs your team does by hand today, done on their own — each one set up around how your business talks to its customers.',
    items: [
      {
        label: 'Instant replies',
        title: 'Answered in seconds, day or night.',
        body: '**Every enquiry gets a reply the moment it arrives** — from your website, your ads or a WhatsApp message. The reply carries what people ask first and a button for the next step, so the conversation moves before they look elsewhere.',
        points: [
          'Replies on WhatsApp and email, in your voice',
          'Buttons to book, ask for a callback or see prices',
          'Different replies for each form, ad and time of day',
        ],
        stats: [
          { value: '24/7', label: 'Every day of the year' },
          { value: '2', label: 'Channels: WhatsApp and email' },
        ],
        caption: 'A Sunday question at 11:52 pm, answered the same minute',
        screen: SUNDAY,
      },
      {
        label: 'Reminders and confirmations',
        title: 'Nobody has to remember. Nothing is forgotten.',
        body: '**Confirmations and reminders send themselves** when a booking is made or a date comes round. Each one carries what people need — time, address, map pin, what to bring — and a way to confirm or change.',
        points: [
          'Booking confirmations, and reminders before each visit',
          'The location and what to bring, in the message',
          'Confirm or change in a tap, synced to your calendar',
        ],
        stats: [
          { value: '1 tap', label: 'To confirm or change' },
          { value: '0', label: 'Reminders to send by hand' },
        ],
        caption: 'A confirmation, a receipt and a reminder arriving on WhatsApp',
        screen: LOCK,
      },
      {
        label: 'Follow-up sequences',
        title: 'Follow-ups that know when to stop.',
        body: '**A quiet lead gets a gentle nudge**, then another, on a schedule you choose — and the sequence stops the moment they reply, book or pay. You decide how many, how far apart and what each one says.',
        points: [
          'Sequences for enquiries, quotes and missed appointments',
          'Stops on a reply, a booking or a payment',
          'Opt-outs honoured on their own',
        ],
        stats: [
          { value: '1 reply', label: 'Is all it takes to stop it' },
          { value: 'You choose', label: 'How many, how far apart' },
        ],
        caption: 'A follow-up sequence for quotes that haven’t been answered',
        screen: FOLLOW_UP,
      },
      {
        label: 'Payments and receipts',
        title: 'Asked for, paid and thanked, in one chat.',
        body: '**A payment link goes out with the booking or the invoice**, and the receipt follows the moment it’s paid — so nobody chases payments by hand, and every customer has the proof in their chat.',
        points: [
          'Payment links for bookings, invoices and deposits',
          'Receipts sent the moment a payment lands',
          'Reminders for payments still due',
        ],
        stats: [
          { value: 'UPI and cards', label: 'Through your payment gateway' },
          { value: '0', label: 'Receipts to send by hand' },
        ],
        caption: 'A payment link and its receipt, in the customer’s chat',
        screen: PAYMENT,
      },
      {
        label: 'Team inbox and hand-over',
        title: 'Automation starts it. Your team closes it.',
        body: '**Every conversation lands in one shared inbox**, tagged by source and status. When a question needs a person, it’s handed over in a tap — with the full history — and automation steps back.',
        points: [
          'Alerts to the right person, by rule',
          'Hand-over in a tap, history included',
          'Every message on the contact’s record',
        ],
        caption: 'A conversation handed to a person, with its history',
        screen: HANDOVER,
      },
    ],
  },

  included: {
    heading: 'WhatsApp automation features',
    intro: 'Everything that comes with it, set up for you.',
    items: [
      {
        icon: 'whatsapp',
        title: 'The official platform',
        body: 'The WhatsApp Business Platform, through an approved provider — not an unofficial app that puts your number at risk.',
      },
      {
        icon: 'mail',
        title: 'Email alongside',
        body: 'The same messages by email for the people who prefer it, sent from your own domain.',
      },
      {
        icon: 'chat',
        title: 'Buttons and lists',
        body: 'People tap to book, ask for a callback or see prices, instead of typing.',
      },
      {
        icon: 'file',
        title: 'Documents and images',
        body: 'Brochures, price lists, invoices and photos sent as part of a flow.',
      },
      {
        icon: 'pin',
        title: 'Location pins',
        body: 'Reminders carry a map pin, so nobody gets lost on the way.',
      },
      {
        icon: 'calendar',
        title: 'Calendar sync',
        body: 'Bookings land in Google Calendar, and changes made on WhatsApp update it.',
      },
      {
        icon: 'clock',
        title: 'Business hours',
        body: 'Different replies in and out of hours, with holidays set in advance.',
      },
      {
        icon: 'userShare',
        title: 'Routing rules',
        body: 'Leads go to the right person by source, service, branch or language.',
      },
      {
        icon: 'bell',
        title: 'Team alerts',
        body: 'An alert on WhatsApp or email the moment something needs a person.',
      },
      {
        icon: 'repeat',
        title: 'Follow-up sequences',
        body: 'Timed follow-ups that stop on a reply, a booking or a payment.',
      },
      {
        icon: 'shield',
        title: 'Opt-in and opt-out',
        body: 'Only people who contacted you or agreed to hear from you — and opting out always works.',
      },
      {
        icon: 'chart',
        title: 'Reports',
        body: 'Who replied, who booked, who hasn’t answered, and which sources bring bookings.',
      },
    ],
  },

  compare: {
    heading: 'WhatsApp automation compared',
    intro:
      'What changes when the messages send themselves, against the ways most businesses manage today.',
    us: 'Automation on your own number, set up and looked after.',
    options: [
      {
        label: 'By hand',
        note: 'Replying, reminding and chasing, whenever someone is free.',
        rows: [
          {
            topic: 'First reply',
            without: 'Replies wait until someone is free',
            with: 'Every enquiry answered in seconds, at any hour',
          },
          {
            topic: 'Reminders',
            without: 'Reminders depend on someone remembering',
            with: 'Reminders go out on schedule, every time',
          },
          {
            topic: 'Repeat questions',
            without: 'The same answers typed again and again',
            with: 'Templates send the details; your team handles the real questions',
          },
          {
            topic: 'Quiet leads',
            without: 'Nobody knows which leads went quiet',
            with: 'Follow-ups run until a reply, and the dashboard shows who’s waiting',
          },
        ],
      },
      {
        label: 'Business app',
        note: 'The free WhatsApp Business app, on one phone.',
        rows: [
          {
            topic: 'Your team',
            without: 'Built for one phone and a few linked devices',
            with: 'One shared inbox for the whole team, with alerts by rule',
          },
          {
            topic: 'Replies',
            without: 'Quick replies still need someone to send them',
            with: 'Replies send themselves when a form, booking or payment arrives',
          },
          {
            topic: 'Your other tools',
            without: 'No link to your website, calendar or CRM',
            with: 'Connected to your website, bookings, payments and CRM',
          },
          {
            topic: 'Scheduling',
            without: 'Greeting and away messages, but no schedule',
            with: 'Reminders and follow-up sequences on a schedule you set',
          },
        ],
      },
      {
        label: 'Bulk tools',
        note: 'Unofficial bulk senders and broadcast lists.',
        rows: [
          {
            topic: 'Your number',
            without: 'Unofficial tools can get your number blocked',
            with: 'The official WhatsApp Business Platform, through an approved provider',
          },
          {
            topic: 'Who hears from you',
            without: 'Blasts to lists that never agreed',
            with: 'Messages only to people who contacted you or opted in',
          },
          {
            topic: 'What they get',
            without: 'The same message to everyone',
            with: 'Each message sent by what that person did',
          },
          {
            topic: 'Hand-over',
            without: 'No one to hand over to',
            with: 'A person takes over in a tap, with the whole history',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'Built on the official WhatsApp Business Platform',
    blocks: [
      {
        icon: 'shield',
        title: 'Official and yours',
        body: 'Your number is registered on Meta’s WhatsApp Business Platform through an approved provider. Your business name shows on every message, and the number stays yours.',
      },
      {
        icon: 'check',
        title: 'Templates Meta approves',
        body: 'Messages that start a conversation — reminders, follow-ups, offers — use templates Meta approves in advance. We write them in your voice and handle the approvals.',
      },
      {
        icon: 'clock',
        title: 'The 24-hour window',
        body: 'When a customer writes to you, you can reply freely for 24 hours. After that, only approved templates can reach them, so every flow is designed around it.',
      },
      {
        icon: 'plug',
        title: 'Triggers from your tools',
        body: 'Forms, ad leads, bookings, payments and dates start each flow through your tools’ [APIs and webhooks](/services/api-integrations). Nothing is copied by hand.',
      },
      {
        icon: 'userCheck',
        title: 'Opt-in and quality',
        body: 'Meta watches how people respond to each number. Messaging only people who expect to hear from you, with an easy opt-out, keeps your number in good standing.',
      },
      {
        icon: 'chart',
        title: 'Logged and reported',
        body: 'Every message, delivery and reply is recorded against the contact, and your [dashboard](/services/dashboards) shows what’s working.',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'We connect the tools you have. If it has an API, we can usually work with it.',
    groups: [
      {
        name: 'Messaging',
        items: ['WhatsApp Business Platform', 'Gmail and Google Workspace', 'Outlook'],
      },
      {
        name: 'Website and ads',
        items: ['Your website forms', 'Facebook and Instagram lead ads'],
      },
      { name: 'Bookings', items: ['Google Calendar'] },
      { name: 'Payments', items: ['Razorpay'] },
      { name: 'CRM and data', items: ['Zoho CRM', 'HubSpot', 'Google Sheets'] },
    ],
  },

  industries: {
    heading: 'Who WhatsApp automation is for',
    items: [
      {
        sector: 'Clinics',
        text: 'Appointment confirmations, a reminder the day before with the clinic’s location, and a nudge when the next check-up is due.',
      },
      {
        sector: 'Real Estate',
        text: 'Brochures and floor plans the moment an ad enquiry arrives, site-visit reminders with a map pin, and follow-ups until the buyer answers.',
      },
      {
        sector: 'Education',
        text: 'Batch timings and fees for parents at any hour, demo-class bookings, fee reminders and results.',
      },
      {
        sector: 'Hospitality',
        text: 'Table confirmations, reminders to confirm or change, order updates, and a thank-you with a review link the next day.',
      },
      {
        sector: 'Retail',
        text: 'Order confirmations, shipping updates with tracking, and a message when something someone asked about is back in stock.',
      },
      {
        sector: 'Professional Services',
        text: 'Consultation bookings, reminders to send documents, and follow-ups on proposals that haven’t been answered.',
      },
    ],
  },

  build: {
    heading: 'How we set up WhatsApp automation',
    steps: [
      {
        title: 'Map the messages',
        body: 'One call to list the moments that deserve a message and what each one says, in your voice. You approve the wording.',
      },
      {
        title: 'Set up the platform',
        body: 'Your number on the WhatsApp Business Platform through an approved provider, your business profile, and templates sent to Meta for approval.',
      },
      {
        title: 'Connect your tools',
        body: 'Your website forms, ad leads, calendar, payments and CRM wired in as the triggers.',
      },
      {
        title: 'Build and test',
        body: 'Replies, reminders, follow-ups and hand-overs, tested on real phones — every message, every path.',
      },
      {
        title: 'Launch and improve',
        body: 'Live and watched from day one, with messages tuned each month on [Evolve](/services/evolve).',
      },
    ],
  },

  price: {
    heading: 'WhatsApp automation pricing',
    intro:
      'It comes with the Connected Website, or on its own for the website and tools you already have.',
    rows: [
      'Instant WhatsApp and email replies',
      'WhatsApp message templates',
      'Team alerts',
      'Online booking or callbacks',
      'Dashboard of every lead',
      'Lead routing and follow-up reminders',
      'CRM sync and conversion tracking',
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
          true,
          true,
          true,
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
        name: 'Lead Follow-up Automation',
        summary: 'The same system, added to the website you already have.',
        price: 'Quoted',
        unit: 'In writing, before we start',
        values: [true, true, true, false, false, true, true, false, 'Optional, from ₹899 a month'],
        cta: 'Ask for a quote',
        interest: 'lead-follow-up',
      },
    ],
    note: 'Need automation inside your own software? That’s [Custom](/services/custom-software), from ₹65,000, after a System Blueprint. Meta’s own message charges are separate: paid to the provider, not to us, and estimated upfront.',
    notes: [
      'Meta charges for some WhatsApp messages, by category (marketing, utility and authentication) and by the country of the number. At the time of writing, replies within 24 hours of a customer’s message are not charged. Charges are paid to the provider, not to Pixel Kinetix.',
    ],
  },

  why: {
    heading: 'Why build it with Pixel Kinetix',
    items: [
      {
        icon: 'receipt',
        title: 'The price, in writing',
        body: 'Published prices for every package, and a written quote before any custom work starts.',
      },
      {
        icon: 'key',
        title: 'Yours to keep',
        body: 'Your number, your templates, your contacts and your data stay yours.',
      },
      {
        icon: 'shield',
        title: 'Official, never grey',
        body: 'Only the official WhatsApp Business Platform, so your number is never put at risk.',
      },
      {
        icon: 'refresh',
        title: 'Looked after on Evolve',
        body: 'Monitoring, fixes and monthly changes, from ₹899 a month.',
      },
      {
        icon: 'plug',
        title: 'Connected, not bolted on',
        body: 'Built into your website, calendar, payments and CRM, not a separate app to check.',
      },
      {
        icon: 'pin',
        title: 'Built in Bangalore',
        body: 'A Bangalore team building for businesses across India.',
      },
    ],
  },

  faqs: {
    heading: 'WhatsApp automation questions',
    items: [
      {
        question: 'Is this the official WhatsApp?',
        answer:
          'Yes. We use the official WhatsApp Business Platform through an approved provider, and connect it to your website, CRM, payments and email.',
      },
      {
        question: 'How much does WhatsApp automation cost?',
        answer:
          'It comes with the Connected Website, from ₹45,000, which includes three months of Evolve. For a website or CRM you already have, Lead Follow-up Automation is quoted in writing. Meta’s message charges are separate and estimated upfront.',
      },
      {
        question:
          'What’s the difference between the WhatsApp Business app and the WhatsApp Business Platform?',
        answer:
          'The app is for replying by hand from a phone. The platform, often called the WhatsApp Business API, lets your website, bookings and CRM send messages on their own and lets a whole team share one inbox. It’s the approved way to automate WhatsApp.',
      },
      {
        question: 'Will messages come from our own number?',
        answer: 'Yes, from your business’s own number, set up on the WhatsApp Business Platform.',
      },
      {
        question: 'Can we use the number we already have?',
        answer:
          'Usually, yes. If it’s on the WhatsApp Business app today, we check during setup whether it can be connected alongside the app or needs to move to the platform, and plan the switch so no messages are lost.',
      },
      {
        question: 'What does WhatsApp charge?',
        answer:
          'Meta charges for some messages. It’s paid to the provider, not to us, and we estimate it for you upfront.',
      },
      {
        question: 'What is a message template?',
        answer:
          'A message Meta approves in advance, used to start a conversation or to write to someone more than 24 hours after their last message — a reminder, a confirmation, a follow-up. We write them in your voice and handle the approval.',
      },
      {
        question: 'Can our team still reply by hand?',
        answer:
          'Yes. Automation sends the first reply and the reminders; your team takes over whenever a conversation needs a person.',
      },
      {
        question: 'Will customers feel they’re talking to a robot?',
        answer:
          'Messages are written in your voice and kept short, and anything beyond the basics goes to a person.',
      },
      {
        question: 'Can people stop the messages?',
        answer:
          'Yes. Every flow respects an opt-out, and we only message people who contacted you or agreed to hear from you.',
      },
      {
        question: 'Can we send offers to our customers?',
        answer:
          'Yes, to people who have agreed to hear from you, using marketing templates Meta approves. Meta charges these at its marketing rate, and anyone can opt out at any time.',
      },
      {
        question: 'Which languages can messages be in?',
        answer:
          'Templates can be written in English, Hindi, Kannada and the other languages WhatsApp supports, so each customer hears from you in theirs.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'With the Connected Website, 4–6 weeks from the first call to launch. For the website you already have, the timeline comes with the written quote.',
      },
    ],
  },

  notes: [
    'Screens on this page show sample data. The names in them are invented.',
    'WhatsApp is a trademark of Meta Platforms, Inc. Pixel Kinetix is not affiliated with Meta.',
  ],
};

export default page;
