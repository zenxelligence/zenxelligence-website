export type Stat = { value: string; label: string };

export function StatStrip({
  stats,
  bordered = true,
}: {
  stats: Stat[];
  bordered?: boolean;
}) {
  return (
    <div className={bordered ? "stat-strip" : "stat-strip"} style={bordered ? undefined : { border: 0, padding: 0 }}>
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-icon" aria-hidden="true" />
          <div className="stat-value" aria-label={s.value}>
            {s.value}
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
