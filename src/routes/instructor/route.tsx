import Footer from "@/components/Footer";
import GraphqlError from "@/components/GraphqlError";
import LeftNav from "@/components/LeftNav";
import RouterComponentHolder from "@/components/RouterComponentHolder";
import TetrisLoader from "@/components/TetrisLoader";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import "./style.scss";
import { getCurrentUserFn } from "@/server/auth";
import { requireRole } from "@/utils/authGuard";

export const Route = createFileRoute("/instructor")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    requireRole("instructor", "admin")({ user, isAuthenticated: !!user });
  },
  head: () => ({
    meta: [{ title: "Instructor | Learnify" }],
  }),
  component: InstructorLayout,
  errorComponent: ({ error }) => (
    <RouterComponentHolder children={<GraphqlError error={error} />} />
  ),
  pendingComponent: () => <RouterComponentHolder children={<TetrisLoader />} />,
});

function InstructorLayout() {
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
          <Footer />
        </div>
      </article>
    </>
  );
}
