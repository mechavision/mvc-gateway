import type { Metadata } from "next";
import { safeReturnTo } from "@/lib/staff-session";
import { STAFF_DEFAULT_RETURN_TO } from "@/lib/staff-auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

const MESSAGES: Record<string, string> = {
  "not-staff":
    "That Google account is not a Machinist account. Sign in with your @mechanicalvisioncorp.com Google account.",
  expired: "The sign-in took too long or was started in another tab. Please try again.",
  cancelled: "Sign-in was cancelled.",
  failed: "Google sign-in did not go through. Please try again.",
  "not-configured": "Staff sign-in is not set up on this site yet. Tell Jake.",
};

type ProblemPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Shown when staff sign-in fails. Plain on purpose, like the control room.
export default async function SignInProblemPage({ searchParams }: ProblemPageProps) {
  const { reason, returnTo } = await searchParams;
  const message =
    typeof reason === "string" && Object.hasOwn(MESSAGES, reason)
      ? MESSAGES[reason]
      : MESSAGES.failed;
  const retry = `/auth/google/start?returnTo=${encodeURIComponent(
    safeReturnTo(typeof returnTo === "string" ? returnTo : null, STAFF_DEFAULT_RETURN_TO),
  )}`;

  return (
    <main className="min-h-screen bg-white px-6 py-10 font-serif text-[17px] leading-[1.55] text-black">
      <div className="mx-auto max-w-[680px]">
        <h1 className="text-[28px] font-normal leading-tight">Machinist staff sign-in</h1>
        <p className="mt-4">{message}</p>
        <p className="mt-4">
          <a href={retry} className="text-[#0645ad] underline underline-offset-2">
            Sign in with Google
          </a>
        </p>
      </div>
    </main>
  );
}
