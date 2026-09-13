import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-data";

/** Canonical indexable routes only — no redirects, no template leftovers. */
const INDEXABLE = [
  "",
  "about",
  "services",
  "products",
  "industries",
  "case-studies",
  "pricing",
  "resources",
  "faq",
  "contact",
  "careers",
  "legal",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE.map((path) => ({
    url: path ? `${SITE.url}/${path}` : SITE.url,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "services" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "services" || path === "contact" ? 0.9 : 0.7,
  }));
}
