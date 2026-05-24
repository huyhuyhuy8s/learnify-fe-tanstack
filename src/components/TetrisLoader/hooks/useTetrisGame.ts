import { useState, useEffect, useCallback, useRef } from "react";

import { TETRIS_PIECES, SIZE_CONFIG, SPEED_CONFIG } from "../constants";
import type { TCell, TFallingPiece, TSize, TSpeed } from "../type";

type TUseTetrisGameProps = {
  size: TSize;
  speed: TSpeed;
};

const useTetrisGame = (props: TUseTetrisGameProps) => {
  const { size, speed } = props;

  const config = SIZE_CONFIG[size];
  const fallSpeed = SPEED_CONFIG[speed];

  const makeEmptyGrid = useCallback(
    (): TCell[][] =>
      Array.from({ length: config.gridHeight }, () =>
        Array.from({ length: config.gridWidth }, () => ({
          filled: false,
          clearing: false,
        }))
      ),
    [config.gridHeight, config.gridWidth]
  );

  const [grid, setGrid] = useState<TCell[][]>(makeEmptyGrid);
  const [fallingPiece, setFallingPiece] = useState<TFallingPiece | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  // ReturnType<typeof requestAnimationFrame> is number; undefined before first call
  const frameRef = useRef<ReturnType<typeof requestAnimationFrame> | undefined>(
    undefined
  );
  const lastUpdateRef = useRef<number>(0);

  const rotateShape = useCallback((shape: number[][]): number[][] => {
    const rows = shape.length;
    const cols = shape[0]?.length ?? 0;
    if (rows === 0 || cols === 0) return shape;

    const rotated: number[][] = Array.from({ length: cols }, () =>
      Array<number>(rows).fill(0)
    );

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotated[j]![rows - 1 - i] = shape[i]![j]!;
      }
    }

    return rotated;
  }, []);

  const createNewPiece = useCallback((): TFallingPiece => {
    const index = Math.floor(Math.random() * TETRIS_PIECES.length);
    const pieceData = TETRIS_PIECES[index]!;
    let shape = pieceData.shape;

    const rotations = Math.floor(Math.random() * 4);
    for (let i = 0; i < rotations; i++) {
      shape = rotateShape(shape);
    }

    const firstRow = shape[0]!;
    const maxX = config.gridWidth - firstRow.length;
    const x = Math.floor(Math.random() * (maxX + 1));

    return {
      shape,
      x,
      y: -shape.length,
      id: Math.random().toString(36).substring(2, 11),
    };
  }, [rotateShape, config.gridWidth]);

  const canPlacePiece = useCallback(
    (piece: TFallingPiece, newX: number, newY: number): boolean => {
      for (let row = 0; row < piece.shape.length; row++) {
        const shapeRow = piece.shape[row]!;
        for (let col = 0; col < shapeRow.length; col++) {
          if (shapeRow[col]) {
            const gx = newX + col;
            const gy = newY + row;

            if (gx < 0 || gx >= config.gridWidth || gy >= config.gridHeight)
              return false;
            if (gy >= 0 && grid[gy]![gx]!.filled) return false;
          }
        }
      }
      return true;
    },
    [grid, config.gridWidth, config.gridHeight]
  );

  const placePiece = useCallback(
    (piece: TFallingPiece) => {
      setGrid((prev) => {
        const next = prev.map((row) => row.map((cell) => ({ ...cell })));

        for (let row = 0; row < piece.shape.length; row++) {
          const shapeRow = piece.shape[row]!;
          for (let col = 0; col < shapeRow.length; col++) {
            if (shapeRow[col]) {
              const gx = piece.x + col;
              const gy = piece.y + row;

              if (
                gy >= 0 &&
                gy < config.gridHeight &&
                gx >= 0 &&
                gx < config.gridWidth
              ) {
                next[gy]![gx] = { filled: true, clearing: false };
              }
            }
          }
        }

        return next;
      });
    },
    [config.gridHeight, config.gridWidth]
  );

  const clearFullLines = useCallback(() => {
    setGrid((prev) => {
      const linesToClear: number[] = [];

      prev.forEach((row, i) => {
        if (row.every((cell) => cell.filled)) linesToClear.push(i);
      });

      if (linesToClear.length === 0) return prev;

      setIsClearing(true);

      const marked = prev.map((row, ri) =>
        linesToClear.includes(ri)
          ? row.map((c) => ({ ...c, clearing: true }))
          : row
      );

      setTimeout(() => {
        setGrid((current) => {
          const filtered = current.filter((_, i) => !linesToClear.includes(i));
          const empty: TCell[][] = Array.from(
            { length: linesToClear.length },
            () =>
              Array.from({ length: config.gridWidth }, () => ({
                filled: false,
                clearing: false,
              }))
          );
          setIsClearing(false);
          return [...empty, ...filtered];
        });
      }, 200);

      return marked;
    });
  }, [config.gridWidth]);

  const checkAndReset = useCallback(() => {
    const topRows = grid.slice(0, 4);
    const needsReset = topRows.some(
      (row) => row.filter((c) => c.filled).length > config.gridWidth * 0.7
    );

    if (needsReset) {
      setIsClearing(true);
      setTimeout(() => {
        setGrid(makeEmptyGrid());
        setFallingPiece(null);
        setIsClearing(false);
      }, 500);
      return true;
    }

    return false;
  }, [grid, config.gridWidth, makeEmptyGrid]);

  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= fallSpeed) {
        lastUpdateRef.current = timestamp;

        if (!isClearing && !checkAndReset()) {
          setFallingPiece((prev) => {
            if (!prev) return createNewPiece();

            const newY = prev.y + 1;
            if (canPlacePiece(prev, prev.x, newY)) return { ...prev, y: newY };

            placePiece(prev);
            setTimeout(clearFullLines, 50);
            return createNewPiece();
          });
        }
      }

      frameRef.current = requestAnimationFrame(gameLoop);
    };

    frameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    canPlacePiece,
    createNewPiece,
    placePiece,
    clearFullLines,
    checkAndReset,
    isClearing,
    fallSpeed,
  ]);

  const getDisplayGrid = useCallback((): TCell[][] => {
    const display = grid.map((row) => row.map((cell) => ({ ...cell })));

    if (fallingPiece && !isClearing) {
      for (let row = 0; row < fallingPiece.shape.length; row++) {
        const shapeRow = fallingPiece.shape[row]!;
        for (let col = 0; col < shapeRow.length; col++) {
          if (shapeRow[col]) {
            const gx = fallingPiece.x + col;
            const gy = fallingPiece.y + row;

            if (
              gy >= 0 &&
              gy < config.gridHeight &&
              gx >= 0 &&
              gx < config.gridWidth
            ) {
              display[gy]![gx] = { filled: true, clearing: false };
            }
          }
        }
      }
    }

    return display;
  }, [grid, fallingPiece, isClearing, config.gridHeight, config.gridWidth]);

  return { displayGrid: getDisplayGrid(), isClearing, config };
};

export default useTetrisGame;
