"use client";

import { useActionState } from "react";
import { SocialLinks } from "@/components/social-links";
import { ArrowIcon } from "@/components/arrow-icon";
import { BUDGET_OPTIONS } from "@/content/pricing";
import { SERVICES } from "@/content/services";
import { SITE } from "@/lib/site-data";
import { sendContact, type ContactState } from "@/app/contact/actions";

const INITIAL: ContactState = { ok: false, message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, INITIAL);

  return (
    <form method="post" action={action} className="panel grid max-w-[620px] gap-4" aria-live="polite">
      <label className="field-label">
        NAME
        <input required name="name" autoComplete="name" placeholder="Full name" className="field" />
      </label>
      <label className="field-label">
        COMPANY
        <input name="organization" autoComplete="organization" placeholder="Company" className="field" />
      </label>
      <label className="field-label">
        EMAIL
        <input required name="email" type="email" autoComplete="email" placeholder="you@company.com" className="field" />
      </label>
      <fieldset className="grid gap-2 border-0 p-0">
        <legend className="field-label">SERVICE</legend>
        <div className="chip-row" style={{ marginTop: 0 }}>
          {SERVICES.map((service) => (
            <label key={service.slug} className="chip">
              <input type="checkbox" name="service" value={service.nav} className="sr-only" />
              {service.nav}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field-label">
        BUDGET
        <select name="budget" className="field" defaultValue={BUDGET_OPTIONS[0]}>
          {BUDGET_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="field-label">
        TIMELINE
        <select name="timeline" className="field" defaultValue="">
          <option value="">Select</option>
          <option>As soon as we can start</option>
          <option>This quarter</option>
          <option>Later</option>
        </select>
      </label>
      <label className="field-label">
        LINK
        <input name="link" type="url" placeholder="Optional site or file link" className="field" />
      </label>
      <label className="field-label">
        WHAT SYSTEM OR PROBLEM ARE WE TALKING ABOUT?
        <textarea required name="problem" rows={4} placeholder="Free text" className="field" />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="button button-primary" disabled={pending}>
          {pending ? "Sending" : "Send"}
          <ArrowIcon />
        </button>
        <span>We reply within 1 business day.</span>
      </div>
      {state.message ? <p className={state.ok ? "m-0 text-sm text-accent" : "note"}>{state.message}</p> : null}
      <div className="footer-social border-t border-border pt-4">
        <SocialLinks />
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </div>
    </form>
  );
}
