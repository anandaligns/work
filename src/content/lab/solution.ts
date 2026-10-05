import type { StageTask } from '@/components/pages/app-stage';
import type { Screen } from '@/components/screens/types';
import type { ShowcasePoint } from '@/components/solutions/showcase';
import type { IconName } from '@/components/ui/icon';
import type { Heading } from '@/content/site';

import type { ProductPage } from '../products/types';

/**
 * A solution page's own words, in the pattern Lead Automation set: its colour, the opening's
 * tasks and way on, the system behind it in three cards, one customer's story, how it works with
 * everything that's in it, what changes, and the ways in. The rest — the figures, the point of
 * view, the packages and the questions — comes from the solution's product file, and its
 * mockups from `components/lab/solution-mocks`.
 */
export type SolutionContent = {
  /** The page's colour: the home page's promise colour for the solution. */
  accent: string;
  /**
   * The page's tint from the home page, for the surfaces behind its mockups (`groundOf`,
   * `fadeSurfaceOf`). Without one, the page's accent at 7% deepening to 12%, as the service
   * pages'.
   */
  tint?: string;
  /** The opening's product at work, and the way on pinned under the words. */
  tasks: StageTask[];
  note: { label: string; text: string; href: string };
  /** The system behind it: three cards, each with the service that does it. */
  behind: {
    heading: Heading;
    intro: string;
    cards: { title: string; body: string; cta: { label: string; href: string } }[];
  };
  journey: {
    eyebrow: string;
    heading: Heading;
    intro: string;
    steps: { time: string; title: string; text: string; screen: Screen }[];
  };
  /** How it works, with everything that's in it, each said once. */
  system: { heading: Heading; intro?: string; points: ShowcasePoint[] };
  benefits: { heading: Heading; intro?: string; points: ShowcasePoint[] };
  /**
   * The services it's built from, after the benefits: by default the solution's own list in
   * `content/pages.ts`, or the ones given here.
   */
  built: { heading: Heading; intro: string; services?: string[] };
  ways: { heading: Heading; intro?: string };
  /**
   * Why build it here, on the page's one dark band after the ways in: six points, none of them
   * saying again what another section already says.
   */
  why: ProductPage['why'];
};

const plain = (text: string) => text.replace(/\*\*/g, '');

/** The product page's five features, as the benefits, each with its glyph by its label. */
export const benefitsOf = (
  product: ProductPage,
  icons: Record<string, IconName>,
): ShowcasePoint[] =>
  product.features.items.map((item) => ({
    icon: icons[item.label] ?? 'check',
    title: item.title,
    body: plain(item.body),
  }));

/** A feature's screen, by its label in the product file. */
export const screenOf = (product: ProductPage, label: string) =>
  product.features.items.find((item) => item.label === label)!.screen!;

/** A desktop screen, for the opening's tasks. */
export const desk = (screen: unknown) => screen as StageTask['screen'];
