import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { C } from "@/lib/site";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet Our Team | JCA-BNH",
  description:
    "Meet the JCA-BNH team — CPAs, Chartered Accountants, a CFA charterholder and Big-4 alumni working hands-on with clients across four QLD offices.",
};

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

const EYEBROW_CHIP: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: 4,
  background: C.cyan,
  display: "inline-block",
  flexShrink: 0,
};

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

export default function TeamPage() {
  return (
    <>
      <SiteHeader floating active="about" />

      {/* Statement hero — breadcrumb, oversized headline, full-width photo */}
      <section style={{ background: "#FFFFFF", padding: "clamp(126px,22vw,170px) 5vw 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 14, color: C.mute, marginBottom: 26 }}>
            <Link href="/" className="hv-orange" style={{ color: C.mute }}>
              Home
            </Link>
            <span style={{ margin: "0 8px" }}>&rsaquo;</span>
            <span style={{ color: C.teal }}>Meet Our Team</span>
          </div>
          <h1
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              color: C.navy,
              fontSize: "clamp(40px,5.6vw,74px)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              margin: "0 0 56px",
              maxWidth: "18ch",
            }}
          >
            Hands-on. Always.
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-team-wide.jpg"
            alt="The JCA-BNH team"
            style={{
              width: "100%",
              aspectRatio: "16 / 7",
              objectFit: "cover",
              borderRadius: 18,
              display: "block",
            }}
          />
        </div>
      </section>

      {/* Intro statement */}
      <section style={{ background: "#FFFFFF", padding: "clamp(60px,9vw,96px) 5vw 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              color: C.navy,
              fontSize: "clamp(28px,3.6vw,46px)",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              margin: "0 0 30px",
            }}
          >
            At JCA-BNH, the people you meet are the people who do the work.
          </h2>
          <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: "0 0 18px" }}>
            Our senior advisers stay hands-on, accessible and accountable
            &mdash; from the first conversation through to long-term strategy.
          </p>
          <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: "0 0 18px" }}>
            We deliver big-firm capability without losing the accessibility and
            personal accountability that matter to our clients. You won&rsquo;t
            be handed off or passed around. Our team works alongside you at
            every step, bringing expertise and steady guidance when it counts.
          </p>
          <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: 0 }}>
            It&rsquo;s how we&rsquo;ve built trusted relationships across four
            Queensland offices &mdash; and why our clients stay with us as
            their needs grow.
          </p>
        </div>
      </section>

      {/* Experience matters — photo left, copy right */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "clamp(48px,8vw,70px) 5vw clamp(64px,10vw,110px)",
          overflowX: "clip",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: "56px 84px",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/team-photo.jpg"
            alt="JCA-BNH team members working together"
            style={{
              width: "100%",
              aspectRatio: "5 / 6",
              objectFit: "cover",
              borderRadius: 18,
              display: "block",
            }}
          />
          <div>
            <Eyebrow label="Our People" />
            <h2
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: "clamp(30px,3.8vw,48px)",
                lineHeight: 1.14,
                letterSpacing: "-0.01em",
                margin: "0 0 22px",
              }}
            >
              When it comes to money matters, experience matters. Especially
              when the decisions carry weight.
            </h2>
            <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: "0 0 18px" }}>
              We firmly believe that professional and personal success are
              built through strong relationships, a strategic mindset and clear
              leadership.
            </p>
            <p style={{ lineHeight: 1.75, fontSize: 16.5, margin: 0 }}>
              Our experts know their business &mdash; and they make it their
              mission to know yours. What sets our people apart isn&rsquo;t
              simply expertise: it&rsquo;s judgement, built over decades across
              taxation, audit, financial advice and industry.
            </p>
          </div>
        </div>
      </section>

      {/* Full roster */}
      <section style={{ padding: "clamp(60px,9vw,90px) 5vw clamp(64px,10vw,100px)", background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              color: C.navy,
              fontSize: "clamp(26px,3vw,40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textAlign: "center",
              maxWidth: 860,
              margin: "0 auto 56px",
            }}
          >
            Our team is a balanced mix of specialists across Accounting, Tax,
            Audit, Advisory and Financial Advice.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(min(290px,100%),1fr))",
              gap: 24,
            }}
          >
            {TEAM.map((m) => (
              <Link
                key={m.slug}
                href={`/team/${m.slug}`}
                className="team-card"
                style={{
                  display: "block",
                  color: "inherit",
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  background: C.border,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
                {/* Name + role pinned to the bottom over a dark gradient */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "70px 24px 24px",
                    background:
                      "linear-gradient(180deg, rgba(14,27,51,0) 0%, rgba(14,27,51,0.55) 40%, rgba(14,27,51,0.88) 100%)",
                    color: "#FFFFFF",
                  }}
                >
                  <div
                    style={{
                      fontFamily: LEXEND,
                      fontWeight: 600,
                      fontSize: 22,
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#C9E9F4",
                    }}
                  >
                    {m.role}
                  </div>
                  <div className="team-bio">
                    <p
                      style={{
                        overflow: "hidden",
                        margin: 0,
                        paddingTop: 12,
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: "#E3EAF6",
                      }}
                    >
                      {m.bio}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Speak with the people who make the calls"
        body="Meet us over a free 30-minute consultation and see how we can help with your tax, accounting or financial goals."
      />

      <SiteFooter omit={["about"]} />
    </>
  );
}
