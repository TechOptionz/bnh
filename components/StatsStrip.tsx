"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CountUp from "@/components/CountUp";
import { C } from "@/lib/site";

export type Stat = { n: string; l: string };

/** Layout effect on the client, plain effect on the server (no SSR warning). */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * "idle" is what the server renders — everything visible, so no-JS and
 * reduced-motion visitors get the finished state. On the client we arm the
 * hidden state before the first paint, then release it once in view.
 */
type Phase = "idle" | "armed" | "in";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    setPhase("armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          setPhase("in");
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, phase };
}

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

/**
 * Stat figures that count up on scroll. `strip` is the bordered four-up row;
 * `inline` is the compact row of figures that sits next to body copy.
 */
export default function StatsStrip({
  stats,
  variant = "strip",
  numberColor,
  ruleColor = C.cyan,
  gap = 34,
}: {
  stats: readonly Stat[];
  variant?: "strip" | "inline";
  numberColor?: string;
  ruleColor?: string;
  gap?: number;
}) {
  const { ref, phase } = useReveal<HTMLDivElement>();
  const inline = variant === "inline";
  const ruleWidth = inline ? 26 : 34;

  return (
    <div
      ref={ref}
      className={inline ? "stats-inline" : "stats-grid"}
      style={inline ? { gap } : undefined}
    >
      {stats.map((s, i) => (
        <div
          key={s.n + s.l}
          className={[
            "stat-cell",
            inline ? "stat-cell--inline" : "",
            phase === "armed" ? "is-armed" : "",
            phase === "in" ? "is-in" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <div
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              fontSize: inline ? 28 : "clamp(30px,3.4vw,40px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: numberColor ?? (inline ? C.orange : C.navy),
            }}
          >
            <CountUp value={s.n} delay={i * 90} />
          </div>
          <div
            className="stat-rule"
            style={{
              marginTop: inline ? 8 : 12,
              width: phase === "armed" ? 0 : ruleWidth,
              background: ruleColor,
              transitionDelay: `${i * 90 + 120}ms`,
            }}
          />
          <div
            style={{
              marginTop: inline ? 8 : 12,
              fontSize: inline ? 13.5 : 14,
              lineHeight: 1.5,
              color: C.body,
            }}
          >
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}
