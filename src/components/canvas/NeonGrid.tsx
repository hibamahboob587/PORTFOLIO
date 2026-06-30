import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Tron-style infinite ground grid rendered as a single shader plane.
 * A bright scan line sweeps across it (ping-pong) for the "GridScan" effect.
 */
interface NeonGridProps {
  colorA?: string;
  colorB?: string;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  // Anti-aliased grid lines using screen-space derivatives.
  float gridLine(vec2 coord, float width) {
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    float line = min(grid.x, grid.y);
    return 1.0 - min(line * width, 1.0);
  }

  void main() {
    // World-space grid so cells stay square regardless of plane size.
    vec2 coord = vWorldPos.xz * 0.25;

    float fine = gridLine(coord, 1.0);
    float coarse = gridLine(coord * 0.2, 1.2);

    // Distance fade so the horizon dissolves into the dark.
    float dist = length(vWorldPos.xz);
    float fade = 1.0 - smoothstep(8.0, 60.0, dist);

    // Ping-pong scan sweep along the Z axis.
    float sweep = 26.0 * sin(uTime * 0.35);
    float scan = smoothstep(3.5, 0.0, abs(vWorldPos.z - sweep));

    vec3 base = mix(uColorA, uColorB, smoothstep(-30.0, 30.0, vWorldPos.z));
    float intensity = (fine * 0.6 + coarse * 0.9);

    vec3 col = base * intensity;
    col += uColorB * scan * (fine * 0.8 + 0.25);

    float alpha = clamp(intensity + scan * 0.5, 0.0, 1.0) * fade;
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(col, alpha);
  }
`;

export default function NeonGrid({
  colorA = '#00f0ff',
  colorB = '#ff00aa',
}: NeonGridProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [colorA, colorB],
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[160, 160, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
