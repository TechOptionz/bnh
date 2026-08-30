import { BOOKING_URL, C } from "@/lib/site";

/** The centred "book a consultation" band that closes each inner page. */
export default function CtaBand({
  heading,
  body,
  background = C.bgAlt,
  padding = "70px 5vw",
  headingClamp = "clamp(26px,3vw,36px)",
  bodySize = 16.5,
  buttonPadding = "15px 30px",
}: {
  heading: string;
  body: string;
  background?: string;
  padding?: string;
  headingClamp?: string;
  bodySize?: number;
  buttonPadding?: string;
}) {
  return (
    <section style={{ padding, background }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-lexend), Lexend, sans-serif",
            fontWeight: 600,
            color: C.navy,
            fontSize: headingClamp,
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            margin: "0 0 14px",
          }}
        >
          {heading}
        </h2>
        <p
          style={{ fontSize: bodySize, lineHeight: 1.65, margin: "0 0 28px" }}
        >
          {body}
        </p>
        <a
          href={BOOKING_URL}
          className="btn-orange"
          style={{
            background: C.orange,
            color: "#FFFFFF",
            padding: buttonPadding,
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            display: "inline-block",
          }}
        >
          Book a Free Consultation
        </a>
      </div>
    </section>
  );
}
