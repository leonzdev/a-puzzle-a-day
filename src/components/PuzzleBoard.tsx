import React from 'react';

interface PuzzleBoardProps {
  board: number[][];
  onCellClick: (row: number, col: number) => void;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ board, onCellClick }) => {
  const colors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-indigo-200',
  ];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getMonthAndDate = (rowIndex: number, colIndex: number): string => {
    if (rowIndex === 0 && colIndex < 6) {
      return months[colIndex];
    } else if (rowIndex === 0 && colIndex === 6) {
      return months[6];
    } else if (rowIndex === 1 && colIndex === 0) {
      return months[7];
    } else if (rowIndex > 0 && board[rowIndex][colIndex] === -2) {
      return ((rowIndex - 1) * 7 + colIndex + 1).toString();
    }
    return '';
  };

  return (
    <div className="grid grid-cols-7 gap-1 mb-4">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-12 h-12 border ${
              cell === -1
                ? 'bg-gray-300'
                : cell === -2
                ? 'bg-gray-100'
                : colors[cell] || 'bg-white'
            } cursor-pointer flex items-center justify-center text-sm font-semibold`}
            onClick={() => onCellClick(rowIndex, colIndex)}
          >
            {getMonthAndDate(rowIndex, colIndex)}
          </div>
        ))
      )}
    </div>
  );
};

export default PuzzleBoard;
