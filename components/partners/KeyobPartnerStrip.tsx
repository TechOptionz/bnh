import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER } from "@/lib/partners";
import { C } from "@/lib/site";

/**
 * Variant A — slim between-sections strip, host-brand tinted. One line of
 * copy with the discount figure, the partner wordmark and a link into the
 * homepage partner section. Not a top-of-page bar: the site already has one.
 */
export default function KeyobPartnerStrip() {
  const { discount } = KEYOB_PARTNER;

  return (
    <section
      aria-label="Technology partner"
      style={{
        background: "#EAF4F9",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `2px solid ${C.cyan}`,
        padding: "15px 5vw",
      }}
    >
      <div className="kbp-strip">
        <p className="kbp-strip-msg">
          {discount != null ? (
            <>
              JCA-BNH clients save{" "}
              <strong className="kbp-strip-pct">{discount}%</strong> on
              websites, AI &amp; automation.
            </>
          ) : (
            <>
              JCA-BNH clients get preferred pricing on websites, AI &amp;
              automation.
            </>
          )}
        </p>
        <span className="kbp-strip-partner">
          <span className="kbp-strip-with">Our technology partner</span>
          <KeyobLogo height={13} />
        </span>
        <a
          href={KEYOB_PARTNER.website}
          target="_blank"
          rel="noopener noreferrer"
          className="kbp-strip-cta kb-btn-navy"
        >
          Learn more
          <span className="visually-hidden">
            {" "}
            about our technology partner KEYOB (opens in a new tab)
          </span>
        </a>
      </div>
    </section>
  );
}
