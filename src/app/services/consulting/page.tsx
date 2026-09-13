import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.consulting;
export const metadata = pageMetadata("services/consulting", page);

export default function ConsultingPage() {
  return <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks} />;
}
