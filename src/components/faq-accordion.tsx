"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="max-w-[880px] border-t border-border">
      {items.map((item, i) => (
        <Accordion.Item key={i} value={`item-${i}`} className="border-b border-border">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-6.5 text-left text-[17px] font-semibold tracking-[-0.015em]">
              {item.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-fg-muted transition-transform group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden pb-6.5 text-[15px] leading-relaxed text-fg-muted data-[state=open]:animate-[fadeIn_0.2s_ease-out]">
            {item.a}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
