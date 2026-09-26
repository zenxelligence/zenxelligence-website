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
        <div className="mock-nav" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-main">
          <div className="mock-bars" aria-hidden="true">
            <span style={{ height: "40%" }} />
            <span style={{ height: "66%" }} />
            <span style={{ height: "48%" }} />
            <span style={{ height: "82%" }} />
          </div>
          <div className="mock-list">
            <span>Routes</span>
            <span>API</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="mock mock-phone">
      <div className="mock-phone-shell">
        <div className="mock-notch" aria-hidden="true" />
        <div className="mock-top">
          <span>Home</span>
          <span className="mock-tag">Generic example</span>
        </div>
        <div className="mock-app-rows" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mock-tabs" aria-hidden="true">
          <i />
          <i />
          <i />
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
      <div className="mock-flow" aria-hidden="true">
        <span>Input</span>
        <i />
        <span className="is-hot">Agent</span>
        <i />
        <span>Tool</span>
      </div>
      <div className="mock-reply" aria-hidden="true">
        Reply
      </div>
    </div>
  );
}

function IotMock() {
  return (
    <div className="mock mock-iot">
      <div className="mock-top">
        <span>Telemetry</span>
        <span className="mock-tag">Generic example</span>
      </div>
      <svg viewBox="0 0 160 48" className="mock-wave" aria-hidden="true">
        <path d="M0 12 H160 M0 24 H160 M0 36 H160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <polyline
          fill="none"
          stroke="#ffb36b"
          strokeWidth="1.6"
          points="0,30 10,28 20,31 30,24 40,27 50,18 62,23 74,20 86,26 98,17 110,22 122,19 134,25 148,21 160,23"
        />
      </svg>
      <div className="mock-status">
        <span>
          <i className="mock-dot" /> Sensor
        </span>
        <span>
          <i className="mock-dot" /> Uplink
        </span>
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
      <svg viewBox="0 0 160 78" className="mock-die" aria-hidden="true">
        <rect x="10" y="4" width="140" height="46" fill="none" stroke="rgba(255,122,26,0.75)" strokeWidth="1" />
        <rect x="6" y="14" width="4" height="4" fill="#ffb36b" />
        <rect x="6" y="26" width="4" height="4" fill="#ffb36b" />
        <rect x="6" y="38" width="4" height="4" fill="#ffb36b" />
        <rect x="150" y="14" width="4" height="4" fill="#ffb36b" />
        <rect x="150" y="26" width="4" height="4" fill="#ffb36b" />
        <rect x="150" y="38" width="4" height="4" fill="#ffb36b" />
        <rect x="22" y="10" width="78" height="7" fill="rgba(255,179,107,0.22)" stroke="rgba(255,179,107,0.55)" />
        <rect x="22" y="20" width="78" height="7" fill="rgba(255,179,107,0.22)" stroke="rgba(255,179,107,0.55)" />
        <rect x="22" y="30" width="78" height="7" fill="rgba(255,179,107,0.22)" stroke="rgba(255,179,107,0.55)" />
        <rect x="108" y="10" width="32" height="27" fill="rgba(255,122,26,0.16)" stroke="#ff7a1a" />
        <polyline
          fill="none"
          stroke="#ffb36b"
          strokeWidth="1.4"
          points="8,60 22,60 22,54 38,54 38,60 54,60 54,54 70,54 70,60 86,60 86,54 102,54 102,60 118,60 118,54 134,54 134,60 152,60"
        />
        <polyline
          fill="none"
          stroke="#ff7a1a"
          strokeWidth="1.4"
          points="8,72 28,72 28,66 44,66 44,72 60,72 60,66 84,66 84,72 100,72 100,66 124,66 124,72 152,72"
        />
      </svg>
      <div className="mock-sigs">
        <span>clk</span>
        <span>q</span>
      </div>
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
  const [hovering, setHovering] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || hovering || held) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % FRAMES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [reduced, hovering, held]);

  const frame = FRAMES[index];

  return (
    <figure
      className="hero-showcase"
      aria-label="Generic examples of web apps, Android and iOS, AI agents, IoT, and VLSI"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-sphere" aria-hidden="true" />
      <div className="hero-ring" aria-hidden="true" />
      <Spark className="hero-spark hero-spark-a" />
      <Spark className="hero-spark hero-spark-b" />
      <div className="hero-stage">
        <div className="hero-window" aria-hidden="true">
          {MOCKS.map((Mock, i) => (
            <div key={FRAMES[i].kicker} className={i === index ? "hero-frame is-on" : "hero-frame"}>
              <Mock />
            </div>
          ))}
        </div>
        <figcaption className="hero-figcap">
          <span>{frame.kicker}</span>
          <span className="hero-figrule" aria-hidden="true" />
          {reduced ? (
            <span className="hero-pause">Still</span>
          ) : (
            <button
              type="button"
              className="hero-pause"
              aria-pressed={held}
              onClick={() => setHeld((value) => !value)}
            >
              {held ? "Play" : "Pause"}
            </button>
          )}
        </figcaption>
        <p className="hero-side" aria-hidden="true">
          Brief · Build · Handover
        </p>
      </div>
    </figure>
  );
}
