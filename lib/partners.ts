/**
 * KEYOB technology-partner configuration. Every KEYOB URL, label and the
 * agreed client discount lives here so the partnership can be updated from
 * one place (rendered by components/partners/*).
 */

export const KEYOB_PARTNER = {
  name: "KEYOB",
  label: "Technology Partner",
  website: "https://keyob.com",
  logo: "/partners/keyob-logo.png",
  /** Where "Request an introduction" sends visitors. External — opens in a new tab. */
  introHref: "https://www.keyob.com/contact#contact",
  /**
   * Agreed JCA-BNH client discount as a whole percentage.
   * Set to `null` to hide every figure and fall back to the generic
   * "preferred pricing" wording instead.
   */
  discount: 10 as number | null,
  disclaimer:
    "KEYOB is an independent technology provider. Any engagement with KEYOB is separate from the accounting and financial services provided by JCA-BNH.",
};

/** Short pricing line used wherever the client benefit is mentioned. */
export function keyobPricingLabel(): string {
  return KEYOB_PARTNER.discount != null
    ? `${KEYOB_PARTNER.discount}% off for JCA-BNH clients`
    : "Preferred JCA-BNH client pricing";
}

/** Compact form of the same line, for the banners' tight layouts. */
export function keyobRateBadge(): string {
  return KEYOB_PARTNER.discount != null
    ? `${KEYOB_PARTNER.discount}% client discount`
    : "Preferred client rate";
}
