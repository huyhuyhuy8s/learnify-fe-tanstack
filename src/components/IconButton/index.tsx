import "./style.scss";
import classNames from "classnames";
import { useState, useMemo, type ButtonHTMLAttributes } from "react";
import Icon from "@/components/Icon";

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
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
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
    color,
    backgroundColor,
    fill = false,
    tooltip,
    ariaLabel,
    className,
    style,
    buttonType = "button",
    disabled = false,
  } = props;

  const [clicked, setClicked] = useState(false);
  const buttonClassName = classNames(
    "icon-button",
    type,
    state,
    shape,
    size,
    { disabled: disabled },
    className
  );
  const iconVal = useMemo(
    () => (type === "special" ? (clicked ? specialIcon : icon) : icon),
    [clicked, specialIcon, icon, type]
  );

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };

  return (
    <button
      className={buttonClassName}
      style={{
        ...style,
        backgroundColor,
        color,
      }}
      onClick={handleClick}
      title={tooltip}
      aria-label={ariaLabel || tooltip}
      type={buttonType}
      disabled={disabled}
    >
      <Icon name={iconVal} fill={fill} style={{ color }} />
    </button>
  );
};

export default IconButton;
