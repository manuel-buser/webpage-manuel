'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points } from 'three';
import { getParticleCount } from '../utils';

export function ParticleField() {
  const pointsRef = useRef<Points>(null);
  const [count, setCount] = useState(1000);

  // Update particle count based on screen size
  useEffect(() => {
    setCount(getParticleCount());

    const handleResize = () => {
      setCount(getParticleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate particle positions and sizes
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere
      const radius = 8 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Varied particle sizes for depth
      sizes[i] = Math.random() * 0.5 + 0.5;
    }

    return { positions, sizes };
  }, [count]);

  // Create buffer geometry with positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  // Create enhanced particle material with Neural Network theme
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.1, // Larger, more visible particles
        color: '#a855f7', // Purple glow color
        transparent: true,
        opacity: 0.8, // More visible
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    []
  );

  // Animate particles with enhanced motion
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;

      // Smooth rotation
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.15;

      // Subtle pulsing scale effect
      const pulse = 1 + Math.sin(time * 0.5) * 0.02;
      pointsRef.current.scale.setScalar(pulse);
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
