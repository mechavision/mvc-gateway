// Staff sign-in session shared by the gateway (machinist.co) and the seed deck.
//
// The gateway signs this cookie after a Google sign-in with a Machinist Google
// Workspace account. The seed deck checks the same cookie on every request it
// gets through the machinist.co/pitch rewrite, using the same
// STAFF_SESSION_SECRET.
//
// Keep this file identical in mvc-gateway and aerovision-seed-deck. Both repos
// run the same fixed test vector (tests/staff-session.test.mjs), so a change
// made in one repo only fails there.
//
// Pure Web Crypto with no local imports, so it runs in middleware, route
// handlers, and plain `node --test`.

export const STAFF_SESSION_COOKIE = "mvc-staff-session";
export const STAFF_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface StaffSession {
  email: string;
  exp: number; // milliseconds since epoch
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return diff === 0;
}

// The purpose is part of the signed bytes, so a value signed for one job
// (say, the short-lived sign-in state) can never pass as a session.
async function hmac(purpose: string, payloadBase64: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(`${purpose}.${payloadBase64}`),
  );
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function signValue(purpose: string, payload: object, secret: string): Promise<string> {
  const payloadBase64 = bytesToBase64Url(textEncoder.encode(JSON.stringify(payload)));
  return `${payloadBase64}.${await hmac(purpose, payloadBase64, secret)}`;
}

export async function readSignedValue<T>(
  purpose: string,
  token: string | undefined,
  secret: string | null,
): Promise<T | null> {
  if (!token || !secret) return null;

  const dotIndex = token.indexOf(".");
  if (dotIndex <= 0) return null;
  const payloadBase64 = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);
  if (!signature) return null;

  if (!constantTimeEqual(signature, await hmac(purpose, payloadBase64, secret))) return null;

  try {
    return JSON.parse(textDecoder.decode(base64UrlToBytes(payloadBase64))) as T;
  } catch {
    return null;
  }
}

export async function createStaffSessionToken(
  email: string,
  secret: string,
  now: number = Date.now(),
): Promise<string> {
  const session: StaffSession = { email, exp: now + STAFF_SESSION_TTL_SECONDS * 1000 };
  return signValue("staff-session", session, secret);
}

export async function readStaffSession(
  token: string | undefined,
  secret: string | null,
  now: number = Date.now(),
): Promise<StaffSession | null> {
  const session = await readSignedValue<StaffSession>("staff-session", token, secret);
  if (!session || typeof session.email !== "string" || typeof session.exp !== "number") {
    return null;
  }
  return session.exp > now ? session : null;
}

// Where to send someone after sign-in. Only same-site paths are allowed, so a
// crafted link cannot bounce a signed-in person to another website.
export function safeReturnTo(value: string | null | undefined, fallback: string): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }
  try {
    const base = "https://return.invalid";
    const url = new URL(value, base);
    if (url.origin !== base) return fallback;
    if (url.pathname === "/auth" || url.pathname.startsWith("/auth/")) return fallback;
    // Dot segments can collapse into a leading "//" after parsing
    // ("/.//evil.example" becomes "//evil.example"), which a browser reads as
    // another website. Check the parsed result, not just the input.
    const result = `${url.pathname}${url.search}`;
    return result.startsWith("//") ? fallback : result;
  } catch {
    return fallback;
  }
}
