import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { POSTS, SITE_URL } from "@/lib/site";
import { TEAM } from "@/lib/team";

/** Every indexable route on the site. Keep in step with the `app/` tree. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

  const statics: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/financial-advice"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/accounting"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/team"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/careers"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const services: MetadataRoute.Sitemap = Object.keys(SERVICES).map((slug) => ({
    url: url(`/services/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Only posts with a full article body have a page.
  const posts: MetadataRoute.Sitemap = POSTS.filter((p) => ARTICLES[p.slug]).map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: new Date(p.iso),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const team: MetadataRoute.Sitemap = TEAM.map((m) => ({
    url: url(`/team/${m.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...statics, ...services, ...posts, ...team];
}
