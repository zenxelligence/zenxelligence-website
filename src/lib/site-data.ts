export type TileItem = {
  index: string;
  title: string;
  line: string;
  meta: string;
  href?: string;
};

export type Block =
  | { type: "label"; label: string }
  | { type: "prose"; text: string }
  | { type: "quote"; text: string }
  | { type: "note"; text: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "tiles"; items: TileItem[] }
  | { type: "bullets"; items: string[] }
  | { type: "pills"; items: string[] }
  | { type: "logos"; items: string[] }
  | { type: "gallery"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; monoCols?: number[] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "quotes"; items: { text: string; who: string }[] }
  | { type: "code"; label: string; text: string }
  | { type: "status"; text: string }
  | { type: "form" }
  | { type: "cases" };

export type PageContent = {
  kicker: string;
  title: string;
  subhead?: string;
  blocks: Block[];
};

export const SITE = {
  name: "Zen xElligence",
  tagline: "End to end. Web to VLSI.",
  email: "hello@zenxelligence.com",
  url: "https://zenxelligence.com",
};

export const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const AUDIENCE_TAGS = ["For founders.", "For product teams.", "For hardware teams."];

export const FOOTER_COLUMNS: {
  heading: string;
  items: { label: string; href: string; mono?: boolean }[];
}[] = [
  {
    heading: "COMPANY",
    items: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "SERVICES",
    items: [
      { label: "Consulting", href: "/services/consulting" },
      { label: "Implementation", href: "/services/implementation" },
      { label: "Managed Services", href: "/services/managed-services" },
      { label: "Support", href: "/services/support" },
    ],
  },
  {
    heading: "PRODUCTS",
    items: [
      { label: "Pulse", href: "/products/pulse" },
      { label: "Pulse Status Page ↗", href: "/machine-lens" },
    ],
  },
  {
    heading: "RESOURCES",
    items: [
      { label: "Blog / Field Notes", href: "/resources" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQ", href: "/faq" },
      { label: "llms.txt", href: "/llms.txt", mono: true },
    ],
  },
  {
    heading: "LEGAL",
    items: [
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
      { label: "Cookie Policy", href: "/" },
      { label: "Accessibility Statement", href: "/" },
      { label: "Security", href: "/" },
      { label: "Editorial Standards", href: "/" },
    ],
  },
];

export type CaseFile = {
  slug: string;
  title: string;
  tag: string;
  blocks: { SYMPTOM: string; FINDING: string; FIX: string; RESULT: string };
};

export const CASE_FILES: CaseFile[] = [
  {
    slug: "014",
    title: "Case File 014 — Manufacturing ERP Vendor Selection",
    tag: "manufacturing · verified",
    blocks: {
      SYMPTOM:
        "Client running three disconnected systems for inventory,\npurchasing, and shop-floor scheduling. Manual reconciliation\ncosting ~22 staff-hours/week.",
      FINDING:
        "No single system in evaluation met shop-floor latency\nrequirements (<200ms scan-to-update) out of the box.",
      FIX: "Recommended NetSuite + custom middleware layer over a\nfull ERP replacement. Scoped and built the middleware.",
      RESULT:
        "Reconciliation time: 22 hrs/week → 1.5 hrs/week.\nScan-to-update latency: 340ms avg → 90ms avg.",
    },
  },
  {
    slug: "031",
    title: "Case File 031 — Logistics Real-Time Routing System",
    tag: "logistics · verified",
    blocks: {
      SYMPTOM:
        "Dispatch software recalculating routes every 15 minutes,\ncausing drivers to receive stale directions during traffic\nevents.",
      FINDING:
        "Legacy geocoding API rate-limited at a threshold the client\nwas hitting during every morning dispatch window.",
      FIX: "Rebuilt routing service on a new geocoding provider with\nrequest batching; added Pulse monitoring on the dispatch\npipeline itself.",
      RESULT:
        "Route recalculation interval: 15 min → 90 sec.\nLate-delivery rate: 8.4% → 2.1% (Q3 to Q4, same client volume).",
    },
  },
  {
    slug: "039",
    title: "Case File 039 — Financial Services Reporting Pipeline (anonymized)",
    tag: "financial services · anonymized",
    blocks: {
      SYMPTOM:
        "Month-end close taking 9 business days; finance team\nmanually exporting from four systems into spreadsheets.",
      FINDING:
        "No system-of-record for intercompany transactions; every\nreconciliation was rebuilt from scratch monthly.",
      FIX: "Built a custom reporting pipeline with a single\nintercompany ledger view, automated nightly sync.",
      RESULT: "Month-end close: 9 days → 3 days.\nManual export steps eliminated: 14 → 0.",
    },
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-we-stopped-recommending-full-erp-replacements",
    title: "Why we stopped recommending full ERP replacements",
    description: "A decision framework with a cost/latency comparison table.",
    date: "2026-06-02",
    body: [
      "For most of the last decade, our default answer to “our ERP can’t keep up” was to scope a replacement. That default was wrong more often than it was right.",
      "A full ERP replacement resets institutional knowledge, retrains every user, and re-exposes every integration your business already depends on. In three of our last five vendor-selection engagements, the client’s actual problem was a single bottleneck — usually a synchronous integration point — not the platform itself.",
      "Our current framework scores three variables before recommending a replacement: the cost of a targeted middleware fix, the latency budget the business actually needs, and the blast radius of a full cutover on staff who already know the current system. Replacement wins only when the platform itself, not an integration, is the constraint.",
      "Case File 014 is the clearest example: a manufacturing client evaluating ERP vendors turned out to need a middleware layer, not a new ERP. Reconciliation time dropped from 22 hours a week to 1.5.",
    ],
  },
  {
    slug: "the-middleware-pattern-we-use-for-legacy-plc-integration",
    title: "The middleware pattern we use for legacy PLC integration",
    description: "Includes a reference architecture diagram and API contract example.",
    date: "2026-05-14",
    body: [
      "Programmable logic controllers on a shop floor rarely speak a language any modern system understands natively, and rewriting the controller layer is usually off the table — it runs the machines.",
      "Our standard pattern puts a thin middleware service between the PLC network and the system of record: a poller that normalizes register reads into typed events, a queue that absorbs bursts during shift changes, and a contract layer that the ERP or MES integrates against instead of the PLC protocol directly.",
      "The API contract is deliberately boring: typed JSON events over HTTP, idempotent by a monotonic sequence number per device. Boring is the point — it's the layer most likely to still be running unmodified in five years.",
      "This is the same pattern behind Case File 031's routing system, adapted from dispatch telemetry to shop-floor scan events.",
    ],
  },
  {
    slug: "how-pulse-calculates-inp-without-a-synthetic-browser",
    title: "How Pulse calculates INP without a synthetic browser",
    description: "Technical walkthrough with formulas.",
    date: "2026-04-22",
    body: [
      "Interaction to Next Paint (INP) is a real-user metric by definition — it measures how long an actual visitor waits after clicking, tapping, or typing before the browser paints a response. Synthetic testing tools can approximate it, but they can't measure it.",
      "Pulse's client library subscribes to the browser's own PerformanceObserver for the `event` entry type, buffering event durations as they occur. We track the worst interaction per page view rather than an average, because a single slow interaction is what a user actually remembers.",
      "The formula we report is the same one the Web Vitals spec defines: for pages with fewer than 50 interactions, INP is the single slowest event duration; above that, we drop outliers using the same percentile-based approach as Chrome's own implementation, sourced from the `web-vitals` JavaScript library rather than a reimplementation.",
      "This page's own INP reading, in the widget above, comes from that exact code path — not a placeholder.",
    ],
  },
];

export type SearchIndexItem = { kind: string; label: string; path: string };

export const SEARCH_INDEX: SearchIndexItem[] = [
  { kind: "page", label: "Home", path: "/" },
  { kind: "page", label: "About", path: "/about" },
  { kind: "page", label: "Services", path: "/services" },
  { kind: "service", label: "Consulting", path: "/services/consulting" },
  { kind: "service", label: "Implementation", path: "/services/implementation" },
  { kind: "service", label: "Managed Services", path: "/services/managed-services" },
  { kind: "service", label: "Support", path: "/services/support" },
  { kind: "page", label: "Products", path: "/products" },
  { kind: "product", label: "Pulse", path: "/products/pulse" },
  { kind: "page", label: "Industries", path: "/industries" },
  { kind: "page", label: "Case Studies", path: "/case-studies" },
  {
    kind: "case",
    label: "Case File 014 — Manufacturing ERP Vendor Selection",
    path: "/case-studies/014",
  },
  {
    kind: "case",
    label: "Case File 031 — Logistics Real-Time Routing",
    path: "/case-studies/031",
  },
  {
    kind: "case",
    label: "Case File 039 — Financial Reporting Pipeline",
    path: "/case-studies/039",
  },
  { kind: "page", label: "Pricing", path: "/pricing" },
  { kind: "page", label: "Testimonials / Clients", path: "/clients" },
  { kind: "page", label: "Partners / Technology Alliances", path: "/partners" },
  { kind: "page", label: "Resources / Field Notes", path: "/resources" },
  { kind: "page", label: "FAQ", path: "/faq" },
  { kind: "page", label: "The Machine Lens", path: "/machine-lens" },
  { kind: "page", label: "Contact", path: "/contact" },
  { kind: "page", label: "Careers", path: "/careers" },
  { kind: "file", label: "llms.txt", path: "/llms.txt" },
];

export const ROUTE_PAGE_MAP: Record<string, string> = {
  about: "about",
  services: "services",
  "services/consulting": "consulting",
  "services/implementation": "implementation",
  "services/managed-services": "managed-services",
  "services/support": "support",
  products: "products",
  "products/pulse": "pulse",
  industries: "industries",
  "case-studies": "case-studies",
  pricing: "pricing",
  clients: "clients",
  partners: "partners",
  resources: "resources",
  faq: "faq",
  "machine-lens": "machine-lens",
  contact: "contact",
  careers: "careers",
};

export const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zen xElligence",
  url: "https://zenxelligence.com",
  description:
    "End-to-end product studio: web applications and APIs, AI agent automation, Android/iOS apps, IoT electronics, and VLSI — from first brief to handover.",
  sameAs: [
    "https://www.linkedin.com/company/zen-xelligence",
    "https://github.com/zen-xelligence",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application and API Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agent Automation" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Android and iOS App Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "IoT and Electronics Projects" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "End-to-end VLSI" } },
  ],
};

// ---- Home page specific data ----

export const HOME_COPY = {
  headline: [
    "Web and Android/iOS apps.",
    "AI agent automation.",
    "IoT and VLSI. End to end.",
  ],
  lede: "One team takes each build from brief to handover. You don’t need to know the tools.",
  thesisTitle: "You shouldn’t need five vendors to finish one product.",
  thesisBody:
    "Web applications, Android/iOS apps, AI agent automation, IoT electronics, and VLSI — each one runs spec to handover with the same people. We don’t stop at a slide deck, a prototype, or a netlist.",
  closeTitle: "Tell us what you want built. We’ll reply with a plan and a first date.",
};

export const HOME_OFFERS = [
  { label: "Web apps & APIs", href: "/services" },
  { label: "Android/iOS Apps", href: "/services" },
  { label: "AI Agent Automation", href: "/products" },
  { label: "IoT & electronics", href: "/services" },
  { label: "End-to-end VLSI", href: "/services" },
];

export const HOME_PLATES = [
  { id: "plate-opening", no: "01", role: "Opening", nav: "Start", pose: "ZX-1 · FULL PRODUCT" },
  { id: "plate-repose", no: "02", role: "Repose", nav: "Offer", pose: "ZX-1 · FIVE SURFACES" },
  { id: "plate-web", no: "03", role: "Material study", nav: "Web apps", pose: "ZX-1 · WEB" },
  { id: "plate-agents", no: "04", role: "Movement study", nav: "AI Agent Automation", pose: "ZX-1 · AI AGENT" },
  { id: "plate-android", no: "05", role: "Finish", nav: "Android/iOS Apps", pose: "ZX-1 · ANDROID/IOS" },
  { id: "plate-iot", no: "06", role: "Electronics study", nav: "IoT", pose: "ZX-1 · IOT" },
  { id: "plate-vlsi", no: "07", role: "Silicon study", nav: "VLSI", pose: "ZX-1 · VLSI" },
  { id: "plate-finish", no: "08", role: "Finish selection", nav: "How we work", pose: "ZX-1 · FINISH" },
  { id: "plate-spec", no: "09", role: "Specifications", nav: "Specs", pose: "ZX-1 · SPEC" },
  { id: "plate-index", no: "10", role: "Plate index", nav: "Contact", pose: "ZX-1 · INDEX" },
] as const;

export const HOME_SPECS: [string, string, string][] = [
  ["Web apps & APIs", "MERN, FastAPI", "Live application, auth, and API docs"],
  ["AI Agent Automation", "LangChain, LangGraph, CrewAI, AutoGen", "Working workflows with run traces"],
  ["Android/iOS Apps", "Native Android and iOS", "App on the same backend as the web product"],
  ["IoT & electronics", "Sensors, firmware, electronics", "Hardware talking to the product"],
  ["End-to-end VLSI", "Spec, RTL, verification, implementation", "Signed-off design, ready to hand over"],
];

export const HOME_STACK = [
  { lane: "Web apps & APIs", tools: "MERN · FastAPI" },
  { lane: "AI Agent Automation", tools: "LangChain · LangGraph · CrewAI · AutoGen" },
  { lane: "Android/iOS Apps", tools: "Native Android · iOS" },
  { lane: "IoT & electronics", tools: "Sensors · firmware · electronics" },
  { lane: "End-to-end VLSI", tools: "Spec · RTL · verification · sign-off" },
];

export const HOME_DOORWAYS = [
  {
    index: "01",
    title: "Web applications & APIs",
    body: "End-to-end web products: design, build, auth, data, and a live API — not a brochure site.",
    tag1: "end to end",
    tag2: "MERN · FastAPI",
    cta: "See web apps →",
    href: "/services",
  },
  {
    index: "02",
    title: "AI Agent Automation",
    body: "End-to-end agent systems: we design the workflow, wire the tools, and leave you automation that runs — not a chatbot demo.",
    tag1: "end to end",
    tag2: "LangGraph · CrewAI",
    cta: "See AI agent automation →",
    href: "/products",
  },
  {
    index: "03",
    title: "Android/iOS Apps",
    body: "End-to-end native Android and iOS: same product backend as the web app. One system, not two.",
    tag1: "end to end",
    tag2: "Android · iOS",
    cta: "See Android/iOS apps →",
    href: "/services",
  },
  {
    index: "04",
    title: "IoT & electronics",
    body: "End-to-end connected hardware: sensors, firmware, and electronics wired into the product — not a kit that dies in a drawer.",
    tag1: "end to end",
    tag2: "firmware",
    cta: "See IoT →",
    href: "/services",
  },
  {
    index: "05",
    title: "End-to-end VLSI",
    body: "Full-chip flow: specification and RTL through verification, implementation, and sign-off. We don’t pass you to another house halfway.",
    tag1: "end to end",
    tag2: "RTL · sign-off",
    cta: "See VLSI →",
    href: "/services",
  },
];

export const HOME_STATS = [
  { value: "End to end", label: "Web apps, Android/iOS apps, AI agent automation, IoT, and VLSI — brief to handover." },
  { value: "Scoped", label: "Written scope, timeline, and cost before a line ships." },
  { value: "Documented", label: "APIs, agents, and silicon leave with a runbook, not a black box." },
  { value: "Wired", label: "App, IoT, and chip talk to the same product the website uses." },
];

export const HOME_CAPABILITIES: TileItem[] = [
  {
    index: "01",
    title: "MERN products",
    line: "Mongo, Express, React, Node — full web applications that go to production.",
    meta: "Services →",
    href: "/services",
  },
  {
    index: "02",
    title: "FastAPI platforms",
    line: "Typed Python APIs other clients, agents, and devices can consume.",
    meta: "Services →",
    href: "/services",
  },
  {
    index: "03",
    title: "AI agent graphs",
    line: "LangChain and LangGraph workflows with tools, memory, and human checkpoints.",
    meta: "Products →",
    href: "/products",
  },
  {
    index: "04",
    title: "Multi-agent crews",
    line: "CrewAI and AutoGen teams that split research, coding, and review across roles.",
    meta: "Products →",
    href: "/products",
  },
  {
    index: "05",
    title: "Android/iOS + IoT",
    line: "Native Android and iOS apps and electronics that close the loop with the same product backend.",
    meta: "Services →",
    href: "/services",
  },
  {
    index: "06",
    title: "VLSI",
    line: "End-to-end silicon: spec, RTL, verification, implementation, handover.",
    meta: "Services →",
    href: "/services",
  },
];

// ---- Interior route content ----

const t = (index: string, title: string, line: string, meta: string, href?: string): TileItem => ({
  index,
  title,
  line,
  meta,
  href,
});

export const PAGES: Record<string, PageContent> = {
  about: {
    kicker: "ABOUT",
    title:
      "Founded by two engineers who were tired of watching agencies bill for junior work at senior rates.",
    blocks: [
      { type: "label", label: "STORY" },
      {
        type: "prose",
        text: "Zen xElligence started in 2011 as a two-person systems integration shop in Columbus, Ohio, doing ERP migrations for mid-market manufacturers. By 2015 the founders noticed a pattern across every engagement: the internal dashboards clients used to track system health were either nonexistent or built once and abandoned. In 2019, Zen xElligence spun its internal monitoring tool into a standalone product — Pulse — and now runs it as a second business line alongside services.",
      },
      {
        type: "table",
        head: ["YEAR", "MILESTONE"],
        rows: [
          ["2011", "Founded, 2 people"],
          ["2015", "First managed-services contract"],
          ["2019", "Pulse launched internally"],
          ["2022", "Pulse opened to external customers"],
          ["2026", "40 employees, 120 active clients, 340 Pulse workspaces"],
        ],
        monoCols: [0],
      },
      { type: "label", label: "LEADERSHIP" },
      {
        type: "table",
        head: ["ROLE", "REMIT", "BACKGROUND"],
        rows: [
          [
            "Founder / CEO",
            "Sets technical direction, still writes architecture reviews personally",
            "22 years in enterprise systems, ex-Accenture",
          ],
          [
            "Co-founder / CTO",
            "Owns Pulse product roadmap",
            "Former SRE lead, built the original internal telemetry stack",
          ],
          [
            "VP, Delivery",
            "Runs all client implementation work",
            "15 years running fixed-bid engagements",
          ],
          [
            "VP, Managed Services",
            "Owns the 24/7 operations desk",
            "Former NOC manager, three ITIL certifications",
          ],
        ],
      },
      { type: "label", label: "CERTIFICATIONS / PARTNERSHIPS" },
      {
        type: "pills",
        items: [
          "AWS Advanced Tier Partner",
          "Microsoft Solutions Partner — Modern Work",
          "ISO 27001 Certified",
          "SOC 2 Type II",
          "Salesforce Consulting Partner",
        ],
      },
      { type: "label", label: "WHY US" },
      { type: "quote", text: "Senior sells. Junior delivers. We don’t do that." },
      {
        type: "prose",
        text: "Most agencies put a principal in the sales call and a team of associates on the actual build. The person who scoped your project isn’t the person who ships it. At Zen xElligence, the engineer who scopes your system is on the delivery team. If the scope changes mid-build, the person who made the original call is in the room to make the next one.",
      },
      {
        type: "stats",
        items: [
          {
            value: "0",
            label: "client engagements handed off to a different lead engineer mid-project, 2023–2026",
          },
          { value: "100%", label: "of SOWs signed by the engineer who scoped them" },
          { value: "4.8 / 5", label: "average post-engagement client rating (47 responses)" },
        ],
      },
    ],
  },

  services: {
    kicker: "SERVICES",
    title: "Four services. One team. No handoffs.",
    subhead: "Consulting through support — the same engineers stay assigned end to end.",
    blocks: [
      { type: "label", label: "SERVICES OVERVIEW" },
      {
        type: "tiles",
        items: [
          t("01", "Consulting", "Architecture reviews, systems audits, vendor and platform selection.", "detail →", "/services/consulting"),
          t("02", "Implementation", "ERP, CRM, and custom platform builds — fixed-scope, fixed-price.", "detail →", "/services/implementation"),
          t("03", "Managed Services", "24/7 monitoring, patching, backup verification, incident response.", "detail →", "/services/managed-services"),
          t("04", "Support", "Tiered SLA support, including systems Zen xElligence didn’t originally build.", "detail →", "/services/support"),
        ],
      },
    ],
  },

  consulting: {
    kicker: "SERVICES / CONSULTING",
    title:
      "Before you buy a platform or rebuild one, get a second opinion from people who’ve shipped 300+ of them.",
    blocks: [
      { type: "label", label: "WHAT’S INCLUDED" },
      {
        type: "bullets",
        items: [
          "Architecture review — a documented assessment of your current system, with a prioritized risk list",
          "Systems audit — security, performance, and technical-debt inventory across your stack",
          "Vendor/platform selection — RFP support and side-by-side scoring for ERP, CRM, or custom-build decisions",
        ],
      },
      { type: "label", label: "TYPICAL ENGAGEMENT" },
      {
        type: "prose",
        text: "2–4 weeks, fixed fee, deliverable is a written report plus a working session to walk through findings.",
      },
      {
        type: "tiles",
        items: [
          t(
            "REF",
            "Case File 014 — Manufacturing ERP Vendor Selection",
            "Reconciliation time 22 hrs/week → 1.5 hrs/week.",
            "read case file →",
            "/case-studies/014",
          ),
        ],
      },
    ],
  },

  implementation: {
    kicker: "SERVICES / IMPLEMENTATION",
    title: "Scoped in writing. Billed on milestones. No change orders you didn’t approve.",
    blocks: [
      { type: "label", label: "WHAT’S INCLUDED" },
      {
        type: "bullets",
        items: [
          "ERP implementation (NetSuite, Dynamics 365, SAP Business One)",
          "CRM implementation (Salesforce, HubSpot)",
          "Custom platform builds (internal tools, customer portals, data pipelines)",
          "Data migration and legacy system decommissioning",
        ],
      },
      { type: "label", label: "DELIVERY MODEL" },
      {
        type: "prose",
        text: "Fixed-bid for scoped work, time-and-materials for exploratory or evolving builds. Milestone-based billing either way.",
      },
      {
        type: "stats",
        items: [
          { value: "312", label: "production deployments since 2011" },
          { value: "94%", label: "delivered on original timeline (±5 business days)" },
          { value: "8", label: "average team size per mid-size implementation" },
        ],
      },
    ],
  },

  "managed-services": {
    kicker: "SERVICES / MANAGED SERVICES",
    title: "We monitor what we build. We also monitor what we didn’t.",
    blocks: [
      { type: "label", label: "WHAT’S INCLUDED" },
      {
        type: "bullets",
        items: [
          "24/7 systems monitoring (uptime, latency, error-rate alerting)",
          "Patch management and security updates",
          "Backup verification and disaster-recovery testing",
          "Monthly systems health report",
        ],
      },
      { type: "status", text: "Managed Services operations desk" },
      { type: "label", label: "SLA TIERS" },
      {
        type: "table",
        head: ["TIER", "RESPONSE TIME (P1)", "COVERAGE", "MONTHLY REPORT"],
        rows: [
          ["Standard", "4 hours", "Business hours", "Yes"],
          ["Priority", "1 hour", "24/7", "Yes, weekly"],
          ["Mission-Critical", "15 minutes", "24/7, dedicated on-call engineer", "Yes, weekly + quarterly review"],
        ],
        monoCols: [1],
      },
    ],
  },

  support: {
    kicker: "SERVICES / SUPPORT",
    title: "You don’t need to have built it with us to get support from us.",
    blocks: [
      { type: "label", label: "WHAT’S INCLUDED" },
      {
        type: "bullets",
        items: [
          "Break/fix support for third-party-built systems",
          "Documentation recovery for undocumented legacy platforms",
          "Emergency incident response (available without a standing contract, at hourly rate)",
        ],
      },
      { type: "label", label: "ONBOARDING NOTE" },
      {
        type: "prose",
        text: "New support-only clients go through a paid 1-week systems discovery before an SLA is quoted — Zen xElligence won’t put a response-time guarantee on a system it hasn’t inspected.",
      },
    ],
  },

  products: {
    kicker: "PRODUCTS",
    title: "We built Pulse to watch our own work. Now it watches yours.",
    blocks: [
      { type: "label", label: "PRODUCTS OVERVIEW" },
      {
        type: "tiles",
        items: [
          t(
            "01",
            "Pulse",
            "Uptime, latency, and workflow telemetry for internal systems — self-serve, no consulting engagement required.",
            "explore Pulse →",
            "/products/pulse",
          ),
        ],
      },
    ],
  },

  pulse: {
    kicker: "PRODUCTS / PULSE",
    title: "Pulse",
    subhead: "Every metric on this landing page is Pulse, running on our own site.",
    blocks: [
      { type: "label", label: "FEATURES" },
      {
        type: "table",
        head: ["FEATURE", "DESCRIPTION"],
        rows: [
          ["Uptime monitoring", "HTTP, TCP, and custom health-check endpoints, 30-second intervals"],
          ["Core Web Vitals capture", "Real-user TTFB, LCP, INP, CLS — not synthetic, not sampled"],
          ["Workflow telemetry", "Track internal process completion times (e.g., ticket resolution, deploy pipelines)"],
          ["Status pages", "Public or private, auto-generated from live data, no manual updates"],
          ["Alerting", "Slack, PagerDuty, email, webhook"],
          ["API-first", "Full REST API; every dashboard value is also a queryable endpoint"],
        ],
      },
      { type: "label", label: "SCREENSHOTS" },
      {
        type: "note",
        text: "Placeholder captions for design — drop real product captures here. I can generate diagrams and wireframes, but not photographic screenshots.",
      },
      {
        type: "gallery",
        items: [
          "Dashboard — org-wide uptime heatmap, 90-day view",
          "Incident timeline — P1 alert, detection to resolution",
          "Public status page — client-facing, white-labelable",
        ],
      },
      { type: "label", label: "DEMO" },
      {
        type: "prose",
        text: "Interactive read-only sandbox at pulse.zenxelligence.com/demo — pre-loaded with 90 days of synthetic-but-realistic traffic data, no signup required.",
      },
      {
        type: "stats",
        items: [
          { value: "340", label: "active Pulse workspaces" },
          { value: "2.1B", label: "data points ingested per month" },
          { value: "41ms", label: "median API response time (Pulse’s own dashboard, at p50)" },
        ],
      },
      {
        type: "tiles",
        items: [t("→", "Pulse plans", "Starter, Team, Business, Enterprise.", "see pricing →", "/pricing")],
      },
    ],
  },

  industries: {
    kicker: "INDUSTRIES / SOLUTIONS",
    title: "Different regulatory load. Same discipline.",
    blocks: [
      {
        type: "table",
        head: ["INDUSTRY", "COMMON ENGAGEMENT", "NAMED CONSTRAINT WE DESIGN AROUND"],
        rows: [
          ["Manufacturing", "ERP implementation, shop-floor system integration", "Legacy PLC/SCADA compatibility"],
          [
            "Healthcare (admin systems, non-clinical)",
            "CRM, patient-scheduling backend integration",
            "HIPAA-aligned data handling",
          ],
          [
            "Financial services (back-office)",
            "Custom platform builds, reporting pipelines",
            "SOC 2 / audit trail requirements",
          ],
          [
            "Logistics & distribution",
            "Real-time inventory and routing systems",
            "High-availability requirements, 24/7 uptime SLAs",
          ],
          ["Professional services firms", "CRM + billing system integration", "Multi-entity, multi-currency reporting"],
        ],
      },
      { type: "note", text: "Each industry row links to a filtered view of Case Studies tagged by vertical." },
      {
        type: "tiles",
        items: [t("→", "Case Studies", "47 case files, filterable by vertical.", "open case studies →", "/case-studies")],
      },
    ],
  },

  "case-studies": {
    kicker: "CASE STUDIES",
    title: "47 case files. Real numbers. Client names shown when the client said yes.",
    blocks: [
      { type: "label", label: "NAMED FLAGSHIP CLIENTS" },
      {
        type: "logos",
        items: [
          "Ridgeline Manufacturing",
          "Corbett Logistics",
          "Harlow Health Administrative Group",
          "Fen & Vale Financial Partners",
          "Meadowbrook Distribution",
        ],
      },
      {
        type: "note",
        text: "Fictional names used for this content package — replace with real client names and logos, with permission, before publishing.",
      },
      { type: "label", label: "CASE FILES" },
      { type: "cases" },
      {
        type: "note",
        text: "Each card: tabbed monospace blocks — Symptom / Finding / Fix / Result — plus a Verify link to a redacted source doc or client reference contact.",
      },
    ],
  },

  pricing: {
    kicker: "PRICING",
    title: "Packages where packages make sense. Quotes where they don’t.",
    blocks: [
      { type: "label", label: "SERVICES PRICING" },
      {
        type: "prose",
        text: "Consulting, implementation, and managed services are scoped per engagement. Every SOW is fixed-bid or time-and-materials, agreed in writing before work starts. Request a quote — most come back within 5 business days.",
      },
      { type: "label", label: "MANAGED SERVICES SLA TIERS" },
      {
        type: "table",
        head: ["TIER", "MONTHLY (PER SYSTEM)", "RESPONSE TIME (P1)"],
        rows: [
          ["Standard", "Custom quote", "4 hours"],
          ["Priority", "Custom quote", "1 hour"],
          ["Mission-Critical", "Custom quote", "15 minutes"],
        ],
        monoCols: [1, 2],
      },
      { type: "label", label: "PULSE PRICING — SELF-SERVE" },
      {
        type: "table",
        head: ["PLAN", "PRICE", "INCLUDED"],
        rows: [
          ["Starter", "$0/mo", "3 monitors, 5-min check interval, email alerts"],
          ["Team", "$49/mo", "25 monitors, 30-sec interval, Slack + PagerDuty, 1 status page"],
          ["Business", "$199/mo", "100 monitors, 30-sec interval, API access, 5 status pages, workflow telemetry"],
          ["Enterprise", "Custom quote", "Unlimited monitors, SSO, dedicated support, white-label status pages"],
        ],
        monoCols: [1],
      },
      { type: "note", text: "14-day free trial on Team and Business. No credit card required." },
    ],
  },

  clients: {
    kicker: "TESTIMONIALS / CLIENTS",
    title: "What changed, in their words.",
    blocks: [
      {
        type: "quotes",
        items: [
          {
            text: "“They scoped it in a week and the same engineer was still on the call eight months later when we hit an edge case.”",
            who: "VP Operations, mid-market logistics client",
          },
          {
            text: "“Pulse replaced a spreadsheet three people were updating by hand every morning.”",
            who: "IT Director, distribution client",
          },
          {
            text: "“We’ve used four different implementation partners over ten years. This is the first one where the SOW matched what actually got delivered.”",
            who: "CFO, financial services client",
          },
        ],
      },
      {
        type: "note",
        text: "Attribution kept to title/industry per client preference; named quotes available on request for prospects who ask.",
      },
      { type: "label", label: "CLIENT LOGO WALL" },
      {
        type: "logos",
        items: [
          "Ridgeline Manufacturing",
          "Corbett Logistics",
          "Harlow Health Administrative Group",
          "Fen & Vale Financial Partners",
          "Meadowbrook Distribution",
          "Additional logos — clients without public case studies",
        ],
      },
    ],
  },

  partners: {
    kicker: "PARTNERS / TECHNOLOGY ALLIANCES",
    title: "We build on platforms we’re certified on.",
    blocks: [
      {
        type: "table",
        head: ["PARTNER", "RELATIONSHIP"],
        rows: [
          ["AWS", "Advanced Tier Partner"],
          ["Microsoft", "Solutions Partner — Modern Work"],
          ["Salesforce", "Consulting Partner"],
          ["NetSuite", "Solution Provider"],
          ["Okta", "Technology Partner (Pulse SSO integration)"],
        ],
      },
    ],
  },

  resources: {
    kicker: "RESOURCES / FIELD NOTES",
    title: "Field notes, not marketing copy.",
    subhead: "Technical writing from the engineers who do the work. RSS available.",
    blocks: [
      { type: "label", label: "RECENT" },
      {
        type: "tiles",
        items: [
          t("01", "Why we stopped recommending full ERP replacements", "A decision framework with a cost/latency comparison table.", "read →", "/resources/why-we-stopped-recommending-full-erp-replacements"),
          t("02", "The middleware pattern we use for legacy PLC integration", "Includes a reference architecture diagram and API contract example.", "read →", "/resources/the-middleware-pattern-we-use-for-legacy-plc-integration"),
          t("03", "How Pulse calculates INP without a synthetic browser", "Technical walkthrough with formulas.", "read →", "/resources/how-pulse-calculates-inp-without-a-synthetic-browser"),
          t("04", "SOC 2 Type II, one year later: what actually changed", "Whitepaper, downloadable PDF.", "read →"),
          t("05", "A field guide to month-end close automation", "Step-by-step with a before/after pipeline diagram.", "read →"),
        ],
      },
      {
        type: "code",
        label: "FEEDS",
        text: "RSS   zenxelligence.com/resources/feed.xml\nMD    zenxelligence.com/resources/{slug}.md   (content negotiation)",
      },
    ],
  },

  faq: {
    kicker: "FAQ",
    title: "Questions we get before the first call.",
    blocks: [
      {
        type: "faq",
        items: [
          {
            q: "Do you work with companies smaller than enterprise?",
            a: "Most clients are mid-market (50–2,000 employees). Smaller companies typically start with Pulse rather than a services engagement.",
          },
          {
            q: "What’s the difference between fixed-bid and time-and-materials?",
            a: "Fixed-bid is a set price for a defined scope, used when requirements are clear. T&M is billed hourly against a budget ceiling, used for exploratory or evolving work. Every SOW states which model applies before work starts.",
          },
          {
            q: "Can we use Pulse without a services contract?",
            a: "Yes. Pulse is self-serve; the Starter and Team plans require no sales conversation.",
          },
          {
            q: "Do you support systems you didn’t build?",
            a: "Yes, through the Support service — after a paid 1-week discovery period.",
          },
          {
            q: "How do you handle scope changes mid-project?",
            a: "The engineer who scoped the project is on the delivery team, so scope changes are assessed and quoted by the same person who wrote the original SOW — not a project manager relaying it.",
          },
          {
            q: "What’s your data retention policy for Pulse?",
            a: "90 days on Starter/Team, 13 months on Business/Enterprise. Full details in the Pulse Data Processing Agreement.",
          },
        ],
      },
    ],
  },

  "machine-lens": {
    kicker: "THE MACHINE LENS",
    title: "This page is built to be read by machines too.",
    subhead:
      "JSON-LD on every route. A real llms.txt. Markdown mirrors. An MCP server, if you want to query us programmatically.",
    blocks: [
      { type: "label", label: "JSON-LD ORGANIZATION / SERVICE SCHEMA" },
      { type: "code", label: "rendered inline on every route", text: JSON.stringify(JSON_LD, null, 2) },
      { type: "label", label: "LLMS.TXT — SERVED AT /LLMS.TXT" },
      {
        type: "code",
        label: "/llms.txt",
        text: "# Zen xElligence\n\n> IT services and product company. Custom development, systems\n> integration, and managed services for mid-market companies, plus\n> Pulse, a self-serve operations-intelligence SaaS platform.\n\n## Services\n- Consulting: /services/consulting\n- Implementation: /services/implementation\n- Managed Services: /services/managed-services\n- Support: /services/support\n\n## Products\n- Pulse: /products/pulse\n\n## Reference\n- Case Studies: /case-studies\n- Pricing: /pricing\n- FAQ: /faq\n\n## Contact\n- Get a quote: /contact\n- General inquiries: hello@zenxelligence.com",
      },
      { type: "label", label: "MARKDOWN MIRROR — CONTENT NEGOTIATION" },
      {
        type: "code",
        label: "shell",
        text: 'curl -H "Accept: text/markdown" https://zenxelligence.com/products/pulse\n\n→ returns products/pulse.md instead of rendered HTML',
      },
      { type: "label", label: "REAL API / STATUS ENDPOINT" },
      {
        type: "code",
        label: "GET https://status.zenxelligence.com/api/v1/summary",
        text: '{\n  "status": "operational",\n  "uptime_30d": "99.982%",\n  "open_incidents": 0,\n  "last_incident": "2026-07-14T03:22:00Z",\n  "measured_by": "pulse"\n}',
      },
      { type: "label", label: "MCP TOOL SERVER" },
      {
        type: "code",
        label: "mcp.zenxelligence.com",
        text: "search_site_map    returns page list with descriptions\nfaq_concierge      answers questions against the published FAQ corpus\nrun_page_audit     returns live TTFB/LCP/INP/CLS for any Zen xElligence-owned URL",
      },
      { type: "label", label: "DYNAMIC OG IMAGE GENERATION" },
      {
        type: "prose",
        text: "Every page’s Open Graph image is generated at request time from the page’s title/subtitle pair — not a static asset. Example: /og/products/pulse renders “Pulse” + “Uptime, latency, and workflow telemetry” onto the dark-theme template at request time.",
      },
      { type: "label", label: "LIVE SELF-MEASURING WIDGET" },
      {
        type: "note",
        text: "Same widget as the homepage, embedded again here with a link to raw JSON output. Four of these interfaces run live in this build; the MCP server, markdown mirror, status endpoint and OG generation are specified and require a server to deploy.",
      },
    ],
  },

  contact: {
    kicker: "CONTACT",
    title: "One form. One inbox. A real person replies.",
    blocks: [
      { type: "form" },
      {
        type: "prose",
        text: "hello@zenxelligence.com — stated response-time commitment: within 1 business day.",
      },
      { type: "note", text: "No phone tree, no calendar-link-only flow — a human reads every submission before routing it." },
    ],
  },

  careers: {
    kicker: "CAREERS",
    title: "We hire the person who’ll still be on the call in month eight.",
    subhead:
      "Zen xElligence doesn’t run a bench model. If we hire you onto a role, you’re staffed on real client work inside your first month.",
    blocks: [
      { type: "label", label: "OPEN POSITIONS" },
      {
        type: "table",
        head: ["ROLE", "TEAM", "LOCATION"],
        rows: [
          ["Senior Implementation Engineer (NetSuite)", "Implementation", "Remote (US)"],
          ["Site Reliability Engineer", "Managed Services / Pulse", "Remote (US)"],
          ["Backend Engineer, Pulse", "Product", "Columbus, OH or Remote"],
          ["Solutions Architect", "Consulting", "Remote (US)"],
        ],
      },
      { type: "label", label: "WHY WORK HERE" },
      {
        type: "bullets",
        items: [
          'Engineers scope their own work; no separate "sales engineering" layer misrepresenting scope',
          "No bench — every hire is staffed within 30 days",
          "Pulse is dogfooded internally; engineers ship features they use themselves the same week",
        ],
      },
    ],
  },
};
