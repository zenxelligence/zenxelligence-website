"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="faq-list">
      {items.map((item, i) => (
        <Accordion.Item key={item.q} value={`item-${i}`} className="faq-row">
          <Accordion.Header>
            <Accordion.Trigger className="faq-trigger">
              {item.q}
              <ChevronDown size={16} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content forceMount className="faq-answer">
            <p>{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
