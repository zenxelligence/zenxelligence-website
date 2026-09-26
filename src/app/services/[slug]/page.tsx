import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/arrow-icon";
import { CASE_STUDIES } from "@/content/case-studies";
import { getService, SERVICES } from "@/content/services";
import { SITE } from "@/lib/site-data";

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
  return {
    title: service.title,
    description: service.lead,
    alternates: { canonical },
    openGraph: { title: service.title, description: service.lead, url: canonical },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const examples = CASE_STUDIES.filter((study) => study.services.includes(service.slug));
  const groups: { label: string; items: string[] }[] = [
    { label: "What you get", items: service.deliverables },
    { label: "Tools we use", items: service.tools },
    { label: "Good fit if…", items: service.goodFit },
    { label: "Hosting", items: service.hosting },
    { label: "Auth", items: service.auth },
    { label: "Testing", items: service.testing },
    { label: "Security", items: service.security },
    { label: "Handover", items: service.handover },
    { label: "Store submission", items: service.store },
    { label: "OS support", items: service.osSupport },
    { label: "Crash reporting", items: service.crashReporting },
    { label: "OTA", items: service.ota },
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
    { label: "EDA", items: service.eda },
    { label: "FPGA", items: service.fpga },
    { label: "PDK", items: service.pdk },
  ].filter((group) => group.items.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.lead,
    serviceType: service.title,
    provider: { "@id": `${SITE.url}/#organization` },
    url: `${SITE.url}/services/${service.slug}`,
  };

  return (
    <section className="page-inner">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow">{service.nav}</p>
      <h1 className="page-title">{service.title}</h1>
      <p className="page-lead">{service.lead}</p>
      <div className={`card card-tint card-pad mt-10 ${service.tint}`}>
        <p className="card-label">{service.nav}</p>
        <p className="card-body">{service.lead}</p>
      </div>
      {groups.map((group) => (
        <div key={group.label} className="mt-12">
          <p className="block-label">{group.label}</p>
          <h2 className="inner-h2">{group.label}</h2>
          <ul className="bullet-list mt-4">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      {service.scope ? (
        <p className="prose mt-8">{service.scope}</p>
      ) : null}
      {examples.length > 0 ? (
        <div className="mt-12">
          <h2 className="inner-h2">Example project</h2>
          {examples.map((study) => (
            <p key={study.slug} className="prose mt-4">
              {study.title}. {study.outcome}
            </p>
          ))}
        </div>
      ) : null}
      <div className="mt-10">
        <Link href="/contact" className="button button-primary">
          Start this build
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
