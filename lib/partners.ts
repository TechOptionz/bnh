/**
 * KEYOB IT-partner configuration. Every KEYOB URL, label and the agreed
 * client discount lives here so the partnership can be updated from one
 * place (rendered by components/partners/*).
 */

export const KEYOB_PARTNER = {
  name: "KEYOB",
  label: "IT Partner",
  website: "https://keyob.com",
  logo: "/partners/keyob-logo.png",
  /** Homepage partner section. Absolute so it works from every page. */
  sectionHref: "/#it-partner",
  /** "Talk to KEYOB" — pre-filled subject so KEYOB knows the lead came via JCA-BNH. */
  talkHref: "mailto:info@keyob.com?subject=JCA-BNH%20client%20enquiry",
  /**
   * Agreed JCA-BNH client discount as a whole percentage.
   * Set to `null` to hide every figure and fall back to the generic
   * "preferred pricing" wording instead.
   */
  discount: 10 as number | null,
  disclaimer:
    "KEYOB is an independent technology provider. Any engagement is between you and KEYOB, and is separate from the accounting and financial services provided by JCA-BNH.",
};

/** Headline offer figure for the section's offer card ("10% off"). */
export function keyobOfferBadge(): string {
  return KEYOB_PARTNER.discount != null
    ? `${KEYOB_PARTNER.discount}% off`
    : "Preferred pricing";
}
