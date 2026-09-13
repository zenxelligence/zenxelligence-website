import { BLOG_POSTS, SITE } from "@/lib/site-data";

export function GET() {
  const items = BLOG_POSTS.map(
    (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE.url}/resources/${post.slug}</link>
      <guid>${SITE.url}/resources/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE.name} — Field Notes</title>
    <link>${SITE.url}/resources</link>
    <description>Technical writing from the engineers who do the work.</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
