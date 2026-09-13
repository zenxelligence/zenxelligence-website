import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES["managed-services"];
export const metadata = pageMetadata("services/managed-services", page);

export default function ManagedServicesPage() {
  return <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks} />;
}
