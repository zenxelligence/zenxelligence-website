import type { Block } from "@/lib/site-data";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/schema";

export function PageFaqSchema({ blocks }: { blocks: Block[] }) {
  const faq = blocks.find((block) => block.type === "faq");
  if (!faq || faq.type !== "faq" || faq.items.length === 0) return null;
  return <JsonLd data={faqJsonLd(faq.items)} />;
}
