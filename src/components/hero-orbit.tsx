"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LogicCore = dynamic(() => import("@/components/logic-core").then((mod) => mod.LogicCore), {
  ssr: false,
});

const LEGEND = [
  { label: "Web apps", href: "#web" },
  { label: "Android/iOS", href: "#mobile" },
  { label: "AI agents", href: "#ai-agents" },
  { label: "IoT", href: "#iot" },
  { label: "VLSI", href: "#vlsi" },
];

function wantsPoster() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.matchMedia("(max-width: 640px)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return reduced || narrow || saveData === true;
}

export function HeroOrbit() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (wantsPoster()) return;
    const start = () => setLive(true);
    const idle = window.requestIdleCallback?.(start, { timeout: 1500 });
    const timer = idle === undefined ? window.setTimeout(start, 1500) : undefined;
    return () => {
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hero-stage">
      <div className="hero-orb" aria-hidden="true" />
      <img
        src="/hero-orbit.webp"
        alt=""
        className="hero-poster"
        width={1120}
        height={1120}
        hidden={live}
        onError={(event) => {
          event.currentTarget.hidden = true;
        }}
      />
      {live ? <LogicCore /> : null}
      <ul className="orbit-legend">
        {LEGEND.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
