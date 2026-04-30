import type { TTextButtonProps } from "./type";
import Icon from "./components/Icon";
import { useButton } from "./hooks/useButton";
import "./style.scss";
import { COLORS } from "@/styles/colors";

const TextButton = (props: TTextButtonProps) => {
  const {
    icon = "search",
    onClick,
    leftIcon = true,
    rightIcon = false,
    text = "Button",
    type = "primary",
    roundedCorner = "rounded",
    size = "large",
    typeSecondary = "default",
    shape = "circular",
    typeSpecial = "lesson",
    backgroundColor: backgroundColor,
    color: color,
    tooltip = "",
    disabled = false,
    style,
    className,
  } = props;

  const { onClickHandler, buttonClassNames, iconLabel, toolTipContent } =
    useButton({
      type,
      roundedCorner,
      size,
      typeSecondary,
      shape,
      typeSpecial,
      text,
      tooltip,
      disabled,
      onClick,
      className,
    });

  return (
    <button
      style={{
        backgroundColor: disabled ? COLORS.neutral400 : backgroundColor,
        ...style,
      }}
      className={buttonClassNames}
      title={toolTipContent}
      onClick={onClickHandler}
    >
      <Icon
        visible={leftIcon}
        type={type}
        typeSpecial={typeSpecial}
        icon={disabled ? "lock" : icon}
        color={disabled ? COLORS.white : color}
      />
      <span
        className="text"
        style={{
          color: disabled ? COLORS.white : color,
        }}
      >
        {iconLabel}
      </span>
      <Icon
        visible={rightIcon}
        type={type}
        typeSpecial={typeSpecial}
        icon={disabled ? "lock" : icon}
        color={disabled ? COLORS.white : color}
      />
    </button>
  );
};

export default TextButton;
