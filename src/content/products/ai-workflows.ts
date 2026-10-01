import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * AI Workflows, presented as a product: the page's words, with no screens — its pictures are its
 * own mockups (`components/lab/mocks-ai-workflows.tsx`), from its sample business, an Accounting &
 * Tax Firm, and no other page borrows one.
 */

const page: ProductPage = {
  accent: '#be123c',
  accentDark: '#881337',
  sub: 'AI that reads your documents, enters the data and flags what needs a person, with your team approving before anything is final.',

  highlights: {
    heading: 'AI workflows at a glance',
    items: [
      { value: 'Seconds', label: 'To read an invoice, a PO or a form into fields for review.' },
      {
        value: 'Every one',
        label: 'Checked against your purchase orders, price lists and records.',
      },
      { value: '₹65,000', label: 'From, after a ₹10,000 System Blueprint credited in full.' },
      { value: 'A person', label: 'Approves before anything reaches your books.' },
    ],
  },

  view: {
    statement: 'Your team’s time is worth more than retyping PDFs.',
    body: [
      '**Invoices, purchase orders, delivery notes and forms** arrive all day, and someone types them into the system. An AI workflow does the reading and the typing, then checks the result against what you expected.',
      '**People still make the call.** Anything that doesn’t match a purchase order, a price list or a past record is flagged, and nothing is posted until someone on your team approves it.',
      'Approved data goes straight into [your accounting software](/services/api-integrations) or ERP, as part of [one system for the business](/solutions/run-it-in-one-place).',
    ],
    photo: {
      file: 'ai-workflows-accounting-firm',
      alt: 'A chartered accountant’s desk, with a client’s supplier invoices beside a laptop.',
    },
  },

  features: {
    heading: 'What AI workflows do',
    intro: 'Five things that take the typing off your team and leave them the decisions.',
    items: [
      {
        label: 'Reading',
        title: 'The reading and typing, done.',
        body: '**Documents are read and their data entered for review**, from PDFs, scans and emails — in the inbox they already arrive in.',
        points: [
          'Invoices, POs, delivery notes and forms',
          'Fields filled for review',
          'Filed with the record they belong to',
        ],
        caption: 'Today’s documents: read, checked, waiting or posted',
      },
      {
        label: 'Checks',
        title: 'Exceptions, not everything.',
        body: '**Each document is checked against your records**, so people look only at what doesn’t fit: a short delivery, a changed rate, a number seen before.',
        points: [
          'Checks against POs and price lists',
          'Duplicates and GSTIN mismatches caught',
          'A suggestion for each exception',
        ],
        caption: 'Only the documents that don’t fit, each with a suggestion',
      },
      {
        label: 'Approval',
        title: 'A person makes the call.',
        body: '**Nothing is final until someone approves it** — matches in one pass, exceptions one by one — on a laptop or a phone, with every decision on record.',
        points: [
          'Approve matches in one pass',
          'Two approvals over an amount you set',
          'Every decision recorded',
        ],
        caption: 'Three invoices ready for approval on a phone',
      },
      {
        label: 'From anywhere',
        title: 'From the inbox, a scan or a photo.',
        body: '**Paper invoices are photographed on a phone** and read like any other, so the one handed over at the gate isn’t the one that gets missed.',
        points: [
          'Email, upload, scan or photo',
          'Poor scans sent straight to a person',
          'The original kept with the record',
        ],
        caption: 'A paper invoice scanned on a phone',
      },
      {
        label: 'Summaries',
        title: 'What came in, and what keeps going wrong.',
        body: '**A weekly summary of what was read, what matched and what didn’t**, with the suppliers causing the most checks — so a pattern becomes a conversation, not a surprise.',
        points: [
          'Weekly summaries',
          'Patterns by supplier or type',
          'Alerts when something needs attention',
        ],
        caption: 'The week’s documents, and the suppliers behind most checks',
      },
    ],
  },

  included: {
    heading: 'AI workflow features',
    intro: 'What every workflow we build comes with.',
    items: [
      {
        icon: 'scan',
        title: 'Document reading',
        body: 'Invoices, POs, delivery notes, forms, from PDFs, scans and photos.',
      },
      {
        icon: 'mail',
        title: 'From your inbox',
        body: 'Documents read from the email address they already arrive at.',
      },
      {
        icon: 'check',
        title: 'Checks you set',
        body: 'Against POs, price lists, past invoices and supplier records.',
      },
      {
        icon: 'alert',
        title: 'Exceptions flagged',
        body: 'Only what doesn’t fit, each with a suggestion.',
      },
      {
        icon: 'userCheck',
        title: 'Approval steps',
        body: 'One or two approvals, by amount or supplier.',
      },
      {
        icon: 'database',
        title: 'Into your books',
        body: 'Approved data posted to Tally, Zoho Books or your ERP.',
      },
      {
        icon: 'history',
        title: 'A full record',
        body: 'The original, what was read and who approved it, kept together.',
      },
      {
        icon: 'chart',
        title: 'Weekly summary',
        body: 'Volumes, matches and exceptions, by supplier.',
      },
      {
        icon: 'lock',
        title: 'Data agreed upfront',
        body: 'Which AI provider is used, and how data is handled, agreed first.',
      },
    ],
  },

  compare: {
    heading: 'AI workflows compared',
    intro: 'What changes when the reading and checking are done for your team.',
    us: 'AI reading and checks, with a person approving every result.',
    options: [
      {
        label: 'Typing by hand',
        note: 'Someone types every invoice into the system.',
        rows: [
          {
            topic: 'Entry',
            without: 'Invoices typed in by hand',
            with: 'Read and entered for review',
          },
          {
            topic: 'Mismatches',
            without: 'Mismatches found late',
            with: 'Checked against POs on arrival',
          },
          {
            topic: 'Approvals',
            without: 'Approvals by walking to someone’s desk',
            with: 'Approvals in one queue',
          },
          { topic: 'Overview', without: 'No overview of suppliers', with: 'A weekly summary' },
        ],
      },
      {
        label: 'Basic OCR',
        note: 'Text pulled from a scan, with no checks.',
        rows: [
          {
            topic: 'Output',
            without: 'A block of text to sort through',
            with: 'The fields you need, in place',
          },
          {
            topic: 'Layouts',
            without: 'A template for every supplier',
            with: 'New layouts read without one',
          },
          {
            topic: 'Checks',
            without: 'Nothing compared with your records',
            with: 'POs, rates and duplicates checked',
          },
          {
            topic: 'Next step',
            without: 'Still typed into accounts',
            with: 'Posted once approved',
          },
        ],
      },
      {
        label: 'Outsourced entry',
        note: 'Documents sent out to be typed by someone else.',
        rows: [
          { topic: 'Speed', without: 'Back in a day or two', with: 'Read as they arrive' },
          {
            topic: 'Your data',
            without: 'Documents leave the business',
            with: 'Handled as agreed in the Blueprint',
          },
          {
            topic: 'Checks',
            without: 'Typed as they are, errors and all',
            with: 'Checked before anyone approves',
          },
          {
            topic: 'Cost',
            without: 'A fee on every page, forever',
            with: 'Built once, run for the provider’s cost',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How AI workflows work',
    blocks: [
      {
        title: 'Reading',
        body: 'AI extracts the fields you need from PDFs, scans, photos and emails.',
      },
      { title: 'Checks', body: 'Rules compare them with your POs, price lists and records.' },
      { title: 'Approval', body: 'Nothing is final until someone on your team says so.' },
      {
        title: 'Posting',
        body: 'Approved data goes into your [accounting software](/services/api-integrations) or ERP.',
      },
      {
        title: 'Tested on your samples',
        body: 'We measure where it reads reliably before your team relies on it.',
      },
      {
        title: 'Data handling',
        body: 'The AI provider and how data is stored, agreed in the System Blueprint.',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'Documents from where they arrive, data into where it belongs.',
    groups: [
      { name: 'Where documents arrive', items: ['Gmail', 'Outlook', 'Google Drive', 'WhatsApp'] },
      { name: 'Where data goes', items: ['Tally', 'Zoho Books', 'Google Sheets'] },
      { name: 'AI models', items: ['Anthropic Claude', 'Google Gemini'] },
    ],
  },

  industries: {
    heading: 'Who AI workflows suit',
    items: [
      {
        sector: 'Manufacturing',
        text: 'Supplier invoices and delivery notes checked against purchase orders.',
      },
      {
        sector: 'Professional Services',
        text: 'Contracts and client documents read and filed for review.',
      },
      { sector: 'Real Estate', text: 'Agreements and KYC documents read into the system.' },
      { sector: 'Education', text: 'Application forms and certificates read and checked.' },
      { sector: 'Clinics', text: 'Referral letters and lab reports filed to the right patient.' },
      { sector: 'Retail', text: 'Supplier bills and GRNs matched before payment.' },
    ],
  },

  build: {
    heading: 'How we build AI workflows',
    steps: [
      {
        title: 'Map the documents',
        body: 'Which documents, which fields, which checks, and where the data goes.',
      },
      {
        title: 'Test on your real samples',
        body: 'We measure where it reads reliably before building around it.',
      },
      {
        title: 'Build the workflow',
        body: 'Reading, checks, the review queue and the connections.',
      },
      { title: 'Run it side by side', body: 'Your team checks every result for the first weeks.' },
      {
        title: 'Add as you go',
        body: 'New document types and checks added on [Evolve](/services/evolve).',
      },
    ],
  },

  price: {
    heading: 'AI workflow pricing',
    intro: 'Built after a System Blueprint, priced in writing before we start.',
    ...blueprintAndCustom({
      built: 'The workflow built, tested and launched',
      summary: 'Document reading, checks and approvals, connected to your books.',
      interest: 'ai-workflows',
    }),
    note: 'AI usage is charged by the provider per use; we estimate it upfront.',
    notes: [
      'AI providers charge per use, by the size of each document. Charges are paid to the provider, not to Pixel Kinetix, and we estimate them for you before launch.',
    ],
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'AI workflow questions',
    items: [
      {
        question: 'How much does an AI workflow cost?',
        answer:
          'Custom, from ₹65,000, after a ₹10,000 System Blueprint that’s credited in full if you go ahead. AI usage is charged by the provider per use; we estimate it upfront.',
      },
      {
        question: 'What kind of work suits AI?',
        answer: 'Repetitive reading and typing: invoices, forms, emails, documents.',
      },
      {
        question: 'How accurate is it?',
        answer:
          'It depends on your documents, so we test it on real samples before your team relies on it, and a person approves the results.',
      },
      {
        question: 'What about poor scans or handwriting?',
        answer:
          'We test your real documents first. The ones it can’t read reliably go straight to a person.',
      },
      {
        question: 'Will it replace my team?',
        answer: 'No. It takes the typing off them; the decisions stay with people.',
      },
      {
        question: 'Where does our data go?',
        answer:
          'We agree in the System Blueprint which AI provider processes your documents and how the data is handled, before anything is built.',
      },
      {
        question: 'Can it work with our existing email?',
        answer: 'Yes. It can read documents from the inbox they already arrive in.',
      },
      {
        question: 'Can it post to Tally?',
        answer:
          'Yes, through the integration options Tally supports, once a person has approved the entry.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Tally, Zoho, Google, Microsoft Outlook, Anthropic, Claude and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
