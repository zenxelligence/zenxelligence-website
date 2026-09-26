"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ACCENT = "#ff7a1a";
const GLOW = "#ffb36b";
const FG = "#ffffff";
const MUTED = "#8a8680";
const RAISED = "#151413";
const BORDER = "#38302a";

const CORE_Y = 0.92;

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <circleGeometry args={[2.7, 48]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.22} />
      </mesh>
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
    const sway = Math.sin((t * Math.PI * 2) / 8) * ((6 * Math.PI) / 180);
    const y = CORE_Y + Math.sin(t * 0.8) * 0.02;
    if (inner.current) {
      inner.current.rotation.y = sway;
      inner.current.rotation.x = sway * 0.35;
      inner.current.position.y = y;
    }
    if (mid.current) {
      mid.current.rotation.y = -sway;
      mid.current.position.y = y;
    }
    if (shell.current) {
      shell.current.rotation.y = sway * 0.6;
      shell.current.rotation.z = sway * 0.25;
      shell.current.position.y = y;
    }
    if (glow.current) {
      glow.current.position.y = y;
      glow.current.scale.setScalar(1);
    }
  });

  return (
    <group>
      <mesh ref={glow} position={[0, CORE_Y, 0]}>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshBasicMaterial color={GLOW} transparent opacity={0.08} />
      </mesh>
      <mesh ref={inner} position={[0, CORE_Y, 0]}>
        <icosahedronGeometry args={[0.1, 1]} />
        <meshStandardMaterial
          color="#ef771c"
          emissive="#ffae4b"
          emissiveIntensity={0.45}
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

function OrbitField({ reduced }: { reduced: boolean }) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (ringA.current) ringA.current.rotation.z = (t * Math.PI * 2) / 52;
    if (ringB.current) ringB.current.rotation.y = (t * Math.PI * 2) / 60;
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[0.7, 0, 0.15]} position={[0, 0.95, 0]}>
        <torusGeometry args={[1.48, 0.008, 8, 80]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringB} rotation={[1.1, 0.6, -0.2]} position={[0, 0.95, 0]}>
        <torusGeometry args={[1.82, 0.006, 8, 80]} />
        <meshBasicMaterial color={MUTED} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function DemandLoop({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let stopped = false;
    const tick = () => {
      if (stopped || document.hidden) return;
      invalidate();
      frame = requestAnimationFrame(tick);
    };
    const onHide = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [active, invalidate]);
  return null;
}

function Scene({ reduced }: { reduced: boolean }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rig.current || reduced) return;
    const x = state.pointer.x * 0.16;
    const y = state.pointer.y * 0.08;
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, x, 0.018);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -y, 0.018);
  });

  return (
    <>
      <fog attach="fog" args={["#0b0b0b", 8, 16]} />
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
      className="logic-core relative overflow-visible"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [5.85, 4.2, 5.85], fov: 30, near: 0.1, far: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ overflow: "hidden" }}
        frameloop="demand"
        onCreated={({ gl, camera, invalidate }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.setClearColor(0x000000, 0);
          camera.lookAt(0, 0.62, 0);
          invalidate();
        }}
      >
        <DemandLoop active={visible && !reduced} />
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  );
}
