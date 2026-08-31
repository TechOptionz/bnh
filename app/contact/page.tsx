import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import OfficesMap from "@/components/OfficesMap";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SocialLinks from "@/components/SocialLinks";
import {
  BOOKING_URL,
  C,
  EMAIL,
  HOURS,
  PHONE_BRISBANE,
  PHONE_SUNSHINE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Ask a question, book a free consultation, or drop into one of our Queensland offices in Springwood, Noosaville or Maroochydore.",
};

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

/** Small square chip + label, matching the eyebrows used across inner pages. */
function Eyebrow({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18,
      }}
    >
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 4,
          background: C.cyan,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 14.5, fontWeight: 600, color: C.body }}>
        {label}
      </span>
    </div>
  );
}

const ICONS = {
  phone: (
    <path
      d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L15 13l4 1.5V18a2 2 0 0 1-2 2A13 13 0 0 1 4 7a2 2 0 0 1 1-3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  mail: (
    <>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="m4.5 7.5 7.5 5.5 7.5-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  clock: (
    <>
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
} as const;

/** Icon chip + label + value rows for the direct-contact channels. */
function ContactRow({
  icon,
  label,
  children,
}: {
  icon: keyof typeof ICONS;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <span
        aria-hidden="true"
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: "#E7F6FB",
          color: C.teal,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          {ICONS[icon]}
        </svg>
      </span>
      <div style={{ paddingTop: 2 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.mute,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 15.5, lineHeight: 1.6, color: C.body }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const TEL_LINK: React.CSSProperties = {
  color: C.navy,
  fontWeight: 600,
  textDecoration: "underline",
  textUnderlineOffset: 4,
};

export default function ContactPage() {
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

      {/* Get in touch — contact channels + booking beside the enquiry form */}
      <section
        style={{
          padding: "clamp(56px,8vw,84px) 5vw clamp(60px,9vw,92px)",
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: "56px 84px",
            alignItems: "start",
          }}
        >
          <div>
            <Eyebrow label="We're here to help" />
            <h2
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: "clamp(30px,3.4vw,42px)",
                lineHeight: 1.14,
                letterSpacing: "-0.01em",
                margin: "0 0 18px",
              }}
            >
              We&rsquo;d love to hear from you
            </h2>
            <p
              style={{
                margin: "0 0 34px",
                fontSize: 16.5,
                lineHeight: 1.75,
                maxWidth: "52ch",
              }}
            >
              Whether it&rsquo;s a quick question about tax, a business idea you
              want to pressure-test, or a full financial plan &mdash; reach out
              however suits you best.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                marginBottom: 36,
              }}
            >
              <ContactRow icon="phone" label="Call us">
                Brisbane{" "}
                <a href="tel:1300264346" className="hv-orange" style={TEL_LINK}>
                  {PHONE_BRISBANE}
                </a>
                <br />
                Sunshine Coast{" "}
                <a href="tel:0754735444" className="hv-orange" style={TEL_LINK}>
                  {PHONE_SUNSHINE}
                </a>
              </ContactRow>
              <ContactRow icon="mail" label="Email us">
                <a
                  href={`mailto:${EMAIL}`}
                  className="hv-orange"
                  style={TEL_LINK}
                >
                  {EMAIL}
                </a>
              </ContactRow>
              <ContactRow icon="clock" label="Reception hours">
                {HOURS}
                <br />
                All offices
              </ContactRow>
            </div>

            <div
              style={{
                background: C.navy,
                borderRadius: 16,
                padding: "28px 30px",
                color: C.lightBlue,
                marginBottom: 30,
              }}
            >
              <h3
                style={{
                  fontFamily: LEXEND,
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

            <SocialLinks label="Connect with us" size={42} />

            <p style={{ margin: "26px 0 0", fontSize: 14.5 }}>
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

      {/* Our offices — intro band, then one full-width section per office */}
      <section
        style={{
          padding: "clamp(54px,8vw,76px) 5vw 0",
          background: C.bgAlt,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 640 }}>
            <Eyebrow label="Visit us in person" />
            <h2
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: "clamp(28px,3vw,38px)",
                lineHeight: 1.18,
                letterSpacing: "-0.01em",
                margin: "0 0 16px",
              }}
            >
              Our offices
            </h2>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75 }}>
              Three locations across South East Queensland &mdash; drop in for a
              chat or find the office nearest to you.
            </p>
          </div>
        </div>
      </section>
      <OfficesMap />

      <SiteFooter omit={["contact"]} showTerms />
    </>
  );
}
