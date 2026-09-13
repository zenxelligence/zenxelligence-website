"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SEARCH_INDEX } from "@/lib/site-data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(path: string) {
    setOpen(false);
    router.push(path);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="ml-2.5 border border-border px-2.5 py-1.5 font-mono text-[11px] text-fg-muted hover:border-accent hover:text-accent"
      >
        ⌘K
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[200] flex justify-center bg-bg/82 px-5 pb-5 pt-[11vh] backdrop-blur-[3px]"
        >
          <Command
            onClick={(e) => e.stopPropagation()}
            label="Command palette"
            className="h-fit w-full max-w-xl border border-border bg-bg-raised"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <span className="font-mono text-[13px] text-accent">›</span>
              <Command.Input
                autoFocus
                placeholder="jump to a page, service, or case file…"
                className="flex-1 bg-transparent py-4 font-mono text-[13.5px] text-fg outline-none placeholder:text-fg-muted"
              />
              <span className="font-mono text-[10.5px] text-fg-muted">ESC</span>
            </div>
            <Command.List className="max-h-[48vh] overflow-y-auto">
              <Command.Empty className="px-4 py-5 font-mono text-xs text-fg-muted">
                no match
              </Command.Empty>
              {SEARCH_INDEX.map((item) => (
                <Command.Item
                  key={item.path}
                  value={`${item.label} ${item.path} ${item.kind}`}
                  onSelect={() => go(item.path)}
                  className="flex cursor-pointer items-baseline gap-3.5 border-b border-border px-4 py-3 text-fg data-[selected=true]:bg-[#16181c]"
                >
                  <span className="min-w-[64px] font-mono text-[10px] tracking-wide text-fg-muted">
                    {item.kind}
                  </span>
                  <span className="text-sm">{item.label}</span>
                  <span className="ml-auto font-mono text-[10.5px] text-fg-muted">
                    {item.path}
                  </span>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </div>
      )}
    </>
  );
}
