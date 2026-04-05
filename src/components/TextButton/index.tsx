import classNames from 'classnames';
import { prepare, layout } from '@chenglou/pretext'
import './style.scss';

interface TextButtonProps {
  icon?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  text: string;
  type?: "primary" | "secondary" | "outlined" | "special";
  roundedCorner?:
  "rounded" |
  "exceptUpperLeft" |
  "exceptLowerLeft" |
  "exceptUpperRight" |
  "exceptLowerRight" |
  "exceptLeft" |
  "exceptRight" |
  "exceptUpper" |
  "exceptLower" |
  "onlyUpperLeft" |
  "onlyLowerLeft" |
  "onlyUpperRight" |
  "onlyLowerRight";
  size?: "large" | "medium" | "small" | "tiny";
  typeSecondary?:
  "default" |
  "neutral" |
  "yellow" |
  "orange" |
  "salmon" |
  "darkGreen" |
  "navy" |
  "brown" |
  "green" |
  "pastelNeutral" |
  "pastelYellow" |
  "pastelOrange" |
  "pastelSalmon" |
  "pastelDarkGreen" |
  "pastelNavy" |
  "pastelBrown" |
  "pastelGreen";
  shape?: "circular";
  typeSpecial?:
  "lesson" |
  "lab" |
  "check" |
  "roadmap" |
  "course" |
  "certificate" |
  "private" |
  "public";
  style?: React.CSSProperties;
}

const TextButton = (props: TextButtonProps) => {
  const {
    icon = "search",
    leftIcon = false,
    rightIcon = false,
    text = "Button",
    type = "primary",
    roundedCorner = "rounded",
    size = "large",
    typeSecondary = "default",
    shape = "circular",
    typeSpecial = "lesson",
    style,
  } = props;

  const buttonClassNames = classNames(
    'text-button',
    type,
    [`corner-${roundedCorner}`],
    size,
    { [`typeSecondary-${typeSecondary}`]: type === 'secondary' },
    shape,
    { [`typeSpecial-${typeSpecial}`]: type === 'special' },
  )

  return (
    <button style={style} className={buttonClassNames}>
      {leftIcon && <span className="material-symbols-rounded">{icon}</span>}
      <span className="text">{text}</span>
      {rightIcon && <span className="material-symbols-rounded">{icon}</span>}
    </button>
  )
}

export default TextButton;

