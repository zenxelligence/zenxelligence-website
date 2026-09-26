import { PageShell } from "@/components/page-shell";
import { StartAside } from "@/components/start-aside";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.contact;
export const metadata = pageMetadata("contact", page);

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageShell
        kicker={page.kicker}
        title={page.title}
        subhead="Tell us what has to exist at handover. A person on the team reads it."
        blocks={page.blocks}
        aside={<StartAside showFounders />}
      />
    </>
  );
}
