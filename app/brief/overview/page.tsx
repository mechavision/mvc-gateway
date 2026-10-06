import type { Metadata } from "next";
import {
  ClipboardCheck,
  Eye,
  FileCheck2,
  Gauge,
  History,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

import BriefPage from "@/components/brief/BriefPage";
import BriefHero from "@/components/brief/BriefHero";
import BriefSection from "@/components/brief/BriefSection";
import BriefFooter from "@/components/brief/BriefFooter";

export const metadata: Metadata = {
  title: "The Mechanical Vision Corporation",
  description:
    "A customer-facing MVC brief on observed maintenance work, evidence-backed records, and time saved for mechanics and inspectors.",
  robots: { index: false, follow: false },
};

const valuePoints = [
  {
    icon: <Gauge size={15} strokeWidth={2} />,
    title: "Technician time",
    body: "Less time writing notes, matching photos, transcribing measurements, and rebuilding the job afterward.",
  },
  {
    icon: <History size={15} strokeWidth={2} />,
    title: "Shift continuity",
    body: "Open work travels with photos, measurements, notes, and timestamps between shifts.",
  },
  {
    icon: <SearchCheck size={15} strokeWidth={2} />,
    title: "Auditability",
    body: "Reviewers can see what was done, where the evidence came from, and what still needs attention.",
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

const recordSectionFade =
  "linear-gradient(180deg, transparent 0px, rgba(0,0,0,0.55) 34px, #000 82px)";

export default function BriefOverviewPage() {
  return (
    <BriefPage>
      <BriefHero
        image="/mechavision-brief-airplane-bw.jpg"
        imageAlt="Aircraft at an airport gate"
        headline={<>The Mechanical Vision Corporation</>}
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
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: "11.8px", lineHeight: 1.38 }}>
              Maintenance teams lose time turning completed work into proof:
              notes, photos, measurements, shift history, and audit evidence.
              The work happens once. The record gets rebuilt later.
            </p>
            <p style={{ fontSize: "11.8px", lineHeight: 1.38 }}>
              The mechanic or inspector works normally. The CMM or approved
              manual stays canonical. MVC observes the work against that source
              and prepares the record for review.
            </p>
          </div>
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
        eyebrow="What maintenance teams get back"
        title="A useful record without slowing down the work."
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
            WebkitMaskImage: recordSectionFade,
            maskImage: recordSectionFade,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.94) 43%, rgba(8,8,8,0.34) 62%, rgba(8,8,8,0.08) 82%, rgba(8,8,8,0.28) 100%), linear-gradient(180deg, rgba(8,8,8,0.84) 0%, rgba(8,8,8,0.06) 48%, rgba(8,8,8,0.82) 100%)",
            WebkitMaskImage: recordSectionFade,
            maskImage: recordSectionFade,
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
              Everyday maintenance experience becomes reusable operating memory
              instead of end-of-shift reconstruction.
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
