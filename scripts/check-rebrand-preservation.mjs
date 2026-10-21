import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const nextConfig = readFileSync("next.config.ts", "utf8");

const requiredSnippets = [
  '"name": "mvc-gateway"',
  'source: "/aerovision"',
  'source: "/aerovision/:path*"',
  'https://aerovision-mvp.vercel.app/aerovision',
  'https://aerovision-mvp.vercel.app/aerovision/:path*',
  'href: "/brief/aerovision"',
];

const forbiddenSnippets = [
  'source: "/mechavision"',
  'source: "/mechavision/:path*"',
  'https://aerovision-mvp.vercel.app/mechavision',
  'href="/mechavision/dashboard"',
  'href: "/brief/mechavision"',
];

const fileText = [
  JSON.stringify(packageJson, null, 2),
  nextConfig,
  readFileSync("app/page.tsx", "utf8"),
  readFileSync("app/control-room/page.tsx", "utf8"),
].join("\n");

const missing = requiredSnippets.filter((snippet) => !fileText.includes(snippet));
const forbidden = forbiddenSnippets.filter((snippet) => fileText.includes(snippet));

if (missing.length > 0 || forbidden.length > 0) {
  console.error("Rebrand preservation guard failed.");
  if (missing.length > 0) {
    console.error("Missing preserved technical values:");
    for (const snippet of missing) console.error(`- ${snippet}`);
  }
  if (forbidden.length > 0) {
    console.error("Found forbidden technical migrations:");
    for (const snippet of forbidden) console.error(`- ${snippet}`);
  }
  process.exit(1);
}

console.log("Rebrand preservation guard passed.");
