import { lazy, Suspense } from "react";
import type { TSilkBackgroundProps } from "./SilkBackground";
import RouterComponentHolder from "@/components/RouterComponentHolder";
import TetrisLoader from "@/components/TetrisLoader";

const SilkBackground = lazy(() => import("./SilkBackground"));

export default function LazySilkBackground(props: TSilkBackgroundProps) {
  return (
    <Suspense fallback={<RouterComponentHolder children={<TetrisLoader />} />}>
      <SilkBackground {...props} />
    </Suspense>
  );
}
