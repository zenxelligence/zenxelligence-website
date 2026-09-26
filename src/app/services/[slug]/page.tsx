import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/arrow-icon";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { LiveMetricsWidget } from "@/components/live-metrics-widget";
import { ProcessSteps } from "@/components/process-steps";
import { CASE_STUDIES } from "@/content/case-studies";
import { getService, SERVICES, type ServicePage } from "@/content/services";
import { SITE } from "@/content/site";
import { faqJsonLd } from "@/lib/schema";

const FAQ: Record<string, { q: string; a: string }[]> = {
  "web-apps": [
    {
      q: "Do I need to choose the framework?",
      a: "No. Tell us what has to exist at handover. We pick tools that fit the product.",
    },
    {
      q: "Who hosts it?",
      a: "You do. We can stand up the first environment. Credentials stay in your name.",
    },
  ],
  "mobile-apps": [
    {
      q: "Flutter, React Native, or native?",
      a: "Whichever fits the product. The mobile app uses the same backend as the web app when both exist.",
    },
    {
      q: "Who owns the store listing?",
      a: "Say in the brief if the listing has to sit in your developer account. That goes in the written scope.",
    },
  ],
  "ai-agents": [
    {
      q: "Is this a chatbot demo?",
      a: "No. The handover is a workflow that runs, with the tool wiring and traces you can replay.",
    },
    {
      q: "Do you pick the model?",
      a: "The model is named in the written scope, not introduced as a surprise at handover.",
    },
  ],
  iot: [
    {
      q: "Is this a development kit?",
      a: "No. The point is hardware that talks to the product, not a board that stops at the bench.",
    },
    {
      q: "Do you certify the device?",
      a: "Only if that work is in the written scope. We do not imply a certification we have not done.",
    },
  ],
  vlsi: [
    {
      q: "Where does the work stop?",
      a: "Where the scope says it stops: specification and RTL through verification, implementation, and sign-off are the full flow. A smaller slice is a complete engagement if that is what you need.",
    },
    {
      q: "Do you hand the design to another house?",
      a: "No. The team that scopes it stays through handover.",
    },
  ],
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const canonical = `${SITE.url}/services/${service.slug}`;
  const title = service.nav;
  const description = service.lead;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: `/og/services/${service.slug}`, width: 1200, height: 630, alt: title }],
    },
  };
}

function groupsFor(service: ServicePage) {
  return [
    { label: "What you get", items: service.deliverables },
    { label: "Tools we use", items: service.tools },
    { label: "Good fit if", items: service.goodFit },
    { label: "Hosting", items: service.hosting },
    { label: "Auth", items: service.auth },
    { label: "Testing", items: service.testing },
    { label: "Security practice", items: service.security },
    { label: "Handover", items: service.handover },
    { label: "Store submission", items: service.store },
    { label: "OS support", items: service.osSupport },
    { label: "Crash reporting", items: service.crashReporting },
    { label: "OTA updates", items: service.ota },
    { label: "Evals", items: service.evals },
    { label: "Guardrails", items: service.guardrails },
    { label: "Observability", items: service.observability },
    { label: "Models", items: service.models },
    { label: "Data privacy", items: service.privacy },
    { label: "MCUs", items: service.mcus },
    { label: "RTOS", items: service.rtos },
    { label: "Connectivity", items: service.connectivity },
    { label: "Cloud", items: service.cloud },
    { label: "PCB tools", items: service.pcb },
    { label: "Certifications", items: service.certifications },
    { label: "HDL", items: service.hdl },
    { label: "Verification", items: service.verification },
    { label: "EDA tools", items: service.eda },
    { label: "FPGA families", items: service.fpga },
    { label: "PDK and nodes", items: service.pdk },
  ].filter((group) => group.items.length > 0);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const examples = CASE_STUDIES.filter((study) => study.services.includes(service.slug));
  const groups = groupsFor(service);
  const faq = FAQ[service.slug] ?? [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.lead,
    serviceType: service.nav,
    provider: { "@id": `${SITE.url}/#organization` },
    url: `${SITE.url}/services/${service.slug}`,
  };

  return (
    <article className="page-inner">
      <JsonLd data={jsonLd} />
      {faq.length ? <JsonLd data={faqJsonLd(faq)} /> : null}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.nav, path: `/services/${service.slug}` },
        ]}
      />
      <p className="eyebrow page-kicker">{service.nav}</p>
      <h1 className="page-title">{service.title}</h1>
      <p className="page-lead">{service.lead}</p>
      <div className={`card card-tint card-pad mt-10 ${service.tint}`}>
        <p className="card-label">{service.nav}</p>
        <p className="card-body">{service.lead}</p>
      </div>
      {groups.map((group) => (
        <section key={group.label} className="mt-12">
          <h2 className="inner-h2">{group.label}</h2>
          <ul className="bullet-list mt-4">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      {service.scope ? <p className="page-body mt-8">{service.scope}</p> : null}
      <section className="mt-16">
        <h2 className="inner-h2">How we build it</h2>
        <div className="mt-8">
          <ProcessSteps />
        </div>
      </section>
      {examples.length > 0 ? (
        <section className="mt-16">
          <h2 className="inner-h2">Example project</h2>
          {examples.map((study) => (
            <p key={study.slug} className="page-body mt-4">
              <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
              {study.outcome ? ` — ${study.outcome}` : null}
            </p>
          ))}
        </section>
      ) : null}
      {faq.length ? (
        <section className="mt-16">
          <h2 className="inner-h2">Questions</h2>
          <dl className="faq-plain mt-6">
            {faq.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
      {service.slug === "web-apps" ? (
        <div className="mt-12 max-w-[420px]">
          <LiveMetricsWidget showRawLink={false} />
        </div>
      ) : null}
      <div className="mt-10">
        <Link href="/contact" className="button button-primary">
          Start this build
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
