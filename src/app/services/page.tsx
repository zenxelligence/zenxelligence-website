import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageFaqSchema } from "@/components/page-faq-schema";
import { PageShell } from "@/components/page-shell";
import { ProcessSteps } from "@/components/process-steps";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.services;
export const metadata = pageMetadata("services", page);

export default function ServicesPage() {
  return (
    <>
      <PageFaqSchema blocks={page.blocks} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks}>
        <div className="mt-16">
          <p className="block-label">How an engagement runs</p>
          <h2 className="inner-h2">The same four steps on every surface</h2>
          <div className="mt-8">
            <ProcessSteps />
          </div>
        </div>
      </PageShell>
    </>
  );
}
