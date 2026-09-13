"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ACCENT = "#3ddc84";
const FG = "#f2f2ef";
const MUTED = "#8a8d91";
const RAISED = "#101114";
const BORDER = "#1e2023";

const CORE_Y = 0.92;
const STEP = (Math.PI * 2) / 5;

const DOMAINS = [
  { label: "Web apps", lines: ["Web apps"], href: "#plate-web", radius: 1.9, height: 1.18, speed: 0.1, phase: 0 },
  {
    label: "Android/iOS Apps",
    lines: ["Android/iOS", "Apps"],
    href: "#plate-android",
    radius: 1.9,
    height: 1.02,
    speed: 0.1,
    phase: STEP,
  },
  {
    label: "AI Agent Automation",
    lines: ["AI Agent", "Automation"],
    href: "#plate-agents",
    radius: 1.9,
    height: 1.26,
    speed: 0.1,
    phase: STEP * 2,
  },
  { label: "IoT", lines: ["IoT"], href: "#plate-iot", radius: 1.9, height: 0.98, speed: 0.1, phase: STEP * 3 },
  { label: "VLSI", lines: ["VLSI"], href: "#plate-vlsi", radius: 1.9, height: 1.14, speed: 0.1, phase: STEP * 4 },
];

const LABEL_SPREAD = 0.56;
const CORE_CLEAR = 0.36;
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();
const _world = new THREE.Vector3();
const _ndc = new THREE.Vector3();
const _coreNdc = new THREE.Vector3();
const _coreWorld = new THREE.Vector3(0, CORE_Y, 0);
const _away = new THREE.Vector2();
const _delta = new THREE.Vector2();
const _target = new THREE.Vector3();
const _start = new THREE.Vector3();
const _end = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _yAxis = new THREE.Vector3(0, 1, 0);

function Platform() {
  const grid = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const span = 1.85;
    const step = 0.18;
    for (let x = -span; x <= span + 0.001; x += step) {
      positions.push(x, 0.09, -span, x, 0.09, span);
    }
    for (let z = -span; z <= span + 0.001; z += step) {
      positions.push(-span, 0.09, z, span, 0.09, z);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const traces = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      positions.push(0, 0.1, 0, Math.cos(a) * 1.85, 0.1, Math.sin(a) * 1.85);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <group>
      <mesh receiveShadow>
        <cylinderGeometry args={[2.35, 2.45, 0.16, 48]} />
        <meshStandardMaterial color={RAISED} metalness={0.62} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[2.05, 2.05, 0.02, 48]} />
        <meshStandardMaterial color={BORDER} metalness={0.45} roughness={0.42} />
      </mesh>
      <lineSegments geometry={grid}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.16} />
      </lineSegments>
      <lineSegments geometry={traces}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.28} />
      </lineSegments>
      {[0.72, 1.18, 1.62, 2.02].map((r, i) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <ringGeometry args={[r, r + 0.018, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? ACCENT : MUTED}
            transparent
            opacity={i === 1 ? 0.7 : 0.32}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.36, 20]} />
        <meshStandardMaterial color={BORDER} metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Core({ reduced }: { reduced: boolean }) {
  const inner = useRef<THREE.Mesh>(null);
  const mid = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    const y = CORE_Y + Math.sin(t * 1.5) * 0.03;
    if (inner.current) {
      inner.current.rotation.y = t * 0.7;
      inner.current.rotation.x = t * 0.28;
      inner.current.position.y = y;
    }
    if (mid.current) {
      mid.current.rotation.y = -t * 0.35;
      mid.current.position.y = y;
    }
    if (shell.current) {
      shell.current.rotation.y = t * 0.18;
      shell.current.rotation.z = t * 0.08;
      shell.current.position.y = y;
    }
    if (glow.current) {
      glow.current.position.y = y;
      const s = 1 + Math.sin(t * 2.2) * 0.08;
      glow.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={glow} position={[0, CORE_Y, 0]}>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.05} />
      </mesh>
      <mesh ref={inner} position={[0, CORE_Y, 0]}>
        <icosahedronGeometry args={[0.1, 1]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.35}
          metalness={0.2}
          roughness={0.28}
        />
      </mesh>
      <mesh ref={mid} position={[0, CORE_Y, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={shell} position={[0, CORE_Y, 0]}>
        <icosahedronGeometry args={[0.56, 1]} />
        <meshBasicMaterial color={FG} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, CORE_Y, 0]}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.14} />
      </mesh>
      <pointLight position={[0, 1.05, 0]} color={ACCENT} intensity={3.2} distance={5} />
    </group>
  );
}

function DomainNode({
  node,
  reduced,
}: {
  node: (typeof DOMAINS)[number];
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const spoke = useRef<THREE.Mesh>(null);
  const labelAnchor = useRef<THREE.Group>(null);
  const leader = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);

  useFrame((state) => {
    if (!group.current || !spoke.current || !labelAnchor.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const a = t * node.speed + node.phase;
    const x = Math.cos(a) * node.radius;
    const y = node.height + (reduced ? 0 : Math.sin(t * 0.85 + node.phase) * 0.035);
    const z = Math.sin(a) * node.radius;
    group.current.position.set(x, y, z);

    _start.set(-x, CORE_Y - y, -z);
    _end.set(0, 0, 0);
    _dir.copy(_end).sub(_start);
    const span = _dir.length();
    _dir.multiplyScalar(1 / (span || 1));
    _start.addScaledVector(_dir, 0.5);
    _end.addScaledVector(_dir, -0.06);
    const length = _end.distanceTo(_start);
    spoke.current.position.copy(_start).lerp(_end, 0.5);
    spoke.current.quaternion.setFromUnitVectors(_yAxis, _dir);
    spoke.current.scale.set(1, length, 1);

    group.current.getWorldPosition(_world);
    _ndc.copy(_world).project(state.camera);
    _coreNdc.copy(_coreWorld).project(state.camera);
    _right.setFromMatrixColumn(state.camera.matrixWorld, 0);
    _up.setFromMatrixColumn(state.camera.matrixWorld, 1);
    _away.set(_ndc.x - _coreNdc.x, _ndc.y - _coreNdc.y);
    if (_away.length() < 0.12) {
      _away.set(_ndc.x >= _coreNdc.x ? 1 : -1, 0.35);
    }
    _away.normalize();
    let spread = LABEL_SPREAD;
    for (let i = 0; i < 7; i++) {
      _target
        .copy(_world)
        .addScaledVector(_right, _away.x * spread)
        .addScaledVector(_up, _away.y * spread * 0.62);
      _ndc.copy(_target).project(state.camera);
      _delta.set(_ndc.x - _coreNdc.x, _ndc.y - _coreNdc.y);
      if (_delta.length() >= CORE_CLEAR) break;
      spread += 0.1;
    }
    group.current.worldToLocal(_target);
    labelAnchor.current.position.copy(_target);

    const pos = leader.getAttribute("position") as THREE.BufferAttribute;
    pos.setXYZ(0, 0, 0, 0);
    pos.setXYZ(1, _target.x, _target.y, _target.z);
    pos.needsUpdate = true;
  });

  return (
    <group
      ref={group}
      position={[Math.cos(node.phase) * node.radius, node.height, Math.sin(node.phase) * node.radius]}
    >
      <mesh ref={spoke}>
        <cylinderGeometry args={[0.009, 0.009, 1, 6]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.78} />
      </mesh>
      {/* THREE.Line — not SVG; React types map `line` to SVGLineElement */}
      {/* @ts-expect-error R3F line vs SVG line */}
      <line geometry={leader}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.55} />
      </line>
      <mesh>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color={FG}
          emissive={ACCENT}
          emissiveIntensity={0.7}
          metalness={0.15}
          roughness={0.28}
        />
      </mesh>
      <group ref={labelAnchor}>
        <Html center zIndexRange={[30, 0]} style={{ pointerEvents: "auto" }}>
          <a
            href={node.href}
            className="block w-[11ch] text-center font-mono text-[11px] leading-[1.25] tracking-[0.06em] text-accent no-underline [text-shadow:0_0_10px_#0b0c0e] hover:text-fg"
          >
            {node.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </a>
        </Html>
      </group>
    </group>
  );
}

function OrbitField({ reduced }: { reduced: boolean }) {
  return (
    <group>
      <mesh rotation={[0.7, 0, 0.15]} position={[0, 0.95, 0]}>
        <torusGeometry args={[1.48, 0.008, 8, 80]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[1.1, 0.6, -0.2]} position={[0, 0.95, 0]}>
        <torusGeometry args={[1.82, 0.006, 8, 80]} />
        <meshBasicMaterial color={MUTED} transparent opacity={0.28} />
      </mesh>
      {DOMAINS.map((node) => (
        <DomainNode key={node.label} node={node} reduced={reduced} />
      ))}
    </group>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rig.current || reduced) return;
    const x = state.pointer.x * 0.16;
    const y = state.pointer.y * 0.08;
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, x, 0.045);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -y, 0.045);
  });

  return (
    <>
      <fog attach="fog" args={["#0b0c0e", 7, 14]} />
      <ambientLight intensity={0.28} color={FG} />
      <directionalLight position={[4, 7, 2]} intensity={0.85} color={FG} />
      <group ref={rig}>
        <Platform />
        <Core reduced={reduced} />
        <OrbitField reduced={reduced} />
      </group>
    </>
  );
}

export function LogicCore() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={host}
      className="relative h-[280px] w-full overflow-visible sm:h-[320px] lg:h-[420px]"
      aria-label="Five services orbiting the product core"
    >
      <Canvas
        camera={{ position: [5.4, 3.85, 5.4], fov: 31, near: 0.1, far: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ overflow: "visible" }}
        frameloop={visible && !reduced ? "always" : "demand"}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.NoToneMapping;
          camera.lookAt(0, 0.62, 0);
        }}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  );
}
