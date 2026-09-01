import KeyobLogo from "@/components/partners/KeyobLogo";
import PartnerDisclaimer from "@/components/partners/PartnerDisclaimer";
import { KEYOB_PARTNER, keyobPricingLabel } from "@/lib/partners";
import { C } from "@/lib/site";

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

const CAPABILITIES = [
  {
    t: "Websites & Digital Presence",
    c: C.cyan,
    d: "High-performing websites designed around your business, customers and enquiries.",
  },
  {
    t: "AI & Automation",
    c: C.orange,
    d: "Practical automation designed to reduce repetitive work and improve responsiveness.",
  },
  {
    t: "Business Systems",
    c: C.navy,
    d: "CRM, integrations and custom software that help the systems your business relies on work together.",
  },
];

const BENEFITS = [
  "Capture more enquiries",
  "Reduce repetitive admin",
  "Connect your business systems",
];

function Check() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: 999,
        background: "color-mix(in srgb, #12B7D6 14%, transparent)",
        color: C.teal,
        flexShrink: 0,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 12.5l5 5 10-11"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Homepage-only technology-partner section — JCA-BNH-led introduction of
 * KEYOB. Sits between "Partners & Platforms" and "Recent Blogs".
 */
export default function KeyobPartnerSection() {
  return (
    <section
      id="technology-partner"
      style={{
        position: "relative",
        padding: "clamp(56px,9vw,84px) 5vw clamp(60px,9vw,92px)",
        background: C.bgAlt,
        borderBottom: `1px solid ${C.border}`,
        overflow: "hidden",
      }}
    >
      {/* Soft brand wash, matching the other tinted home sections. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(640px 440px at 94% 0%, rgba(18,183,214,0.08), transparent 62%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        {/* Eyebrow */}
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
            {KEYOB_PARTNER.label}
          </span>
        </div>

        {/* Partnership lock-up: JCA-BNH leads, KEYOB is the named partner. */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#FFFFFF",
            border: `1px solid ${C.border}`,
            borderRadius: 999,
            padding: "8px 18px",
            marginBottom: 22,
          }}
        >
          <span
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              fontSize: 14,
              color: C.navy,
              letterSpacing: "0.02em",
            }}
          >
            JCA-BNH
          </span>
          <span aria-hidden style={{ color: C.mute, fontSize: 13 }}>
            &times;
          </span>
          <KeyobLogo height={13} />
        </div>

        <h2
          style={{
            fontFamily: LEXEND,
            fontWeight: 600,
            color: C.navy,
            fontSize: "clamp(27px,3.1vw,40px)",
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            margin: "0 0 14px",
          }}
        >
          Good businesses need good systems
          <span style={{ color: C.cyan }}>.</span>
        </h2>
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "62ch",
          }}
        >
          JCA-BNH clients can access specialist technology support through
          KEYOB, helping businesses build better websites, automate repetitive
          work and connect the systems they rely on.
        </p>

        {/* Three editorial capability items */}
        <div className="kbp-caps">
          {CAPABILITIES.map((cap, i) => (
            <article
              key={cap.t}
              className="kbp-cap"
              style={{ ["--accent" as string]: cap.c }}
            >
              <span
                aria-hidden
                style={{
                  fontFamily: LEXEND,
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  color: cap.c,
                  display: "block",
                  marginBottom: 12,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                style={{
                  fontFamily: LEXEND,
                  fontWeight: 600,
                  color: C.navy,
                  fontSize: 19,
                  letterSpacing: "-0.01em",
                  margin: "0 0 9px",
                }}
              >
                {cap.t}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.66 }}>
                {cap.d}
              </p>
            </article>
          ))}
        </div>

        {/* Client benefit */}
        <div className="kbp-offer">
          <div style={{ flex: 1, minWidth: 260 }}>
            <h3
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: 19,
                letterSpacing: "-0.01em",
                margin: "0 0 8px",
              }}
            >
              A benefit for JCA-BNH clients
            </h3>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65 }}>
              JCA-BNH clients receive preferred pricing on eligible KEYOB
              services, together with a complimentary first conversation.
            </p>
          </div>
          <span
            style={{
              flexShrink: 0,
              background: "color-mix(in srgb, #12B7D6 9%, #FFFFFF)",
              border: "1px solid color-mix(in srgb, #12B7D6 35%, #FFFFFF)",
              borderRadius: 999,
              padding: "9px 18px",
              fontSize: 14,
              fontWeight: 600,
              color: C.navy,
              whiteSpace: "nowrap",
            }}
          >
            {keyobPricingLabel()}
          </span>
        </div>

        {/* Short benefits */}
        <ul className="kbp-checks">
          {BENEFITS.map((b) => (
            <li key={b}>
              <Check />
              {b}
            </li>
          ))}
        </ul>

        {/* CTAs — deliberately quieter than the site's orange booking CTAs. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
            marginTop: 34,
          }}
        >
          <a
            href={KEYOB_PARTNER.introHref}
            target="_blank"
            rel="noopener noreferrer"
            className="kb-btn-navy"
            style={{
              background: C.navy,
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 999,
            }}
          >
            Request an introduction
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <a
            href={KEYOB_PARTNER.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{
              border: `1px solid ${C.borderInput}`,
              borderRadius: 999,
              padding: "12px 24px",
              fontWeight: 600,
              fontSize: 15,
              color: C.navy,
            }}
          >
            Explore KEYOB{" "}
            <span aria-hidden style={{ fontSize: 13 }}>
              &#8599;
            </span>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>

        <PartnerDisclaimer style={{ marginTop: 26, maxWidth: "78ch" }} />
      </div>
    </section>
  );
}
