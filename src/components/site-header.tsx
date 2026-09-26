"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/site-data";
import { CommandPalette } from "@/components/command-palette";
import { ArrowIcon } from "@/components/arrow-icon";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  return (
    <header className="site-header">
      <div className="site-container header-bar">
        <Link href="/" className="logo-lockup" aria-label="Zen xElligence">
          <span className="logo-mark" aria-hidden="true" />
          <span className="logo-word">ZEN xELLIGENCE</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-end">
          <div className="header-search">
            <CommandPalette />
          </div>
          <Link href="/contact" className="button button-outline header-cta">
            Start a build
            <ArrowIcon />
          </Link>
          <button
            type="button"
            className={cn("button button-outline menu-button")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav id="mobile-nav" className="mobile-menu" hidden={!open} aria-label="Mobile">
          <Link href="/contact" className="button button-primary">
            Start a build
            <ArrowIcon />
          </Link>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
