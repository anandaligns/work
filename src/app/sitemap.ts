import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/content/site';

/**
 * The pages with real content. Coming-soon pages (`/services/*`, `/solutions/*`) stay out until
 * their own content replaces them — add each one here the day it does, and drop its `noindex`.
 */
const LIVE = ['', '/about', '/contact', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  return LIVE.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.6,
  }));
}
