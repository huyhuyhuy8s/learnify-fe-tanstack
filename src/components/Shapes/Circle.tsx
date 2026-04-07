import * as React from 'react';
interface IProps {
  color?: string;
  size?: string;
  style?: React.CSSProperties;
}
const Circle = (props: IProps) => {
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
        d="M350 190C350 278.366 278.366 350 190 350C101.634 350 30 278.366 30 190C30 101.634 101.634 30 190 30C278.366 30 350 101.634 350 190Z"
        fill="currentColor"
      />
    </svg>
  );
};
export default Circle;
