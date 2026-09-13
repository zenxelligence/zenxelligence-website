"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export function SiteField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const g = el.getContext("2d", { alpha: true });
    if (!g) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.72, y: 0.42, tx: 0.72, ty: 0.42 };
    let nodes: Node[] = [];
    let frame = 0;
    let shown = false;

    function resize(surface: HTMLCanvasElement, gfx: CanvasRenderingContext2D) {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      surface.width = Math.floor(w * dpr);
      surface.height = Math.floor(h * dpr);
      surface.style.width = `${w}px`;
      surface.style.height = `${h}px`;
      gfx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(90, Math.max(36, (w * h) / 18000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function onMove(e: PointerEvent) {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    }

    function tick(surface: HTMLCanvasElement, gfx: CanvasRenderingContext2D) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      gfx.clearRect(0, 0, w, h);

      const gx = pointer.x * w;
      const gy = pointer.y * h;
      const wash = gfx.createRadialGradient(gx, gy, 40, gx, gy, 420);
      wash.addColorStop(0, "rgba(61, 220, 132, 0.07)");
      wash.addColorStop(1, "rgba(61, 220, 132, 0)");
      gfx.fillStyle = wash;
      gfx.fillRect(0, 0, w, h);

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }

        gfx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.hypot(dx, dy);
            if (d < 110) {
              gfx.strokeStyle = `rgba(61, 220, 132, ${((1 - d / 110) * 0.12).toFixed(3)})`;
              gfx.beginPath();
              gfx.moveTo(nodes[i].x, nodes[i].y);
              gfx.lineTo(nodes[j].x, nodes[j].y);
              gfx.stroke();
            }
          }
        }

        for (const n of nodes) {
          gfx.fillStyle = "rgba(242, 242, 239, 0.28)";
          gfx.beginPath();
          gfx.arc(n.x, n.y, 1.1, 0, Math.PI * 2);
          gfx.fill();
        }
      }

      if (!shown) {
        surface.style.opacity = "1";
        shown = true;
      }

      frame = window.requestAnimationFrame(() => tick(surface, gfx));
    }

    const onResize = () => resize(el, g);

    resize(el, g);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", onResize);
    frame = window.requestAnimationFrame(() => tick(el, g));

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70rem 26rem at 72% 82%, rgba(61, 220, 132, 0.07), transparent 62%), radial-gradient(46rem 18rem at 24% 96%, rgba(242, 242, 239, 0.04), transparent 66%), repeating-linear-gradient(90deg, rgba(242, 242, 239, 0.02) 0 1px, transparent 1px 96px), repeating-linear-gradient(0deg, rgba(242, 242, 239, 0.016) 0 1px, transparent 1px 96px), #0b0c0e",
          maskImage: "radial-gradient(120% 90% at 50% 42%, black 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 42%, black 55%, transparent 100%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
      />
    </div>
  );
}
