import Link from "next/link";
import { C } from "@/lib/site";

/** The consent line shown under every form's submit button. The policy opens
 *  in a new tab so a half-filled form isn't lost. */
export default function PrivacyNote({
  action = "submitting this form",
}: {
  /** What the visitor is about to do, e.g. "sending this enquiry". */
  action?: string;
}) {
  return (
    <div style={{ fontSize: 13, lineHeight: 1.55, color: C.mute }}>
      By {action} you agree to our{" "}
      <Link
        href="/privacy-policy"
        target="_blank"
        rel="noopener"
        className="hv-orange"
        style={{ color: C.navy, fontWeight: 600, textDecoration: "underline" }}
      >
        Privacy Policy
      </Link>
      .
    </div>
  );
}
