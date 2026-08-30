import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { C } from "@/lib/site";
import { TEAM, teamMember } from "@/lib/team";

type Params = { params: Promise<{ slug: string }> };

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

/** Pale blue band behind the profile hero, from the reference design. */
const HERO_BLUE = "#E9F5FB";

export function generateStaticParams() {
  return TEAM.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const m = teamMember(slug);
  if (!m) return { title: "Team member not found" };
  return {
    title: `${m.name} | JCA-BNH`,
    description: m.bio,
  };
}

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

const SECTION_H: React.CSSProperties = {
  fontFamily: LEXEND,
  fontWeight: 600,
  color: C.navy,
  fontSize: "clamp(26px,3vw,38px)",
  lineHeight: 1.18,
  letterSpacing: "-0.01em",
  margin: "0 0 22px",
};

const PARA: React.CSSProperties = {
  lineHeight: 1.75,
  fontSize: 16.5,
  margin: "0 0 18px",
};

/** Bulleted list inside the sidebar card. */
function SideList({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: LEXEND,
          fontWeight: 600,
          color: C.navy,
          fontSize: 17,
          margin: "0 0 14px",
        }}
      >
        {heading}
      </h3>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {items.map((q) => (
          <li
            key={q}
            style={{
              display: "flex",
              gap: 10,
              fontSize: 15,
              lineHeight: 1.55,
              marginBottom: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: C.cyan,
                flexShrink: 0,
                marginTop: 8,
              }}
            />
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function TeamMemberPage({ params }: Params) {
  const { slug } = await params;
  const m = teamMember(slug);
  if (!m) notFound();

  const first = m.name.split(" ")[0];

  return (
    <>
      <SiteHeader floating active="about" />

      {/* Profile hero — pale blue band, name left, photo hanging over the edge */}
      <section style={{ background: HERO_BLUE, padding: "160px 5vw 0" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "40px 84px",
            alignItems: "start",
          }}
        >
          <div style={{ padding: "26px 0 90px" }}>
            <div style={{ fontSize: 14, color: C.mute, marginBottom: 40 }}>
              <Link href="/" className="hv-orange" style={{ color: C.mute }}>
                Home
              </Link>
              <span style={{ margin: "0 8px" }}>&rsaquo;</span>
              <Link href="/team" className="hv-orange" style={{ color: C.mute }}>
                Meet Our Team
              </Link>
              <span style={{ margin: "0 8px" }}>&rsaquo;</span>
              <span style={{ color: C.teal }}>{m.name}</span>
            </div>
            <h1
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: "clamp(40px,5.4vw,70px)",
                lineHeight: 1.06,
                letterSpacing: "-0.015em",
                margin: "0 0 46px",
              }}
            >
              {m.name}
            </h1>
            <div
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: 22,
                marginBottom: 6,
              }}
            >
              {m.role}
            </div>
            <div
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.teal,
                fontSize: 17,
              }}
            >
              {m.division}
            </div>
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                aria-label={`${m.name} on LinkedIn`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  marginTop: 26,
                  padding: "10px 18px",
                  border: `2px solid ${C.navy}`,
                  borderRadius: 8,
                  color: C.navy,
                  fontWeight: 700,
                  fontSize: 14.5,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
          {/* Portrait overlaps out of the blue band into the section below */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={m.photo}
            alt={m.name}
            style={{
              width: "100%",
              maxWidth: 440,
              justifySelf: "end",
              aspectRatio: "4 / 5",
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: 16,
              display: "block",
              background: C.border,
              position: "relative",
              zIndex: 2,
              marginBottom: -110,
            }}
          />
        </div>
      </section>

      {/* Body — intro + sections left, qualifications card right */}
      <section style={{ background: "#FFFFFF", padding: "90px 5vw 100px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "70px 84px",
            alignItems: "start",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <Eyebrow label="Intro" />
            <h2 style={SECTION_H}>Meet {first}</h2>
            {m.intro.map((p) => (
              <p key={p.slice(0, 32)} style={PARA}>
                {p}
              </p>
            ))}

            <h2 style={{ ...SECTION_H, marginTop: 54 }}>Specialisation</h2>
            <p style={PARA}>{m.specialisation}</p>

            {m.leadership && (
              <>
                <h2 style={{ ...SECTION_H, marginTop: 54 }}>
                  Leadership &amp; Contribution
                </h2>
                <p style={PARA}>{m.leadership}</p>
              </>
            )}
          </div>

          {/* Sidebar card — sits below the overlapping portrait */}
          <div
            style={{
              maxWidth: 440,
              justifySelf: "end",
              width: "100%",
              marginTop: 40,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "30px 30px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              background: "#FFFFFF",
            }}
          >
            <SideList
              heading="Qualifications & Professional Associations"
              items={m.qualifications}
            />
            <SideList heading="Areas of Expertise" items={m.expertise} />
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Speak with ${first} and the JCA-BNH team`}
        body="Meet us over a free 30-minute consultation and see how we can help with your tax, accounting or financial goals."
        background={C.bgAlt}
      />

      <SiteFooter omit={["about"]} />
    </>
  );
}
