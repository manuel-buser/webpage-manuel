'use client';

import { Scene } from '@/lib/three/Scene';
import { NetworkNodes } from '@/lib/three/TimelineBackground';

export default function TimelineScene() {
  return (
    <Scene camera={{ position: [0, 0, 8], fov: 60 }}>
      <NetworkNodes />
    </Scene>
  );
}
