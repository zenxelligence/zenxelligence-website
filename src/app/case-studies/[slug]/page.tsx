import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/case-study-card";
import { AccentText } from "@/components/accent-text";
import { CASE_FILES } from "@/lib/site-data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return CASE_FILES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseFile = CASE_FILES.find((c) => c.slug === slug);
  return { title: caseFile?.title ?? "Case Study" };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseFile = CASE_FILES.find((c) => c.slug === slug);
  if (!caseFile) notFound();

  return (
    <section className="page-inner">
      <p className="eyebrow page-kicker">CASE STUDIES</p>
      <h1 className="page-title">
        <AccentText text={caseFile.title} />
      </h1>
      <div className="mt-12">
        <CaseStudyCard caseFile={caseFile} />
      </div>
    </section>
  );
}
