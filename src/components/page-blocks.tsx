import type { Block } from "@/lib/site-data";
import { CASE_FILES } from "@/lib/site-data";
import { CapabilityTile } from "@/components/capability-tile";
import { StatStrip } from "@/components/stat-strip";
import { LiveStatusBadge } from "@/components/live-status-badge";
import { CaseStudyCard } from "@/components/case-study-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { FadeInSection } from "@/components/fade-in-section";
import { ContactForm } from "@/components/contact-form";

function sentenceCase(label: string) {
  const lower = label.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

const HIDDEN_COPY = /Pulse|NetSuite|\bTBD\b|FILE TEMPLATE|PLATE INDEX/;

export function PageBlocks({ blocks }: { blocks: Block[] }) {
  const visible = blocks.filter((block) => !HIDDEN_COPY.test(JSON.stringify(block)));
  return (
    <>
      {visible.map((block, i) => (
        <FadeInSection
          key={i}
          id={block.type === "label" ? block.id : undefined}
          className="mt-12"
          delay={i * 70}
        >
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
        <>
          <p className="block-label">{block.label}</p>
          <h2 className="inner-h2">{sentenceCase(block.label)}</h2>
        </>
      );

    case "prose":
      return <p className="page-body">{block.text}</p>;

    case "quote":
      return (
        <div className="quote">
          <p>{block.text}</p>
        </div>
      );

    case "note":
      return <p className="note">{block.text}</p>;

    case "stats":
      return <StatStrip stats={block.items} />;

    case "tiles":
      return (
        <div className="tile-grid">
          {block.items.map((item) => (
            <CapabilityTile key={`${item.index}-${item.title}-${item.meta}`} {...item} />
          ))}
        </div>
      );

    case "bullets":
      return (
        <ul className="bullet-list">
          {block.items.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      );

    case "pills":
      return (
        <div className="chip-row" style={{ marginTop: 0 }}>
          {block.items.map((text) => (
            <span key={text} className="chip">
              {text}
            </span>
          ))}
        </div>
      );

    case "logos":
      return (
        <div className="logo-wall">
          {block.items.map((text) => (
            <div key={text} className="card card-pad" style={{ minHeight: 112, placeItems: "center" }}>
              <span className="card-title" style={{ fontSize: 18, textAlign: "center" }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      );

    case "gallery":
      return (
        <div className="logo-wall">
          {block.items.map((caption) => (
            <div key={caption} className="card card-pad" style={{ minHeight: 180, justifyContent: "flex-end" }}>
              <span className="card-label">{caption}</span>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
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
        <div className="quote-grid">
          {block.items.map((q, i) => (
            <div key={i} className="card card-pad">
              <p className="card-body" style={{ color: "var(--text)", fontSize: 16 }}>
                {q.text}
              </p>
              <span className="card-label">{q.who}</span>
            </div>
          ))}
        </div>
      );

    case "code":
      return (
        <div className="panel" style={{ padding: 0 }}>
          <div className="block-label" style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
            {block.label}
          </div>
          <pre className="m-0 overflow-x-auto px-5 py-5 text-xs leading-loose text-fg">{block.text}</pre>
        </div>
      );

    case "status":
      return <LiveStatusBadge label={block.text} />;

    case "form":
      return <ContactForm />;

    case "cases":
      if (CASE_FILES.length === 0) {
        return (
          <p className="note">Selected work available on request — ask us on a call.</p>
        );
      }
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
