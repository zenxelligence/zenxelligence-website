import Link from "next/link";
import type { ReactNode } from "react";
import { HeroOrbit } from "@/components/hero-orbit";
import { ServiceVisual, type ServiceVisualKind } from "@/components/service-visual";
import { NumberedDoorwayCard } from "@/components/numbered-doorway-card";
import { StatStrip } from "@/components/stat-strip";
import { FaqAccordion } from "@/components/faq-accordion";
import { LiveMetricsWidget } from "@/components/live-metrics-widget";
import { EditorialPlate } from "@/components/editorial-plate";
import { ArrowIcon } from "@/components/arrow-icon";
import { homeMetadata } from "@/lib/page-metadata";
import {
  HOME_COPY,
  HOME_DOORWAYS,
  HOME_OFFERS,
  HOME_PLATES,
  HOME_SPECS,
  HOME_STACK,
  HOME_STATS,
  FAQ_ITEMS,
  SITE,
} from "@/lib/site-data";

export const metadata = homeMetadata();

export default function Home() {
  const [services, web, agents, mobile, iot, vlsi, process, stack] = HOME_PLATES;

  return (
    <div className="pb-16 lg:pb-0">
      <EditorialPlate id="top" role="" bare screen>
        <div className="hero-grid">
          <div>
            <div className="hero-copy">
              <div className="status-pill">
                <span className="dot" />
                <span>Now booking new product builds</span>
              </div>
              <h1 className="hero-title">
                <span className="block">Web and Android/iOS apps.</span>
                <span className="block">AI agent automation.</span>
                <span className="block">
                  IoT and VLSI.{" "}
                  <span className="nowrap">
                    End to <span className="accent">end</span><span className="accent">.</span>
                  </span>
                </span>
              </h1>
              <p className="hero-sub">{HOME_COPY.lede}</p>
              <div className="chip-row">
                {HOME_OFFERS.map((offer) => (
                  <Link key={offer.label} href={offer.href} className="chip">
                    {offer.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hero-actions">
              <Link href="/contact" className="button button-primary">
                Start a build
                <ArrowIcon />
              </Link>
              <a href={`#${services.id}`} className="button button-quiet">
                <span className="quiet-icon">
                  <ArrowIcon />
                </span>
                See what we ship
              </a>
            </div>
          </div>
          <HeroOrbit />
        </div>
        <div className="hero-meta">
          <span>
            {SITE.email} · we reply within 1 business day
          </span>
          <a href={`#${services.id}`}>See what we ship ↓</a>
        </div>
      </EditorialPlate>

      <section className="plate" aria-label="Studio">
        <StatStrip
          stats={[
            { value: "2 engineers", label: "One team from brief to handover." },
            { value: "5 disciplines", label: "Web, mobile, AI agents, IoT, and VLSI." },
            { value: "1 business day", label: "Reply time on a new build." },
            { value: "Brief to handover", label: "The same people scope it and finish it." },
          ]}
        />
      </section>

      <EditorialPlate
        id={services.id}
        role={services.role}
        title={HOME_COPY.thesisTitle}
        quiet
      >
        <p className="prose">{HOME_COPY.thesisBody}</p>
        <div className="doorway-grid mt-10">
          {HOME_DOORWAYS.map((d) => (
            <NumberedDoorwayCard key={d.title} {...d} />
          ))}
        </div>
      </EditorialPlate>

      <StudyPlate
        plate={web}
        plateIndex={2}
        item={HOME_DOORWAYS[0]}
        stack={HOME_STACK[0].tools}
        extra={<LiveMetricsWidget showRawLink={false} />}
      />
      <StudyPlate
        plate={agents}
        plateIndex={3}
        item={HOME_DOORWAYS[1]}
        stack={HOME_STACK[1].tools}
      />
      <StudyPlate plate={mobile} plateIndex={4} item={HOME_DOORWAYS[2]} stack={HOME_STACK[2].tools} />
      <StudyPlate plate={iot} plateIndex={5} item={HOME_DOORWAYS[3]} stack={HOME_STACK[3].tools} />
      <StudyPlate plate={vlsi} plateIndex={6} item={HOME_DOORWAYS[4]} stack={HOME_STACK[4].tools} />

      <EditorialPlate
        id={process.id}
        role={process.role}
        title="Every service is end to end. We stay through handover."
      >
        <p className="prose">
          Web apps, Android/iOS apps, AI agent automation, IoT, or VLSI — the team that scoped it is the team that finishes it.
          We do not swap houses mid-build.
        </p>
        <div className="mt-10">
          <StatStrip stats={HOME_STATS} />
        </div>
      </EditorialPlate>

      <EditorialPlate
        id={stack.id}
        role={stack.role}
        title="The specification."
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>SURFACE</th>
                <th>BUILT WITH</th>
                <th>LEAVES WITH</th>
              </tr>
            </thead>
            <tbody>
              {HOME_SPECS.map(([surface, built, leaves]) => (
                <tr key={surface}>
                  <td>{surface}</td>
                  <td>{built}</td>
                  <td>{leaves}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-12">
          <Link href="/services#stack" className="card-link">
            See the full stack
            <ArrowIcon />
          </Link>
        </p>
      </EditorialPlate>

      <EditorialPlate id="questions" role="Questions" title="Questions buyers ask first.">
        <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
      </EditorialPlate>
    </div>
  );
}

const STUDY_KINDS: ServiceVisualKind[] = ["web", "agents", "mobile", "iot", "vlsi"];

function StudyPlate({
  plate,
  plateIndex,
  item,
  stack,
  extra,
}: {
  plate: (typeof HOME_PLATES)[number];
  plateIndex: number;
  item: (typeof HOME_DOORWAYS)[number];
  stack: string;
  extra?: ReactNode;
}) {
  const flip = plateIndex % 2 === 1;
  return (
    <EditorialPlate
      id={plate.id}
      no={plate.no}
      role={plate.role}
      pose={plate.pose}
      plateIndex={plateIndex}
      title={item.title}
    >
      <div className={flip ? "study-split is-flip" : "study-split"}>
        <div className="study-copy">
          <p className="prose">{item.body}</p>
          <div className="mt-8">
            <Link href="/contact" className="button button-outline">
              Start this build
              <ArrowIcon />
            </Link>
          </div>
          {extra ? <div className="mt-10">{extra}</div> : null}
        </div>
        <ServiceVisual kind={STUDY_KINDS[plateIndex - 2]} stack={stack} />
      </div>
    </EditorialPlate>
  );
}
