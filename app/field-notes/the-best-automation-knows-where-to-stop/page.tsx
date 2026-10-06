import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";

const headerImage =
  "/images/field-notes/the-best-automation-knows-where-to-stop.webp";
const headerImageUrl = `https://mechanicalvisioncorp.com${headerImage}`;

export const metadata: Metadata = {
  title: "The Best Automation Knows Where to Stop | Field Notes",
  description:
    "A Field Note from MVC on why technology should remove the burden around skilled work—not the skilled person at its center.",
  openGraph: {
    title: "The Best Automation Knows Where to Stop",
    description:
      "Technology should remove the burden around skilled work—not the skilled person at its center.",
    images: [
      {
        url: headerImageUrl,
        width: 2400,
        height: 1800,
        alt: "An exposed aircraft engine in a maintenance hangar",
      },
    ],
  },
};

export default function BestAutomationFieldNotePage() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <Navbar />

      <article>
        <header className="relative flex min-h-[46rem] items-end overflow-hidden border-b border-white/10 bg-dark-950 px-6 pb-16 pt-32 md:min-h-[52rem] md:pb-24 md:pt-40">
          <Image
            src={headerImage}
            alt="An exposed aircraft engine in a maintenance hangar"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/85 to-dark-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-dark-950/45" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.04)_0%,transparent_36%)]" />

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <div className="max-w-4xl">
              <Link
                href="/field-notes"
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                <ArrowLeft size={16} />
                Field Notes
              </Link>

              <div className="text-sm font-medium uppercase tracking-[0.2em] text-cream-200/75">
                Field Note 06 / Human judgment
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-white drop-shadow-2xl md:text-7xl lg:text-8xl">
                The Best Automation Knows Where to Stop
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-relaxed text-white/78 md:text-2xl">
                Technology should remove the burden surrounding skilled work—not
                the skilled person at its center.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/55">
                <span>The Mechanical Vision Corporation</span>
                <span aria-hidden="true">/</span>
                <span>July 2026</span>
              </div>
            </div>
          </div>

          <a
            href="https://unsplash.com/photos/gray-and-yellow-industrial-machine-fkcjWXPRAZU"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-6 z-10 hidden text-xs text-white/45 transition-colors hover:text-white/80 md:block"
          >
            Photo: Kaspars Eglitis / Unsplash
          </a>
        </header>

        <div className="px-6 py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <div className="space-y-7 text-[18px] leading-8 text-white/72">
                <p className="text-2xl leading-9 text-white/84">
                  There is a kind of knowledge that never fits neatly into a
                  database.
                </p>

                <p>
                  It lives in the hands of the technician who notices that
                  something does not feel quite right. In the mechanic who hears
                  a sound that everyone else misses. In the inspector who has
                  seen enough normal parts to recognize an abnormal one before
                  they can fully explain why.
                </p>

                <p>
                  This knowledge is earned slowly. It comes from repetition,
                  attention, mistakes, mentorship, and years spent in contact
                  with the physical world.
                </p>

                <p>It is also some of the most valuable knowledge we have.</p>

                <p>
                  As artificial intelligence becomes more capable, progress is
                  often measured by how long a machine can operate without human
                  participation. We think that measures the wrong thing.
                </p>

                <p>
                  The question is not simply, “How much work can a machine do
                  alone?” The better question is, “How much more can people
                  accomplish when technology truly knows how to support them?”
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  Skilled workers are not the inefficiency
                </h2>

                <p>
                  Across aviation, manufacturing, energy, transportation, and
                  other essential industries, experienced workers are in short
                  supply.
                </p>

                <p>
                  Yet much of their time is consumed by activities surrounding
                  the work rather than the work itself: recording, transferring,
                  organizing, reconstructing, and proving what happened.
                </p>

                <p>
                  Those responsibilities matter. Physical work must be
                  documented, inspected, and accountable. But the way we satisfy
                  those requirements too often pulls skilled people away from the
                  activities only they can perform.
                </p>

                <p>
                  When a mechanic stops working to recreate what they just did in
                  another system, the problem is not the mechanic. When an
                  inspector spends hours assembling a record from scattered
                  information, the problem is not the inspector.
                </p>

                <p>
                  The inefficiency lies in the distance between doing the work
                  and documenting the work. Good technology should close that
                  distance.
                </p>

                <p>
                  It should give skilled people more time to diagnose, decide,
                  repair, teach, and improve. It should reduce the administrative
                  friction surrounding important work without diminishing the
                  authority of the person performing it.
                </p>

                <p className="border-l-2 border-cream-200/60 py-2 pl-6 font-display text-2xl font-medium leading-9 text-white/90">
                  The goal is not fewer humans in the loop. The goal is a better
                  loop.
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  Judgment is not a clerical task
                </h2>

                <p>
                  There is an important difference between capturing information
                  and exercising judgment.
                </p>

                <p>
                  Machines can help organize observations, surface
                  inconsistencies, and prepare records. They can remember more,
                  search faster, and maintain attention across enormous amounts
                  of information.
                </p>

                <p>
                  But professional judgment is more than information processing.
                  It includes context. It includes responsibility. It includes
                  knowing when the available evidence is insufficient, when a
                  procedure does not quite fit the situation, or when the safe
                  decision is to stop and take another look.
                </p>

                <p>
                  A system may assist with a decision. The qualified person must
                  remain able to question it, correct it, and ultimately decide.
                </p>

                <p>
                  That distinction is especially important wherever mistakes
                  have physical consequences. Automation should be confident
                  about the work it can perform reliably—and appropriately humble
                  about everything else. It should know when to proceed, when to
                  ask, and when to defer.
                </p>

                <p>
                  The best automation does not merely demonstrate capability. It
                  earns trust.
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  Human participation is a design requirement
                </h2>

                <p>
                  People are sometimes treated as an obstacle that technology
                  must eventually overcome. Human review becomes a temporary
                  compromise on the road toward full autonomy.
                </p>

                <p>We see it differently.</p>

                <p>
                  Human participation is not an embarrassing limitation. It is a
                  source of knowledge that systems need in order to remain
                  useful.
                </p>

                <p>
                  The people closest to the work encounter conditions that were
                  never represented in a training set. They notice exceptions
                  that were never anticipated by a designer. They continuously
                  adapt procedures to reality while preserving the intent behind
                  them.
                </p>

                <p>
                  A system built without that participation may appear efficient
                  while gradually drifting away from the work it is supposed to
                  support.
                </p>

                <p>
                  A better system learns through collaboration. It makes its
                  reasoning inspectable. It preserves the ability to correct the
                  record. It strengthens accountability instead of obscuring it.
                </p>

                <p>
                  Most importantly, it respects the fact that the person
                  performing the work is not simply another input. They are the
                  authority.
                </p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  Progress should feel like freedom
                </h2>

                <p>
                  The industrial technologies that mattered most did not make
                  human ability irrelevant. They gave it leverage.
                </p>

                <p>
                  Power tools did not eliminate craftsmanship. Better instruments
                  did not eliminate scientific judgment. Modern aircraft did not
                  eliminate pilots.
                </p>

                <p>
                  Each changed the work. Each transferred certain burdens to
                  machines. And each allowed people to operate at a higher
                  level—provided the technology was designed around a clear
                  understanding of where machine capability ended and human
                  responsibility began.
                </p>

                <p>
                  Artificial intelligence should be held to the same standard.
                </p>

                <p>
                  Progress should be felt by the worker as greater freedom: fewer
                  interruptions, less repetition, better information, clearer
                  records, and more time for the work that requires experience.
                </p>

                <p>
                  It should help a new technician learn from the accumulated
                  knowledge of experienced colleagues. It should help an
                  experienced technician focus on the difficult decisions worthy
                  of that experience.
                </p>

                <p>It should not flatten expertise. It should amplify it.</p>

                <h2 className="pt-6 font-display text-3xl font-bold leading-tight text-white">
                  What we believe
                </h2>

                <p>
                  At The Mechanical Vision Corporation, we believe the next
                  generation of industrial technology should be built around the
                  people who keep the physical world running.
                </p>

                <p>We believe skilled workers should spend more time using their skills.</p>

                <p>
                  We believe documentation should follow naturally from the work
                  rather than compete with it.
                </p>

                <p>
                  We believe machines should handle what they can do reliably,
                  invite human judgment when it matters, and preserve a clear
                  line of responsibility throughout.
                </p>

                <p>
                  And we believe the measure of a powerful system is not how
                  completely it removes people. It is how much more capable
                  people become when they use it.
                </p>

                <p>
                  The future of skilled work will include far more intelligence,
                  automation, and assistance than it does today. That
                  transformation is already underway.
                </p>

                <p>
                  But the person who knows the aircraft, understands the machine,
                  recognizes the exception, and accepts responsibility should
                  remain at its center.
                </p>

                <p className="font-display text-2xl font-medium leading-9 text-white/90">
                  The best automation will not replace their judgment. It will
                  finally give them the freedom to use it.
                </p>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-sm border border-white/10 bg-white/[0.035] p-6">
                <div className="text-sm font-medium uppercase tracking-[0.18em] text-white/42">
                  Field Note 06
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/62">
                  Part of MVC&apos;s Field Notes series on skilled work, human
                  judgment, and the proper role of automation.
                </p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                    Core principle
                  </div>
                  <p className="mt-3 font-display text-xl leading-7 text-white/82">
                    Automate the burden. Preserve the authority.
                  </p>
                </div>
                <a
                  href="https://unsplash.com/photos/gray-and-yellow-industrial-machine-fkcjWXPRAZU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 flex items-start justify-between gap-3 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/45 transition-colors hover:text-white/75"
                >
                  <span>Header photo by Kaspars Eglitis on Unsplash</span>
                  <ArrowUpRight
                    size={14}
                    className="mt-0.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}
