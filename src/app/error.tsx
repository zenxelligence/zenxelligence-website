"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ZxMark } from "@/components/zx-mark";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-inner">
      <Link href="/" className="logo-lockup" aria-label="Zen xElligence">
        <ZxMark size={36} />
        <span className="logo-word" style={{ fontSize: 22 }}>
          ZEN xELLIGENCE
        </span>
      </Link>
      <p className="eyebrow mt-8">Error</p>
      <h1 className="page-title">Something went wrong.</h1>
      <p className="page-lead">The page did not finish loading. You can try again, or write to us.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <button type="button" className="button button-primary" onClick={() => reset()}>
          Try again
        </button>
        <Link href="/contact" className="button button-outline">
          Contact
        </Link>
      </div>
    </section>
  );
}
