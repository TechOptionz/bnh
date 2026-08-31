import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SocialLinks from "@/components/SocialLinks";
import { BOOKING_URL, C, EMAIL, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Ask a question, book a free consultation, or drop into one of our Queensland offices in Springwood, Noosaville or Maroochydore.",
};

const OFFICE_H: React.CSSProperties = {
  fontFamily: "var(--font-lexend), Lexend, sans-serif",
  fontWeight: 600,
  color: C.navy,
  letterSpacing: "-0.015em",
};

const mapEmbed = (address: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;

/** Address, phone and email lines shared by every office block. */
function OfficeDetails({ office }: { office: (typeof OFFICES)[number] }) {
  return (
    <>
      <p
        style={{
          margin: "0 0 14px",
          fontWeight: 700,
          color: C.navy,
          fontSize: 16.5,
          lineHeight: 1.5,
        }}
      >
        {office.address}
      </p>
      <p style={{ margin: "0 0 6px", fontSize: 15.5 }}>
        Ph:{" "}
        <a
          href={`tel:${office.tel}`}
          className="hv-orange"
          style={{
            color: C.navy,
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: 4,
          }}
        >
          {office.phone}
        </a>
      </p>
      <p style={{ margin: 0, fontSize: 15.5 }}>
        <a
          href={`mailto:${EMAIL}`}
          className="hv-orange"
          style={{
            color: C.navy,
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: 4,
          }}
        >
          {EMAIL}
        </a>
      </p>
    </>
  );
}

export default function ContactPage() {
  const [brisbane, ...others] = OFFICES;

  return (
    <>
      <PageHero
        active="contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Contact"
        intro="Ask a question, book a free consultation, or drop into one of our Queensland offices."
        introMaxWidth="60ch"
        padding="160px 5vw 64px"
        maxWidth={1200}
        titleClamp="clamp(38px,5vw,64px)"
      />

      {/* Main office + map */}
      <section style={{ padding: "clamp(52px,8vw,72px) 5vw 40px", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: "40px 64px",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                ...OFFICE_H,
                fontSize: "clamp(28px,3.2vw,40px)",
                margin: "0 0 24px",
              }}
            >
              {brisbane.name} office
            </h2>
            <OfficeDetails office={brisbane} />
            <a
              href={brisbane.map}
              className="btn-outline"
              style={{
                display: "inline-block",
                marginTop: 24,
                color: C.navy,
                border: `1.5px solid ${C.navy}`,
                padding: "12px 22px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14.5,
              }}
            >
              Get directions
            </a>
            <div style={{ marginTop: 34 }}>
              <div
                style={{
                  ...OFFICE_H,
                  fontSize: 17,
                  marginBottom: 6,
                }}
              >
                Reception hours
              </div>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6 }}>
                {brisbane.hours}
              </p>
            </div>

            <div style={{ marginTop: 30 }}>
              <SocialLinks label="Connect with us" size={42} />
            </div>
          </div>

          <iframe
            title={`Map — ${brisbane.name} office`}
            src={mapEmbed(brisbane.address)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              width: "100%",
              height: 460,
              border: "none",
              borderRadius: 16,
              display: "block",
            }}
          />
        </div>
      </section>

      {/* Other offices + enquiry card */}
      <section style={{ padding: "48px 5vw clamp(60px,9vw,88px)", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: "48px 64px",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {others.map((o) => (
              <div key={o.name}>
                <h2
                  style={{
                    ...OFFICE_H,
                    fontSize: "clamp(24px,2.6vw,32px)",
                    margin: "0 0 20px",
                  }}
                >
                  {o.name} office
                </h2>
                <OfficeDetails office={o} />
                <a
                  href={o.map}
                  className="btn-outline"
                  style={{
                    display: "inline-block",
                    marginTop: 20,
                    color: C.navy,
                    border: `1.5px solid ${C.navy}`,
                    padding: "11px 20px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Get directions
                </a>
              </div>
            ))}

            <div
              style={{
                background: C.navy,
                borderRadius: 16,
                padding: "28px 30px",
                color: C.lightBlue,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-lexend), Lexend, sans-serif",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  fontSize: 19,
                  margin: "0 0 8px",
                }}
              >
                Prefer to just book?
              </h3>
              <p style={{ margin: "0 0 18px", fontSize: 14.5, lineHeight: 1.6 }}>
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

            <p style={{ margin: 0, fontSize: 14.5 }}>
              Looking to join the team?{" "}
              <Link
                href="/careers"
                className="hv-orange"
                style={{ fontWeight: 700, color: C.orange }}
              >
                View careers &rarr;
              </Link>
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <SiteFooter omit={["contact"]} showTerms />
    </>
  );
}
