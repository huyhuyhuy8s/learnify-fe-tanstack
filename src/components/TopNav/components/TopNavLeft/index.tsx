import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import Logo from "@/components/Logo";
import "./style.scss";

type TTopNavLeftProps = {
  fullWidth?: boolean;
  pathname: string[];
  lastPathname?: string;
  pathnameWithoutLast: string[];
};

const LogoWrapper = () => (
  <>
    <Logo size="small" />
    <div className="divider" />
  </>
);

const TopNavLeft = (props: TTopNavLeftProps) => {
  const {
    pathname,
    lastPathname,
    pathnameWithoutLast,
    fullWidth = false,
  } = props;

  const content =
    pathname.length >= 4 ? (
      <>
        {fullWidth && <LogoWrapper />}
        <section className="top-nav-left-context">
          <Link to="/learner">
            <span className="material-symbols-rounded">home</span>
          </Link>
          <span className="material-symbols-rounded">keyboard_arrow_right</span>
          <button
            className="more medium"
            title={pathnameWithoutLast.join(" / ")}
          >
            ...
          </button>
          <span className="material-symbols-rounded">keyboard_arrow_right</span>
          <button className="medium">{lastPathname}</button>
        </section>
      </>
    ) : pathname.length >= 2 ? (
      <>
        {fullWidth && <LogoWrapper />}
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
