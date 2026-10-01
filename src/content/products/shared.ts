import type { ProductPage } from './types';

/**
 * What the custom-build pages share: the System Blueprint and Custom packages side by side, the
 * reasons to build with us, and the small print on sample data.
 */
export function blueprintAndCustom({
  built,
  summary,
  interest,
  extra = [],
}: {
  /** The row that says what the build delivers: "The web app built, tested and launched". */
  built: string;
  /** Custom's one line. */
  summary: string;
  interest: string;
  /** Rows only this service has, between the build and the warranty. */
  extra?: { row: string; blueprint: string | boolean; custom: string | boolean }[];
}): Pick<ProductPage['price'], 'rows' | 'packages'> {
  return {
    rows: [
      'How your business works, mapped',
      'Screens and roles planned',
      'A fixed quote for each phase',
      built,
      ...extra.map((e) => e.row),
      '45-day warranty',
      'Payment',
      'Evolve care',
    ],
    packages: [
      {
        name: 'System Blueprint',
        summary: 'A fixed-fee study of how your business works, with a roadmap and a fixed quote.',
        price: '₹10,000',
        unit: 'Credited in full if you go ahead',
        timeline: '1–2 weeks',
        values: [
          true,
          true,
          true,
          false,
          ...extra.map((e) => e.blueprint),
          false,
          'One fixed fee',
          false,
        ],
        cta: 'Start with a Blueprint',
        interest: 'blueprint',
        focal: true,
      },
      {
        name: 'Custom',
        summary,
        price: 'From ₹65,000',
        unit: 'Fixed quote per phase',
        timeline: 'Timeline set in the quote',
        values: [
          true,
          true,
          true,
          true,
          ...extra.map((e) => e.custom),
          true,
          'In stages, set by the project value',
          'Optional, from ₹899 a month',
        ],
        cta: 'Ask for a quote',
        interest,
      },
    ],
  };
}

/** Why build it with us, for anything built after a System Blueprint. */
export const WHY_CUSTOM: ProductPage['why'] = {
  heading: 'Why build it with Pixel Kinetix',
  items: [
    {
      icon: 'receipt',
      title: 'The price before the build',
      body: 'A System Blueprint and a fixed quote for each phase — never an open-ended bill.',
    },
    {
      icon: 'key',
      title: 'Yours to keep',
      body: 'You own the code written for you once it’s paid for in full.',
    },
    {
      icon: 'layers',
      title: 'Useful early',
      body: 'Phases that go live on their own, so you benefit long before the end.',
    },
    {
      icon: 'shield',
      title: 'A 45-day warranty',
      body: 'On every phase we deliver, then Evolve for the months after.',
    },
    {
      icon: 'people',
      title: 'Tested by your team',
      body: 'The people who’ll use it try it on real work before everyone gets it.',
    },
    {
      icon: 'pin',
      title: 'Built in Bangalore',
      body: 'A Bangalore team building for businesses across India.',
    },
  ],
};

export const SAMPLE_NOTE =
  'Screens on this page show sample data. The names and figures in them are invented.';
