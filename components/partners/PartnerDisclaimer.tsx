import { KEYOB_PARTNER } from "@/lib/partners";
import { C } from "@/lib/site";

/** One-line independence disclaimer shown wherever KEYOB is promoted. */
export default function PartnerDisclaimer({
  style,
}: {
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: 13,
        lineHeight: 1.6,
        color: C.mute,
        ...style,
      }}
    >
      {KEYOB_PARTNER.disclaimer}
    </p>
  );
}
