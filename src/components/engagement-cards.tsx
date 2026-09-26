import Link from "next/link";
import { ENGAGEMENTS } from "@/content/pricing";
import { ArrowIcon } from "@/components/arrow-icon";

export function EngagementCards() {
  return (
    <div className="card-grid engagement-grid">
      {ENGAGEMENTS.map((engagement) => (
        <article
          key={engagement.name}
          className={engagement.highlighted ? "card card-pad is-highlight" : "card card-pad"}
        >
          <h3 className="card-title">{engagement.name}</h3>
          <p className="card-body">{engagement.forWho}</p>
          <ul className="bullet-list">
            {engagement.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {engagement.startingFrom ? <p className="note">From {engagement.startingFrom}</p> : null}
          {engagement.duration ? <p className="note">{engagement.duration}</p> : null}
          <Link
            href="/contact"
            className={engagement.highlighted ? "button button-primary" : "button button-outline"}
          >
            Start a build
            <ArrowIcon />
          </Link>
        </article>
      ))}
    </div>
  );
}
