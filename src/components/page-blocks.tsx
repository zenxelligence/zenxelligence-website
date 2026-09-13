import Link from "next/link";
import type { Block } from "@/lib/site-data";
import { CASE_FILES } from "@/lib/site-data";
import { CapabilityTile } from "@/components/capability-tile";
import { StatStrip } from "@/components/stat-strip";
import { LiveStatusBadge } from "@/components/live-status-badge";
import { CaseStudyCard } from "@/components/case-study-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { FadeInSection } from "@/components/fade-in-section";
import { ContactForm } from "@/components/contact-form";

export function PageBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <FadeInSection key={i} className="mt-13">
          <BlockRenderer block={block} />
        </FadeInSection>
      ))}
    </>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "label":
      return (
        <div className="border-b border-border pb-4.5 font-mono text-[11px] tracking-[0.06em] text-fg-muted">
          {block.label}
        </div>
      );

    case "prose":
      return <p className="m-0 max-w-[760px] text-[17px] leading-relaxed">{block.text}</p>;

    case "quote":
      return (
        <div className="max-w-[820px] border-l border-accent pl-6">
          <p className="m-0 text-[21px] leading-snug font-medium tracking-[-0.015em]">
            {block.text}
          </p>
        </div>
      );

    case "note":
      return (
        <p className="m-0 max-w-[760px] font-mono text-[11.5px] leading-relaxed text-fg-muted">
          {block.text}
        </p>
      );

    case "stats":
      return <StatStrip stats={block.items} />;

    case "tiles":
      return (
        <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item) => (
            <CapabilityTile key={item.title} {...item} />
          ))}
        </div>
      );

    case "bullets":
      return (
        <ul className="m-0 grid max-w-[800px] list-none gap-3.5 border-t border-border pt-6 p-0">
          {block.items.map((text, i) => (
            <li key={i} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3.5 text-base leading-relaxed">
              <span className="font-mono text-xs text-accent">—</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      );

    case "pills":
      return (
        <div className="flex flex-wrap gap-2.5">
          {block.items.map((text) => (
            <span
              key={text}
              className="border border-border px-3.5 py-2 font-mono text-[11.5px]"
            >
              {text}
            </span>
          ))}
        </div>
      );

    case "logos":
      return (
        <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
          {block.items.map((text) => (
            <div
              key={text}
              className="grid min-h-[112px] place-items-center bg-bg p-4.5 text-center"
            >
              <span className="text-[13px] font-semibold tracking-[0.06em]">{text}</span>
            </div>
          ))}
        </div>
      );

    case "gallery":
      return (
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {block.items.map((caption) => (
            <div
              key={caption}
              className="flex min-h-[180px] items-end bg-bg-raised p-4.5"
            >
              <span className="font-mono text-[11px] leading-relaxed text-fg-muted">
                {caption}
              </span>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th
                    key={h}
                    className="border-b border-border py-3.5 pr-4.5 text-left font-mono text-[10.5px] font-normal tracking-[0.06em] text-fg-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`border-b border-border py-4 pr-4.5 align-top text-[14.5px] leading-relaxed ${
                        block.monoCols?.includes(ci) ? "font-mono" : "font-sans"
                      } ${ci === 0 ? "text-fg" : "text-fg-muted"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "faq":
      return <FaqAccordion items={block.items} />;

    case "quotes":
      return (
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {block.items.map((q, i) => (
            <div key={i} className="flex flex-col gap-5 bg-bg p-6.5">
              <p className="m-0 text-[17px] leading-snug tracking-[-0.012em]">{q.text}</p>
              <span className="mt-auto font-mono text-[11px] text-fg-muted">{q.who}</span>
            </div>
          ))}
        </div>
      );

    case "code":
      return (
        <div className="border border-border bg-bg-raised">
          <div className="border-b border-border px-5 py-3 font-mono text-[10.5px] tracking-[0.06em] text-fg-muted">
            {block.label}
          </div>
          <pre className="m-0 overflow-x-auto px-5 py-5.5 font-mono text-xs leading-loose text-fg">
            {block.text}
          </pre>
        </div>
      );

    case "status":
      return <LiveStatusBadge label={block.text} />;

    case "form":
      return <ContactForm />;

    case "cases":
      return (
        <div className="grid gap-7">
          {CASE_FILES.map((c) => (
            <CaseStudyCard key={c.slug} caseFile={c} />
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function BottomCta() {
  return (
    <div className="mt-14 flex flex-wrap items-center gap-3.5 border-t border-border py-7">
      <Link
        href="/contact"
        className="bg-accent px-5 py-3.25 font-mono text-xs text-bg hover:bg-fg"
      >
        Get a quote →
      </Link>
      <Link
        href="/"
        className="border border-border px-5 py-3.25 font-mono text-xs text-fg hover:border-accent"
      >
        ← Home
      </Link>
    </div>
  );
}
