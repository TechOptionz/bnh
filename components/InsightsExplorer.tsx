"use client";

import { useDeferredValue, useMemo, useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { highlightParts, searchPosts, type SearchHit } from "@/lib/blogSearch";
import { C, POSTS, type Post } from "@/lib/site";

type Sort = "relevance" | "newest" | "oldest" | "az";

const SELECT_STYLE: React.CSSProperties = {
  appearance: "none",
  WebkitAppearance: "none",
  border: `1px solid ${C.borderInput}`,
  borderRadius: 8,
  background: "#FFFFFF",
  padding: "12px 38px 12px 14px",
  fontSize: 14.5,
  fontWeight: 600,
  color: C.navy,
  cursor: "pointer",
  /* Chevron drawn as an inline SVG so the native arrow can be hidden. */
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%231B2A4C' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 14.5,
  color: C.body,
  whiteSpace: "nowrap",
};

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={LABEL_STYLE}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={SELECT_STYLE}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Renders `text` with every matched search term wrapped in a <mark>. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const parts = useMemo(() => highlightParts(text, terms), [text, terms]);
  return (
    <>
      {parts.map((part, i) =>
        part.hit ? (
          <mark
            key={i}
            style={{
              background: "rgba(0,174,199,0.18)",
              color: "inherit",
              borderRadius: 3,
              padding: "0 1px",
            }}
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

function PostCard({ post, hit }: { post: Post; hit?: SearchHit }) {
  const terms = hit?.matched ?? [];
  return (
    <a
      href={post.href}
      className="post-card"
      style={{
        display: "flex",
        flexDirection: "column",
        color: "inherit",
      }}
    >
      <div style={{ borderRadius: 14, overflow: "hidden" }}>
        {post.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.img}
            alt={post.alt}
            style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <ImagePlaceholder ratio="4 / 3" radius={14} />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          marginTop: 20,
          fontSize: 13.5,
          fontWeight: 600,
          color: C.teal,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="2.5" fill={C.teal} />
          </svg>
          {post.type}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            color: C.mute,
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            stroke={C.mute}
            strokeWidth="1.5"
          >
            <rect x="1" y="2" width="12" height="11" rx="2" />
            <path d="M1 5.5h12M4.5 1v2.5M9.5 1v2.5" />
          </svg>
          {post.date}
        </span>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-lexend), Lexend, sans-serif",
          fontWeight: 600,
          color: C.navy,
          fontSize: 21,
          lineHeight: 1.3,
          margin: "12px 0 10px",
        }}
      >
        <Highlight text={post.title} terms={terms} />
      </h2>
      <p style={{ margin: "0 0 14px", fontSize: 15, lineHeight: 1.65 }}>
        <Highlight text={post.excerpt} terms={terms} />
      </p>
      {/* Body-only hits show where in the article the keyword actually lives. */}
      {hit?.snippet ? (
        <p
          style={{
            margin: "0 0 18px",
            padding: "10px 14px",
            borderLeft: `3px solid ${C.cyan}`,
            background: C.bgAlt,
            borderRadius: "0 8px 8px 0",
            fontSize: 14,
            lineHeight: 1.6,
            color: C.body,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              color: C.teal,
              marginBottom: 4,
            }}
          >
            Found in this article
          </span>
          <Highlight text={hit.snippet} terms={terms} />
        </p>
      ) : null}
      <span style={{ flex: 1 }} />
      <span
        className="post-card-more"
        style={{
          alignSelf: "flex-start",
          border: `1.5px solid ${C.borderInput}`,
          borderRadius: 8,
          padding: "11px 20px",
          fontSize: 14.5,
          fontWeight: 600,
          color: C.navy,
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          marginTop: 8,
          transition: "border-color 0.25s ease, color 0.25s ease",
        }}
      >
        Read more
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 6h11.5M8 1.5L12.5 6L8 10.5" />
        </svg>
      </span>
    </a>
  );
}

export default function InsightsExplorer() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>("newest");

  /* Keeps typing responsive: the input updates immediately while the (heavier)
     full-text pass over every article renders at a lower priority. */
  const deferredQuery = useDeferredValue(query);
  const searching = deferredQuery.trim().length > 0;
  const stale = query !== deferredQuery;

  const types = useMemo(() => Array.from(new Set(POSTS.map((p) => p.type))), []);
  const categories = useMemo(
    () => Array.from(new Set(POSTS.map((p) => p.category))).sort(),
    []
  );

  const hits = useMemo(() => {
    const pool = POSTS.filter(
      (p) =>
        (type === "all" || p.type === type) &&
        (category === "all" || p.category === category)
    );
    const found = searchPosts(deferredQuery, pool);

    /* searchPosts already returns relevance order; the other sorts re-order it
       while keeping each hit's matched terms and snippet attached. */
    const effective: Sort = sort === "relevance" && !searching ? "newest" : sort;
    if (effective === "relevance") return found;
    return [...found].sort((a, b) =>
      effective === "az"
        ? a.post.title.localeCompare(b.post.title)
        : effective === "oldest"
          ? a.post.iso.localeCompare(b.post.iso)
          : b.post.iso.localeCompare(a.post.iso)
    );
  }, [deferredQuery, searching, type, category, sort]);

  const onQueryChange = (v: string) => {
    setQuery(v);
    // Typing should surface the best match first; clearing restores Newest.
    if (v.trim() && sort === "newest") setSort("relevance");
    if (!v.trim() && sort === "relevance") setSort("newest");
  };

  const filtered = type !== "all" || category !== "all";

  const clearFilters = () => {
    setQuery("");
    setType("all");
    setCategory("all");
    setSort("newest");
  };

  return (
    <div>
      {/* Search + filter bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px 28px",
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 320 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onQueryChange("");
            }}
            placeholder="Search articles"
            aria-label="Search articles by title, topic or content"
            style={{
              width: "100%",
              border: `1px solid ${searching ? C.cyan : C.borderInput}`,
              borderRadius: 8,
              padding: "12px 44px 12px 14px",
              fontSize: 14.5,
              color: C.navy,
              outlineColor: C.cyan,
              transition: "border-color 0.2s ease",
            }}
          />
          {searching || query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                width: 28,
                height: 28,
                display: "grid",
                placeItems: "center",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: C.navy,
                padding: 0,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </button>
          ) : (
            <svg
              width="17"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
              stroke={C.navy}
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{
                position: "absolute",
                right: 15,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <circle cx="7.5" cy="7.5" r="5.5" />
              <path d="M12 12l4.5 4.5" />
            </svg>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px 28px",
            flexWrap: "wrap",
          }}
        >
          <FilterSelect
            label="Type"
            value={type}
            onChange={setType}
            options={[
              { value: "all", label: "All types" },
              ...types.map((t) => ({ value: t, label: t })),
            ]}
          />
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={[
              { value: "all", label: "All categories" },
              ...categories.map((c) => ({ value: c, label: c })),
            ]}
          />
          <FilterSelect
            label="Sort by"
            value={sort}
            onChange={(v) => setSort(v as Sort)}
            options={[
              ...(searching
                ? [{ value: "relevance", label: "Relevance" }]
                : []),
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
              { value: "az", label: "A to Z" },
            ]}
          />
        </div>
      </div>

      {/* Result summary */}
      <div
        aria-live="polite"
        style={{
          minHeight: 22,
          marginBottom: 28,
          fontSize: 14.5,
          color: C.body,
          opacity: stale ? 0.55 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {searching || filtered ? (
          <span>
            <strong style={{ color: C.navy }}>{hits.length}</strong>{" "}
            {hits.length === 1 ? "article" : "articles"}
            {searching ? (
              <>
                {" "}
                matching{" "}
                <strong style={{ color: C.navy }}>
                  &ldquo;{deferredQuery.trim()}&rdquo;
                </strong>
              </>
            ) : null}
            {" · "}
            <button
              type="button"
              onClick={clearFilters}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                font: "inherit",
                color: C.teal,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Reset
            </button>
          </span>
        ) : null}
      </div>

      {/* Card grid */}
      {hits.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "56px 32px",
            opacity: stale ? 0.6 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {hits.map((h) => (
            <PostCard key={h.post.href} post={h.post} hit={h} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "72px 24px",
            background: C.bgAlt,
            borderRadius: 14,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-lexend), Lexend, sans-serif",
              fontWeight: 600,
              color: C.navy,
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            No articles match your search
          </div>
          <p style={{ margin: "0 0 22px", fontSize: 15 }}>
            Try a different keyword, or reset the filters below.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="btn-outline"
            style={{
              background: "none",
              cursor: "pointer",
              color: C.navy,
              border: `2px solid ${C.navy}`,
              padding: "12px 24px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14.5,
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
