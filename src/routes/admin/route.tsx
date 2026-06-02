import "./style.scss";

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { getCurrentUserFn } from "@/server/auth";
import { requireRole } from "@/utils/authGuard";

import GraphqlError from "@/components/GraphqlError";
import LeftNav from "@/components/LeftNav";
import RouterComponentHolder from "@/components/RouterComponentHolder";
import TetrisLoader from "@/components/TetrisLoader";
import TopNav from "@/components/TopNav";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    requireRole("admin")({ user, isAuthenticated: !!user });
  },
  head: () => ({
    meta: [{ title: "Admin | Learnify" }],
  }),
  component: AdminLayout,
  errorComponent: ({ error }) => (
    <RouterComponentHolder children={<GraphqlError error={error} />} />
  ),
  pendingComponent: () => <RouterComponentHolder children={<TetrisLoader />} />,
});

function AdminLayout() {
  return (
    <>
      <LeftNav />
      <article className="body">
        <TopNav />
        <div className="inner">
          <div className="content">
            <Suspense fallback={<TetrisLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </article>
    </>
  );
}
