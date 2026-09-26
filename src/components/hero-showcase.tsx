"use client";

import { useEffect, useState } from "react";
import { ZxMark } from "@/components/zx-mark";

const FRAMES = [
  { kicker: "01 / WEB APPS", label: "Web apps" },
  { kicker: "02 / ANDROID & iOS", label: "Android and iOS" },
  { kicker: "03 / AI AGENTS", label: "AI agents" },
  { kicker: "04 / IOT", label: "IoT" },
  { kicker: "05 / VLSI", label: "VLSI" },
] as const;

function WebMock() {
  const rows = ["GET /health", "POST /agents", "GET /devices", "GET /layout"];
  return (
    <div className="mock mock-web">
      <div className="mock-top">
        <span>Dashboard</span>
        <span className="mock-tabs-inline" aria-hidden="true">
          <b>Overview</b>
          <span>Routes</span>
          <span>API</span>
        </span>
        <span className="mock-tag">Generic example</span>
      </div>
      <div className="mock-kpis" aria-hidden="true">
        <div>
          <em>Requests</em>
          <strong>—</strong>
        </div>
        <div>
          <em>Latency</em>
          <strong>—</strong>
        </div>
        <div>
          <em>Errors</em>
          <strong>—</strong>
        </div>
      </div>
      <svg className="mock-chart" viewBox="0 0 320 100" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
          <line x1="0" x2="320" y1="25" y2="25" />
          <line x1="0" x2="320" y1="50" y2="50" />
          <line x1="0" x2="320" y1="75" y2="75" />
        </g>
        <path
          d="M0 72 C28 68 40 48 62 52 C90 58 104 28 132 34 C160 40 176 58 204 50 C232 42 250 22 278 28 C298 32 308 40 320 36 V100 H0 Z"
          fill="rgba(255,122,26,0.16)"
        />
        <path
          d="M0 72 C28 68 40 48 62 52 C90 58 104 28 132 34 C160 40 176 58 204 50 C232 42 250 22 278 28 C298 32 308 40 320 36"
          fill="none"
          stroke="#ffb36b"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mock-table" aria-hidden="true">
        <div className="is-head">
          <span>Route</span>
          <span>Code</span>
          <span>Time</span>
        </div>
        {rows.map((row) => (
          <div key={row}>
            <span>{row}</span>
            <span>—</span>
            <span>—</span>
          </div>
        ))}
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
        <div className="mock-app-card" aria-hidden="true">
          <b>Today</b>
          <span />
          <span />
          <i />
        </div>
        <div className="mock-app-card" aria-hidden="true">
          <b>Inbox</b>
          <span />
          <i />
        </div>
        <div className="mock-app-card" aria-hidden="true">
          <b>Notes</b>
          <span />
        </div>
        <div className="mock-tabs" aria-hidden="true">
          <span>Home</span>
          <span>Search</span>
          <span>Alerts</span>
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
      <svg className="mock-graph-svg" viewBox="0 0 320 128" aria-hidden="true">
        <path d="M78 36 H118" fill="none" stroke="#ffb36b" strokeWidth="1.2" />
        <path d="M202 36 H242" fill="none" stroke="#ffb36b" strokeWidth="1.2" />
        <path d="M160 52 V78" fill="none" stroke="#ff7a1a" strokeWidth="1.2" />
        <rect x="16" y="20" width="62" height="32" rx="16" fill="#12100e" stroke="rgba(255,179,107,0.7)" />
        <text x="47" y="40" textAnchor="middle" fill="#ffd7b0" fontSize="11">
          Input
        </text>
        <rect x="118" y="16" width="84" height="36" rx="18" fill="rgba(255,122,26,0.22)" stroke="#ff7a1a" />
        <text x="160" y="38" textAnchor="middle" fill="#fff" fontSize="12">
          Agent
        </text>
        <rect x="242" y="20" width="62" height="32" rx="16" fill="#12100e" stroke="rgba(255,179,107,0.7)" />
        <text x="273" y="40" textAnchor="middle" fill="#ffd7b0" fontSize="11">
          Tools
        </text>
        <rect x="118" y="78" width="84" height="32" rx="16" fill="#12100e" stroke="rgba(255,179,107,0.7)" />
        <text x="160" y="98" textAnchor="middle" fill="#ffd7b0" fontSize="11">
          Reply
        </text>
      </svg>
      <div className="mock-chat" aria-hidden="true">
        <p>
          <b>In</b> Scope the brief
        </p>
        <p>
          <b>Agent</b> Drafting the reply
        </p>
      </div>
    </div>
  );
}

function Sparkline({ points, label }: { points: string; label: string }) {
  return (
    <div className="mock-spark-wrap">
      <span>{label}</span>
      <svg viewBox="0 0 88 28" className="mock-spark" preserveAspectRatio="none" aria-hidden="true">
        <polyline
          fill="none"
          stroke="#ffb36b"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          points={points}
        />
      </svg>
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
      <div className="mock-iot-grid">
        <div className="mock-device" aria-hidden="true">
          <b>Field node</b>
          <span>
            <i className="mock-dot" /> Live
          </span>
        </div>
        <div className="mock-sparks" aria-hidden="true">
          <Sparkline label="Signal" points="0,18 12,16 24,20 36,12 48,14 60,8 72,11 88,9" />
          <Sparkline label="Level" points="0,14 12,18 24,10 36,16 48,12 60,18 72,8 88,12" />
          <Sparkline label="Link" points="0,20 12,12 24,16 36,8 48,14 60,10 72,16 88,11" />
        </div>
        <ul className="mock-status" aria-hidden="true">
          <li>
            <i className="mock-dot" /> Sensor <em>—</em>
          </li>
          <li>
            <i className="mock-dot" /> Uplink <em>—</em>
          </li>
          <li>
            <i className="mock-dot" /> Battery <em>—</em>
          </li>
        </ul>
        <div className="mock-map" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} className={i === 5 || i === 10 ? "is-on" : undefined} />
          ))}
        </div>
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
      <div className="mock-vlsi-split">
        <svg viewBox="0 0 240 148" className="mock-die" preserveAspectRatio="none" aria-hidden="true">
          <rect x="16" y="10" width="208" height="128" fill="none" stroke="rgba(255,122,26,0.75)" strokeWidth="1" />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={`l${i}`} x="6" y={16 + i * 12} width="6" height="3" fill="#ffb36b" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={`r${i}`} x="228" y={16 + i * 12} width="6" height="3" fill="#ffb36b" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={`t${i}`} x={28 + i * 24} y="3" width="8" height="4" fill="#ffb36b" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={`b${i}`} x={28 + i * 24} y="141" width="8" height="4" fill="#ffb36b" />
          ))}
          <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.6">
            {Array.from({ length: 8 }, (_, i) => (
              <line key={`h${i}`} x1="22" x2="218" y1={24 + i * 14} y2={24 + i * 14} />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} y1="16" y2="132" x1={32 + i * 22} x2={32 + i * 22} />
            ))}
          </g>
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={`row${i}`}
              x="24"
              y={26 + i * 14}
              width="92"
              height="4"
              fill="rgba(255,179,107,0.28)"
            />
          ))}
          <rect x="132" y="26" width="72" height="40" fill="rgba(255,122,26,0.16)" stroke="#ff7a1a" strokeWidth="0.8" />
          <rect x="132" y="78" width="40" height="28" fill="rgba(255,179,107,0.12)" stroke="rgba(255,179,107,0.75)" strokeWidth="0.8" />
          <rect x="178" y="86" width="28" height="18" fill="rgba(255,179,107,0.1)" stroke="rgba(255,179,107,0.55)" strokeWidth="0.8" />
        </svg>
        <svg viewBox="0 0 200 72" className="mock-wave" aria-hidden="true">
          <text x="2" y="14" fill="#d5d0c8" fontSize="9">
            clk
          </text>
          <polyline fill="none" stroke="#ffb36b" strokeWidth="1.3" points="28,8 40,8 40,18 58,18 58,8 76,8 76,18 94,18 94,8 112,8 112,18 130,18 130,8 148,8 148,18 166,18 166,8 190,8" />
          <text x="2" y="36" fill="#d5d0c8" fontSize="9">
            d
          </text>
          <polyline fill="none" stroke="#ff7a1a" strokeWidth="1.3" points="28,28 52,28 52,40 88,40 88,28 120,28 120,40 154,40 154,28 190,28" />
          <text x="2" y="58" fill="#d5d0c8" fontSize="9">
            q
          </text>
          <polyline fill="none" stroke="#ffd7b0" strokeWidth="1.3" points="28,52 64,52 64,64 100,64 100,52 132,52 132,64 168,64 168,52 190,52" />
        </svg>
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
    }, 2500);
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
          <ZxMark size={16} className="hero-figmark" />
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
      </div>
      <p className="hero-side" aria-hidden="true">
        Brief · Build · Handover
      </p>
    </figure>
  );
}
