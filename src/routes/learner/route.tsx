import { Suspense } from "react";
import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import TetrisLoader from "@/components/TetrisLoader";
import "./style.scss";
import { createLearnerHead } from "@/utils";
import { Toaster } from "sonner";

export const Route = createFileRoute("/learner")({
  head: () => ({
    ...createLearnerHead("Home"),
  }),
  component: LearnerLayout,
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
            <Toaster position="bottom-right" richColors />
          </div>
          <Footer />
        </div>
      </article>
    </>
  );
}
