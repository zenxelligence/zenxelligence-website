import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { INDUSTRIES } from "@/content/industries";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.industries;
export const metadata = pageMetadata("industries", page);

export default function IndustriesPage() {
  const hasIndustries = INDUSTRIES.length > 0;
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: hasIndustries ? "Industries" : "Approach", path: "/industries" }]}
      />
      <PageShell
        kicker={hasIndustries ? "INDUSTRIES" : page.kicker}
        title={hasIndustries ? "Industries we have actually worked in." : page.title}
        subhead={
          hasIndustries
            ? "Only industries with real work behind them. Nothing here is a vertical we invented for the menu."
            : page.subhead
        }
        blocks={hasIndustries ? [] : page.blocks}
      >
        {hasIndustries ? (
          <div className="tile-grid mt-10">
            {INDUSTRIES.map((industry) => (
              <div key={industry.name} className="tile">
                <span className="tile-copy">
                  <h2 className="tile-title">{industry.name}</h2>
                  {industry.problems.map((problem) => (
                    <span key={problem} className="tile-line">
                      {problem}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        ) : null}
        <p className="mt-10">
          <Link href="/services#stack" className="card-link">
            See the full stack
          </Link>
        </p>
      </PageShell>
    </>
  );
}
