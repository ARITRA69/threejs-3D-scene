"use client";
import { Experience } from "@/components/Experience";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 42 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <color attach="background" args={["#171717"]} />
        <fog attach="fog" args={["#171717", 10, 30]} />
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.3} />
        </EffectComposer>
      </Canvas>
    </main>
  );
}
