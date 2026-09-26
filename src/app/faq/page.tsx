import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { StartAside } from "@/components/start-aside";
import { FAQ_ITEMS, PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";
import { faqJsonLd } from "@/lib/schema";

const page = PAGES.faq;
export const metadata = pageMetadata("faq", page);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
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
