import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AccentText } from "@/components/accent-text";
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
    <section className="page-inner">
      <p className="eyebrow page-kicker">RESOURCES / FIELD NOTES</p>
      <h1 className="page-title">
        <AccentText text={post.title} />
      </h1>
      <p className="note mt-5">{post.date}</p>
      <div className="mt-11 grid max-w-[70ch] gap-6">
        {post.body.map((para, i) => (
          <p key={i} className="page-body">
            {para}
          </p>
        ))}
      </div>
      <p className="mt-9">
        <Link href="/resources">← Back to Field Notes</Link>
      </p>
    </section>
  );
}
