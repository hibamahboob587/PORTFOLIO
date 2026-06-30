import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  geometry: 'torusKnot' | 'octahedron' | 'icosahedron' | 'torus' | 'dodecahedron';
}

function Shape({ position, color, scale = 1, speed = 1, geometry }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const m = meshRef.current;
    if (!m) return;
    m.rotation.x += delta * 0.3 * speed;
    m.rotation.y += delta * 0.2 * speed;
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === 'torusKnot' && <torusKnotGeometry args={[0.7, 0.22, 128, 24]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[0.8, 0.25, 24, 64]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.6}
          wireframe
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

/** A constellation of glowing wireframe solids arranged around the hero. */
export default function FloatingGeometry() {
  return (
    <group>
      <Shape geometry="torusKnot" position={[-5.5, 1.5, -3]} color="#00f0ff" scale={1.1} speed={0.9} />
      <Shape geometry="octahedron" position={[5.5, 2.2, -4]} color="#ff00aa" scale={1.3} speed={1.1} />
      <Shape geometry="icosahedron" position={[4.2, -2.4, -2]} color="#b400ff" scale={1} speed={0.8} />
      <Shape geometry="torus" position={[-4.6, -2.2, -3]} color="#39ff14" scale={0.9} speed={1.2} />
      <Shape geometry="dodecahedron" position={[0, 3.4, -6]} color="#00f0ff" scale={0.8} speed={0.7} />
    </group>
  );
}
