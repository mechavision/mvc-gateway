import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Database,
  Eye,
  FileCheck2,
  PenLine,
  Wrench,
} from "lucide-react";

import BriefPage from "@/components/brief/BriefPage";

export const metadata: Metadata = {
  title: "MVC Investor One-Pager",
  description:
    "MVC investor one-pager for AI work capture in maintenance and inspection.",
  robots: { index: false, follow: false },
};

function CornerPanel({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-sm border border-cream-200/12 bg-cream-200/[0.025] px-4 py-3.5 ${className}`}
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-4 w-4 border-l border-t border-amber-400/70"
      />
      <span
        aria-hidden
        className="absolute right-0 top-0 h-4 w-4 border-r border-t border-amber-400/70"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-amber-400/70"
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-amber-400/70"
      />
      <div
        className="font-display uppercase text-amber-500"
        style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.24em" }}
      >
        {eyebrow}
      </div>
      <h2
        className="mt-1 font-display font-bold text-cream-200"
        style={{ fontSize: "21px", lineHeight: 1.1, letterSpacing: "0" }}
      >
        {title}
      </h2>
      <div className="mt-3 text-cream-300" style={{ fontSize: "12px", lineHeight: 1.45 }}>
        {children}
      </div>
    </section>
  );
}

function ProofItem({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-0.5 flex h-[0.22in] w-[0.22in] flex-none items-center justify-center rounded-sm border border-amber-400/35 bg-amber-400/10 text-amber-400">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

function ProcessStep({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="min-h-[1.02in] rounded-sm border border-cream-200/10 bg-dark-900/80 px-3 py-3">
      <div className="flex items-center gap-2 text-amber-400">
        {icon}
        <div className="font-display text-cream-200" style={{ fontSize: "12px", fontWeight: 700 }}>
          {title}
        </div>
      </div>
      <p className="mt-2 text-cream-400" style={{ fontSize: "10.7px", lineHeight: 1.4 }}>
        {body}
      </p>
    </div>
  );
}

export default function InvestorBriefPage() {
  return (
    <BriefPage>
      <header className="relative h-[2.25in] flex-none overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.webp"
          alt="Technician working in a dark aircraft maintenance environment"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,12,12,0.2) 0%, rgba(12,12,12,0.7) 54%, rgba(12,12,12,0.98) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(230,227,224,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(230,227,224,0.12) 1px, transparent 1px)",
            backgroundSize: "0.32in 0.32in",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between px-[0.6in] py-[0.28in]">
          <div className="flex items-center justify-between">
            <div
              className="font-display uppercase text-cream-200"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em" }}
            >
              The Mechanical Vision Corporation
            </div>
          </div>

          <div>
            <h1
              className="font-display font-bold text-cream-200"
              style={{ fontSize: "42px", lineHeight: 1.02, letterSpacing: "0" }}
            >
              Technicians work.
              <br />
              The paperwork writes itself.
            </h1>
            <p
              className="mt-3 max-w-[6.7in] text-cream-300"
              style={{ fontSize: "15.5px", lineHeight: 1.45 }}
            >
              MVC uses smart glasses and AI to observe maintenance work as it happens,
              turn that work into evidence-backed records, and keep human review and
              signoff in control.
            </p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-[0.16in] px-[0.6in] py-[0.24in]">
        <CornerPanel
          eyebrow="Problem"
          title="Scarce technicians are stuck writing notes after the work is done."
        >
          <div className="grid grid-cols-[1.55in_1fr] gap-4">
            <div className="rounded-sm border border-amber-400/25 bg-amber-400/10 px-3 py-3">
              <div
                className="font-display text-cream-200"
                style={{ fontSize: "39px", lineHeight: 1, fontWeight: 800 }}
              >
                60%
              </div>
              <p className="mt-2 text-cream-300" style={{ fontSize: "10.5px", lineHeight: 1.35 }}>
                of a mechanic&apos;s day is spent on paperwork, not fixing airplanes.
              </p>
              <p className="mt-2 text-cream-400/70" style={{ fontSize: "8.6px", lineHeight: 1.3 }}>
                Source: McKinsey.
              </p>
            </div>

            <ul className="flex flex-col gap-2.5">
              <ProofItem icon={<Wrench size={13} strokeWidth={2} />}>
                Aircraft maintenance depends on scarce expert labor, but records are
                still built from notes, photos, manual entry, and memory.
              </ProofItem>
              <ProofItem icon={<FileCheck2 size={13} strokeWidth={2} />}>
                Missing evidence creates slower turnaround, rework, audit risk, and
                avoidable reviewer load.
              </ProofItem>
              <ProofItem icon={<Database size={13} strokeWidth={2} />}>
                The most valuable data in maintenance is created on the floor, then
                flattened into paperwork after the fact.
              </ProofItem>
            </ul>
          </div>
        </CornerPanel>

        <CornerPanel eyebrow="Solution" title="The work becomes the record.">
          <div className="grid grid-cols-[1fr_0.22in_1fr_0.22in_1fr] items-stretch gap-2">
            <ProcessStep
              icon={<Eye size={15} strokeWidth={2} />}
              title="Glasses observe"
              body="Technicians just do the job. The system captures the work without asking them to stop and document each step."
            />
            <div className="flex items-center justify-center text-amber-400/80">
              <ArrowRight size={15} strokeWidth={2} />
            </div>
            <ProcessStep
              icon={<FileCheck2 size={15} strokeWidth={2} />}
              title="AI prepares"
              body="Evidence is mapped to required fields, measurements, notes, and review-ready maintenance records."
            />
            <div className="flex items-center justify-center text-amber-400/80">
              <ArrowRight size={15} strokeWidth={2} />
            </div>
            <ProcessStep
              icon={<PenLine size={15} strokeWidth={2} />}
              title="Human signs"
              body="A person reviews, corrects when needed, and signs. The mechanic remains the certifying authority."
            />
          </div>
          <p className="mt-3 text-cream-300" style={{ fontSize: "11.5px", lineHeight: 1.45 }}>
            MVC produces documentation from observed work, so the record is attached to
            the actual evidence instead of reconstructed later.
          </p>
        </CornerPanel>

        <CornerPanel
          eyebrow="Market"
          title="Aviation is the wedge. Skilled technical work capture is the category."
          className="mb-[0.05in]"
        >
          <div className="grid grid-cols-[1.6in_1fr] gap-4">
            <div className="flex flex-col justify-center rounded-sm bg-cream-200 px-3 py-3 text-dark-950">
              <div
                className="font-display"
                style={{ fontSize: "38px", lineHeight: 1, fontWeight: 800 }}
              >
                $85B
              </div>
              <div
                className="mt-2 font-display uppercase"
                style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em" }}
              >
                TAM
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2.5">
              <p>
                Global AI work-capture software for high-value maintenance,
                inspection, and technician workflows.
              </p>
              <p className="text-cream-400">
                Initial wedge: aerospace maintenance, where expensive assets,
                regulated records, and scarce technicians make the pain immediate.
              </p>
              <p className="text-cream-400" style={{ fontSize: "10.5px", lineHeight: 1.35 }}>
                Long-term upside comes from proprietary expert-work data for
                physical AI.
              </p>
            </div>
          </div>
        </CornerPanel>
      </main>

      <footer
        className="flex flex-none items-center justify-between border-t border-cream-200/10 px-[0.6in] py-[0.16in]"
        style={{ fontSize: "9.5px" }}
      >
        <div className="font-display uppercase tracking-[0.24em] text-cream-200">
          The Mechanical Vision Corporation
        </div>
        <div className="text-cream-400">mechanicalvisioncorp.com · jake@mechanicalvisioncorp.com</div>
      </footer>
    </BriefPage>
  );
}
