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
  const uid = useId().replace(/:/g, "");
  const glowId = `glow${uid}`;
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
      <button
        type="button"
        className={pulling ? "lamp-button is-pulling" : "lamp-button"}
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
          pullRef.current = Math.min(dy, 28);
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
        <svg className="lamp-svg" viewBox="0 0 78 146" aria-hidden="true">
          <defs>
            <linearGradient id={glowId} x1="39" y1="54" x2="39" y2="128" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffb15a" stopOpacity="0.55" />
              <stop offset="0.45" stopColor="#ff7a1a" stopOpacity="0.18" />
              <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="lamp-sway">
            <path className="lamp-cord" d="M28 0 V18" />
            <path className="lamp-glow" d="M8 54 H46 L56 124 H2 Z" fill={`url(#${glowId})`} />
            <path className="lamp-shade" d="M16 26 C16 14 40 14 40 26 C46 36 52 46 52 52 H4 C4 46 10 36 16 26Z" />
            <path className="lamp-shade-edge" d="M18 20 C22 16 34 16 38 20" />
            <ellipse className="lamp-rim-well" cx="28" cy="51.2" rx="22" ry="3.4" />
            <path className="lamp-rim" d="M8 51.4 C14 55 22 56.4 28 56.4 C34 56.4 42 55 48 51.4" />
            <g className="lamp-pull" style={{ transform: `translateY(${pull}px)` }}>
              <path className="lamp-cord" d="M50 44 V104" />
              <circle className="lamp-bead" cx="50" cy="112" r="5.4" />
              <circle className="lamp-bead-lite" cx="48.4" cy="110.2" r="1.5" />
            </g>
          </g>
        </svg>
        <span className="sr-only lamp-label-light">Switch to light mode</span>
        <span className="sr-only lamp-label-dark">Switch to dark mode</span>
      </button>
    </div>
  );
}
