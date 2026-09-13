"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AUDIENCE_TAGS } from "@/lib/site-data";

export function AudienceCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % AUDIENCE_TAGS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-3.5 min-w-[148px] text-fg-muted">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {AUDIENCE_TAGS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
