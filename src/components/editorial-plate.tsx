import type { ReactNode } from "react";
import { TwoTone } from "@/components/accent-text";
import { cn } from "@/lib/utils";

export function EditorialPlate({
  id,
  role,
  title,
  children,
  bare = false,
  screen = false,
  quiet = false,
}: {
  id: string;
  no?: string;
  role: string;
  pose?: string;
  plateIndex?: number;
  title?: string;
  children: ReactNode;
  bare?: boolean;
  screen?: boolean;
  quiet?: boolean;
}) {
  const chrome = !bare && !quiet;

  return (
    <section
      id={id}
      data-plate={id}
      className={cn("plate", screen && "plate-hero", bare && !screen && "plate-bare")}
    >
      {chrome && title ? (
        <div className="section-head">
          <div>
            <p className="eyebrow">{role}</p>
            <h2 className="section-title">
              <TwoTone text={title} />
            </h2>
          </div>
        </div>
      ) : null}
      {quiet && title ? (
        <div className="section-head">
          <div>
            <p className="eyebrow">What we ship</p>
            <h2 className="section-title">
              <TwoTone text={title} />
            </h2>
          </div>
        </div>
      ) : null}
      <div className={screen ? "hero-stack" : bare ? undefined : "mt-10"}>{children}</div>
    </section>
  );
}
