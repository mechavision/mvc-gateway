import type { Metadata } from "next";
import "./print.css";

export const metadata: Metadata = {
  title: "Machinist · Design partner brief",
  description:
    "Machinist in one page. Aerospace maintenance, captured as it happens.",
  robots: { index: false, follow: false },
};

export default function BriefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="brief-shell">{children}</div>;
}
