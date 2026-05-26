import { Canvas } from "@react-three/fiber";
import SilkPlane from "./-components/SilkPlane";

export type TSilkBackgroundProps = {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
};

export default function SilkBackground(props: TSilkBackgroundProps) {
  const {
    speed = 3,
    scale = 1.5,
    color = "#b6c3b8",
    noiseIntensity = 1.2,
    rotation = 0.2,
  } = props;

  return (
    <div className="silk-background">
      <Canvas dpr={[1, 2]} frameloop="always">
        <SilkPlane
          speed={speed}
          scale={scale}
          color={color}
          noiseIntensity={noiseIntensity}
          rotation={rotation}
        />
      </Canvas>
    </div>
  );
}
