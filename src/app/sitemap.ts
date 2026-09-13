import type { MetadataRoute } from "next";
import { BLOG_POSTS, CASE_FILES, ROUTE_PAGE_MAP, SITE } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", ...Object.keys(ROUTE_PAGE_MAP)];
  const casePaths = CASE_FILES.map((c) => `case-studies/${c.slug}`);
  const postPaths = BLOG_POSTS.map((p) => `resources/${p.slug}`);

  return [...staticPaths, ...casePaths, ...postPaths].map((path) => ({
    url: `${SITE.url}/${path}`.replace(/\/$/, "") || SITE.url,
    lastModified: new Date(),
  }));
}
