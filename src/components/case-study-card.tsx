"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { CaseFile } from "@/lib/site-data";

const TABS = ["SYMPTOM", "FINDING", "FIX", "RESULT"] as const;

export function CaseStudyCard({ caseFile }: { caseFile: CaseFile }) {
  return (
    <div className="card">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-5.5 py-4.5">
        <span className="card-title">{caseFile.title}</span>
        <span className="card-label">{caseFile.tag}</span>
      </div>
      <Tabs.Root defaultValue="SYMPTOM">
        <Tabs.List className="flex border-b border-border">
          {TABS.map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              className="border-r border-border px-4.5 py-2.75 text-[12px] tracking-[0.06em] text-fg-muted data-[state=active]:bg-bg data-[state=active]:text-accent"
            >
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {TABS.map((tab) => (
          <Tabs.Content key={tab} value={tab}>
            <pre className="m-0 whitespace-pre-wrap px-5.5 py-6 text-[14px] leading-loose text-fg">
              {caseFile.blocks[tab]}
            </pre>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <div className="px-5.5 pb-5.5 text-[14px]">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          Verify →
        </a>
      </div>
    </div>
  );
}
