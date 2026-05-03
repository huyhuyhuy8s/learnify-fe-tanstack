import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "./style.scss";
import Loader from "@/components/Loader";
import { createLearnerHead } from "@/utils";

export const Route = createFileRoute("/learner")({
  head: () => ({
    ...createLearnerHead("Home"),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <LearnerLayout />;
}

function LearnerLayout() {
  return (
    <>
      <Loader disabled />
      <LeftNav />
      <article className="body">
        <TopNav />
        <div className="inner">
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </article>
    </>
  );
}
