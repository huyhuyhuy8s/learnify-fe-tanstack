import classnames from "classnames";
import "./style.scss";
import type { TLogoProps } from "./type";
import { Link } from "@tanstack/react-router";

const Logo = (props: TLogoProps) => {
  const { className, size = "medium" } = props;
  const logoClassNames = classnames("logo", size.toLowerCase(), className);

  return (
    <Link to="/learner" className={logoClassNames}>
      <span className="material-symbols-rounded">local_library</span>
      <span className="logo-text">Learnify</span>
    </Link>
  );
};

export default Logo;
