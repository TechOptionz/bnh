import Link from "next/link";
import SiteHeader, { NavKey } from "@/components/SiteHeader";
import { C } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/** The dark gradient hero used at the top of every inner page.
 *  Renders the floating white navbar over itself, so pages using it
 *  should NOT also render <SiteHeader />. */
export default function PageHero({
  active = null,
  crumbs,
  title,
  intro,
  padding = "170px 5vw 64px",
  maxWidth = 1100,
  titleClamp = "clamp(34px,4vw,52px)",
  titleMaxWidth,
  introMaxWidth = "64ch",
  children,
}: {
  active?: NavKey;
  crumbs: Crumb[];
  title: React.ReactNode;
  intro?: React.ReactNode;
  padding?: string;
  maxWidth?: number;
  titleClamp?: string;
  titleMaxWidth?: string;
  introMaxWidth?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader floating active={active} />
      <section
        style={{
          position: "relative",
          background: `linear-gradient(120deg,${C.navy} 0%,${C.navyDeep} 100%)`,
          padding,
        }}
      >
      <div style={{ maxWidth, margin: "0 auto" }}>
        <div style={{ fontSize: 13.5, color: C.mute, marginBottom: 18 }}>
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span style={{ margin: "0 6px" }}>»</span>}
              {c.href ? (
                <Link href={c.href} className="crumb" style={{ color: C.mute }}>
                  {c.label}
                </Link>
              ) : (
                <span style={{ color: C.lightBlue }}>{c.label}</span>
              )}
            </span>
          ))}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-lexend), Lexend, sans-serif",
            fontWeight: 400,
            color: "#FFFFFF",
            fontSize: titleClamp,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            margin: intro || children ? "0 0 18px" : 0,
            maxWidth: titleMaxWidth,
          }}
        >
          {title}
        </h1>
        {intro && (
          <p
            style={{
              color: C.lightBlue,
              fontSize: 17.5,
              lineHeight: 1.7,
              margin: children ? "0 0 30px" : 0,
              maxWidth: introMaxWidth,
            }}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
    </>
  );
}
