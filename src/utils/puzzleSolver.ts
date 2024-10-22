import { Piece, PuzzleState, Board } from '../types';
import { isValidPlacement, rotatePiece } from './puzzleGenerator';
import { placePiece, removePiece } from './pieceUtils';

export function solvePuzzle(puzzle: PuzzleState): Board[] {
  const solutions: Board[] = [];
  const board = puzzle.board.map(row => [...row]);
  const pieces = [...puzzle.pieces];

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
          if (isValidPlacement(board, rotatedPiece, row, col)) {
            placePiece(board, rotatedPiece, row, col);
            backtrack(index + 1);
            removePiece(board, rotatedPiece, row, col);
          }
        }
      }
    }
  }

  backtrack(0);
  return solutions;
}

function getAllRotations(piece: Piece): Piece[] {
  const rotations: Piece[] = [];
  let currentShape = piece.shape;

  for (let i = 0; i < 4; i++) {
    rotations.push({ ...piece, shape: currentShape });
    currentShape = rotatePiece(currentShape);
  }

  return rotations;
}