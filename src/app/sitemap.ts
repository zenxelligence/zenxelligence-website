import type { MetadataRoute } from "next";
import { POSTS } from "@/content/posts";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";

/** Canonical indexable routes only — no redirects, no template leftovers. */
const INDEXABLE = [
  "",
  "about",
  "services",
  "products",
  "industries",
  "case-studies",
  "pricing",
  "faq",
  "contact",
  "careers",
  "legal",
  ...(POSTS.length >= 2 ? (["resources"] as const) : []),
] as const;

const UPDATED = new Date("2026-09-26");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = INDEXABLE.map((path) => ({
    url: path ? `${SITE.url}/${path}` : SITE.url,
    lastModified: UPDATED,
    changeFrequency: (path === "" || path === "services" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : path === "services" || path === "contact" ? 0.9 : 0.7,
  }));
  const services = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    lastModified: UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...pages, ...services];
}
