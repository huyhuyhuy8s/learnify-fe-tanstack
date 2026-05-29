import { createFileRoute, Outlet } from "@tanstack/react-router";
import ReviewerSidebar from "./-components/Sidebar";
import TopNavRight from "@/components/TopNav/components/TopNavRight";
import "./style.scss";

export const Route = createFileRoute("/reviewer")({
  head: () => ({
    meta: [{ title: "Content Reviewer | Learnify" }],
  }),
  component: ReviewerLayout,
});

function ReviewerLayout() {
  return (
    <div className="rl">
      <ReviewerSidebar />
      <div className="rl__right">
        <header className="rl__topbar">
          <div className="rl__topbar-inner">
            <TopNavRight />
          </div>
        </header>
        <main className="rl__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
