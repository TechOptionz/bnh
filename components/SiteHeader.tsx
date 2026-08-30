"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BOOKING_URL, BACHROB_URL, C, EMAIL, PHONE_BRISBANE } from "@/lib/site";
import { ACC, FA, SERVICES } from "@/lib/services";

export type NavKey =
  | "financial-advice"
  | "accounting"
  | "about"
  | "contact"
  | "blog"
  | null;

const LINKS: { key: Exclude<NavKey, null>; href: string; label: string }[] = [
  { key: "financial-advice", href: "/financial-advice", label: "Financial Advice" },
  { key: "accounting", href: "/accounting", label: "Accounting & Tax" },
  { key: "about", href: "/about", label: "About Us" },
  { key: "contact", href: "/contact", label: "Contact" },
  { key: "blog", href: "/blog", label: "Blog" },
];

const serviceLinks = (division: typeof FA | typeof ACC) =>
  Object.entries(SERVICES)
    .filter(([, s]) => s.division === division)
    .map(([slug, s]) => ({ href: `/services/${slug}`, label: s.title }));

/** Hover dropdowns for the two service nav items. */
const DROPDOWNS: {
  key: Exclude<NavKey, null>;
  heading: string;
  href: string;
  links: { href: string; label: string }[];
}[] = [
  {
    key: "financial-advice",
    heading: "Financial Advice",
    href: "/financial-advice",
    links: serviceLinks(FA),
  },
  {
    key: "accounting",
    heading: "Accounting, Taxation & Advisory",
    href: "/accounting",
    links: serviceLinks(ACC),
  },
];

/** Columns of the mega-menu, in display order. */
const MENU_COLUMNS: { heading: string; href: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "About",
    href: "/about",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Meet Our Team" },
      { href: "/blog", label: "Blogs & Articles" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Financial Advice",
    href: "/financial-advice",
    links: serviceLinks(FA),
  },
  {
    heading: "Accounting & Tax",
    href: "/accounting",
    links: serviceLinks(ACC),
  },
];

const COL_HEADING: React.CSSProperties = {
  fontFamily: "var(--font-lexend), Lexend, sans-serif",
  fontWeight: 600,
  color: C.navy,
  fontSize: 19,
  marginBottom: 22,
  display: "block",
};

export default function SiteHeader({
  active = null,
  floating = false,
}: {
  active?: NavKey;
  /** Floats the bar as a rounded white card over a full-bleed hero. */
  floating?: boolean;
}) {
  const [open, setOpen] = useState(false);
  /** Which nav item's hover dropdown is showing. */
  const [dropdown, setDropdown] = useState<Exclude<NavKey, null> | null>(null);

  useEffect(() => {
    if (!dropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dropdown]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        style={{
          ...(floating
            ? {
                /* Sticks 16px from the viewport top; the negative bottom
                   margin lets the hero below slide up behind the bar. */
                position: "sticky",
                top: 16,
                margin: "22px 3vw -108px",
                borderRadius: 14,
                boxShadow: open ? "none" : "0 12px 32px rgba(10,18,36,0.14)",
                padding: "12px 28px",
              }
            : {
                position: "relative",
                borderBottom: `1px solid ${C.border}`,
                padding: "14px 5vw",
              }),
          zIndex: 50,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
        onMouseLeave={() => setDropdown(null)}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center" }}
          onMouseEnter={() => setDropdown(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="JCA-BNH — Better at Money Matters"
            style={{ height: 62, display: "block" }}
          />
        </Link>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
            fontSize: 15.5,
            fontWeight: 600,
          }}
        >
          {LINKS.map((l) => {
            const on = l.key === active;
            const hasDropdown = DROPDOWNS.some((d) => d.key === l.key);
            const showing = dropdown === l.key;
            return (
              <span
                key={l.key}
                onMouseEnter={() => setDropdown(hasDropdown ? l.key : null)}
                style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
              >
                <Link
                  href={l.href}
                  className={on ? undefined : "hv-orange"}
                  style={{ color: on || showing ? C.orange : C.navy }}
                  aria-haspopup={hasDropdown || undefined}
                  aria-expanded={hasDropdown ? showing : undefined}
                  onFocus={() => setDropdown(hasDropdown ? l.key : null)}
                  onClick={() => {
                    setOpen(false);
                    setDropdown(null);
                  }}
                >
                  {l.label}
                </Link>
                {hasDropdown && (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke={showing ? C.orange : C.navy}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: showing ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.25s ease",
                      marginTop: 2,
                    }}
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                )}
              </span>
            );
          })}
          <a
            href={BOOKING_URL}
            onMouseEnter={() => setDropdown(null)}
            className="btn-soft"
            style={{
              background: C.cyan,
              color: C.navy,
              padding: "13px 24px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Book a Free Consultation
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="btn-icon"
            onClick={() => setOpen(!open)}
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: C.bgAlt,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 20 20"
              fill="none"
              stroke={C.navy}
              strokeWidth="2"
              strokeLinecap="round"
              style={{ transition: "transform 0.35s ease" }}
            >
              {open ? (
                <>
                  <path d="M4 4l12 12" />
                  <path d="M16 4L4 16" />
                </>
              ) : (
                <>
                  <path d="M3 6h14" />
                  <path d="M7 12h10" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Hover mega-dropdowns for the two service nav items */}
        {DROPDOWNS.map((d) => {
          const showing = dropdown === d.key && !open;
          return (
            <div
              key={d.key}
              aria-hidden={!showing}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                paddingTop: 12,
                zIndex: 60,
                pointerEvents: showing ? "auto" : "none",
              }}
            >
              <div
                onClick={(e) => {
                  /* Close when any link inside the panel is clicked. */
                  if ((e.target as HTMLElement).closest("a")) setDropdown(null);
                }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 14,
                  boxShadow: "0 28px 72px rgba(10,18,36,0.26)",
                  padding: "36px 40px",
                  display: "flex",
                  gap: 40,
                  alignItems: "stretch",
                  flexWrap: "wrap",
                  opacity: showing ? 1 : 0,
                  transform: showing ? "translateY(0)" : "translateY(-16px)",
                  visibility: showing ? "visible" : "hidden",
                  transition:
                    "opacity 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.35s",
                }}
              >
                <div style={{ flex: "1 1 460px", minWidth: 0 }}>
                  <Link
                    href={d.href}
                    className="hv-orange"
                    style={{ ...COL_HEADING, marginBottom: 20 }}
                  >
                    {d.heading}
                  </Link>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                      gap: "14px 32px",
                      fontSize: 15.5,
                    }}
                  >
                    {d.links.map((l, i) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="hv-orange"
                        style={{
                          color: C.body,
                          lineHeight: 1.4,
                          opacity: showing ? 1 : 0,
                          transform: showing ? "translateY(0)" : "translateY(10px)",
                          transition: `opacity 0.4s ease ${0.06 + i * 0.025}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + i * 0.025}s`,
                        }}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={d.href}
                    className="hv-orange"
                    style={{
                      display: "inline-block",
                      marginTop: 24,
                      color: C.navy,
                      fontWeight: 700,
                      fontSize: 14.5,
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                    }}
                  >
                    View all {d.heading.toLowerCase()} services →
                  </Link>
                </div>

                {/* Highlight card, Perks-style */}
                <div
                  style={{
                    flex: "0 1 320px",
                    background: C.navy,
                    borderRadius: 12,
                    padding: "30px 30px 28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 14,
                    opacity: showing ? 1 : 0,
                    transform: showing ? "translateY(0)" : "translateY(14px)",
                    transition:
                      "opacity 0.45s ease 0.12s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.12s",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-lexend), Lexend, sans-serif",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      fontSize: 18,
                    }}
                  >
                    Not sure where to start?
                  </div>
                  <div style={{ color: C.lightBlue, fontSize: 15.5, lineHeight: 1.55 }}>
                    Book a free 30-minute consultation with the people who make the calls.
                  </div>
                  <a
                    href={BOOKING_URL}
                    className="btn-soft"
                    style={{
                      marginTop: "auto",
                      background: C.cyan,
                      color: C.navy,
                      padding: "12px 22px",
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: 14.5,
                    }}
                  >
                    Book a Free Consultation →
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </header>

      {/* Dimmed backdrop behind the hover dropdowns (visual only) */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,18,36,0.42)",
          zIndex: 45,
          opacity: dropdown && !open ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Dimmed backdrop behind the mega-menu */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,18,36,0.5)",
          zIndex: 48,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Mega-menu panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 16,
          left: "3vw",
          right: "3vw",
          bottom: 20,
          zIndex: 49,
          background: "#FFFFFF",
          borderRadius: 14,
          boxShadow: "0 24px 64px rgba(10,18,36,0.28)",
          overflowY: "auto",
          padding: "130px 48px 32px",
          display: "flex",
          flexDirection: "column",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-28px)",
          pointerEvents: open ? "auto" : "none",
          transition:
            "opacity 0.4s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.4s",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div
          onClick={(e) => {
            /* Close when any link inside the panel is clicked. */
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "40px 32px",
            flex: 1,
            alignContent: "start",
          }}
        >
          {MENU_COLUMNS.map((col, i) => (
            <div
              key={col.heading}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 0.45s ease ${0.1 + i * 0.08}s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.08}s`,
              }}
            >
              <Link href={col.href} className="hv-orange" style={COL_HEADING}>
                {col.heading}
              </Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                  fontSize: 15.5,
                }}
              >
                {col.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="hv-orange"
                    style={{ color: C.body, lineHeight: 1.4 }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            marginTop: 48,
            paddingTop: 26,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
            opacity: open ? 1 : 0,
            transition: "opacity 0.45s ease 0.35s",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-lexend), Lexend, sans-serif",
                fontWeight: 600,
                color: C.navy,
                fontSize: 17,
                marginBottom: 6,
              }}
            >
              Not sure where to start?
            </div>
            <div style={{ fontSize: 15.5 }}>
              <a
                href={BOOKING_URL}
                className="hv-orange"
                style={{
                  color: C.navy,
                  fontWeight: 700,
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                Book a free 30-minute consultation
              </a>{" "}
              with the people who make the calls.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
              fontSize: 14.5,
              fontWeight: 600,
            }}
          >
            <a href={`tel:${PHONE_BRISBANE.replace(/\s/g, "")}`} className="hv-orange" style={{ color: C.navy }}>
              {PHONE_BRISBANE}
            </a>
            <a href={`mailto:${EMAIL}`} className="hv-orange" style={{ color: C.navy }}>
              {EMAIL}
            </a>
            <a href={BACHROB_URL} className="hv-orange" style={{ color: C.navy }}>
              Visit BachRob
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
