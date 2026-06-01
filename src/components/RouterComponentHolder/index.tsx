import classNames from "classnames";
import type { CSSProperties, ReactNode } from "react";

type TRouterComponentHolder = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function RouterComponentHolder(props: TRouterComponentHolder) {
  return (
    <div
      className={classNames("learner-loader", props.className)}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        placeContent: "center",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

export default RouterComponentHolder;
