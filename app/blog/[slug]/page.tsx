import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import { ARTICLES, postBySlug } from "@/lib/blog";
import { C, DISCLAIMER, POSTS } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const LEXEND = "var(--font-lexend), Lexend, sans-serif";
const WRAP: React.CSSProperties = { maxWidth: 860, margin: "0 auto" };

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

function Meta({ post }: { post: NonNullable<ReturnType<typeof postBySlug>> }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 22,
        fontSize: 13.5,
        fontWeight: 600,
        color: C.lightBlue,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="12" height="12" rx="2.5" fill={C.cyan} />
        </svg>
        {post.category}
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          stroke={C.lightBlue}
          strokeWidth="1.5"
        >
          <rect x="1" y="2" width="12" height="11" rx="2" />
          <path d="M1 5.5h12M4.5 1v2.5M9.5 1v2.5" />
        </svg>
        {post.date}
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {post.type}
      </span>
    </div>
  );
}

export default async function BlogArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  const article = ARTICLES[slug];
  if (!post || !article) notFound();

  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        active="blog"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blog" },
          { label: post.title },
        ]}
        title={post.title}
        padding="160px 5vw 56px"
        maxWidth={980}
        titleClamp="clamp(30px,3.8vw,48px)"
        titleMaxWidth="24ch"
      >
        <Meta post={post} />
      </PageHero>

      {/* ---- Article body ---- */}
      <article style={{ background: "#FFFFFF", padding: "clamp(44px,7vw,56px) 5vw 40px" }}>
        <div style={WRAP}>
          {/* Feature image (placeholder until final assets arrive) */}
          <div style={{ marginBottom: 44 }}>
            {post.img ? (
              <div style={{ borderRadius: 12, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.img}
                  alt={post.alt}
                  style={{
                    width: "100%",
                    aspectRatio: "16/8",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ) : (
              <ImagePlaceholder ratio="16 / 8" radius={12} />
            )}
          </div>

          {article.intro.map((p) => (
            <p
              key={p}
              style={{
                fontSize: 17.5,
                lineHeight: 1.8,
                color: C.body,
                margin: "0 0 22px",
              }}
            >
              {p}
            </p>
          ))}

          {article.sections.map((s, i) => (
            <section key={s.h}>
              <h2
                style={{
                  fontFamily: LEXEND,
                  fontWeight: 600,
                  color: C.navy,
                  fontSize: "clamp(22px,2.4vw,28px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  margin: "40px 0 16px",
                }}
              >
                {s.h}
              </h2>
              {s.paras.map((p) => (
                <p
                  key={p}
                  style={{
                    fontSize: 16.5,
                    lineHeight: 1.8,
                    color: C.body,
                    margin: "0 0 18px",
                  }}
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 13,
                    margin: "4px 0 22px",
                  }}
                >
                  {s.bullets.map((b) => (
                    <div
                      key={b}
                      style={{
                        display: "flex",
                        gap: 13,
                        alignItems: "baseline",
                      }}
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
                      <span
                        style={{
                          fontSize: 16,
                          lineHeight: 1.7,
                          color: C.body,
                        }}
                      >
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {/* Mid-article visual break */}
              {i === 1 &&
                (article.midImg ? (
                  <div style={{ margin: "36px 0 8px", borderRadius: 12, overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.midImg}
                      alt={article.midAlt ?? ""}
                      style={{
                        width: "100%",
                        aspectRatio: "16/7",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ margin: "36px 0 8px" }}>
                    <ImagePlaceholder ratio="16 / 7" radius={12} />
                  </div>
                ))}
            </section>
          ))}

          {/* Key takeaways */}
          <div
            style={{
              background: C.bgAlt,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "clamp(26px,4vw,40px)",
              margin: "48px 0 0",
            }}
          >
            <h2
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: 22,
                margin: "0 0 18px",
              }}
            >
              Key takeaways
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {article.takeaways.map((t) => (
                <div
                  key={t}
                  style={{ display: "flex", gap: 13, alignItems: "baseline" }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke={C.teal}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, transform: "translateY(2px)" }}
                  >
                    <path d="M2 8.5L6 12.5L14 3.5" />
                  </svg>
                  <span
                    style={{ fontSize: 15.5, lineHeight: 1.65, color: C.body }}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* General advice disclaimer */}
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.7,
              color: C.mute,
              margin: "32px 0 0",
              fontStyle: "italic",
            }}
          >
            {DISCLAIMER}
          </p>
        </div>
      </article>

      {/* ---- More articles ---- */}
      <section style={{ background: "#FFFFFF", padding: "40px 5vw clamp(56px,8vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 32,
              borderTop: `1px solid ${C.border}`,
              paddingTop: 56,
            }}
          >
            <h2
              style={{
                fontFamily: LEXEND,
                fontWeight: 600,
                color: C.navy,
                fontSize: "clamp(24px,2.6vw,32px)",
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              More from the blog
            </h2>
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
            {others.map((p) => (
              <Link
                key={p.slug}
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
                    padding: "20px 22px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  <div style={{ fontSize: 13, color: C.mute, fontWeight: 600 }}>
                    {p.date}
                  </div>
                  <h3
                    style={{
                      fontFamily: LEXEND,
                      fontWeight: 600,
                      color: C.navy,
                      fontSize: 18,
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want advice tailored to your situation?"
        body="General information is a starting point — the right next step depends on your goals, your numbers and your stage of life. Talk it through with a JCA-BNH adviser."
      />

      <SiteFooter omit={["about"]} />
    </>
  );
}
