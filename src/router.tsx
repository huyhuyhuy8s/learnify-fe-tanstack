import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import DefaultCatchBoundary from "./components/DefaultCatchBoundary";
import NotFound from "./components/NotFound";
import "material-symbols/rounded.scss";
import type { UserResponse } from "@/gql/graphql";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient, auth: null },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export interface RouterContext {
  queryClient: QueryClient;
  auth: {
    user: UserResponse | null;
    isAuthenticated: boolean;
  } | null;
}
