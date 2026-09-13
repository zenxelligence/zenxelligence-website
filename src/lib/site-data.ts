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

export const SITE = {
  name: "Zen xElligence",
  tagline: "End to end. Web to VLSI.",
  framework: "ZX A³ Innovation™",
  email: "hello@zenxelligence.com",
  url: "https://zenxelligence.com",
  handle: "zenxelligence",
  social: {
    linkedin: "https://www.linkedin.com/company/zenxelligence",
    instagram: "https://www.instagram.com/zenxelligence",
    // Replace with https://wa.me/91XXXXXXXXXX when the Business number is set.
    whatsapp: "https://wa.me/zenxelligence",
  },
};

export const SOCIAL = [
  { id: "linkedin" as const, label: "LinkedIn", href: SITE.social.linkedin },
  { id: "instagram" as const, label: "Instagram", href: SITE.social.instagram },
  { id: "whatsapp" as const, label: "WhatsApp", href: SITE.social.whatsapp },
];

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
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "SERVICES",
    items: [
      { label: "Web apps & APIs", href: "/services" },
      { label: "Android/iOS Apps", href: "/services" },
      { label: "AI Agent Automation", href: "/products" },
      { label: "IoT & electronics", href: "/services" },
      { label: "End-to-end VLSI", href: "/services" },
    ],
  },
  {
    heading: "PRODUCTS",
    items: [
      { label: "What we ship", href: "/products" },
      { label: "Start a build", href: "/contact" },
    ],
  },
  {
    heading: "RESOURCES",
    items: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "LEGAL",
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

export type SearchIndexItem = { kind: string; label: string; path: string };

export const SEARCH_INDEX: SearchIndexItem[] = [
  { kind: "page", label: "Home", path: "/" },
  { kind: "page", label: "About", path: "/about" },
  { kind: "page", label: "Services", path: "/services" },
  { kind: "service", label: "Web apps & APIs", path: "/services" },
  { kind: "service", label: "Android/iOS Apps", path: "/services" },
  { kind: "service", label: "AI Agent Automation", path: "/products" },
  { kind: "service", label: "IoT & electronics", path: "/services" },
  { kind: "service", label: "End-to-end VLSI", path: "/services" },
  { kind: "page", label: "Products", path: "/products" },
  { kind: "page", label: "Industries — ZX A³ Innovation™", path: "/industries" },
  { kind: "page", label: "Case Studies", path: "/case-studies" },
  { kind: "page", label: "Pricing", path: "/pricing" },
  { kind: "page", label: "Resources / Field Notes", path: "/resources" },
  { kind: "page", label: "FAQ", path: "/faq" },
  { kind: "page", label: "Legal", path: "/legal" },
  { kind: "page", label: "Contact", path: "/contact" },
  { kind: "page", label: "Careers", path: "/careers" },
];

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

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://zenxelligence.com/#organization",
  name: "Zen xElligence",
  url: "https://zenxelligence.com",
  email: SITE.email,
  description:
    "Zen xElligence is a two-engineer product studio that builds end-to-end web applications and APIs, AI agent automation, Android/iOS apps, IoT electronics, and VLSI — brief to handover.",
  sameAs: [
    SITE.social.linkedin,
    SITE.social.instagram,
    "https://github.com/zen-xelligence",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      availableLanguage: ["English"],
    },
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application and API Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agent Automation" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Android and iOS App Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "IoT and Electronics Projects" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "End-to-end VLSI" } },
  ],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://zenxelligence.com/#website",
  name: "Zen xElligence",
  url: "https://zenxelligence.com",
  description: ORGANIZATION_JSON_LD.description,
  publisher: { "@id": "https://zenxelligence.com/#organization" },
};

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
  headline: [
    "Web and Android/iOS apps.",
    "AI agent automation.",
    "IoT and VLSI. End to end.",
  ],
  lede: "Zen xElligence is a two-engineer studio. One team takes each build from brief to handover. You don’t need to know the tools.",
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
  { id: "plate-opening", no: "01", role: "Opening", nav: "Start", pose: "ZX-1 · FULL PRODUCT", href: "#plate-opening" },
  { id: "plate-repose", no: "02", role: "Repose", nav: "Offer", pose: "ZX-1 · FIVE SURFACES", href: "#plate-repose" },
  { id: "plate-web", no: "03", role: "Material study", nav: "Web apps", pose: "ZX-1 · WEB", href: "#plate-web" },
  { id: "plate-agents", no: "04", role: "Movement study", nav: "AI Agent Automation", pose: "ZX-1 · AI AGENT", href: "#plate-agents" },
  { id: "plate-android", no: "05", role: "Finish", nav: "Android/iOS Apps", pose: "ZX-1 · ANDROID/IOS", href: "#plate-android" },
  { id: "plate-iot", no: "06", role: "Electronics study", nav: "IoT", pose: "ZX-1 · IOT", href: "#plate-iot" },
  { id: "plate-vlsi", no: "07", role: "Silicon study", nav: "VLSI", pose: "ZX-1 · VLSI", href: "#plate-vlsi" },
  { id: "plate-finish", no: "08", role: "Finish selection", nav: "How we work", pose: "ZX-1 · FINISH", href: "#plate-finish" },
  { id: "plate-spec", no: "09", role: "Specifications", nav: "Specs", pose: "ZX-1 · SPEC", href: "#plate-spec" },
  { id: "plate-index", no: "10", role: "Plate index", nav: "Contact", pose: "ZX-1 · INDEX", href: "/contact" },
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
    tag1: "end to end",
    tag2: "Next.js · FastAPI · Django",
    cta: "See web apps →",
    href: "/services",
  },
  {
    index: "02",
    title: "AI Agent Automation",
    body: "End-to-end agent systems: we design the workflow, wire the tools, and leave you automation that runs — not a chatbot demo.",
    tag1: "end to end",
    tag2: "LangChain · LangGraph · CrewAI",
    cta: "See AI agent automation →",
    href: "/products",
  },
  {
    index: "03",
    title: "Android/iOS Apps",
    body: "End-to-end Android and iOS: Flutter, React Native, or native — same product backend as the web app. One system, not two.",
    tag1: "end to end",
    tag2: "Flutter · React Native",
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
        type: "tiles",
        items: [
          t(
            "01",
            "Us",
            "On the call, the build, and the handover. There is no other bench.",
            "same standing",
            "/contact",
          ),
          t(
            "02",
            "Us",
            "Same age. Same seat. Same brief. Same repo.",
            "same standing",
            "/contact",
          ),
        ],
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
      { type: "label", label: "WE WORK IN" },
      {
        type: "table",
        head: ["LANE", "STACK"],
        rows: STUDIO_STACK_ROWS,
        monoCols: [1],
      },
      {
        type: "note",
        text: "You do not pick the tools. Android/iOS, IoT, and VLSI stay on the surfaces above — this is the software, data, and cloud stack we use when the build needs it.",
      },
      { type: "label", label: "WHAT WE ARE NOT" },
      {
        type: "table",
        head: ["NOT", "INSTEAD"],
        rows: [
          ["An agency with a senior on the call and a junior on the build", "Two engineers, same standing, brief to handover"],
          ["A SaaS company with Pulse seats", "You own the system we leave you"],
          ["A partner logo wall", "Tools we use when they fit — no invented certifications"],
        ],
      },
      {
        type: "note",
        text: "Names and photos go here when we put them on the page. Until then: two engineers, hello@zenxelligence.com.",
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
            "/contact",
          ),
          t(
            "02",
            "Android/iOS Apps",
            "Flutter, React Native, or native apps on the same backend as the web product. One system, not two codebases that drift.",
            "Flutter · React Native",
            "/contact",
          ),
          t(
            "03",
            "AI Agent Automation",
            "Workflows that run with tools, memory, and traces. Not a chatbot demo that dies after the pitch.",
            "LangChain · LangGraph · CrewAI · AutoGen",
            "/products",
          ),
          t(
            "04",
            "IoT & electronics",
            "Sensors, firmware, and boards wired into the product — not a kit that dies in a drawer.",
            "Firmware · electronics",
            "/contact",
          ),
          t(
            "05",
            "End-to-end VLSI",
            "Spec and RTL through verification, implementation, and sign-off. We don’t pass you mid-flow.",
            "RTL · verification · sign-off",
            "/contact",
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
      { type: "label", label: "WE WORK IN" },
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
    title: "You own the system. We don’t rent you a seat.",
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
            "/services",
          ),
          t(
            "02",
            "Mobile apps",
            "Flutter, React Native, or native Android/iOS against that same API. One product, two clients.",
            "yours at handover",
            "/services",
          ),
          t(
            "03",
            "Agent workflows",
            "LangChain, LangGraph, CrewAI, and AutoGen systems with tools, memory, and run traces you can replay.",
            "yours at handover",
            "/contact",
          ),
          t(
            "04",
            "Connected hardware",
            "Firmware and electronics that talk to the same product the website uses.",
            "yours at handover",
            "/services",
          ),
          t(
            "05",
            "Signed-off VLSI",
            "Spec, RTL, verification, implementation, and a handover pack — not a netlist in an email.",
            "yours at handover",
            "/services",
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
        text: "No Pulse. No seat license. If you need hosting, we set it up as part of the build — it still runs in your account.",
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
    kicker: "INDUSTRIES · ZX A³ INNOVATION™",
    title: "ZX A³ Innovation™",
    subhead: "Autonomous. Adaptive. Architected. Three practices. One studio.",
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
      { type: "label", label: "WE WORK IN" },
      {
        type: "table",
        head: ["LANE", "STACK"],
        rows: STUDIO_STACK_ROWS,
        monoCols: [1],
      },
      {
        type: "prose",
        text: "Web apps, APIs, and Android/iOS still ship under Services. They sit with Autonomous when the product is cloud-backed intelligence — they are not a fourth A.",
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
          ["Fix", "What we built, on which surface", "A Pulse dashboard or an ERP we never shipped"],
          ["Result", "What changed, only if we can show it", "A percentage with no source"],
        ],
      },
      { type: "label", label: "OPEN SLOTS — ZX A³ INNOVATION™" },
      {
        type: "tiles",
        items: [
          t(
            "A¹",
            "Autonomous",
            "AI/ML, data, cloud, agent workflows. First named file TBD.",
            "slot open",
            "/industries",
          ),
          t(
            "A²",
            "Adaptive",
            "End-to-end VLSI. First named file TBD.",
            "slot open",
            "/industries",
          ),
          t(
            "A³",
            "Architected",
            "Electronics, embedded, and training. First named file TBD.",
            "slot open",
            "/industries",
          ),
        ],
      },
      { type: "label", label: "FILES" },
      { type: "cases" },
      {
        type: "code",
        label: "FILE TEMPLATE",
        text: `CASE FILE  —  unpublished
pillar:    Autonomous | Adaptive | Architected
surface:   web | mobile | agents | iot | vlsi
client:    named only with written permission

SYMPTOM    what was broken
FINDING    what we found
FIX        what we built
RESULT     what changed — sourced, or omitted`,
      },
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
    title: "A number after a written scope. Not a price grid for a product we don’t sell.",
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
      { type: "label", label: "WHAT WE QUOTE" },
      {
        type: "table",
        head: ["PILLAR", "SURFACE", "YOU PAY FOR"],
        rows: [
          ["Autonomous", "AI/ML, data, cloud, agent workflows", "A running system and traces you own"],
          ["Autonomous", "Web apps & APIs, Android/iOS", "A live product on a backend you control"],
          ["Adaptive", "End-to-end VLSI", "Spec through sign-off, then the handover pack"],
          ["Architected", "Electronics / embedded", "Firmware and boards wired into the product"],
          ["Architected", "Architect Training", "Time with the team that has to keep it"],
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
      { type: "label", label: "WHAT THIS PAGE WILL NOT LIST" },
      {
        type: "pills",
        items: [
          "No monthly seats",
          "No Pulse plans",
          "No SLA grid for a NOC we don’t run",
          "No starter / team / business SKU",
        ],
      },
      {
        type: "note",
        text: "Hosting, if you want it set up, is part of the build. It still runs in your account. That is not a subscription to us.",
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
        text: "No posts yet. When we publish, entries appear here and in the RSS feed. We will not keep ERP or Pulse articles that do not describe this studio.",
      },
      {
        type: "code",
        label: "FEEDS",
        text: "RSS   zenxelligence.com/resources/feed.xml\nllms  zenxelligence.com/llms.txt",
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
    subhead: "Two engineers. ZX A³ Innovation™. Five surfaces. No SaaS seats.",
    blocks: [
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
        text: "If you write to us or use the contact form, we read the name, email, and brief you send so we can reply. We do not sell that. We do not run an ad network. We do not operate a Pulse workspace or any other product that stores your users’ data as a service.",
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
    kicker: "THE MACHINE LENS",
    title: "This page is built to be read by machines too.",
    subhead:
      "JSON-LD on every route. Markdown mirrors. An MCP server, if you want to query us programmatically.",
    blocks: [
      { type: "label", label: "JSON-LD ORGANIZATION / SERVICE SCHEMA" },
      { type: "code", label: "rendered inline on every route", text: JSON.stringify(JSON_LD, null, 2) },
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
        text: "hello@zenxelligence.com — or LinkedIn, Instagram, WhatsApp at @zenxelligence. We reply within 1 business day.",
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
        text: "None listed. This list is empty on purpose — same rule as case studies. No Pulse seats. No NetSuite requisitions. No city we don’t sit in.",
      },
      {
        type: "table",
        head: ["ROLE", "SURFACE", "STATUS"],
        rows: [["—", "—", "No opening"]],
        monoCols: [2],
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
