import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";

const TINT: Record<string, string> = {
  "01": "tint-web",
  "02": "tint-ai",
  "03": "tint-mobile",
  "04": "tint-iot",
  "05": "tint-vlsi",
};

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
    <Link href={href} className={`card card-tint card-pad ${TINT[index] ?? "tint-web"}`}>
      <span className="card-label">{tag1}</span>
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{body}</p>
      <span className="chip" style={{ alignSelf: "flex-start" }}>
        {tag2}
      </span>
      <span className="card-link">
        {cta.replace(" →", "")}
        <ArrowIcon />
      </span>
    </Link>
  );
}
