import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedGrid from "@/components/animated-grid";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Field Notes | The Mechanical Vision Corporation",
  description:
    "Field Notes from The Mechanical Vision Corporation on aviation maintenance, MRO labor pressure, documentation, and work capture.",
};

const publishedNotes = [
  {
    title: "The Aircraft Is Not Ready Until the Record Is Clean",
    href: "/field-notes/the-aircraft-is-not-ready-until-the-record-is-clean",
    dek: "Why the MRO labor shortage is really a useful-hours problem.",
    meta: "Field Note 01",
  },
  {
    title: "The Juniority Effect in Aircraft Maintenance",
    href: "/field-notes/the-juniority-effect-in-aircraft-maintenance",
    dek: "Why headcount does not immediately replace experienced judgment.",
    meta: "Field Note 02",
  },
  {
    title: "The Work Is in One Place. The Record Is in Another.",
    href: "/field-notes/the-work-is-in-one-place-the-record-is-in-another",
    dek: "Why moving between the job and the record drains capacity.",
    meta: "Field Note 03",
  },
  {
    title: "When a Check Mark Is Not Enough",
    href: "/field-notes/when-a-check-mark-is-not-enough",
    dek: "Why completed steps do not always explain maintenance decisions.",
    meta: "Field Note 04",
  },
  {
    title: "The Record Has to Survive the Question",
    href: "/field-notes/the-record-has-to-survive-the-question",
    dek: "Why the record has to answer questions months later.",
    meta: "Field Note 05",
  },
  {
    title: "The Best Automation Knows Where to Stop",
    href: "/field-notes/the-best-automation-knows-where-to-stop",
    dek: "Technology should remove the burden around skilled work—not the skilled person at its center.",
    meta: "Field Note 06",
  },
];

export default function FieldNotesPage() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <Navbar />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-dark-950 to-dark-900 px-6 py-28">
        <div
          className="absolute inset-0 parallax-bg opacity-[0.12]"
          style={{ backgroundImage: "url('/hero-bg.webp')" }}
        />
        <AnimatedGrid />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
            Field Notes
          </h1>
          <div className="mt-10 grid w-full gap-4">
            {publishedNotes.map((note) => (
              <Link
                key={note.href}
                href={note.href}
                className="group rounded-sm border border-white/10 bg-white/[0.035] p-7 text-left transition-colors hover:border-white/20 md:p-9"
              >
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  {note.meta}
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                  {note.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/58">
                  {note.dek}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/75">
                  Read Field Note{" "}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
