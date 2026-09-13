"use client";

import { useEffect } from "react";
import { scrollToTarget } from "@/lib/scroll-to";

export function HashJump() {
  useEffect(() => {
    function jump() {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      scrollToTarget(id);
    }

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest("a[href^='#']");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const id = decodeURIComponent(href.slice(1));
      if (!document.getElementById(id)) return;
      event.preventDefault();
      scrollToTarget(id);
      window.history.pushState(null, "", href);
    }

    const frame = window.requestAnimationFrame(() => {
      window.setTimeout(jump, 80);
    });
    window.addEventListener("hashchange", jump);
    document.addEventListener("click", onClick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", jump);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
