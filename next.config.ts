import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (≈20% smaller), WebP for browsers without it.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // YouTube poster frames for the click-to-play brand video.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
