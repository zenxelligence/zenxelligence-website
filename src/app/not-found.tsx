import type { Metadata } from "next";
import Link from "next/link";
import { ZxMark } from "@/components/zx-mark";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Zen xElligence" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="page-inner">
      <Link href="/" className="logo-lockup" aria-label="Zen xElligence">
        <ZxMark size={36} />
        <span className="logo-word" style={{ fontSize: 22 }}>
          ZEN xELLIGENCE
        </span>
      </Link>
      <p className="eyebrow mt-8">404</p>
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
