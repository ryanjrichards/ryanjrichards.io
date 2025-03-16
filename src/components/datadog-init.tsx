// Necessary for App Router to ensure this file runs on the client
"use client";

import { datadogRum } from "@datadog/browser-rum";

// Only initialize if it hasn't been initialized before
if (!datadogRum.getInternalContext()) {
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DD_APPLICATION_ID as string,
    clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN as string,
    site: (process.env.NEXT_PUBLIC_DD_SITE || 'datadoghq.com') as 'datadoghq.com' | 'datadoghq.eu' | 'us3.datadoghq.com' | 'us5.datadoghq.com' | 'ap1.datadoghq.com' | 'ddog-gov.com',
    service: process.env.NEXT_PUBLIC_DD_SERVICE || 'portfolio',
    env: process.env.NODE_ENV,
    version: process.env.NEXT_PUBLIC_DD_VERSION || '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
    // Add tracing configuration
    allowedTracingUrls: [
      window.location.origin, // Allow tracing for same-origin requests
      /https:\/\/api\..*\.richards-homelab\.com/ // Example for your API domain
    ],
    traceSampleRate: 100 // Sample 100% of traces initially, adjust based on volume
  });
}

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
} 