"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BOOKING_URL, C } from "@/lib/site";

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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, phase };
}

/** 24px stroke icons, drawn inline to avoid an icon dependency. */
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="26"
      height="26"
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

type Division = {
  key: string;
  accent: string;
  title: string;
  blurb: string;
  href: string;
  icon: React.ReactNode;
  /** Chips linking to the individual service pages. */
  links: { label: string; slug: string }[];
};

const DIVISIONS: Division[] = [
  {
    key: "advice",
    accent: C.cyan,
    title: "Financial Advice",
    blurb:
      "Strategic financial advice and solutions to meet your objectives — from budgeting and retirement planning to estate planning, superannuation and investment advice.",
    href: "/financial-advice",
    icon: (
      <Icon>
        <path d="M3.5 19.2h17" />
        <path d="M6.6 19.2v-5.4M11 19.2V9.4m4.4 9.8v-7.1M19.8 19.2V6.1" />
        <path d="m5.6 10.4 4.6-3.9 3.7 2.3 5.4-5" />
        <path d="M15.9 3.3h3.6v3.5" />
      </Icon>
    ),
    links: [
      { label: "Retirement", slug: "retirement-plan" },
      { label: "Super & SMSF", slug: "super-advice" },
      { label: "Insurance", slug: "life-insurances" },
      { label: "Investments", slug: "managed-investments" },
      { label: "Estate Planning", slug: "estate-planning" },
    ],
  },
  {
    key: "tax",
    accent: C.orange,
    title: "Tax & Accounting",
    blurb:
      "A comprehensive range of tax, accounting and advisory services for clients Australia-wide — taxation strategy, bookkeeping, audit, business advisory and more.",
    href: "/accounting",
    icon: (
      <Icon>
        <rect x="4.6" y="2.8" width="14.8" height="18.4" rx="2.6" />
        <path d="M8.3 6.8h7.4v3.1H8.3z" />
        <path d="M8.6 13.7h.01M12 13.7h.01M15.4 13.7h.01M8.6 17.2h.01M12 17.2h.01M15.4 17.2h.01" />
      </Icon>
    ),
    links: [
      { label: "Taxation", slug: "taxation-advisory" },
      { label: "Bookkeeping & Payroll", slug: "bookkeeping-payroll" },
      { label: "Audit", slug: "audit-services" },
      { label: "Virtual CFO", slug: "virtual-cfo" },
      { label: "SMSF", slug: "smsf-accounting" },
    ],
  },
];

const CONSULT_POINTS = [
  "A 30-minute call with a qualified specialist",
  "A clear view of where you stand today",
  "An offer tailored to you — no obligation",
];

/**
 * The home page's two-division services grid: the advice and accounting
 * cards, plus the consultation call-to-action. Cards reveal on scroll and
 * every chip links through to the service it names.
 */
export default function ServiceCards() {
  const { ref, phase } = useReveal<HTMLDivElement>();

  const revealClass = (i: number) =>
    [
      "svc-card",
      phase === "armed" ? "is-armed" : "",
      phase === "in" ? "is-in" : "",
    ]
      .filter(Boolean)
      .join(" ") + (i === 2 ? " svc-card--cta" : "");

  const delay = (i: number) => ({ transitionDelay: `${i * 110}ms` });

  return (
    <div className="svc-grid" ref={ref}>
      {DIVISIONS.map((d, i) => (
        <article
          key={d.key}
          className={revealClass(i)}
          style={
            {
              ...delay(i),
              "--accent": d.accent,
            } as React.CSSProperties
          }
        >
          <span className="svc-icon">{d.icon}</span>
          <h3 className="svc-title">{d.title}</h3>
          <p className="svc-copy">{d.blurb}</p>
          <div className="svc-pills">
            {d.links.map((l) => (
              <Link
                key={l.slug}
                href={`/services/${l.slug}`}
                className="svc-pill"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link href={d.href} className="svc-more">
            Explore {d.title}
            <span className="svc-arrow" aria-hidden>
              &rarr;
            </span>
          </Link>
        </article>
      ))}

      <article
        className={revealClass(2)}
        style={{ ...delay(2), "--accent": C.cyan } as React.CSSProperties}
      >
        <span className="svc-badge">
          <span className="svc-dot" aria-hidden />
          Free 30-min consultation
        </span>
        <h3 className="svc-title">Not sure where to start?</h3>
        <p className="svc-copy">
          Talk it through with one of our advisers. We&rsquo;ll listen first,
          then point you to the division and the specialist that fits.
        </p>
        <ul className="svc-checks">
          {CONSULT_POINTS.map((p) => (
            <li key={p}>
              <Check />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <a href={BOOKING_URL} className="svc-cta-btn">
          Book your consultation
          <span className="svc-arrow" aria-hidden>
            &rarr;
          </span>
        </a>
      </article>
    </div>
  );
}
