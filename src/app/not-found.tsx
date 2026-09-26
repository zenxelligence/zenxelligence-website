import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Zen xElligence" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="page-inner">
      <p className="eyebrow">404</p>
      <h1 className="page-title">Page not found</h1>
      <p className="page-lead">That address is not on this site.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/services" className="button button-primary">
          Services
        </Link>
        <Link href="/case-studies" className="button button-outline">
          Case Studies
        </Link>
        <Link href="/contact" className="button button-outline">
          Contact
        </Link>
      </div>
    </section>
  );
}
