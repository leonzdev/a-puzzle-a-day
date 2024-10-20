import React, { useState, useEffect } from 'react';
import { Calendar, Check, RotateCw, Trash2 } from 'lucide-react';
import PuzzleBoard from './components/PuzzleBoard';
import PieceSelector from './components/PieceSelector';
import {
  generatePuzzle,
  isValidPlacement,
  rotatePiece,
} from './utils/puzzleGenerator';
import { Piece, PuzzleState } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [puzzle, setPuzzle] = useState<PuzzleState>({ board: [], pieces: [] });
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [placedPieces, setPlacedPieces] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newPuzzle = generatePuzzle(currentDate);
    setPuzzle(newPuzzle);
    setPlacedPieces(new Set());
  }, [currentDate]);

  const handlePieceSelect = (piece: Piece) => {
    setSelectedPiece(piece);
    setRemoveMode(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (removeMode) {
      removePiece(row, col);
    } else if (selectedPiece) {
      placePiece(row, col);
    }
  };

  const placePiece = (row: number, col: number) => {
    if (!selectedPiece) return;

    const newBoard = [...puzzle.board];
    const newPlacedPieces = new Set(placedPieces);

    if (isValidPlacement(newBoard, selectedPiece, row, col)) {
      selectedPiece.shape.forEach((shapeRow, r) => {
        shapeRow.forEach((cell, c) => {
          if (cell) {
            newBoard[row + r][col + c] = selectedPiece.id;
          }
        });
      });

      newPlacedPieces.add(selectedPiece.id);

      setPuzzle((prev) => ({
        ...prev,
        board: newBoard,
      }));
      setPlacedPieces(newPlacedPieces);
      setSelectedPiece(null);
    }
  };

  const removePiece = (row: number, col: number) => {
    // TODO: this function has bug that sets wrong blocking cells
    const pieceId = puzzle.board[row][col];
    if (pieceId < 0) return;

    const newBoard = puzzle.board.map((row) => [...row]);
    const newPlacedPieces = new Set(placedPieces);

    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        if (newBoard[i][j] === pieceId) {
          newBoard[i][j] = -1;
        }
      }
    }

    newPlacedPieces.delete(pieceId);

    setPuzzle((prev) => ({
      ...prev,
      board: newBoard,
    }));
    setPlacedPieces(newPlacedPieces);
  };

  const handleRotate = () => {
    if (selectedPiece) {
      const rotatedPiece = {
        ...selectedPiece,
        shape: rotatePiece(selectedPiece.shape),
      };
      setSelectedPiece(rotatedPiece);
      setPuzzle((prev) => ({
        ...prev,
        pieces: prev.pieces.map((p) =>
          p.id === rotatedPiece.id ? rotatedPiece : p
        ),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <Calendar className="mr-2" /> A Puzzle a Day
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <PuzzleBoard board={puzzle.board} onCellClick={handleCellClick} />
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              removeMode ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setRemoveMode(!removeMode)}
          >
            <Trash2 className="inline-block mr-2" /> Remove Piece
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleRotate}
            disabled={!selectedPiece}
          >
            <RotateCw className="inline-block mr-2" /> Rotate Piece
          </button>
        </div>
        <PieceSelector
          pieces={puzzle.pieces.filter((p) => !placedPieces.has(p.id))}
          selectedPiece={selectedPiece}
          onPieceSelect={handlePieceSelect}
        />
      </div>
      <div className="mt-4 flex items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setCurrentDate(new Date())}
        >
          Today's Puzzle
        </button>
        <p className="text-lg font-semibold">
          {currentDate.toLocaleDateString()}
        </p>
      </div>
      {placedPieces.size === puzzle.pieces.length && (
        <div className="mt-4 text-green-600 flex items-center">
          <Check className="mr-2" /> Puzzle Completed!
        </div>
      )}
    </div>
  );
}

export default App;
