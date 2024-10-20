export interface Piece {
  id: number;
  shape: number[][];
}

export interface PuzzleState {
  board: Array<Array<null | number>>;
  pieces: Piece[];
}
