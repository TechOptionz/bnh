import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import {
  BACHROB_URL,
  BOOKING_URL,
  C,
  DISCLAIMER,
  EMAIL,
  FSG_URL,
  OFFICES,
  PHONE_BRISBANE,
  PHONE_SUNSHINE,
  TERMS_URL,
} from "@/lib/site";

type Key = "home" | "financial-advice" | "accounting" | "about" | "contact";

const NAV: { key: Key; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Home" },
  { key: "financial-advice", href: "/financial-advice", label: "Financial Advice" },
  { key: "accounting", href: "/accounting", label: "Accounting, Tax & Advisory" },
  { key: "about", href: "/about", label: "About Us" },
  { key: "contact", href: "/contact", label: "Contact & Careers" },
];

const COL_HEADING: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: C.mute,
  marginBottom: 14,
};

const LINK: React.CSSProperties = { color: C.navy, fontWeight: 500 };

const COL: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: 9,
  fontSize: 14.5,
};

/**
 * The site-wide footer — white ground, navy type, and an oversized brand
 * wordmark spanning the full width above the legal strip.
 */
export default function SiteFooter({
  omit = [],
  showTerms: _showTerms = false,
}: {
  omit?: Key[];
  showTerms?: boolean;
}) {
  const nav = NAV.filter((l) => !omit.includes(l.key));

  return (
    <footer
      style={{
        background: "#FFFFFF",
        color: C.navy,
        borderTop: `1px solid ${C.border}`,
        padding: "48px 5vw 24px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* ---- Link columns ---------------------------------------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,100%),1fr))",
            gap: "36px 36px",
            marginBottom: 40,
          }}
        >
          <div>
            <div style={COL_HEADING}>Book a consultation</div>
            <a
              href={BOOKING_URL}
              className="hv-orange"
              style={{
                fontFamily: "var(--font-lexend), Lexend, sans-serif",
                fontWeight: 600,
                fontSize: 17,
                color: C.navy,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Book a Free Consultation <span aria-hidden>&rarr;</span>
            </a>
          </div>

          <div>
            <div style={COL_HEADING}>Services</div>
            <div style={COL}>
              {nav.map((l) => (
                <Link key={l.key} href={l.href} className="hv-orange" style={LINK}>
                  {l.label}
                </Link>
              ))}
              <Link href="/blog" className="hv-orange" style={LINK}>
                Blog
              </Link>
              <a href={BACHROB_URL} className="hv-orange" style={LINK}>
                BachRob (sister firm)
              </a>
            </div>
          </div>

          <div>
            <div style={COL_HEADING}>Get in touch</div>
            <div style={COL}>
              <a href="tel:1300264346" className="hv-orange" style={LINK}>
                {PHONE_BRISBANE} (Brisbane)
              </a>
              <a href="tel:0754735444" className="hv-orange" style={LINK}>
                {PHONE_SUNSHINE} (Sunshine Coast)
              </a>
              <a href={`mailto:${EMAIL}`} className="hv-orange" style={LINK}>
                {EMAIL}
              </a>
              <a href={FSG_URL} className="hv-orange" style={LINK}>
                Financial Services Guide
              </a>
              <a href={TERMS_URL} className="hv-orange" style={LINK}>
                Terms of Engagement
              </a>
            </div>
          </div>

          <div>
            <div style={COL_HEADING}>Offices</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                fontSize: 13.5,
                lineHeight: 1.55,
                color: C.body,
              }}
            >
              {OFFICES.map((o) => (
                <div key={o.name}>
                  <strong style={{ color: C.navy }}>{o.name}</strong>
                  <br />
                  {o.name === "Maroochydore"
                    ? "2/68 Kingsford Smith Parade, QLD 4558"
                    : o.address}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Oversized brand wordmark ---------------------------- */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo.png"
          alt="JCA-BNH — Better at Money Matters"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "100%",
            height: "clamp(140px, 32vh, 340px)",
            objectFit: "contain",
            margin: "0 auto 24px",
          }}
        />

        {/* ---- Legal strip ----------------------------------------- */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 18 }}>
          <div style={{ marginBottom: 20 }}>
            <SocialLinks label="Follow us" size={40} />
          </div>
          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.6,
              color: C.body,
              margin: "0 0 14px",
              maxWidth: 880,
            }}
          >
            <strong style={{ color: C.navy }}>Disclaimer</strong> — {DISCLAIMER}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px 24px",
              flexWrap: "wrap",
              fontSize: 12.5,
              color: C.body,
            }}
          >
            <div>&copy; 2026 JCA-BNH. All rights reserved.</div>
            <div
              style={{
                fontSize: 11.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.mute,
              }}
            >
              Better at Money Matters
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
