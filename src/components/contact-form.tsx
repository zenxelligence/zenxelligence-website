"use client";

import { useState } from "react";
import { SITE } from "@/lib/site-data";

const FIELDS = [
  { name: "name", label: "NAME", placeholder: "Full name" },
  { name: "company", label: "COMPANY", placeholder: "Company" },
  { name: "email", label: "EMAIL", placeholder: "you@company.com", type: "email" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-[620px] border border-border bg-bg-raised p-7">
        <p className="m-0 font-mono text-sm text-accent">
          Sent. We reply within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="max-w-[620px] border border-border bg-bg-raised p-7"
    >
      <div className="grid gap-4.5">
        {FIELDS.map((field) => (
          <label key={field.name} className="grid gap-2">
            <span className="font-mono text-[10.5px] tracking-[0.06em] text-fg-muted">
              {field.label}
            </span>
            <input
              required
              name={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              className="border border-border bg-bg px-3.25 py-3 text-[15px] text-fg outline-none focus:border-accent"
            />
          </label>
        ))}
        <label className="grid gap-2">
          <span className="font-mono text-[10.5px] tracking-[0.06em] text-fg-muted">
            WHAT SYSTEM OR PROBLEM ARE WE TALKING ABOUT?
          </span>
          <textarea
            required
            name="problem"
            rows={4}
            placeholder="Free text"
            className="resize-y border border-border bg-bg px-3.25 py-3 text-[15px] text-fg outline-none focus:border-accent"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3.5">
          <button
            type="submit"
            className="bg-accent px-5 py-3.25 font-mono text-xs text-bg hover:bg-fg"
          >
            Send →
          </button>
          <a href={`mailto:${SITE.email}`} className="font-mono text-[11.5px]">
            {SITE.email}
          </a>
        </div>
      </div>
    </form>
  );
}
