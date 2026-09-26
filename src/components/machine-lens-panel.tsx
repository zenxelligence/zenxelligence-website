"use client";

import { useState } from "react";
import { ORGANIZATION_JSON_LD } from "@/lib/site-data";

export function MachineLensPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="panel flex flex-col">
      <div className="text-[12px] tracking-[1px] text-fg-muted uppercase">
        STRUCTURED DATA — schema.org/Organization
      </div>
      <div className="mt-5.5 grid gap-2.75 text-sm">
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
        <pre className="mt-5.5 max-h-[280px] overflow-x-auto rounded-[14px] border border-border bg-bg p-4 text-xs leading-loose text-fg">
          {JSON.stringify(ORGANIZATION_JSON_LD, null, 2)}
        </pre>
      )}
    </div>
  );
}
