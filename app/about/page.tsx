import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
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

export default function AboutPage() {
  return (
    <>
      <PageHero
        active="about"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        title="About JCA-BNH"
        intro={
          <>
            <strong style={{ color: C.cyan }}>Our vision:</strong> to be the most
            trusted and knowledgeable accounting firm, delivering exceptional,
            cost-effective service with a client-first approach.
          </>
        }
      />

      {/* Director quote + firm overview */}
      <section style={{ padding: "72px 5vw", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 44,
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: C.bgAlt,
              borderRadius: 14,
              padding: "36px 34px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontSize: 13,
                color: C.cyan,
                marginBottom: 14,
              }}
            >
              From the Director
            </div>
            <p
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 600,
                color: C.navy,
                fontSize: 20,
                lineHeight: 1.55,
                margin: "0 0 20px",
              }}
            >
              &ldquo;We empower our clients with expert financial guidance,
              delivering cost-effective and high-quality accounting solutions.
              Through continuous learning and exceptional service, we build
              lasting relationships, helping businesses and individuals achieve
              financial success with confidence.&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/team-nayyar.jpg"
                alt="Nayyar Hayat"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 999,
                  objectFit: "cover",
                }}
              />
              <div>
                <div style={{ fontWeight: 700, color: C.navy }}>
                  Nayyar Hayat
                </div>
                <div style={{ fontSize: 13.5 }}>
                  Director, JCA-BNH &amp; BachRob QLD
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 800,
                color: C.navy,
                fontSize: "clamp(26px,3vw,34px)",
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              A growing Queensland firm with global experience
            </h2>
            <p style={{ lineHeight: 1.7, margin: "0 0 14px" }}>
              JCA-BNH Accountants &amp; Financial Advisers serves clients
              Australia-wide from four Queensland locations &mdash; Ipswich,
              Springwood, Noosaville and Maroochydore &mdash; and has grown 300%
              in the past year, welcoming Bachmann Robinson (BachRob) as a sister
              firm.
            </p>
            <p style={{ lineHeight: 1.7, margin: "0 0 22px" }}>
              Our team spans CPAs, Chartered Accountants, a CFA charterholder and
              Big-4 alumni, with industry experience from aviation and real
              estate to health, education and not-for-profits.
            </p>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div key={s.n}>
                  <div
                    style={{
                      fontFamily: "var(--font-archivo), Archivo, sans-serif",
                      fontWeight: 800,
                      fontSize: 26,
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
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "76px 5vw", background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <div
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontSize: 13,
                color: C.cyan,
                marginBottom: 12,
              }}
            >
              Meet Our Team
            </div>
            <h2
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 800,
                color: C.navy,
                fontSize: "clamp(28px,3vw,38px)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              The people behind the numbers
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 22,
            }}
          >
            {TEAM.map((m) => (
              <div
                key={m.name}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 14,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
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
                      fontFamily: "var(--font-archivo), Archivo, sans-serif",
                      fontWeight: 700,
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
              </div>
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
