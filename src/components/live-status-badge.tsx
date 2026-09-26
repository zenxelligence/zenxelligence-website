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
      href="/llms.txt"
      className="status-pill"
    >
      <span className="dot" />
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
