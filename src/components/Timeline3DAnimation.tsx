'use client';

import { Canvas } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Mesh, Group } from 'three';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Experience } from '@/data/cv-data';

interface AnimatedObjectProps {
  type: 'sphere' | 'cube' | 'torus';
  color: string;
}

function AnimatedObject({ type, color }: AnimatedObjectProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Rotate the object
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
    }

    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {type === 'sphere' && (
        <Sphere ref={meshRef} args={[1, 32, 32]}>
          <meshStandardMaterial
            color={color}
            metalness={0.6}
            roughness={0.2}
            wireframe
          />
        </Sphere>
      )}
      {type === 'cube' && (
        <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      )}
      {type === 'torus' && (
        <Torus ref={meshRef} args={[1, 0.4, 16, 32]}>
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
          />
        </Torus>
      )}
    </group>
  );
}

interface ParticleFieldProps {
  count: number;
  color: string;
}

function ParticleField({ count, color }: ParticleFieldProps) {
  const points = useRef<any>(null);

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.getElapsedTime();
      points.current.rotation.y = time * 0.1;
      points.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
  });

  const particlesPosition = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 2;
    particlesPosition[i3] = (Math.random() - 0.5) * radius;
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * radius;
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * radius;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} />
    </points>
  );
}

interface Timeline3DAnimationProps {
  item: Experience;
  className?: string;
}

export function Timeline3DAnimation({ item, className }: Timeline3DAnimationProps) {
  const isWork = item.type === 'work';
  const color = isWork ? '#3b82f6' : '#8b5cf6';

  // Determine animation type based on content
  let animationType: 'sphere' | 'cube' | 'torus' = 'sphere';
  let showParticles = false;

  if (isWork) {
    // Check for AI/ML keywords
    if (item.description.some(desc =>
      desc.toLowerCase().includes('ai') ||
      desc.toLowerCase().includes('machine learning') ||
      desc.toLowerCase().includes('llm')
    )) {
      animationType = 'sphere';
      showParticles = true;
    }
    // Check for DevOps/Engineering keywords
    else if (item.description.some(desc =>
      desc.toLowerCase().includes('devops') ||
      desc.toLowerCase().includes('cloud') ||
      desc.toLowerCase().includes('microservices')
    )) {
      animationType = 'cube';
    }
    // Check for Data keywords
    else if (item.description.some(desc =>
      desc.toLowerCase().includes('data') ||
      desc.toLowerCase().includes('analytics')
    )) {
      animationType = 'torus';
    }
  } else {
    // Education uses torus
    animationType = 'torus';
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <AnimatedObject type={animationType} color={color} />
        {showParticles && <ParticleField count={100} color={color} />}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
