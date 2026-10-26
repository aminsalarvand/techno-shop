import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Earth({ isDark }) {
  const earthRef = useRef();

  const texture = new THREE.TextureLoader().load("/earth.jpeg");

  useFrame(() => {
    earthRef.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2.5, 64, 64]} />

      <meshStandardMaterial
        map={texture}
        roughness={isDark ? 0.8 : 0.6}
      />
    </mesh>
  );
}

export default function Virtual({ isDark }) {
  return (
      <div className="virtual-section">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={isDark ? 0.8 : 1.4} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={isDark ? 2 : 2.8}
        />

        <Earth isDark={isDark} />

        <OrbitControls
          enableZoom
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}