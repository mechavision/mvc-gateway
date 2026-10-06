import type { Metadata } from "next";

import BriefFooter from "@/components/brief/BriefFooter";
import BriefHero from "@/components/brief/BriefHero";
import BriefPage from "@/components/brief/BriefPage";
import BriefSection from "@/components/brief/BriefSection";

export const metadata: Metadata = {
  title: "MVC · Prospect one-pager",
  description:
    "MVC helps aircraft maintenance teams reduce turnaround time by preparing review-ready records from observed work.",
};

const workflowSteps = [
  {
    label: "Observe",
    detail:
      "The mechanic starts the job normally. MVC's glasses observe the work without changing the flow.",
  },
  {
    label: "Prepare",
    detail:
      "AI maps measurements, findings, photos, timestamps, and task context into the record.",
  },
  {
    label: "Review",
    detail:
      "QA sees the evidence trail, resolves exceptions, and the authorized reviewer signs.",
  },
];

const outcomes = [
  {
    label: "Reduce turnaround time",
    detail:
      "Move from completed work to review-ready records faster, so aircraft can progress toward release sooner.",
  },
  {
    label: "More output per hour",
    detail:
      "Reduce duplicate entry and end-of-shift reconstruction, so the same team spends more time on aircraft.",
  },
  {
    label: "Evidence-backed auditability",
    detail:
      "Ask what was done, then open both the maintenance record and video proof of the work being done.",
  },
];

const proofPoints = [
  "Feeds existing systems.",
  "Human review and signoff stay in control.",
];

export default function MVCBriefPage() {
  return (
    <BriefPage>
      <BriefHero
        image="/mechavision-brief-airplane-bw.jpg"
        imageAlt="A wide-body aircraft parked at an airport terminal"
        headline={
          <>
            Mechanics inspect. Glasses observe. Paperwork writes itself.
          </>
        }
        subhead={
          <>
            Reclaim your shift. Focus on the real work.
          </>
        }
        heightClass="h-[2.18in]"
      />

      {/* Problem framing for MRO leaders who care about turnaround time. */}
      <BriefSection
        eyebrow="The turnaround leak"
        title="The aircraft is not ready until the record is clean."
        className="mt-[0.23in]"
      >
        <div className="grid grid-cols-[1.05fr_1fr_1fr] gap-5">
          <div>
            <div className="font-display text-cream-200" style={{ fontSize: "13.4px", fontWeight: 650 }}>
              Documentation slows release.
            </div>
            <p className="mt-1.5 text-cream-400" style={{ fontSize: "11.2px", lineHeight: 1.45 }}>
              Technicians lose time after the task capturing measurements, findings, and corrective actions a second time.
            </p>
          </div>
          <div>
            <div className="font-display text-cream-200" style={{ fontSize: "13.4px", fontWeight: 650 }}>
              QA chases missing proof.
            </div>
            <p className="mt-1.5 text-cream-400" style={{ fontSize: "11.2px", lineHeight: 1.45 }}>
              Inspectors untangle late notes, unclear photos, and records that do not show how work was verified.
            </p>
          </div>
          <div>
            <div className="font-display text-cream-200" style={{ fontSize: "13.4px", fontWeight: 650 }}>
              The best teams need capacity.
            </div>
            <p className="mt-1.5 text-cream-400" style={{ fontSize: "11.2px", lineHeight: 1.45 }}>
              The technician shortage makes every paperwork hour expensive. MROs need more throughput from the same team.
            </p>
          </div>
        </div>
      </BriefSection>

      <BriefSection
        eyebrow="Buyer outcomes"
        title="Faster release, more useful work per hour, and proof the work was done."
        className="mt-[0.23in]"
      >
        <div className="grid grid-cols-[1.1fr_1.65fr] gap-6">
          <p className="text-cream-300" style={{ fontSize: "12.1px", lineHeight: 1.5 }}>
            MVC starts with the real source of truth: the work itself. The glasses observe the task, the AI organizes the evidence, and the mechanic reviews the record before signoff.
          </p>
          <div className="border-y border-cream-200/10">
            {outcomes.map((outcome, index) => (
              <div
                key={outcome.label}
                className="grid grid-cols-[0.42in_1fr] gap-3 border-t border-cream-200/10 py-2 first:border-t-0"
              >
                <div
                  className="font-display text-amber-400"
                  style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}
                >
                  0{index + 1}
                </div>
                <div>
                  <div
                    className="font-display text-cream-200"
                    style={{ fontSize: "14px", fontWeight: 680, lineHeight: 1.2 }}
                  >
                    {outcome.label}
                  </div>
                  <p className="mt-1 text-cream-400" style={{ fontSize: "11px", lineHeight: 1.45 }}>
                    {outcome.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BriefSection>

      <BriefSection
        eyebrow="How it works"
        title={
          <span>
            Observe the work. Prepare the record.{" "}
            <span className="text-amber-400">Keep humans in control.</span>
          </span>
        }
        className="mt-[0.23in]"
      >
        <ol className="grid grid-cols-3 gap-3">
          {workflowSteps.map((step, index) => (
            <li
              key={step.label}
              className="border-l border-cream-200/15 pl-3"
            >
              <div
                className="font-display text-amber-400"
                style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}
              >
                0{index + 1}
              </div>
              <div
                className="mt-1 font-display text-cream-200"
                style={{ fontSize: "13px", fontWeight: 650 }}
              >
                {step.label}
              </div>
              <p className="mt-1 text-cream-400" style={{ fontSize: "10.8px", lineHeight: 1.42 }}>
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </BriefSection>

      <BriefSection
        eyebrow="Proof and fit"
        title="Proof without black-box signoff."
        className="mt-[0.23in]"
      >
        <div className="grid grid-cols-[1.1fr_1fr] gap-5">
          <p style={{ fontSize: "11.8px", lineHeight: 1.45 }}>
            If anyone questions the work later, the answer can include both the record and video of the work actually being done. QA gets proof without asking mechanics to document more.
          </p>
          <ul className="grid grid-cols-1 gap-1">
            {proofPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[6px] h-[5px] w-[5px] flex-none rounded-full bg-amber-400"
                />
                <span className="text-cream-300" style={{ fontSize: "10.8px", lineHeight: 1.35 }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </BriefSection>

      <BriefFooter />
    </BriefPage>
  );
}
