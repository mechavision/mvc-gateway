import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN ?? "",
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // Keep the standalone control-room deployment focused on the internal page
      // without changing the public MVC homepage on mechanicalvisioncorp.com.
      {
        source: "/",
        has: [{ type: "host", value: "jake-control-room.vercel.app" }],
        destination: "/control-room",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "host", value: "control.jakesalomon.net" }],
        destination: "/control-room",
        permanent: false,
      },
      // MVC vanity path for the no-logos investor deck variant.
      // This redirects instead of rewrites because that deck is built with /pitch as its basePath.
      {
        source: "/pitch-no-logos",
        destination: "https://aerovision-seed-deck-no-logos.vercel.app/pitch",
        permanent: false,
      },
      {
        source: "/pitch-no-logos/:path*",
        destination: "https://aerovision-seed-deck-no-logos.vercel.app/pitch/:path*",
        permanent: false,
      },
      // Redirect mechavisioncorp.com → mechanicalvisioncorp.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "mechavisioncorp.com" }],
        destination: "https://mechanicalvisioncorp.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mechavisioncorp.com" }],
        destination: "https://mechanicalvisioncorp.com/:path*",
        permanent: true,
      },
      // Redirect mechanicalvision.ai → mechanicalvisioncorp.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "mechanicalvision.ai" }],
        destination: "https://mechanicalvisioncorp.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mechanicalvision.ai" }],
        destination: "https://mechanicalvisioncorp.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles rewrites run before Next.js checks its own routes,
      // ensuring /aerovision/* and /pitch/* are proxied to the sub-apps
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "console.mechanicalvisioncorp.com" }],
          destination:
            "https://aerovision-mvp.vercel.app/aerovision/console",
        },
        {
          source: "/aerovision/:path*",
          has: [{ type: "host", value: "console.mechanicalvisioncorp.com" }],
          destination:
            "https://aerovision-mvp.vercel.app/aerovision/:path*",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "console.mechanicalvisioncorp.com" }],
          destination:
            "https://aerovision-mvp.vercel.app/aerovision/:path*",
        },
        // Hosted dev must never proxy to Production. These rules intentionally
        // precede the unscoped Production rewrites below.
        {
          source: "/aerovision",
          has: [{ type: "host", value: "dev.mechanicalvisioncorp.com" }],
          destination:
            "https://aerovision-mvp-env-dev-mechavision.vercel.app/aerovision",
        },
        {
          source: "/aerovision/:path*",
          has: [{ type: "host", value: "dev.mechanicalvisioncorp.com" }],
          destination:
            "https://aerovision-mvp-env-dev-mechavision.vercel.app/aerovision/:path*",
        },
        {
          source: "/pitch",
          has: [{ type: "host", value: "dev.mechanicalvisioncorp.com" }],
          destination:
            "https://aerovision-seed-deck-env-dev-mechavision.vercel.app/pitch",
        },
        {
          source: "/pitch/:path*",
          has: [{ type: "host", value: "dev.mechanicalvisioncorp.com" }],
          destination:
            "https://aerovision-seed-deck-env-dev-mechavision.vercel.app/pitch/:path*",
        },
        {
          source: "/aerovision",
          destination:
            "https://aerovision-mvp.vercel.app/aerovision",
        },
        {
          source: "/aerovision/:path*",
          destination:
            "https://aerovision-mvp.vercel.app/aerovision/:path*",
        },
        {
          source: "/pitch",
          destination:
            "https://aerovision-seed-deck.vercel.app/pitch",
        },
        {
          source: "/pitch/:path*",
          destination:
            "https://aerovision-seed-deck.vercel.app/pitch/:path*",
        },
        // Backward-compatible media paths for an earlier /specs page version
        // whose video and poster URLs resolved relative to the root domain.
        {
          source: "/demo-v2.mp4",
          destination:
            "https://aerovision-specs-site.vercel.app/demo-v2.mp4",
        },
        {
          source: "/demo-v3.mp4",
          destination:
            "https://aerovision-specs-site.vercel.app/demo-v3.mp4",
        },
        {
          source: "/poster-v2.jpg",
          destination:
            "https://aerovision-specs-site.vercel.app/poster-v2.jpg",
        },
        {
          source: "/poster-v3.jpg",
          destination:
            "https://aerovision-specs-site.vercel.app/specs/poster-v3.jpg",
        },
        {
          source: "/specs",
          destination:
            "https://aerovision-specs-site.vercel.app/specs",
        },
        {
          source: "/specs/:path*",
          destination:
            "https://aerovision-specs-site.vercel.app/specs/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  widenClientFileUpload: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});
