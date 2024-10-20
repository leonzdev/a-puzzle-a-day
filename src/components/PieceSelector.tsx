import React from 'react';
import { Piece } from '../types';

interface PieceSelectorProps {
  pieces: Piece[];
  selectedPiece: Piece | null;
  onPieceSelect: (piece: Piece) => void;
}

const PieceSelector: React.FC<PieceSelectorProps> = ({
  pieces,
  selectedPiece,
  onPieceSelect,
}) => {
  const colors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-indigo-200',
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`cursor-pointer p-2 rounded ${
            selectedPiece?.id === piece.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onPieceSelect(piece)}
        >
          <div className="grid grid-cols-3 gap-1">
            {piece.shape.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-6 h-6 ${
                    cell ? colors[piece.id] : 'bg-transparent'
                  }`}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div> 
    )
}

export default PieceSelector