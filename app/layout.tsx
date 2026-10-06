import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsHealthCheck } from "@/components/analytics-health-check";
import { CurtainTransitionProvider } from "@/components/curtain-transition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Display font for headlines — geometric, industrial, techy
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const isVercelProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://mechanicalvisioncorp.com"),
  title: {
    default: "The Mechanical Vision Corporation",
    template: "%s | The Mechanical Vision Corporation",
  },
  description:
    "The Mechanical Vision Corporation builds work-capture systems for aviation maintenance teams.",
  // Link-preview cards (Slack, iMessage, LinkedIn, X) — image comes from
  // app/opengraph-image.tsx, which Next picks up automatically.
  openGraph: {
    siteName: "The Mechanical Vision Corporation",
    type: "website",
    url: "https://mechanicalvisioncorp.com",
    title: "The Mechanical Vision Corporation",
    description:
      "The Mechanical Vision Corporation builds work-capture systems for aviation maintenance teams.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {/* Analytics load during browser idle time (lazyOnload) so they
            never compete with page content for bandwidth or main-thread
            time. Page views are still recorded — just a moment later. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ENBE6GFB86"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ENBE6GFB86');`}
        </Script>
        {isVercelProduction && (
          <Script
            id="vtag-ai-js"
            src="https://r2.leadsy.ai/tag.js"
            data-pid="1xbHYxWAwZlrdU6bj"
            data-version="062024"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <CurtainTransitionProvider>{children}</CurtainTransitionProvider>
        <Analytics />
        <AnalyticsHealthCheck />
      </body>
    </html>
  );
}
