import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev server is reached through Docker's port map; this lets the browser pane and a
  // container on the host network load dev resources without a cross-origin refusal.
  allowedDevOrigins: ['host.docker.internal', '127.0.0.1'],
};

export default nextConfig;
