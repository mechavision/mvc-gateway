// Checks the Google ID-token verifier with a locally made RSA key, standing in
// for Google's published keys.
import assert from "node:assert/strict";
import test from "node:test";
import { verifyGoogleIdToken } from "../lib/google-id-token.ts";

const CLIENT_ID = "test-client.apps.googleusercontent.com";
const NONCE = "nonce-123";
const NOW = 1_800_000_000_000;
const DOMAINS = ["mechanicalvisioncorp.com"];

async function makeKey(kid) {
  const pair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  const jwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
  return { kid, privateKey: pair.privateKey, jwk: { kid, kty: jwk.kty, n: jwk.n, e: jwk.e } };
}

const b64 = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

async function sign(key, claims, header = { alg: "RS256", kid: key.kid, typ: "JWT" }) {
  const data = `${b64(header)}.${b64(claims)}`;
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key.privateKey,
    new TextEncoder().encode(data),
  );
  return `${data}.${Buffer.from(signature).toString("base64url")}`;
}

const goodClaims = {
  iss: "https://accounts.google.com",
  aud: CLIENT_ID,
  exp: NOW / 1000 + 3600,
  iat: NOW / 1000,
  nonce: NONCE,
  email: "Jake@mechanicalvisioncorp.com",
  email_verified: true,
  hd: "mechanicalvisioncorp.com",
};

const googleKey = await makeKey("google-key-1");
const strangerKey = await makeKey("google-key-1"); // same kid, different key

function check(token) {
  return verifyGoogleIdToken(token, {
    clientId: CLIENT_ID,
    nonce: NONCE,
    allowedDomains: DOMAINS,
    getKeys: async () => [googleKey.jwk],
    now: NOW,
  });
}

test("accepts a valid Machinist Workspace token", async () => {
  assert.deepEqual(await check(await sign(googleKey, goodClaims)), {
    ok: true,
    email: "jake@mechanicalvisioncorp.com",
  });
  const shortIssuer = { ...goodClaims, iss: "accounts.google.com" };
  assert.equal((await check(await sign(googleKey, shortIssuer))).ok, true);
});

test("rejects personal and other-company Google accounts", async () => {
  const gmail = { ...goodClaims, email: "someone@gmail.com", hd: undefined };
  assert.deepEqual(await check(await sign(googleKey, gmail)), { ok: false, reason: "not-staff" });
  const otherCompany = { ...goodClaims, email: "a@other.com", hd: "other.com" };
  assert.deepEqual(await check(await sign(googleKey, otherCompany)), {
    ok: false,
    reason: "not-staff",
  });
  // An email on our domain is not enough. The Workspace (hd) decides.
  const lookalike = { ...goodClaims, hd: undefined };
  assert.deepEqual(await check(await sign(googleKey, lookalike)), {
    ok: false,
    reason: "not-staff",
  });
});

test("rejects tokens with a bad signature, key, or algorithm", async () => {
  const invalid = { ok: false, reason: "invalid" };
  assert.deepEqual(await check(await sign(strangerKey, goodClaims)), invalid);
  const unknownKid = await sign(googleKey, goodClaims, { alg: "RS256", kid: "nope" });
  assert.deepEqual(await check(unknownKid), invalid);
  const unsigned = `${b64({ alg: "none", kid: googleKey.kid })}.${b64(goodClaims)}.`;
  assert.deepEqual(await check(unsigned), invalid);
  const hs256 = await sign(googleKey, goodClaims, { alg: "HS256", kid: googleKey.kid });
  assert.deepEqual(await check(hs256), invalid);
  assert.deepEqual(await check("not-a-token"), invalid);
  assert.deepEqual(await check("a.b.c"), invalid);
});

test("rejects wrong audience, issuer, nonce, expiry, or unverified email", async () => {
  const invalid = { ok: false, reason: "invalid" };
  for (const [label, claims] of [
    ["audience", { ...goodClaims, aud: "someone-else.apps.googleusercontent.com" }],
    ["audience list", { ...goodClaims, aud: [CLIENT_ID] }],
    ["issuer", { ...goodClaims, iss: "https://evil.example" }],
    ["nonce", { ...goodClaims, nonce: "replayed" }],
    ["expired", { ...goodClaims, exp: NOW / 1000 - 120 }],
    ["unverified", { ...goodClaims, email_verified: false }],
    ["no email", { ...goodClaims, email: undefined }],
  ]) {
    assert.deepEqual(await check(await sign(googleKey, claims)), invalid, label);
  }
});
