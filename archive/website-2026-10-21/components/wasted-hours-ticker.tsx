"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import HudScan from "./hud-scan";

const HOURS_PER_SECOND = 55;

export default function WastedHoursTicker() {
  const [hours, setHours] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  const accumulatedRef = useRef(0);
  const visibleSinceRef = useRef(0);

  const tick = useCallback(() => {
    const elapsed = (performance.now() - visibleSinceRef.current) / 1000;
    setHours((accumulatedRef.current + elapsed) * HOURS_PER_SECOND);
    frameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleSinceRef.current = performance.now();
          frameRef.current = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(frameRef.current);
          accumulatedRef.current +=
            (performance.now() - visibleSinceRef.current) / 1000;
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [tick]);

  // Format with commas and no decimals
  const formatted = Math.floor(hours).toLocaleString("en-US");

  return (
    <section ref={containerRef} className="relative px-6 py-[194px] md:py-[242px] bg-dark-950 overflow-hidden">
      {/* Computer-vision HUD grid + scan line animation */}
      <HudScan />

      {/* Subtle pulsing glow behind the number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[300px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,100,100,0.8), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-white/40 text-sm uppercase tracking-[0.2em] mb-6">
          Since you opened this page
        </p>

        {/* The big ticking number */}
        <div
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {formatted}
        </div>

        <p className="mt-6 text-xl md:text-2xl text-white/60 max-w-xl mx-auto leading-relaxed">
          hours of skilled labor lost to paperwork across America
        </p>

        <p className="mt-3 text-sm text-white/30">
          Based on 1.5M US maintenance technicians &times; 40% documentation time
        </p>
      </div>
    </section>
  );
}
