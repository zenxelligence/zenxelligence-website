import { AccentText } from "@/components/accent-text";

export type HeroLine = {
  text: string;
  opacity?: number;
  fontSize?: string;
  italic?: boolean;
};

export function HeroStack({
  lines,
  className,
}: {
  lines: HeroLine[];
  className?: string;
}) {
  const last = lines.length - 1;
  return (
    <h1 className={className ?? "hero-title"}>
      {lines.map((line, i) => (
        <span key={line.text} className="block">
          {i === last ? <AccentText text={line.text} /> : line.text}
        </span>
      ))}
    </h1>
  );
}
