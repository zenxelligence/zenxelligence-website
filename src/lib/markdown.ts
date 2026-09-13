import type { Block, CaseFile, BlogPost, PageContent } from "@/lib/site-data";
import {
  HOME_COPY,
  HOME_DOORWAYS,
  HOME_OFFERS,
  HOME_PLATES,
  HOME_SPECS,
  HOME_STACK,
  HOME_STATS,
  SITE,
  STUDIO_STACK,
} from "@/lib/site-data";

function blockToMarkdown(block: Block): string {
  switch (block.type) {
    case "label":
      return `## ${block.label}`;
    case "prose":
      return block.text;
    case "quote":
      return `> ${block.text}`;
    case "note":
      return `_${block.text}_`;
    case "stats":
      return block.items.map((s) => `- **${s.value}** — ${s.label}`).join("\n");
    case "tiles":
      return block.items
        .map((t) => `- **${t.title}** (${t.index}) — ${t.line} ${t.href ? `[${t.meta}](${t.href})` : t.meta}`)
        .join("\n");
    case "bullets":
      return block.items.map((b) => `- ${b}`).join("\n");
    case "pills":
      return block.items.map((p) => `\`${p}\``).join(" ");
    case "logos":
      return block.items.map((l) => `- ${l}`).join("\n");
    case "gallery":
      return block.items.map((g) => `- ${g}`).join("\n");
    case "table": {
      const head = `| ${block.head.join(" | ")} |`;
      const sep = `| ${block.head.map(() => "---").join(" | ")} |`;
      const rows = block.rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
      return [head, sep, rows].join("\n");
    }
    case "faq":
      return block.items.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n");
    case "quotes":
      return block.items.map((q) => `> ${q.text}\n> — ${q.who}`).join("\n\n");
    case "code":
      return `\`${block.label}\`\n\n\`\`\`\n${block.text}\n\`\`\``;
    case "status":
      return `**Status:** ${block.text} — live`;
    case "form":
      return `[Contact form — Name, Company, Email, Problem description] → ${SITE.email}`;
    case "cases":
      return "See individual case files linked from this page.";
    default:
      return "";
  }
}

export function pageToMarkdown(slug: string, page: PageContent): string {
  const lines = [`# ${page.title}`, "", `_${page.kicker}_`];
  if (page.subhead) lines.push("", page.subhead);
  for (const block of page.blocks) {
    lines.push("", blockToMarkdown(block));
  }
  lines.push("", `Source: ${SITE.url}/${slug}`);
  return lines.join("\n");
}

export function caseFileToMarkdown(c: CaseFile): string {
  return [
    `# ${c.title}`,
    "",
    `_${c.tag}_`,
    "",
    "## Symptom",
    c.blocks.SYMPTOM,
    "",
    "## Finding",
    c.blocks.FINDING,
    "",
    "## Fix",
    c.blocks.FIX,
    "",
    "## Result",
    c.blocks.RESULT,
    "",
    `Source: ${SITE.url}/case-studies/${c.slug}`,
  ].join("\n");
}

export function blogPostToMarkdown(post: BlogPost): string {
  return [
    `# ${post.title}`,
    "",
    `_${post.date}_`,
    "",
    post.description,
    "",
    ...post.body,
    "",
    `Source: ${SITE.url}/resources/${post.slug}`,
  ].join("\n");
}

export function homeToMarkdown(): string {
  const lines = [
    `# ${HOME_COPY.headline.join(" ")}`,
    "",
    HOME_COPY.lede,
    "",
    "## Plate index",
    ...HOME_PLATES.map((p) => `- ${p.no} ${p.role} — ${p.pose}`),
    "",
    "## Start here",
    ...HOME_OFFERS.map((o) => `- ${o.label}`),
    "",
    "## Surfaces",
    ...HOME_DOORWAYS.map((d) => `- **${d.title}** — ${d.body}`),
    "",
    "## Thesis",
    HOME_COPY.thesisTitle,
    "",
    HOME_COPY.thesisBody,
    "",
    "## Stack",
    ...HOME_STACK.map((s) => `- **${s.lane}** — ${s.tools}`),
    "",
    "## We work in",
    ...STUDIO_STACK.map((s) => `- **${s.lane}** — ${s.tools}`),
    "",
    "## Finish selection",
    ...HOME_STATS.map((s) => `- **${s.value}** — ${s.label}`),
    "",
    "## Specifications",
    ...HOME_SPECS.map(([surface, built, leaves]) => `- **${surface}** — ${built}. Leaves with: ${leaves}`),
    "",
    `Source: ${SITE.url}/`,
  ];
  return lines.join("\n");
}
