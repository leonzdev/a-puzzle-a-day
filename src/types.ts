export interface Piece {
  id: number;
  shape: number[][];
}

export type Board = Array<Array<null | number>>
export interface PuzzleState {
  board: Board;
  pieces: Piece[];
}
