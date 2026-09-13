import { PageShell } from "@/components/page-shell";
import { FAQ_JSON_LD, PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.faq;
export const metadata = pageMetadata("faq", page);

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks} />
    </>
  );
}
