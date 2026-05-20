export type TSize = "sm" | "md" | "lg";

export type TSpeed = "slow" | "normal" | "fast";

export type TTetrisLoaderProps = {
  className?: string;
  size?: TSize;
  speed?: TSpeed;
  showLoadingText?: boolean;
  loadingText?: string;
};

export type TCell = {
  filled: boolean;
  clearing: boolean;
};

export type TFallingPiece = {
  shape: number[][];
  x: number;
  y: number;
  id: string;
};

export type TSizeConfig = {
  gridWidth: number;
  gridHeight: number;
  cellSize: string; // css class name
  boardPadding: string; // css class name
};
