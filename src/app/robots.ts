import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/services/consulting",
          "/services/implementation",
          "/services/managed-services",
          "/services/support",
          "/products/pulse",
          "/clients",
          "/partners",
          "/machine-lens",
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
