import { Piece, Board } from '../types';

export function placePiece(board: Board, piece: Piece, row: number, col: number) {
  piece.shape.forEach((shapeRow, r) => {
    shapeRow.forEach((cell, c) => {
      if (cell) {
        board[row + r][col + c] = piece.id;
      }
    });
  });
}

export function removePiece(board: Board, piece: Piece, row: number, col: number) {
  piece.shape.forEach((shapeRow, r) => {
    shapeRow.forEach((cell, c) => {
      if (cell) {
        board[row + r][col + c] = -1;
      }
    });
  });
}