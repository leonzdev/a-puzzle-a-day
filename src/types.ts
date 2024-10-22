export type PieceShape = Array<Array<number>>
export interface Piece {
  id: number;
  shape: PieceShape;
}

export type Board = Array<Array<null | number>>
export interface PuzzleState {
  board: Board;
  pieces: Piece[];
}
