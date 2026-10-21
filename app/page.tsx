import Link from "next/link";
import AnimatedGrid from "@/components/animated-grid";

// Coming Soon holding page (Jake, 2026-10-21).
// Keeps the old hero's airplane backdrop and animated dot grid. The full
// previous homepage and the Field Notes pages live in
// archive/website-2026-10-21/ (see the README there to restore them).
export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-dark-950 to-dark-900">
      {/* Atmospheric Unsplash image — very low opacity for texture
          Photo: Jetliner on tarmac (https://unsplash.com/photos/rLoa6JfULPw) */}
      <div
        className="absolute inset-0 parallax-bg opacity-[0.12]"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      />

      {/* Animated dot-grid background */}
      <AnimatedGrid />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p className="animate-fade-in text-sm md:text-base font-medium uppercase tracking-[0.3em] text-cream-200">
          Machinist
        </p>
        <h1 className="animate-fade-in-delay-1 font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[1.05]">
          Coming Soon
        </h1>
      </div>

      {/* Footer — contact and legal links only */}
      <footer className="animate-fade-in-delay-3 absolute bottom-8 left-0 right-0 z-10 px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/45">
          <div className="flex items-center gap-x-4">
            <span>&copy; 2026 Machinist</span>
            <a href="mailto:jake@machinist.co" className="transition-colors hover:text-white">
              jake@machinist.co
            </a>
          </div>
          <div className="flex items-center gap-x-4">
            <Link href="/legal/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/legal/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
