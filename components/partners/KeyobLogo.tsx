import Image from "next/image";
import { KEYOB_PARTNER } from "@/lib/partners";

/** Natural size of /public/partners/keyob-logo.png. */
const NATURAL = { w: 219, h: 44 };

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
    <Image
      src={KEYOB_PARTNER.logo}
      alt="KEYOB"
      width={Math.round((height * NATURAL.w) / NATURAL.h)}
      height={height}
      style={{
        height,
        width: "auto",
        display: "block",
        filter: light ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}
