import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdviserForm from "@/components/AdviserForm";
import FaqAccordion from "@/components/FaqAccordion";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  divisionHref,
  FA,
  FAQS,
  relatedServices,
  SERVICES,
} from "@/lib/services";
import { BOOKING_URL, C, PHONE_BRISBANE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const ARCHIVO = "var(--font-archivo), Archivo, sans-serif";
const WRAP: React.CSSProperties = { maxWidth: 1280, margin: "0 auto" };

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.tagline };
}

/** Small square + label section marker from the reference design. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        marginBottom: 24,
      }}
    >
      <span
        style={{ width: 9, height: 9, background: C.cyan, flexShrink: 0 }}
      />
      <span style={{ fontSize: 15, fontWeight: 600, color: C.body }}>
        {children}
      </span>
    </div>
  );
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  const related = relatedServices(slug);
  const faqs = FAQS[slug] ?? [];
  const isFA = service.division === FA;

  const insightEyebrow = isFA
    ? "Insight shaped by your goals and your stage of life."
    : "Insight shaped by your business and your industry.";
  const statement = isFA
    ? "The best financial advice starts with understanding your goals, your stage of life, and what you want your money to make possible."
    : "The best accounting advice starts with understanding your goals, how your business operates, and the environment you're working in.";
  const statementParas = isFA
    ? [
        "Before advice is given, we take the time to dig deeper — to understand what you've built, what you're protecting, and the milestones ahead. Every recommendation ties back to your documented goals and risk profile, not market noise.",
        "You'll work with advisers who deal with families, professionals and business owners every day, so your advice is practical, personal and grounded in real life — not a template.",
      ]
    : [
        "Before we give advice, we dig into how your business actually runs — where risk could cost you, where hours and dollars can be saved, and how your numbers should support the decisions ahead.",
        "You'll work with accountants who deal with owners and operators every day, so your advice is practical, relevant and grounded in the day-to-day reality of your business.",
      ];
  const trustHeading = isFA
    ? "Queensland's Trusted Financial Advice Experts."
    : "Queensland's Trusted Accounting & Advisory Experts.";
  const trustBody = isFA
    ? "Our advisers are recognised leaders in their field — shaping strategies for families, professionals and business owners from our offices in Brisbane, Noosa and Maroochydore. When you face high-stakes financial decisions, you'll have experienced people on your side."
    : "Our team advises on industry best practice, shapes strategies for growing businesses and solves complex challenges — from our offices in Brisbane, Noosa and Maroochydore. When your business faces high-stakes decisions, you'll have experienced people on your side.";

  return (
    <>
      <SiteHeader
        floating
        active={isFA ? "financial-advice" : "accounting"}
      />

      {/* ---- Light hero: breadcrumb, oversized title, full-width image ---- */}
      <section style={{ background: "#EAF4F9", padding: "176px 4vw 64px" }}>
        <div style={WRAP}>
          <div style={{ fontSize: 13.5, color: C.mute, marginBottom: 26 }}>
            {[
              { label: "Home", href: "/" },
              { label: service.division, href: divisionHref(service.division) },
              { label: service.title },
            ].map((c, i) => (
              <span key={i}>
                {i > 0 && <span style={{ margin: "0 7px" }}>&raquo;</span>}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="hv-orange"
                    style={{ color: C.mute }}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: C.navy, fontWeight: 600 }}>
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 800,
              color: C.navy,
              fontSize: "clamp(40px,5.6vw,74px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "0 0 48px",
              maxWidth: "18ch",
            }}
          >
            {service.title}
          </h1>
          <ImagePlaceholder ratio="16 / 7" radius={10} />
        </div>
      </section>

      {/* ---- Intro: eyebrow + big statement + lead paragraph ---- */}
      <section style={{ background: "#FFFFFF", padding: "104px 4vw 72px" }}>
        <div style={WRAP}>
          <Eyebrow>{service.title}</Eyebrow>
          <h2
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 800,
              color: C.navy,
              fontSize: "clamp(30px,3.6vw,50px)",
              lineHeight: 1.12,
              letterSpacing: "-0.015em",
              margin: "0 0 30px",
              maxWidth: "26ch",
            }}
          >
            {service.tagline}
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              margin: 0,
              maxWidth: "82ch",
            }}
          >
            {service.paras[0]}
          </p>
        </div>
      </section>

      {/* ---- Image left / heading, copy and bullets right ---- */}
      <section style={{ background: "#FFFFFF", padding: "40px 4vw 104px" }}>
        <div
          style={{
            ...WRAP,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 64,
            alignItems: "start",
          }}
        >
          <ImagePlaceholder ratio="4 / 5" radius={10} />
          <div>
            <Eyebrow>{service.title}</Eyebrow>
            <h2
              style={{
                fontFamily: ARCHIVO,
                fontWeight: 800,
                color: C.navy,
                fontSize: "clamp(28px,3vw,42px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                margin: "0 0 22px",
                maxWidth: "20ch",
              }}
            >
              {service.sections[0]?.h}
            </h2>
            {service.sections[0] && (
              <p
                style={{ fontSize: 16, lineHeight: 1.75, margin: "0 0 16px" }}
              >
                {service.sections[0].p}
              </p>
            )}
            {service.paras.slice(1).map((p) => (
              <p
                key={p}
                style={{ fontSize: 16, lineHeight: 1.75, margin: "0 0 16px" }}
              >
                {p}
              </p>
            ))}
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                margin: "10px 0 16px",
                fontWeight: 600,
                color: C.navy,
              }}
            >
              Working with us, you can expect our team to:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {service.offer.map((o) => (
                <div
                  key={o}
                  style={{ display: "flex", gap: 13, alignItems: "baseline" }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: C.cyan,
                      flexShrink: 0,
                      transform: "translateY(-2px)",
                    }}
                  />
                  <span style={{ fontSize: 15.5, lineHeight: 1.6 }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Big statement left / image + cyan accent card right ---- */}
      <section style={{ background: "#FFFFFF", padding: "0 4vw 120px" }}>
        <div
          style={{
            ...WRAP,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <Eyebrow>{insightEyebrow}</Eyebrow>
            <h2
              style={{
                fontFamily: ARCHIVO,
                fontWeight: 800,
                color: C.navy,
                fontSize: "clamp(28px,3.2vw,44px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                margin: "0 0 26px",
              }}
            >
              {statement}
            </h2>
            {statementParas.map((p) => (
              <p
                key={p}
                style={{ fontSize: 15.5, lineHeight: 1.75, margin: "0 0 16px" }}
              >
                {p}
              </p>
            ))}
            {service.sections.slice(1).map((s) => (
              <div key={s.h} style={{ marginTop: 26 }}>
                <h3
                  style={{
                    fontFamily: ARCHIVO,
                    fontWeight: 700,
                    color: C.navy,
                    fontSize: 20,
                    margin: "0 0 10px",
                  }}
                >
                  {s.h}
                </h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.75, margin: 0 }}>
                  {s.p}
                </p>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", paddingBottom: 56 }}>
            <ImagePlaceholder ratio="4 / 5" radius={10} />
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 232,
                background: C.cyan,
                color: "#FFFFFF",
                borderRadius: 8,
                padding: "28px 26px",
                fontFamily: ARCHIVO,
                fontWeight: 700,
                fontSize: 27,
                lineHeight: 1.2,
                boxShadow: "0 18px 40px rgba(10,18,36,0.18)",
              }}
            >
              For what comes next.
            </div>
          </div>
        </div>
      </section>

      {/* ---- Trust statement ---- */}
      <section style={{ background: C.bgAlt, padding: "96px 4vw" }}>
        <div style={WRAP}>
          <Eyebrow>{service.division}</Eyebrow>
          <h2
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 800,
              color: C.navy,
              fontSize: "clamp(30px,3.6vw,48px)",
              lineHeight: 1.12,
              letterSpacing: "-0.015em",
              margin: "0 0 24px",
              maxWidth: "24ch",
            }}
          >
            {trustHeading}
          </h2>
          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.75,
              margin: 0,
              maxWidth: "92ch",
            }}
          >
            {trustBody}
          </p>
        </div>
      </section>

      {/* ---- "Speak with an Adviser" contact panel + form card ---- */}
      <section style={{ background: "#FFFFFF", padding: "96px 4vw" }}>
        <div
          style={{
            ...WRAP,
            background: "#DCF0F8",
            borderRadius: 28,
            padding: "clamp(36px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2
              style={{
                fontFamily: ARCHIVO,
                fontWeight: 800,
                color: C.navy,
                fontSize: "clamp(30px,3.4vw,46px)",
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
                margin: "0 0 18px",
                maxWidth: "16ch",
              }}
            >
              Speak with a JCA-BNH Adviser
            </h2>
            <p
              style={{
                fontSize: 16.5,
                lineHeight: 1.7,
                margin: "0 0 26px",
                maxWidth: "42ch",
              }}
            >
              Get in touch and we&#39;ll connect you with the right adviser for
              your needs.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
              Prefer to talk? Call{" "}
              <a
                href="tel:1300264346"
                className="hv-orange"
                style={{ color: C.navy, fontWeight: 700 }}
              >
                {PHONE_BRISBANE}
              </a>{" "}
              or{" "}
              <a
                href={BOOKING_URL}
                className="hv-orange"
                style={{
                  color: C.navy,
                  fontWeight: 700,
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                book a free 30-minute consultation
              </a>
              .
            </p>
          </div>
          <AdviserForm service={service.title} />
        </div>
      </section>

      {/* ---- FAQ ---- */}
      {faqs.length > 0 && (
        <section style={{ background: "#FFFFFF", padding: "24px 4vw 96px" }}>
          <div style={WRAP}>
            <Eyebrow>Questions?</Eyebrow>
            <h2
              style={{
                fontFamily: ARCHIVO,
                fontWeight: 800,
                color: C.navy,
                fontSize: "clamp(52px,7vw,88px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                margin: "0 0 40px",
              }}
            >
              FAQ
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* ---- Related services ---- */}
      {related.length > 0 && (
        <section style={{ background: "#FFFFFF", padding: "0 4vw 96px" }}>
          <div style={WRAP}>
            <h3
              style={{
                fontFamily: ARCHIVO,
                fontWeight: 700,
                color: C.navy,
                fontSize: 19,
                margin: "0 0 20px",
              }}
            >
              Related services
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="card-hover"
                  style={{
                    border: `1px solid ${C.border}`,
                    borderRadius: 999,
                    padding: "11px 20px",
                    color: C.navy,
                    fontWeight: 600,
                    fontSize: 14.5,
                  }}
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
