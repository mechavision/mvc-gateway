import type { Metadata } from "next";
import {
  ClipboardCheck,
  Eye,
  FileCheck2,
  Gauge,
  History,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";

import BriefFooter from "@/components/brief/BriefFooter";
import BriefHero from "@/components/brief/BriefHero";
import BriefPage from "@/components/brief/BriefPage";
import BriefSection from "@/components/brief/BriefSection";

export const metadata: Metadata = {
  title: "MVC for V-Star Powered Lift",
  description:
    "A V-Star-specific MVC brief on observed maintenance work, evidence-backed records, and time saved for mechanics and inspectors.",
  robots: { index: false, follow: false },
};

const valuePoints = [
  {
    icon: <Gauge size={15} strokeWidth={2} />,
    title: "Technician time",
    body: "Documentation can drop from as much as 40% of a shift to less than half that.",
  },
  {
    icon: <MessagesSquare size={15} strokeWidth={2} />,
    title: "Shift continuity",
    body: "Open work travels with photos, measurements, notes, and timestamps between shifts.",
  },
  {
    icon: <History size={15} strokeWidth={2} />,
    title: "Program learning",
    body: "Recurring delays, rework, and ambiguous steps become visible patterns.",
  },
  {
    icon: <ShieldCheck size={15} strokeWidth={2} />,
    title: "Human signoff",
    body: "The authorized person stays in control of review, exceptions, and approval.",
  },
];

const workflow = [
  {
    icon: <Eye size={15} strokeWidth={2} />,
    label: "Glasses observe",
    detail:
      "The mechanic starts the job normally. Smart glasses or another wearable camera observe the work.",
  },
  {
    icon: <FileCheck2 size={15} strokeWidth={2} />,
    label: "Paperwork writes itself",
    detail:
      "Captured evidence becomes measurements, photos, notes, findings, and shift summaries.",
  },
  {
    icon: <ClipboardCheck size={15} strokeWidth={2} />,
    label: "Human reviews",
    detail:
      "The authorized person reviews, resolves exceptions, and signs. AI does not approve the work.",
  },
];

export default function VStarBriefPage() {
  return (
    <BriefPage>
      <BriefHero
        image="/mechavision-brief-airplane-bw.jpg"
        imageAlt="Aircraft at an airport gate"
        headline={<>MVC for V-Star Powered Lift</>}
        subhead={
          <>
            The Mechanic works. The paperwork writes itself.
          </>
        }
        heightClass="h-[2.94in]"
        overlayStyle={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.72) 38%, rgba(8,8,8,0.9) 70%, rgba(8,8,8,0.98) 100%)",
        }}
      />

      <BriefSection
        eyebrow="What MVC does"
        title="Observe the work. Prepare the record."
        className="mt-[0.14in]"
      >
        <div className="grid grid-cols-[1fr_1.45fr] gap-6">
          <p style={{ fontSize: "12.4px", lineHeight: 1.45 }}>
            The mechanic or inspector does the job the way they already do it.
            The CMM or approved manual stays canonical. MVC observes the work
            against that source, pulls out the evidence that matters, and
            prepares the record.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {workflow.map((step) => (
              <div
                key={step.label}
                className="min-h-[0.9in] rounded-sm border border-cream-200/10 bg-dark-900/80 px-3 py-2.5"
              >
                <div className="flex h-[0.26in] w-[0.26in] items-center justify-center rounded-sm border border-amber-400/35 bg-amber-400/10 text-amber-400">
                  {step.icon}
                </div>
                <div
                  className="mt-2 font-display text-cream-200"
                  style={{ fontSize: "12.4px", fontWeight: 700 }}
                >
                  {step.label}
                </div>
                <p
                  className="mt-1.5 text-cream-400"
                  style={{ fontSize: "10.2px", lineHeight: 1.3 }}
                >
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BriefSection>

      <BriefSection
        eyebrow="What V-Star gets back"
        title="A useful record without stealing time from the floor."
        className="mt-[0.14in]"
      >
        <div className="grid grid-cols-4 gap-3">
          {valuePoints.map((point) => (
            <div
              key={point.title}
              className="rounded-sm border border-cream-200/10 bg-cream-200/[0.025] px-3 py-3"
            >
              <div className="text-amber-400">{point.icon}</div>
              <div
                className="mt-2 font-display text-cream-200"
                style={{ fontSize: "12.2px", fontWeight: 700, lineHeight: 1.22 }}
              >
                {point.title}
              </div>
              <p className="mt-1.5 text-cream-400" style={{ fontSize: "10.2px", lineHeight: 1.3 }}>
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </BriefSection>

      <section className="relative mt-[0.14in] min-h-[2.04in] overflow-hidden px-[0.6in] pb-[0.16in]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/whatif-6.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "9.45in auto",
            backgroundPosition: "right -1.52in top -1.36in",
            filter: "grayscale(1) contrast(1.12) brightness(1.38)",
            opacity: 0.86,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.94) 43%, rgba(8,8,8,0.34) 62%, rgba(8,8,8,0.08) 82%, rgba(8,8,8,0.28) 100%), linear-gradient(180deg, rgba(8,8,8,0.84) 0%, rgba(8,8,8,0.06) 48%, rgba(8,8,8,0.82) 100%)",
          }}
        />
        <div className="relative z-10">
          <div
            className="font-display uppercase tracking-[0.22em] text-amber-500"
            style={{ fontSize: "10px", fontWeight: 600 }}
          >
            What the record carries
          </div>
          <h2
            className="mt-1 font-display font-bold text-cream-200"
            style={{ fontSize: "22px", lineHeight: 1.1 }}
          >
            Evidence for review, handover, and program learning.
          </h2>
          <div className="mt-3 flex w-[3.75in] flex-col gap-2 text-cream-300">
            <p style={{ fontSize: "12.4px", lineHeight: 1.45 }}>
              MVC can attach the evidence trail to the maintenance record, so a
              reviewer can see what was done, where a number came from, and what
              still needs attention.
            </p>
            <p className="text-amber-400" style={{ fontSize: "11.6px", lineHeight: 1.4 }}>
              For V-Star, everyday maintenance experience becomes reusable
              operating memory instead of end-of-shift reconstruction.
            </p>
            <p className="text-cream-400" style={{ fontSize: "11.2px", lineHeight: 1.38 }}>
              The AI prepares the record. It does not certify the job. The
              authorized person reviews, resolves exceptions, and signs.
            </p>
          </div>
        </div>
      </section>
      <BriefFooter />
    </BriefPage>
  );
}
