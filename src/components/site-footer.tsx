import Link from "next/link";
import type { ReactNode } from "react";
import { SocialLinks } from "@/components/social-links";
import { ZxMark } from "@/components/zx-mark";
import { POSTS } from "@/content/posts";
import { FOOTER_COLUMNS, SITE } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const columns = FOOTER_COLUMNS.map((column) => ({
    ...column,
    items: column.items.filter((item) => item.href !== "/resources" || POSTS.length >= 2),
  })).filter((column) => column.items.length > 0);

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link href="/" className="logo-lockup" aria-label="Zen xElligence">
              <ZxMark size={34} />
              <span className="logo-word" style={{ fontSize: 22 }}>
                ZEN xELLIGENCE
              </span>
            </Link>
            <p className="footer-tagline">{SITE.tagline}</p>
          </div>
          <div className="footer-columns">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="footer-heading">{col.heading}</p>
                <ul className="footer-links">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <FooterNavLink href={item.href}>{item.label}</FooterNavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-social">
            <SocialLinks />
          </div>
        </div>
        <div className="footer-bottom">
          <p className="m-0">
            © {year} {SITE.name}
          </p>
          <p className="m-0">
            {SITE.framework} · Two engineers · @{SITE.handle}
          </p>
          <p className="footer-bottom-end m-0">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span> · </span>
            <a href="#main">Back to top ↑</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterNavLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.includes("#")) {
    return (
      <a href={href} className="footer-link">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="footer-link">
      {children}
    </Link>
  );
}
