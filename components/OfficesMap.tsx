import { C, EMAIL, OFFICES } from "@/lib/site";

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

const mapEmbed = (address: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;

const ROW_LABEL: React.CSSProperties = {
  width: 92,
  flexShrink: 0,
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: C.mute,
  paddingTop: 3,
};

const LINK: React.CSSProperties = {
  color: C.navy,
  fontWeight: 600,
  textDecoration: "underline",
  textUnderlineOffset: 4,
};

/** Label + value line in the office spec sheet. */
function DetailRow({
  label,
  children,
  first = false,
}: {
  label: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 18,
        padding: "16px 0",
        borderTop: first ? "none" : `1px solid ${C.border}`,
      }}
    >
      <span style={ROW_LABEL}>{label}</span>
      <span style={{ fontSize: 15.5, lineHeight: 1.6, color: C.body }}>
        {children}
      </span>
    </div>
  );
}

/**
 * Each office as its own full-width band — numbered heading and spec-sheet
 * details on one side, that office's map on the other, sides alternating.
 * Backgrounds alternate starting on bgAlt so it follows the bgAlt intro
 * section on the contact page.
 */
export default function OfficesMap() {
  return (
    <>
      {OFFICES.map((o, i) => {
        const onAlt = i % 2 === 0;
        return (
          <section
            key={o.name}
            style={{
              background: onAlt ? C.bgAlt : "#FFFFFF",
              padding: "clamp(48px,7vw,72px) 5vw",
            }}
          >
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(320px,100%),1fr))",
                gap: "40px 84px",
                alignItems: "center",
                /* Flip column order on alternate bands; children reset it. */
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }}
            >
              <div style={{ direction: "ltr" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 4,
                      background: C.cyan,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ fontSize: 14.5, fontWeight: 600, color: C.body }}
                  >
                    Office {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: LEXEND,
                    fontWeight: 600,
                    color: C.navy,
                    fontSize: "clamp(26px,3vw,36px)",
                    lineHeight: 1.16,
                    letterSpacing: "-0.01em",
                    margin: "0 0 22px",
                  }}
                >
                  {o.name}
                </h3>

                <div style={{ maxWidth: 520 }}>
                  <DetailRow label="Address" first>
                    <span style={{ fontWeight: 600, color: C.navy }}>
                      {o.address}
                    </span>
                  </DetailRow>
                  <DetailRow label="Phone">
                    <a href={`tel:${o.tel}`} className="hv-orange" style={LINK}>
                      {o.phone}
                    </a>
                  </DetailRow>
                  <DetailRow label="Email">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="hv-orange"
                      style={LINK}
                    >
                      {EMAIL}
                    </a>
                  </DetailRow>
                  <DetailRow label="Hours">{o.hours}</DetailRow>
                </div>

                <a
                  href={o.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{
                    display: "inline-block",
                    marginTop: 22,
                    color: C.navy,
                    border: `1.5px solid ${C.navy}`,
                    padding: "12px 24px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14.5,
                  }}
                >
                  Get directions &rarr;
                </a>
              </div>

              <iframe
                title={`Map — ${o.name} office`}
                src={mapEmbed(o.address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  direction: "ltr",
                  width: "100%",
                  height: "clamp(300px,36vw,420px)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  display: "block",
                  background: "#FFFFFF",
                }}
              />
            </div>
          </section>
        );
      })}
    </>
  );
}
