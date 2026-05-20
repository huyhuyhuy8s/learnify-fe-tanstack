import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const DevTools = () => (
  <div style={{ position: "absolute" }}>
    <TanStackRouterDevtools position="bottom-right" />
    <ReactQueryDevtools buttonPosition="bottom-left" />
  </div>
);

export default DevTools;
