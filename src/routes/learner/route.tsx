import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "./style.scss";
import Loader from "@/components/Loader";
import { createLearnerHead } from "@/utils";
import { Toaster } from "sonner";

export const Route = createFileRoute("/learner")({
  beforeLoad: ({ context }) => {
    const auth = context.auth;
    if (auth?.isAuthenticated) {
      throw redirect({ to: "/learner/dashboard" });
    }
  },
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
            <Toaster position="bottom-right" richColors />
          </div>
          <Footer />
        </div>
      </article>
    </>
  );
}
