import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import HeroScene from './HeroScene';
import Effects from './Effects';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useStore } from '../../store/useStore';

interface SceneProps {
  noObjects?: boolean;
}

/**
 * Full-viewport, fixed R3F canvas that sits behind all HTML content.
 * `pointer-events: none` lets scroll + clicks pass through to the page.
 */
export default function Scene({ noObjects = false }: SceneProps) {
  const isMobile = useIsMobile();
  const setLoaded = useStore((s) => s.setLoaded);
  const setIsMobile = useStore((s) => s.setIsMobile);

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 200 }}
        onCreated={() => {
          // 3D content is ready — release the loader.
          setLoaded(true);
        }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 18, 70]} />

        <Suspense fallback={null}>
          <HeroScene reduced={isMobile} noObjects={noObjects} />
          <Preload all />
        </Suspense>

        <Effects reduced={isMobile} />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
