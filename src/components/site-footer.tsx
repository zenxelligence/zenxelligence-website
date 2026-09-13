import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/site-data";

function shortSha(sha?: string) {
  if (!sha) return "local";
  return sha.slice(0, 7);
}

export function SiteFooter() {
  const commit = shortSha(process.env.VERCEL_GIT_COMMIT_SHA);
  const deployedAt = process.env.VERCEL_GIT_COMMIT_SHA
    ? new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC"
    : "dev build";

  return (
    <footer className="mt-22 border-t border-border">
      <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-9 sm:px-6.5">
        <a
          href="https://example.com/columbus-business-first"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 border border-border px-3.5 py-2 font-mono text-[11px] text-fg hover:border-accent"
        >
          <span className="text-accent">Featured</span>
          <span>Columbus Business First, &ldquo;Tech Companies to Watch,&rdquo; 2025 →</span>
        </a>

        <div className="mt-8 grid grid-cols-2 gap-8 border-t border-border py-9 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
                {col.heading}
              </div>
              <ul className="mt-4 grid gap-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cnFooterLink(item.mono)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4.5 border-t border-border pt-6.5 font-mono text-[11px] text-fg-muted">
          <span className="border border-border px-3 py-2 leading-relaxed">
            commit {commit} · deployed {deployedAt}
            <br />
            push = ship
          </span>
          <span>© {new Date().getFullYear()} Zen xElligence. Built by the team that maintains it.</span>
        </div>

        <p className="mt-5.5 max-w-[900px] font-mono text-[10.5px] leading-relaxed text-fg-muted">
          All names, employee counts, client logos, and figures on this site are illustrative
          placeholders sized to feel real — replace with verified data before publishing. The Web
          Vitals readout, JSON-LD and /llms.txt are genuine.
        </p>
      </div>
    </footer>
  );
}

function cnFooterLink(mono?: boolean) {
  return `block text-left text-[13.5px] text-fg hover:text-accent ${mono ? "font-mono" : "font-sans"}`;
}
