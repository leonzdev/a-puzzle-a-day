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
    [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
    ],
    [    
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
  ]


  const getMonthAndDate = (rowIndex: number, colIndex: number): string => {
    if (board[rowIndex][colIndex] !== -2) {
      return ''
    }
    if (rowIndex <= 1) {
      return months[rowIndex][colIndex]
    }
    return ((rowIndex - 2) * 7 + colIndex + 1).toString();
  };

  return (
    <div className="text-center">
      <div className="inline-grid grid-cols-7 gap-1 mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {

            return <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 border ${
                cell === -1
                  ? 'bg-gray-300 cursor-pointer'
                  : cell === -2
                  ? 'bg-gray-100'
                  : colors[cell] || 'bg-white'
              } flex items-center justify-center text-sm font-semibold`}
              onClick={board[rowIndex][colIndex] === null ? () => null : () => onCellClick(rowIndex, colIndex)}
            >
              {getMonthAndDate(rowIndex, colIndex)}
            </div>
        })
        )}
      </div>
    </div>
  );
};

export default PuzzleBoard;
