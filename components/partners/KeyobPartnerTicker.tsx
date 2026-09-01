import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER } from "@/lib/partners";

/**
 * Dark navy announcement ticker — the discount message scrolls right to
 * left, mirroring the partner logo marquee's mechanics (duplicated halves,
 * -50% loop, pause on hover, static under reduced motion). The moving copy
 * is aria-hidden; screen readers get one static sentence instead.
 */
export default function KeyobPartnerTicker() {
  const { discount } = KEYOB_PARTNER;
  const offer =
    discount != null ? `${discount}% off` : "Preferred pricing";

  /** One repeating group of ticker phrases. */
  const group = (key: number) => (
    <span key={key} style={{ display: "contents" }}>
      <span className="kbp-ticker-item">
        <strong className="kbp-ticker-pct">{offer}</strong>&nbsp;for JCA-BNH
        clients
      </span>
      <span className="kbp-ticker-dot" />
      <span className="kbp-ticker-item">
        Websites &middot; AI &middot; Automation
      </span>
      <span className="kbp-ticker-dot" />
      <span className="kbp-ticker-item">
        Our technology partner
        <KeyobLogo height={12} light />
      </span>
      <span className="kbp-ticker-dot" />
    </span>
  );

  return (
    <section aria-label="Technology partner offer" className="kbp-ticker">
      <span className="visually-hidden">
        {offer} for JCA-BNH clients &mdash; websites, AI and automation with
        our technology partner KEYOB.
      </span>
      {/* Two identical halves so the -50% loop is seamless. */}
      <div className="kbp-ticker-track" aria-hidden>
        {[0, 1, 2, 3, 4, 5].map(group)}
      </div>
    </section>
  );
}
