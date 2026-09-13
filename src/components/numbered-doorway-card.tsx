import Link from "next/link";

export function NumberedDoorwayCard({
  index,
  title,
  body,
  tag1,
  tag2,
  cta,
  href,
}: {
  index: string;
  title: string;
  body: string;
  tag1: string;
  tag2: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[268px] flex-col gap-3.5 border-r border-b border-border px-7 pt-7.5 pb-6.5 text-fg hover:bg-bg-raised"
    >
      <span className="font-mono text-[11px] text-accent">{index}</span>
      <span className="text-[25px] font-semibold tracking-[-0.02em]">{title}</span>
      <span className="text-[15px] leading-relaxed text-fg-muted">{body}</span>
      <span className="mt-auto flex flex-wrap gap-2 font-mono text-[10.5px] text-fg-muted">
        <span className="border border-border px-1.5 py-0.5">{tag1}</span>
        <span className="border border-border px-1.5 py-0.5">{tag2}</span>
      </span>
      <span className="font-mono text-[11.5px] text-accent group-hover:text-fg">{cta}</span>
    </Link>
  );
}
