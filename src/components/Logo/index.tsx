import classnames from "classnames";
import "./style.scss";
import type { TLogoProps } from "./type";
import { Link } from "@tanstack/react-router";

const Logo = (props: TLogoProps) => {
  const { className, size = "Medium" } = props;
  const logoClassNames = classnames(
    "logo",
    `logo--${size.toLowerCase()}`,
    className
  );

  if (size === "small") {
    return (
      <Link to="/learner" className={logoClassNames}>
        <span className="material-symbols-rounded">local_library</span>
        <span className="logo__text">Learnify</span>
      </Link>
    );
  }

  return (
    <Link className={logoClassNames} to="/learner">
      <span className="material-symbols-rounded">local_library</span>
      <span className="logo__text">Learnify</span>
    </Link>
  );
};

export default Logo;
