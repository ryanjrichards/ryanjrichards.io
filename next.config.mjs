/** @type {import('next').NextConfig} */
// Optional: Import the Datadog tracer to ensure it's loaded
import './datadog.js';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.www.nfl.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.espncdn.com',
      }
    ],
  },
};

export default nextConfig;