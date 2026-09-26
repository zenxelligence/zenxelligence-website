"use server";

import { headers } from "next/headers";
import { BUDGET_OPTIONS } from "@/content/pricing";

export type ContactState = {
  ok: boolean;
  message: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (String(formData.get("website") ?? "").trim()) {
    return { ok: true, message: "Sent. We reply within 1 business day." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const services = formData.getAll("service").map(String);

  if (!name || !email || !problem || !email.includes("@")) {
    return { ok: false, message: "Add your name, a real email, and what you want built." };
  }
  if (budget && !BUDGET_OPTIONS.includes(budget)) {
    return { ok: false, message: "Choose a budget option from the list." };
  }

  const ip = (await headers()).get("x-forwarded-for") ?? "local";
  if (limited(ip)) {
    return { ok: false, message: "Too many messages. Email hello@zenxelligence.com instead." };
  }

  const key = process.env.RESEND_API_KEY;
  const provider = process.env.CONTACT_PROVIDER;
  if (!key || provider !== "resend") {
    if (process.env.NODE_ENV !== "production") {
      return {
        ok: false,
        message: "Email is not configured. Set CONTACT_PROVIDER=resend and RESEND_API_KEY.",
      };
    }
    return { ok: false, message: "We could not send that. Email hello@zenxelligence.com." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Zen xElligence <hello@zenxelligence.com>",
      to: ["hello@zenxelligence.com"],
      reply_to: email,
      subject: `Build inquiry from ${name}`,
      text: [name, organization, email, services.join(", "), budget, timeline, link, problem]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!response.ok) {
    return { ok: false, message: "We could not send that. Email hello@zenxelligence.com." };
  }

  return { ok: true, message: "Sent. We reply within 1 business day." };
}
