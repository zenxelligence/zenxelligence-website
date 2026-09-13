import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/case-study-card";
import { BottomCta } from "@/components/page-blocks";
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
    <section className="pt-8 pb-6">
      <div className="font-mono text-[11px] tracking-[0.06em] text-fg-muted">CASE STUDIES</div>
      <h1 className="mt-5 max-w-[1000px] text-[clamp(32px,4.6vw,58px)] leading-[1.04] font-semibold tracking-[-0.034em]">
        {caseFile.title}
      </h1>
      <div className="mt-13">
        <CaseStudyCard caseFile={caseFile} />
      </div>
      <BottomCta />
    </section>
  );
}
