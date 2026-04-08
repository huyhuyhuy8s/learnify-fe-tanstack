import * as React from 'react';
interface IProps {
  color?: string;
  size?: string;
  style?: React.CSSProperties;
}
const SidedCookie4 = (props: IProps) => {
  const { color, size = '15px', style } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 380 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'flex',
        alignItems: 'center',
        color: color,
        justifyContent: 'center',
        ...style,
      }}
    >
      <path
        d="M230.389 50.473c62.72-27.24 126.378 36.418 99.138 99.138l-4.504 10.37a75.36 75.36 0 0 0 0 60.038l4.504 10.37c27.24 62.72-36.418 126.378-99.138 99.138l-10.37-4.504a75.36 75.36 0 0 0-60.038 0l-10.37 4.504c-62.72 27.24-126.378-36.418-99.138-99.138l4.504-10.37a75.36 75.36 0 0 0 0-60.038l-4.504-10.37c-27.24-62.72 36.418-126.378 99.138-99.138l10.37 4.504a75.36 75.36 0 0 0 60.038 0z"
        fill="currentColor"
      />
    </svg>
  );
};
export default SidedCookie4;
