import { KEYOB_PARTNER } from "@/lib/partners";

/**
 * KEYOB wordmark. The asset is navy for light surfaces; `light` knocks it
 * out to white for the dark partner tiles. Swap the file at
 * /public/partners/keyob-logo.png to update it everywhere at once.
 */
export default function KeyobLogo({
  height = 18,
  light = false,
}: {
  height?: number;
  light?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={KEYOB_PARTNER.logo}
      alt="KEYOB"
      style={{
        height,
        width: "auto",
        display: "block",
        filter: light ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}
