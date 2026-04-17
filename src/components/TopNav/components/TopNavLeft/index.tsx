import { Fragment } from "react";
import { Link } from "@tanstack/react-router";

type TTopNavLeftProps = {
  pathname: string[];
  lastPathname: string;
  pathnameWithoutLast: string[];
};

const TopNavLeft = (props: TTopNavLeftProps) => {
  const { pathname, lastPathname, pathnameWithoutLast } = props;

  const content =
    pathname.length >= 4 ? (
      <>
        <Link to="/learner">
          <span className="material-symbols-rounded">home</span>
        </Link>
        <span className="material-symbols-rounded">keyboard_arrow_right</span>
        <button className="more medium" title={pathnameWithoutLast.join(" / ")}>
          ...
        </button>
        <span className="material-symbols-rounded">keyboard_arrow_right</span>
        <button className="medium">{lastPathname}</button>
      </>
    ) : pathname.length >= 2 ? (
      <>
        <Link to="/learner">
          <span className="material-symbols-rounded">home</span>
        </Link>
        {pathname.map((item, index) => (
          <Fragment key={item}>
            <span className="material-symbols-rounded">
              keyboard_arrow_right
            </span>
            <Link
              href={`/learner/${pathname.slice(0, index + 1).join("/")}`}
              to="/learner"
              className="medium"
            >
              {item}
            </Link>
          </Fragment>
        ))}
      </>
    ) : null;

  return <div className="top-nav-left">{content}</div>;
};

export default TopNavLeft;
