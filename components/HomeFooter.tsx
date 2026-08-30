import Link from "next/link";
import {
  BACHROB_URL,
  BOOKING_URL,
  C,
  DISCLAIMER,
  EMAIL,
  FSG_URL,
  OFFICES,
  PHONE_BRISBANE,
  PHONE_SUNSHINE,
  TERMS_URL,
} from "@/lib/site";

const HEADING: React.CSSProperties = {
  fontFamily: "var(--font-archivo), Archivo, sans-serif",
  fontWeight: 700,
  color: "#FFFFFF",
  fontSize: 15,
  marginBottom: 16,
};

const LINK: React.CSSProperties = { color: C.lightBlue };

/** The expanded four-column footer used on the home page. */
export default function HomeFooter() {
  return (
    <footer
      style={{
        background: C.navyFooter,
        color: C.footerText,
        padding: "64px 5vw 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 40,
            marginBottom: 44,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-archivo), Archivo, sans-serif",
                fontWeight: 800,
                color: "#FFFFFF",
                fontSize: 20,
                marginBottom: 6,
              }}
            >
              JCA-BNH
            </div>
            <div
              style={{
                fontSize: 12.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.cyan,
                marginBottom: 16,
              }}
            >
              Better at Money Matters
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, margin: "0 0 16px" }}>
              We specialise in tailored accounting, taxation, advisory and
              financial advice to help businesses and individuals thrive.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 14,
              }}
            >
              <a href={FSG_URL} className="hv-orange" style={LINK}>
                Financial Services Guide
              </a>
              <a href={TERMS_URL} className="hv-orange" style={LINK}>
                Terms of Engagement
              </a>
              <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                <a
                  href="https://www.facebook.com/bnh.finance?mibextid=ZbWKwL"
                  className="hv-orange"
                  style={LINK}
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/company/bnhfinance"
                  className="hv-orange"
                  style={LINK}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div>
            <div style={HEADING}>Services</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                fontSize: 14,
              }}
            >
              <Link href="/financial-advice" className="hv-orange" style={LINK}>
                Financial Advice
              </Link>
              <Link href="/accounting" className="hv-orange" style={LINK}>
                Accounting, Tax &amp; Advisory
              </Link>
              <Link href="/about" className="hv-orange" style={LINK}>
                About Us
              </Link>
              <Link href="/contact" className="hv-orange" style={LINK}>
                Contact &amp; Careers
              </Link>
              <Link href="/blog" className="hv-orange" style={LINK}>
                Blog
              </Link>
              <a href={BACHROB_URL} className="hv-orange" style={LINK}>
                BachRob (sister firm)
              </a>
            </div>
          </div>

          <div>
            <div style={HEADING}>Offices</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                fontSize: 14,
                lineHeight: 1.55,
              }}
            >
              {OFFICES.map((o) => (
                <div key={o.name}>
                  <strong style={{ color: "#FFFFFF" }}>{o.name}</strong>
                  <br />
                  {o.name === "Maroochydore"
                    ? "2/68 Kingsford Smith Parade, QLD 4558"
                    : o.address}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={HEADING}>Get in touch</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                fontSize: 14,
              }}
            >
              <a href="tel:1300264346" className="hv-orange" style={LINK}>
                {PHONE_BRISBANE} (Brisbane)
              </a>
              <a href="tel:0754735444" className="hv-orange" style={LINK}>
                {PHONE_SUNSHINE} (Sunshine Coast)
              </a>
              <a href={`mailto:${EMAIL}`} className="hv-orange" style={LINK}>
                {EMAIL}
              </a>
              <a
                href={BOOKING_URL}
                className="btn-orange"
                style={{
                  background: C.orange,
                  color: "#FFFFFF",
                  padding: "11px 20px",
                  borderRadius: 8,
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${C.footerRule}`,
            paddingTop: 24,
            fontSize: 12.5,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: C.lightBlue }}>Disclaimer</strong> —{" "}
          {DISCLAIMER}
        </div>
      </div>
    </footer>
  );
}
