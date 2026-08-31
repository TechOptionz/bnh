import Link from "next/link";
import FooterLogo from "@/components/FooterLogo";
import SocialLinks from "@/components/SocialLinks";
import { ACC, FA, serviceGroups } from "@/lib/services";
import {
  BACHROB_URL,
  BOOKING_URL,
  C,
  DISCLAIMER,
  EMAIL,
  FSG_URL,
  HOURS,
  OFFICES,
  PHONE_BRISBANE,
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

/* Detailed service links, resolved once from the service catalog. */
const ACC_GROUPS = serviceGroups(ACC);
const groupLinks = (labels: string[]) =>
  ACC_GROUPS.filter((g) => labels.includes(g.label)).flatMap((g) => g.links);

const FA_LINKS = serviceGroups(FA).flatMap((g) => g.links);
const BUSINESS_LINKS = groupLinks(["Business", "Accounting"]);
const TAX_AUDIT_LINKS = groupLinks(["Taxation", "Audit"]);

const COL_HEADING: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: C.mute,
  marginBottom: 16,
};

const LINK: React.CSSProperties = {
  color: C.navy,
  fontWeight: 500,
  lineHeight: 1.45,
};

const COL: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: 11,
  fontSize: 15.5,
};

/** Column heading with a short orange accent bar. */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ ...COL_HEADING, marginBottom: 9 }}>{children}</div>
      <span
        style={{
          display: "block",
          width: 26,
          height: 3,
          borderRadius: 2,
          background: C.orange,
        }}
      />
    </div>
  );
}

/** One heading + link-list column. */
function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <ColHeading>{heading}</ColHeading>
      <div style={COL}>
        {links.map((l) =>
          l.external ? (
            <a key={l.href} href={l.href} className="hv-orange" style={LINK}>
              {l.label}
            </a>
          ) : (
            <Link key={l.href} href={l.href} className="hv-orange" style={LINK}>
              {l.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

/**
 * The site-wide footer — booking strip, detailed service directory,
 * oversized brand wordmark, then the legal strip.
 */
export default function SiteFooter({
  omit = [],
  showTerms: _showTerms = false,
}: {
  omit?: Key[];
  showTerms?: boolean;
}) {
  const explore: { href: string; label: string; external?: boolean }[] = [
    ...NAV.filter((l) => !omit.includes(l.key) && l.key !== "home"),
    { href: "/blog", label: "Blog" },
    { href: BACHROB_URL, label: "BachRob (sister firm)", external: true },
    { href: FSG_URL, label: "Financial Services Guide", external: true },
    { href: TERMS_URL, label: "Terms of Engagement", external: true },
  ];

  return (
    <footer
      style={{
        background: "#FFFFFF",
        color: C.navy,
        borderTop: `1px solid ${C.border}`,
        padding: "clamp(44px,6vw,64px) 5vw 24px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* ---- Booking strip --------------------------------------- */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px 32px",
            paddingBottom: 36,
            borderBottom: `1px solid ${C.border}`,
            marginBottom: 44,
          }}
        >
          <div>
            <div style={{ ...COL_HEADING, marginBottom: 10 }}>
              Book a consultation
            </div>
            <div
              style={{
                fontFamily: "var(--font-lexend), Lexend, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(20px,2.4vw,27px)",
                letterSpacing: "-0.01em",
                color: C.navy,
                lineHeight: 1.25,
              }}
            >
              Better at money matters &mdash; let&rsquo;s talk.
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 15,
                lineHeight: 1.55,
                color: C.body,
                maxWidth: 520,
              }}
            >
              The first 30-minute consultation is free &mdash; no cost, no
              obligation.
            </p>
          </div>
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <a
              href={BOOKING_URL}
              className="btn-orange"
              style={{
                background: C.orange,
                color: "#FFFFFF",
                padding: "14px 26px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15.5,
                display: "inline-block",
              }}
            >
              Book a Free Consultation &rarr;
            </a>
            <div style={{ marginTop: 10, fontSize: 13.5, color: C.body }}>
              or call{" "}
              <a
                href="tel:1300264346"
                className="hv-orange"
                style={{ color: C.navy, fontWeight: 700 }}
              >
                {PHONE_BRISBANE}
              </a>
            </div>
          </div>
        </div>

        {/* ---- Service directory + company + offices ---------------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(205px,100%),1fr))",
            gap: "40px 32px",
          }}
        >
          <LinkColumn heading="Financial Advice" links={FA_LINKS} />
          <LinkColumn heading="Business & Accounting" links={BUSINESS_LINKS} />
          <LinkColumn heading="Tax & Audit" links={TAX_AUDIT_LINKS} />
          <LinkColumn heading="Explore" links={explore} />

          <div>
            <ColHeading>Offices</ColHeading>
            <div
              style={{
                background: C.bgAlt,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 15,
                fontSize: 14.5,
                lineHeight: 1.55,
                color: C.body,
              }}
            >
              {OFFICES.map((o) => (
                <div key={o.name}>
                  <strong
                    style={{
                      color: C.navy,
                      fontFamily: "var(--font-lexend), Lexend, sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {o.name}
                  </strong>
                  <br />
                  <a
                    href={o.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hv-orange"
                    style={{ color: C.body }}
                  >
                    {o.name === "Maroochydore"
                      ? "2/68 Kingsford Smith Parade, QLD 4558"
                      : o.address}
                  </a>
                  <br />
                  <a
                    href={`tel:${o.tel}`}
                    className="hv-orange"
                    style={{ color: C.navy, fontWeight: 600 }}
                  >
                    {o.phone}
                  </a>
                </div>
              ))}
              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: 14,
                  fontSize: 13.5,
                }}
              >
                {HOURS}
                <br />
                <a
                  href={`mailto:${EMAIL}`}
                  className="hv-orange"
                  style={{ color: C.navy, fontWeight: 600 }}
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Oversized brand wordmark, assembled on scroll ------- */}
        <FooterLogo />

        {/* ---- Legal strip ----------------------------------------- */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 18 }}>
          <div style={{ marginBottom: 20 }}>
            <SocialLinks label="Follow us" size={40} />
          </div>
          <p
            style={{
              fontSize: 13.5,
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
              fontSize: 13.5,
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
