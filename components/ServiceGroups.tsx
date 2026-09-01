"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BOOKING_URL } from "@/lib/site";

/** Layout effect on the client, plain effect on the server (no SSR warning). */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * "idle" is what the server renders — cards visible, so no-JS and
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, phase };
}

export type ServiceGroup = {
  /** Group heading, e.g. "Life & Retirement". */
  heading: string;
  /** Accent colour for the group's rule, card icons and hover states. */
  dot: string;
  cards: { slug: string; title: string; blurb: string }[];
  /** Appends the "Not sure what you need?" tile to this group. */
  showHelpCard?: boolean;
};

/** 24px stroke icons, drawn inline to avoid an icon dependency. */
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12.6 4.4 4.4L19 7.4" />
    </svg>
  );
}

/** One icon per service slug, so each card reads at a glance. */
const ICONS: Record<string, React.ReactNode> = {
  /* --- accounting, taxation & advisory --- */
  "business-advisory": (
    <Icon>
      <circle cx="12" cy="12" r="8.8" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z" />
    </Icon>
  ),
  "business-planning": (
    <Icon>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" />
    </Icon>
  ),
  "business-software": (
    <Icon>
      <rect x="2.8" y="4" width="18.4" height="12.6" rx="2.2" />
      <path d="M9 20.6h6M12 16.6v4" />
      <path d="m9.4 8.6-2 2.1 2 2.1M14.6 8.6l2 2.1-2 2.1" />
    </Icon>
  ),
  "business-support": (
    <Icon>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="m6 6 3.6 3.6M14.4 14.4 18 18M18 6l-3.6 3.6M9.6 14.4 6 18" />
    </Icon>
  ),
  "process-improvement": (
    <Icon>
      <path d="M20.4 12a8.4 8.4 0 0 1-14.3 6" />
      <path d="M3.6 12a8.4 8.4 0 0 1 14.3-6" />
      <path d="M3.6 7.6v4.4H8" />
      <path d="M20.4 16.4V12H16" />
    </Icon>
  ),
  "taxation-advisory": (
    <Icon>
      <path d="M5.6 3.4h12.8v17.2l-2.1-1.4-2.2 1.4-2.1-1.4-2.2 1.4-2.1-1.4-2.1 1.4z" />
      <path d="m9.4 14.2 5.2-5.2" />
      <path d="M9.6 9.4h.01M14.4 14.2h.01" />
    </Icon>
  ),
  "tax-audit-insurance": (
    <Icon>
      <path d="M12 2.9 4.9 6v5.3c0 4.2 3 8.1 7.1 9.7 4.1-1.6 7.1-5.5 7.1-9.7V6z" />
      <path d="m9 11.9 2.2 2.2 4-4.2" />
    </Icon>
  ),
  "grants-advice": (
    <Icon>
      <circle cx="12" cy="9" r="5.3" />
      <path d="m8.5 13.5-1.2 7.4 4.7-2.5 4.7 2.5-1.2-7.4" />
    </Icon>
  ),
  "smsf-accounting": (
    <Icon>
      <path d="M12 3.2v1.7" />
      <path d="M2.9 12.5a9.1 9.1 0 0 1 18.2 0z" />
      <path d="M12 12.5v6.1a2.1 2.1 0 0 0 4.2 0" />
    </Icon>
  ),
  "virtual-cfo": (
    <Icon>
      <rect x="2.9" y="7" width="18.2" height="13.1" rx="2.2" />
      <path d="M8.6 7V5.3a1.9 1.9 0 0 1 1.9-1.9h3a1.9 1.9 0 0 1 1.9 1.9V7" />
      <path d="M2.9 12.6h18.2" />
    </Icon>
  ),
  "bookkeeping-payroll": (
    <Icon>
      <rect x="4.4" y="2.8" width="15.2" height="18.4" rx="2.2" />
      <path d="M8.2 7h7.6" />
      <path d="M8.4 11.6h.01M12 11.6h.01M15.6 11.6h.01M8.4 15.1h.01M12 15.1h.01M15.6 15.1h.01M8.4 18.4h7.2" />
    </Icon>
  ),
  "internal-audit": (
    <Icon>
      <path d="M9 4.3H7.4a2 2 0 0 0-2 2v12.9a2 2 0 0 0 2 2h9.2a2 2 0 0 0 2-2V6.3a2 2 0 0 0-2-2H15" />
      <rect x="9" y="2.6" width="6" height="3.4" rx="1.2" />
      <path d="m9.4 14 1.9 1.9 3.6-3.9" />
    </Icon>
  ),
  "audit-services": (
    <Icon>
      <path d="M13.4 20.5H6.6a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h6.5l4.4 4.4v2.5" />
      <path d="M12.9 3.7V8h4.4" />
      <circle cx="16.3" cy="16" r="3.1" />
      <path d="m18.6 18.3 2.2 2.2" />
    </Icon>
  ),

  /* --- financial advice --- */
  "life-insurances": (
    <Icon>
      <path d="M12 20.4S3.9 15.5 3.9 9.9A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 8.1 2.5c0 5.6-8.1 10.5-8.1 10.5z" />
    </Icon>
  ),
  "retirement-plan": (
    <Icon>
      <circle cx="12" cy="11" r="3.6" />
      <path d="M12 3.4v2.1M4.9 11H2.8M21.2 11h-2.1M7 6 5.5 4.5M18.5 4.5 17 6" />
      <path d="M6.6 17h10.8" />
      <path d="M3 20.6h18" />
    </Icon>
  ),
  "retirement-savings": (
    <Icon>
      <ellipse cx="12" cy="6.4" rx="7.4" ry="3" />
      <path d="M4.6 6.4v5.2c0 1.7 3.3 3 7.4 3s7.4-1.3 7.4-3V6.4" />
      <path d="M4.6 11.6v5.2c0 1.7 3.3 3 7.4 3s7.4-1.3 7.4-3v-5.2" />
    </Icon>
  ),
  "smsf-advice": (
    <Icon>
      <path d="M12 3.2v1.7" />
      <path d="M2.9 12.5a9.1 9.1 0 0 1 18.2 0z" />
      <path d="M12 12.5v6.1a2.1 2.1 0 0 0 4.2 0" />
    </Icon>
  ),
  "managed-investments": (
    <Icon>
      <path d="M11.2 3.3a8.8 8.8 0 1 0 9.5 9.5h-9.5z" />
      <path d="M15.1 2.7a8.8 8.8 0 0 1 6.2 6.2h-6.2z" />
    </Icon>
  ),
  "stocks-bonds": (
    <Icon>
      <path d="M3.4 16.6 9 11l3.4 3.4L18 8.4" />
      <path d="M14.6 8.4H18v3.4" />
      <path d="M3.4 20.6h17.2" />
    </Icon>
  ),
  "margin-lending": (
    <Icon>
      <path d="M12 4v16.2" />
      <path d="M7.6 20.2h8.8" />
      <path d="M4.4 7.6h15.2" />
      <path d="M7 7.6 4 14h6z" />
      <path d="M17 7.6 14 14h6z" />
    </Icon>
  ),
  "super-advice": (
    <Icon>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2v9.6" />
      <path d="M14.5 9.4c-.5-.9-1.5-1.4-2.6-1.4-1.6 0-2.7.8-2.7 2s1 1.7 2.7 2.1c1.8.4 2.9 1 2.9 2.2s-1.2 2-2.9 2c-1.2 0-2.2-.5-2.8-1.4" />
    </Icon>
  ),
  "estate-planning": (
    <Icon>
      <path d="M3.6 10.4 12 3.8l8.4 6.6" />
      <path d="M5.9 12.1v8.1h12.2v-8.1" />
      <path d="M10 20.2v-4.6h4v4.6" />
    </Icon>
  ),
};

const FALLBACK_ICON = (
  <Icon>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m8.6 12 2.3 2.3 4.5-4.7" />
  </Icon>
);

const HELP_POINTS = [
  "A 30-minute call, no obligation",
  "A clear read on where you stand",
  "The right specialist for your situation",
];

/**
 * The service listing used on the two division pages: each group is a
 * headed band of linked service cards, with the consultation tile appended
 * to whichever group asks for it. Cards reveal on scroll.
 */
export default function ServiceGroups({ groups }: { groups: ServiceGroup[] }) {
  return (
    <section className="sg-section">
      <div className="sg-wrap">
        {groups.map((g, i) => (
          <Group key={g.heading} group={g} index={i} />
        ))}
      </div>
    </section>
  );
}

function Group({ group, index }: { group: ServiceGroup; index: number }) {
  const { ref, phase } = useReveal<HTMLDivElement>();

  const cardClass = [
    "sg-card",
    phase === "armed" ? "is-armed" : "",
    phase === "in" ? "is-in" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const count = group.cards.length;

  return (
    <div
      className="sg-group"
      ref={ref}
      style={{ "--accent": group.dot } as React.CSSProperties}
    >
      <div className="sg-head">
        <span className="sg-index" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="sg-heading">{group.heading}</h2>
        <span className="sg-rule" aria-hidden />
        <span className="sg-count">
          {count} {count === 1 ? "service" : "services"}
        </span>
      </div>

      <div className="sg-grid">
        {group.cards.map((c, i) => (
          <Link
            key={c.slug}
            href={`/services/${c.slug}`}
            className={cardClass}
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          >
            <span className="sg-icon">{ICONS[c.slug] ?? FALLBACK_ICON}</span>
            <h3 className="sg-title">{c.title}</h3>
            <p className="sg-copy">{c.blurb}</p>
            <span className="sg-more">
              Learn more
              <span className="sg-arrow" aria-hidden>
                &rarr;
              </span>
            </span>
          </Link>
        ))}

        {group.showHelpCard && (
          <div
            className={`${cardClass} sg-card--cta`}
            style={
              { "--reveal-delay": `${count * 70}ms` } as React.CSSProperties
            }
          >
            <span className="sg-badge">
              <span className="sg-dot" aria-hidden />
              Free 30-min consultation
            </span>
            <h3 className="sg-title">Not sure what you need?</h3>
            <p className="sg-copy">
              Tell us where you&rsquo;re at and we&rsquo;ll point you to the
              right service — and the specialist who handles it.
            </p>
            <ul className="sg-checks">
              {HELP_POINTS.map((p) => (
                <li key={p}>
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <a href={BOOKING_URL} className="sg-cta-btn">
              Book now
              <span className="sg-arrow" aria-hidden>
                &rarr;
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
