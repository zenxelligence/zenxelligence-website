import type { ReactNode } from "react";
import type { Block } from "@/lib/site-data";
import { PageBlocks } from "@/components/page-blocks";
import { AccentText } from "@/components/accent-text";

export function PageShell({
  kicker,
  title,
  subhead,
  blocks,
  before,
  aside,
  children,
}: {
  kicker: string;
  title: string;
  subhead?: string;
  blocks?: Block[];
  before?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-inner">
      <div className={aside ? "page-with-aside" : undefined}>
        <div>
          <p className="eyebrow page-kicker">{kicker}</p>
          <h1 className="page-title">
            <AccentText text={title} />
          </h1>
          {subhead && <p className="page-lead">{subhead}</p>}
          {before}
          {blocks && <PageBlocks blocks={blocks} />}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
