import { lazy, Suspense } from "react";
import type { TSilkBackgroundProps } from "./SilkBackground";
import CubeLoader from "@/components/CubeLoader";

const SilkBackground = lazy(() => import("./SilkBackground"));

export default function LazySilkBackground(props: TSilkBackgroundProps) {
  return (
    <Suspense fallback={<CubeLoader />}>
      <SilkBackground {...props} />
    </Suspense>
  );
}
