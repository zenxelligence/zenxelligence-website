import Link from "next/link";
import { HeroOrbit } from "@/components/hero-orbit";
import { NumberedDoorwayCard } from "@/components/numbered-doorway-card";
import { StatStrip } from "@/components/stat-strip";
import { FaqAccordion } from "@/components/faq-accordion";
import { ProcessSteps } from "@/components/process-steps";
import { JsonLd } from "@/components/json-ld";
import { EditorialPlate } from "@/components/editorial-plate";
import { ArrowIcon } from "@/components/arrow-icon";
import { CASE_STUDIES } from "@/content/case-studies";
import { homeMetadata } from "@/lib/page-metadata";
import { faqJsonLd } from "@/lib/schema";
import { FAQ_ITEMS, HOME_COPY, HOME_DOORWAYS, HOME_OFFERS, SITE } from "@/lib/site-data";

export const metadata = homeMetadata();

const HOME_FAQ = FAQ_ITEMS.slice(0, 5);

const HOME_STATS = [
  { value: "2 engineers", label: "One team from brief to handover." },
  { value: "5 disciplines", label: "Web, mobile, AI agents, IoT, and VLSI." },
  { value: "1 business day", label: "Reply time on a new build." },
  { value: "Brief to handover", label: "The same people scope it and finish it." },
];

export default function Home() {
  return (
    <div className="pb-16 lg:pb-0">
      <JsonLd data={faqJsonLd(HOME_FAQ)} />
      <EditorialPlate id="top" role="" bare screen>
        <div className="hero-grid">
          <div className="status-pill hero-kicker">
            <span className="dot" />
            <span className="pill-long">Now booking new product builds</span>
            <span className="pill-short">Booking new builds</span>
          </div>
          <h1 className="hero-title">
            <span className="block">Web and Android/iOS apps.</span>
            <span className="block">
              AI agent <span className="accent">automation</span>.
            </span>
            <span className="block">
              IoT and VLSI.{" "}
              <span className="nowrap">
                End to <span className="accent">end</span>
                <span className="accent">.</span>
              </span>
            </span>
          </h1>
          <div className="hero-stage-slot">
            <HeroOrbit />
          </div>
          <p className="hero-sub">{HOME_COPY.lede}</p>
          <div className="chip-row">
            {HOME_OFFERS.map((offer) => (
              <Link key={offer.label} href={offer.href} className="chip">
                {offer.label}
              </Link>
            ))}
          </div>
          <div className="hero-actions">
            <Link href="/contact" className="button button-primary">
              Start a build
              <ArrowIcon />
            </Link>
            <a href="#services" className="button button-quiet">
              <span className="quiet-icon">
                <ArrowIcon />
              </span>
              See what we ship
            </a>
          </div>
        </div>
        <div className="hero-meta">
          <span>
            {SITE.email} · we reply within 1 business day
          </span>
          <a href="#services">See what we ship ↓</a>
        </div>
      </EditorialPlate>

      <section className="plate" aria-label="Studio facts">
        <StatStrip stats={HOME_STATS} />
      </section>

      <EditorialPlate id="services" role="Services" title={HOME_COPY.thesisTitle} quiet>
        <p className="prose">{HOME_COPY.thesisBody}</p>
        <div className="doorway-grid mt-10">
          {HOME_DOORWAYS.map((doorway) => (
            <NumberedDoorwayCard key={doorway.title} {...doorway} />
          ))}
        </div>
      </EditorialPlate>

      <EditorialPlate id="process" role="How we work" title="Brief, scope, build, handover.">
        <p className="prose">
          Web apps, Android/iOS apps, AI agent automation, IoT, or VLSI — the team that scoped it is the team that finishes it.
        </p>
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </EditorialPlate>

      {CASE_STUDIES.length > 0 ? (
        <EditorialPlate id="work" role="Selected work" title="Work a client has agreed to name.">
          <div className="card-grid">
            {CASE_STUDIES.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="card card-pad">
                <span className="card-label">{study.industry || study.client}</span>
                <h3 className="card-title">{study.title}</h3>
                <p className="card-body">{study.outcome}</p>
              </Link>
            ))}
          </div>
        </EditorialPlate>
      ) : null}

      <EditorialPlate id="questions" role="Questions" title="Questions buyers ask first.">
        <FaqAccordion items={[...HOME_FAQ]} />
        <p className="mt-8">
          <Link href="/faq" className="card-link">
            Read the full FAQ
            <ArrowIcon />
          </Link>
        </p>
      </EditorialPlate>
    </div>
  );
}
