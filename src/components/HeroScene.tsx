'use client';

import { Scene } from '@/lib/three/Scene';
import { AnimatedSphere } from '@/lib/three/AnimatedSphere';
import { ParticleField } from '@/lib/three/ParticleField';

export default function HeroScene() {
  return (
    <Scene camera={{ position: [0, 0, 6], fov: 75 }}>
      <AnimatedSphere position={[0, 0, 0]} scale={2} />
      <ParticleField />
    </Scene>
  );
}
