import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.pricing;
export const metadata = pageMetadata("pricing", page);

export default function PricingPage() {
  return <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks} />;
}
