import { PageShell } from "@/components/page-shell";
import { LiveMetricsWidget } from "@/components/live-metrics-widget";
import { FadeInSection } from "@/components/fade-in-section";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES["machine-lens"];
export const metadata = pageMetadata("machine-lens", page);

export default function MachineLensPage() {
  return (
    <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks}>
      <FadeInSection className="mt-13 max-w-[420px]">
        <LiveMetricsWidget />
      </FadeInSection>
    </PageShell>
  );
}
