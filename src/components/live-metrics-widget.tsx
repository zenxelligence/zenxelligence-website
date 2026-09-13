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
    onTTFB((m) => setVitals((v) => ({ ...v, ttfb: formatMetric("ttfb", m) })));
    onLCP((m) => setVitals((v) => ({ ...v, lcp: formatMetric("lcp", m) })));
    onINP((m) => setVitals((v) => ({ ...v, inp: formatMetric("inp", m) })));
    onCLS((m) => setVitals((v) => ({ ...v, cls: formatMetric("cls", m) })));
  }, []);

  return (
    <div className="bg-bg-raised p-6.5">
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-fg-muted">
        <span className="animate-vs-pulse h-1.5 w-1.5 rounded-full bg-accent" />
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
              <span className="font-mono text-xs text-fg-muted">{label}</span>
              <span
                className="font-mono text-sm"
                style={{ color: value ? "var(--accent)" : "var(--fg-muted)" }}
              >
                {value ?? "awaiting input…"}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-5 font-mono text-[11px] leading-relaxed text-fg-muted">
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
