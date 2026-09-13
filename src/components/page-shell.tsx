import type { ReactNode } from "react";
import type { Block } from "@/lib/site-data";
import { PageBlocks, BottomCta } from "@/components/page-blocks";

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
    <section className="pt-18 pb-6">
      <div className="font-mono text-[11px] tracking-[0.06em] text-fg-muted">{kicker}</div>
      <h1 className="mt-5 max-w-[1000px] text-[clamp(32px,4.6vw,58px)] leading-[1.04] font-semibold tracking-[-0.034em]">
        {title}
      </h1>
      {subhead && (
        <p className="mt-6 max-w-[720px] text-lg leading-relaxed text-fg-muted">{subhead}</p>
      )}
      {blocks && <PageBlocks blocks={blocks} />}
      {children}
      <BottomCta />
    </section>
  );
}
