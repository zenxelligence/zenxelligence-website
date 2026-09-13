"use client";

import { useState } from "react";
import { ORGANIZATION_JSON_LD } from "@/lib/site-data";

export function MachineLensPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col bg-bg-raised p-6.5">
      <div className="font-mono text-[11px] tracking-[0.04em] text-fg-muted">
        STRUCTURED DATA — schema.org/Organization
      </div>
      <div className="mt-5.5 grid gap-2.75 font-mono text-xs">
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen((v) => !v);
            }}
          >
            {open ? "hide markup" : "view our markup"} — JSON-LD
          </a>
        </div>
        <div>
          <a href="/llms.txt">llms.txt — offer map for answer engines</a>
        </div>
        <div>
          <a href="/faq">FAQ — citation-ready answers</a>
        </div>
      </div>
      {open && (
        <pre className="mt-5.5 max-h-[280px] overflow-x-auto border border-border bg-bg p-4 font-mono text-xs leading-loose text-fg">
          {JSON.stringify(ORGANIZATION_JSON_LD, null, 2)}
        </pre>
      )}
    </div>
  );
}
