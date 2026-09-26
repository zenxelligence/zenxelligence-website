import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { POSTS } from "@/content/posts";
import { PAGES } from "@/lib/site-data";
import { pageMetadata } from "@/lib/page-metadata";

const page = PAGES.resources;
const published = POSTS.length >= 2;

export const metadata: Metadata = {
  ...pageMetadata("resources", page),
  robots: published ? { index: true, follow: true } : { index: false, follow: false },
};

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Field notes", path: "/resources" }]} />
      <PageShell kicker={page.kicker} title={page.title} subhead={page.subhead} blocks={published ? [] : page.blocks}>
        {published ? (
          <ul className="bullet-list mt-10">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <Link href={`/resources/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </PageShell>
    </>
  );
}
