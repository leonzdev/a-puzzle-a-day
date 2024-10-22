import { Piece, Board, PieceShape } from '../types';
import { isValidPlacement } from './puzzleGenerator';

export function placePiece(board: Board, piece: Piece, row: number, col: number): boolean {
  if (isValidPlacement(board, piece, row, col)) {
    piece.shape.forEach((shapeRow, r) => {
      shapeRow.forEach((cell, c) => {
        if (cell) {
          board[row + r][col + c] = piece.id;
        }
      });
    });
    return true;
  }
  return false;
}

export function removePiece(board: Board, pieceId: number|null) {
  if (pieceId == null || pieceId < 0) return;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === pieceId) {
        board[i][j] = -1;
      }
    }
  }
}

export function rotatePiece(shape: PieceShape): PieceShape {
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

export function flipPiece(shape: PieceShape): PieceShape {
  return shape.map(row => [...row].reverse());
}

export function getAllVariants(piece: Piece): Piece[] {
  const variants: Piece[] = [{...piece}];
  let currentShape = piece.shape;

  // rotate
  ROTATE_LOOP: for (let i = 0; i < 3; i++) {
    const nextShape = rotatePiece(currentShape);
    if (!hasVariant(variants, nextShape)) {
      variants.push({ ...piece, shape: nextShape });
      currentShape = nextShape;
    } else {
      break ROTATE_LOOP;
    }
  }

  // flip
  for (let p of variants) {
    const flippedShape = flipPiece(p.shape)
    if (!hasVariant(variants, flippedShape)) {
      variants.push({...p, shape: flippedShape});
    }
  }
  return variants;
}

export function isSameShape(shape1: PieceShape, shape2: PieceShape): boolean {
  if (shape1.length !== shape2.length) {
    return false;
  }
  if (shape1.length > 0 && shape1[0].length !== shape2[0].length) {
    return false;
  }
  for (let i = 0; i < shape1.length; i++) {
    for (let j = 0; j < shape1[0].length; j++) {
      if (shape1[i][j] !== shape2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function hasVariant(variants: Piece[], newShape: PieceShape): boolean {
  for (let v of variants) {
    if (isSameShape(v.shape, newShape)) {
      return true;
    }
  }

  return false;
}
