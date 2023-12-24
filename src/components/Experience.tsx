"use client";
import React, { useEffect, useRef } from "react";
import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  RenderTexture,
  Text,
  useFont,
} from "@react-three/drei";
import { SolarSystem } from "./SolarSystem";
import { degToRad } from "three/src/math/MathUtils.js";
import { Color, Box3, Mesh, BufferGeometry, Material, Object3D } from "three";

interface ExperienceProps {}

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const Experience: React.FC<ExperienceProps> = () => {
  const controls = useRef<CameraControls>(null);
  const meshFitCamera = useRef<Mesh<
    BufferGeometry,
    Material | Material[]
  > | null>(null);

  const intro = async () => {
    if (controls.current) {
      controls.current.dolly(-22);
      controls.current.smoothTime = 1.6;
      controls.current.dolly(20, true);
      fitCamera();
    }
  };

  const fitCamera = async () => {
    if (controls.current && meshFitCamera.current) {
      const box = new Box3().setFromObject(meshFitCamera.current);
      controls.current.fitToBox(box, true);
    }
  };

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", fitCamera);
    return () => window.removeEventListener("resize", fitCamera);
  }, []);

  return (
    <>
      <CameraControls ref={controls} />
      <mesh ref={meshFitCamera} position-z={1.5} visible={false}>
        <boxGeometry args={[10, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
      <Text
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8}
        textAlign="center"
        font={"/Poppins-Black.ttf"}
        rotation-y={degToRad(30)}
        anchorY="bottom"
      >
        EXPLORE {"\n"} SOLAR SYSTEM
        <meshBasicMaterial color={bloomColor} toneMapped={false}>
          <RenderTexture attach="map">
            <color attach="background" args={["#fff"]} />
            <Environment preset="dawn" />
            <Float floatIntensity={4} rotationIntensity={5}>
              <SolarSystem
                scale={1.6}
                rotation-y={-degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group rotation-y={degToRad(-25)} position-x={3}>
        <SolarSystem scale={0.6} />
      </group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};

useFont.preload("/Poppins-Black.ttf");
