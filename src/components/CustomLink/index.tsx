import { Link } from "@tanstack/react-router";
import "./style.scss";
import classNames from "classnames";
import { memo } from "react";

type TCustomLinkProps = {
  to?: string;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode | string;
};

const CustomLink = memo((props: TCustomLinkProps) => {
  const { to, href, className, style, children } = props;

  const customlinkClassName = classNames("custom-button", className);
  return (
    <Link to={to || href || "#"} className={customlinkClassName} style={style}>
      {children}
    </Link>
  );
});

export default CustomLink;
