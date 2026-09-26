import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { TEAM } from "@/content/team";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.about;
export const metadata = pageMetadata("about", page);
const people = TEAM.filter((member) => member.name.trim());

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={page.blocks}>
        {people.length > 0 ? (
          <div className="founder-grid mt-12">
            {people.map((person) => (
              <article key={person.name} className="card card-pad">
                {person.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={person.photo} alt="" className="portrait" />
                ) : null}
                <h2 className="card-title">{person.name}</h2>
                {person.role ? <p className="card-label">{person.role}</p> : null}
                {person.bio ? <p className="card-body">{person.bio}</p> : null}
              </article>
            ))}
          </div>
        ) : null}
      </PageShell>
    </>
  );
}
