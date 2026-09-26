"use server";

import { headers } from "next/headers";
import { BUDGET_OPTIONS } from "@/content/pricing";
import { SERVICES } from "@/content/services";

export type ContactState = {
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
};

const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
const SERVICE_NAMES = new Set(SERVICES.map((service) => service.nav));
const TIMELINES = new Set(["", "As soon as we can start", "This quarter", "Later"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY: ContactState = { ok: false, message: "", fieldErrors: {} };

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (String(formData.get("website") ?? "").trim()) {
    return { ok: true, message: "Sent. We reply within 1 business day.", fieldErrors: {} };
  }

  const name = clip(String(formData.get("name") ?? ""), 120);
  const organization = clip(String(formData.get("organization") ?? ""), 160);
  const email = clip(String(formData.get("email") ?? ""), 200);
  const problem = clip(String(formData.get("problem") ?? ""), 4000);
  const budget = clip(String(formData.get("budget") ?? ""), 80);
  const timeline = clip(String(formData.get("timeline") ?? ""), 80);
  const link = clip(String(formData.get("link") ?? ""), 400);
  const services = formData
    .getAll("service")
    .map((value) => String(value))
    .filter((value) => SERVICE_NAMES.has(value));

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Add your name.";
  if (!EMAIL.test(email)) fieldErrors.email = "Add a real email address.";
  if (problem.length < 12) fieldErrors.problem = "Tell us what you want built, in a sentence or two.";
  if (budget && !BUDGET_OPTIONS.includes(budget)) fieldErrors.budget = "Choose a budget option from the list.";
  if (!TIMELINES.has(timeline)) fieldErrors.timeline = "Choose a timeline from the list.";
  if (link && !/^https?:\/\/\S+$/i.test(link)) fieldErrors.link = "Links need to start with http:// or https://.";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Check the highlighted fields and send it again.", fieldErrors };
  }

  const forwarded = (await headers()).get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return { ...EMPTY, message: "Too many messages from this network. Email hello@zenxelligence.com." };
  }

  const payload = { name, organization, email, services, budget, timeline, link, problem };
  const key = process.env.RESEND_API_KEY;
  const provider = process.env.CONTACT_PROVIDER;

  if (provider === "log") {
    console.info("contact inquiry", payload);
    return { ok: true, message: "Sent. We reply within 1 business day.", fieldErrors: {} };
  }

  if (!key || provider !== "resend") {
    return {
      ...EMPTY,
      message:
        process.env.NODE_ENV === "production"
          ? "We could not send that from the form. Email hello@zenxelligence.com."
          : "Email is not configured. Set CONTACT_PROVIDER=resend and RESEND_API_KEY, or CONTACT_PROVIDER=log in development.",
    };
  }

  const from = process.env.CONTACT_FROM ?? "Zen xElligence <hello@zenxelligence.com>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: ["hello@zenxelligence.com"],
      reply_to: email,
      subject: `Build inquiry from ${name}`,
      text: [name, organization, email, services.join(", "), budget, timeline, link, "", problem]
        .filter((line) => line !== undefined)
        .join("\n"),
    }),
  });

  if (!response.ok) {
    return { ...EMPTY, message: "We could not send that. Email hello@zenxelligence.com." };
  }

  return { ok: true, message: "Sent. We reply within 1 business day.", fieldErrors: {} };
}
