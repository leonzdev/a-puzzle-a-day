import { Piece, PuzzleState } from '../types';

const pieces: Piece[] = [
  {
    id: 0,
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
  },
  {
    id: 1,
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
  },
  {
    id: 2,
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  },
  {
    id: 3,
    shape: [
      [1, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    id: 4,
    shape: [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
    ],
  },
  {
    id: 5,
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
  },
  {
    id: 6,
    shape: [
      [1, 1, 1],
      [1, 0, 1],
    ],
  },
];

export function generatePuzzle(date: Date): PuzzleState {
  // const board = Array(7).fill(null);
  const board: Array<Array<number | null>> = [
    [-1, -1, -1, -1, -1, -1, null],
    [-1, -1, -1, -1, -1, -1, null],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, null, null, null, null],
  ];
  // first 2 rows have 6 columns and they fill months

  // next 4 rows have 7 cells

  // the last row has 3 cells

  // Mark all month cells
  for (let i = 0; i < 8; i++) {
    if (i < 6) {
      board[0][i] = -2;
    } else if (i === 6) {
      board[0][6] = -2;
    } else {
      board[1][0] = -2;
    }
  }

  // Mark the date on the board
  const month = date.getMonth();
  const day = date.getDate() - 1;
  board[Math.floor(day / 7) + 1][day % 7] = -2;

  return { board, pieces };
}

export function isValidPlacement(
  board: number[][],
  piece: Piece,
  row: number,
  col: number
): boolean {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j]) {
        if (
          row + i >= board.length ||
          col + j >= board[0].length ||
          board[row + i][col + j] !== -1
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

export function rotatePiece(shape: number[][]): number[][] {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array(cols)
    .fill(null)
    .map(() => Array(rows).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = shape[r][c];
    }
  }

  return rotated;
}
