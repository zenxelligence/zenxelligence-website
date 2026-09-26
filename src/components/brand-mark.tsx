import { useId } from "react";
import { HORIZONTAL_SVG, MONOGRAM_SVG } from "@/components/brand-svg";

type Tone = "dark" | "light";

function paint(svg: string, id: string, height: number, width: number, className: string | undefined, tone: Tone) {
  let next = svg.replace('id="a"', `id="${id}"`).replace("url(#a)", `url(#${id})`);
  if (tone === "light") {
    next = next.replace('fill="#FFF"', 'fill="#17120D"').replace('fill="#DDDFE2"', 'fill="#A3A9B2"');
  }
  const cls = className ? ` class="${className}"` : "";
  return next.replace("<svg ", `<svg${cls} height="${height}" width="${width}" aria-hidden="true" focusable="false" `);
}

export function BrandLockup({
  height = 28,
  className,
  tone = "dark",
}: {
  height?: number;
  className?: string;
  tone?: Tone;
}) {
  const id = `zx${useId().replace(/:/g, "")}`;
  const width = Math.round((2058 / 401) * height);
  const html = paint(HORIZONTAL_SVG, id, height, width, className, tone);
  return <span className="brand-slot" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BrandMark({
  height = 32,
  className,
  tone = "dark",
}: {
  height?: number;
  className?: string;
  tone?: Tone;
}) {
  const id = `zx${useId().replace(/:/g, "")}`;
  const width = Math.round((499 / 400) * height);
  const html = paint(MONOGRAM_SVG, id, height, width, className, tone);
  return <span className="brand-slot" dangerouslySetInnerHTML={{ __html: html }} />;
}
