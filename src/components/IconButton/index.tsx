import "./style.scss";
import classNames from "classnames";
import { useState, useMemo } from "react";

type TconButtonProp = {
  icon: string;
  onClick?: () => void;
  type?: "primary" | "special" | "secondary" | "outlined" | "custom";
  state?: "default" | "hover" | "clicked" | "clickedHover";
  shape?: "square" | "circle";
  specialIcon?: string;
  size?: "tiny" | "small" | "medium" | "large";
  color?: string;
  backgroundColor?: string;
  fill?: boolean;
  tooltip?: string;
  className?: string;
};

const IconButton = (props: TconButtonProp) => {
  const {
    icon,
    onClick = () => {},
    type = "primary",
    state = "default",
    shape = "square",
    specialIcon = "search",
    size = "medium",
    color = "#fff",
    backgroundColor = "none",
    fill = false,
    tooltip,
    className,
  } = props;

  const [clicked, setClicked] = useState(false);
  const buttonClassName = classNames(
    "icon-button",
    type,
    state,
    shape,
    size,
    className
  );
  const iconClassName = classNames("material-symbols-rounded", {
    filled: fill,
  });
  const iconVal = useMemo(
    () => (clicked ? specialIcon : icon),
    [clicked, specialIcon, icon]
  );

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };

  return (
    <button
      className={buttonClassName}
      style={{
        backgroundColor,
        color,
      }}
      onClick={handleClick}
      title={tooltip}
    >
      <span className={iconClassName}>{iconVal}</span>
    </button>
  );
};

export default IconButton;
