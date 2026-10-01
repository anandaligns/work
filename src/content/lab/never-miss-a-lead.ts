import type { IconName } from '@/components/ui/icon';
import type { Screen } from '@/components/screens/types';

import product from '../products/never-miss-a-lead';

/**
 * A test of a page pattern of the solutions' own: Never Miss a Lead told as a goal rather than a
 * product — where enquiries go missing, the one system behind every enquiry, one lead's evening
 * from the form to the booking, the services it's built from and the two ways in. Served at
 * `/solutions/never-miss-a-lead-test`, out of search and the sitemap. Every screen is the product
 * page's own, so the sample business and its data stay the same invented ones.
 */

/** Something on the window's face: a tool's logo (a `brand-logos` key) or one of our glyphs. */
export type EngineNode = { logo: string } | { icon: IconName };

export type EngineTab = {
  title: string;
  text: string;
  /** Where the work comes from, down the left of the window. */
  from: [EngineNode, EngineNode, EngineNode];
  /** Where it goes, down the right. */
  to: [EngineNode, EngineNode, EngineNode];
};

const [QUOTE, ALERT] = product.stage?.front ?? [];
const screen = (label: string) => product.features.items.find((i) => i.label === label)!.screen!;

export const lab = {
  accent: product.accent,

  /** The opening's four facts, short enough to sit in a row under the actions. */
  facts: [
    { value: 'At once', label: 'Every enquiry answered' },
    { value: 'One list', label: 'Every lead, every source' },
    { value: '₹45,000', label: 'From, one-time' },
    { value: '4–6 weeks', label: 'From first call to live' },
  ],

  leaks: {
    heading: { lead: 'Leads rarely say no.', fill: 'They just stop waiting.' },
    intro:
      'An enquiry at 9 pm, a message during a job, a DM on Sunday: each is someone ready to book, and each cools while it waits.',
    items: product.compare.options[0]!.rows.map((row) => ({
      topic: row.topic ?? '',
      without: row.without,
      with: row.with,
    })),
  },

  engine: {
    eyebrow: 'How it works',
    heading: { lead: 'One system,', fill: 'behind every enquiry.' },
    intro:
      'The Connected Website runs every enquiry through one system: it gathers them from your website, ads and WhatsApp, answers at once, tells the right person and keeps each one in view until it’s closed.',
    tabs: [
      {
        title: 'Every source, one inbox',
        text: 'Website forms, ads and WhatsApp land together, each with its source.',
        from: [{ icon: 'globe' }, { logo: 'googleads' }, { logo: 'instagram' }],
        to: [{ icon: 'clipboard' }, { icon: 'target' }, { icon: 'userCheck' }],
      },
      {
        title: 'Answered at once',
        text: 'A reply with the price or the next free slots, on WhatsApp and email.',
        from: [{ icon: 'globe' }, { logo: 'whatsapp' }, { logo: 'instagram' }],
        to: [{ logo: 'whatsapp' }, { logo: 'gmail' }, { logo: 'googlecalendar' }],
      },
      {
        title: 'The right person, told',
        text: 'Anything that needs a person goes to the right one, by area or service.',
        from: [{ logo: 'googleads' }, { icon: 'globe' }, { logo: 'googlemaps' }],
        to: [{ icon: 'bell' }, { icon: 'userCheck' }, { icon: 'pin' }],
      },
      {
        title: 'Tracked until closed',
        text: 'A next step, an owner and a date on every lead, with follow-ups until it’s done.',
        from: [{ logo: 'whatsapp' }, { logo: 'googlecalendar' }, { icon: 'repeat' }],
        to: [{ icon: 'dashboard' }, { icon: 'chart' }, { logo: 'googleanalytics' }],
      },
    ] satisfies EngineTab[],
  },

  journey: {
    eyebrow: 'One lead’s evening',
    heading: { lead: '9:01 pm to booked,', fill: 'before anyone picks up a phone.' },
    intro: 'Priya asks for a deep clean after dinner. Here is what happens next, on its own.',
    steps: [
      {
        time: '9:01 pm',
        title: 'She asks for a quote',
        text: 'A 3 BHK deep clean, from the website, on her phone.',
        screen: QUOTE!,
      },
      {
        time: '9:02 pm',
        title: 'The quote reaches her',
        text: 'Eight seconds later, on WhatsApp and email, with a way to book.',
        screen: screen('Answered at once'),
      },
      {
        time: '9:02 pm',
        title: 'Anita is told',
        text: 'The HSR team’s phone gets the enquiry, and the reply that already went.',
        screen: ALERT!,
      },
      {
        time: '9:06 pm',
        title: 'Saturday, 10:30 am',
        text: 'Booked from the reply, with a reminder the evening before.',
        screen: screen('Booked in the reply'),
      },
    ] satisfies { time: string; title: string; text: string; screen: Screen }[],
  },

  built: {
    eyebrow: 'Built from',
    heading: { lead: 'Five services,', fill: 'built as one.' },
    intro:
      'Never Miss a Lead isn’t a plugin on a website. It’s five of our services, designed together and looked after as one.',
  },

  ways: {
    eyebrow: 'Pricing',
    heading: { lead: 'Two ways in.', fill: 'One system.' },
    intro: product.price.intro,
  },
};

export { product };
