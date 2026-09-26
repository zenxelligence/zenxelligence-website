import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { StartAside } from "@/components/start-aside";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.legal;
export const metadata = pageMetadata("legal", page);

export default function LegalPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Legal", path: "/legal" }]} />
      <PageShell
        kicker={page.kicker}
        title={page.title}
        subhead={page.subhead}
        blocks={page.blocks}
        aside={<StartAside />}
      />
    </>
  );
}
