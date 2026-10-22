import { NextResponse, type NextRequest } from "next/server";
import { readStaffSession, STAFF_SESSION_COOKIE } from "@/lib/staff-session";
import {
  getStaffSessionSecret,
  signInOriginFor,
  STAFF_SIGN_IN_ORIGIN,
  withPrivateHeaders,
} from "@/lib/staff-auth";

// Staff-only pages need a Google sign-in with a Machinist Workspace account.
// Redirects in next.config.ts run before this, so /robots arrives here as
// /pitch/robots. The /pitch rewrite to the seed deck runs after this, so the
// deck is gated here and again by the deck app itself (its own vercel.app
// address is public).
export async function middleware(request: NextRequest) {
  // Local-dev only: `npm run dev:open` skips the gate. NODE_ENV is
  // "production" in every Vercel build, so this never opens a live site.
  if (process.env.NODE_ENV !== "production" && process.env.STAFF_GATE_DEV_OPEN === "1") {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  const origin = signInOriginFor(request);
  if (!origin) {
    return withPrivateHeaders(
      NextResponse.redirect(new URL(`${pathname}${search}`, STAFF_SIGN_IN_ORIGIN)),
    );
  }

  const session = await readStaffSession(
    request.cookies.get(STAFF_SESSION_COOKIE)?.value,
    getStaffSessionSecret(),
  );
  if (session) {
    // Deck build files keep their long cache headers so slides load fast. They
    // still needed the cookie to get here.
    const response = NextResponse.next();
    return pathname.includes("/_next/") ? response : withPrivateHeaders(response);
  }

  const signIn = new URL("/auth/google/start", origin);
  signIn.searchParams.set("returnTo", `${pathname}${search}`);
  return withPrivateHeaders(NextResponse.redirect(signIn));
}

export const config = {
  matcher: [
    "/control-room",
    "/control-room/:path*",
    "/control-room-architecture.html",
    "/pitch",
    "/pitch/:path*",
  ],
};
