'use client';

import { Canvas } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Mesh, Group, BufferGeometry, Float32BufferAttribute } from 'three';
import { useFrame } from '@react-three/fiber';
import type { Experience } from '@/data/cv-data';

// Neural Network visualization for AI/ML roles
function NeuralNetwork({ color }: { color: string }) {
  const groupRef = useRef<Group>(null);

  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    // Create a layered neural network structure
    const layers = [3, 5, 5, 3];
    let x = -1.5;

    layers.forEach((nodeCount, layerIndex) => {
      const layerX = x + layerIndex * 1;
      for (let i = 0; i < nodeCount; i++) {
        const y = (i - (nodeCount - 1) / 2) * 0.6;
        positions.push([layerX, y, 0]);
      }
    });
    return positions;
  }, []);

  // Create connection lines
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    const layers = [3, 5, 5, 3];
    let startIdx = 0;

    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerSize = layers[l];
      const nextLayerSize = layers[l + 1];
      const nextStartIdx = startIdx + currentLayerSize;

      for (let i = 0; i < currentLayerSize; i++) {
        for (let j = 0; j < nextLayerSize; j++) {
          const from = nodePositions[startIdx + i];
          const to = nodePositions[nextStartIdx + j];
          positions.push(...from, ...to);
        }
      }
      startIdx = nextStartIdx;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [nodePositions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Data flow visualization for Data Science roles
function DataFlow({ color }: { color: string }) {
  const groupRef = useRef<Group>(null);
  const ringRefs = useRef<Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = time * (0.3 + i * 0.1);
        ring.rotation.z = time * (0.2 - i * 0.05);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <mesh>
        <icosahedronGeometry args={[0.4, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>

      {/* Orbiting rings */}
      {[0.8, 1.1, 1.4].map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) ringRefs.current[i] = el;
          }}
        >
          <torusGeometry args={[radius, 0.02, 8, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.7 - i * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// Cloud/Infrastructure visualization for DevOps roles
function CloudInfra({ color }: { color: string }) {
  const groupRef = useRef<Group>(null);

  const cubePositions: [number, number, number][] = useMemo(() => [
    [0, 0, 0],
    [0.8, 0.4, -0.3],
    [-0.7, 0.3, 0.4],
    [0.5, -0.5, 0.5],
    [-0.6, -0.4, -0.4],
    [0.2, 0.7, 0.3],
  ], []);

  // Create connection lines geometry
  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    const start = cubePositions[0];
    cubePositions.slice(1).forEach((pos) => {
      positions.push(...start, ...pos);
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [cubePositions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {cubePositions.map((pos, i) => (
        <mesh key={i} position={pos} scale={0.3 + i * 0.05}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
          {/* Wireframe overlay */}
          <mesh scale={1.01}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
          </mesh>
        </mesh>
      ))}

      {/* Connection lines between cubes */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

// Generic fallback visualization
function GenericViz({ color }: { color: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  );
}

interface Timeline3DAnimationProps {
  item: Experience;
  className?: string;
}

export function Timeline3DAnimation({ item, className }: Timeline3DAnimationProps) {
  const isWork = item.type === 'work';

  // Neural Network theme colors
  const primaryColor = '#818cf8';   // Indigo
  const secondaryColor = '#a78bfa'; // Purple
  const accentColor = '#22d3ee';    // Cyan

  // Determine visualization type based on content
  let VisualizationComponent: React.FC<{ color: string }> = GenericViz;
  let color = isWork ? primaryColor : secondaryColor;

  if (isWork) {
    // Check for AI/ML keywords
    if (item.description.some(desc =>
      desc.toLowerCase().includes('ai') ||
      desc.toLowerCase().includes('machine learning') ||
      desc.toLowerCase().includes('llm') ||
      desc.toLowerCase().includes('nlp') ||
      desc.toLowerCase().includes('neural')
    )) {
      VisualizationComponent = NeuralNetwork;
      color = primaryColor;
    }
    // Check for DevOps/Cloud keywords
    else if (item.description.some(desc =>
      desc.toLowerCase().includes('devops') ||
      desc.toLowerCase().includes('cloud') ||
      desc.toLowerCase().includes('microservices') ||
      desc.toLowerCase().includes('kubernetes') ||
      desc.toLowerCase().includes('docker')
    )) {
      VisualizationComponent = CloudInfra;
      color = accentColor;
    }
    // Check for Data keywords
    else if (item.description.some(desc =>
      desc.toLowerCase().includes('data') ||
      desc.toLowerCase().includes('analytics') ||
      desc.toLowerCase().includes('pipeline') ||
      desc.toLowerCase().includes('etl')
    )) {
      VisualizationComponent = DataFlow;
      color = secondaryColor;
    }
  } else {
    // Education uses DataFlow
    VisualizationComponent = DataFlow;
    color = secondaryColor;
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color={color} />

        <VisualizationComponent color={color} />
      </Canvas>
    </div>
  );
}
