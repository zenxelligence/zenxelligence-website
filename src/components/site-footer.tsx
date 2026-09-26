import Link from "next/link";
import type { ReactNode } from "react";
import { SocialLinks } from "@/components/social-links";
import { FOOTER_COLUMNS, SITE } from "@/lib/site-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link href="/" className="logo-lockup" aria-label="Zen xElligence">
              <span className="logo-mark" aria-hidden="true" />
              <span className="logo-word" style={{ fontSize: 22 }}>
                ZEN xELLIGENCE
              </span>
            </Link>
            <p className="footer-tagline">{SITE.tagline}</p>
          </div>
          <div className="footer-columns">
            {FOOTER_COLUMNS.map((col) => (
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
