import './style.scss';
import classNames from 'classnames';

interface IconButtonProp {
  name: string;
  type?: "primary" | "special" | "secondary" | "outlined" | "custom";
  state?: "default" | "hover" | "clicked" | "clickedHover";
  shape?: "square" | "hover";
  specialIcon?: "search" | "person" | "notification" | "language" | "mode";
  stage?: 1 | 2;
  size?: "tiny" | "small" | "medium" | "large";
  color?: string;
  backgroundColor?: string;
  fill?: boolean;
  weight?: number;
  grade?: number;
  opticalSize?: number;
}

const IconButton = (props: IconButtonProp) => {
  const {
    name,
    type = "primary",
    state = "default",
    shape = "square",
    specialIcon = "search",
    stage = 1,
    size = "medium",
    color = "#fff",
    backgroundColor = "none",
    fill = false,
    weight = 600,
    grade = 0,
    opticalSize = 24,
  } = props;

  const buttonClassName = classNames('icon-button', type, state, shape, size);
  const iconClassName = classNames('material-symbols-rounded', {'filled': fill});

  return (
    <button
      className={buttonClassName}
      style={{
        backgroundColor,
        color,
      }}
    >
      <span className={iconClassName}>
        {name}
      </span>
    </button>
  )
}

export default IconButton;
