"use client";

import { useRef } from "react";
import { C } from "@/lib/site";

/** Flat two-tone icon tiles drawn in the brand palette, in the style of the
 *  reference design's value cards. */
const ICONS: Record<string, React.ReactNode> = {
  handshake: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
      <path
        d="M30 62l22-22a10 10 0 0114 0l24 24a10 10 0 010 14l-8 8a10 10 0 01-14 0L46 64"
        stroke={C.cyan}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M90 58L68 36a10 10 0 00-14 0L30 60a10 10 0 000 14l8 8a10 10 0 0014 0"
        stroke={C.navy}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="86" y="30" width="16" height="16" rx="5" fill={C.lightBlue} />
    </svg>
  ),
  bubbles: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
      <path
        d="M28 32h44a8 8 0 018 8v22a8 8 0 01-8 8H50l-12 12V70h-10a8 8 0 01-8-8V40a8 8 0 018-8z"
        fill={C.cyan}
      />
      <path
        d="M64 74h28a6 6 0 006-6V52a6 6 0 00-6-6h-4"
        stroke={C.navy}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="72" cy="86" r="4" fill={C.navy} />
      <circle cx="84" cy="86" r="4" fill={C.navy} />
      <circle cx="96" cy="86" r="4" fill={C.navy} />
    </svg>
  ),
  pinwheel: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
      <path d="M60 60L34 34h26v26z" fill={C.navy} />
      <path d="M60 60l26-26v26H60z" fill={C.cyan} />
      <path d="M60 60l26 26H60V60z" fill={C.navy} />
      <path d="M60 60L34 86V60h26z" fill={C.lightBlue} />
      <circle cx="60" cy="60" r="9" fill="#FFFFFF" stroke={C.cyan} strokeWidth="5" />
    </svg>
  ),
  bulb: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
      <path
        d="M60 26a24 24 0 00-13 44c3 2 5 5 5 9h16c0-4 2-7 5-9a24 24 0 00-13-44z"
        fill={C.cyan}
      />
      <rect x="48" y="84" width="24" height="8" rx="4" fill={C.navy} />
      <rect x="52" y="96" width="16" height="7" rx="3.5" fill={C.lightBlue} />
      <path d="M60 44v14M53 51h14" stroke={C.navy} strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  book: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
      <path
        d="M60 36c-8-6-19-8-28-6v54c9-2 20 0 28 6V36z"
        fill={C.cyan}
      />
      <path
        d="M60 36c8-6 19-8 28-6v54c-9-2-20 0-28 6V36z"
        fill={C.navy}
      />
      <rect x="40" y="46" width="12" height="5" rx="2.5" fill="#FFFFFF" opacity="0.85" />
      <rect x="40" y="58" width="12" height="5" rx="2.5" fill="#FFFFFF" opacity="0.85" />
    </svg>
  ),
  heart: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
      <path
        d="M60 92S30 72 30 51a17 17 0 0130-11 17 17 0 0130 11c0 21-30 41-30 41z"
        fill={C.cyan}
      />
      <path
        d="M42 56h10l5-9 7 16 5-7h10"
        stroke={C.navy}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="88" y="34" width="14" height="14" rx="5" fill={C.lightBlue} />
    </svg>
  ),
};

const VALUES: { icon: keyof typeof ICONS; title: string; body: string }[] = [
  {
    icon: "handshake",
    title: "Client First",
    body: "We care. Every engagement starts with your goals, and our open, honest relationships are built on trust and integrity.",
  },
  {
    icon: "bubbles",
    title: "Clarity",
    body: "We talk the same language as you, providing well-defined, plain-English solutions to complex financial issues.",
  },
  {
    icon: "pinwheel",
    title: "Go Beyond",
    body: "We aim to exceed expectations in all we do — cost-effective, high-quality work, delivered without compromise.",
  },
  {
    icon: "bulb",
    title: "Inspired Thinking",
    body: "We innovate to get the best outcomes, drawing on Big-4 experience across aviation, real estate, health and more.",
  },
  {
    icon: "book",
    title: "Continuous Learning",
    body: "CPAs, Chartered Accountants and a CFA charterholder who never stop sharpening their expertise for your benefit.",
  },
  {
    icon: "heart",
    title: "Lasting Relationships",
    body: "We build partnerships that stand the test of time, helping businesses and individuals succeed with confidence.",
  },
];

const CARD_STEP = 392; // card width + gap

/** Horizontally scrolling value cards with prev/next arrows, in the style of
 *  the reference "Our values" carousel. */
export default function ValuesCarousel() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });

  const arrowStyle: React.CSSProperties = {
    width: 52,
    height: 52,
    borderRadius: 999,
    border: `1px solid ${C.border}`,
    background: "#FFFFFF",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  };

  return (
    <div>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 5vw",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 4,
                background: C.cyan,
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 14.5, fontWeight: 600, color: C.body }}>
              Our values
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-lexend), Lexend, sans-serif",
              fontWeight: 600,
              color: C.navy,
              fontSize: "clamp(28px,3.4vw,42px)",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Our values define how we think, act and work &mdash; internally and
            with our clients.
          </h2>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            aria-label="Previous values"
            className="btn-icon"
            style={arrowStyle}
            onClick={() => scrollBy(-1)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next values"
            className="btn-icon"
            style={arrowStyle}
            onClick={() => scrollBy(1)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          /* Track starts flush with the 1200px container, then bleeds off
             the right edge of the viewport like the reference design. */
          paddingLeft: "max(5vw, calc((100vw - 1200px) / 2))",
          paddingRight: "5vw",
          scrollPaddingLeft: "max(5vw, calc((100vw - 1200px) / 2))",
        }}
      >
        {VALUES.map((v) => (
          <div
            key={v.title}
            style={{
              flex: "0 0 368px",
              maxWidth: "82vw",
              scrollSnapAlign: "start",
            }}
          >
            <div
              style={{
                background: C.bgAlt,
                borderRadius: 16,
                aspectRatio: "1.05 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 26,
              }}
            >
              {ICONS[v.icon]}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-lexend), Lexend, sans-serif",
                fontWeight: 600,
                color: C.navy,
                fontSize: 22,
                margin: "0 0 10px",
              }}
            >
              {v.title}
            </h3>
            <p style={{ margin: 0, lineHeight: 1.65, fontSize: 15.5 }}>
              {v.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
