"use client";

import { useEffect, useState } from "react";

type Status = {
  status: string;
  uptime_30d: string;
  open_incidents: number;
};

export function LiveStatusBadge({ label }: { label: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href="/machine-lens"
      className="inline-flex items-center gap-2 border border-border px-2.5 py-1.5 font-mono text-xs text-fg hover:border-accent"
    >
      <span className="animate-vs-pulse h-1.5 w-1.5 rounded-full bg-accent" />
      <span>{label}</span>
      {status && (
        <span className="text-fg-muted">
          · {status.status} · {status.uptime_30d} uptime
        </span>
      )}
      <span className="text-accent">— live</span>
    </a>
  );
}
