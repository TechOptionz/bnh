"use client";

import { useState } from "react";
import { C } from "@/lib/site";
import type { Faq } from "@/lib/services";

/** The ruled FAQ accordion from the reference design, on the navy section:
 *  bold white questions separated by hairlines, a cyan arrow that flips open. */
export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const rule = "1px solid rgba(255,255,255,0.16)";

  return (
    <div style={{ borderTop: rule }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderBottom: rule }}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                padding: "26px 4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-lexend), Lexend, sans-serif",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  fontSize: "clamp(17px,1.7vw,20px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.005em",
                }}
              >
                {item.q}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke={C.cyan}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  flexShrink: 0,
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(180deg)" : "none",
                }}
              >
                <path d="M10 3v14" />
                <path d="M4 11l6 6 6-6" />
              </svg>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.35s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    margin: "0 0 28px",
                    padding: "0 44px 0 4px",
                    fontSize: 16,
                    lineHeight: 1.75,
                    maxWidth: "88ch",
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
