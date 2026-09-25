import { contact, faqs, SITE_URL, socials } from '@/content/site';

/**
 * JSON-LD for the home page: the business and the website as one graph, and the FAQ — every
 * answer on every shelf, word for word, as the page's HTML carries them all.
 * Only facts the site already states go in — no street address until the office address is
 * confirmed, no legal name until the company is incorporated, and `sameAs` only for profiles that
 * exist.
 */
const business = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'Pixel Kinetix',
  description:
    'A digital systems company that designs and engineers websites, business software and automation as one connected system.',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.svg`,
  email: contact.email,
  telephone: contact.phoneHref.replace('tel:', ''),
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.area,
    addressLocality: contact.address.city,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  },
  areaServed: { '@type': 'Country', name: 'India' },
  founder: { '@type': 'Person', name: 'Anand M', jobTitle: 'Founder & Principal Engineer' },
  sameAs: socials.flatMap((social) => (social.href ? [social.href] : [])),
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Pixel Kinetix',
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#business` },
};

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

/** `<` is escaped so no answer's text can close the script element early. */
const json = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export function HomeStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: json({ '@context': 'https://schema.org', '@graph': [business, website, faqPage] }),
      }}
    />
  );
}
