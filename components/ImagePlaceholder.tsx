import { C } from "@/lib/site";

/** Grey/blue placeholder block sized like the photography in the reference
 *  design. Swap for a real <img> (same wrapper styles) when assets arrive. */
export default function ImagePlaceholder({
  ratio = "16 / 7",
  radius = 8,
  label = "Image placeholder",
}: {
  /** CSS aspect-ratio, e.g. "16 / 7" for the wide hero, "4 / 5" for portraits. */
  ratio?: string;
  radius?: number;
  label?: string;
}) {
  return (
    <div
      aria-hidden
      style={{
        aspectRatio: ratio,
        width: "100%",
        borderRadius: radius,
        background: `linear-gradient(135deg, #E4EBF3 0%, ${C.bgAlt} 55%, #E9F3F8 100%)`,
        border: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        overflow: "hidden",
      }}
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke={C.mute}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.mute }}>
        {label}
      </span>
    </div>
  );
}
