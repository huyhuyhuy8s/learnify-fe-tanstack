export type TSpecial =
  | 'lesson'
  | 'lab'
  | 'check'
  | 'roadmap'
  | 'course'
  | 'certificate'
  | 'private'
  | 'public'
  | TSubscription;
export type TType = 'primary' | 'secondary' | 'outlined' | 'special';
export type TRoundedCorner =
  | 'rounded'
  | 'roundedSquare'
  | 'exceptUpperLeft'
  | 'exceptLowerLeft'
  | 'exceptUpperRight'
  | 'exceptLowerRight'
  | 'exceptLeft'
  | 'exceptRight'
  | 'exceptUpper'
  | 'exceptLower'
  | 'onlyUpperLeft'
  | 'onlyLowerLeft'
  | 'onlyUpperRight'
  | 'onlyLowerRight';
export type TSize = 'large' | 'medium' | 'small' | 'tiny';
export type TTypeSecondary =
  | 'default'
  | 'neutral'
  | 'yellow'
  | 'orange'
  | 'salmon'
  | 'darkGreen'
  | 'navy'
  | 'brown'
  | 'green'
  | 'pastelNeutral'
  | 'pastelYellow'
  | 'pastelOrange'
  | 'pastelSalmon'
  | 'pastelDarkGreen'
  | 'pastelNavy'
  | 'pastelBrown'
  | 'pastelGreen';

export interface ITextButtonProps {
  icon?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  text: string;
  type?: TType;
  roundedCorner?: TRoundedCorner;
  size?: TSize;
  typeSecondary?: TTypeSecondary;
  shape?: 'circular';
  typeSpecial?: TSpecial;
  tooltip?: string;
  style?: React.CSSProperties;
}

export interface IIcon {
  visible: boolean;
  type: TType;
  typeSpecial?: TSpecial;
  icon?: string;
}
