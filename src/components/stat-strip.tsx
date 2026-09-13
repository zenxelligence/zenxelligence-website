export type Stat = { value: string; label: string };

export function StatStrip({
  stats,
  bordered = true,
}: {
  stats: Stat[];
  bordered?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 ${
        bordered ? "border-t border-b border-border py-10" : ""
      }`}
    >
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-[34px] leading-none font-semibold tracking-[-0.03em] tabular-nums">
            {s.value}
          </div>
          <div className="mt-2.5 font-mono text-[11px] leading-relaxed text-fg-muted">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
