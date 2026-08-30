import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { C, POSTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights & Articles",
  description:
    "Practical thinking on tax, super, property and financial planning from the JCA-BNH team.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader active="blog" />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Insights & Articles"
        intro="Practical thinking on tax, super, property and financial planning from the JCA-BNH team."
        padding="64px 5vw 56px"
        maxWidth={1140}
        titleClamp="clamp(32px,3.8vw,48px)"
        introMaxWidth="60ch"
      />

      <section style={{ padding: "72px 5vw", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {POSTS.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="card-hover"
                style={{
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  color: "inherit",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  <h2
                    style={{
                      fontFamily: "var(--font-archivo), Archivo, sans-serif",
                      fontWeight: 700,
                      color: C.navy,
                      fontSize: 19,
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </h2>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
                    {p.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <a
              href="https://jca-bnh.com.au/category/blog/"
              className="btn-outline"
              style={{
                color: C.navy,
                border: `2px solid ${C.navy}`,
                padding: "13px 26px",
                borderRadius: 8,
                fontWeight: 700,
                display: "inline-block",
              }}
            >
              Browse the full archive &rarr;
            </a>
          </div>
        </div>
      </section>

      <SiteFooter omit={["about"]} />
    </>
  );
}
