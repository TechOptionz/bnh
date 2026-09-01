"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Guarantees every route change opens at the very top of the new page,
 * jumping there instantly (no slow smooth-scroll up from the old position).
 *
 * Renders nothing. Deep links with a #hash are left alone so anchored
 * sections still work.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
