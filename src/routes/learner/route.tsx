import "./route.scss";

import Footer from "@/components/Footer";
import LeftNav from "@/components/LeftNav";
import NotFound from "@/components/NotFound";
import RouterComponentHolder from "@/components/RouterComponentHolder";
import TetrisLoader from "@/components/TetrisLoader";
import TopNav from "@/components/TopNav";
import { getCurrentUserFn } from "@/server/auth";
import { createLearnerHead } from "@/utils";
import { requireAuth } from "@/utils/authGuard";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { LearnerErrorComponent } from "./-components/LearnerErrorComponent";

export const Route = createFileRoute("/learner")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    requireAuth({ user, isAuthenticated: !!user });
  },
  head: () => ({
    ...createLearnerHead("Home"),
  }),
  component: LearnerLayout,
  errorComponent: () => (
    <RouterComponentHolder children={<LearnerErrorComponent />} />
  ),
  pendingComponent: () => <RouterComponentHolder children={<TetrisLoader />} />,
  notFoundComponent: () => <RouterComponentHolder children={<NotFound />} />,
});

function LearnerLayout() {
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
