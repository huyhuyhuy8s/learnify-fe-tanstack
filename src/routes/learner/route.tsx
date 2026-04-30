import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "./style.scss";
import Loader from "@/components/Loader";
import { useLayoutEffect } from "react";
import { useAuthStore } from "@/store";
import { isTokenExpired } from "@/store/authStore";
import { LayoutProvider, useLayout } from "@/contexts/LayoutContext";

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

  return (
    <LayoutProvider>
      <LearnerLayout />
    </LayoutProvider>
  );
}

function LearnerLayout() {
  const { compactLeftNav, showFooter, setLayoutConfigState } = useLayout();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  useLayoutEffect(() => {
    if (pathname.startsWith("/learner/lessons")) {
      setLayoutConfigState(() => ({
        showFooter: false,
        compactLeftNav: true,
      }));
    }
  }, [pathname, setLayoutConfigState]);

  return (
    <>
      <Loader disabled />
      <LeftNav className={compactLeftNav ? "compact" : ""} />
      <article className="body">
        <TopNav />
        <div className="inner">
          <div className="content">
            <Outlet />
          </div>
          {showFooter && <Footer />}
        </div>
      </article>
    </>
  );
}
