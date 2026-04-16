import type {
  TType,
  TRoundedCorner,
  TSize,
  TTypeSecondary,
  TSpecial,
} from "@/types/global";

export type TTextButtonProps = {
  icon?: string;
  onClick: () => void;
  leftIcon?: boolean;
  rightIcon?: boolean;
  text: string;
  type?: TType;
  roundedCorner?: TRoundedCorner;
  size?: TSize;
  typeSecondary?: TTypeSecondary;
  shape?: "circular";
  typeSpecial?: TSpecial;
  backgroundColor?: string;
  color?: string;
  tooltip?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export type TIconProps = {
  visible: boolean;
  type: TType;
  typeSpecial?: TSpecial;
  icon?: string;
  color?: string;
};
