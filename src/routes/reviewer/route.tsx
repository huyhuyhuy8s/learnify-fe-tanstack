import Footer from "@/components/Footer";
import LeftNav from "@/components/LeftNav";
import TetrisLoader from "@/components/TetrisLoader";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import "./style.scss";
import { getCurrentUserFn } from "@/server/auth";
import { requireRole } from "@/utils/authGuard";

export const Route = createFileRoute("/reviewer")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    requireRole("reviewer", "admin")({ user, isAuthenticated: !!user });
  },
  head: () => ({
    meta: [{ title: "Content Reviewer | Learnify" }],
  }),
  component: ReviewerLayout,
});

function ReviewerLayout() {
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
