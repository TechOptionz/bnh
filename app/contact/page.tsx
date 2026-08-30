import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { BOOKING_URL, C, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Ask a question, book a free consultation, or drop into one of our Queensland offices in Springwood, Noosaville or Maroochydore.",
};

const H2: React.CSSProperties = {
  fontFamily: "var(--font-archivo), Archivo, sans-serif",
  fontWeight: 800,
  color: C.navy,
  fontSize: 26,
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader active="contact" />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        title="Let's talk money matters"
        introMaxWidth="60ch"
        intro="Ask a question, book a free consultation, or drop into one of our Queensland offices."
      />

      <section style={{ padding: "72px 5vw", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            <h2 style={{ ...H2, margin: "0 0 22px" }}>Ask a question</h2>
            <EnquiryForm />

            <div
              style={{
                background: C.bgAlt,
                borderRadius: 12,
                padding: 24,
                marginTop: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: C.navy,
                  fontSize: 17,
                  margin: "0 0 8px",
                }}
              >
                Careers at JCA-BNH
              </h3>
              <p style={{ margin: "0 0 10px", fontSize: 14.5, lineHeight: 1.6 }}>
                We&#39;re growing fast and always keen to hear from talented
                accountants and advisers.
              </p>
              <Link
                href="/careers"
                className="hv-orange"
                style={{ fontWeight: 700, color: C.orange }}
              >
                View careers &rarr;
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 style={{ ...H2, margin: "0 0 4px" }}>Our offices</h2>
            {OFFICES.map((o) => (
              <div
                key={o.name}
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
                    fontSize: 18,
                    margin: "0 0 6px",
                  }}
                >
                  {o.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                  }}
                >
                  {o.address}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    flexWrap: "wrap",
                    fontSize: 14.5,
                    fontWeight: 700,
                  }}
                >
                  <a
                    href={`tel:${o.tel}`}
                    className="hv-orange"
                    style={{ color: C.orange }}
                  >
                    {o.phone}
                  </a>
                  <a href={o.map} style={{ color: C.teal }}>
                    Get directions &rarr;
                  </a>
                </div>
              </div>
            ))}

            <div
              style={{
                background: C.navy,
                borderRadius: 12,
                padding: "26px 28px",
                color: C.lightBlue,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontSize: 18,
                  margin: "0 0 8px",
                }}
              >
                Prefer to just book?
              </h3>
              <p
                style={{ margin: "0 0 16px", fontSize: 14.5, lineHeight: 1.6 }}
              >
                Skip the form &mdash; grab a free 30-minute consultation slot
                that suits you.
              </p>
              <a
                href={BOOKING_URL}
                className="btn-cyan"
                style={{
                  background: C.cyan,
                  color: C.navyFooter,
                  padding: "12px 22px",
                  borderRadius: 8,
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter omit={["contact"]} showTerms />
    </>
  );
}
