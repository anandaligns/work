import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * Internal Tools, presented as a product: the page's words, with no screens — its pictures are its
 * own mockups (`components/lab/mocks-internal-tools.tsx`), from its sample business, a School /
 * Education Institute, and no other page borrows one.
 */

const page: ProductPage = {
  accent: '#0f766e',
  accentDark: '#115e59',
  sub: 'Screens built for the work your team does every day: tasks, approvals, records and handovers, instead of spreadsheets and chat groups.',

  highlights: {
    heading: 'Internal tools at a glance',
    items: [
      { value: '1 screen', label: 'For the whole process, instead of sheets and chat groups.' },
      { value: '1 tap', label: 'To approve, on a phone or a laptop, with the answer on record.' },
      { value: '₹65,000', label: 'From, with a fixed quote after a System Blueprint.' },
      { value: '45 days', label: 'Warranty on every phase we deliver.' },
    ],
  },

  view: {
    statement: 'When a process lives in one person’s head, the business can’t take a holiday.',
    body: [
      '**An internal tool** — often called an admin panel — is a set of screens built for the work your team does every day: jobs, tasks, approvals, records and handovers. Small teams run on [spreadsheets](/solutions/run-it-in-one-place) and WhatsApp groups until something slips: a deadline missed, a document lost, an approval nobody saw.',
      '**It puts the process on one screen everyone shares.** Each job moves through your own steps with an owner and a date; anything that needs a yes goes to the right person; and the full history is on every record, so the work doesn’t depend on who remembers what.',
      'It sends alerts on [WhatsApp](/services/whatsapp-automation) or email when something needs a person, and grows in phases with your process.',
    ],
    photo: {
      file: 'internal-tool-school-office',
      alt: 'A school office in the morning, the admissions head checking the day’s tasks on a laptop.',
    },
  },

  features: {
    heading: 'What an admin panel does',
    intro: 'Five things a shared tool does that spreadsheets and chat groups can’t.',
    items: [
      {
        label: 'Owners and dates',
        title: 'Every task has an owner and a date.',
        body: '**Work moves through the steps your team already follows**, visible to everyone who needs it, with views by person, stage or client.',
        points: [
          'Steps from your own process',
          'Owners and due dates',
          'Views by person, stage or client',
        ],
        caption: 'Every task with an owner and a date, the late ones first',
      },
      {
        label: 'Approvals',
        title: 'Approvals that don’t wait in a chat.',
        body: '**Anything that needs a yes goes to the right person**, with reminders if it waits, and the answer is on record — who approved what, and when.',
        points: [
          'One-tap approvals, on the phone too',
          'Who approved what, and when',
          'Reminders if it waits',
        ],
        stats: [
          { value: '1 tap', label: 'To approve' },
          { value: 'On record', label: 'Who and when' },
        ],
        caption: 'A purchase waiting for the owner, with its history',
      },
      {
        label: 'Templates and history',
        title: 'Nothing depends on one person’s memory.',
        body: '**Templates, history and search keep the work running** when someone is away. Repeat work starts from a template; every change is recorded; anything can be found.',
        points: [
          'Templates for repeat work',
          'A full history on every record',
          'Search across everything',
        ],
        caption: 'An admission’s checklist from its template, and every change on record',
      },
      {
        label: 'Roles',
        title: 'Everyone sees what they need.',
        body: '**Roles decide who can see, edit and approve** each kind of record, so the right people have the right access and nothing is shared that shouldn’t be.',
        points: [
          'Roles you control',
          'Access you can change any time',
          'Every change recorded, with who and when',
        ],
        caption: 'Who can see, edit and approve what',
      },
      {
        label: 'Schedule',
        title: 'Who is where, all week.',
        body: '**Everyone’s week on one calendar**, with duties placed where there’s room and each person told on their phone — so a clash shows before anyone turns up in the wrong place.',
        points: [
          'People and duties on one calendar',
          'Clashes flagged as you plan',
          'The day’s duties on each person’s phone',
        ],
        caption: 'The staff’s week on one calendar',
      },
    ],
  },

  included: {
    heading: 'Internal tool features',
    intro: 'What an internal tool can include, chosen with you in the System Blueprint.',
    items: [
      {
        icon: 'layers',
        title: 'Your process, on screen',
        body: 'Steps, stages and forms that follow how your team works.',
      },
      {
        icon: 'tasks',
        title: 'Owners and due dates',
        body: 'Every task assigned, every date visible.',
      },
      {
        icon: 'userCheck',
        title: 'Approvals',
        body: 'One tap, on phone or laptop, with reminders.',
      },
      {
        icon: 'bell',
        title: 'Alerts',
        body: 'WhatsApp or email before deadlines and when something waits.',
      },
      {
        icon: 'clipboard',
        title: 'Templates',
        body: 'Repeat work starts with the usual steps filled in.',
      },
      { icon: 'history', title: 'Full history', body: 'Every change recorded, with who and when.' },
      { icon: 'search', title: 'Search', body: 'Across jobs, clients, notes and documents.' },
      { icon: 'file', title: 'Documents', body: 'Kept on the record they belong to.' },
      { icon: 'people', title: 'Roles and access', body: 'Who can see, edit and approve.' },
      { icon: 'dashboard', title: 'Views and reports', body: 'By person, stage, client or date.' },
      {
        icon: 'upload',
        title: 'Your data moved in',
        body: 'Spreadsheet records brought across where they’re usable.',
      },
      {
        icon: 'device',
        title: 'Phone and laptop',
        body: 'Approvals on the phone; full screens on the laptop.',
      },
    ],
  },

  compare: {
    heading: 'Internal tools compared',
    intro: 'What changes when the process moves onto one shared screen.',
    us: 'A tool shaped around the way your team already works.',
    options: [
      {
        label: 'Spreadsheets',
        note: 'Jobs tracked in shared spreadsheets.',
        rows: [
          {
            topic: 'Tasks',
            without: 'Tasks in spreadsheets that break',
            with: 'Tasks on one shared screen',
          },
          {
            topic: 'Editing',
            without: 'Anyone can overwrite anything',
            with: 'Roles decide who can edit and approve',
          },
          {
            topic: 'Deadlines',
            without: 'Deadlines kept in heads and diaries',
            with: 'Alerts before deadlines',
          },
          {
            topic: 'Changes',
            without: 'No record of who changed what',
            with: 'The full history in every record',
          },
        ],
      },
      {
        label: 'Chat groups',
        note: 'Work run through WhatsApp groups.',
        rows: [
          {
            topic: 'Approvals',
            without: 'Approvals buried in chats',
            with: 'Approvals in one tap, on record',
          },
          {
            topic: 'Handovers',
            without: 'Handovers by long messages',
            with: 'The full history in every record',
          },
          {
            topic: 'Documents',
            without: 'Documents lost in the scroll',
            with: 'Documents kept on the job they belong to',
          },
          {
            topic: 'Access',
            without: 'Everyone sees everything',
            with: 'Each person sees what their role needs',
          },
        ],
      },
      {
        label: 'Generic task apps',
        note: 'An off-the-shelf task board.',
        rows: [
          {
            topic: 'Fit',
            without: 'Generic boards you bend your process to',
            with: 'Screens built around your own steps',
          },
          {
            topic: 'Approvals',
            without: 'No approvals with a record',
            with: 'Approvals with who and when',
          },
          {
            topic: 'Your data',
            without: 'Your data in someone else’s format',
            with: 'Your records in your structure',
          },
          {
            topic: 'Connections',
            without: 'Connected to nothing else',
            with: 'Connected to your email, WhatsApp and accounts',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How an internal tool is built',
    blocks: [
      {
        title: 'Built around your process',
        body: 'The screens follow your steps, not a generic template.',
      },
      { title: 'Roles and access', body: 'Who can see, edit and approve.' },
      { title: 'History', body: 'Every change recorded, with who and when.' },
      { title: 'Alerts', body: 'WhatsApp or email when something needs a person.' },
      {
        title: 'Connected',
        body: 'To your email, documents and accounting software through their [APIs](/services/api-integrations).',
      },
      {
        title: 'Looked after',
        body: 'Backups, monitoring and changes as your process changes, on [Evolve](/services/evolve).',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools your team uses',
    groups: [
      { name: 'Email and documents', items: ['Google Workspace', 'Microsoft 365', 'Google Drive'] },
      { name: 'Messaging', items: ['WhatsApp'] },
      { name: 'Accounting', items: ['Your accounting software'] },
    ],
  },

  industries: {
    heading: 'Who an admin panel is for',
    items: [
      { sector: 'Manufacturing', text: 'Job cards, approvals and dispatch on one screen.' },
      { sector: 'Education', text: 'Admissions, batches and fee follow-ups for the office team.' },
      { sector: 'Hospitality', text: 'Stock, staff rosters and supplier orders in one place.' },
      {
        sector: 'Professional Services',
        text: 'Matters, deadlines and approvals that don’t live in chats.',
      },
      {
        sector: 'Real Estate',
        text: 'Bookings, documentation and handovers tracked unit by unit.',
      },
      { sector: 'Clinics', text: 'Procurement, maintenance and staff schedules across branches.' },
    ],
  },

  build: {
    heading: 'How we build an internal tool',
    steps: [
      {
        title: 'System Blueprint',
        body: 'We watch how the work happens and list its steps, roles and hand-offs.',
      },
      {
        title: 'Design with the team',
        body: 'The people who’ll use it see the screens before they’re built.',
      },
      { title: 'Build', body: 'Screens, roles, approvals, alerts.' },
      {
        title: 'Move your data',
        body: 'Spreadsheet records brought across where they’re in a usable shape.',
      },
      { title: 'Launch and Evolve', body: 'It changes as your process does.' },
    ],
  },

  price: {
    heading: 'Admin panel pricing',
    intro: 'Every internal tool starts with a System Blueprint, credited in full if you go ahead.',
    ...blueprintAndCustom({
      built: 'The tool built, tested and launched',
      summary: 'Screens, roles, approvals and alerts, built around your process.',
      interest: 'internal-tools',
      extra: [{ row: 'Spreadsheet data brought across', blueprint: 'Checked', custom: true }],
    }),
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'Admin panel questions',
    items: [
      {
        question: 'How much does an internal tool cost?',
        answer:
          'It starts with a System Blueprint for ₹10,000, credited in full if you go ahead. Internal tools are Custom, from ₹65,000, with a fixed quote for each phase.',
      },
      {
        question: 'Can you bring our spreadsheet data across?',
        answer: 'Yes, where it’s in a usable shape. We check it during the System Blueprint.',
      },
      {
        question: 'Will my team find it easy to use?',
        answer: 'It’s built around the way they already work, so there is less to learn.',
      },
      {
        question: 'Can we use it on our phones?',
        answer: 'Yes. Approvals and updates work on a phone, and the full screens on a laptop.',
      },
      {
        question: 'Who can see what?',
        answer: 'Roles decide who can see, edit and approve each kind of record.',
      },
      {
        question: 'Why not use an off-the-shelf task app?',
        answer:
          'Generic apps make your process fit them. An internal tool follows your own steps and approvals, keeps your records in your structure, and connects to the tools you use.',
      },
      {
        question: 'What if our process changes?',
        answer:
          'The tool changes with it: small changes come with your Evolve plan, bigger ones as a new phase.',
      },
      {
        question: 'Can it grow as we do?',
        answer: 'Yes. It’s built in phases, and each phase adds to the last.',
      },
    ],
  },

  notes: [SAMPLE_NOTE],
};

export default page;
