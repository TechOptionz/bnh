import Link from "next/link";
import {
  C,
  DISCLAIMER,
  EMAIL,
  FSG_URL,
  PHONE_BRISBANE,
  TERMS_URL,
} from "@/lib/site";

type Key = "home" | "financial-advice" | "accounting" | "about" | "contact";

const ALL: { key: Key; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Home" },
  { key: "financial-advice", href: "/financial-advice", label: "Financial Advice" },
  { key: "accounting", href: "/accounting", label: "Accounting & Tax" },
  { key: "about", href: "/about", label: "About Us" },
  { key: "contact", href: "/contact", label: "Contact" },
];

/** The compact footer used on every page except the home page. */
export default function SiteFooter({
  omit = [],
  showTerms = false,
}: {
  omit?: Key[];
  showTerms?: boolean;
}) {
  const links = ALL.filter((l) => !omit.includes(l.key));

  return (
    <footer
      style={{
        background: C.navyFooter,
        color: C.footerText,
        padding: "48px 5vw 28px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            alignItems: "start",
            marginBottom: 32,
          }}
        >
          <div style={{ maxWidth: 360 }}>
            <div
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 800,
                color: "#FFFFFF",
                fontSize: 19,
              }}
            >
              JCA-BNH
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.cyan,
                margin: "4px 0 12px",
              }}
            >
              Better at Money Matters
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
              Tailored accounting, taxation, advisory and financial advice for
              businesses and individuals.
            </p>
          </div>
          <div
            style={{ display: "flex", gap: 48, flexWrap: "wrap", fontSize: 14 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  className="hv-orange"
                  style={{ color: C.lightBlue }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a
                href="tel:1300264346"
                className="hv-orange"
                style={{ color: C.lightBlue }}
              >
                {PHONE_BRISBANE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="hv-orange"
                style={{ color: C.lightBlue }}
              >
                {EMAIL}
              </a>
              <a href={FSG_URL} className="hv-orange" style={{ color: C.lightBlue }}>
                Financial Services Guide
              </a>
              {showTerms && (
                <a
                  href={TERMS_URL}
                  className="hv-orange"
                  style={{ color: C.lightBlue }}
                >
                  Terms of Engagement
                </a>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: `1px solid ${C.footerRule}`,
            paddingTop: 20,
            fontSize: 12.5,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: C.lightBlue }}>Disclaimer</strong> —{" "}
          {DISCLAIMER}
        </div>
      </div>
    </footer>
  );
}
