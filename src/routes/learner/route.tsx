import "./style.scss";

import Footer from "@/components/Footer";
import LeftNav from "@/components/LeftNav";
import NotFound from "@/components/NotFound";
import TetrisLoader from "@/components/TetrisLoader";
import TopNav from "@/components/TopNav";
import { createLearnerHead } from "@/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import { LearnerErrorComponent } from "./-components/LearnerErrorComponent";
import classNames from "classnames";

type TLearnerComponentHolder = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function LearnerComponentHolder(props: TLearnerComponentHolder) {
  return (
    <div
      className={classNames("learner-loader", props.className)}
      style={{
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        placeContent: "center",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

export const Route = createFileRoute("/learner")({
  head: () => ({
    ...createLearnerHead("Home"),
  }),
  component: LearnerLayout,
  errorComponent: () => (
    <LearnerComponentHolder children={<LearnerErrorComponent />} />
  ),
  pendingComponent: () => (
    <LearnerComponentHolder children={<TetrisLoader />} />
  ),
  notFoundComponent: () => <LearnerComponentHolder children={<NotFound />} />,
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
