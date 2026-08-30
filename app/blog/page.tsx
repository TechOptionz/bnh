import type { Metadata } from "next";
import InsightsExplorer from "@/components/InsightsExplorer";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import { C } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs & Articles",
  description:
    "Practical thinking on tax, super, property and financial planning from the JCA-BNH team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        active="blog"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Blogs" },
        ]}
        title="Blogs"
        intro="Practical thinking on tax, super, property and financial planning from the JCA-BNH team."
        padding="160px 5vw 64px"
        maxWidth={1200}
        titleClamp="clamp(38px,5vw,64px)"
        introMaxWidth="60ch"
      />

      <section style={{ padding: "64px 5vw 88px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <InsightsExplorer />
          <div style={{ textAlign: "center", marginTop: 72 }}>
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
