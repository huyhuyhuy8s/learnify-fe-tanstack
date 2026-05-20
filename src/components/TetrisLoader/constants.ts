import type { TSize, TSpeed, TSizeConfig } from "./type";

export const TETRIS_PIECES: { shape: number[][] }[] = [
  { shape: [[1, 1, 1, 1]] },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  },
];

export const SIZE_CONFIG: Record<TSize, TSizeConfig> = {
  sm: {
    gridWidth: 8,
    gridHeight: 16,
    cellSize: "tetris-loader-cell-sm",
    boardPadding: "tetris-loader-board-sm",
  },
  md: {
    gridWidth: 10,
    gridHeight: 20,
    cellSize: "tetris-loader-cell-md",
    boardPadding: "tetris-loader-board-md",
  },
  lg: {
    gridWidth: 10,
    gridHeight: 20,
    cellSize: "tetris-loader-cell-lg",
    boardPadding: "tetris-loader-board-lg",
  },
};

export const SPEED_CONFIG: Record<TSpeed, number> = {
  slow: 150,
  normal: 80,
  fast: 40,
};
