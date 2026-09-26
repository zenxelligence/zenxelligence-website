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

const ROPE_UNDER = "M40 0 V100";
const ROPE_KNOT =
  "M40 52 C22 54 16 72 22 84 C28 96 46 96 52 84 C56 74 48 62 36 66 C28 70 30 84 40 88 C48 92 40 98 40 100";

export function LampToggle() {
  const uid = useId().replace(/:/g, "");
  const jute = `jute${uid}`;
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
      <svg className="lamp-cup" viewBox="0 0 80 20" aria-hidden="true">
        <path d="M23 0h34v3.2c0 1.2-2.2 2.2-5 2.2H28c-2.8 0-5-1-5-2.2Z" fill="#100e0c" />
        <ellipse cx="40" cy="5.2" rx="17" ry="5.2" fill="#1a1714" />
        <ellipse cx="40" cy="4.4" rx="10.5" ry="2.1" fill="#2e2925" />
        <rect x="37.3" y="7.6" width="5.4" height="7.2" rx="1" fill="#8f867c" />
        <rect x="38.5" y="8.1" width="1.15" height="6" fill="#e4dcd3" opacity="0.8" />
        <rect x="34.6" y="14.2" width="10.8" height="3.4" rx="1" fill="#5e564e" />
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
        <svg className="lamp-svg" viewBox="0 0 80 164" aria-hidden="true">
          <defs>
            <pattern id={jute} width="7" height="6" patternUnits="userSpaceOnUse">
              <rect width="7" height="6" fill="#c4a36e" />
              <path d="M-1 6 L4 0 M2 6 L7 0" stroke="#6a4328" strokeWidth="1.45" />
              <path d="M0.4 5.2 L3 1.2" stroke="#f3ddc2" strokeWidth="0.55" />
            </pattern>
            <radialGradient id={glowId} cx="50%" cy="46%" r="50%">
              <stop offset="0" stopColor="#ffe7c2" />
              <stop offset="42%" stopColor="#ffb15a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="lamp-sway">
            <path className="lamp-rope" d={ROPE_UNDER} />
            <path className="lamp-twist" d="M40 0 V54" stroke={`url(#${jute})`} />
            <g className="lamp-bulb">
              <ellipse className="bulb-glow" cx="40" cy="142" rx="26" ry="22" fill={`url(#${glowId})`} />
              <path
                className="bulb-glass"
                d="M36.6 108 H43.4 V118 C43.6 124 55.5 128 59 139 A19 19 0 1 1 21 139 C24.5 128 36.4 124 36.6 118 Z"
              />
              <path className="bulb-sheen" d="M28 146 c1.2-9 5.5-16 9-19" />
              <g className="filament">
                <path d="M40 116 v10" />
                <path d="M31 130 h18" />
                <path d="M33.2 130 v11 c0 2.6 2.3 2.6 2.3 0 v-11" />
                <path d="M37.4 130 v14 c0 2.8 2.5 2.8 2.5 0 v-14" />
                <path d="M42 130 v11 c0 2.6 2.3 2.6 2.3 0 v-11" />
              </g>
            </g>
            <path className="lamp-twist" d={ROPE_KNOT} stroke={`url(#${jute})`} />
            <g className="lamp-socket">
              <rect x="34.2" y="102" width="11.6" height="8" rx="1" />
              <path d="M34.6 104.6 h10.8 M34.6 107.2 h10.8" />
              <rect x="33" y="109.2" width="14" height="2.4" rx="0.6" />
            </g>
            <g className="lamp-fray">
              <path d="M33 98 c-4 6-9 9-13 11" />
              <path d="M36 98 c-3 6-5 10-7 14" />
              <path d="M39 97 c-1 7 0 11 0 15" />
              <path d="M41 97 c1 7 0 11 0 15" />
              <path d="M44 98 c3 6 5 10 7 14" />
              <path d="M47 98 c4 6 9 9 13 11" />
              <path d="M34 100 c-6 4-11 6-14 6" />
              <path d="M46 100 c6 4 11 6 14 6" />
            </g>
          </g>
        </svg>
        <span className="sr-only lamp-label-light">Switch to light mode</span>
        <span className="sr-only lamp-label-dark">Switch to dark mode</span>
      </button>
    </div>
  );
}
