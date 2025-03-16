/** @type {import('next').NextConfig} */
// Optional: Import the Datadog tracer to ensure it's loaded
import './datadog.js';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.espncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      }
    ],
  },
};

export default nextConfig;