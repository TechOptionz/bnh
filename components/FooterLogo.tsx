"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/assets/logo.png";
/** logo.png natural size — keeps the slice math and aspect ratio exact. */
const RATIO = 7162 / 2575;
const SLICES = 8;
const STAGGER_MS = 90;
const DURATION_MS = 900;

/** Where each slice starts: pushed away from the centre, drifted vertically
 *  in alternating directions, slightly rotated and scaled down. */
const scattered = (i: number) => {
  const dir = i % 2 === 0 ? -1 : 1;
  const x = (i - (SLICES - 1) / 2) * 30;
  const y = dir * (44 + (i % 3) * 22);
  return `translate(${x}px, ${y}px) rotate(${dir * 7}deg) scale(0.9)`;
};

/**
 * The oversized footer wordmark, assembled letter-by-letter: the image is
 * cut into vertical strips that fly together once the footer scrolls into
 * view. After the motion settles, each strip lifts under the cursor like
 * the hero headline letters.
 */
export default function FooterLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(false);
  const [instant, setInstant] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (reduce) {
          setInstant(true);
          setDone(true);
        }
        setAssembled(true);
        obs.disconnect();
      },
      { threshold: reduce ? 0.01 : 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!assembled || done) return;
    const settle = DURATION_MS + SLICES * STAGGER_MS + 100;
    const t = setTimeout(() => setDone(true), settle);
    return () => clearTimeout(t);
  }, [assembled, done]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="JCA-BNH — Better at Money Matters"
      style={{
        position: "relative",
        width: "min(100%, 1080px)",
        aspectRatio: `${RATIO}`,
        margin: "clamp(56px,8vw,96px) auto 32px",
      }}
    >
      <div
        aria-hidden="true"
        style={{ display: "flex", position: "absolute", inset: 0 }}
      >
        {/* Once settled, the slices stay mounted so each can lift under the
            cursor (`.logo-slice`, same feel as the hero letters); inline
            motion styles are dropped so the hover class controls transform. */}
        {Array.from({ length: SLICES }, (_, i) => (
          <div
            key={i}
            className={done ? "logo-slice" : undefined}
            style={{
              flex: 1,
              backgroundImage: `url(${SRC})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${SLICES * 100}% 100%`,
              backgroundPosition: `${(i / (SLICES - 1)) * 100}% 0`,
              ...(done
                ? {}
                : {
                    opacity: assembled ? 1 : 0,
                    transform: assembled ? "none" : scattered(i),
                    filter: assembled ? "blur(0px)" : "blur(6px)",
                    transition: instant
                      ? "none"
                      : `transform ${DURATION_MS}ms cubic-bezier(0.22,1,0.36,1) ${i * STAGGER_MS}ms,` +
                        `opacity ${DURATION_MS * 0.7}ms ease ${i * STAGGER_MS}ms,` +
                        `filter ${DURATION_MS}ms ease ${i * STAGGER_MS}ms`,
                    willChange: "transform, opacity, filter",
                  }),
            }}
          />
        ))}
      </div>
    </div>
  );
}
