"use client";

import { useEffect } from "react";

/**
 * Next.js treats a link to the page you're already on as a no-op, so clicking
 * e.g. "Blog" while on /blog appears dead. This listens site-wide and smooth
 * scrolls back to the top instead, which reads as the page "reopening".
 *
 * Renders nothing. Anchor (#hash) links, external links, downloads and
 * modified clicks (new-tab etc.) are left to their normal behaviour.
 */
export default function SamePageScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const a = (e.target as HTMLElement).closest?.("a");
      if (!a || !a.getAttribute("href") || a.target === "_blank" || a.hasAttribute("download"))
        return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;

      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
