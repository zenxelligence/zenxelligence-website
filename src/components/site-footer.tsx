import Link from "next/link";
import type { ReactNode } from "react";
import { SocialLinks } from "@/components/social-links";
import { FOOTER_COLUMNS, SITE } from "@/lib/site-data";

function shortSha(sha?: string) {
  if (!sha) return "local";
  return sha.slice(0, 7);
}

export function SiteFooter() {
  const commit = shortSha(process.env.VERCEL_GIT_COMMIT_SHA);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-22 border-t border-border bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-9 sm:px-6.5">
        <div className="grid grid-cols-2 gap-8 py-9 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
                {col.heading}
              </div>
              <ul className="mt-4 grid gap-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterNavLink href={item.href} mono={item.mono}>
                      {item.label}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-8 border-t border-border pt-7 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <div className="grid gap-2">
            <p className="m-0 font-mono text-[12px] tracking-[0.06em] text-fg">
              © {year} {SITE.name}
            </p>
            <p className="m-0 font-mono text-[11px] tracking-[0.06em] text-fg-muted">
              {SITE.framework} · Two engineers
            </p>
          </div>

          <div className="grid justify-items-start gap-2.5 md:justify-items-center">
            <div className="font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
              CONNECT
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <SocialLinks />
              <span className="font-mono text-[12px] tracking-[0.06em] text-fg-muted">
                @{SITE.handle}
              </span>
            </div>
          </div>

          <div className="grid justify-items-start gap-2 md:justify-items-end">
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-[12px] tracking-[0.04em]"
            >
              {SITE.email}
            </a>
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
              commit {commit}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterNavLink({
  href,
  mono,
  children,
}: {
  href: string;
  mono?: boolean;
  children: ReactNode;
}) {
  const className = `block text-left text-[13.5px] text-fg hover:text-accent ${mono ? "font-mono" : "font-sans"}`;
  if (href.includes("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
