import Link from "next/link";
import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER } from "@/lib/partners";

/**
 * Partner tile that drops into the existing dark call-to-action card on the
 * home services grid (`svc-`) and the division service groups (`sg-`). It
 * renders only the card's contents and reuses the host card's own classes,
 * so it inherits the site's spacing, type and hover behaviour exactly.
 */
export default function KeyobPartnerTile({
  variant,
}: {
  variant: "svc" | "sg";
}) {
  const { discount } = KEYOB_PARTNER;

  const points = [
    discount != null
      ? `${discount}% off eligible KEYOB services`
      : "Preferred pricing on eligible services",
    "A complimentary first conversation",
    "Introduced through your JCA-BNH adviser",
  ];

  return (
    <>
      <span className={`${variant}-badge`}>
        <span className={`${variant}-dot`} aria-hidden />
        Technology partner
      </span>

      <h3 className={`${variant}-title`}>
        {discount != null
          ? `${discount}% off your business systems`
          : "Better systems for your business"}
      </h3>
      <p className={`${variant}-copy`}>
        Websites, AI, automation and CRM through KEYOB &mdash; the technology
        partner we introduce our clients to.
      </p>

      <ul className={`${variant}-checks`}>
        {points.map((p) => (
          <li key={p}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m5 12.6 4.4 4.4L19 7.4" />
            </svg>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <span className="kbp-tile-partner">
        <span className="kbp-tile-with">In partnership with</span>
        <KeyobLogo height={12} light />
      </span>

      <Link href="/#technology-partner" className={`${variant}-cta-btn`}>
        Explore technology support
        <span className={`${variant}-arrow`} aria-hidden>
          &rarr;
        </span>
      </Link>

      <span className="kbp-tile-fine">
        Eligible services only. Any engagement is with KEYOB, not JCA-BNH.
      </span>
    </>
  );
}
