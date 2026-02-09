'use client';

import { Canvas } from '@react-three/fiber';
import { ReactNode, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface SceneProps {
  children: ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  enableOrbitControls?: boolean;
}

export function Scene({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  enableOrbitControls = false,
}: SceneProps) {
  return (
    <Canvas
      className="w-full h-full"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]} // Device pixel ratio for retina displays
    >
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={camera.position}
          fov={camera.fov}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#60a5fa" />

        {children}

        {enableOrbitControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
