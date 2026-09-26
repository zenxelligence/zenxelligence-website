import Link from "next/link";
import type { TileItem } from "@/lib/site-data";
import { ArrowIcon } from "@/components/arrow-icon";

export function CapabilityTile({ index, title, line, meta, href }: TileItem) {
  const content = (
    <>
      <span className="tile-copy">
        <span className="tile-meta">{index}</span>
        <h3 className="tile-title">{title}</h3>
        <span className="tile-line">{line}</span>
        <span className="tile-meta">{meta}</span>
      </span>
      <ArrowIcon />
    </>
  );

  if (!href) {
    return <div className="tile">{content}</div>;
  }

  return (
    <Link href={href} className="tile">
      {content}
    </Link>
  );
}
