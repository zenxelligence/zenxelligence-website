/**
 * Public facts about the studio.
 * Leave a string empty to hide it. Do not invent profiles, addresses, or prices.
 *
 * TODO(owner): confirm and paste real values before they can publish:
 * - social.linkedin (candidate was https://www.linkedin.com/company/zenxelligence — a scripted check got 404)
 * - social.instagram (candidate was https://www.instagram.com/zenxelligence)
 * - social.whatsapp must be a phone link such as https://wa.me/91XXXXXXXXXX, not a username
 * - bookingUrl (Cal.com / Calendly), only if a real booking page exists
 * - location, timezone, foundingYear
 */
/** One sentence. Visible under the home headline, and the JSON-LD description. */
export const STUDIO_BLURB =
  "Zen xElligence is a two-engineer studio that builds web apps, Android and iOS apps, AI agents, IoT, and VLSI from brief to handover.";

export const STUDIO_TAGLINE = "Intelligence in every layer";

/** Default meta description: tagline, then the service sentence. */
export const DEFAULT_DESCRIPTION = `${STUDIO_TAGLINE}. ${STUDIO_BLURB}`;

export const SITE = {
  name: "Zen xElligence",
  tagline: STUDIO_TAGLINE,
  framework: "ZX A³ Innovation™",
  email: "hello@zenxelligence.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zenxelligence.com",
  handle: "zenxelligence",
  social: {
    linkedin: "",
    instagram: "",
    whatsapp: "",
  },
  bookingUrl: "",
  location: "",
  timezone: "",
  foundingYear: "",
};

export type SocialId = "linkedin" | "instagram" | "whatsapp";

export const SOCIAL: { id: SocialId; label: string; href: string }[] = (
  [
    { id: "linkedin" as const, label: "LinkedIn", href: SITE.social.linkedin },
    { id: "instagram" as const, label: "Instagram", href: SITE.social.instagram },
    { id: "whatsapp" as const, label: "WhatsApp", href: SITE.social.whatsapp },
  ] satisfies { id: SocialId; label: string; href: string }[]
).filter((item) => item.href.trim().length > 0);

export const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS: {
  heading: string;
  items: { label: string; href: string }[];
}[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/careers" },
      { label: "What you get", href: "/products" },
      { label: "Our approach", href: "/industries" },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Web app development", href: "/services/web-apps" },
      { label: "Mobile app development", href: "/services/mobile-apps" },
      { label: "AI agent development", href: "/services/ai-agents" },
      { label: "IoT development", href: "/services/iot" },
      { label: "VLSI development", href: "/services/vlsi" },
    ],
  },
  {
    heading: "Work",
    items: [
      { label: "What we ship", href: "/products" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Start a build", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "FAQ", href: "/faq" },
      { label: "Field notes", href: "/resources" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy", href: "/legal#privacy" },
      { label: "Terms", href: "/legal#terms" },
      { label: "Cookies", href: "/legal#cookies" },
      { label: "Accessibility", href: "/legal#accessibility" },
      { label: "Security", href: "/legal#security" },
      { label: "Editorial", href: "/legal#editorial" },
    ],
  },
];

export type SearchIndexItem = { kind: string; label: string; path: string };

export const SEARCH_INDEX: SearchIndexItem[] = [
  { kind: "page", label: "Home", path: "/" },
  { kind: "page", label: "About", path: "/about" },
  { kind: "page", label: "Services", path: "/services" },
  { kind: "service", label: "Web apps & APIs", path: "/services/web-apps" },
  { kind: "service", label: "Android/iOS Apps", path: "/services/mobile-apps" },
  { kind: "service", label: "AI Agent Automation", path: "/services/ai-agents" },
  { kind: "service", label: "IoT & electronics", path: "/services/iot" },
  { kind: "service", label: "End-to-end VLSI", path: "/services/vlsi" },
  { kind: "page", label: "What you get", path: "/products" },
  { kind: "page", label: "Our approach", path: "/industries" },
  { kind: "page", label: "Case studies", path: "/case-studies" },
  { kind: "page", label: "Pricing", path: "/pricing" },
  { kind: "page", label: "FAQ", path: "/faq" },
  { kind: "page", label: "Legal", path: "/legal" },
  { kind: "page", label: "Contact", path: "/contact" },
  { kind: "page", label: "Careers", path: "/careers" },
];
