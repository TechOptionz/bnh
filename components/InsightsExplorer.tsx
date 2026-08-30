"use client";

import { useMemo, useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { C, POSTS, type Post } from "@/lib/site";

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

function PostCard({ post }: { post: Post }) {
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
        {post.title}
      </h2>
      <p style={{ margin: "0 0 22px", fontSize: 15, lineHeight: 1.65, flex: 1 }}>
        {post.excerpt}
      </p>
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
  const [sort, setSort] = useState<"newest" | "oldest" | "az">("newest");

  const types = useMemo(
    () => Array.from(new Set(POSTS.map((p) => p.type))),
    []
  );
  const categories = useMemo(
    () => Array.from(new Set(POSTS.map((p) => p.category))).sort(),
    []
  );

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = POSTS.filter(
      (p) =>
        (type === "all" || p.type === type) &&
        (category === "all" || p.category === category) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q))
    );
    return list.sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : sort === "oldest"
          ? a.iso.localeCompare(b.iso)
          : b.iso.localeCompare(a.iso)
    );
  }, [query, type, category, sort]);

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
          marginBottom: 48,
        }}
      >
        <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 320 }}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search articles"
            style={{
              width: "100%",
              border: `1px solid ${C.borderInput}`,
              borderRadius: 8,
              padding: "12px 44px 12px 14px",
              fontSize: 14.5,
              color: C.navy,
              outlineColor: C.cyan,
            }}
          />
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
            onChange={(v) => setSort(v as typeof sort)}
            options={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
              { value: "az", label: "A to Z" },
            ]}
          />
        </div>
      </div>

      {/* Card grid */}
      {posts.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "56px 32px",
          }}
        >
          {posts.map((p) => (
            <PostCard key={p.href} post={p} />
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
