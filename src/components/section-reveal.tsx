"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL = [
  ".plate:not(.plate-hero) .section-head",
  ".plate:not(.plate-hero) .prose",
  ".card",
  ".stat",
  ".process-step",
  ".cta-inner",
  ".site-footer",
].join(",");

function countStat(valueEl: HTMLElement) {
  if (valueEl.dataset.counted === "1") return;
  const full = valueEl.getAttribute("aria-label") || valueEl.textContent || "";
  const match = /^(\d+)/.exec(full);
  if (!match) return;
  valueEl.dataset.counted = "1";
  const target = Number(match[1]);
  const suffix = full.slice(match[1].length);
  const duration = 800;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - progress) ** 3;
    valueEl.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
    else valueEl.textContent = full;
  };
  valueEl.textContent = `0${suffix}`;
  requestAnimationFrame(tick);
}

export function SectionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = document.querySelectorAll("section");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("section-entered");
          sectionObserver.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    sections.forEach((node) => sectionObserver.observe(node));

    if (reduce) return () => sectionObserver.disconnect();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          const value = el.classList.contains("stat") ? el.querySelector<HTMLElement>(".stat-value") : null;
          if (value) countStat(value);
          revealObserver.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll<HTMLElement>(REVEAL).forEach((node) => {
      if (node.classList.contains("is-in")) return;
      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 48;
      if (inView) {
        node.classList.add("is-in");
        const value = node.classList.contains("stat") ? node.querySelector<HTMLElement>(".stat-value") : null;
        if (value) countStat(value);
        return;
      }
      node.classList.add("arm");
      revealObserver.observe(node);
    });

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
