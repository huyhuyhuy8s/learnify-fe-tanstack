import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "./style.scss";
import Loader from "@/components/Loader";
import { Toaster } from "sonner";

export const Route = createFileRoute("/learner")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Learnify for Learner",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
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
