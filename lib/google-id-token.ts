// Checks the ID token Google posts back after staff sign-in.
//
// Sign-in uses Google's ID-token flow (response_type=id_token,
// response_mode=form_post), so there is no client secret. Trust comes from
// Google's RSA signature, checked here against Google's published keys, plus
// the audience, issuer, expiry, and the one-time nonce we sent.
//
// Pure Web Crypto with no local imports, so `node --test` can run it with a
// test key set.

export interface GoogleSigningKey {
  kid: string;
  kty: string;
  n: string;
  e: string;
}

export type IdTokenResult =
  | { ok: true; email: string }
  | { ok: false; reason: "invalid" | "not-staff" };

interface IdTokenClaims {
  iss?: unknown;
  aud?: unknown;
  exp?: unknown;
  nonce?: unknown;
  email?: unknown;
  email_verified?: unknown;
  hd?: unknown;
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

const GOOGLE_ISSUERS = new Set(["https://accounts.google.com", "accounts.google.com"]);
const CLOCK_SKEW_SECONDS = 60;

function decodeJson(part: string): Record<string, unknown> | null {
  try {
    const value = JSON.parse(new TextDecoder().decode(base64UrlToBytes(part)));
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}

export async function verifyGoogleIdToken(
  idToken: string,
  options: {
    clientId: string;
    nonce: string;
    allowedDomains: readonly string[];
    getKeys: () => Promise<GoogleSigningKey[]>;
    now?: number;
  },
): Promise<IdTokenResult> {
  const invalid: IdTokenResult = { ok: false, reason: "invalid" };

  const parts = idToken.split(".");
  if (parts.length !== 3) return invalid;
  const [headerPart, payloadPart, signaturePart] = parts;

  const header = decodeJson(headerPart);
  const claims = decodeJson(payloadPart) as IdTokenClaims | null;
  if (!header || !claims || header.alg !== "RS256" || typeof header.kid !== "string") {
    return invalid;
  }

  const jwk = (await options.getKeys()).find((key) => key.kid === header.kid);
  if (!jwk) return invalid;

  let signatureOk = false;
  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      { kty: jwk.kty, n: jwk.n, e: jwk.e },
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    signatureOk = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      base64UrlToBytes(signaturePart),
      new TextEncoder().encode(`${headerPart}.${payloadPart}`),
    );
  } catch {
    return invalid;
  }
  if (!signatureOk) return invalid;

  const nowSeconds = Math.floor((options.now ?? Date.now()) / 1000);
  if (typeof claims.iss !== "string" || !GOOGLE_ISSUERS.has(claims.iss)) return invalid;
  if (claims.aud !== options.clientId) return invalid;
  if (typeof claims.exp !== "number" || claims.exp + CLOCK_SKEW_SECONDS < nowSeconds) {
    return invalid;
  }
  if (claims.nonce !== options.nonce) return invalid;
  if (typeof claims.email !== "string" || claims.email_verified !== true) return invalid;

  // `hd` is set only for Google Workspace accounts and names the Workspace's
  // primary domain. A personal Gmail account has no `hd` at all.
  if (typeof claims.hd !== "string" || !options.allowedDomains.includes(claims.hd)) {
    return { ok: false, reason: "not-staff" };
  }

  return { ok: true, email: claims.email.toLowerCase() };
}
