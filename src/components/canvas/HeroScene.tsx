import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp3 } from 'maath/easing';
import NeonGrid from './NeonGrid';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';

interface HeroSceneProps {
  reduced?: boolean;
  noObjects?: boolean;
}

/**
 * Composes the interactive 3D content and drives a subtle camera motion that
 * reacts to the pointer and to page scroll (via the document scroll position).
 */
export default function HeroScene({ reduced = false, noObjects = false }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 12));

  useFrame((state, delta) => {
    // Pointer parallax (state.pointer is normalised -1..1).
    const px = state.pointer.x;
    const py = state.pointer.y;

    // Scroll-driven dolly + descent: pull the camera back and down as the
    // page scrolls so the grid horizon opens up beneath the content.
    const scrollY =
      typeof window !== 'undefined'
        ? window.scrollY / Math.max(1, window.innerHeight)
        : 0;
    const scroll = Math.min(scrollY, 4);

    target.current.set(
      px * 2.2,
      py * 1.4 + scroll * 1.2,
      12 + scroll * 1.5,
    );
    damp3(camera.position, target.current, 0.4, delta);
    camera.lookAt(0, scroll * 0.6, 0);

    if (groupRef.current && !noObjects) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={120} color="#00f0ff" distance={60} />
      <pointLight position={[-10, -6, 4]} intensity={100} color="#ff00aa" distance={60} />
      <pointLight position={[0, 8, -8]} intensity={80} color="#b400ff" distance={60} />

      <NeonGrid colorA="#00f0ff" colorB="#ff00aa" />

      {!noObjects && (
        <group ref={groupRef}>
          <FloatingGeometry />
        </group>
      )}

      <ParticleField count={reduced ? 700 : 2200} />
    </>
  );
}
