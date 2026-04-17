import classNames from "classnames";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import "./style.scss";

type TLeftNavItemProps = {
  iconName: string;
  label: string;
  href: string;
  className?: string;
  active?: boolean;
};

const LeftNavItem = (props: TLeftNavItemProps) => {
  const { iconName, label, href, className = "" } = props;
  const [fill, setFill] = useState(false);
  const iconClassName = classNames(
    "material-symbols-rounded",
    { filled: fill },
    className
  );

  return (
    <div className="left-nav-top-item">
      <Link className="link-box" to={href} activeOptions={{ exact: true }}>
        <div className="icon-box">
          <span className={iconClassName}>{iconName}</span>
        </div>
        <small>{label}</small>
      </Link>
    </div>
  );
};

export default LeftNavItem;
