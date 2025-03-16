import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ryan K Richards - Enterprise Sales Engineer",
  description: "Portfolio of Ryan J Richards, Enterprise Sales Engineer at Datadog based in the Greater Cleveland area, specializing in cloud observability and AI solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only include Datadog scripts if configuration is available
  const shouldInitializeDatadog = Boolean(
    process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN &&
    process.env.NEXT_PUBLIC_DD_APPLICATION_ID
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        {shouldInitializeDatadog && (
          <>
            <Script
              id="dd-rum-sync"
              src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
              type="text/javascript"
              strategy="beforeInteractive"
            />
            <Script id="datadog-rum" strategy="afterInteractive">
              {`
                try {
                  const datadogConfig = {
                    clientToken: '${process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN}',
                    applicationId: '${process.env.NEXT_PUBLIC_DD_APPLICATION_ID}',
                    site: '${process.env.NEXT_PUBLIC_DD_SITE || "datadoghq.com"}',
                    service: '${process.env.DD_SERVICE || "portfolio"}',
                    env: '${process.env.DD_ENV || process.env.NODE_ENV || "production"}',
                    version: '${process.env.DD_VERSION || "1.0.0"}',
                    trackUserInteractions: true,
                    trackResources: true,
                    trackLongTasks: true,
                    defaultPrivacyLevel: 'mask-user-input',
                    allowedTracingUrls: [
                      window.location.origin,
                      /https:\\/\\/api\\..*\\.richards-homelab\\.com/
                    ],
                    sessionSampleRate: 100,
                    sessionReplaySampleRate: 100
                  };

                  if (window.DD_RUM) {
                    window.DD_RUM.init(datadogConfig);
                    console.log('Datadog RUM initialized successfully');
                  }
                } catch (error) {
                  console.warn('Failed to initialize Datadog RUM:', error);
                }
              `}
            </Script>
          </>
        )}
        <Navigation />
        {children}
      </body>
    </html>
  );
} 