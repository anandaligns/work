import { safari } from './kit';
import { blueprintAndCustom, SAMPLE_NOTE, WHY_CUSTOM } from './shared';
import type { ProductPage } from './types';

/**
 * AI Assistants, presented as a product: the page's words. Its pictures are its own mockups
 * (`components/lab/mocks-ai-assistants.tsx`), from its sample business, a Law Firm; the one screen
 * kept here is the assistant on the firm's website, which `/services` borrows for the front of its
 * group's picture. The firm and its sample data are invented, never a client.
 */

/** The assistant on the firm's website, on a client's phone. */
const WIDGET = safari('lawfirm.in', {
  title: 'Ask the firm',
  sub: 'Answers from our own information',
  action: 'close',
  grey: true,
  blocks: [
    {
      t: 'chat',
      messages: [
        { from: 'user', text: 'How much is a consultation?' },
        {
          from: 'bot',
          text: '₹2,000 for 45 minutes, at our office or by video, for property, family and business matters. Shall I book one?',
          sources: ['Consultation fees 2026.pdf'],
        },
        { from: 'user', text: 'Yes, Saturday please' },
        {
          from: 'bot',
          text: 'Booked: Adv. Menon, Saturday 10:00 am, MG Road office. You’ll get a reminder on WhatsApp.',
        },
      ],
    },
    { t: 'chips', items: ['Practice areas', 'Fees', 'Location', 'Talk to a lawyer'] },
  ],
});

const page: ProductPage = {
  accent: '#c026d3',
  accentDark: '#86198f',
  sub: 'An assistant on your website and WhatsApp that answers from your own information, books the next step, and hands over to your team when it should.',

  stage: { front: [WIDGET] },

  highlights: {
    heading: 'AI assistants at a glance',
    items: [
      { value: 'Any hour', label: 'Common questions answered on your website and WhatsApp.' },
      {
        value: 'Your sources',
        label: 'Answers only from the documents you give it, with the source shown.',
      },
      { value: '₹65,000', label: 'From, after a ₹10,000 System Blueprint credited in full.' },
      { value: 'A person', label: 'Whenever it isn’t sure, or whenever someone asks for one.' },
    ],
  },

  view: {
    statement:
      'Most of the questions your team answers every day are already written down somewhere.',
    body: [
      '**An AI assistant** answers the questions people ask again and again — fees, timings, locations, what to bring — instantly, at any hour, from your own documents. It shows where each answer came from, and says what it doesn’t know instead of guessing.',
      '**It turns answers into next steps.** Connected to your [booking system](/services/booking-payment-workflows) and [CRM](/services/crm-systems), it books the consultation or the visit, saves the contact and tells your team — so a late-night question becomes a lead in the morning.',
      'Anything that needs a person goes to one, with the whole conversation, on the website or on [WhatsApp](/services/whatsapp-automation).',
    ],
    photo: {
      file: 'ai-assistant-law-firm-enquiry',
      alt: 'A woman at home in the evening, asking a law firm’s assistant about a property matter on her phone.',
    },
  },

  features: {
    heading: 'What an AI assistant does',
    intro: 'Five things that leave your team the conversations that really need a person.',
    items: [
      {
        label: 'Answers at any hour',
        title: 'Answered in seconds, day or night.',
        body: '**Common questions are answered the moment they’re asked**, on your website and WhatsApp, in short plain replies — and each answer can come with the next step.',
        points: [
          'Instant answers, all week',
          'On the website and WhatsApp',
          'In English, Hindi or Kannada',
        ],
        caption: 'The assistant on the website, on a visitor’s phone',
      },
      {
        label: 'Answers you can trust',
        title: 'It says what it doesn’t know.',
        body: '**It answers only from the information you give it**, shows where an answer came from, and hands over when it isn’t sure — or on topics you’ve said always need a person.',
        points: [
          'Answers from your own documents',
          'A source behind every answer',
          'A person for everything else',
        ],
        caption: 'A question it has no answer for, handed over instead of guessed',
      },
      {
        label: 'Leads, not just answers',
        title: 'A late question becomes a morning lead.',
        body: '**It books the next step and saves the contact**, with the conversation, in your CRM — and your team sees it in the morning summary.',
        points: [
          'Books consultations, visits or appointments',
          'Saves the contact and the conversation',
          'Tells your team what’s open',
        ],
        caption: 'A conversation that ended with a consultation booked',
      },
      {
        label: 'Your knowledge',
        title: 'Update a document, and it knows.',
        body: '**It reads from the documents you already keep** — fee sheets, timings, policies, FAQs — so changing an answer means changing the document, not retraining anything.',
        points: [
          'Reads your PDFs, Docs and Sheets',
          'Old documents flagged for a check',
          'Topics it must never answer, listed',
        ],
        caption: 'The documents it reads from, and what always goes to a person',
      },
      {
        label: 'Insights',
        title: 'Know what people ask, and when.',
        body: '**A weekly view of what people ask, when they ask it and what happened next**, so you can fix the pages and documents that cause the most questions.',
        points: [
          'Top questions, week by week',
          'When questions arrive',
          'Answered, booked or handed over',
        ],
        caption: 'The week’s questions, by time and by topic',
      },
    ],
  },

  included: {
    heading: 'AI assistant features',
    intro: 'Everything we set up, test and look after.',
    items: [
      {
        icon: 'book',
        title: 'Your documents',
        body: 'PDFs, Docs, Sheets and pages it reads from, kept current.',
      },
      {
        icon: 'file',
        title: 'Sources shown',
        body: 'The document behind each answer, so anyone can check it.',
      },
      {
        icon: 'userShare',
        title: 'Hand-over',
        body: 'To a person with the whole conversation, when it should.',
      },
      {
        icon: 'calendar',
        title: 'Booking',
        body: 'Consultations, visits or appointments into your calendar.',
      },
      {
        icon: 'people',
        title: 'Leads saved',
        body: 'Contacts and conversations saved to your CRM.',
      },
      {
        icon: 'whatsapp',
        title: 'Website and WhatsApp',
        body: 'The same answers in both places, from one set of documents.',
      },
      { icon: 'globe', title: 'Languages', body: 'Replies in the languages your customers use.' },
      {
        icon: 'shield',
        title: 'Guardrails',
        body: 'Topics it must never answer, and a tone you choose.',
      },
      {
        icon: 'chart',
        title: 'Weekly insights',
        body: 'What people ask, when, and what happened next.',
      },
    ],
  },

  compare: {
    heading: 'AI assistants compared',
    intro: 'What changes when common questions answer themselves.',
    us: 'An assistant that answers from your information and knows when to stop.',
    options: [
      {
        label: 'Your team, by hand',
        note: 'Questions answered by whoever is free.',
        rows: [
          {
            topic: 'Overnight',
            without: 'Questions pile up overnight',
            with: 'Answered as they arrive',
          },
          {
            topic: 'Repeats',
            without: 'The same answers typed all day',
            with: 'Common answers handled; your team handles the rest',
          },
          {
            topic: 'What people ask',
            without: 'No idea what people ask most',
            with: 'A weekly list of top questions',
          },
          {
            topic: 'Records',
            without: 'Conversations lost after a chat',
            with: 'Every conversation saved with the contact',
          },
        ],
      },
      {
        label: 'A menu chatbot',
        note: 'A bot with fixed buttons and scripted replies.',
        rows: [
          {
            topic: 'Questions',
            without: 'Only the questions someone scripted',
            with: 'Any question your documents answer',
          },
          {
            topic: 'Changes',
            without: 'A new script for every change',
            with: 'Update the document, and it knows',
          },
          {
            topic: 'Dead ends',
            without: '“Please choose an option” loops',
            with: 'A person when it can’t help',
          },
          { topic: 'Next step', without: 'A link to a form', with: 'The booking made in the chat' },
        ],
      },
      {
        label: 'A general AI chat',
        note: 'A general-purpose AI assistant, not set up for you.',
        rows: [
          {
            topic: 'Accuracy',
            without: 'Answers from anywhere, sometimes made up',
            with: 'Only from your documents, with sources',
          },
          {
            topic: 'Your business',
            without: 'Knows nothing about your fees or rules',
            with: 'Knows exactly what you’ve told it',
          },
          {
            topic: 'Actions',
            without: 'Can’t book or save anything',
            with: 'Books, saves the lead, tells your team',
          },
          {
            topic: 'Control',
            without: 'No say over what it talks about',
            with: 'Topics that always go to a person',
          },
        ],
      },
    ],
  },

  how: {
    heading: 'How an AI assistant works',
    blocks: [
      {
        title: 'Your knowledge',
        body: 'Prices, timings, policies and FAQs, read from your documents and kept current.',
      },
      {
        title: 'Answers with sources',
        body: 'It answers only from that knowledge, and shows where each answer came from.',
      },
      {
        title: 'Hand-over rules',
        body: 'To a person when it’s unsure, when asked, or on topics you choose.',
      },
      {
        title: 'Connected',
        body: 'To your [booking system](/services/booking-payment-workflows), [CRM](/services/crm-systems) and WhatsApp, so it can act, not only answer.',
      },
      {
        title: 'Tested on real questions',
        body: 'Your team asks it what customers ask, and we correct it before launch.',
      },
      {
        title: 'Visible to you',
        body: 'Every conversation saved, searchable and reviewed each week.',
      },
    ],
  },

  tools: {
    heading: 'Works with the tools you already use',
    intro: 'It reads from the documents you keep and acts in the tools you use.',
    groups: [
      { name: 'Channels', items: ['Your website forms', 'WhatsApp'] },
      { name: 'Knowledge', items: ['Google Drive', 'Google Sheets'] },
      { name: 'Booking', items: ['Google Calendar'] },
      { name: 'CRM', items: ['Zoho CRM', 'HubSpot'] },
      { name: 'AI models', items: ['Anthropic Claude', 'Google Gemini'] },
    ],
  },

  industries: {
    heading: 'Who an AI assistant suits',
    items: [
      {
        sector: 'Education',
        text: 'Fees, batches and syllabus answered at any hour, demo classes booked.',
      },
      { sector: 'Clinics', text: 'Treatments, timings and fees answered, appointments booked.' },
      {
        sector: 'Real Estate',
        text: 'Prices, sizes and possession dates answered, site visits booked.',
      },
      { sector: 'Hospitality', text: 'Menus, timings and table bookings answered on WhatsApp.' },
      { sector: 'Retail', text: 'Sizes, delivery and returns answered before the customer buys.' },
      {
        sector: 'Professional Services',
        text: 'Services, documents needed and fees answered, calls booked.',
      },
    ],
  },

  build: {
    heading: 'How we build an AI assistant',
    steps: [
      {
        title: 'Gather your knowledge',
        body: 'The documents and answers it should use, and the questions it must never guess.',
      },
      {
        title: 'Set the rules',
        body: 'Tone, hand-over, languages, and what it can book or change.',
      },
      { title: 'Connect it', body: 'Website, WhatsApp, booking and CRM.' },
      {
        title: 'Test on real questions',
        body: 'Your team asks it what customers ask, and we correct it.',
      },
      {
        title: 'Launch and review',
        body: 'Knowledge kept current and top questions reviewed on [Evolve](/services/evolve).',
      },
    ],
  },

  price: {
    heading: 'AI assistant pricing',
    intro: 'Built after a System Blueprint, priced in writing before we start.',
    ...blueprintAndCustom({
      built: 'The assistant built, tested and launched',
      summary: 'An assistant on your website and WhatsApp, connected to your tools.',
      interest: 'ai-assistants',
    }),
    note: 'AI usage is charged by the provider per use; we estimate it upfront.',
    notes: [
      'AI providers charge per use, by the length of each conversation. Charges are paid to the provider, not to Pixel Kinetix, and we estimate them for you before launch.',
    ],
  },

  why: WHY_CUSTOM,

  faqs: {
    heading: 'AI assistant questions',
    items: [
      {
        question: 'How much does an AI assistant cost?',
        answer:
          'Custom, from ₹65,000, after a ₹10,000 System Blueprint that’s credited in full if you go ahead. AI usage is charged by the provider per use; we estimate it upfront.',
      },
      {
        question: 'Will it make things up?',
        answer:
          'It’s set up to answer only from the information you give it, and to hand over to a person when it isn’t sure. We test it on your real questions before launch.',
      },
      {
        question: 'What does it cost to run?',
        answer:
          'AI providers charge per use. It’s paid to the provider, and we estimate it upfront.',
      },
      {
        question: 'Can it book appointments?',
        answer: 'Yes. Connected to your booking system, it can offer free slots and book them.',
      },
      {
        question: 'How do we update what it knows?',
        answer:
          'Update the shared document it reads from, or send us the change; on Evolve we keep it current.',
      },
      {
        question: 'Will customers know it’s an assistant?',
        answer: 'Yes. It says so, and anyone can ask for a person at any time.',
      },
      {
        question: 'Does it work on both WhatsApp and the website?',
        answer: 'Yes, from the same knowledge, so both give the same answers.',
      },
      {
        question: 'Where does our data go?',
        answer:
          'We agree in the System Blueprint which AI provider is used and how conversations are stored, before anything is built.',
      },
    ],
  },

  notes: [
    SAMPLE_NOTE,
    'Anthropic, Claude, Google, Gemini, Zoho, HubSpot and WhatsApp are trademarks of their owners. Pixel Kinetix is not affiliated with them.',
  ],
};

export default page;
