"use client";

import { motion } from "motion/react";

export type HeroLine = {
  text: string;
  opacity?: number;
  fontSize?: string;
  italic?: boolean;
};

export function HeroStack({
  lines,
  className,
}: {
  lines: HeroLine[];
  className?: string;
}) {
  return (
    <h1
      className={
        className ??
        "m-0 text-[clamp(40px,6.6vw,92px)] leading-[0.95] font-semibold tracking-[-0.038em]"
      }
    >
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block"
          style={{
            fontSize: line.fontSize,
            opacity: line.opacity ?? 1,
            fontStyle: line.italic ? "italic" : "normal",
            fontWeight: line.italic ? 500 : undefined,
            color: line.italic ? "var(--accent)" : undefined,
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: line.opacity ?? 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.24 }}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}
