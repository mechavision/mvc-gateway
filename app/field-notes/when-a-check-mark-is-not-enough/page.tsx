import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedGrid from "@/components/animated-grid";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "When a Check Mark Is Not Enough | Field Notes",
  description:
    "A founder-led Field Note from MVC on why completed maintenance steps do not always preserve enough evidence to explain the decision later.",
  openGraph: {
    title: "When a Check Mark Is Not Enough | Field Notes",
    description:
      "A founder-led Field Note from MVC on why completed maintenance steps do not always preserve enough evidence to explain the decision later.",
  },
};

export default function CheckMarkFieldNotePage() {
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
              Field Note 04 / Evidence quality
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-tight text-white md:text-7xl">
              When a Check Mark Is Not Enough
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-white/68 md:text-2xl">
              A check mark can close a step. It cannot always explain what the
              technician saw, why a part passed, or why a part failed.
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
                  A check mark can close a step. It cannot always explain the
                  step.
                </p>

                <p>
                  A record can show that a task was completed, a step was
                  acknowledged, or an inspection was signed. Months later, that
                  may not be enough.
                </p>

                <p>
                  Was the wear obvious or borderline? Was the damage within
                  limits? Was there a scratch, nick, crack, stain, dent, burn
                  mark, corrosion pattern, or unusual condition? Why did the part
                  pass? Why did it fail?
                </p>

                <p>
                  What did the inspector see that made the decision obvious at the
                  time?
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  Completion is not the same as explanation
                </h2>

                <p>
                  In many workflows, the official record compresses all of that
                  into a small box, a short note, or a mark that says the step is
                  done.
                </p>

                <p>
                  Maintenance records cannot become novels, and technicians should
                  not write essays for every routine observation.
                </p>

                <p>But a check mark is thin evidence.</p>

                <p>
                  It can say, &quot;this was reviewed.&quot; It may not say,
                  &quot;this is why the decision was right.&quot;
                </p>

                <p>
                  For routine work, that feels fine. The form is complete, the
                  aircraft or component is released, everyone moves on.
                </p>

                <p>The weakness shows up later.</p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  The context gets scattered
                </h2>

                <p>
                  A customer asks why a part was rejected. A quality leader
                  reviews a recurring issue. A regulator asks how a decision was
                  made. A warranty discussion turns on what was visible at the
                  time. The technician who worked the job is on another shift or
                  cannot remember the exact condition.
                </p>

                <p>Now the shop needs the context behind the mark.</p>

                <p>
                  Sometimes it exists in a photo. Sometimes in a note. Sometimes
                  only in the memory of the person who did the work. Sometimes it
                  is scattered across a work order, a traveler, a folder of
                  images, and a conversation that no longer exists in any useful
                  form.
                </p>

                <p>That is not visibility. That is archaeology.</p>

                <p>
                  This is especially painful in visual inspection. A measurement
                  can be written as a number. A visual condition is harder. The
                  technician sees something, compares it to the manual, applies
                  experience, and makes a judgment. If the record only captures
                  the final answer, the reasoning disappears.
                </p>

                <p>Pass. Fail. Accept. Reject. Rework. Replace.</p>

                <p>Those outcomes matter. They are not the whole story.</p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  Evidence should not require more interruption
                </h2>

                <p>
                  A high-quality maintenance record preserves enough context for a
                  competent reviewer to understand the decision later. Not to
                  second-guess every mechanic. Not to slow every job down. To
                  carry the evidence that made the answer reasonable at the time.
                </p>

                <p>
                  MROs do not need more documentation for its own sake. They need
                  better evidence with less interruption. Records should show the
                  work without turning technicians into full-time narrators.
                </p>

                <p>
                  The current tradeoff is bad. Ask for richer records manually and
                  technicians lose more time writing, photographing, uploading,
                  labeling, and explaining. Keep records thin and the shop may
                  lose context later when a question comes back.
                </p>

                <p>
                  The better path is to capture useful evidence close to the work.
                  The mechanic just does the job. The glasses observe. The record
                  keeps the visual and operational context that would otherwise
                  vanish. The human reviews and signs.
                </p>

                <p>That is how a check mark becomes more than a check mark.</p>

                <p>
                  The mark does not go away. It should stay: simple, familiar, and
                  mapped to how maintenance has been controlled for decades.
                </p>

                <p>
                  But behind that check mark, there should be enough evidence to
                  answer the next question.
                </p>

                <p>
                  What was seen? What was measured? What was the condition? Why
                  did this pass? Why did this fail?
                </p>

                <p>
                  When records answer those questions, quality teams spend less
                  time chasing context. Customers get clearer answers. Audits get
                  less painful. The shop becomes less dependent on memory.
                </p>

                <p>
                  A check mark is useful. It just should not be the only thing
                  left standing when the question gets hard.
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
                  Field Note 04
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/62">
                  Part of MVC&apos;s Field Notes series on evidence quality,
                  documentation, and MRO operational memory.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}
