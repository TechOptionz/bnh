import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  divisionHref,
  FA,
  relatedServices,
  SERVICES,
} from "@/lib/services";
import { BOOKING_URL, C, EMAIL, PHONE_BRISBANE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.tagline };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  const related = relatedServices(slug);
  const isFA = service.division === FA;

  return (
    <>
      <SiteHeader active={isFA ? "financial-advice" : "accounting"} />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: service.division, href: divisionHref(service.division) },
          { label: service.title },
        ]}
        title={service.title}
        intro={service.tagline}
        padding="64px 5vw 56px"
        maxWidth={1140}
        titleClamp="clamp(32px,3.8vw,48px)"
        titleMaxWidth="22ch"
        introMaxWidth="62ch"
      />

      <section style={{ padding: "64px 5vw", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div style={{ gridColumn: "span 1", maxWidth: 720 }}>
            {service.paras.map((p) => (
              <p
                key={p}
                style={{ lineHeight: 1.75, fontSize: 16, margin: "0 0 18px" }}
              >
                {p}
              </p>
            ))}

            <div
              style={{
                background: C.bgAlt,
                borderRadius: 12,
                padding: "26px 28px",
                margin: "10px 0 28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: C.navy,
                  fontSize: 19,
                  margin: "0 0 14px",
                }}
              >
                How we help
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 11 }}
              >
                {service.offer.map((o) => (
                  <div
                    key={o}
                    style={{ display: "flex", gap: 12, alignItems: "baseline" }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: C.cyan,
                        flexShrink: 0,
                        transform: "translateY(-1px)",
                      }}
                    />
                    <span style={{ fontSize: 15, lineHeight: 1.6 }}>{o}</span>
                  </div>
                ))}
              </div>
            </div>

            {service.sections.map((s) => (
              <div key={s.h} style={{ marginBottom: 26 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-archivo), Archivo, sans-serif",
                    fontWeight: 700,
                    color: C.navy,
                    fontSize: 21,
                    margin: "0 0 10px",
                  }}
                >
                  {s.h}
                </h2>
                <p style={{ lineHeight: 1.75, fontSize: 15.5, margin: 0 }}>
                  {s.p}
                </p>
              </div>
            ))}
          </div>

          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 400,
            }}
          >
            <div
              style={{
                background: C.navy,
                borderRadius: 12,
                padding: "26px 28px",
                color: C.lightBlue,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontSize: 18,
                  margin: "0 0 8px",
                }}
              >
                Book a free consultation
              </h3>
              <p
                style={{ margin: "0 0 16px", fontSize: 14.5, lineHeight: 1.6 }}
              >
                30 minutes with an expert adviser &mdash; no cost, no
                obligation.
              </p>
              <a
                href={BOOKING_URL}
                className="btn-orange"
                style={{
                  background: C.orange,
                  color: "#FFFFFF",
                  padding: "12px 22px",
                  borderRadius: 8,
                  fontWeight: 700,
                  display: "block",
                  textAlign: "center",
                }}
              >
                Book Consultation
              </a>
            </div>

            <div
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "24px 26px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: C.navy,
                  fontSize: 16,
                  margin: "0 0 6px",
                }}
              >
                Call us
              </h3>
              <a
                href="tel:1300264346"
                className="hv-orange"
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: C.orange,
                }}
              >
                {PHONE_BRISBANE}
              </a>
              <p
                style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.55 }}
              >
                We&#39;re here to help Monday &ndash; Friday, 8am &ndash; 5pm.
                Or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
            </div>

            <div
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "24px 26px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 700,
                  color: C.navy,
                  fontSize: 16,
                  margin: "0 0 12px",
                }}
              >
                Related services
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  fontSize: 14.5,
                }}
              >
                {related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="hv-orange"
                    style={{ color: C.teal }}
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        heading={`Talk to us about ${service.title.toLowerCase()}`}
        body="Start with a free, no-obligation 30-minute consultation with one of our qualified advisers."
        padding="64px 5vw"
        headingClamp="clamp(24px,2.8vw,34px)"
        bodySize={16}
        buttonPadding="14px 28px"
      />

      <SiteFooter />
    </>
  );
}
