import { useMemo } from "react";
import { Color, type IUniform } from "three";
import { hexToNormalizedRGB } from "../-utils/color";

export interface SilkUniforms {
  [uniform: string]: IUniform;
  uSpeed: IUniform<number>;
  uScale: IUniform<number>;
  uNoiseIntensity: IUniform<number>;
  uColor: IUniform<Color>;
  uRotation: IUniform<number>;
  uTime: IUniform<number>;
}

export function useSilkUniforms(
  speed: number,
  scale: number,
  noiseIntensity: number,
  resolvedHex: string,
  rotation: number
): SilkUniforms {
  return useMemo(
    () =>
      ({
        uSpeed: { value: speed },
        uScale: { value: scale },
        uNoiseIntensity: { value: noiseIntensity },
        uColor: { value: new Color(...hexToNormalizedRGB(resolvedHex)) },
        uRotation: { value: rotation },
        uTime: { value: 0 },
      }) as SilkUniforms,
    [speed, scale, noiseIntensity, resolvedHex, rotation]
  );
}
