// dev.machinist.co is a short address for hosted dev. Every path on it must
// redirect to dev.mechanicalvisioncorp.com before any rewrite runs, or the
// unscoped Production rewrites would serve Production under a dev address.
import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config.ts";

const HOSTED_DEV = "https://dev.mechanicalvisioncorp.com";

function hostValue(rule) {
  const host = (rule.has ?? []).find((condition) => condition.type === "host");
  return host ? host.value : null;
}

// Next.js anchors host values as a regular expression.
function matchesHost(rule, host) {
  const value = hostValue(rule);
  return value !== null && new RegExp(`^${value}$`).test(host);
}

const redirects = await nextConfig.redirects();
const devShortRules = redirects.filter((rule) => matchesHost(rule, "dev.machinist.co"));

test("dev.machinist.co rules come first, before every other redirect", () => {
  assert.equal(devShortRules.length, 4);
  devShortRules.forEach((rule, index) => assert.equal(redirects[index], rule));
});

test("/ and /app open the dev app, deeper /app paths keep their path", () => {
  const bySource = Object.fromEntries(devShortRules.map((rule) => [rule.source, rule]));
  assert.equal(bySource["/"].destination, `${HOSTED_DEV}/aerovision`);
  assert.equal(bySource["/app"].destination, `${HOSTED_DEV}/aerovision`);
  assert.equal(bySource["/app/:path*"].destination, `${HOSTED_DEV}/aerovision/:path*`);
});

test("a catch-all sends every other path to hosted dev, never Production", () => {
  const last = devShortRules.at(-1);
  assert.equal(last.source, "/:path*");
  assert.equal(last.destination, `${HOSTED_DEV}/:path*`);
  for (const rule of devShortRules) {
    assert.ok(rule.destination.startsWith(`${HOSTED_DEV}/`), rule.destination);
    assert.equal(rule.permanent, false);
  }
});

test("the host rule matches only dev.machinist.co", () => {
  const [rule] = devShortRules;
  assert.ok(matchesHost(rule, "dev.machinist.co"));
  assert.ok(!matchesHost(rule, "machinist.co"));
  assert.ok(!matchesHost(rule, "devXmachinist.co"));
  assert.ok(!matchesHost(rule, "dev.machinist.co.evil.com"));
});
