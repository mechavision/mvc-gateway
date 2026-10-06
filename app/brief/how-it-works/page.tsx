import type { Metadata } from "next";

import BriefPage from "@/components/brief/BriefPage";
import BriefHero from "@/components/brief/BriefHero";
import BriefSection from "@/components/brief/BriefSection";
import BriefFooter from "@/components/brief/BriefFooter";

export const metadata: Metadata = {
  title: "How MVC Works",
  description:
    "MVC observes maintenance work, prepares evidence-backed records, and keeps human review and signoff in control.",
  robots: { index: false, follow: false },
};

export default function BriefHowItWorksPage() {
  return (
    <BriefPage>
      <BriefHero
        image="/whatif-3.jpg"
        imageAlt="Aircraft maintenance tools in a shop"
        headline={<>How it works.</>}
        subhead={<>Three layers: Understand the job, observe the work, prepare the record.</>}
        heightClass="h-[2.05in]"
      />

      {/* LAYER 1 */}
      <BriefSection
        eyebrow="Layer 1"
        title="Understand the work before it starts."
        className="mt-[0.22in]"
      >
        <div className="flex flex-col gap-2">
          <p style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
            Upload the CMM, work card, or supporting manuals. The platform reads the source material, identifies the relevant procedure steps, and structures measurements, tolerances, go and no-go checks, tool callouts, and configuration variants into a usable job template.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
            Assembly, sub-assembly, and item relationships stay tied to the right procedure context. Torque specs, matched-set flags, safety-wire requirements, and visual checks stay attached to the step that needs them.
          </p>
          <div className="mt-1 grid grid-cols-3 gap-3">
            {[
              ["01", "Source docs"],
              ["02", "Required steps"],
              ["03", "Evidence fields"],
            ].map(([num, label]) => (
              <div
                key={num}
                className="flex items-center gap-2 rounded-sm border border-amber-400/25 bg-amber-400/10 px-3 py-2"
              >
                <span
                  className="font-display text-amber-400"
                  style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.04em" }}
                >
                  {num}
                </span>
                <span
                  className="font-display text-cream-200"
                  style={{ fontSize: "11.5px", fontWeight: 700, lineHeight: 1.2 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p
            className="mt-1 text-amber-400"
            style={{ fontSize: "11.5px", lineHeight: 1.45, fontStyle: "italic" }}
          >
            Each job stays tied to the source procedure version used when the work began.
          </p>
        </div>
      </BriefSection>

      {/* LAYER 2 */}
      <BriefSection
        eyebrow="Layer 2"
        title="Observe without changing the work."
        className="mt-[0.18in]"
      >
        <p style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
          The mechanic or inspector picks the part and work order, puts on smart glasses or another head-mounted camera, and starts the job. From there, the platform observes while the person does the work normally.
        </p>
        <ol className="mt-3 grid grid-cols-4 gap-3">
          {[
            {
              num: "01",
              label: "Pick part and work order.",
              detail: "The right procedure context loads on a tablet, laptop, or nearby workstation.",
            },
            {
              num: "02",
              label: "Start capture.",
              detail: "Glasses or a head-mounted camera record video and close-mic audio as the job proceeds.",
            },
            {
              num: "03",
              label: "Observe.",
              detail: "The platform maps tools, parts, gauge readings, photos, and spoken measurements to the required steps.",
            },
            {
              num: "04",
              label: "Review and sign.",
              detail: "The authorized mechanic, inspector, or reviewer checks the record and signs. AI does not approve the work.",
            },
          ].map((step) => (
            <li
              key={step.num}
              className="rounded-sm border border-cream-200/10 bg-cream-200/[0.02] px-3 py-2.5"
            >
              <div
                className="font-display text-amber-400"
                style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em" }}
              >
                {step.num}
              </div>
              <div
                className="mt-1 font-display text-cream-200"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                {step.label}
              </div>
              <div
                className="mt-1 text-cream-400"
                style={{ fontSize: "10.5px", lineHeight: 1.4 }}
              >
                {step.detail}
              </div>
            </li>
          ))}
        </ol>
      </BriefSection>

      {/* LAYER 3 */}
      <BriefSection
        eyebrow="Layer 3"
        title="Prepare records that humans can trust."
        className="mt-[0.18in]"
      >
        <ul className="flex flex-col gap-2">
          <li className="flex gap-3">
            <span
              aria-hidden
              className="mt-[6px] h-[5px] w-[5px] flex-none rounded-full bg-amber-400"
            />
            <span style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
              <span className="font-display text-cream-200" style={{ fontWeight: 600 }}>
                Exceptions-only review.
              </span>{" "}
              Reviewers see the problems first: out-of-spec measurements, findings that need attention, and items the platform could not match confidently.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden
              className="mt-[6px] h-[5px] w-[5px] flex-none rounded-full bg-amber-400"
            />
            <span style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
              <span className="font-display text-cream-200" style={{ fontWeight: 600 }}>
                Every measurement traces back to its source.
              </span>{" "}
              Each number can link to the video frame, audio moment, photo, or manual entry that produced it, with the user, timestamp, and method attached.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden
              className="mt-[6px] h-[5px] w-[5px] flex-none rounded-full bg-amber-400"
            />
            <span style={{ fontSize: "12.5px", lineHeight: 1.5 }}>
              <span className="font-display text-cream-200" style={{ fontWeight: 600 }}>
                Human signoff stays in control.
              </span>{" "}
              When the authorized person signs, the reviewed record is retained for audit and operational review. The AI prepares the record. It does not certify the job.
            </span>
          </li>
        </ul>
        <p
          className="mt-3 text-amber-400"
          style={{ fontSize: "12px", lineHeight: 1.45, fontStyle: "italic" }}
        >
          The same evidence trail can support the operational metrics teams already want: inspection time, rework, reviewer load, and handover quality across shops and fleets.
        </p>
      </BriefSection>

      <BriefFooter />
    </BriefPage>
  );
}
