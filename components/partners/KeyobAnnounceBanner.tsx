import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER } from "@/lib/partners";

/**
 * Variant A — static announcement banner. Dark navy, one line of copy with
 * the discount, the partner wordmark and a single button. No motion.
 */
export default function KeyobAnnounceBanner() {
  const { discount } = KEYOB_PARTNER;

  return (
    <section aria-label="Technology partner offer" className="kbp-announce">
      <div className="kbp-announce-inner">
        <p className="kbp-announce-msg">
          {discount != null ? (
            <>
              Clients save <strong className="kbp-announce-pct">{discount}%</strong>{" "}
              on websites, AI &amp; automation.
            </>
          ) : (
            <>Preferred client pricing on websites, AI &amp; automation.</>
          )}
        </p>

        <span className="kbp-announce-partner">
          <span className="kbp-announce-with">Our technology partner</span>
          <KeyobLogo height={13} light />
        </span>

        <a
          href={KEYOB_PARTNER.website}
          target="_blank"
          rel="noopener noreferrer"
          className="kbp-announce-cta"
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
