import { NextResponse } from "next/server";
import { BLOG_POSTS, CASE_FILES, PAGES, ROUTE_PAGE_MAP } from "@/lib/site-data";
import { blogPostToMarkdown, caseFileToMarkdown, homeToMarkdown, pageToMarkdown } from "@/lib/markdown";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const segments = (await params).slug ?? [];
  const path = segments.join("/");

  if (path === "") {
    return markdownResponse(homeToMarkdown());
  }

  if (segments[0] === "case-studies" && segments[1]) {
    const caseFile = CASE_FILES.find((c) => c.slug === segments[1]);
    if (caseFile) return markdownResponse(caseFileToMarkdown(caseFile));
  }

  if (segments[0] === "resources" && segments[1]) {
    const post = BLOG_POSTS.find((p) => p.slug === segments[1]);
    if (post) return markdownResponse(blogPostToMarkdown(post));
  }

  const pageKey = ROUTE_PAGE_MAP[path];
  if (pageKey && PAGES[pageKey]) {
    return markdownResponse(pageToMarkdown(path, PAGES[pageKey]));
  }

  return NextResponse.json({ error: "No markdown mirror for this path" }, { status: 404 });
}

function markdownResponse(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
