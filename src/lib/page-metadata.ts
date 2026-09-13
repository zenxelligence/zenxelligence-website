import type { Metadata } from "next";
import type { PageContent } from "@/lib/site-data";
import { SITE } from "@/lib/site-data";

/** Search-facing title + description. Display H1 can stay editorial. */
export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  about: {
    title: "About Zen xElligence — two engineers, brief to handover",
    description:
      "Zen xElligence is a two-engineer product studio. Same people scope, build, and hand over web apps, AI agents, Android/iOS, IoT, and VLSI.",
  },
  services: {
    title: "Services — web, mobile, AI agents, IoT, and VLSI",
    description:
      "End-to-end product builds: web apps & APIs, Flutter/React Native/Android/iOS, LangChain agent automation, IoT electronics, and VLSI — one team, brief to handover.",
  },
  products: {
    title: "What you own at handover — apps, agents, hardware, silicon",
    description:
      "Zen xElligence does not sell seats. You own the live app, agent workflows, firmware, and VLSI pack we ship. No SaaS subscription.",
  },
  industries: {
    title: "ZX A³ Innovation™ — Autonomous, Adaptive, Architected",
    description:
      "Industry frame for Zen xElligence: Autonomous Intelligence (AI/ML, data, cloud), Adaptive Silicon (VLSI), Architected Determinism and Architect Training.",
  },
  "case-studies": {
    title: "Case studies — named files only when the client says yes",
    description:
      "Zen xElligence publishes Symptom / Finding / Fix / Result case files only with client approval. No invented logos or metrics.",
  },
  pricing: {
    title: "Pricing — written scope first, then a number",
    description:
      "Every Zen xElligence build is quoted after a written scope. Fixed-bid or time-and-materials. Reply within one business day.",
  },
  faq: {
    title: "FAQ — who we are, what we build, how we price",
    description:
      "Zen xElligence FAQ: two engineers, five surfaces (web, mobile, AI agents, IoT, VLSI), no SaaS seats, quote after scope.",
  },
  contact: {
    title: "Contact — start a build",
    description:
      "Email hello@zenxelligence.com or use the form. A real person replies within one business day.",
  },
  careers: {
    title: "Careers — no open role until we can name the work",
    description:
      "Zen xElligence is two engineers. Open roles appear on this page only when a real seat exists. Write hello@zenxelligence.com.",
  },
  legal: {
    title: "Legal — privacy, terms, cookies, accessibility, security",
    description:
      "Zen xElligence legal pages: what we collect, how builds are owned, cookies, accessibility, and security. No invented certifications.",
  },
  resources: {
    title: "Field notes — technical writing when we publish",
    description:
      "Zen xElligence field notes. This list stays empty until we publish real engineering writing — no leftover marketing posts.",
  },
};

export function pageMetadata(slug: string, page: PageContent): Metadata {
  const seo = PAGE_SEO[slug];
  const title = seo?.title ?? page.title;
  const description = seo?.description ?? page.subhead ?? page.title;
  const path = slug === "" ? "/" : `/${slug}`;
  const canonical = `${SITE.url}${path === "/" ? "" : path}`;
  const ogImage = `/og/${slug || ""}`.replace(/\/$/, "") || "/og";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export function homeMetadata(): Metadata {
  const title = `${SITE.name} — Web, mobile, AI agents, IoT & VLSI`;
  const description =
    "Zen xElligence is a two-engineer studio that builds end-to-end web apps & APIs, AI agent automation, Android/iOS (Flutter, React Native), IoT, and VLSI — brief to handover.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: SITE.url },
    openGraph: {
      type: "website",
      url: SITE.url,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: "/og", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og"],
    },
  };
}
