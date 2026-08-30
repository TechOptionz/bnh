import Link from "next/link";
import { BOOKING_URL, C } from "@/lib/site";

export type ServiceGroup = {
  /** Group heading, e.g. "Life & Retirement". */
  heading: string;
  /** Colour of the small square beside the heading. */
  dot: string;
  cards: { slug: string; title: string; blurb: string }[];
  /** Appends the "Not sure what you need?" tile to this group. */
  showHelpCard?: boolean;
};

const CARD_TITLE: React.CSSProperties = {
  fontFamily: "var(--font-archivo), Archivo, sans-serif",
  fontWeight: 700,
  color: C.navy,
  fontSize: 18,
  margin: "0 0 8px",
};

export default function ServiceGroups({ groups }: { groups: ServiceGroup[] }) {
  return (
    <section style={{ padding: "76px 5vw", background: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        {groups.map((g) => (
          <div key={g.heading}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: g.dot,
                }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-archivo), Archivo, sans-serif",
                  fontWeight: 800,
                  color: C.navy,
                  fontSize: 26,
                  margin: 0,
                }}
              >
                {g.heading}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: 20,
              }}
            >
              {g.cards.map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/${c.slug}`}
                  className="card-hover"
                  style={{
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: "26px 24px",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <h3 style={CARD_TITLE}>{c.title}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
                    {c.blurb}
                  </p>
                </Link>
              ))}
              {g.showHelpCard && (
                <div
                  style={{
                    background: C.bgAlt,
                    borderRadius: 12,
                    padding: "26px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <h3 style={{ ...CARD_TITLE, margin: 0 }}>
                    Not sure what you need?
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
                    Start with a free 30-minute consultation and we&#39;ll
                    point you in the right direction.
                  </p>
                  <a
                    href={BOOKING_URL}
                    className="hv-orange"
                    style={{ fontWeight: 700, color: C.orange }}
                  >
                    Book now &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
