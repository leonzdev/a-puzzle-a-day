import { Piece, PuzzleState, Board } from '../types';
import { isSameShape, placePiece, removePiece, rotatePiece } from './pieceUtils';

export function solvePuzzle(puzzle: PuzzleState): Board[] {
  const {board, pieces} = puzzle
  const solutions: Board[] = [];

  function backtrack(index: number) {
    if (index === pieces.length) {
      solutions.push(board.map(row => [...row]));
      return;
    }

    const piece = pieces[index];
    const rotations = getAllRotations(piece);

    for (const rotatedPiece of rotations) {
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
          if (placePiece(board, rotatedPiece, row, col)) {
            backtrack(index + 1);
            removePiece(board, index);
          }
        }
      }
    }
  }

  backtrack(0);
  return solutions;
}

function getAllRotations(piece: Piece): Piece[] {
  const rotations: Piece[] = [{...piece}];
  let currentShape = piece.shape;

  ROTATE_LOOP: for (let i = 0; i < 3; i++) {
    const nextShape = rotatePiece(currentShape);
    for (let j = 0; j < rotations.length; j++) {
      if (isSameShape(rotations[j].shape, nextShape)) {
        break ROTATE_LOOP;
      }
    }
    rotations.push({ ...piece, shape: nextShape });
    currentShape = nextShape;
  }

  return rotations;
}