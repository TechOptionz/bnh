import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ValuesCarousel from "@/components/ValuesCarousel";
import { C } from "@/lib/site";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "About JCA-BNH",
  description:
    "A growing Queensland firm with global experience — CPAs, Chartered Accountants, a CFA charterholder and Big-4 alumni across four QLD offices.",
};

const STATS = [
  { n: "300%", l: "growth this year" },
  { n: "4", l: "QLD offices" },
  { n: "30+ yrs", l: "senior expertise" },
];

const EYEBROW_CHIP: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: 4,
  background: C.cyan,
  display: "inline-block",
  flexShrink: 0,
};

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

/** Small square chip + label, in the style of the reference eyebrows. */
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
      <span style={EYEBROW_CHIP} />
      <span style={{ fontSize: 14.5, fontWeight: 600, color: C.body }}>
        {label}
      </span>
    </div>
  );
}

/** Photo with the soft light-blue rounded square offset behind its corner. */
function AccentImage({
  src,
  alt,
  ratio = "5 / 6",
  corner = "right",
}: {
  src: string;
  alt: string;
  ratio?: string;
  corner?: "left" | "right";
}) {
  return (
    <div style={{ position: "relative" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          aspectRatio: ratio,
          objectFit: "cover",
          borderRadius: 18,
          display: "block",
          position: "relative",
          zIndex: 1,
          background: C.border,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -34,
          ...(corner === "left" ? { left: -34 } : { right: -34 }),
          width: 120,
          height: 120,
          borderRadius: 24,
          background: "#8FD8EB",
        }}
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader floating active="about" />

      {/* Statement hero — solid navy band (like Contact) with breadcrumb + headline */}
      <section
        style={{
          background: `linear-gradient(120deg,${C.navy} 0%,${C.navyDeep} 100%)`,
          padding: "170px 5vw 72px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 14, color: C.mute, marginBottom: 26 }}>
            <Link href="/" className="crumb" style={{ color: C.mute }}>
              Home
            </Link>
            <span style={{ margin: "0 8px" }}>&rsaquo;</span>
            <span style={{ color: C.lightBlue }}>About Us</span>
          </div>
          <h1
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              color: "#FFFFFF",
              fontSize: "clamp(40px,5.6vw,74px)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Better at money matters, for what comes next.
          </h1>
        </div>
      </section>

      {/* Full-width team photo below the navy band */}
      <section style={{ background: "#FFFFFF", padding: "72px 5vw 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-team-wide.jpg"
            alt="The JCA-BNH team working together"
            style={{
              width: "100%",
              aspectRatio: "16 / 7",
              objectFit: "cover",
              borderRadius: 18,
              display: "block",
              background: C.border,
            }}
          />
        </div>
      </section>

      {/* About split — copy left, offset accent photo right */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "96px 5vw 120px",
          overflowX: "clip",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "56px 84px",
            alignItems: "start",
          }}
        >
          <div>
            <Eyebrow label="Established. Trusted. Forward-looking." />
            <h2
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: "clamp(32px,4vw,50px)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                margin: "0 0 26px",
              }}
            >
              About JCA-BNH
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: "0 0 18px" }}>
              We partner with business owners, families and individuals across
              Queensland and beyond, providing clarity, direction and advice
              that stands the test of time &mdash; from four locations in
              Ipswich, Springwood, Noosaville and Maroochydore.
            </p>
            <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: "0 0 18px" }}>
              Today, we support our clients with a full suite of services:
              accounting, tax, financial advice and business advisory, bringing
              the right expertise together when it matters most. Our team spans
              CPAs, Chartered Accountants, a CFA charterholder and Big-4
              alumni.
            </p>
            <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: "0 0 34px" }}>
              We don&rsquo;t believe in one-size-fits-all advice. We listen
              first, ask better questions, and work alongside our clients with
              a long-term view &mdash; so they&rsquo;re prepared not just for
              today, but for what comes next.
            </p>
            <div style={{ display: "flex", gap: 34, flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div key={s.n}>
                  <div
                    style={{
                      fontFamily: LEXEND,
                      fontWeight: 600,
                      fontSize: 28,
                      color: C.orange,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontSize: 13.5 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <AccentImage
            src="/assets/team-photo.jpg"
            alt="The JCA-BNH team"
            corner="right"
          />
        </div>
      </section>

      {/* Values carousel */}
      <section style={{ background: "#FFFFFF", padding: "0 0 120px" }}>
        <ValuesCarousel />
      </section>

      {/* Looking ahead — offset accent photo left, copy + CEO quote right */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "0 5vw 110px",
          overflowX: "clip",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "56px 84px",
            alignItems: "center",
          }}
        >
          <AccentImage
            src="/assets/slide-2.jpg"
            alt="JCA-BNH advisers in conversation"
            corner="right"
          />
          <div>
            <Eyebrow label="About JCA-BNH" />
            <h2
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: "clamp(32px,4vw,50px)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                margin: "0 0 22px",
              }}
            >
              Looking Ahead
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: "0 0 30px" }}>
              JCA-BNH continues to evolve &mdash; growing 300% in the past year
              and welcoming Bachmann Robinson (BachRob) as a sister firm. As
              our clients&rsquo; needs change, so do we. What remains constant
              is our commitment to walking alongside them with confidence,
              capability and care.
            </p>
            <div
              style={{
                background: C.bgAlt,
                borderRadius: 16,
                padding: "28px 30px",
              }}
            >
              <p
                style={{
                  fontFamily: LEXEND,
                  fontWeight: 600,
                  color: C.navy,
                  fontSize: 17.5,
                  lineHeight: 1.6,
                  margin: "0 0 18px",
                }}
              >
                &ldquo;Through continuous learning and exceptional service, we
                build lasting relationships, helping businesses and individuals
                achieve financial success with confidence.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/team-nayyar.jpg"
                  alt="Nayyar Hayat"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 999,
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: C.navy }}>
                    Nayyar Hayat
                  </div>
                  <div style={{ fontSize: 13.5 }}>
                    CEO, JCA-BNH &amp; BachRob QLD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "76px 5vw", background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <Eyebrow label="Meet Our Team" />
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
              The people behind the numbers
            </h2>
            <Link
              href="/team"
              className="hv-orange"
              style={{
                color: C.navy,
                fontWeight: 700,
                fontSize: 15.5,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Meet the full team &rarr;
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 22,
            }}
          >
            {TEAM.map((m) => (
              <Link
                key={m.slug}
                href={`/team/${m.slug}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 14,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  color: "inherit",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                    background: C.border,
                  }}
                />
                <div style={{ padding: "20px 22px 24px" }}>
                  <h3
                    style={{
                      fontFamily: LEXEND,
                      fontWeight: 600,
                      color: C.navy,
                      fontSize: 18,
                      margin: "0 0 4px",
                    }}
                  >
                    {m.name}
                  </h3>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.orange,
                      letterSpacing: "0.04em",
                      marginBottom: 10,
                    }}
                  >
                    {m.role}
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                    {m.bio}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Work with a team that puts you first"
        body="Meet us over a free 30-minute consultation and see how we can help with your tax, accounting or financial goals."
        background="#FFFFFF"
      />

      <SiteFooter omit={["about"]} />
    </>
  );
}
