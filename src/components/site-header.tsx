"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE } from "@/lib/site-data";
import { CommandPalette } from "@/components/command-palette";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-90 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 sm:px-6.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-mono text-[17px] font-medium text-accent">Zx</span>
          <span className="whitespace-nowrap text-[13px] font-semibold tracking-[0.14em]">
            ZEN xELLIGENCE
          </span>
        </Link>
        <span className="hidden min-w-[90px] flex-1 truncate border-l border-border pl-5 font-mono text-[11px] text-fg-muted sm:block">
          {SITE.tagline}
        </span>
        <nav className="ml-auto flex flex-wrap items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap border-b px-2.5 py-2 font-mono text-[11.5px] hover:text-fg",
                  active ? "border-accent text-accent" : "border-transparent text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <CommandPalette />
          <Link
            href="/contact"
            className="ml-2 whitespace-nowrap border border-accent px-3.5 py-1.5 font-mono text-[11.5px] text-accent hover:bg-accent hover:text-bg"
          >
            Start a build
          </Link>
        </nav>
      </div>
    </header>
  );
}
