// Initialize datadog before importing next
require('dd-trace').init({
  service: 'portfolio',
  version: '1.0.0',
  // Add other Datadog configuration options here
});

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Your other Next.js config
};

export default nextConfig;
