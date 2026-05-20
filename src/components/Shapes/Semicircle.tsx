import * as React from "react";
type TIProps = {
  color?: string;
  size?: string;
  style?: React.CSSProperties;
  stroke?: string;
  strokeWidth?: number;
};
export const Semicircle = (props: TIProps) => {
  const { color, size = "15px", style, stroke, strokeWidth } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 380 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "flex",
        alignItems: "center",
        color: color,
        justifyContent: "center",
        ...style,
      }}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        d="M350 256.921C350 275.19 335.19 290 316.921 290L63.0794 290C44.8102 290 30 275.19 30 256.921L30 250C30 161.634 101.634 90 190 90C278.366 90 350 161.634 350 250V256.921Z"
        fill="currentColor"
      />
    </svg>
  );
};
