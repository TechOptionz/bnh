import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER, keyobOfferBadge } from "@/lib/partners";

const SYSTEM = [
  {
    t: "Website",
    d: "A site built to turn visitors into enquiries — not just to look tidy.",
  },
  {
    t: "Aleesa.ai",
    d: "An AI assistant that answers calls, emails and messages around the clock.",
  },
  {
    t: "Connected CRM",
    d: "One place where every lead and conversation is captured automatically.",
  },
];

const CAPABILITIES = [
  "AI & Automation",
  "Social Media Management",
  "Website Design",
  "Custom Software",
  "CRM Setup",
  "System Integrations",
  "ERP Systems",
  "Dashboards & Reporting",
  "Mobile Apps",
  "Cloud & Hosting",
  "Discovery & Scoping",
  "Ongoing Support",
];

const BENEFITS = [
  {
    t: "Stop losing enquiries",
    d: "Every call, email and web enquiry answered and captured — including after hours and weekends.",
  },
  {
    t: "Less manual admin",
    d: "Automate the repetitive work your team is still doing by hand, and give those hours back.",
  },
  {
    t: "A presence that keeps up",
    d: "Social media managed and posting consistently, without it eating into your week.",
  },
  {
    t: "Numbers you can trust",
    d: "Clean, connected data means you and your accountant are always working from the same figures.",
  },
];

const STEPS = ["Free chat", "We scope it", "They build it", "Ongoing support"];

function Tick() {
  return (
    <span className="kbp-tick" aria-hidden>
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
 * Homepage-only IT-partner section — JCA-BNH-led introduction of KEYOB.
 * Sits between "Partners & Platforms" and "Recent Blogs". Both CTAs go
 * off-site: "Talk to KEYOB" to the contact page, the ghost button to the
 * homepage.
 */
export default function KeyobPartnerSection() {
  return (
    <section id="it-partner" className="kbp-section">
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

      <div className="kbp-wrap">
        {/* Partnership lock-up: JCA-BNH leads, KEYOB is the named partner. */}
        <span className="kbp-lockup">
          <span className="kbp-dot" aria-hidden />
          JCA-BNH
          <span className="kbp-lockup-x" aria-hidden>
            &times;
          </span>
          <KeyobLogo height={13} />
        </span>

        <h2 className="kbp-h2">
          We advise on your systems.
          <br />
          KEYOB builds them<span className="kbp-accent">.</span>
        </h2>

        <p className="kbp-lede">
          Good numbers depend on good systems. We&rsquo;ve partnered with KEYOB
          &mdash; an Australian software, AI and digital marketing team based
          in Springwood &mdash; so our clients have a trusted place to turn for
          the technology side of their business.
        </p>

        {/* Offer */}
        <div className="kbp-offer">
          <span className="kbp-offer-badge">{keyobOfferBadge()}</span>
          <p className="kbp-offer-text">
            <strong>Exclusive to JCA-BNH clients.</strong> Mention us when you
            get in touch, or ask your adviser for an introduction. The first
            conversation is free and there&rsquo;s no obligation.
          </p>
        </div>

        {/* The three-part system */}
        <div className="kbp-sys">
          {SYSTEM.map((s, i) => (
            <article key={s.t} className="kbp-sys-card">
              <span className="kbp-sys-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
        <p className="kbp-sys-note">
          KEYOB call this the Digital Growth System &mdash; the foundation
          every client starts with.
        </p>

        {/* Capabilities */}
        <ul className="kbp-chips" aria-label="KEYOB capabilities">
          {CAPABILITIES.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        {/* Benefits */}
        <div className="kbp-grid">
          {BENEFITS.map((b) => (
            <article key={b.t} className="kbp-card">
              <h3>
                <Tick />
                {b.t}
              </h3>
              <p>{b.d}</p>
            </article>
          ))}
        </div>

        {/* Steps */}
        <ol className="kbp-steps" aria-label="How it works">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={
                i === STEPS.length - 1 ? "kbp-step kbp-step--last" : "kbp-step"
              }
            >
              <span className="kbp-step-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="kbp-cta">
          <div>
            <h3>
              Ready to look at your systems
              <span className="kbp-accent">?</span>
            </h3>
            <p>
              Book a chat with KEYOB, or mention it at your next appointment
              and we&rsquo;ll make the introduction for you.
            </p>
          </div>
          <div className="kbp-actions">
            <a
              href={KEYOB_PARTNER.contactHref}
              target="_blank"
              rel="noopener"
              className="kbp-btn kbp-btn-primary"
            >
              Talk to KEYOB
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a
              href={KEYOB_PARTNER.website}
              target="_blank"
              rel="noopener"
              className="kbp-btn kbp-btn-ghost"
            >
              Visit keyob.com
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <p className="kbp-fineprint">{KEYOB_PARTNER.disclaimer}</p>
      </div>
    </section>
  );
}
