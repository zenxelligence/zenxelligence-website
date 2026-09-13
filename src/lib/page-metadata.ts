import type { Metadata } from "next";
import type { PageContent } from "@/lib/site-data";

export function pageMetadata(slug: string, page: PageContent): Metadata {
  const description = page.subhead ?? page.title;
  return {
    title: page.title,
    description,
    openGraph: {
      title: page.title,
      description,
      images: [`/og/${slug}`],
    },
  };
}
