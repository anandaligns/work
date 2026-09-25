import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/content/site';

/** Everything may be crawled except the scene lab, a design tool rather than a page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/lab' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
