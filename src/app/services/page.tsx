import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import { type ZigRow, ZigZag } from '@/components/pages/zigzag';
import { RollLink } from '@/components/ui/roll-link';
import { GroupFan } from '@/components/showcase/cards';
import { WebPageStructuredData } from '@/components/seo/web-page-data';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { categories, groupIntros, startFor, whatsappAbout } from '@/content/site';
import { productFor } from '@/content/products';

/**
 * `/services` — every service, by group: the page intro, then the three groups as alternating
 * rows (each with its five services as points, beside the five fanned — open them to pick one),
 * then the closing.
 */
const SERVICES_TITLE = 'Services: Websites, Software & Automation';
const SERVICES_DESCRIPTION =
  'Websites, online stores and apps; dashboards, CRM and custom software; WhatsApp, booking and AI automation. Fifteen services from Bangalore, priced upfront.';

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: { title: SERVICES_TITLE, description: SERVICES_DESCRIPTION, url: '/services' },
};

/** Each group's colour and the word of its name drawn in it. */
const GROUPS: Record<string, { accent: string; highlight: string }> = {
  'digital-experiences': { accent: '#4b55d6', highlight: 'Digital' },
  'business-systems': { accent: '#1a7ab8', highlight: 'Systems' },
  'automation-ai': { accent: '#15803d', highlight: 'Automation' },
};

export default function ServicesPage() {
  const rows: ZigRow[] = categories.map((category) => {
    const group = GROUPS[category.slug]!;
    return {
      id: category.slug,
      name: category.name,
      highlight: group.highlight,
      text: groupIntros[category.slug]!,
      points: category.services.map((service) => ({
        name: service.name,
        line: service.summary,
        href: `/services/${service.anchor}`,
      })),
      cta: { label: `Ask about ${category.name}`, href: startFor(category.slug) },
      accent: group.accent,
      visual: (
        <GroupFan
          name={category.name}
          accent={group.accent}
          services={category.services.map((service) => ({
            slug: service.anchor,
            name: service.name,
            href: `/services/${service.anchor}`,
            accent: productFor(service.anchor)?.accent ?? group.accent,
          }))}
        />
      ),
    };
  });

  return (
    <>
      <WebPageStructuredData
        type="CollectionPage"
        name="Services"
        description={SERVICES_DESCRIPTION}
        path="/services"
        items={categories.flatMap((category) =>
          category.services.map((service) => ({
            name: service.name,
            path: `/services/${service.anchor}`,
            description: service.summary,
          })),
        )}
      />
      <PageIntro
        eyebrow="Services"
        trail={[{ name: 'Services', path: '/services' }]}
        title={'Fifteen services,\none connected system.'}
        intro="Three groups: what your customers use, what your team runs on, and the work that moves on its own. Each is priced upfront, and everything we build can be hosted and looked after on an Evolve care plan."
      >
        <Actions>
          <RollLink href={startFor('services')} size="lg">
            Get Started
          </RollLink>
          <RollLink href={whatsappAbout('your services')} variant="line" size="lg" external>
            Ask on WhatsApp
          </RollLink>
        </Actions>
      </PageIntro>

      <div className="alt-bands">
        <ZigZag id="groups" label="The three service groups" rows={rows} />

        <Closing
          interest="services"
          topic="your services"
          visual={<ConnectScene icon="layers" tint="sky" />}
        />
      </div>
    </>
  );
}
