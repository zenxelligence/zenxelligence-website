"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { SocialLinks } from "@/components/social-links";
import { ArrowIcon } from "@/components/arrow-icon";
import { BUDGET_OPTIONS } from "@/content/pricing";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { sendContact, type ContactState } from "@/app/contact/actions";

const INITIAL: ContactState = { ok: false, message: "", fieldErrors: {} };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, INITIAL);
  const err = state.fieldErrors ?? {};

  return (
    <form method="post" action={action} className="panel grid max-w-[640px] gap-4" noValidate>
      <Field label="Name" name="name" error={err.name} required>
        <input
          required
          name="name"
          autoComplete="name"
          maxLength={120}
          placeholder="Full name"
          className="field"
          aria-invalid={err.name ? true : undefined}
        />
      </Field>
      <Field label="Company" name="organization" error={err.organization}>
        <input
          name="organization"
          autoComplete="organization"
          maxLength={160}
          placeholder="Company"
          className="field"
        />
      </Field>
      <Field label="Email" name="email" error={err.email} required>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={200}
          placeholder="you@company.com"
          className="field"
          aria-invalid={err.email ? true : undefined}
        />
      </Field>
      <fieldset className="grid gap-2 border-0 p-0">
        <legend className="field-label">Service</legend>
        <div className="chip-row" style={{ marginTop: 0 }}>
          {SERVICES.map((service) => (
            <label key={service.slug} className="chip">
              <input type="checkbox" name="service" value={service.nav} />
              {service.nav}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Budget" name="budget" error={err.budget}>
        <select name="budget" className="field" defaultValue={BUDGET_OPTIONS[0]} aria-invalid={err.budget ? true : undefined}>
          {BUDGET_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Field>
      <Field label="Timeline" name="timeline" error={err.timeline}>
        <select name="timeline" className="field" defaultValue="" aria-invalid={err.timeline ? true : undefined}>
          <option value="">Select</option>
          <option>As soon as we can start</option>
          <option>This quarter</option>
          <option>Later</option>
        </select>
      </Field>
      <Field label="Link" name="link" error={err.link}>
        <input
          name="link"
          type="url"
          inputMode="url"
          maxLength={400}
          placeholder="Optional site or document link"
          className="field"
          aria-invalid={err.link ? true : undefined}
        />
      </Field>
      <Field label="What do you want built?" name="problem" error={err.problem} required>
        <textarea
          required
          name="problem"
          rows={5}
          maxLength={4000}
          placeholder="The product, the surface, and what done looks like."
          className="field"
          aria-invalid={err.problem ? true : undefined}
        />
      </Field>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="button button-primary" disabled={pending}>
          {pending ? "Sending" : "Send"}
          <ArrowIcon />
        </button>
        <span className="page-body">We reply within 1 business day.</span>
      </div>
      <p role="status" aria-live="polite" className={state.ok ? "form-success" : "note"}>
        {state.message}
      </p>
      {SITE.bookingUrl ? (
        <p className="note">
          <a href={SITE.bookingUrl}>Prefer a call? Book 20 minutes</a>
        </p>
      ) : null}
      <div className="footer-social border-t border-border pt-4">
        <SocialLinks />
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  name?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="field-label">
      {label}
      {required ? <span className="sr-only"> required</span> : null}
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
