import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME } from "@/lib/site";

/** Home-page title: the brand plus what we do and where, for search. */
export const HOME_TITLE =
  "JCA-BNH — Accountants & Financial Advisers, Brisbane & Sunshine Coast";
export const HOME_DESCRIPTION =
  "JCA-BNH Accountants & Financial Advisers deliver tailored accounting, taxation, advisory and financial advice for businesses and individuals across Australia.";

type OgImage = { url: string; width?: number; height?: number; alt?: string };

/**
 * Per-page metadata: title, description, canonical URL and Open Graph /
 * Twitter cards. Next.js merges nested metadata objects shallowly, so every
 * page builds its full `openGraph` block here instead of relying on the
 * root layout. `path` is the route's pathname (e.g. "/about"); it is resolved
 * against `metadataBase` from the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: OgImage;
  type?: "website" | "article" | "profile";
  /** ISO date; emitted as `article:published_time` for `type: "article"`. */
  publishedTime?: string;
  /** Use `title` as-is instead of the root "%s | JCA-BNH" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const ogImage = image ?? OG_IMAGE;
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_AU",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
