"use client";

import { useEffect } from "react";
import Link from "next/link";

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
      <p className="eyebrow">Error</p>
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
