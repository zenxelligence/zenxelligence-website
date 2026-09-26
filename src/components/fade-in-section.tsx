import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FadeInSection({
  children,
  className,
  id,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  return (
    <div id={id} className={cn("reveal", className)} style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
      {children}
    </div>
  );
}
