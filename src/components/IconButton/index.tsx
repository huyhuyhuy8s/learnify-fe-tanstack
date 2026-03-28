import './style.scss';
import classNames from 'classnames';
import { useState, useMemo } from "react";

interface IconButtonProp {
  icon: string;
  type?: "primary" | "special" | "secondary" | "outlined" | "custom";
  state?: "default" | "hover" | "clicked" | "clickedHover";
  shape?: "square" | "circle";
  specialIcon?: string;
  size?: "tiny" | "small" | "medium" | "large";
  color?: string;
  backgroundColor?: string;
  fill?: boolean;
}

const IconButton = (props: IconButtonProp) => {
  const {
    icon,
    type = "primary",
    state = "default",
    shape = "square",
    specialIcon = "search",
    size = "medium",
    color = "#fff",
    backgroundColor = "none",
    fill = false,
  } = props;

  const [clicked, setClicked] = useState(false)
  const buttonClassName = classNames('icon-button', type, state, shape, size);
  const iconClassName = classNames('material-symbols-rounded', { 'filled': fill });
  const iconVal = useMemo(
    () => (clicked ? specialIcon : icon)
    , [clicked])

  const handleClick = () => {
    setClicked(!clicked);
  }

  return (
    <button
      className={buttonClassName}
      style={{
        backgroundColor,
        color,
      }}
      onClick={handleClick}
    >
      <span className={iconClassName}>
        {iconVal}
      </span>
    </button>
  )
}

export default IconButton;
