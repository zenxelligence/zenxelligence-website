"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LogicCore = dynamic(() => import("@/components/logic-core").then((mod) => mod.LogicCore), {
  ssr: false,
});

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
    let cancelled = false;
    const start = () => {
      if (!cancelled) setLive(true);
    };
    const idle = window.requestIdleCallback?.(start, { timeout: 1500 });
    const timer = window.setTimeout(start, 1600);
    return () => {
      cancelled = true;
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hero-stage">
      <div className="hero-orb" aria-hidden="true" />
      {/* Poster is a static SVG stand-in for the canvas, swapped out after idle. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-orbit.svg"
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
    </div>
  );
}
