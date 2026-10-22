// POST /auth/google/callback
// Google posts the signed ID token here (response_mode=form_post). If it is
// valid and belongs to the Machinist Google Workspace, set the staff session
// cookie and send the person back to the page they asked for.
import { NextResponse, type NextRequest } from "next/server";
import { verifyGoogleIdToken } from "@/lib/google-id-token";
import {
  createStaffSessionToken,
  readSignedValue,
  safeReturnTo,
  STAFF_SESSION_COOKIE,
  STAFF_SESSION_TTL_SECONDS,
} from "@/lib/staff-session";
import {
  fetchGoogleSigningKeys,
  getStaffGoogleClientId,
  getStaffSessionSecret,
  type PendingSignIn,
  signInOriginFor,
  STAFF_DEFAULT_RETURN_TO,
  STAFF_GOOGLE_DOMAINS,
  STAFF_OAUTH_STATE_COOKIE,
  STAFF_SIGN_IN_ORIGIN,
  withPrivateHeaders,
} from "@/lib/staff-auth";

export const dynamic = "force-dynamic";

type Problem = "not-staff" | "expired" | "cancelled" | "failed" | "not-configured";

function redirectTo(url: URL): NextResponse {
  // 303 turns Google's POST into a normal page load.
  const response = NextResponse.redirect(url, 303);
  response.cookies.set(STAFF_OAUTH_STATE_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/auth/google",
    maxAge: 0,
  });
  return withPrivateHeaders(response);
}

function problem(origin: string, reason: Problem, returnTo?: string): NextResponse {
  const url = new URL("/auth/problem", origin);
  url.searchParams.set("reason", reason);
  if (returnTo) url.searchParams.set("returnTo", returnTo);
  return redirectTo(url);
}

function formString(form: FormData, name: string): string | null {
  const value = form.get(name);
  return typeof value === "string" ? value : null;
}

export async function POST(request: NextRequest) {
  const origin = signInOriginFor(request) ?? STAFF_SIGN_IN_ORIGIN;
  const clientId = getStaffGoogleClientId();
  const secret = getStaffSessionSecret();
  if (!clientId || !secret) return problem(origin, "not-configured");

  const pending = await readSignedValue<PendingSignIn>(
    "staff-oauth-state",
    request.cookies.get(STAFF_OAUTH_STATE_COOKIE)?.value,
    secret,
  );
  const returnTo = safeReturnTo(pending?.returnTo, STAFF_DEFAULT_RETURN_TO);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return problem(origin, "failed", returnTo);
  }

  const state = formString(form, "state");
  if (!pending || pending.exp < Date.now() || !state || state !== pending.state) {
    return problem(origin, "expired", returnTo);
  }
  if (formString(form, "error")) return problem(origin, "cancelled", returnTo);

  const idToken = formString(form, "id_token");
  if (!idToken) return problem(origin, "failed", returnTo);

  let result;
  try {
    result = await verifyGoogleIdToken(idToken, {
      clientId,
      nonce: pending.nonce,
      allowedDomains: STAFF_GOOGLE_DOMAINS,
      getKeys: fetchGoogleSigningKeys,
    });
  } catch {
    return problem(origin, "failed", returnTo);
  }
  if (!result.ok) {
    return problem(origin, result.reason === "not-staff" ? "not-staff" : "failed", returnTo);
  }

  const response = redirectTo(new URL(returnTo, origin));
  response.cookies.set(STAFF_SESSION_COOKIE, await createStaffSessionToken(result.email, secret), {
    httpOnly: true,
    secure: origin.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: STAFF_SESSION_TTL_SECONDS,
  });
  return response;
}

// Someone opening the callback address directly has nothing to finish.
export function GET(request: NextRequest) {
  return problem(signInOriginFor(request) ?? STAFF_SIGN_IN_ORIGIN, "expired");
}
