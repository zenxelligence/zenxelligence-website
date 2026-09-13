import { ImageResponse } from "next/og";
import { BLOG_POSTS, CASE_FILES, PAGES, ROUTE_PAGE_MAP, SITE } from "@/lib/site-data";

function resolveTitle(segments: string[]): { title: string; subtitle: string } {
  const path = segments.join("/");

  if (path === "") return { title: SITE.name, subtitle: SITE.tagline };

  if (segments[0] === "case-studies" && segments[1]) {
    const c = CASE_FILES.find((c) => c.slug === segments[1]);
    if (c) return { title: c.title, subtitle: c.tag };
  }

  if (segments[0] === "resources" && segments[1]) {
    const p = BLOG_POSTS.find((p) => p.slug === segments[1]);
    if (p) return { title: p.title, subtitle: p.description };
  }

  const key = ROUTE_PAGE_MAP[path];
  if (key && PAGES[key]) {
    const page = PAGES[key];
    return { title: page.title, subtitle: page.subhead ?? page.kicker };
  }

  return { title: SITE.name, subtitle: SITE.tagline };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { title, subtitle } = resolveTitle((await params).slug ?? []);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0e",
          color: "#f2f2ef",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#3ddc84", fontSize: 32 }}>Zx</span>
          <span style={{ fontSize: 20, letterSpacing: 4, fontWeight: 600 }}>ZEN xELLIGENCE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ fontSize: 26, color: "#8a8d91", lineHeight: 1.4 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 18, color: "#8a8d91" }}>
          zenxelligence.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
