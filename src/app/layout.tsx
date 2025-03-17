import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ryan J Richards - Enterprise Sales Engineer",
  description: "Portfolio of Ryan J Richards, Enterprise Sales Engineer at Datadog based in the Greater Cleveland area, specializing in cloud observability and AI solutions.",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) 
{


  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}