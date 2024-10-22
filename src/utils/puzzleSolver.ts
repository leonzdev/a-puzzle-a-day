import { PuzzleState, Board, Piece } from '../types';
import { placePiece, removePiece, getAllVariants } from './pieceUtils';

export function solvePuzzle(puzzle: PuzzleState): Board[] {
  const {board, pieces} = puzzle
  const solutions: Board[] = [];

  // Pre-calculate all piece variants
  const piecesWithVariants: Map<number, Piece[]> = new Map()
  puzzle.pieces.forEach(piece => {
    const pieceId = piece.id;
    piecesWithVariants.set(pieceId, [])
    getAllVariants(piece).forEach(v => piecesWithVariants.get(pieceId)?.push(v))
  });
  
  // Maintain a list of empty cells
  let emptyCells: { row: number, col: number }[] = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === -1) emptyCells.push({ row: r, col: c });
    });
  });

  function updateEmptyCells(occupiedCells: { row: number, col: number }[], isOccupied: boolean) {
    if (isOccupied) {
      // Remove occupied cells from emptyCells
      emptyCells = emptyCells.filter(cell => !occupiedCells.some(occ => occ.row === cell.row && occ.col === cell.col));
    } else {
      // Add occupied cells back to emptyCells
      emptyCells.push(...occupiedCells);
    }
  }

  function backtrack(index: number) {
    if (solutions.length > 0) {
      return;
    }
    if (index === pieces.length) {
      solutions.push(board.map(row => [...row])); // Add a deep copy of the board
      return;
    }

    const piece = pieces[index];
    const variants = piecesWithVariants.get(piece.id) || [];

    for (const variant of variants) {
      for (const { row, col } of emptyCells) {
        if (solutions.length > 0) {
          return
        }
        if (placePiece(board, variant, row, col)) {
          // Track all occupied cells by the piece
          const occupiedCells = getOccupiedCells(variant, row, col);
          updateEmptyCells(occupiedCells, true); // Update emptyCells after a successful placement

          backtrack(index + 1);
          removePiece(board, piece.id);

          // Restore the board and update emptyCells after backtracking
          removePiece(board, piece.id);
          updateEmptyCells(occupiedCells, false); // Update emptyCells for all occupied cells
        }
      }
    }
  }

  backtrack(0);
  return solutions;
}

function getOccupiedCells(piece: Piece, row: number, col: number): { row: number, col: number }[] {
  const occupiedCells: { row: number, col: number }[] = [];
  piece.shape.forEach((shapeRow, r) => {
    shapeRow.forEach((cell, c) => {
      if (cell) {
        occupiedCells.push({ row: row + r, col: col + c });
      }
    });
  });
  return occupiedCells;
}