import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageFaqSchema } from "@/components/page-faq-schema";
import { PageShell } from "@/components/page-shell";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES["case-studies"];
export const metadata = pageMetadata("case-studies", page);

export default function CaseStudiesPage() {
  return (
    <>
      <PageFaqSchema blocks={page.blocks} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/case-studies" },
        ]}
      />
      <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks} />
    </>
  );
}
