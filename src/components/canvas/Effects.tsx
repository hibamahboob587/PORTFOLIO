import { useMemo } from 'react';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

interface EffectsProps {
  /** Trim the effect chain on low-power devices. */
  reduced?: boolean;
}

/**
 * Post-processing for the R3F layer. Bloom does the heavy lifting for the
 * neon glow; a touch of chromatic aberration + vignette sells the CRT look.
 */
export default function Effects({ reduced = false }: EffectsProps) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0009), []);

  if (reduced) {
    return (
      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Bloom
        intensity={1.4}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.8}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={caOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
}
