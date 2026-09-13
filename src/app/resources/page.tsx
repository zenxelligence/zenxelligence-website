import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.resources;
export const metadata = pageMetadata("resources", page);

export default function ResourcesPage() {
  return <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks} />;
}
