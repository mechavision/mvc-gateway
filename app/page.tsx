import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronDown, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import SectionWrapper from "@/components/section-wrapper";
import ScrollReveal from "@/components/scroll-reveal";
import AnimatedGrid from "@/components/animated-grid";
import CountUp from "@/components/count-up";
import ScrollProgress from "@/components/scroll-progress";
import PanelCorners from "@/components/panel-corners";
import VideoBg from "@/components/video-bg";

// Lazy-load heavy below-fold components — lets hero render instantly
const WhatIfScroll = dynamic(() => import("@/components/what-if-scroll"));
const WastedHoursTicker = dynamic(() => import("@/components/wasted-hours-ticker"));

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />

      {/* ========================
          HERO — Bold, vague, mission-driven
          ======================== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-dark-950 to-dark-900">
        {/* Atmospheric Unsplash image — very low opacity for texture
            Photo: Jetliner on tarmac (https://unsplash.com/photos/rLoa6JfULPw) */}
        <div
          className="absolute inset-0 parallax-bg opacity-[0.12]"
          style={{ backgroundImage: "url('/hero-bg.webp')" }}
        />

        {/* Animated dot-grid background */}
        <AnimatedGrid />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-4xl">
          {/* Main headline */}
          <h1 className="animate-fade-in font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[1.05]">
            Free the Hands
            <br />
            <span className="text-cream-200">That Build.</span>
          </h1>

          {/* CTAs */}
          <div className="animate-fade-in-delay-2 mt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/aerovision/dashboard"
              prefetch={false}
              className="cta-glow group flex h-14 items-center justify-center gap-2 rounded-sm bg-cream-200 px-8 text-lg font-medium text-dark-950 transition-all hover:scale-[1.02] hover:bg-cream-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-200"
            >
              See It in Action
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none"
              />
            </Link>
            <a
              href="https://calendar.app.google/ajT5d6E4c9cmU92R7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-base font-medium"
            >
              Get in Touch <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Scroll-down indicator — thin and subtle */}
        <div className="animate-fade-in-delay-3 absolute bottom-10 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-light">
            Scroll
          </span>
          <ChevronDown size={16} className="text-white/30 animate-bounce-slow" />
        </div>
      </section>

      {/* ========================
          THE UNLOCK — Reframe the problem as massive opportunity
          ======================== */}
      <SectionWrapper
        id="opportunity"
        className="section-hairline scroll-mt-20 bg-gradient-to-b from-dark-900 to-dark-950"
      >
        <ScrollReveal>
          <h2 className="text-center font-display text-4xl font-bold text-white md:text-6xl">
            The Biggest Productivity Unlock
            <br className="hidden md:block" />
            {" "}
            in a Generation
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <p className="mt-4 text-center text-lg text-white/60 max-w-2xl mx-auto">
            America&apos;s most skilled workers — the people who maintain, build,
            and repair everything — are spending most of their time on
            documentation instead of the work itself. That&apos;s not a small
            inefficiency. It&apos;s a massive, untapped reserve of human
            capability.
          </p>
        </ScrollReveal>

        {/* Stat cards — glass-morphism on dark */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 — Wrench time */}
          <ScrollReveal>
            <PanelCorners className="control-panel stat-card-glow rounded-sm p-8 text-center">
              <div className="font-display text-6xl font-bold text-white md:text-7xl">
                <CountUp end={25} suffix="%" />
              </div>
              <p className="mt-4 text-white/70 text-lg font-medium">
                of a technician&apos;s shift is spent with tools in hand
              </p>
              <p className="mt-2 text-sm text-white/40">
                Industry average &ldquo;wrench time&rdquo;
              </p>
            </PanelCorners>
          </ScrollReveal>

          {/* Stat 2 — Jobs at risk */}
          <ScrollReveal>
            <PanelCorners
              className="control-panel stat-card-glow rounded-sm p-8 text-center"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="font-display text-6xl font-bold text-white md:text-7xl">
                <CountUp end={1.9} suffix="M" decimals={1} />
              </div>
              <p className="mt-4 text-white/70 text-lg font-medium">
                skilled positions at risk of going unfilled by 2033
              </p>
              <p className="mt-2 text-sm text-white/40">
                Deloitte &amp; Manufacturing Institute
              </p>
            </PanelCorners>
          </ScrollReveal>

          {/* Stat 3 — Investment pouring in */}
          <ScrollReveal>
            <PanelCorners
              className="control-panel stat-card-glow rounded-sm p-8 text-center"
              style={{ animationDelay: "2.4s" }}
            >
              <div className="font-display text-6xl font-bold text-white md:text-7xl">
                <CountUp end={2} prefix="$" suffix="T+" />
              </div>
              <p className="mt-4 text-white/70 text-lg font-medium">
                in US manufacturing investment announced since 2021
              </p>
              <p className="mt-2 text-sm text-white/40">
                Reshoring Initiative
              </p>
            </PanelCorners>
          </ScrollReveal>
        </div>

        {/* Bridge statement */}
        <ScrollReveal>
          <p className="mt-16 text-center text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            The money is flowing. The factories are being built. But the people
            who make it all work are drowning in paperwork — and there
            aren&apos;t enough of them. Every hour a technician spends on
            documentation is an hour America can&apos;t afford to waste.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      {/* ========================
          WHY NOW — Reindustrialization moment
          ======================== */}
      <section
        id="why-now"
        className="section-hairline relative scroll-mt-20 overflow-hidden bg-dark-950 px-6 py-24 md:py-32"
      >
        <VideoBg
          src="/videos/whynow-bg.mp4"
          poster="/videos/panel-detail.jpg"
          opacity={0.13}
          className="section-video-layer"
        />
        {/* Atmospheric Unsplash image — very low opacity for texture
            Photo: Welder with sparks (Unsplash photo-1504328345606) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: "url('/why-now-bg.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-transparent to-dark-950/80" />

        <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column — heading + narrative */}
          <div>
            <ScrollReveal>
              <h2 className="font-display text-4xl font-bold text-white md:text-5xl xl:text-6xl">
                A Once-in-a-Generation
                <br />
                <span className="text-white/50">Moment.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-left">
              <div className="mt-10 space-y-6 text-white/60 text-lg leading-relaxed">
                <p>
                  America is reindustrializing at a pace not seen since the
                  postwar era. Semiconductors, defense, energy, advanced
                  manufacturing — trillions of dollars are flowing into building
                  the physical infrastructure of the future.
                </p>
                <p>
                  But the skilled workforce that makes all of it possible is
                  stretched to its limit. Experienced technicians are retiring
                  faster than new ones can be trained. The ones still working are
                  buried under decades-old documentation systems that steal hours
                  from every shift.
                </p>
                <p className="text-white font-medium">
                  You can&apos;t reindustrialize with 1970s paperwork. The
                  workforce needs leverage — and that&apos;s exactly what we
                  build.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — stats, aligned with heading */}
          <ScrollReveal animation="fade-in-right">
            <div className="space-y-8">
              <PanelCorners className="control-panel rounded-sm p-6">
                <div className="font-display text-5xl font-bold text-white">
                  <CountUp end={65} suffix="%" />
                </div>
                <p className="mt-2 text-white/60 text-base">
                  of manufacturers say talent is their number one business
                  challenge
                </p>
                <p className="mt-1 text-sm text-white/40">Deloitte</p>
              </PanelCorners>
              <PanelCorners className="control-panel rounded-sm p-6">
                <div className="font-display text-5xl font-bold text-white">
                  4–5 years
                </div>
                <p className="mt-2 text-white/60 text-base">
                  to train a skilled maintenance technician — and their
                  knowledge walks out the door when they retire
                </p>
                <p className="mt-1 text-sm text-white/40">Dept. of Labor</p>
              </PanelCorners>
              <PanelCorners className="control-panel rounded-sm p-6">
                <div className="font-display text-5xl font-bold text-white">
                  <CountUp end={26} suffix="%" />
                </div>
                <p className="mt-2 text-white/60 text-base">
                  of the manufacturing workforce is approaching retirement
                  — and their expertise leaves with them
                </p>
                <p className="mt-1 text-sm text-white/40">
                  Deloitte
                </p>
              </PanelCorners>
            </div>
          </ScrollReveal>
        </div>
        </div>
      </section>

      {/* ========================
          WHAT WE BELIEVE — Approach section (vague, aspirational)
          ======================== */}
      <SectionWrapper id="approach" className="bg-gradient-to-b from-dark-950 to-dark-800">
        <ScrollReveal>
          <h2 className="text-center font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
            We Believe the Work
            <br className="hidden md:block" />
            {" "}
            Should Document Itself
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <p className="mt-4 text-center text-lg text-white/60 max-w-2xl mx-auto">
            We&apos;re building technology that sees what technicians see,
            understands the work as it happens, and handles the documentation
            automatically — so skilled hands never have to stop.
          </p>
        </ScrollReveal>

        {/* Three pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <ScrollReveal delay={1}>
            <div className="text-center">
              <div className="font-display text-6xl font-bold text-white mb-4">01</div>
              <h3 className="text-xl font-bold text-white">
                Vision That Sees the Work
              </h3>
              <p className="mt-3 text-white/50 leading-relaxed">
                Advanced vision systems that observe maintenance and
                manufacturing tasks in real time — capturing what matters
                without interrupting the workflow.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="text-center">
              <div className="font-display text-6xl font-bold text-white mb-4">02</div>
              <h3 className="text-xl font-bold text-white">
                AI That Understands It
              </h3>
              <p className="mt-3 text-white/50 leading-relaxed">
                Purpose-built intelligence that interprets technical work across
                industries — identifying procedures, verifying compliance, and
                generating documentation with precision.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <div className="text-center">
              <div className="font-display text-6xl font-bold text-white mb-4">03</div>
              <h3 className="text-xl font-bold text-white">
                Documentation That Writes Itself
              </h3>
              <p className="mt-3 text-white/50 leading-relaxed">
                Complete, accurate records produced automatically — from the
                work, as it happens. No forms. No data entry. No hours lost.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* ========================
          WASTED HOURS — Live ticker making the problem visceral.
          Counts up hours of skilled labor lost to paperwork
          since the visitor opened the page.
          ======================== */}
      <WastedHoursTicker />

      {/* ========================
          WHAT IF — Full-viewport scroll-driven cinematic experience.
          Each statement takes up the entire screen and crossfades
          as you scroll. Progress dots on the right edge.
          ======================== */}
      <section id="vision">
        <WhatIfScroll />
      </section>

      {/* ========================
          CTA + FOOTER
          ======================== */}
      <section className="section-hairline relative overflow-hidden bg-dark-950 px-6 py-32 md:py-44">
        <AnimatedGrid />
        <div className="relative z-10 mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
                See It for Yourself
              </h2>
              <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
                The technology is real. The mission is just beginning.
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/aerovision/dashboard"
                  prefetch={false}
                  className="command-button cta-glow group flex h-14 items-center justify-center gap-2 rounded-sm bg-cream-200 px-10 text-lg font-medium text-dark-950 transition-all hover:scale-[1.02] hover:bg-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-200"
                >
                  See It in Action
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none"
                  />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-dark-950 px-6 py-10">
        <div className="mx-auto max-w-7xl text-sm text-white/45">
          <div className="flex flex-col gap-4">
            <span className="text-white/55">
              &copy; 2026 The Mechanical Vision Corporation
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>Jake Salomon</span>
              <span>jake@mechanicalvisioncorp.com</span>
              <Link href="/legal/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link href="/legal/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
