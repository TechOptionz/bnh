import type { Metadata } from "next";
import CareerForm from "@/components/CareerForm";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import { C, PHONE_BRISBANE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Looking for a career in accounting or financial planning? We've grown 300% in a year and we're always keen to hear from talented people.",
};

const REASONS = [
  "A fast-growing firm — 300% growth and four QLD offices",
  "Mentorship from CPAs, CAs and Big-4 alumni",
  "Varied work across tax, audit, SMSF and advisory",
  "Modern cloud tooling: Xero, MYOB, QuickBooks, TaxDome",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Career" }]}
        title="Your first steps towards a career at JCA-BNH"
        intro="Looking for a career in accounting or financial planning? We've grown 300% in a year and we're always keen to hear from talented people. Tell us about yourself below."
        padding="160px 5vw 56px"
        maxWidth={1140}
        titleClamp="clamp(32px,3.8vw,48px)"
        introMaxWidth="62ch"
      />

      <section style={{ padding: "72px 5vw", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 800,
                color: C.navy,
                fontSize: 26,
                margin: "0 0 22px",
              }}
            >
              Express your interest
            </h2>
            <CareerForm />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 420,
            }}
          >
            <div
              style={{
                background: C.bgAlt,
                borderRadius: 12,
                padding: "26px 28px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: C.navy,
                  fontSize: 18,
                  margin: "0 0 10px",
                }}
              >
                Why JCA-BNH?
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 14.5,
                  lineHeight: 1.6,
                }}
              >
                {REASONS.map((r) => (
                  <div
                    key={r}
                    style={{ display: "flex", gap: 12, alignItems: "baseline" }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: C.cyan,
                        flexShrink: 0,
                      }}
                    />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "24px 26px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: C.navy,
                  fontSize: 16,
                  margin: "0 0 6px",
                }}
              >
                Questions?
              </h3>
              <a
                href="tel:1300264346"
                className="hv-orange"
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: C.orange,
                }}
              >
                {PHONE_BRISBANE}
              </a>
              <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.55 }}>
                We&#39;re here Monday &ndash; Friday, 8am &ndash; 5pm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter omit={["about"]} />
    </>
  );
}
