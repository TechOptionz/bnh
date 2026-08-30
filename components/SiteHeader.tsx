import Link from "next/link";
import { BOOKING_URL, C } from "@/lib/site";

export type NavKey =
  | "financial-advice"
  | "accounting"
  | "about"
  | "contact"
  | "blog"
  | null;

const LINKS: { key: Exclude<NavKey, null>; href: string; label: string }[] = [
  { key: "financial-advice", href: "/financial-advice", label: "Financial Advice" },
  { key: "accounting", href: "/accounting", label: "Accounting & Tax" },
  { key: "about", href: "/about", label: "About Us" },
  { key: "contact", href: "/contact", label: "Contact" },
  { key: "blog", href: "/blog", label: "Blog" },
];

export default function SiteHeader({ active = null }: { active?: NavKey }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#FFFFFF",
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "14px 5vw",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo.png"
          alt="JCA-BNH — Better at Money Matters"
          style={{ height: 46, display: "block" }}
        />
      </Link>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 26,
          flexWrap: "wrap",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        {LINKS.map((l) => {
          const on = l.key === active;
          return (
            <Link
              key={l.key}
              href={l.href}
              className={on ? undefined : "hv-orange"}
              style={{ color: on ? C.orange : C.navy }}
            >
              {l.label}
            </Link>
          );
        })}
        <a
          href={BOOKING_URL}
          className="btn-orange"
          style={{
            background: C.orange,
            color: "#FFFFFF",
            padding: "11px 22px",
            borderRadius: 8,
            fontWeight: 700,
          }}
        >
          Book a Free Consultation
        </a>
      </nav>
    </header>
  );
}
