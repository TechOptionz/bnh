"use client";

import { useState, useSyncExternalStore } from "react";
import KeyobLogo from "@/components/partners/KeyobLogo";
import { KEYOB_PARTNER } from "@/lib/partners";

/** Remembered for the tab so a dismissed strip stays gone between pages. */
const DISMISS_KEY = "kbp-strip-dismissed";

const subscribe = () => () => {};
const readDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};
const serverSnapshot = () => false;

/**
 * Variant A — slim, host-brand-tinted announcement strip. One line of copy
 * with the discount, the partner wordmark, a button to KEYOB's contact page
 * and a dismiss button. Used on the home page and between sections
 * on the inner pages.
 */
export default function KeyobPartnerStrip() {
  const { discount } = KEYOB_PARTNER;
  const storedDismissed = useSyncExternalStore(
    subscribe,
    readDismissed,
    serverSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);

  if (storedDismissed || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage unavailable — dismissal lasts for this page only */
    }
  };

  return (
    <section aria-label="IT partner offer" className="kbp-strip">
      <div className="kbp-strip-inner">
        <p className="kbp-strip-msg">
          {discount != null ? (
            <>
              JCA-BNH clients save{" "}
              <strong className="kbp-strip-pct">{discount}%</strong> on
              websites, automation &amp; social media.
            </>
          ) : (
            <>
              JCA-BNH clients get preferred pricing on websites, automation
              &amp; social media.
            </>
          )}
        </p>
        <span className="kbp-strip-partner">
          <span className="kbp-strip-with">Our IT partner</span>
          <KeyobLogo height={13} />
        </span>
        <a
          href={KEYOB_PARTNER.contactHref}
          target="_blank"
          rel="noopener"
          className="kbp-strip-cta kb-btn-navy"
        >
          Learn more
          <span className="visually-hidden">
            {" "}
            — contact our IT partner KEYOB (opens in a new tab)
          </span>
        </a>
      </div>
      <button
        type="button"
        className="kbp-strip-close"
        aria-label="Dismiss"
        onClick={dismiss}
      >
        &times;
      </button>
    </section>
  );
}
