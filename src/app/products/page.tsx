import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageFaqSchema } from "@/components/page-faq-schema";
import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.products;
export const metadata = pageMetadata("products", page);

export default function ProductsPage() {
  return (
    <>
      <PageFaqSchema blocks={page.blocks} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "What you get", path: "/products" }]} />
      <PageShell kicker="WHAT YOU GET" title={page.title} subhead={page.subhead} blocks={page.blocks} />
    </>
  );
}
