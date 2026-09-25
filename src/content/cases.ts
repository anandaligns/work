import type { IconName } from '@/components/ui/icon';

import type { Step, Tint } from './pages';

/**
 * Case studies, at `/work/<slug>`. A case goes up the day its project is live and the client has
 * agreed to it — never before, so there is no empty page. Only figures the client has agreed to
 * publish, measured before and after; with none yet, what changed in words, and a quote only with
 * written permission.
 *
 * The first, the digital marketing agency's lead alerts, invoices and payment reminders, joins
 * this list when it launches. Collect meanwhile, while the project runs: permission to name the
 * agency (or to call it "a digital marketing agency"); leads a month and time to first reply;
 * hours a month on invoices; invoices paid late and by how long; the same three after 30 and 90
 * days; screenshots with client data blurred; and a short quote after the first month.
 */
export type CaseStudy = {
  slug: string;
  /** The outcome and the industry — the page's title. */
  title: string;
  /** What was built and one result. */
  description: string;
  /** Led by the outcome. */
  h1: string;
  summary: string;
  facts: { industry: string; built: string; month: string };
  /** Service anchors, each linked from the page. */
  services: string[];
  /** How it worked before, in the client's words where possible. */
  before: string[];
  built: { icon: IconName; text: string }[];
  /** The client's real flow, their tools as glyph blocks. */
  flow: Step[];
  screens: { src: string; alt: string; caption: string; width: number; height: number }[];
  changed: {
    figures: { value: string; label: string }[];
    words?: string;
    quote?: { text: string; name: string; role: string };
  };
  closingIcon: IconName;
  tint: Tint;
  /** ISO date, for the Article data. */
  published: string;
};

export const caseStudies: CaseStudy[] = [];
