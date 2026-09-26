import { TEAM } from "@/content/team";
import { SITE, SOCIAL } from "@/content/site";

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  const founders = TEAM.filter((member) => member.name.trim());
  const sameAs = SOCIAL.map((item) => item.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/icon.svg`,
    description:
      "Zen xElligence is a two-engineer product studio that builds end-to-end web applications and APIs, AI agent automation, Android/iOS apps, IoT electronics, and VLSI — brief to handover.",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
    ...(sameAs.length ? { sameAs } : {}),
    ...(SITE.location
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: SITE.location,
          },
        }
      : {}),
    ...(founders.length
      ? {
          founder: founders.map((member) => ({
            "@type": "Person",
            name: member.name,
            jobTitle: member.role || undefined,
            ...(member.linkedin ? { sameAs: [member.linkedin, member.github].filter(Boolean) } : {}),
            ...(member.bio ? { description: member.bio } : {}),
          })),
        }
      : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "Web application development",
      "Android and iOS app development",
      "AI agent automation",
      "IoT electronics",
      "VLSI",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web application and API development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Android and iOS app development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI agent automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IoT and electronics" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "End-to-end VLSI" } },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: organizationJsonLd().description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
