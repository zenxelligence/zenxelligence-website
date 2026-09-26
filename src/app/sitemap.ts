import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
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
  const pages = INDEXABLE.map((path) => ({
    url: path ? `${SITE.url}/${path}` : SITE.url,
    lastModified: new Date(),
    changeFrequency: (path === "" || path === "services" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : path === "services" || path === "contact" ? 0.9 : 0.7,
  }));
  const services = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...pages, ...services];
}
