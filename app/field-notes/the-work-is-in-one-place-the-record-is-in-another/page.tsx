import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedGrid from "@/components/animated-grid";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "The Work Is in One Place. The Record Is in Another. | Field Notes",
  description:
    "A founder-led Field Note from MVC on why context switching between physical maintenance work and digital records drains MRO capacity.",
  openGraph: {
    title: "The Work Is in One Place. The Record Is in Another. | Field Notes",
    description:
      "A founder-led Field Note from MVC on why context switching between physical maintenance work and digital records drains MRO capacity.",
  },
};

export default function WorkAndRecordFieldNotePage() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <Navbar />

      <article>
        <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-dark-950 to-dark-900 px-6 pt-30 pb-16 md:pt-36 md:pb-24">
          <div
            className="absolute inset-0 parallax-bg opacity-[0.08]"
            style={{ backgroundImage: "url('/hero-bg.webp')" }}
          />
          <AnimatedGrid />

          <div className="relative z-10 mx-auto max-w-4xl">
            <Link
              href="/field-notes"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              Field Notes
            </Link>

            <div className="text-sm font-medium uppercase tracking-[0.18em] text-white/42">
              Field Note 03 / MRO labor bottleneck
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-tight text-white md:text-7xl">
              The Work Is in One Place. The Record Is in Another.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-white/68 md:text-2xl">
              MROs lose useful technician time in the gap between benches,
              aircraft, manuals, work orders, and quality signoffs.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/45">
              <span>The Mechanical Vision Corporation</span>
              <span aria-hidden="true">/</span>
              <span>June 2026</span>
            </div>
          </div>
        </header>

        <div className="px-6 py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <div className="space-y-7 text-[18px] leading-8 text-white/72">
                <p className="text-2xl leading-9 text-white/84">
                  In aircraft maintenance, the work and the record often live in
                  different places.
                </p>

                <p>
                  The work is at the aircraft, on the bench, inside the component,
                  under the light, with a calibrated tool in hand. The record is
                  somewhere else: a laptop, a terminal, a traveler, a work order
                  system, a manual, a quality queue.
                </p>

                <p>That separation feels normal. It is not free.</p>

                <p>
                  Every trip from the job to the record costs attention. Put the
                  tool down. Find the right line. Enter a value. Check a manual.
                  Take a photo. Label it. Attach it. Explain what it shows. Wait
                  for review.
                </p>

                <p>
                  No one step is wasteful. Together they drain capacity.
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  The quiet tax inside MRO work
                </h2>

                <p>
                  A technician is not only doing maintenance. They are also
                  shepherding the record of maintenance. Aircraft. Bench. Manual.
                  Work order. Tool crib. Camera. Notes. Signoff. Quality. Back to
                  the aircraft. Back to the bench.
                </p>

                <p>
                  For an MRO, the bottleneck is not just headcount. It is useful
                  technician attention. A shop can have people on the floor and
                  still lose throughput if too much of the day is spent helping the
                  record catch up to the work.
                </p>

                <p>
                  Digital tools do not automatically fix this. Often they just
                  move the record from paper to a screen. The interruption remains
                  if the mechanic still has to stop the physical job to feed the
                  system.
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  Digital is not the same as uninterrupted
                </h2>

                <p>
                  The question is not whether the workflow is digital. It is
                  whether the record forms while the work happens, or the
                  technician has to leave the work to create it.
                </p>

                <p>
                  In the first case, the record is a byproduct of the work. In the
                  second, it is a second job layered on top of the work.
                </p>

                <p>
                  Documentation is necessary. Regulators, customers, quality
                  teams, and the next shift all depend on the record.
                </p>

                <p>
                  The issue is where the burden lands. Too often, it lands on the
                  people whose time is hardest to replace.
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  The switch is expensive because the work is complex
                </h2>

                <p>
                  Context switching turns certified attention into administrative
                  motion. It stretches turnaround. It adds reviewer load. It makes
                  it more likely that a value is written later, a photo loses its
                  context, or a note has to be reconstructed after the job moves
                  on.
                </p>

                <p>
                  The more complex the work, the more expensive the switch. A
                  detailed inspection may need measurements, photos, manual
                  references, condition notes, disposition logic, and quality
                  review. The technician has to hold the job in their head while
                  also remembering what the record will need later.
                </p>

                <p>
                  MRO productivity starts by narrowing the distance between the
                  work and the record. Not by removing human judgment. Not by
                  turning maintenance into a software workflow. The mechanic just
                  does the job. The glasses observe. The human reviews and signs.
                </p>

                <p>
                  The record should not require the technician to keep leaving the
                  work. The closer documentation gets to the point of work, the
                  less the shop spends its most valuable resource on context
                  switching.
                </p>

                <p>
                  If you run maintenance operations and this mirrors what you see,
                  we&apos;d like to{" "}
                  <a
                    href="mailto:jake@mechanicalvisioncorp.com"
                    className="font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                  >
                    compare notes
                  </a>
                  .
                </p>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-sm border border-white/10 bg-white/[0.035] p-6">
                <div className="text-sm font-medium uppercase tracking-[0.18em] text-white/42">
                  Field Note 03
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/62">
                  Part of MVC&apos;s Field Notes series on the MRO labor
                  bottleneck, documentation drag, and operational visibility.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}
