import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { StartAside } from "@/components/start-aside";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";
import { faqJsonLd } from "@/lib/schema";

const page = PAGES.careers;
export const metadata = pageMetadata("careers", page);
const careersFaq = page.blocks.find((block) => block.type === "faq");

export default function CareersPage() {
  return (
    <>
      {careersFaq && careersFaq.type === "faq" ? <JsonLd data={faqJsonLd(careersFaq.items)} /> : null}
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} />
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
