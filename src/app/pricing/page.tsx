import { Breadcrumbs } from "@/components/breadcrumbs";
import { EngagementCards } from "@/components/engagement-cards";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";
import { faqJsonLd } from "@/lib/schema";

const page = PAGES.pricing;
export const metadata = pageMetadata("pricing", page);

const pricingFaq = page.blocks.find((block) => block.type === "faq");

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />
      {pricingFaq && pricingFaq.type === "faq" ? <JsonLd data={faqJsonLd(pricingFaq.items)} /> : null}
      <PageShell
        kicker={page.kicker}
        title={page.title}
        subhead={page.subhead}
        before={
          <div className="mt-12">
            <p className="block-label">Engagements</p>
            <h2 className="inner-h2">Three ways to start</h2>
            <div className="mt-6">
              <EngagementCards />
            </div>
          </div>
        }
        blocks={page.blocks}
      />
    </>
  );
}
