import Footer from "@/components/Footer";
import LeftNav from "@/components/LeftNav";
import TetrisLoader from "@/components/TetrisLoader";
import TopNav from "@/components/TopNav";
import { createLearnerHead } from "@/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./style.scss";

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
