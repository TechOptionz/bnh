import Link from "next/link";
import HomeFooter from "@/components/HomeFooter";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import KeyobPartnerBanner from "@/components/partners/KeyobPartnerBanner";
import KeyobPartnerSection from "@/components/partners/KeyobPartnerSection";
import KeyobAnnounceBanner from "@/components/partners/KeyobAnnounceBanner";
import ServiceCards from "@/components/ServiceCards";
import SiteHeader from "@/components/SiteHeader";
import StatsStrip from "@/components/StatsStrip";
import { BACHROB_URL, BOOKING_URL, C, POSTS } from "@/lib/site";

const EYEBROW_CHIP: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: 4,
  background: C.cyan,
  display: "inline-block",
  flexShrink: 0,
};

/** Per-letter entrance delay, sweeping the headline left to right. */
const letterDelay = (index: number) => `${0.15 + index * 0.045}s`;

/** One word split into per-letter spans that pop in on load (staggered from
 *  `start`, the word's first letter index in the headline) and lift under
 *  the cursor. */
function LiftWord({
  word,
  start = 0,
  children,
}: {
  word: string;
  start?: number;
  children?: React.ReactNode;
}) {
  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {word.split("").map((ch, i) => (
        <span
          key={i}
          className="hero-letter"
          style={{ animationDelay: letterDelay(start + i) }}
        >
          {ch}
        </span>
      ))}
      {children}
    </span>
  );
}

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


const STATS = [
  { n: "300%", l: "growth in the past year" },
  { n: "4", l: "offices across Queensland" },
  { n: "12+", l: "qualified specialists" },
  { n: "30 min", l: "free first consultation" },
];

const PILLARS = [
  {
    t: "Affordability",
    c: C.cyan,
    d: "Fixed-fee options and pricing agreed up front, so you always know what an engagement costs.",
  },
  {
    t: "Client Care",
    c: C.orange,
    d: "Real people who answer the phone, follow things up and treat your deadlines as their own.",
  },
  {
    t: "Personalised Service",
    c: C.navy,
    d: "Advice built around your goals, structure and stage of life — never pulled off the shelf.",
  },
  {
    t: "Transparency",
    c: C.cyan,
    d: "Clear scope, clear fees and plain-English reporting. No surprises at the end of the job.",
  },
  {
    t: "Integrity",
    c: C.orange,
    d: "The advice we'd give our own family, even when it isn't the answer you were hoping for.",
  },
  {
    t: "Expertise",
    c: C.navy,
    d: "CPA-qualified accountants and licensed advisers with global, cross-industry experience.",
  },
];

const STEPS = [
  {
    t: "Free 30-min consultation",
    m: "30 minutes",
    c: C.cyan,
    p: "It all begins when you book a free 30-minute consultation to discuss your financial or taxation matters. When you say yes, onboarding begins.",
  },
  {
    t: "Onboarding",
    m: "3–5 business days",
    c: C.orange,
    p: "Onboarding usually takes 3–5 business days. We stay in touch and guide you through each step, keeping the paperwork as smooth and simple as possible.",
  },
  {
    t: "Matched to the right team",
    m: "Week one",
    c: C.navy,
    p: "Once we identify whether you need taxation or financial services, you're assigned to the right department and a dedicated accountant takes over.",
  },
  {
    t: "Ongoing dedicated support",
    m: "Ongoing",
    c: C.orange,
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
        className="home-hero"
        style={{
          position: "relative",
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
          <source src="/assets/hero-video-1080.mp4" type="video/mp4" />
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
          className="home-hero-copy"
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
            aria-label="Better at money matters."
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
            <LiftWord word="Better" /> <LiftWord word="at" start={6} />{" "}
            <span style={{ color: C.orange }}>
              <LiftWord word="money" start={8} />{" "}
              <LiftWord word="matters" start={13}>
                <span
                  className="hero-letter"
                  style={{ color: "#FFFFFF", animationDelay: letterDelay(20) }}
                >
                  .
                </span>
              </LiftWord>
            </span>
          </h1>
        </div>

        {/* Bottom-right cyan card */}
        <div
          className="home-hero-card"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <a
            href={BOOKING_URL}
            className="hero-book-card"
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
            Book a Free 30-Min Consultation{" "}
            <span className="hero-arrow" aria-hidden>
              &rarr;
            </span>
          </a>
        </div>
      </section>

      {/* Stats strip */}
      <section
        style={{
          background: "#FFFFFF",
          borderBottom: `1px solid ${C.border}`,
          padding: "48px 5vw 50px",
        }}
      >
        <StatsStrip stats={STATS} />
      </section>

      {/* Services */}
      <section
        id="services"
        style={{
          position: "relative",
          padding: "clamp(56px,9vw,84px) 5vw clamp(60px,9vw,92px)",
          background: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Soft brand wash behind the grid. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(680px 460px at 92% 6%, rgba(18,183,214,0.07), transparent 62%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 28,
              flexWrap: "wrap",
              marginBottom: 44,
            }}
          >
            <div style={{ maxWidth: 640 }}>
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
            <Link
              href="/financial-advice"
              className="btn-outline"
              style={{
                border: `1px solid ${C.borderInput}`,
                borderRadius: 999,
                padding: "12px 22px",
                fontWeight: 600,
                fontSize: 15,
                color: C.navy,
                whiteSpace: "nowrap",
              }}
            >
              View all services &rarr;
            </Link>
          </div>
          <ServiceCards />
        </div>
      </section>

      {/* Pillars */}
      <section
        style={{
          position: "relative",
          padding: "clamp(60px,9vw,96px) 5vw clamp(64px,10vw,104px)",
          background: C.bgAlt,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        {/* Soft brand wash behind the grid. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(560px 420px at 8% 0%, rgba(18,183,214,0.11), transparent 65%), radial-gradient(620px 460px at 96% 100%, rgba(242,92,10,0.09), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 28,
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <Eyebrow label="Our Specialty" />
              <h2 style={H2}>The pillars we stand by</h2>
            </div>
            <div style={{ maxWidth: 430 }}>
              <p style={{ margin: 0, lineHeight: 1.68, fontSize: 15.5 }}>
                Our team has shared values &mdash; six pillars that shape every
                engagement, from a first tax return to a full corporate
                restructure.
              </p>
              <div
                style={{
                  marginTop: 18,
                  height: 3,
                  width: 96,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${C.cyan}, ${C.orange})`,
                }}
              />
            </div>
          </div>

          <div className="pillar-list">
            {PILLARS.map((p, i) => (
              <article
                key={p.t}
                className="pillar-row"
                style={{ ["--accent" as string]: p.c }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-lexend), Lexend, sans-serif",
                    fontWeight: 600,
                    fontSize: 14.5,
                    letterSpacing: "0.06em",
                    color: p.c,
                    paddingTop: 6,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-lexend), Lexend, sans-serif",
                      fontWeight: 600,
                      color: C.navy,
                      fontSize: 20,
                      letterSpacing: "-0.01em",
                      margin: "0 0 9px",
                    }}
                  >
                    {p.t}
                  </h3>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7 }}>
                    {p.d}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section style={{ padding: "clamp(60px,9vw,96px) 5vw clamp(64px,10vw,100px)", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 28,
              flexWrap: "wrap",
              marginBottom: 50,
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <Eyebrow label="How We Work" />
              <h2 style={H2}>
                From first call to dedicated team, in four steps
              </h2>
            </div>
            <p
              style={{
                maxWidth: 380,
                margin: 0,
                fontSize: 15.5,
                lineHeight: 1.68,
              }}
            >
              A simple, predictable process &mdash; you always know what happens
              next and who is looking after you.
            </p>
          </div>

          <ol className="steps-grid">
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className="step-card"
                style={{ ["--accent" as string]: s.c }}
              >
                <span className="step-ghost" aria-hidden>
                  {`0${i + 1}`}
                </span>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <span className="step-num">{i + 1}</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: C.mute,
                    }}
                  >
                    {s.m}
                  </span>
                </div>
                <h3
                  style={{
                    position: "relative",
                    fontFamily: "var(--font-lexend), Lexend, sans-serif",
                    fontWeight: 600,
                    color: C.navy,
                    fontSize: 18.5,
                    letterSpacing: "-0.01em",
                    margin: "0 0 10px",
                  }}
                >
                  {s.t}
                </h3>
                <p
                  style={{
                    position: "relative",
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.66,
                  }}
                >
                  {s.p}
                </p>
              </li>
            ))}
          </ol>

          <div
            style={{
              marginTop: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              flexWrap: "wrap",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: 15.5 }}>
              Ready to start? Step one takes half an hour and costs nothing.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
              style={{
                background: C.orange,
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 26px",
                borderRadius: 999,
                transition: "background .2s ease",
              }}
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section
        style={{
          padding: "clamp(56px,9vw,84px) 0 clamp(60px,9vw,92px)",
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

      {/* Technology partner — KEYOB */}
      <KeyobAnnounceBanner />
      <KeyobPartnerSection />

      {/* Recent blogs */}
      <section style={{ padding: "clamp(56px,8vw,80px) 5vw", background: "#FFFFFF" }}>
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
              gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
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

      {/* Technology partner — compact card */}
      <section style={{ padding: "0 5vw clamp(56px,8vw,80px)", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <KeyobPartnerBanner />
        </div>
      </section>

      {/* BachRob banner */}
      <section
        style={{
          position: "relative",
          backgroundImage: "url('/assets/hero-team-wide.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "clamp(140px,30vw,230px) 5vw 56px",
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
          padding: "clamp(54px,8vw,76px) 5vw",
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
