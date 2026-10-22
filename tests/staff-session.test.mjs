// Keep this file identical in mvc-gateway and aerovision-seed-deck. The fixed
// token below proves both apps sign and read the staff cookie the same way.
import assert from "node:assert/strict";
import test from "node:test";
import {
  createStaffSessionToken,
  readStaffSession,
  safeReturnTo,
  signValue,
} from "../lib/staff-session.ts";

const SECRET = "test-secret-for-the-shared-vector";
const NOW = 1_800_000_000_000;
const EMAIL = "jake@mechanicalvisioncorp.com";
const FIXED_TOKEN =
  "eyJlbWFpbCI6Impha2VAbWVjaGFuaWNhbHZpc2lvbmNvcnAuY29tIiwiZXhwIjoxODAwNjA0ODAwMDAwfQ.O8UUa2aDxOlJE9DIfsZ2vT1BqCgCVdsP3wHhilble4M";

test("signs the fixed vector exactly", async () => {
  assert.equal(await createStaffSessionToken(EMAIL, SECRET, NOW), FIXED_TOKEN);
});

test("reads a valid session", async () => {
  const session = await readStaffSession(FIXED_TOKEN, SECRET, NOW + 1000);
  assert.equal(session?.email, EMAIL);
});

test("rejects a missing secret, wrong secret, or expired session", async () => {
  assert.equal(await readStaffSession(FIXED_TOKEN, null, NOW), null);
  assert.equal(await readStaffSession(FIXED_TOKEN, "another-secret", NOW), null);
  const eightDays = 8 * 24 * 60 * 60 * 1000;
  assert.equal(await readStaffSession(FIXED_TOKEN, SECRET, NOW + eightDays), null);
});

test("rejects tampered or malformed tokens", async () => {
  const [payload, signature] = FIXED_TOKEN.split(".");
  const forged = Buffer.from(
    JSON.stringify({ email: "someone@gmail.com", exp: NOW + 10_000 }),
  ).toString("base64url");
  assert.equal(await readStaffSession(`${forged}.${signature}`, SECRET, NOW), null);
  assert.equal(await readStaffSession(`${payload}.`, SECRET, NOW), null);
  assert.equal(await readStaffSession(payload, SECRET, NOW), null);
  assert.equal(await readStaffSession("", SECRET, NOW), null);
  assert.equal(await readStaffSession(undefined, SECRET, NOW), null);
});

test("a value signed for another purpose is not a session", async () => {
  const other = await signValue("staff-oauth-state", { email: EMAIL, exp: NOW + 10_000 }, SECRET);
  assert.equal(await readStaffSession(other, SECRET, NOW), null);
});

test("safeReturnTo keeps same-site paths only", () => {
  const fallback = "/control-room";
  assert.equal(safeReturnTo("/pitch/robots?team=x", fallback), "/pitch/robots?team=x");
  assert.equal(safeReturnTo("/control-room", fallback), "/control-room");
  for (const bad of [
    null,
    undefined,
    "",
    "pitch",
    "https://evil.example/pitch",
    "//evil.example/pitch",
    "/\\evil.example",
    "/auth/google/start",
    "/auth",
    "/.//evil.example/pitch",
    "/..//evil.example",
    "/a/..//evil.example",
    "/%2e//evil.example",
  ]) {
    assert.equal(safeReturnTo(bad, fallback), fallback, String(bad));
  }
});
