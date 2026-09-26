import type { ReactNode } from "react";
import type { Block } from "@/lib/site-data";
import { PageBlocks } from "@/components/page-blocks";
import { AccentText } from "@/components/accent-text";

export function PageShell({
  kicker,
  title,
  subhead,
  blocks,
  children,
}: {
  kicker: string;
  title: string;
  subhead?: string;
  blocks?: Block[];
  children?: ReactNode;
}) {
  return (
    <section className="page-inner">
      <p className="eyebrow page-kicker">{kicker}</p>
      <h1 className="page-title">
        <AccentText text={title} />
      </h1>
      {subhead && <p className="page-lead">{subhead}</p>}
      {blocks && <PageBlocks blocks={blocks} />}
      {children}
    </section>
  );
}
