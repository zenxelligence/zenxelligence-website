import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getService } from "@/content/services";
import { BLOG_POSTS, CASE_FILES, PAGES, ROUTE_PAGE_MAP, SITE } from "@/lib/site-data";

function resolveTitle(segments: string[]): { title: string; subtitle: string } {
  const path = segments.join("/");

  if (path === "") return { title: `${SITE.tagline}.`, subtitle: "Web, mobile, AI agents, IoT, and VLSI." };

  if (segments[0] === "services" && segments[1]) {
    const service = getService(segments[1]);
    if (service) return { title: service.title, subtitle: service.lead };
  }

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
  const mark = await readFile(join(process.cwd(), "public/brand/zx-monogram.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0b",
          color: "#fafafa",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Satori renders this Open Graph image and only accepts img. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${mark.toString("base64")}`} width={70} height={56} alt="" />
          <span style={{ fontSize: 28, fontWeight: 600, display: "flex" }}>
            Zen <span style={{ color: "#ff7a1a" }}>x</span>Elligence
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, display: "flex" }}>
            {/[.!?]$/.test(title) ? title.slice(0, -1) : title}
            <span style={{ color: "#ff7a1a" }}>{/[.!?]$/.test(title) ? title.slice(-1) : "."}</span>
          </div>
          <div style={{ fontSize: 26, color: "#a8a8a8", lineHeight: 1.4 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 18, color: "#9c948a" }}>
          zenxelligence.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
