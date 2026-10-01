import type { Screen } from '@/components/screens/types';
import type { IconName } from '@/components/ui/icon';
import type { Faq, Sector } from '@/content/pages';

/**
 * A service, solution or Evolve presented as a product, the way Apple presents iPhone — what it
 * is, the highlights, what it does feature by feature, everything included, how it compares, how
 * it's built and how we build it, what it works with, who it's for, the packages and why build it
 * here — in Lightfield's layout: the page's opening with its moving pattern, then a wide dark
 * panel with the product at work, then the product's sections on alternating bands.
 *
 * Every page has its own example business and its own screens — none shared with another page —
 * drawn in its own accent. Text may carry `[links](/path)` and `**lead-ins**`. The FAQPage data
 * is built from `faqs`.
 *
 * A service page opens on its own stage (`ServiceOpening`) and draws its features and how it's
 * built from its own mockups (`components/lab`), so a service's content has no feature or "how"
 * screens, and a stage only for the screens `/services` and the home hero borrow. Solutions and
 * Evolve show all of them.
 */
export type ProductPage = {
  /** The page's own colour: its marks, wires, washes and key moments. No two pages share one. */
  accent: string;
  /** A darker step of the accent, for emphasis: marks on pale chips, where the accent is light. */
  accentDark?: string;
  /** A line about the product, for search and sharing. */
  sub: string;
  /**
   * The product at work, under the page's opening: a wide dark panel with the software at the
   * back, phones in front, and a toast dropping in as something happens. On a service, only the
   * screens another page borrows.
   */
  stage?: {
    tagline?: string;
    toast?: { title: string; line?: string };
    back?: Screen;
    front?: Screen[];
    /** A dark photograph behind the product, until then a dark gradient. */
    photo?: { file: string; alt: string };
  };
  /** The figures under the hero: facts about the product and its price, never results. */
  highlights: { heading: string; items: { value: string; label: string }[] };
  view: { statement: string; body: string[]; photo: { file: string; alt: string } };
  features: {
    heading: string;
    intro?: string;
    items: {
      label: string;
      title: string;
      body: string;
      points: string[];
      stats?: { value: string; label: string }[];
      caption: string;
      /** The feature at work, where the page has no mockup of its own for it. */
      screen?: Screen;
      pair?: Screen;
    }[];
  };
  included: {
    heading: string;
    intro?: string;
    items: { icon: IconName; title: string; body: string }[];
  };
  compare: {
    heading: string;
    intro?: string;
    /** A line under "With Pixel Kinetix", at the head of its column. */
    us?: string;
    options: {
      label: string;
      /** A line under the option's name: what doing it that way means. */
      note?: string;
      /** `topic` names what each row compares, in the table's first column. */
      rows: { topic?: string; without: string; with: string }[];
    }[];
  };
  how: {
    heading: string;
    intro?: string;
    blocks: { title: string; body: string }[];
    /**
     * The system at work on two devices, over how we build it and what it works with, where the
     * page has no mockup of its own for it.
     */
    screen?: Screen;
  };
  tools: { heading: string; intro?: string; groups: { name: string; items: string[] }[] };
  industries: { heading: string; intro?: string; items: { sector: Sector; text: string }[] };
  build: { heading: string; intro?: string; steps: { title: string; body: string }[] };
  price: {
    heading: string;
    intro?: string;
    /** What each package column lists, in order. */
    rows?: string[];
    packages?: {
      name: string;
      summary: string;
      price: string;
      unit?: string;
      timeline?: string;
      /** One value per row; `true` is a tick, `false` a dash. */
      values: (string | boolean)[];
      cta: string;
      interest: string;
      focal?: boolean;
    }[];
    note?: string;
    /** Small print about charges, under the packages. */
    notes?: string[];
  };
  why: {
    heading: string;
    intro?: string;
    items: { icon: IconName; title: string; body: string }[];
  };
  faqs: { heading: string; items: Faq[] };
  /** Small print, numbered, at the foot of the page. */
  notes?: string[];
};
