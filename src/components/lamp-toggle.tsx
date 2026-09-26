"use client";

import { useEffect, useId, useRef, useState } from "react";

const STORAGE_KEY = "zx-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#F7F4EF" : "#0B0B0B");
}

export function LampToggle() {
  const glowId = `lamp${useId().replace(/:/g, "")}`;
  const [pull, setPull] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [lit, setLit] = useState(true);
  const startY = useRef(0);
  const pullRef = useRef(0);
  const pulled = useRef(false);
  const skipClick = useRef(false);

  useEffect(() => {
    setLit(document.documentElement.getAttribute("data-theme") !== "light");
  }, []);

  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    setLit(next === "dark");
  }

  return (
    <div className="lamp">
      <svg className="lamp-cup" viewBox="0 0 80 14" aria-hidden="true">
        <rect x="26" y="0" width="28" height="8" rx="1.5" fill="#17120d" />
        <ellipse cx="40" cy="8" rx="18" ry="3.2" fill="#3a3128" />
      </svg>
      <button
        type="button"
        className={pulling ? "lamp-button is-pulling" : "lamp-button"}
        style={{ transform: `translateY(${pull}px)` }}
        aria-pressed={lit}
        onClick={() => {
          if (skipClick.current) {
            skipClick.current = false;
            return;
          }
          toggle();
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          startY.current = event.clientY;
          pulled.current = false;
          setPulling(true);
        }}
        onPointerMove={(event) => {
          if (!pulling) return;
          const dy = Math.max(0, event.clientY - startY.current);
          if (dy > 8) pulled.current = true;
          pullRef.current = Math.min(dy, 36);
          setPull(pullRef.current);
        }}
        onPointerUp={() => {
          if (pulled.current && pullRef.current > 14) {
            skipClick.current = true;
            toggle();
          }
          pulled.current = false;
          pullRef.current = 0;
          setPulling(false);
          setPull(0);
        }}
        onPointerCancel={() => {
          setPulling(false);
          setPull(0);
        }}
      >
        <svg className="lamp-svg" viewBox="0 0 80 150" aria-hidden="true">
          <defs>
            <radialGradient id={glowId} cx="50%" cy="42%" r="58%">
              <stop offset="0" stopColor="#ffe7bf" />
              <stop offset="48%" stopColor="#ffb15a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="lamp-sway">
            <path className="lamp-rope" d="M40 0c3 16-4 32 0 48 4 16-3 28 0 44" />
            <path className="lamp-rope-lite" d="M41 2c2 14-3 28 0 42" />
            <ellipse className="lamp-knot" cx="40" cy="96" rx="5.2" ry="3.4" />
            <path className="lamp-fray" d="M35 98l-4 8M38 99l-1 9M42 98l2 9M46 98l4 7" />
            <g className="lamp-bulb">
              <ellipse className="bulb-glow" cx="40" cy="124" rx="20" ry="22" fill={`url(#${glowId})`} />
              <path className="bulb-glass" d="M40 104c-10 0-15 8-15 17 0 9 6 16 11 19 1 2 2 5 4 5s3-3 4-5c5-3 11-10 11-19 0-9-5-17-15-17z" />
              <path className="filament" d="M33 120h14M34 125h12M35 116c4 4 4 10 0 14M45 116c-4 4-4 10 0 14" />
            </g>
          </g>
        </svg>
        <span className="sr-only lamp-label-light">Switch to light mode</span>
        <span className="sr-only lamp-label-dark">Switch to dark mode</span>
      </button>
    </div>
  );
}
