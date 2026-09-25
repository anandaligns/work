import type { MetadataRoute } from 'next';

import { groupPages, isLive, servicePages, solutionPages } from '@/content/pages';
import { evolve, SITE_URL } from '@/content/site';

/**
 * Every page that is live: home, the service groups, services, Evolve and solutions, About,
 * Contact and the legal pages. A paused page (`paused` in `content/pages.ts`) stays out; the
 * thanks page, which only makes sense after the form, is never in.
 */
const PAGES = [
  '',
  ...groupPages.filter((page) => isLive(page.slug)).map((page) => `/services/${page.slug}`),
  ...servicePages.filter((page) => isLive(page.slug)).map((page) => `/services/${page.slug}`),
  `/services/${evolve.slug}`,
  ...solutionPages.filter((page) => isLive(page.slug)).map((page) => `/solutions/${page.slug}`),
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/grievance',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority:
      path === '' ? 1 : path.startsWith('/services') || path.startsWith('/solutions') ? 0.8 : 0.5,
  }));
}
