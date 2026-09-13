"use client";

import { HOME_PLATES } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function PlateIndex() {
  const [active, setActive] = useState(HOME_PLATES[0].id);

  useEffect(() => {
    const nodes = HOME_PLATES.map((p) => document.getElementById(p.id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const onHero = active === "plate-opening";

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "pointer-events-none transition-opacity duration-500",
        onHero && "opacity-0",
      )}
    >
      <ul className="fixed right-3 top-1/2 z-80 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
        {HOME_PLATES.map((plate) => (
          <li key={plate.id} className={onHero ? undefined : "pointer-events-auto"}>
            <button
              type="button"
              onClick={() => go(plate.id)}
              aria-current={active === plate.id ? "true" : undefined}
              className={cn(
                "flex w-full items-center gap-2.5 px-1 py-1 text-left font-mono text-[10px] tracking-[0.08em] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                active === plate.id ? "text-accent" : "text-fg-muted hover:text-fg",
              )}
            >
              <span
                className={cn(
                  "h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active === plate.id ? "w-6 bg-accent" : "w-3 bg-border",
                )}
              />
              {plate.no} {plate.nav}
            </button>
          </li>
        ))}
      </ul>

      <ul
        className={cn(
          "fixed inset-x-0 bottom-0 z-80 flex justify-center gap-1 border-t border-border bg-bg/92 px-3 py-2 backdrop-blur-sm lg:hidden",
          onHero && "invisible",
        )}
      >
        {HOME_PLATES.map((plate) => (
          <li key={plate.id} className="pointer-events-auto">
            <button
              type="button"
              onClick={() => go(plate.id)}
              aria-label={plate.nav}
              aria-current={active === plate.id ? "true" : undefined}
              className={cn(
                "min-w-8 px-1.5 py-1 font-mono text-[10px] tracking-wide",
                active === plate.id ? "text-accent" : "text-fg-muted",
              )}
            >
              {plate.no}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
