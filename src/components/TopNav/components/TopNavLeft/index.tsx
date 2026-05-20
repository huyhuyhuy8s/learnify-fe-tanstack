import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import "./style.scss";

type TTopNavLeftProps = {
  fullWidth?: boolean;
  pathname: string[];
  lastPathname?: string;
  pathnameWithoutLast: string[];
  customTitle?: string;
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
    customTitle,
  } = props;

  const content =
    pathname.length >= 4 ? (
      <>
        {fullWidth && <LogoWrapper />}
        <section className="top-nav-left-context">
          <Link to="/learner">
            <Icon name="home" fill size={24} />
          </Link>
          <Icon name="keyboard_arrow_right" />
          <button
            className="more medium"
            title={pathnameWithoutLast.join(" / ")}
          >
            ...
          </button>
          <Icon name="keyboard_arrow_right" />
          <button className="medium">{customTitle || lastPathname}</button>
        </section>
      </>
    ) : pathname.length >= 2 ? (
      <>
        {fullWidth && <LogoWrapper />}
        <Link to="/learner">
          <Icon name="home" fill size={24} />
        </Link>
        {pathname.map((item, index) => (
          <Fragment key={item}>
            <Icon name="keyboard_arrow_right" />
            <Link
              href={`/learner/${pathname.slice(0, index + 1).join("/")}`}
              to="/learner"
              className="medium"
            >
              {customTitle && index === pathname.length - 1
                ? customTitle
                : item}
            </Link>
          </Fragment>
        ))}
      </>
    ) : null;

  return <div className="top-nav-left">{content}</div>;
};

export default TopNavLeft;
