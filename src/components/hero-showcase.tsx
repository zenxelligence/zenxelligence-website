"use client";

import { useEffect, useState } from "react";

const FRAMES = [
  { kicker: "01 / WEB APPS", label: "Web apps" },
  { kicker: "02 / ANDROID & iOS", label: "Android and iOS" },
  { kicker: "03 / AI AGENTS", label: "AI agents" },
  { kicker: "04 / IOT", label: "IoT" },
  { kicker: "05 / VLSI", label: "VLSI" },
] as const;

function WebMock() {
  return (
    <div className="mock mock-web">
      <div className="mock-top">
        <span>Dashboard</span>
        <span className="mock-tag">Generic example</span>
      </div>
      <div className="mock-web-body">
        <div className="mock-side" />
        <div className="mock-bars" aria-hidden="true">
          <span style={{ height: "46%" }} />
          <span style={{ height: "72%" }} />
          <span style={{ height: "58%" }} />
          <span style={{ height: "84%" }} />
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="mock mock-phone">
      <div className="mock-phone-shell">
        <div className="mock-top">
          <span>App</span>
          <span className="mock-tag">Generic example</span>
        </div>
        <div className="mock-rows">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function AgentMock() {
  return (
    <div className="mock mock-agent">
      <div className="mock-top">
        <span>Workflow</span>
        <span className="mock-tag">Generic example</span>
      </div>
      <div className="mock-nodes">
        <span>Brief</span>
        <i />
        <span>Agent</span>
        <i />
        <span>Tool</span>
      </div>
    </div>
  );
}

function IotMock() {
  return (
    <div className="mock mock-iot">
      <div className="mock-top">
        <span>Device</span>
        <span className="mock-tag">Generic example</span>
      </div>
      <svg viewBox="0 0 160 48" className="mock-wave" aria-hidden="true">
        <polyline
          fill="none"
          stroke="#ffb36b"
          strokeWidth="2"
          points="0,32 16,30 28,18 40,26 54,12 70,22 86,16 102,28 118,10 134,20 160,14"
        />
      </svg>
      <div className="mock-rows mock-rows-short">
        <span>Signal</span>
        <span>Link</span>
      </div>
    </div>
  );
}

function VlsiMock() {
  return (
    <div className="mock mock-vlsi">
      <div className="mock-top">
        <span>Layout</span>
        <span className="mock-tag">Generic example</span>
      </div>
      <div className="mock-chip" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <svg viewBox="0 0 160 28" className="mock-wave" aria-hidden="true">
        <polyline
          fill="none"
          stroke="#ff7a1a"
          strokeWidth="1.6"
          points="0,20 20,20 20,6 48,6 48,20 72,20 72,6 110,6 110,20 160,20"
        />
      </svg>
    </div>
  );
}

const MOCKS = [WebMock, PhoneMock, AgentMock, IotMock, VlsiMock];

function Spark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill="#ffb36b" />
    </svg>
  );
}

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % FRAMES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [reduced, paused]);

  const frame = FRAMES[index];

  return (
    <div
      className="hero-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-sphere" aria-hidden="true" />
      <div className="hero-ring" aria-hidden="true" />
      <Spark className="hero-spark hero-spark-a" />
      <Spark className="hero-spark hero-spark-b" />
      <div className="hero-window" aria-hidden="true">
        {MOCKS.map((Mock, i) => (
          <div key={FRAMES[i].kicker} className={i === index ? "hero-frame is-on" : "hero-frame"}>
            <Mock />
          </div>
        ))}
      </div>
      <p className="hero-side">Brief · Build · Handover</p>
      <p className="hero-figcap">
        <span>{frame.kicker}</span>
        <span className="hero-figrule" aria-hidden="true" />
      </p>
    </div>
  );
}
