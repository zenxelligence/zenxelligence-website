import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.implementation;
export const metadata = pageMetadata("services/implementation", page);

export default function ImplementationPage() {
  return <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks} />;
}
