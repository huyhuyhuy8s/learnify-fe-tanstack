import classnames from "classnames";
import "./style.scss";
import type { TLogoProps } from "./type";
import Icon from "@/components/Icon";
import CustomLink from "../CustomLink";

const Logo = (props: TLogoProps) => {
  const { className, size = "medium" } = props;
  const logoClassNames = classnames("logo", size.toLowerCase(), className);

  return (
    <CustomLink to="/learner" className={logoClassNames}>
      <Icon name="local_library" />
      <span className="logo-text">Learnify</span>
    </CustomLink>
  );
};

export default Logo;
