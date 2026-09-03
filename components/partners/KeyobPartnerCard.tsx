import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER } from "@/lib/partners";

/**
 * Variant C — narrow dark block for grids and rails (e.g. the "More from
 * the blog" grid). Site-navy surface with a cyan top rule, the discount as
 * the anchor, and a white CTA to KEYOB's contact page.
 */
export default function KeyobPartnerCard() {
  const { discount } = KEYOB_PARTNER;

  return (
    <aside aria-label="IT partner" className="kbp-block">
      <span className="kbp-block-tag">For JCA-BNH clients</span>

      {discount != null ? (
        <>
          <span className="kbp-block-num">{discount}%</span>
          <span className="kbp-block-off">Client discount</span>
        </>
      ) : (
        <span className="kbp-block-off" style={{ marginTop: 0 }}>
          Preferred client rate
        </span>
      )}

      <p className="kbp-block-copy">
        Our IT partner builds the websites, social media, automations and
        systems our clients run on &mdash; at a preferred rate.
      </p>

      <a
        href={KEYOB_PARTNER.contactHref}
        target="_blank"
        rel="noopener noreferrer"
        className="kbp-block-cta"
      >
        Find out more
        <span className="visually-hidden">
          {" "}
          — contact our IT partner KEYOB (opens in a new tab)
        </span>
      </a>

      <span className="kbp-block-partner">
        <span className="kbp-block-with">In partnership with</span>
        <KeyobLogo height={13} light />
      </span>
    </aside>
  );
}
