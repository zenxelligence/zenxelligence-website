"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { CaseFile } from "@/lib/site-data";

const TABS = ["SYMPTOM", "FINDING", "FIX", "RESULT"] as const;

export function CaseStudyCard({ caseFile }: { caseFile: CaseFile }) {
  return (
    <div className="border border-border bg-bg-raised">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-5.5 py-4.5">
        <span className="text-[17px] font-semibold tracking-[-0.015em]">{caseFile.title}</span>
        <span className="font-mono text-[11px] text-fg-muted">{caseFile.tag}</span>
      </div>
      <Tabs.Root defaultValue="SYMPTOM">
        <Tabs.List className="flex border-b border-border">
          {TABS.map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              className="border-r border-border px-4.5 py-2.75 font-mono text-[10.5px] tracking-[0.06em] text-fg-muted data-[state=active]:bg-bg data-[state=active]:text-accent"
            >
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {TABS.map((tab) => (
          <Tabs.Content key={tab} value={tab}>
            <pre className="m-0 whitespace-pre-wrap px-5.5 py-6 font-mono text-[12.5px] leading-loose text-fg">
              {caseFile.blocks[tab]}
            </pre>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <div className="px-5.5 pb-5.5 font-mono text-[11.5px]">
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
