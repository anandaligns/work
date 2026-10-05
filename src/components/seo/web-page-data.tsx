import { SITE_URL } from '@/content/site';

/**
 * JSON-LD for a page that sells nothing itself — the Services and Solutions indexes, About,
 * Contact and the legal pages: the page as what it is (a collection, the about page, the contact
 * page), its place in the site, and — for an index — the pages it lists, in order.
 */
const json = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export function WebPageStructuredData({
  type = 'WebPage',
  name,
  description,
  path,
  crumbs = [],
  items,
}: {
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  name: string;
  description: string;
  path: string;
  /** Between Home and this page, each with its path. */
  crumbs?: { name: string; path: string }[];
  /** For an index: the pages it lists. */
  items?: { name: string; path: string; description?: string }[];
}) {
  const url = `${SITE_URL}${path}`;
  const page = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    ...(items ? { mainEntity: { '@id': `${url}#list` } } : {}),
  };
  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs, { name, path }].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
  const list = items
    ? {
        '@type': 'ItemList',
        '@id': `${url}#list`,
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          url: `${SITE_URL}${item.path}`,
          ...(item.description ? { description: item.description } : {}),
        })),
      }
    : null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: json({
          '@context': 'https://schema.org',
          '@graph': [page, breadcrumbs, ...(list ? [list] : [])],
        }),
      }}
    />
  );
}
