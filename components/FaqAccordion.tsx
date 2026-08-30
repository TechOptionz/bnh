"use client";

import { useState } from "react";
import { C } from "@/lib/site";
import type { Faq } from "@/lib/services";

/** The ruled FAQ accordion from the reference design: bold navy questions
 *  separated by hairlines, a cyan arrow on the right that flips when open. */
export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: `1px solid ${C.border}` }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderBottom: `1px solid ${C.border}` }}>
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
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: C.navy,
                  fontSize: 18,
                  lineHeight: 1.4,
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
                strokeWidth="2"
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
                    margin: "0 0 26px",
                    padding: "0 44px 0 4px",
                    fontSize: 15.5,
                    lineHeight: 1.75,
                    color: C.body,
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
