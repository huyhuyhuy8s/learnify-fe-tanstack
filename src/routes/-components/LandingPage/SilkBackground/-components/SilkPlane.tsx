import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, ShaderMaterial } from "three";
import { useResolvedColor } from "../-hooks/useResolvedColor";
import { type SilkUniforms, useSilkUniforms } from "../-hooks/useSilkUniforms";
import fragmentShader from "../-shaders/fragment.glsl?raw";
import vertexShader from "../-shaders/vertex.glsl?raw";

type TSilkPlaneProps = {
  speed: number;
  scale: number;
  noiseIntensity: number;
  rotation: number;
  color: string;
};

export default function SilkPlane({
  speed,
  scale,
  noiseIntensity,
  rotation,
  color,
}: TSilkPlaneProps) {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();
  const resolvedHex = useResolvedColor(color);

  const uniforms = useSilkUniforms(
    speed,
    scale,
    noiseIntensity,
    resolvedHex,
    rotation
  );

  useFrame((_state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial & {
        uniforms: SilkUniforms;
      };
      material.uniforms.uTime.value += 0.1 * delta;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
