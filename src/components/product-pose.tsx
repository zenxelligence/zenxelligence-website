export function ProductPose({
  pose,
}: {
  plateIndex: number;
  pose: string;
}) {
  return <div className="text-[12px] tracking-[0.04em] text-fg-muted">{pose}</div>;
}
