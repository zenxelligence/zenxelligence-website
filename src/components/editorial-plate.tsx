"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ProductPose } from "@/components/product-pose";
import { HOME_PLATES } from "@/lib/site-data";

export function EditorialPlate({
  id,
  no,
  role,
  pose,
  plateIndex,
  title,
  children,
  bare = false,
  screen = false,
  quiet = false,
}: {
  id: string;
  no: string;
  role: string;
  pose: string;
  plateIndex: number;
  title?: string;
  children: ReactNode;
  bare?: boolean;
  screen?: boolean;
  quiet?: boolean;
}) {
  const chrome = !bare && !quiet;

  return (
    <motion.section
      id={id}
      data-plate={id}
      className={
        screen
          ? "flex min-h-[calc(100dvh-4.25rem)] flex-col justify-center py-8"
          : bare
            ? "pb-10 pt-6 md:pb-12 md:pt-8"
            : "border-t border-border py-20 md:py-28"
      }
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {chrome ? (
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="m-0 font-mono text-[11px] tracking-[0.14em] text-fg-muted">
              {no} / {String(HOME_PLATES.length).padStart(2, "0")} · {role}
            </p>
            {title ? (
              <h2 className="mt-3 m-0 max-w-[820px] text-[clamp(26px,3.6vw,42px)] leading-[1.08] font-semibold tracking-[-0.03em]">
                {title}
              </h2>
            ) : null}
          </div>
          <ProductPose plateIndex={plateIndex} pose={pose} />
        </div>
      ) : null}
      {quiet && title ? (
        <div className="max-w-[820px]">
          <p className="m-0 font-mono text-[11px] tracking-[0.14em] text-fg-muted">What we ship</p>
          <h2 className="mt-3 m-0 text-[clamp(26px,3.6vw,42px)] leading-[1.08] font-semibold tracking-[-0.03em]">
            {title}
          </h2>
        </div>
      ) : null}
      <div className={bare || screen ? undefined : quiet ? "mt-6" : "mt-10"}>{children}</div>
    </motion.section>
  );
}
