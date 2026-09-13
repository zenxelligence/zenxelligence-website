"use client";

import Link from "next/link";
import { HOME_PLATES } from "@/lib/site-data";
import { scrollToTarget } from "@/lib/scroll-to";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function PlateIndex() {
  const [active, setActive] = useState<string>(HOME_PLATES[0].id);
  const lockedUntil = useRef(0);

  useEffect(() => {
    const nodes = HOME_PLATES.map((p) => document.getElementById(p.id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockedUntil.current) return;
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
    setActive(id);
    lockedUntil.current = Date.now() + 900;
    scrollToTarget(id);
    window.history.replaceState(null, "", `#${id}`);
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
            <IndexControl
              plate={plate}
              active={active === plate.id}
              onHash={() => go(plate.id)}
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
            </IndexControl>
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
            <IndexControl
              plate={plate}
              active={active === plate.id}
              onHash={() => go(plate.id)}
              className={cn(
                "min-w-8 px-1.5 py-1 font-mono text-[10px] tracking-wide",
                active === plate.id ? "text-accent" : "text-fg-muted",
              )}
            >
              {plate.no}
            </IndexControl>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function IndexControl({
  plate,
  active,
  onHash,
  className,
  children,
}: {
  plate: (typeof HOME_PLATES)[number];
  active: boolean;
  onHash: () => void;
  className: string;
  children: ReactNode;
}) {
  if (plate.href.startsWith("/")) {
    return (
      <Link
        href={plate.href}
        aria-label={plate.nav}
        aria-current={active ? "true" : undefined}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onHash}
      aria-label={plate.nav}
      aria-current={active ? "true" : undefined}
      className={className}
    >
      {children}
    </button>
  );
}
