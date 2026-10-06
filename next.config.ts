import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The production image runs Next's standalone server (see Dockerfile); the dev server ignores it.
  output: 'standalone',
  // The dev server is reached through Docker's port map; this lets the browser pane and a
  // container on the host network load dev resources without a cross-origin refusal.
  allowedDevOrigins: ['host.docker.internal', '127.0.0.1'],
  // The three service-group pages are gone; their addresses lead to their group on /services.
  async redirects() {
    return ['digital-experiences', 'business-systems', 'automation-ai'].map((group) => ({
      source: `/services/${group}`,
      destination: `/services#${group}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
