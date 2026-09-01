import Link from "next/link";
import KeyobLogo from "@/components/partners/KeyobLogo";
import PartnerDisclaimer from "@/components/partners/PartnerDisclaimer";
import { KEYOB_PARTNER, keyobRateBadge } from "@/lib/partners";
import { C } from "@/lib/site";

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

/**
 * Variant B — compact partnership card, JCA-BNH branded with KEYOB as the
 * named partner. The left panel carries the lock-up, or the agreed discount
 * once one is configured in lib/partners.ts.
 */
export default function KeyobPartnerBanner() {
  const { discount } = KEYOB_PARTNER;

  return (
    <div>
      <aside aria-label="Technology partner" className="kbp-banner">
        <div className="kbp-banner-mark">
          {discount != null ? (
            <>
              <span
                style={{
                  fontFamily: LEXEND,
                  fontWeight: 600,
                  fontSize: 42,
                  lineHeight: 1,
                  color: C.navy,
                  letterSpacing: "-0.02em",
                }}
              >
                {discount}%
              </span>
              <span className="kbp-banner-mark-label">Client discount</span>
            </>
          ) : (
            <>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <span
                  style={{
                    fontFamily: LEXEND,
                    fontWeight: 600,
                    fontSize: 14,
                    color: C.navy,
                    letterSpacing: "0.02em",
                  }}
                >
                  JCA-BNH
                </span>
                <span aria-hidden style={{ color: C.mute, fontSize: 12 }}>
                  &times;
                </span>
                <KeyobLogo height={12} />
              </span>
              <span className="kbp-banner-mark-label">Technology partner</span>
            </>
          )}
        </div>

        <div className="kbp-banner-body">
          <h3
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              color: C.navy,
              fontSize: 20,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Preferred technology support for JCA-BNH clients.
          </h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
            Websites, AI, automation and business systems through our
            technology partner KEYOB, with preferred client pricing and a
            complimentary first conversation.
          </p>
          <div className="kbp-banner-foot">
            <Link
              href="/#technology-partner"
              className="kb-btn-navy"
              style={{
                background: C.navy,
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 14,
                padding: "11px 20px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              Explore technology support
            </Link>
            <span className="kbp-rate-chip">{keyobRateBadge()}</span>
          </div>
        </div>
      </aside>
      <PartnerDisclaimer style={{ marginTop: 14, fontSize: 12.5 }} />
    </div>
  );
}
