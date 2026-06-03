import classnames from "classnames";
import type { CSSProperties, ReactNode } from "react";

type TRouterComponentHolder = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function RouterComponentHolder(props: TRouterComponentHolder) {
  return (
    <div
      className={classnames("learner-loader", props.className)}
      style={{
        marginTop: "-50px",
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
