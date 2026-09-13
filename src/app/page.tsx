import Link from "next/link";
import type { ReactNode } from "react";
import { HeroStack } from "@/components/hero-stack";
import { LogicCore } from "@/components/logic-core";
import { NumberedDoorwayCard } from "@/components/numbered-doorway-card";
import { StatStrip } from "@/components/stat-strip";
import { LiveMetricsWidget } from "@/components/live-metrics-widget";
import { EditorialPlate } from "@/components/editorial-plate";
import { PlateIndex } from "@/components/plate-index";
import {
  HOME_COPY,
  HOME_DOORWAYS,
  HOME_OFFERS,
  HOME_PLATES,
  HOME_SPECS,
  HOME_STACK,
  HOME_STATS,
  SITE,
} from "@/lib/site-data";

export default function Home() {
  const [opening, repose, web, agents, android, iot, vlsi, finish, spec, index] = HOME_PLATES;

  return (
    <div className="pb-16 lg:pb-0">
      <PlateIndex />

      <EditorialPlate
        id={opening.id}
        no={opening.no}
        role={opening.role}
        pose={opening.pose}
        plateIndex={0}
        bare
        screen
      >
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
          <div>
            <div className="inline-flex items-center gap-2 border border-border px-2.5 py-1.5 font-mono text-xs text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Now booking new product builds</span>
            </div>

            <HeroStack
              className="mt-5 m-0 text-[clamp(26px,4.6vw,54px)] leading-[1.05] font-semibold tracking-[-0.038em] [&_span]:whitespace-nowrap"
              lines={HOME_COPY.headline.map((text) => ({ text }))}
            />

            <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-fg-muted">
              {HOME_COPY.lede}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {HOME_OFFERS.map((offer) => (
                <Link
                  key={offer.label}
                  href={`#${offerAnchor(offer.label)}`}
                  className="border border-border px-3 py-1.5 font-mono text-[11.5px] text-fg hover:border-accent hover:text-accent"
                >
                  {offer.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="bg-accent px-6 py-3 font-mono text-[12.5px] text-bg hover:bg-fg hover:text-bg"
              >
                Start a build →
              </Link>
              <a
                href={`#${repose.id}`}
                className="font-mono text-[12px] text-fg-muted hover:text-accent"
              >
                See what we ship
              </a>
            </div>
            <p className="mt-3 font-mono text-[11.5px] text-fg-muted">
              {SITE.email} · we reply within 1 business day
            </p>
          </div>

          <LogicCore />
        </div>
      </EditorialPlate>

      <EditorialPlate
        id={repose.id}
        no={repose.no}
        role={repose.role}
        pose={repose.pose}
        plateIndex={1}
        title={HOME_COPY.thesisTitle}
        quiet
      >
        <p className="max-w-[680px] text-lg leading-relaxed text-fg-muted">{HOME_COPY.thesisBody}</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_DOORWAYS.map((d) => (
            <NumberedDoorwayCard key={d.title} {...d} href={`#${offerAnchor(d.title)}`} />
          ))}
        </div>
      </EditorialPlate>

      <StudyPlate plate={web} plateIndex={2} item={HOME_DOORWAYS[0]} stack={HOME_STACK[0].tools} />
      <StudyPlate
        plate={agents}
        plateIndex={3}
        item={HOME_DOORWAYS[1]}
        stack={HOME_STACK[1].tools}
        extra={<LiveMetricsWidget showRawLink={false} />}
      />
      <StudyPlate plate={android} plateIndex={4} item={HOME_DOORWAYS[2]} stack={HOME_STACK[2].tools} />
      <StudyPlate plate={iot} plateIndex={5} item={HOME_DOORWAYS[3]} stack={HOME_STACK[3].tools} />
      <StudyPlate plate={vlsi} plateIndex={6} item={HOME_DOORWAYS[4]} stack={HOME_STACK[4].tools} />

      <EditorialPlate
        id={finish.id}
        no={finish.no}
        role={finish.role}
        pose={finish.pose}
        plateIndex={7}
        title="Every service is end to end. We stay through handover."
      >
        <p className="max-w-[640px] text-lg leading-relaxed text-fg-muted">
          Web apps, Android/iOS apps, AI agent automation, IoT, or VLSI — the team that scoped it is the team that finishes it.
          We do not swap houses mid-build.
        </p>
        <div className="mt-10">
          <StatStrip stats={HOME_STATS} />
        </div>
      </EditorialPlate>

      <EditorialPlate
        id={spec.id}
        no={spec.no}
        role={spec.role}
        pose={spec.pose}
        plateIndex={8}
        title="The specification."
      >
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">
                <th className="py-4 pr-6 font-medium">SURFACE</th>
                <th className="py-4 pr-6 font-medium">BUILT WITH</th>
                <th className="py-4 font-medium">LEAVES WITH</th>
              </tr>
            </thead>
            <tbody>
              {HOME_SPECS.map(([surface, built, leaves]) => (
                <tr key={surface} className="border-t border-border">
                  <td className="py-4.5 pr-6 text-[17px] font-semibold tracking-[-0.015em]">
                    {surface}
                  </td>
                  <td className="py-4.5 pr-6 font-mono text-[13px] text-fg-muted">{built}</td>
                  <td className="py-4.5 text-[15px] text-fg-muted">{leaves}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EditorialPlate>

      <EditorialPlate
        id={index.id}
        no={index.no}
        role={index.role}
        pose={index.pose}
        plateIndex={9}
        title={HOME_COPY.closeTitle}
      >
        <ol className="grid max-w-[720px] grid-cols-1 gap-0 sm:grid-cols-2">
          {HOME_PLATES.map((plate) => (
            <li key={plate.id} className="border-b border-border">
              <a
                href={`#${plate.id}`}
                className="flex items-baseline justify-between gap-4 py-3.5 text-fg hover:text-accent"
              >
                <span className="font-mono text-[11px] text-fg-muted">{plate.no}</span>
                <span className="flex-1 text-[15px]">{plate.nav}</span>
                <span className="font-mono text-[10.5px] text-fg-muted">{plate.pose}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-3.5">
          <Link
            href="/contact"
            className="bg-accent px-6 py-3.75 font-mono text-[12.5px] text-bg hover:bg-fg hover:text-bg"
          >
            Start a build →
          </Link>
          <span className="font-mono text-[11.5px] text-fg-muted">
            {SITE.email} · we reply within 1 business day
          </span>
        </div>
      </EditorialPlate>
    </div>
  );
}

function offerAnchor(label: string) {
  if (label.includes("Web") || label.includes("API")) return "plate-web";
  if (label.includes("agent") || label.includes("workflow") || label.includes("AI")) {
    return "plate-agents";
  }
  if (label.includes("Android") || label.includes("iOS")) return "plate-android";
  if (label.includes("VLSI")) return "plate-vlsi";
  return "plate-iot";
}

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
  return (
    <EditorialPlate
      id={plate.id}
      no={plate.no}
      role={plate.role}
      pose={plate.pose}
      plateIndex={plateIndex}
      title={item.title}
    >
      <p className="max-w-[640px] text-lg leading-relaxed text-fg-muted">{item.body}</p>
      <p className="mt-5 font-mono text-[12px] tracking-[0.06em] text-accent">{stack}</p>
      <div className="mt-8">
        <Link
          href="/contact"
          className="inline-block border border-accent px-5 py-2.5 font-mono text-[12px] text-accent hover:bg-accent hover:text-bg"
        >
          Start this build →
        </Link>
      </div>
      {extra ? <div className="mt-10 max-w-[560px]">{extra}</div> : null}
    </EditorialPlate>
  );
}
