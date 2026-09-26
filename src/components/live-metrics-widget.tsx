"use client";

import { useEffect, useState } from "react";
import { onCLS, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

type Vitals = {
  ttfb: string | null;
  lcp: string | null;
  inp: string | null;
  cls: string | null;
};

const LABELS: { key: keyof Vitals; label: string }[] = [
  { key: "ttfb", label: "TTFB" },
  { key: "lcp", label: "LCP" },
  { key: "inp", label: "INP" },
  { key: "cls", label: "CLS" },
];

function formatMetric(key: keyof Vitals, metric: Metric): string {
  if (key === "cls") return metric.value.toFixed(2);
  if (key === "ttfb") return (metric.value / 1000).toFixed(3) + "s";
  if (key === "lcp") return (metric.value / 1000).toFixed(2) + "s";
  return Math.round(metric.value) + "ms";
}

export function LiveMetricsWidget({ showRawLink = true }: { showRawLink?: boolean }) {
  const [vitals, setVitals] = useState<Vitals>({
    ttfb: null,
    lcp: null,
    inp: null,
    cls: null,
  });

  useEffect(() => {
    const live = { reportAllChanges: true } as const;
    onTTFB((m) => setVitals((v) => ({ ...v, ttfb: formatMetric("ttfb", m) })));
    onLCP((m) => setVitals((v) => ({ ...v, lcp: formatMetric("lcp", m) })), live);
    onINP((m) => setVitals((v) => ({ ...v, inp: formatMetric("inp", m) })), live);
    onCLS((m) => setVitals((v) => ({ ...v, cls: formatMetric("cls", m) })), live);
  }, []);

  return (
    <div className="panel">
      <div className="flex items-center gap-2 text-[12px] tracking-[1px] text-fg-muted uppercase">
        <span className="pulse-dot" />
        <span>THIS SESSION — CORE WEB VITALS</span>
      </div>
      <div className="mt-5.5 grid gap-0.5">
        {LABELS.map(({ key, label }) => {
          const value = vitals[key];
          return (
            <div
              key={key}
              className="flex items-baseline justify-between gap-4 border-b border-border py-2.5"
            >
              <span className="text-xs text-fg-muted">{label}</span>
              <span
                className="text-sm"
                style={{ color: value ? "var(--accent)" : "var(--fg-muted)" }}
              >
                {value ?? (key === "inp" ? "Interact to measure" : "—")}
              </span>
            </div>
          );
        })}
      </div>
      <p className="note mt-4">LCP, INP and CLS update as you interact with the page.</p>
      <p className="note mt-3">
        These are your numbers, on this page, right now. We measure our own site the same way we
        measure yours.
        {showRawLink && (
          <>
            {" "}
            <a
              href={`data:application/json,${encodeURIComponent(JSON.stringify(vitals, null, 2))}`}
              target="_blank"
              rel="noreferrer"
            >
              view raw JSON →
            </a>
          </>
        )}
      </p>
    </div>
  );
}
