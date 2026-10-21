"use client";

import { useEffect, useRef } from "react";

type VideoBgProps = {
  src: string;
  poster?: string;
  opacity?: number;
  className?: string;
};

export default function VideoBg({
  src,
  poster,
  opacity = 0.12,
  className = "",
}: VideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced motion: poster only, never download the video.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // Background videos are multi-megabyte files. With preload="none" the
    // bytes only download when the section is about to scroll into view
    // (play() triggers the fetch), and playback pauses again off-screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Keep this slow and atmospheric so the motion supports the section.
            video.playbackRate = 0.72;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`cinematic-video ${className}`}
      style={{ opacity }}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
