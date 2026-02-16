'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 80;
const CONNECTION_DISTANCE = 2.5;
const SPREAD_X = 12;
const SPREAD_Y = 10;
const SPREAD_Z = 6;

export function NetworkNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate initial node positions
  const initialPositions = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * SPREAD_X;
      positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i3 + 2] = (Math.random() - 0.5) * SPREAD_Z;
    }
    return positions;
  }, []);

  // Store velocities for each node
  const velocities = useMemo(() => {
    const vels = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT * 3; i++) {
      vels[i] = (Math.random() - 0.5) * 0.005;
    }
    return vels;
  }, []);

  // Node geometry
  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(initialPositions.slice(), 3));
    return geo;
  }, [initialPositions]);

  const nodeMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.08,
        color: '#818cf8',
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    []
  );

  // Line geometry for connections (pre-allocate max possible lines)
  const maxLines = NODE_COUNT * NODE_COUNT;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions, lineColors]);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  // Color references
  const colorPrimary = useMemo(() => new THREE.Color('#818cf8'), []);
  const colorAccent = useMemo(() => new THREE.Color('#22d3ee'), []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;

    // Update node positions with drift
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;

      // Add sine-based organic motion
      positions[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.5) * 0.002;
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.7) * 0.002;
      positions[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.4 + i * 0.3) * 0.001;

      // Wrap around bounds
      if (positions[i3] > SPREAD_X / 2) positions[i3] = -SPREAD_X / 2;
      if (positions[i3] < -SPREAD_X / 2) positions[i3] = SPREAD_X / 2;
      if (positions[i3 + 1] > SPREAD_Y / 2) positions[i3 + 1] = -SPREAD_Y / 2;
      if (positions[i3 + 1] < -SPREAD_Y / 2) positions[i3 + 1] = SPREAD_Y / 2;
      if (positions[i3 + 2] > SPREAD_Z / 2) positions[i3 + 2] = -SPREAD_Z / 2;
      if (positions[i3 + 2] < -SPREAD_Z / 2) positions[i3 + 2] = SPREAD_Z / 2;
    }

    posAttr.needsUpdate = true;

    // Update connections
    let lineIndex = 0;
    const linePosArray = lineGeometry.attributes.position.array as Float32Array;
    const lineColArray = lineGeometry.attributes.color.array as Float32Array;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const idx = lineIndex * 6;
          const alpha = 1 - dist / CONNECTION_DISTANCE;

          // Line start
          linePosArray[idx] = positions[i3];
          linePosArray[idx + 1] = positions[i3 + 1];
          linePosArray[idx + 2] = positions[i3 + 2];
          // Line end
          linePosArray[idx + 3] = positions[j3];
          linePosArray[idx + 4] = positions[j3 + 1];
          linePosArray[idx + 5] = positions[j3 + 2];

          // Color interpolation based on distance
          const color = colorPrimary.clone().lerp(colorAccent, alpha * 0.5);
          lineColArray[idx] = color.r * alpha;
          lineColArray[idx + 1] = color.g * alpha;
          lineColArray[idx + 2] = color.b * alpha;
          lineColArray[idx + 3] = color.r * alpha;
          lineColArray[idx + 4] = color.g * alpha;
          lineColArray[idx + 5] = color.b * alpha;

          lineIndex++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

    // Slow global rotation
    pointsRef.current.rotation.y = time * 0.02;
    linesRef.current.rotation.y = time * 0.02;
  });

  return (
    <>
      <points ref={pointsRef} geometry={nodeGeometry} material={nodeMaterial} />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
}
