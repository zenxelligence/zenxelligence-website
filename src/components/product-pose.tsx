import { cn } from "@/lib/utils";

const QUADS = [0, 1, 2, 3] as const;

function litQuads(plateIndex: number): number[] {
  if (plateIndex <= 1 || plateIndex >= 7) return [0, 1, 2, 3];
  if (plateIndex === 6) return [0, 1, 2, 3];
  return [plateIndex - 2];
}

export function ProductPose({
  plateIndex,
  pose,
}: {
  plateIndex: number;
  pose: string;
}) {
  const lit = litQuads(plateIndex);

  return (
    <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
      <div className="grid grid-cols-2 gap-px border border-border p-1" aria-hidden>
        {QUADS.map((q) => (
          <span
            key={q}
            className={cn("h-2 w-2", lit.includes(q) ? "bg-accent" : "bg-border")}
          />
        ))}
      </div>
      <span>{pose}</span>
    </div>
  );
}
