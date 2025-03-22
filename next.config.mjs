/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

// Load environment variables based on the phase
const phase = process.env.NODE_ENV === 'development' ? PHASE_DEVELOPMENT_SERVER : 'production';
const envFile = phase === PHASE_DEVELOPMENT_SERVER ? '.env.development' : '.env.production';
dotenv.config({ path: envFile });

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
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

export default nextConfig;