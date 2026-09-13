import Link from "next/link";
import type { TileItem } from "@/lib/site-data";

export function CapabilityTile({ index, title, line, meta, href }: TileItem) {
  const content = (
    <>
      <span className="font-mono text-[11px] text-fg-muted">{index}</span>
      <span className="text-[19px] font-semibold tracking-[-0.015em]">{title}</span>
      <span className="text-sm leading-relaxed text-fg-muted">{line}</span>
      <span className="mt-auto text-left font-mono text-[11.5px] text-accent">{meta}</span>
    </>
  );

  const className =
    "flex min-h-[196px] flex-col gap-2.5 border-r border-b border-border px-6 pt-6.5 pb-5.5 hover:bg-bg-raised";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
