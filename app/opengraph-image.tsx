import { ImageResponse } from "next/og";

// Default link-preview card for mechanicalvisioncorp.com.
// Rendered statically at build time with system fonts only — no remote
// fetches, so it stays edge-safe and reliable.
export const alt = "The Mechanical Vision Corporation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: "#0C0C0C",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Eyebrow — brand name, letterspaced uppercase */}
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A87C",
          }}
        >
          The Mechanical Vision Corporation
        </div>

        {/* Dominant headline */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#E6E3E0",
          }}
        >
          Free the Hands That Build.
        </div>

        {/* Domain — small, muted */}
        <div style={{ fontSize: 28, color: "#8A8A8A" }}>
          mechanicalvisioncorp.com
        </div>
      </div>
    ),
    { ...size },
  );
}
