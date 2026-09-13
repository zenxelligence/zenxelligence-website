import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BottomCta } from "@/components/page-blocks";
import { BLOG_POSTS } from "@/lib/site-data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Field Notes" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <section className="pt-18 pb-6">
      <div className="font-mono text-[11px] tracking-[0.06em] text-fg-muted">
        RESOURCES / FIELD NOTES
      </div>
      <h1 className="mt-5 max-w-[900px] text-[clamp(28px,3.8vw,46px)] leading-[1.08] font-semibold tracking-[-0.03em]">
        {post.title}
      </h1>
      <p className="mt-5 font-mono text-[11.5px] text-fg-muted">{post.date}</p>
      <div className="mt-11 grid max-w-[720px] gap-6 border-t border-border pt-9">
        {post.body.map((para, i) => (
          <p key={i} className="m-0 text-[17px] leading-relaxed text-fg">
            {para}
          </p>
        ))}
      </div>
      <p className="mt-9 font-mono text-[11.5px]">
        <Link href="/resources">← Back to Field Notes</Link>
      </p>
      <BottomCta />
    </section>
  );
}
