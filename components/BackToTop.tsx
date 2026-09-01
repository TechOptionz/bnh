"use client";

import { useEffect, useState } from "react";

/** Floating "back to top" arrow, bottom-left on every page (the chatbot FAB
 *  owns the bottom-right corner). Appears once the page is scrolled past the
 *  first screenful and smooth-scrolls back to the top on tap. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > window.innerHeight * 0.9);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(16px)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
