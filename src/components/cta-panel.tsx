"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowIcon } from "@/components/arrow-icon";
import { SITE } from "@/lib/site-data";

export function CtaPanel() {
  const path = usePathname();
  const secondary = path === "/pricing" ? { href: "/faq", label: "Read the FAQ" } : { href: "/pricing", label: "See pricing" };
  return (
    <section className="cta" aria-label="Start a build">
      <div className="site-container">
        <div className="cta-inner">
          <div className="cta-orbits" aria-hidden="true" />
          <div className="cta-hang" aria-hidden="true">
            <span className="cta-cord" />
            <span className="cta-mark" />
          </div>
          <p className="eyebrow">Now booking new product builds</p>
          <h2>
            Tell us what you want <span className="accent">built.</span>
          </h2>
          <div className="cta-actions">
            <Link href="/contact" className="button button-primary">
              Start a build
              <ArrowIcon />
            </Link>
            <Link href={secondary.href} className="cta-text-link">
              {secondary.label}
            </Link>
          </div>
          <p className="cta-note">
            We’ll reply with a plan and a first date. {SITE.email}
          </p>
        </div>
      </div>
    </section>
  );
}
