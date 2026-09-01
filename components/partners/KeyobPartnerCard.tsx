import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER } from "@/lib/partners";

const LEXEND = "var(--font-lexend), Lexend, sans-serif";

/**
 * Variant C — narrow dark block for grids and rails (e.g. the "More from
 * the blog" grid). Site-navy surface with a cyan top rule, the discount as
 * the anchor, and a white CTA into the homepage partner section.
 */
export default function KeyobPartnerCard() {
  const { discount } = KEYOB_PARTNER;

  return (
    <aside aria-label="Technology partner" className="kbp-block">
      <span className="kbp-block-tag">For JCA-BNH clients</span>

      {discount != null ? (
        <>
          <span
            style={{
              fontFamily: LEXEND,
              fontWeight: 600,
              fontSize: 48,
              lineHeight: 1,
              color: "#12B7D6",
              letterSpacing: "-0.02em",
              display: "block",
            }}
          >
            {discount}%
          </span>
          <span className="kbp-block-off">Client discount</span>
        </>
      ) : (
        <span className="kbp-block-off" style={{ marginTop: 0 }}>
          Preferred client rate
        </span>
      )}

      <p className="kbp-block-copy">
        Our technology partner builds the websites, automations and systems our
        clients run on &mdash; at a preferred rate.
      </p>

      <a
        href={KEYOB_PARTNER.website}
        target="_blank"
        rel="noopener noreferrer"
        className="kbp-block-cta"
      >
        Find out more
        <span className="visually-hidden"> about KEYOB (opens in a new tab)</span>
      </a>

      <span className="kbp-block-partner">
        <span className="kbp-block-with">In partnership with</span>
        <KeyobLogo height={13} light />
      </span>
      <span className="kbp-block-fine">
        Complimentary first conversation &middot; No obligation
      </span>
    </aside>
  );
}
