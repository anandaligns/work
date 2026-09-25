import type { Faq } from '@/content/pages';
import { SITE_URL } from '@/content/site';

/**
 * JSON-LD for a service, group or solution page: the Service it sells (with the lowest price the
 * page states, where it states one), the page's place in the site, and its questions — every
 * answer word for word as the page shows it.
 */
const json = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export function PageStructuredData({
  name,
  description,
  path,
  crumbs,
  faqs,
  from,
  monthly,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  /** Between Home and this page, each with its path. */
  crumbs: { name: string; path: string }[];
  faqs: Faq[];
  from?: number;
  monthly?: boolean;
  serviceType?: string;
}) {
  const url = `${SITE_URL}${path}`;
  const service = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: 'Pixel Kinetix',
      url: SITE_URL,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    ...(from
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: from,
            ...(monthly
              ? {
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: from,
                    priceCurrency: 'INR',
                    unitCode: 'MON',
                    referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
                  },
                }
              : {
                  priceSpecification: {
                    '@type': 'PriceSpecification',
                    minPrice: from,
                    priceCurrency: 'INR',
                  },
                }),
          },
        }
      : {}),
  };
  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs, { name, path }].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: json({
          '@context': 'https://schema.org',
          '@graph': [service, breadcrumbs, faqPage],
        }),
      }}
    />
  );
}
