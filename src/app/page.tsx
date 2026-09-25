import type { Metadata } from 'next';

import { Band } from '@/components/layout/band';
import { Closing } from '@/components/home/closing';
import { Faq } from '@/components/home/faq';
import { Hero } from '@/components/home/hero';
import { Numbers } from '@/components/home/numbers';
import { Portal } from '@/components/home/portal';
import { Pricing } from '@/components/home/pricing';
import { Process } from '@/components/home/process';
import { Promises } from '@/components/home/promises';
import { Reviews } from '@/components/home/reviews';
import { SectionHead } from '@/components/home/section-head';
import { Sectors } from '@/components/home/sectors';
import { Services } from '@/components/home/services';
import { Solutions, SolutionsHead } from '@/components/home/solutions';
import { Work } from '@/components/home/work';
import { HomeStructuredData } from '@/components/seo/structured-data';
import { headings } from '@/content/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

/**
 * Home. The order is the argument: what we are (hero), who it is for (sectors), what we do
 * (services), what you get (solutions), what it looks like (work), what it is like (promises), the
 * numbers, how it runs (process), where you see it (portal), what it costs (pricing), what clients
 * say (reviews), what people ask (questions), and the ask.
 */
export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <Hero />
      <Sectors />
      <Services />
      <Band id="solutions" labelledBy="solutions-heading" className="py-24 lg:py-32">
        <SolutionsHead />
        <Solutions />
      </Band>
      <Work />
      <Promises />
      <Numbers />
      <Process />
      <Portal />
      <Band id="pricing" labelledBy="pricing-heading" className="py-24 lg:py-32">
        <SectionHead
          id="pricing"
          eyebrow="Pricing"
          heading={headings.pricing}
          intro="Every package has a published price. Bigger systems get a fixed quote after a System Blueprint. We start once the advance is paid."
        />
        <Pricing />
      </Band>
      <Reviews />
      <Band id="faq" labelledBy="faq-heading" className="py-24 lg:py-32">
        <SectionHead
          id="faq"
          eyebrow="FAQ"
          heading={headings.faq}
          intro="Straight answers about systems, prices, Evolve and more."
        />
        <Faq />
      </Band>
      <Closing />
    </>
  );
}
