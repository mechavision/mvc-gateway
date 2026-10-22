// Settings for staff-only pages: the control room, its architecture page, and
// every deck under /pitch. Staff sign in with their Machinist Google Workspace
// account. See middleware.ts for which paths are gated.
import type { NextRequest } from "next/server";
import type { GoogleSigningKey } from "@/lib/google-id-token";

// Sign-in only happens on machinist.co, because the session cookie belongs to
// one host and Google only returns people to registered addresses.
export const STAFF_SIGN_IN_ORIGIN = "https://machinist.co";

// Google Workspaces that count as "staff". Google reports the Workspace's
// primary domain as the `hd` claim. All three domains belong to the company,
// and listing each means sign-in keeps working whichever one is primary.
export const STAFF_GOOGLE_DOMAINS = [
  "mechanicalvisioncorp.com",
  "mechavisioncorp.com",
  "machinist.co",
] as const;

export const STAFF_DEFAULT_RETURN_TO = "/control-room";
export const STAFF_OAUTH_STATE_COOKIE = "mvc-staff-oauth";
export const STAFF_OAUTH_STATE_TTL_SECONDS = 10 * 60;

// What the start route remembers (in a signed cookie) until Google answers.
export interface PendingSignIn {
  state: string;
  nonce: string;
  returnTo: string;
  exp: number;
}

const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";

export function getStaffSessionSecret(): string | null {
  const configured = process.env.STAFF_SESSION_SECRET?.trim();
  if (configured) return configured;
  // Same fallback as the seed deck, so local dev works across both apps.
  if (process.env.NODE_ENV !== "production") return "development-staff-session-secret";
  return null;
}

export function getStaffGoogleClientId(): string | null {
  return process.env.STAFF_GOOGLE_CLIENT_ID?.trim() || null;
}

function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

// The origin this request should sign in on, or null when the request must
// first move to machinist.co. Localhost is allowed for local testing. It
// grants nothing by itself: Google only returns people to registered addresses.
export function signInOriginFor(request: NextRequest): string | null {
  // The Host header is what Vercel routes on, so it names the site the person
  // actually typed.
  const host = request.headers.get("host") ?? request.nextUrl.host;
  const hostname = host.replace(/:\d+$/, "").toLowerCase();
  if (isLocalHost(hostname)) return request.nextUrl.origin;
  if (`https://${hostname}` === STAFF_SIGN_IN_ORIGIN) return STAFF_SIGN_IN_ORIGIN;
  return null;
}

// Sign-ins are rare (one per person per week), so always read Google's current
// keys rather than caching them and missing a key rotation.
export async function fetchGoogleSigningKeys(): Promise<GoogleSigningKey[]> {
  const response = await fetch(GOOGLE_JWKS_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Google keys request failed: ${response.status}`);
  const body = (await response.json()) as { keys?: GoogleSigningKey[] };
  return Array.isArray(body.keys) ? body.keys : [];
}

export function withPrivateHeaders<T extends Response>(response: T): T {
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  return response;
}
