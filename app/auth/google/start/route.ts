// GET /auth/google/start?returnTo=/pitch/robots
// Sends a staff member to Google to sign in. The one-time state and nonce ride
// along in a short-lived signed cookie that the callback checks.
import { NextResponse, type NextRequest } from "next/server";
import { safeReturnTo, signValue } from "@/lib/staff-session";
import {
  getStaffGoogleClientId,
  getStaffSessionSecret,
  type PendingSignIn,
  signInOriginFor,
  STAFF_DEFAULT_RETURN_TO,
  STAFF_OAUTH_STATE_COOKIE,
  STAFF_OAUTH_STATE_TTL_SECONDS,
  STAFF_SIGN_IN_ORIGIN,
  withPrivateHeaders,
} from "@/lib/staff-auth";

export const dynamic = "force-dynamic";

function randomToken(): string {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
}

export async function GET(request: NextRequest) {
  const origin = signInOriginFor(request);
  if (!origin) {
    const url = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, STAFF_SIGN_IN_ORIGIN);
    return withPrivateHeaders(NextResponse.redirect(url));
  }

  const returnTo = safeReturnTo(
    request.nextUrl.searchParams.get("returnTo"),
    STAFF_DEFAULT_RETURN_TO,
  );
  const clientId = getStaffGoogleClientId();
  const secret = getStaffSessionSecret();
  if (!clientId || !secret) {
    const problem = new URL("/auth/problem", origin);
    problem.searchParams.set("reason", "not-configured");
    return withPrivateHeaders(NextResponse.redirect(problem));
  }

  const pending: PendingSignIn = {
    state: randomToken(),
    nonce: randomToken(),
    returnTo,
    exp: Date.now() + STAFF_OAUTH_STATE_TTL_SECONDS * 1000,
  };

  const google = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  google.searchParams.set("client_id", clientId);
  google.searchParams.set("redirect_uri", `${origin}/auth/google/callback`);
  google.searchParams.set("response_type", "id_token");
  google.searchParams.set("response_mode", "form_post");
  google.searchParams.set("scope", "openid email");
  google.searchParams.set("state", pending.state);
  google.searchParams.set("nonce", pending.nonce);
  // No `hd` hint: it would hide accounts if the Workspace's primary domain
  // differs. The callback checks the Workspace instead.
  google.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(google);
  // Google posts the result back from accounts.google.com, which is a
  // cross-site request, so this cookie needs SameSite=None (and so Secure).
  response.cookies.set(
    STAFF_OAUTH_STATE_COOKIE,
    await signValue("staff-oauth-state", pending, secret),
    {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/auth/google",
      maxAge: STAFF_OAUTH_STATE_TTL_SECONDS,
    },
  );
  return withPrivateHeaders(response);
}
