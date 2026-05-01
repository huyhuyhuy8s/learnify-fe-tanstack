import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "./style.scss";
import Loader from "@/components/Loader";
import { useLayoutEffect } from "react";
import { useAuthStore } from "@/store";
import { isTokenExpired } from "@/store/authStore";

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
  useLayoutEffect(() => {
    const { token, logout } = useAuthStore.getState();
    if (isTokenExpired(token)) {
      logout();
    }
  }, []);

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
