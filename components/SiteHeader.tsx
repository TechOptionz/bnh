"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BOOKING_URL, BACHROB_URL, C, EMAIL, PHONE_BRISBANE } from "@/lib/site";
import { ACC, FA, serviceGroups } from "@/lib/services";
import SocialLinks from "@/components/SocialLinks";

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

type LinkItem = { href: string; label: string };
type LinkGroup = { label: string; links: LinkItem[] };

/** Hover dropdowns for the two service nav items. */
const DROPDOWNS: {
  key: Exclude<NavKey, null>;
  heading: string;
  href: string;
  groups: LinkGroup[];
}[] = [
  {
    key: "financial-advice",
    heading: "Financial Advice",
    href: "/financial-advice",
    groups: serviceGroups(FA),
  },
  {
    key: "accounting",
    heading: "Accounting, Taxation & Advisory",
    href: "/accounting",
    groups: serviceGroups(ACC),
  },
];

/** Columns of the mega-menu, in display order. Columns carry either a flat
 *  link list or sub-category groups. */
const MENU_COLUMNS: {
  heading: string;
  href: string;
  links?: LinkItem[];
  groups?: LinkGroup[];
}[] = [
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
    groups: serviceGroups(FA),
  },
  {
    heading: "Accounting & Tax",
    href: "/accounting",
    groups: serviceGroups(ACC),
  },
];

/** Mobile menu (≤700px): a few main rows; services fold out as accordions. */
const MOBILE_MENU: {
  key: string;
  label: string;
  href: string;
  groups?: LinkGroup[];
  links?: LinkItem[];
}[] = [
  {
    key: "financial-advice",
    label: "Financial Advice",
    href: "/financial-advice",
    groups: serviceGroups(FA),
  },
  {
    key: "accounting",
    label: "Accounting & Tax",
    href: "/accounting",
    groups: serviceGroups(ACC),
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Meet Our Team" },
      { href: "/careers", label: "Careers" },
    ],
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

const ARROW = (
  <svg
    className="mega-arrow"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.orange}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h13" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

/** A column heading with the brand chip and a hairline beneath it. */
function ColumnHeading({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: C.cyan,
            flexShrink: 0,
          }}
        />
        <Link href={href} className="hv-orange" style={{ ...COL_HEADING, marginBottom: 0 }}>
          {children}
        </Link>
      </div>
      <div style={{ height: 1, background: C.border, marginBottom: 12 }} />
    </>
  );
}

/** Small uppercase sub-category label with an orange chip and a hairline
 *  running out to the right, used above each service group. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 2,
          background: C.orange,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: C.navy,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: C.border, minWidth: 18 }} />
    </div>
  );
}

/** Navy "book a call" card shared by the hover dropdowns and the mega-menu. */
function PromoCard({ show, delay = 0.12 }: { show: boolean; delay?: number }) {
  return (
    <div
      style={{
        background: C.navy,
        borderRadius: 14,
        padding: "30px 30px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 12,
        alignSelf: "start",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.45s ease ${delay}s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.cyan,
        }}
      >
        Free consultation
      </span>
      <div
        style={{
          fontFamily: "var(--font-lexend), Lexend, sans-serif",
          fontWeight: 600,
          color: "#FFFFFF",
          fontSize: 19,
          lineHeight: 1.3,
        }}
      >
        Not sure where to start?
      </div>
      <div style={{ color: C.lightBlue, fontSize: 15, lineHeight: 1.6 }}>
        Book a free 30-minute consultation with the people who make the calls.
      </div>
      <a
        href={BOOKING_URL}
        className="btn-soft"
        style={{
          marginTop: 10,
          background: C.cyan,
          color: C.navy,
          padding: "12px 22px",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14.5,
        }}
      >
        Book a Free Consultation &rarr;
      </a>
    </div>
  );
}

/** Small labelled contact link used in the mega-menu footer strip. */
function ContactBit({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.mute,
          marginBottom: 5,
        }}
      >
        {label}
      </div>
      <a
        href={href}
        className="hv-orange"
        style={{ color: C.navy, fontWeight: 600, fontSize: 15.5 }}
      >
        {value}
      </a>
    </div>
  );
}

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
  /** Which accordion section is expanded in the mobile menu. */
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  /** Viewport top of the header bar, so the mega-panel drops from exactly
   *  behind it (the bar's position varies: announcement bar above it on the
   *  home page, sticky offset, or pinned-to-top while open below 1200px). */
  const [panelTop, setPanelTop] = useState(16);

  /* Measured after the open state (and the <1200px pin class) hits the DOM
     but before paint, so the panel always lines up with where the bar is.
     Not reset on close — the panel retracts to the same spot it opened from. */
  useLayoutEffect(() => {
    if (open && headerRef.current) {
      setPanelTop(Math.round(headerRef.current.getBoundingClientRect().top));
    }
  }, [open]);

  /** Keeps the <1200px pinned-bar class on through the close animation, so
   *  the bar still covers the panel while it retracts up behind it. */
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    if (open) {
      setPinned(true);
      return;
    }
    const t = setTimeout(() => setPinned(false), 500);
    return () => clearTimeout(t);
  }, [open]);

  /** Collapse any expanded mobile accordion when the menu closes. */
  useEffect(() => {
    if (!open) setMobileSection(null);
  }, [open]);
  const pathname = usePathname();
  /** Marks the currently open page's link inside the dropdowns and mega-menu. */
  const linkClass = (href: string) =>
    pathname === href ? "mega-link mega-link--active" : "mega-link";

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
    /* Lock scrolling on the root element — it is the page's real scroller
       (html carries overflow-x: clip, so body's overflow never propagates
       to the viewport). Hiding overflow on <body> instead would make body
       the sticky bar's scrollport and un-stick it the moment the menu
       opens, dropping the logo and close button off screen. The padding
       compensates for the vanished scrollbar so the page doesn't shift. */
    const root = document.documentElement;
    const scrollbarGap = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbarGap > 0) document.body.style.paddingRight = `${scrollbarGap}px`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /** Staggered "lift and fade" applied to the bar's nav items while the
   *  mega-menu is open, so they clear out before the panel content lands. */
  const liftAway = (i: number, count: number): React.CSSProperties => {
    const delay = open ? i * 0.045 : (count - i) * 0.035;
    return {
      opacity: open ? 0 : 1,
      transform: open ? "translateY(-18px)" : "translateY(0)",
      visibility: open ? "hidden" : "visible",
      transition:
        `opacity 0.3s ease ${delay}s,` +
        ` transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s,` +
        ` visibility 0.3s linear ${delay}s`,
    };
  };

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "site-header",
          floating ? "site-header--floating" : "",
          pinned ? "site-header--menu-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
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
          aria-label="JCA-BNH — back to home"
          style={{ display: "flex", alignItems: "center" }}
          onMouseEnter={() => setDropdown(null)}
          onClick={() => {
            /* Close any open menu, and when already on the home page glide
               back up to the hero. The delay lets the menu's scroll lock
               release first, so the scroll isn't swallowed. */
            setOpen(false);
            setDropdown(null);
            if (pathname === "/") {
              setTimeout(
                () => window.scrollTo({ top: 0, behavior: "smooth" }),
                80,
              );
            }
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="JCA-BNH — Better at Money Matters"
            className="site-logo"
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
          {/* Nav items lift up and fade out while the mega-menu is open. */}
          <div
            aria-hidden={open}
            className="site-nav-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              flexWrap: "wrap",
              pointerEvents: open ? "none" : "auto",
            }}
          >
            {LINKS.map((l, i) => {
              const on = l.key === active;
              const hasDropdown = DROPDOWNS.some((d) => d.key === l.key);
              const showing = dropdown === l.key;
              return (
                <span
                  key={l.key}
                  onMouseEnter={() => setDropdown(hasDropdown ? l.key : null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    ...liftAway(i, LINKS.length),
                  }}
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
                ...liftAway(LINKS.length, LINKS.length),
              }}
            >
              Book a Free Consultation
            </a>
          </div>
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
              className="nav-dropdown"
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
                      columnWidth: 215,
                      columnCount: 3,
                      columnGap: 36,
                      fontSize: 15,
                    }}
                  >
                    {d.groups.map((g, gi) => (
                      <div
                        key={g.label}
                        style={{
                          breakInside: "avoid",
                          marginBottom: 26,
                          opacity: showing ? 1 : 0,
                          transform: showing ? "translateY(0)" : "translateY(10px)",
                          transition: `opacity 0.4s ease ${0.06 + gi * 0.06}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + gi * 0.06}s`,
                        }}
                      >
                        <GroupLabel>{g.label}</GroupLabel>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {g.links.map((l) => (
                            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                              {l.label}
                              {ARROW}
                            </Link>
                          ))}
                        </div>
                      </div>
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
                <div style={{ flex: "0 1 320px", display: "flex" }}>
                  <PromoCard show={showing} />
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

      {/* Mega-menu panel — unrolls downward out of the nav bar (Perks-style):
          the card is revealed top-to-bottom via clip-path, so it reads as the
          header bar itself extending, and retracts back up into it on close. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`mega-panel ${floating ? "mega-panel--floating" : "mega-panel--flush"}`}
        style={{
          position: "fixed",
          top: panelTop,
          maxHeight: `calc(100vh - ${panelTop + 20}px)`,
          zIndex: 49,
          background: "#FFFFFF",
          boxShadow: "0 24px 64px rgba(10,18,36,0.28)",
          overflowY: "auto",
          padding: "130px 48px 32px",
          display: "flex",
          flexDirection: "column",
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          pointerEvents: open ? "auto" : "none",
          transition: open
            ? "clip-path 0.7s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.7s linear"
            : "clip-path 0.45s cubic-bezier(0.6, 0, 0.3, 1), visibility 0.45s linear",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div
          onClick={(e) => {
            /* Close when any link inside the panel is clicked. */
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          style={{
            width: "100%",
            maxWidth: 1340,
            margin: "0 auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Phone layout: main rows only; the two service menus and About
              fold out as accordions instead of dumping every link at once.
              CSS swaps this in for .mega-grid at ≤700px. */}
          <div
            className="mm-menu"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.45s ease ${open ? 0.3 : 0}s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${open ? 0.3 : 0}s`,
            }}
          >
            {MOBILE_MENU.map((item) => {
              const expanded = mobileSection === item.key;
              return (
                <div key={item.key} className="mm-item">
                  <button
                    type="button"
                    className="mm-row"
                    aria-expanded={expanded}
                    onClick={() => setMobileSection(expanded ? null : item.key)}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <path d="M2 4l4 4 4-4" />
                    </svg>
                  </button>
                  <div className="mm-body" data-open={expanded ? "true" : "false"}>
                    <div className="mm-body-inner">
                      <div className="mm-body-pad">
                        {item.groups ? (
                          <>
                            {item.groups.map((g) => (
                              <div key={g.label} style={{ marginBottom: 18 }}>
                                <GroupLabel>{g.label}</GroupLabel>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    fontSize: 15,
                                  }}
                                >
                                  {g.links.map((l) => (
                                    <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                                      {l.label}
                                      {ARROW}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <Link href={item.href} className="mm-viewall">
                              View all {item.label.toLowerCase()} services →
                            </Link>
                          </>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                              fontSize: 15,
                            }}
                          >
                            {(item.links ?? []).map((l) => (
                              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                                {l.label}
                                {ARROW}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link href="/blog" className="mm-item mm-row">
              Blog
            </Link>
            <Link href="/contact" className="mm-item mm-row">
              Contact
            </Link>
            <a href={BOOKING_URL} className="btn-soft mm-cta">
              Book a Free Consultation &rarr;
            </a>
          </div>

          <div className="mega-grid" style={{ marginBottom: 40 }}>
            {MENU_COLUMNS.map((col, i) => (
              <div
                key={col.heading}
                className="mega-col"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(18px)",
                  transition: `opacity 0.45s ease ${open ? 0.3 + i * 0.08 : 0}s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${open ? 0.3 + i * 0.08 : 0}s`,
                }}
              >
                <ColumnHeading href={col.href}>{col.heading}</ColumnHeading>
                {col.groups ? (
                  /* Balanced newspaper columns: groups stack top-down and
                     split into even sub-columns when the track is wide
                     enough, so no group floats mid-air beside a taller one. */
                  <div
                    style={{
                      columnWidth: 180,
                      columnCount: col.groups.length > 3 ? 2 : 1,
                      columnGap: 36,
                    }}
                  >
                    {col.groups.map((g) => (
                      <div key={g.label} style={{ breakInside: "avoid", marginBottom: 26 }}>
                        <GroupLabel>{g.label}</GroupLabel>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            fontSize: 15,
                          }}
                        >
                          {g.links.map((l) => (
                            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                              {l.label}
                              {ARROW}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      fontSize: 15.5,
                    }}
                  >
                    {(col.links ?? []).map((l) => (
                      <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                        {l.label}
                        {ARROW}
                      </Link>
                    ))}
                  </div>
                )}
                {/* The promo card tucks under the short About column instead
                    of taking a grid track of its own. */}
                {i === 0 && (
                  <div style={{ marginTop: 30 }}>
                    <PromoCard show={open} delay={open ? 0.45 : 0} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              marginTop: "auto",
              paddingTop: 26,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px 48px",
              flexWrap: "wrap",
              opacity: open ? 1 : 0,
              transition: `opacity 0.45s ease ${open ? 0.62 : 0}s`,
            }}
          >
            <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
              <ContactBit
                label="Call us"
                value={PHONE_BRISBANE}
                href={`tel:${PHONE_BRISBANE.replace(/\s/g, "")}`}
              />
              <ContactBit label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactBit label="Our group" value="Visit BachRob" href={BACHROB_URL} />
            </div>
            <SocialLinks size={38} />
          </div>
        </div>
      </div>
    </>
  );
}
