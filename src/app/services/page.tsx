import type { Metadata } from 'next';

import { Closing } from '@/components/home/closing';
import { Actions, PageIntro } from '@/components/pages/page-intro';
import { type ZigRow, ZigZag } from '@/components/pages/zigzag';
import { RollLink } from '@/components/ui/roll-link';
import { ConnectScene } from '@/components/visuals/connect-scene';
import { categories, groupIntros, startFor, whatsappAbout } from '@/content/site';
import { productFor } from '@/content/products';

/**
 * `/services` — every service, by group: the page intro, then the three groups as alternating
 * rows (each with its five services as points and a crop of the product), then the closing.
 */
export const metadata: Metadata = {
  title: 'Services: Websites, Business Software & Automation',
  description:
    'Fifteen services in three groups: websites, stores, portals and apps; dashboards, CRM and custom software; WhatsApp, booking, integrations and AI. Looked after on Evolve.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services: Websites, Business Software & Automation',
    url: '/services',
  },
};

/** Each group's colour, its highlighted word, and the two products its picture borrows. */
const GROUPS: Record<string, { accent: string; highlight: string; back: string; front: string }> = {
  'digital-experiences': {
    accent: '#4b55d6',
    highlight: 'Digital',
    back: 'business-websites',
    front: 'e-commerce-stores',
  },
  'business-systems': {
    accent: '#1a7ab8',
    highlight: 'Systems',
    back: 'dashboards',
    front: 'crm-systems',
  },
  'automation-ai': {
    accent: '#15803d',
    highlight: 'Automation',
    back: 'whatsapp-automation',
    front: 'ai-assistants',
  },
};

export default function ServicesPage() {
  const rows: ZigRow[] = categories.map((category) => {
    const group = GROUPS[category.slug]!;
    const back = productFor(group.back)!;
    const front = productFor(group.front)!;
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
      cta: { label: `Explore ${category.name}`, href: `/services/${category.slug}` },
      accent: group.accent,
      visual: {
        back: back.stage?.back!,
        backAccent: back.accent,
        front: front.stage?.front?.[0],
        frontAccent: front.accent,
      },
    };
  });

  return (
    <>
      <PageIntro
        eyebrow="Services"
        title={'We build it, connect it,\nand keep it improving.'}
        intro="Fifteen services in three groups — what your customers use, what your team runs on, and the work that moves on its own — with Evolve to look after all of it."
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

      <ZigZag id="groups" label="The three service groups" rows={rows} />

      <Closing
        interest="services"
        topic="your services"
        visual={<ConnectScene icon="layers" tint="sky" />}
      />
    </>
  );
}
