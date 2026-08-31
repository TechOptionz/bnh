"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Splits a display value like "300%", "12+", "30 min" or "30+ yrs" into the
 * numeric part we animate and whatever literal text sits around it.
 */
function parse(value: string) {
  const m = value.match(/-?\d[\d,]*(?:\.\d+)?/);
  if (!m) return null;
  const raw = m[0];
  const target = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  const at = m.index ?? 0;
  const dot = raw.indexOf(".");
  return {
    target,
    prefix: value.slice(0, at),
    suffix: value.slice(at + raw.length),
    decimals: dot === -1 ? 0 : raw.length - dot - 1,
    grouped: raw.includes(","),
  };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Layout effect on the client, plain effect on the server (no SSR warning). */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Counts up to `value` the first time it scrolls into view. Renders the final
 * text on the server, so no-JS and reduced-motion visitors never see a zero.
 */
export default function CountUp({
  value,
  duration = 1600,
  delay = 0,
  className,
  style,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useIsoLayoutEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const format = (n: number) => {
      const fixed = n.toFixed(parsed.decimals);
      const shown = parsed.grouped
        ? Number(fixed).toLocaleString("en-AU", {
            minimumFractionDigits: parsed.decimals,
            maximumFractionDigits: parsed.decimals,
          })
        : fixed;
      return `${parsed.prefix}${shown}${parsed.suffix}`;
    };

    setText(format(0));

    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setText(format(parsed.target * easeOut(t)));
        if (t < 1) frame = requestAnimationFrame(tick);
        else setText(value);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          timer = window.setTimeout(run, delay) as unknown as ReturnType<
            typeof setTimeout
          >;
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, duration, delay]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
    >
      {text}
    </span>
  );
}
