"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SectionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const nodes = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("section-entered");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
