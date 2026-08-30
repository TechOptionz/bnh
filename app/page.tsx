import Link from "next/link";
import HomeFooter from "@/components/HomeFooter";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SiteHeader from "@/components/SiteHeader";
import { BACHROB_URL, BOOKING_URL, C, POSTS } from "@/lib/site";

const EYEBROW_CHIP: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: 4,
  background: C.cyan,
  display: "inline-block",
  flexShrink: 0,
};

/** Small square chip + label, matching the services-page eyebrows. */
function Eyebrow({
  label,
  center = false,
}: {
  label: string;
  center?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "flex-start",
        gap: 10,
        marginBottom: 18,
      }}
    >
      <span style={EYEBROW_CHIP} />
      <span style={{ fontSize: 14.5, fontWeight: 600, color: C.body }}>
        {label}
      </span>
    </div>
  );
}

const H2: React.CSSProperties = {
  fontFamily: "var(--font-lexend), Lexend, sans-serif",
  fontWeight: 600,
  color: C.navy,
  fontSize: "clamp(27px,3.1vw,40px)",
  lineHeight: 1.18,
  letterSpacing: "-0.01em",
  margin: 0,
};

const PILL: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #DCE4EE",
  borderRadius: 999,
  padding: "5px 13px",
  fontSize: 13,
  color: C.navy,
};

const STATS = [
  { n: "300%", l: "growth in the past year" },
  { n: "4", l: "offices across Queensland" },
  { n: "12+", l: "qualified specialists" },
  { n: "30 min", l: "free first consultation" },
];

const PILLARS = [
  { t: "Affordability", c: C.cyan },
  { t: "Client Care", c: C.orange },
  { t: "Personalised Service", c: C.navy },
  { t: "Transparency", c: C.cyan },
  { t: "Integrity", c: C.orange },
  { t: "Expertise", c: C.navy },
];

const STEPS = [
  {
    t: "Free 30-min consultation",
    p: "It all begins when you book a free 30-minute consultation to discuss your financial or taxation matters. When you say yes, onboarding begins.",
  },
  {
    t: "Onboarding",
    p: "Onboarding usually takes 3–5 business days. We stay in touch and guide you through each step, keeping the paperwork as smooth and simple as possible.",
  },
  {
    t: "Matched to the right team",
    p: "Once we identify whether you need taxation or financial services, you're assigned to the right department and a dedicated accountant takes over.",
  },
  {
    t: "Ongoing dedicated support",
    p: "Your dedicated team delivers personalised service and continuous support — precision, care and clear communication every step of the way.",
  },
];

const PARTNERS = [
  { src: "/assets/partner-cpa.png", alt: "CPA Australia" },
  { src: "/assets/partner-xero.png", alt: "Xero" },
  { src: "/assets/partner-myob.png", alt: "MYOB" },
  { src: "/assets/partner-quickbooks.png", alt: "Intuit QuickBooks" },
  { src: "/assets/partner-quickfee.png", alt: "QuickFee" },
  { src: "/assets/partner-taxdome.png", alt: "TaxDome" },
];

export default function HomePage() {
  return (
    <>
      {/* Announcement bar */}
      <div
        style={{
          background: C.navyDeep,
          color: C.lightBlue,
          fontSize: 13.5,
          padding: "9px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <span>
          <strong style={{ color: C.cyan }}>News:</strong> We have grown 300%
          this year and welcomed Bachmann Robinson (BachRob) as a sister firm
          &mdash; now open in Ipswich, Springwood, Noosaville &amp; Maroochydore.
        </span>
        <a
          href={BACHROB_URL}
          className="hv-orange"
          style={{ color: "#FFFFFF", fontWeight: 700, whiteSpace: "nowrap" }}
        >
          Visit BachRob &rarr;
        </a>
      </div>

      <SiteHeader floating />

      {/* Hero — full-bleed media with floating white navbar */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero-team-wide.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(18,32,60,0.05) 30%, rgba(18,32,60,0.62) 100%)",
          }}
        />

        {/* Bottom-left copy */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "180px 3vw 48px",
            maxWidth: "72%",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(17px,1.6vw,22px)",
              fontWeight: 600,
              lineHeight: 1.5,
              marginBottom: 14,
            }}
          >
            Accountants &amp; Financial Advisers.
            <br />
            Trusted across Queensland.
          </div>
          <h1
            style={{
              fontFamily: "var(--font-lexend), Lexend, sans-serif",
              fontWeight: 400,
              color: "#FFFFFF",
              fontSize: "clamp(44px,6.5vw,96px)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Better at <span style={{ color: C.orange }}>money matters</span>.
          </h1>
        </div>

        {/* Bottom-right cyan card */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <a
            href={BOOKING_URL}
            style={{
              display: "block",
              background: C.cyan,
              borderTopLeftRadius: 32,
              padding: "44px 46px 52px 42px",
              width: "min(360px, 86vw)",
              fontFamily: "var(--font-lexend), Lexend, sans-serif",
              fontWeight: 600,
              color: C.navyDeep,
              fontSize: "clamp(24px,2.3vw,32px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Book a Free 30-Min Consultation &rarr;
          </a>
        </div>
      </section>

      {/* Stats strip */}
      <section
        style={{
          background: "#FFFFFF",
          borderBottom: `1px solid ${C.border}`,
          padding: "40px 5vw",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            gap: 34,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {STATS.map((s) => (
            <div key={s.n}>
              <div
                style={{
                  fontFamily: "var(--font-lexend), Lexend, sans-serif",
                  fontWeight: 600,
                  fontSize: 28,
                  color: C.navy,
                }}
              >
                {s.n}
              </div>
              <div style={{ fontSize: 13.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        style={{ padding: "80px 5vw", background: "#FFFFFF" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <Eyebrow label="Our Services" />
            <h2 style={{ ...H2, margin: "0 0 14px" }}>
              Two divisions, one goal: your financial well-being
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, margin: 0 }}>
              Our team consists of subject specialists with extensive global
              experience across industries, caring for clients and creating a
              positive impact on their financial well-being.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 24,
            }}
          >
            <div
              style={{
                background: C.bgAlt,
                borderRadius: 14,
                padding: "34px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  background: C.cyan,
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-lexend), Lexend, sans-serif",
                  fontWeight: 600,
                  color: C.navy,
                  fontSize: 23,
                  margin: 0,
                }}
              >
                Financial Advice
              </h3>
              <p style={{ margin: 0, lineHeight: 1.65 }}>
                Strategic financial advice and solutions to meet your objectives
                &mdash; from budgeting and retirement planning to estate
                planning, superannuation and investment advice.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "Retirement",
                  "Super & SMSF",
                  "Insurance",
                  "Investments",
                  "Estate Planning",
                ].map((t) => (
                  <span key={t} style={PILL}>
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/financial-advice"
                className="hv-orange"
                style={{ fontWeight: 700, color: C.orange, marginTop: "auto" }}
              >
                Learn more &rarr;
              </Link>
            </div>

            <div
              style={{
                background: C.bgAlt,
                borderRadius: 14,
                padding: "34px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  background: C.orange,
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-lexend), Lexend, sans-serif",
                  fontWeight: 600,
                  color: C.navy,
                  fontSize: 23,
                  margin: 0,
                }}
              >
                Tax &amp; Accounting
              </h3>
              <p style={{ margin: 0, lineHeight: 1.65 }}>
                A comprehensive range of tax, accounting and advisory services
                for clients Australia-wide &mdash; taxation strategy,
                bookkeeping, audit, business advisory and more.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "Taxation",
                  "Bookkeeping & Payroll",
                  "Audit",
                  "Virtual CFO",
                  "SMSF",
                ].map((t) => (
                  <span key={t} style={PILL}>
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/accounting"
                className="hv-orange"
                style={{ fontWeight: 700, color: C.orange, marginTop: "auto" }}
              >
                Learn more &rarr;
              </Link>
            </div>

            <div
              style={{
                background: C.navy,
                borderRadius: 14,
                padding: "34px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                color: C.lightBlue,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  background: C.cyan,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-lexend), Lexend, sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                30&#39;
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-lexend), Lexend, sans-serif",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  fontSize: 23,
                  margin: 0,
                }}
              >
                Free Consultation
              </h3>
              <p style={{ margin: 0, lineHeight: 1.65 }}>
                Not sure where to start? Schedule a free 30-minute consultation
                with one of our expert advisers and we&#39;ll tailor an offer
                to your needs &mdash; no obligation.
              </p>
              <a
                href={BOOKING_URL}
                className="btn-orange"
                style={{
                  background: C.orange,
                  color: "#FFFFFF",
                  padding: "13px 24px",
                  borderRadius: 8,
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: "72px 5vw", background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <Eyebrow label="Our Specialty" />
              <h2 style={H2}>The pillars we stand by</h2>
            </div>
            <p
              style={{
                maxWidth: 420,
                margin: 0,
                lineHeight: 1.6,
                fontSize: 15.5,
              }}
            >
              Our team has shared values &mdash; six pillars that shape every
              engagement, from a first tax return to a full corporate
              restructure.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 16,
            }}
          >
            {PILLARS.map((p) => (
              <div
                key={p.t}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "24px 22px",
                  borderTop: `3px solid ${p.c}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-lexend), Lexend, sans-serif",
                    fontWeight: 600,
                    color: C.navy,
                    fontSize: 17,
                  }}
                >
                  {p.t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section style={{ padding: "80px 5vw", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <Eyebrow label="How We Work" />
            <h2 style={H2}>From first call to dedicated team, in four steps</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 22,
            }}
          >
            {STEPS.map((s, i) => (
              <div
                key={s.t}
                style={{
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "28px 26px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-lexend), Lexend, sans-serif",
                    fontWeight: 800,
                    fontSize: 15,
                    color: "#FFFFFF",
                    background: C.orange,
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-lexend), Lexend, sans-serif",
                    fontWeight: 600,
                    color: C.navy,
                    fontSize: 18,
                    margin: "0 0 10px",
                  }}
                >
                  {s.t}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>
                  {s.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section
        style={{
          padding: "84px 0 92px",
          background: "#FFFFFF",
          borderBottom: "1px solid #EEF2F7",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto 44px",
            padding: "0 5vw",
            textAlign: "center",
          }}
        >
          <Eyebrow label="Our Partners & Platforms" center />
          <h2 style={H2}>Trusted tools, trusted accreditations</h2>
        </div>
        <div className="partner-marquee">
          <div className="partner-marquee-track">
            {/* Four copies: the first half fills even ultrawide screens, the
                second half is what slides in behind it, so the loop never gaps. */}
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${p.alt}-${i}`}
                src={p.src}
                alt={p.alt}
                aria-hidden={i >= PARTNERS.length}
                loading="eager"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent blogs */}
      <section style={{ padding: "80px 5vw", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            <div>
              <Eyebrow label="Recent Blogs" />
              <h2 style={H2}>Insights from our advisers</h2>
            </div>
            <Link
              href="/blog"
              className="hv-orange"
              style={{ fontWeight: 700, color: C.orange }}
            >
              View all posts &rarr;
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {POSTS.slice(0, 3).map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="card-hover"
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  color: "inherit",
                }}
              >
                {p.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.img}
                    alt={p.alt}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <ImagePlaceholder ratio="16 / 9" radius={0} />
                )}
                <div
                  style={{
                    padding: "22px 24px 26px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 13, color: C.mute, fontWeight: 600 }}>
                    {p.date}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-lexend), Lexend, sans-serif",
                      fontWeight: 600,
                      color: C.navy,
                      fontSize: 19,
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
                    {p.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BachRob banner */}
      <section
        style={{
          position: "relative",
          backgroundImage: "url('/assets/hero-team-wide.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "230px 5vw 56px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,18,36,0.68)",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-lexend), Lexend, sans-serif",
              fontWeight: 600,
              color: "#FFFFFF",
              fontSize: "clamp(20px,2.4vw,28px)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1.6,
            }}
          >
            We proudly welcome BachRob to the JCA-BNH family.
          </div>
          <a
            href={BACHROB_URL}
            className="btn-white"
            style={{
              background: "#FFFFFF",
              color: C.navy,
              padding: "14px 30px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Visit BachRob
          </a>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        style={{
          padding: "76px 5vw",
          background: `linear-gradient(120deg,${C.navy} 0%,${C.navyDeep} 100%)`,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-lexend), Lexend, sans-serif",
              fontWeight: 600,
              color: "#FFFFFF",
              fontSize: "clamp(28px,3.4vw,42px)",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              margin: "0 0 16px",
            }}
          >
            Ready to get better at money matters?
          </h2>
          <p
            style={{
              color: C.lightBlue,
              fontSize: 17,
              lineHeight: 1.65,
              margin: "0 0 30px",
            }}
          >
            Book your free 30-minute consultation &mdash; we&#39;ll listen,
            then tailor a plan for your tax, accounting or financial goals.
          </p>
          <a
            href={BOOKING_URL}
            className="btn-orange"
            style={{
              background: C.orange,
              color: "#FFFFFF",
              padding: "16px 34px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 17,
              display: "inline-block",
            }}
          >
            Book a Free Consultation
          </a>
          <div style={{ color: C.mute, fontSize: 13.5, marginTop: 18 }}>
            No cost, no obligation &middot; 1300 264 346
          </div>
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
