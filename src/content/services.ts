export type ServiceSlug = "web-apps" | "mobile-apps" | "ai-agents" | "iot" | "vlsi";

export type ServicePage = {
  slug: ServiceSlug;
  nav: string;
  title: string;
  lead: string;
  tint: string;
  tools: string[];
  deliverables: string[];
  goodFit: string[];
  hosting: string[];
  auth: string[];
  testing: string[];
  security: string[];
  handover: string[];
  store: string[];
  osSupport: string[];
  crashReporting: string[];
  ota: string[];
  evals: string[];
  guardrails: string[];
  observability: string[];
  models: string[];
  privacy: string[];
  mcus: string[];
  rtos: string[];
  connectivity: string[];
  cloud: string[];
  pcb: string[];
  certifications: string[];
  hdl: string[];
  verification: string[];
  eda: string[];
  fpga: string[];
  pdk: string[];
  scope: string;
};

const empty = {
  hosting: [] as string[],
  auth: [] as string[],
  testing: [] as string[],
  security: [] as string[],
  handover: [] as string[],
  store: [] as string[],
  osSupport: [] as string[],
  crashReporting: [] as string[],
  ota: [] as string[],
  evals: [] as string[],
  guardrails: [] as string[],
  observability: [] as string[],
  models: [] as string[],
  privacy: [] as string[],
  mcus: [] as string[],
  rtos: [] as string[],
  connectivity: [] as string[],
  cloud: [] as string[],
  pcb: [] as string[],
  certifications: [] as string[],
  hdl: [] as string[],
  verification: [] as string[],
  eda: [] as string[],
  fpga: [] as string[],
  pdk: [] as string[],
  scope: "",
};

export const SERVICES: ServicePage[] = [
  {
    ...empty,
    slug: "web-apps",
    nav: "Web apps & APIs",
    title: "Web applications & APIs",
    lead: "End-to-end web products: design, build, auth, data, and a live API — not a brochure site.",
    tint: "tint-web",
    tools: ["Next.js", "React", "Node", "FastAPI", "Django"],
    deliverables: ["Live application", "Auth", "API docs"],
    goodFit: ["You need a product and an API, not a brochure site."],
  },
  {
    ...empty,
    slug: "mobile-apps",
    nav: "Android/iOS Apps",
    title: "Android/iOS Apps",
    lead: "End-to-end Android and iOS: Flutter, React Native, or native — same product backend as the web app.",
    tint: "tint-mobile",
    tools: ["Flutter", "React Native", "native"],
    deliverables: ["App on the same backend as the web product"],
    goodFit: ["The mobile app should be the same product as the web app."],
  },
  {
    ...empty,
    slug: "ai-agents",
    nav: "AI Agent Automation",
    title: "AI Agent Automation",
    lead: "End-to-end agent systems: we design the workflow, wire the tools, and leave you automation that runs.",
    tint: "tint-ai",
    tools: ["LangChain", "LangGraph", "CrewAI", "AutoGen"],
    deliverables: ["Working workflows with run traces"],
    goodFit: ["You need automation that runs, not a chatbot demo."],
  },
  {
    ...empty,
    slug: "iot",
    nav: "IoT & electronics",
    title: "IoT & electronics",
    lead: "End-to-end connected hardware: sensors, firmware, and electronics wired into the product.",
    tint: "tint-iot",
    tools: ["Sensors", "firmware", "electronics"],
    deliverables: ["Hardware talking to the product"],
    goodFit: ["The device has to ship with the software, not as a kit."],
  },
  {
    ...empty,
    slug: "vlsi",
    nav: "VLSI",
    title: "End-to-end VLSI",
    lead: "Full-chip flow: specification and RTL through verification, implementation, and sign-off.",
    tint: "tint-vlsi",
    tools: ["Spec", "RTL", "verification", "sign-off"],
    deliverables: ["Signed-off design, ready to hand over"],
    goodFit: ["You want one team from specification through sign-off."],
    scope: "",
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
