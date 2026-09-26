import { STUDIO_BLURB } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";

export type TileItem = {
  index: string;
  title: string;
  line: string;
  meta: string;
  href?: string;
};

export type Block =
  | { type: "label"; label: string; id?: string }
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

export { SITE, SOCIAL, NAV_ITEMS, FOOTER_COLUMNS, SEARCH_INDEX, STUDIO_BLURB, STUDIO_TAGLINE, DEFAULT_DESCRIPTION } from "@/content/site";
export type { SearchIndexItem } from "@/content/site";

export const A3_PILLARS = [
  {
    key: "autonomous",
    letter: "A¹",
    name: "Autonomous",
    practice: "Autonomous Intelligence",
    fields: "AI/ML, Data, Cloud",
  },
  {
    key: "adaptive",
    letter: "A²",
    name: "Adaptive",
    practice: "Adaptive Silicon",
    fields: "VLSI",
  },
  {
    key: "architected",
    letter: "A³",
    name: "Architected",
    practice: "Architected Determinism · Architect Training",
    fields: "Electronics / Embedded · Education",
  },
] as const;

export const AUDIENCE_TAGS = ["For founders.", "For product teams.", "For hardware teams."];

export type CaseFile = {
  slug: string;
  title: string;
  tag: string;
  blocks: { SYMPTOM: string; FINDING: string; FIX: string; RESULT: string };
};

export const CASE_FILES: CaseFile[] = [];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [];


/** Live pages still rendered (OG + metadata). Redirected paths are not listed. */
export const ROUTE_PAGE_MAP: Record<string, string> = {
  about: "about",
  services: "services",
  products: "products",
  industries: "industries",
  "case-studies": "case-studies",
  pricing: "pricing",
  resources: "resources",
  faq: "faq",
  contact: "contact",
  careers: "careers",
  legal: "legal",
};

export const ORGANIZATION_JSON_LD = organizationJsonLd();

export const WEBSITE_JSON_LD = websiteJsonLd();

/** @deprecated use ORGANIZATION_JSON_LD — kept for machine-lens / markdown mirrors */
export const JSON_LD = ORGANIZATION_JSON_LD;

export const FAQ_ITEMS = [
  {
    q: "Who are you?",
    a: "Two engineers, same standing. The people who quote the work are the people who do the work.",
  },
  {
    q: "What does Zen xElligence build?",
    a: "End-to-end web apps and APIs, AI agent automation, Android/iOS apps (Flutter, React Native, or native), IoT and electronics, and VLSI — brief to handover.",
  },
  {
    q: "What is ZX A³ Innovation™?",
    a: "Our industry frame: Autonomous Intelligence (AI/ML, data, cloud), Adaptive Silicon (VLSI), and Architected Determinism plus Architect Training (electronics, embedded, education).",
  },
  {
    q: "Do I need to buy all five surfaces?",
    a: "No. One Android app or one VLSI flow is a complete engagement. Five is the menu.",
  },
  {
    q: "Is there a product I subscribe to?",
    a: "No. You own what we ship. Hosting, if we stand it up, runs in your account.",
  },
  {
    q: "How do you price?",
    a: "Written scope first, then a number. Fixed-bid when the edge is clear. Time-and-materials when it isn’t. We reply within one business day.",
  },
  {
    q: "Where are the case studies?",
    a: "A file goes up when the client says yes. We will not publish a made-up logo wall.",
  },
  {
    q: "Who owns the work?",
    a: "What we make for you is yours at handover, except tools we did not write. Source, docs, and a runbook are part of that handover.",
  },
  {
    q: "What happens after handover?",
    a: "You own the system. If you want us to stay for changes, that is a separate retainer, quoted after the build.",
  },
] as const;

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// ---- Home page specific data ----

export const HOME_COPY = {
  headline: ["Intelligence", "in every", "layer."],
  lede: STUDIO_BLURB,
  thesisTitle: "You shouldn’t need five vendors to finish one product.",
  thesisBody:
    "Web applications, Android/iOS apps, AI agent automation, IoT electronics, and VLSI — each one runs spec to handover with the same people. We don’t stop at a slide deck, a prototype, or a netlist.",
  closeTitle: "Tell us what you want built. We’ll reply with a plan and a first date.",
};

export const HOME_OFFERS = [
  { label: "Web apps & APIs", href: "/services/web-apps" },
  { label: "Android/iOS Apps", href: "/services/mobile-apps" },
  { label: "AI Agent Automation", href: "/services/ai-agents" },
  { label: "IoT & electronics", href: "/services/iot" },
  { label: "End-to-end VLSI", href: "/services/vlsi" },
];

export const HOME_PLATES = [
  { id: "services", no: "01", role: "What we ship", nav: "Services", pose: "", href: "#services" },
  { id: "web", no: "02", role: "Web apps", nav: "Web apps", pose: "", href: "#web" },
  { id: "ai-agents", no: "03", role: "AI agents", nav: "AI Agent Automation", pose: "", href: "#ai-agents" },
  { id: "mobile", no: "04", role: "Mobile", nav: "Android/iOS Apps", pose: "", href: "#mobile" },
  { id: "iot", no: "05", role: "IoT", nav: "IoT", pose: "", href: "#iot" },
  { id: "vlsi", no: "06", role: "VLSI", nav: "VLSI", pose: "", href: "#vlsi" },
  { id: "process", no: "07", role: "How we work", nav: "How we work", pose: "", href: "#process" },
  { id: "stack", no: "08", role: "Stack", nav: "Stack", pose: "", href: "#stack" },
] as const;

export const HOME_SPECS: [string, string, string][] = [
  ["Web apps & APIs", "Next.js, React, Node, FastAPI, Django", "Live application, auth, and API docs"],
  ["AI Agent Automation", "LangChain, LangGraph, CrewAI, AutoGen", "Working workflows with run traces"],
  ["Android/iOS Apps", "Flutter, React Native, native Android/iOS", "App on the same backend as the web product"],
  ["IoT & electronics", "Sensors, firmware, electronics", "Hardware talking to the product"],
  ["End-to-end VLSI", "Spec, RTL, verification, implementation", "Signed-off design, ready to hand over"],
];

export const HOME_STACK = [
  { lane: "Web apps & APIs", tools: "Next.js · React · Node · FastAPI · Django" },
  { lane: "AI Agent Automation", tools: "LangChain · LangGraph · CrewAI · AutoGen" },
  { lane: "Android/iOS Apps", tools: "Flutter · React Native · native" },
  { lane: "IoT & electronics", tools: "Sensors · firmware · electronics" },
  { lane: "End-to-end VLSI", tools: "Spec · RTL · verification · sign-off" },
];

export const STUDIO_STACK = [
  { lane: "Languages", tools: "Python · JavaScript · TypeScript · HTML · CSS · SQL" },
  { lane: "Frontend", tools: "React · Next.js · Tailwind CSS" },
  { lane: "Mobile", tools: "Flutter · React Native · Native Android · iOS" },
  { lane: "Backend", tools: "Node.js · Express · FastAPI · Django / DRF" },
  { lane: "Databases", tools: "MongoDB · PostgreSQL · MySQL · Redis" },
  { lane: "Data Engineering", tools: "Apache Airflow · PySpark · Apache Spark · Kafka · ETL/ELT" },
  { lane: "AI / LLM", tools: "LlamaIndex · LangChain · LangGraph · CrewAI · AutoGen · RAG · OpenAI API · Hugging Face · Vector databases" },
  { lane: "DevOps / Cloud", tools: "Git · GitHub · Docker · Kubernetes · AWS · Azure · CI/CD" },
] as const;

export const STUDIO_STACK_ROWS: string[][] = STUDIO_STACK.map((row) => [row.lane, row.tools]);

export const HOME_DOORWAYS = [
  {
    index: "01",
    title: "Web applications & APIs",
    body: "End-to-end web products: design, build, auth, data, and a live API — not a brochure site.",
    tag1: "Web apps",
    tag2: "Next.js · FastAPI · Django",
    cta: "Web app development →",
    href: "/services/web-apps",
  },
  {
    index: "02",
    title: "AI Agent Automation",
    body: "End-to-end agent systems: we design the workflow, wire the tools, and leave you automation that runs — not a chatbot demo.",
    tag1: "AI agents",
    tag2: "LangChain · LangGraph · CrewAI",
    cta: "AI agent development →",
    href: "/services/ai-agents",
  },
  {
    index: "03",
    title: "Android/iOS Apps",
    body: "End-to-end Android and iOS: Flutter, React Native, or native — same product backend as the web app. One system, not two.",
    tag1: "Mobile",
    tag2: "Flutter · React Native",
    cta: "Mobile app development →",
    href: "/services/mobile-apps",
  },
  {
    index: "04",
    title: "IoT & electronics",
    body: "End-to-end connected hardware: sensors, firmware, and electronics wired into the product — not a kit that dies in a drawer.",
    tag1: "IoT",
    tag2: "firmware",
    cta: "IoT development →",
    href: "/services/iot",
  },
  {
    index: "05",
    title: "End-to-end VLSI",
    body: "Full-chip flow: specification and RTL through verification, implementation, and sign-off. We don’t pass you to another house halfway.",
    tag1: "VLSI",
    tag2: "RTL · sign-off",
    cta: "VLSI development →",
    href: "/services/vlsi",
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
    title: "Web products",
    line: "React, Next.js, Node, FastAPI, Django — full web applications that go to production.",
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
    line: "LangChain, LangGraph, CrewAI, and AutoGen workflows with tools, memory, and human checkpoints.",
    meta: "Products →",
    href: "/products",
  },
  {
    index: "04",
    title: "Data and model work",
    line: "Airflow, Spark, Kafka, and Hugging Face when the product needs pipelines or models, not only a UI.",
    meta: "Products →",
    href: "/products",
  },
  {
    index: "05",
    title: "Android/iOS + IoT",
    line: "Flutter, React Native, or native Android/iOS apps and electronics that close the loop with the same product backend.",
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
    title: "Two engineers. That’s the studio.",
    subhead:
      "We take the brief. We write the scope. We build it. We hand it over. There is no second bench.",
    blocks: [
      {
        type: "quote",
        text: "Two peers. Same standing. Both on the brief. Both on the build.",
      },
      { type: "label", label: "WHO WE ARE" },
      {
        type: "prose",
        text: "Zen xElligence is two engineers. We work under ZX A³ Innovation™: Autonomous Intelligence (AI/ML, data, cloud), Adaptive Silicon (VLSI), and Architected Determinism plus Architect Training (electronics, embedded, education). Web apps, APIs, and Android/iOS ship with us too. We did not grow a 40-person agency around a product we don’t sell.",
      },
      { type: "label", label: "THE TWO OF US" },
      {
        type: "prose",
        text: "Names, photos, and bios go on this page when we add them. Until then the fact that is true: two engineers, same standing, on the brief and the build. Write hello@zenxelligence.com.",
      },
      { type: "label", label: "HOW THAT WORKS" },
      {
        type: "bullets",
        items: [
          "The people who quote the work are the people who do the work.",
          "If the scope moves, the same two are in the room that moves it.",
          "We will not staff a project with names you never met, or a rank you have to guess.",
          "When a surface is outside what two people should carry, we say so before we take the brief — we do not hide a subcontract under our logo.",
        ],
      },
      { type: "label", label: "WHAT WE BUILD" },
      {
        type: "pills",
        items: [
          "Web apps & APIs",
          "Android/iOS",
          "AI Agent Automation",
          "IoT & electronics",
          "End-to-end VLSI",
          "Architect Training",
        ],
      },
      {
        type: "note",
        text: "The working stack is listed once, on the services page.",
      },
      { type: "label", label: "WHAT WE ARE NOT" },
      {
        type: "table",
        head: ["NOT", "INSTEAD"],
        rows: [
          ["An agency with a senior on the call and a junior on the build", "Two engineers, same standing, brief to handover"],
          ["A company that rents you a seat in our software", "You own the system we leave you"],
          ["A partner logo wall", "Tools we use when they fit — no invented certifications"],
        ],
      },
      {
        type: "tiles",
        items: [
          t("→", "See the offer", "Five surfaces under A³.", "services →", "/services"),
          t("→", "Start a build", "You will hear from us, not a coordinator.", "contact →", "/contact"),
        ],
      },
    ],
  },

  services: {
    kicker: "SERVICES",
    title: "Five surfaces. One team. Brief to handover.",
    subhead:
      "Web apps & APIs, Android/iOS apps, AI agent automation, IoT, and VLSI. The people who scope it are the people who finish it.",
    blocks: [
      {
        type: "quote",
        text: "You shouldn’t need five vendors to finish one product.",
      },
      { type: "label", label: "WHAT WE BUILD" },
      {
        type: "tiles",
        items: [
          t(
            "01",
            "Web apps & APIs",
            "Live applications: design, build, auth, data, and a documented API. Not a brochure site.",
            "Next.js · FastAPI · Django",
            "/services/web-apps",
          ),
          t(
            "02",
            "Android/iOS Apps",
            "Flutter, React Native, or native apps on the same backend as the web product. One system, not two codebases that drift.",
            "Flutter · React Native",
            "/services/mobile-apps",
          ),
          t(
            "03",
            "AI Agent Automation",
            "Workflows that run with tools, memory, and traces. Not a chatbot demo that dies after the pitch.",
            "LangChain · LangGraph · CrewAI · AutoGen",
            "/services/ai-agents",
          ),
          t(
            "04",
            "IoT & electronics",
            "Sensors, firmware, and boards wired into the product — not a kit that dies in a drawer.",
            "Firmware · electronics",
            "/services/iot",
          ),
          t(
            "05",
            "End-to-end VLSI",
            "Spec and RTL through verification, implementation, and sign-off. We don’t pass you mid-flow.",
            "RTL · verification · sign-off",
            "/services/vlsi",
          ),
        ],
      },
      { type: "label", label: "WHAT YOU LEAVE WITH" },
      {
        type: "table",
        head: ["SURFACE", "BUILT WITH", "LEAVES WITH"],
        rows: [
          ["Web apps & APIs", "Next.js, React, Node, FastAPI, Django", "Live application, auth, and API docs"],
          ["Android/iOS Apps", "Flutter, React Native, native Android/iOS", "App on the same backend as the web product"],
          ["AI Agent Automation", "LangChain, LangGraph, CrewAI, AutoGen", "Working workflows with run traces"],
          ["IoT & electronics", "Sensors, firmware, electronics", "Hardware talking to the product"],
          ["End-to-end VLSI", "Spec, RTL, verification, implementation", "Signed-off design, ready to hand over"],
        ],
        monoCols: [1],
      },
      { type: "label", label: "HOW AN ENGAGEMENT RUNS" },
      {
        type: "bullets",
        items: [
          "Written scope, timeline, and cost before a line ships.",
          "The same team stays through handover. We do not swap houses mid-build.",
          "You leave with a runbook — APIs, agents, and silicon are not a black box.",
          "When more than one surface is in play, they talk to the same product.",
        ],
      },
      { type: "label", label: "WE WORK IN", id: "stack" },
      {
        type: "table",
        head: ["LANE", "STACK"],
        rows: STUDIO_STACK_ROWS,
        monoCols: [1],
      },
      {
        type: "note",
        text: "You do not need to pick the tools. Data pipelines and cloud sit with Autonomous when the product needs them. Android/iOS, IoT, and VLSI stay on the surfaces above.",
      },
      { type: "label", label: "FAQ" },
      {
        type: "faq",
        items: [
          {
            q: "Do I need to know the stack?",
            a: "No. Tell us what has to exist at handover. We choose tools that fit the build.",
          },
          {
            q: "Do you do data pipelines and cloud?",
            a: "Yes. Airflow, Spark, Kafka, Docker, Kubernetes, AWS, and Azure when the product needs them — not as a separate house.",
          },
          {
            q: "Can you do only one surface?",
            a: "Yes. One Android app or one VLSI flow is a complete engagement. Five is the menu, not a bundle you have to buy.",
          },
          {
            q: "Do you hand the build to another firm halfway?",
            a: "No. Spec to handover stays with the team that scoped it.",
          },
        ],
      },
    ],
  },

  consulting: {
    kicker: "SERVICES / CONSULTING",
    title: "This path now lives under Services.",
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
            "Named work is published only with the client’s permission.",
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
          "Custom platform builds scoped in writing",
        ],
      },
      { type: "label", label: "DELIVERY MODEL" },
      {
        type: "prose",
        text: "Fixed-bid for scoped work, time-and-materials for exploratory or evolving builds. Milestone-based billing either way.",
      },
      {
        type: "stats",
        items: [],
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
    title: "What you own at handover.",
    subhead:
      "This is a studio, not a SaaS catalog. Product here means what ships: the app, the workflow, the board, the chip.",
    blocks: [
      {
        type: "prose",
        text: "Services is how we work. Products is what you take home. There is no hosted dashboard you subscribe to. When the engagement ends, the code, the traces, and the design files are yours.",
      },
      { type: "label", label: "WHAT SHIPS" },
      {
        type: "tiles",
        items: [
          t(
            "01",
            "Live web application",
            "Auth, data, and a documented API running in an environment you control.",
            "yours at handover",
            "/services/web-apps",
          ),
          t(
            "02",
            "Mobile apps",
            "Flutter, React Native, or native Android/iOS against that same API. One product, two clients.",
            "yours at handover",
            "/services/mobile-apps",
          ),
          t(
            "03",
            "Agent workflows",
            "LangChain, LangGraph, CrewAI, and AutoGen systems with tools, memory, and run traces you can replay.",
            "yours at handover",
            "/services/ai-agents",
          ),
          t(
            "04",
            "Connected hardware",
            "Firmware and electronics that talk to the same product the website uses.",
            "yours at handover",
            "/services/iot",
          ),
          t(
            "05",
            "Signed-off VLSI",
            "Spec, RTL, verification, implementation, and a handover pack — not a netlist in an email.",
            "yours at handover",
            "/services/vlsi",
          ),
        ],
      },
      { type: "label", label: "HANDOVER" },
      {
        type: "table",
        head: ["ARTIFACT", "INCLUDED", "YOURS WHEN"],
        rows: [
          ["Application + API", "Source, env map, API docs", "Production is up"],
          ["Mobile clients", "Store-ready builds, same backend", "Apps talk to the live API"],
          ["Agent system", "Graphs, tool wiring, run traces", "A real workflow completes"],
          ["IoT pack", "Firmware, schematic notes, link to the product", "Device reports in"],
          ["VLSI pack", "RTL, verification, implementation notes", "Sign-off, then handover"],
        ],
      },
      {
        type: "code",
        label: "HANDOVER MANIFEST — EXAMPLE",
        text: `# zenxelligence handover
owner: you
surfaces:
  - web:     live app + OpenAPI
  - mobile:  Flutter / React Native / native
  - agents:  graphs + traces
  - iot:     firmware + link
  - vlsi:    RTL → sign-off
we_keep: nothing you paid to have built`,
      },
      {
        type: "note",
        text: "There is no seat to subscribe to. If you need hosting, we set it up as part of the build — it still runs in your account.",
      },
      { type: "label", label: "FAQ" },
      {
        type: "faq",
        items: [
          {
            q: "Is this software I subscribe to?",
            a: "No. We design and build the system. You own it.",
          },
          {
            q: "Who hosts it?",
            a: "You. We can stand up the first environment. Credentials stay in your name.",
          },
          {
            q: "Do I get the source?",
            a: "Yes. Source, docs, and a runbook are part of handover — not an extra SKU.",
          },
        ],
      },
    ],
  },

  pulse: {
    kicker: "PRODUCTS",
    title: "This page has moved.",
    subhead: "Zen xElligence does not sell a hosted monitoring product.",
    blocks: [
      { type: "prose", text: "See what you own at handover, then start a build." },
      { type: "tiles", items: [t("→", "What you get", "The handover, not a subscription.", "products →", "/products")] },
    ],
  },

  industries: {
    kicker: "APPROACH",
    title: "Our approach.",
    subhead: "ZX A³ Innovation™ is the name we use for how the work is grouped: Autonomous, Adaptive, and Architected. It is not a list of industries.",
    blocks: [
      {
        type: "quote",
        text: "A³ is how we group the work — not a list of verticals we invented to look bigger.",
      },
      { type: "label", label: "THE THREE A’S" },
      {
        type: "tiles",
        items: [
          t(
            "A¹",
            "Autonomous",
            "Autonomous Intelligence — systems that sense, decide, and run. AI/ML, data pipelines, and cloud.",
            "AI/ML · Data · Cloud",
            "/products",
          ),
          t(
            "A²",
            "Adaptive",
            "Adaptive Silicon — chips that fit the product, not a leftover netlist. Spec through sign-off.",
            "VLSI",
            "/services",
          ),
          t(
            "A³",
            "Architected",
            "Architected Determinism for electronics and embedded. Architect Training for the people who have to own it.",
            "Embedded · Education",
            "/services",
          ),
        ],
      },
      { type: "label", label: "PRACTICE MAP" },
      {
        type: "table",
        head: ["PILLAR", "PRACTICE", "WHAT WE BUILD"],
        rows: [
          ["Autonomous", "Autonomous Intelligence", "AI/ML, data pipelines, cloud, agent workflows"],
          ["Adaptive", "Adaptive Silicon", "End-to-end VLSI — spec, RTL, verification, sign-off"],
          ["Architected", "Architected Determinism", "Electronics and embedded — firmware, boards, real-time systems"],
          ["Architected", "Architect Training", "Education for the team that has to run and extend the build"],
        ],
      },
      {
        type: "prose",
        text: "Web apps, APIs, and Android/iOS still ship under Services. They sit with Autonomous when the product is cloud-backed intelligence — they are not a fourth A. The tool list lives on the services page.",
      },
      {
        type: "note",
        text: "ZX A³ Innovation™ is the industry frame. We do not add healthcare, fintech, or manufacturing rows unless that is the actual brief.",
      },
      {
        type: "tiles",
        items: [
          t("→", "See the offer", "Five surfaces under the three A’s.", "services →", "/services"),
          t("→", "Start a build", "Scope, date, and a reply within one business day.", "contact →", "/contact"),
        ],
      },
    ],
  },

  "case-studies": {
    kicker: "CASE STUDIES",
    title: "A file goes up when the client says yes.",
    subhead:
      "No invented logos. No borrowed metrics. This page is the format — Symptom, Finding, Fix, Result — waiting for work we can name.",
    blocks: [
      {
        type: "quote",
        text: "A case study is a document you can check. It is not a mood board.",
      },
      { type: "label", label: "HOW A FILE IS WRITTEN" },
      {
        type: "table",
        head: ["BLOCK", "WHAT IT HOLDS", "WHAT IT NEVER HOLDS"],
        rows: [
          ["Symptom", "The state before we started, in their words", "A problem we invented to look busy"],
          ["Finding", "What was actually wrong, after we looked", "A vendor we “selected” for a brand we don’t run"],
          ["Fix", "What we built, on which surface", "Work we did not do"],
          ["Result", "What changed, only if we can show it", "A percentage with no source"],
        ],
      },
      { type: "label", label: "FILES" },
      { type: "cases" },
      { type: "label", label: "FAQ" },
      {
        type: "faq",
        items: [
          {
            q: "Why is this empty?",
            a: "Because we will not publish a made-up client. When a build can be named, it gets a file in this format.",
          },
          {
            q: "Can a prospect still check you?",
            a: "Write. We can arrange a private reference when both sides agree. That is not the same as a public case.",
          },
          {
            q: "I already built with you. Can we add a file?",
            a: "Yes. Send hello@zenxelligence.com. We draft Symptom / Finding / Fix / Result. You approve the name, or we keep it anonymous.",
          },
        ],
      },
      {
        type: "tiles",
        items: [
          t("→", "See the offer", "Five surfaces under A³.", "services →", "/services"),
          t("→", "Start a build", "The next file starts as a brief.", "contact →", "/contact"),
        ],
      },
    ],
  },

  pricing: {
    kicker: "PRICING",
    title: "A number after a written scope.",
    subhead:
      "Every build is quoted. You get a plan, a first date, and a cost before a line ships. We reply within one business day.",
    blocks: [
      {
        type: "quote",
        text: "If a studio can put four SaaS tiers on this page, they are selling seats. We sell a handover.",
      },
      { type: "label", label: "HOW A QUOTE IS MADE" },
      {
        type: "bullets",
        items: [
          "You send the brief — what must exist at handover, on which surface.",
          "We answer within one business day with questions, a first date, and a path to a number.",
          "Scope, timeline, and cost are written down before work starts.",
          "Fixed-bid when the edge is clear. Time-and-materials when it isn’t. You pick after you see both.",
        ],
      },
      { type: "label", label: "WHAT MOVES THE NUMBER" },
      {
        type: "table",
        head: ["LEVER", "LOWER", "HIGHER"],
        rows: [
          ["Surfaces", "One surface, one handover", "Several surfaces that must stay one product"],
          ["Constraint", "Green field, your stack", "Live systems, hard silicon dates"],
          ["Ownership", "We hand over and step off", "Training, a second environment, a longer stay"],
        ],
      },
      {
        type: "note",
        text: "Starting prices stay off this page until we publish numbers we will stand behind. Hosting, if you want it set up, is part of the build and still runs in your account.",
      },
      { type: "label", label: "FAQ" },
      {
        type: "faq",
        items: [
          {
            q: "Why isn’t there a price?",
            a: "Because a VLSI sign-off and a single API are not the same job. A public grid would be a guess. We won’t publish one.",
          },
          {
            q: "How fast do I get a number?",
            a: "A first reply within one business day. A written cost after we have enough of the brief to stand behind it.",
          },
          {
            q: "Do you take a small first slice?",
            a: "Yes. A paid scope or a thin first surface is a normal start. We don’t need the whole A³ map on day one.",
          },
        ],
      },
      {
        type: "tiles",
        items: [
          t("→", "Start a build", "Brief in. Plan, date, and a path to a number.", "contact →", "/contact"),
          t("→", "See the offer", "Five surfaces. Three A’s.", "services →", "/services"),
        ],
      },
    ],
  },

  clients: {
    kicker: "CASE STUDIES",
    title: "Selected work is shared when a client agrees.",
    blocks: [
      { type: "prose", text: "We do not publish a logo wall or quotes we cannot source." },
    ],
  },

  partners: {
    kicker: "ABOUT",
    title: "No partner badges on this site.",
    blocks: [
      { type: "prose", text: "We do not list certifications or alliances we have not published with proof." },
    ],
  },

  resources: {
    kicker: "RESOURCES / FIELD NOTES",
    title: "Field notes when we have something real to publish.",
    subhead:
      "Technical writing from the engineers who do the work. This list is empty until a note is ready — no leftover marketing posts.",
    blocks: [
      {
        type: "quote",
        text: "A field note is a document you can check. It is not a content calendar.",
      },
      { type: "label", label: "RECENT" },
      {
        type: "note",
        text: "No posts yet. When we publish, entries appear here and in the RSS feed.",
      },
      {
        type: "code",
        label: "FEEDS",
        text: "RSS   https://www.zenxelligence.com/resources/feed.xml\nllms  https://www.zenxelligence.com/llms.txt",
      },
      {
        type: "tiles",
        items: [
          t("→", "FAQ", "Short answers before the first note.", "faq →", "/faq"),
          t("→", "Start a build", "A brief beats a blog post.", "contact →", "/contact"),
        ],
      },
    ],
  },

  faq: {
    kicker: "FAQ",
    title: "Questions before the first note.",
    subhead: "Two engineers. Five surfaces. You own what ships.",
    blocks: [
      { type: "label", label: "COMMON QUESTIONS" },
      {
        type: "faq",
        items: FAQ_ITEMS.map((item) => ({ q: item.q, a: item.a })),
      },
    ],
  },

  legal: {
    kicker: "LEGAL",
    title: "Short, and only what we actually do.",
    subhead: "Two-engineer studio. No invented certifications. Ask if a clause needs to be tighter before a contract.",
    blocks: [
      { type: "label", label: "PRIVACY", id: "privacy" },
      {
        type: "prose",
        text: "If you write to us or use the contact form, we read the name, email, company, services, budget, timeline, and brief you send so we can reply. We do not sell that information. We do not run an ad network, and we do not operate a hosted product that stores your users’ data as a service.",
      },
      {
        type: "note",
        text: "Mail: hello@zenxelligence.com. Ask us to delete a thread and we will, unless a live contract says we must keep it.",
      },
      { type: "label", label: "TERMS", id: "terms" },
      {
        type: "prose",
        text: "This site describes the studio. A build starts only after a written scope you accept. What we make for you is yours at handover, except tools we did not write. We do not grant a seat in a hosted SaaS. If work is outside what two people should carry, we say so before we take the brief.",
      },
      { type: "label", label: "COOKIES", id: "cookies" },
      {
        type: "prose",
        text: "We do not set marketing cookies. The site may use what the host needs to stay up. There is no cookie wall because we are not tracking you across the web.",
      },
      { type: "label", label: "ACCESSIBILITY", id: "accessibility" },
      {
        type: "prose",
        text: "We aim for a readable dark layout, keyboard focus, and a skip link to main content. If something blocks you, write hello@zenxelligence.com and we will fix what we can.",
      },
      { type: "label", label: "SECURITY", id: "security" },
      {
        type: "prose",
        text: "We do not claim SOC 2 or ISO on this page. Client work lives in environments you control unless a contract says otherwise. If you find a hole on zenxelligence.com, mail us before you publish it.",
      },
      { type: "label", label: "EDITORIAL", id: "editorial" },
      {
        type: "prose",
        text: "Case studies use Symptom / Finding / Fix / Result, and only with permission. We do not invent clients, counts, or vendor partnerships. ZX A³ Innovation™ is our frame, not a list of verticals we made up.",
      },
    ],
  },

  "machine-lens": {
    kicker: "ABOUT",
    title: "This page has moved.",
    blocks: [
      { type: "prose", text: "Facts for people and for answer engines live on the public pages and in llms.txt." },
    ],
  },

  contact: {
    kicker: "CONTACT",
    title: "One form. One inbox. A real person replies.",
    blocks: [
      { type: "form" },
      {
        type: "prose",
        text: "Prefer email? hello@zenxelligence.com. We reply within 1 business day.",
      },
      { type: "note", text: "No phone tree, no calendar-link-only flow — a human reads every submission before routing it." },
    ],
  },

  careers: {
    kicker: "CAREERS",
    title: "No open role until we can name the work.",
    subhead:
      "This studio is two engineers. A third seat is not a poster. When we need someone, the role, the surface, and the seat will be on this page.",
    blocks: [
      {
        type: "quote",
        text: "We will not list a job we do not have.",
      },
      { type: "label", label: "OPEN ROLES" },
      {
        type: "note",
        text: "No open roles. Send work you have already built to hello@zenxelligence.com if you want to be considered when a seat exists.",
      },
      { type: "label", label: "IF WE HIRE" },
      {
        type: "prose",
        text: "The person sits with us. Same standing. On the brief, the build, and the handover. There is no senior on the call and junior on the repo. There is no bench waiting for a sale.",
      },
      {
        type: "bullets",
        items: [
          "The work is one or more of the five surfaces: web apps & APIs, Android/iOS, AI agent automation, IoT, VLSI.",
          "You use the stack that fits the build. You do not sell a platform we don’t ship.",
          "If the load is more than two people should carry, we say so before we take the brief — a hire is that same honesty, not a hidden subcontract.",
        ],
      },
      { type: "label", label: "WRITE IN" },
      {
        type: "prose",
        text: "If the surfaces are yours and you want to be in the room when a seat opens: hello@zenxelligence.com. Send what you build, which surface, and a link to work. We reply within 1 business day.",
      },
      {
        type: "note",
        text: "A note in the inbox is not an opening. We will not invent one to keep the thread warm.",
      },
      { type: "label", label: "FAQ" },
      {
        type: "faq",
        items: [
          {
            q: "Are you hiring?",
            a: "Not unless a role is named on this page.",
          },
          {
            q: "Do you run internships or a graduate scheme?",
            a: "No. We do not run a programme we cannot staff as peers.",
          },
          {
            q: "Can I send a CV anyway?",
            a: "Yes — hello@zenxelligence.com. Say the surface. Link the work. Skip the cover-letter theatre.",
          },
          {
            q: "Is this remote?",
            a: "When a role is listed, the seat will be on the row. We will not guess a city for an opening that isn’t there.",
          },
        ],
      },
      {
        type: "tiles",
        items: [
          t("→", "About the studio", "Two engineers. Same standing.", "about →", "/about"),
          t("→", "Start a build", "A brief, not an application.", "contact →", "/contact"),
        ],
      },
    ],
  },
};
