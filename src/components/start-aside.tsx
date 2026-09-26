import Link from "next/link";
import { TEAM } from "@/content/team";
import { SITE } from "@/content/site";
import { ArrowIcon } from "@/components/arrow-icon";

const NEXT = [
  "We read the brief ourselves.",
  "You get a reply within one business day.",
  "A written scope, a first date, and a cost come before any build.",
];

export function StartAside({ showFounders = false }: { showFounders?: boolean }) {
  const people = TEAM.filter((member) => member.name.trim());
  return (
    <aside className="page-aside">
      <p className="eyebrow">What happens next</p>
      <h2 className="inner-h2">A person replies.</h2>
      <ol className="aside-steps">
        {NEXT.map((step, index) => (
          <li key={step}>
            <span>0{index + 1}</span>
            {step}
          </li>
        ))}
      </ol>
      <Link href="/contact" className="button button-primary">
        Start a build
        <ArrowIcon />
      </Link>
      <p className="note">
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      {showFounders && people.length > 0 ? (
        <ul className="founder-list">
          {people.map((person) => (
            <li key={person.name}>
              <strong>{person.name}</strong>
              {person.role ? <span>{person.role}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
