"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll choreography: every `<section>` fades and rises into view
 * as it enters the viewport, and replays when scrolled back into view.
 *
 * Renders nothing — it tags sections with `.sr` and toggles `.sr-in`
 * (see globals.css). Content is fully visible without JavaScript, and the
 * whole effect is skipped for users who prefer reduced motion.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll("section"));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.classList.toggle("sr-in", e.isIntersecting);
        }
      },
      // Trigger once ~6% of the viewport bottom has been crossed, so the
      // rise is visible instead of finishing off-screen.
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );

    for (const s of sections) {
      s.classList.add("sr");
      io.observe(s);
    }

    return () => {
      io.disconnect();
      // Never leave content hidden behind a stale reveal class.
      for (const s of sections) s.classList.remove("sr", "sr-in");
    };
  }, [pathname]);

  return null;
}
