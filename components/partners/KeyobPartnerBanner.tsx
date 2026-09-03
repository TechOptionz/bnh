import KeyobLogo from "@/components/partners/KeyobLogo";
import PartnerDisclaimer from "@/components/partners/PartnerDisclaimer";
import { KEYOB_PARTNER } from "@/lib/partners";

/**
 * Variant B — compact partnership card, content-width. Left panel carries
 * the discount figure, the body's button goes to KEYOB's contact page.
 * Used mid-page on the home page and on the business/accounting service
 * pages.
 */
export default function KeyobPartnerBanner() {
  const { discount } = KEYOB_PARTNER;

  return (
    <div>
      <aside aria-label="IT partner" className="kbp-banner">
        <div className="kbp-banner-mark">
          {discount != null ? (
            <>
              <span className="kbp-banner-num">{discount}%</span>
              <span className="kbp-banner-mark-label">Client discount</span>
            </>
          ) : (
            <>
              <span className="kbp-banner-num kbp-banner-num--text">
                Preferred
              </span>
              <span className="kbp-banner-mark-label">Client rate</span>
            </>
          )}
        </div>

        <div className="kbp-banner-body">
          <h3 className="kbp-banner-title">
            We advise on your systems. Our IT partner builds them.
          </h3>
          <p className="kbp-banner-copy">
            Websites, social media, AI and automation for growing businesses
            &mdash; at a preferred rate for JCA-BNH clients. The first
            conversation is free.
          </p>
          <div className="kbp-banner-foot">
            <a
              href={KEYOB_PARTNER.contactHref}
              target="_blank"
              rel="noopener"
              className="kbp-banner-cta kb-btn-navy"
            >
              See what&rsquo;s included
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <span className="kbp-banner-partner">
              <span className="kbp-banner-with">In partnership with</span>
              <KeyobLogo height={14} />
            </span>
          </div>
        </div>
      </aside>
      <PartnerDisclaimer style={{ marginTop: 14, fontSize: 12.5 }} />
    </div>
  );
}
