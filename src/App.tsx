import { useState, useEffect } from 'react';
import { Calendar, Check, RotateCw, Trash2, Lightbulb, FlipHorizontal } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PuzzleBoard from './components/PuzzleBoard';
import PieceSelector from './components/PieceSelector';
import { generatePuzzle } from './utils/puzzleGenerator';
import { solvePuzzle } from './utils/puzzleSolver';
import { Board, Piece, PuzzleState } from './types';
import { placePiece, removePiece, rotatePiece, flipPiece } from './utils/pieceUtils';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [puzzle, setPuzzle] = useState<PuzzleState>({ board: [], pieces: [] });
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [placedPieces, setPlacedPieces] = useState<Set<number>>(new Set());
  const [solutions, setSolutions] = useState<Board[]>([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(-1);
  const [isSolving, setIsSolving] = useState(false);

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
      handleRemovePiece(row, col);
    } else if (selectedPiece) {
      handlePlacePiece(row, col);
    }
  };

  const handlePlacePiece = (row: number, col: number) => {
    if (!selectedPiece) return;

    const newBoard = [...puzzle.board];
    const newPlacedPieces = new Set(placedPieces);
    if (placePiece(newBoard, selectedPiece, row, col)) {
      newPlacedPieces.add(selectedPiece.id);

      setPuzzle((prev) => ({
        ...prev,
        board: newBoard,
      }));
      setPlacedPieces(newPlacedPieces);
      setSelectedPiece(null);
    }
  };

  const handleRemovePiece = (row: number, col: number) => {
    const pieceId = puzzle.board[row][col];
    if (pieceId == null || pieceId < 0) return;

    const newBoard = puzzle.board.map((row) => [...row]);
    const newPlacedPieces = new Set(placedPieces);

    removePiece(newBoard, pieceId)
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

  const handleFlip = () => {
    if (!selectedPiece) return;
    // console.log(getAllVariants(selectedPiece))
    const flippedPiece = {
      ...selectedPiece,
      shape: flipPiece(selectedPiece.shape)
    }
    setSelectedPiece(flippedPiece);
    setPuzzle((prev) => ({
      ...prev,
      pieces: prev.pieces.map((p) =>
        p.id === flippedPiece.id ? flippedPiece : p
      ),
    }));
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    // Also clear solutions
    setSolutions([]);
    setCurrentSolutionIndex(-1);
  };

  const handleSolve = () => {
    handleSolveAsync()
  }

  const getPrecalculatedSolutions = async (): Promise<Board[]> => {
    try {
      const solutionsUrl = `solutions/${currentDate.getMonth()}_${currentDate.getDate()}.json`;
      console.log("Fetch precalculated solutions")
      const response = await fetch(solutionsUrl);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to parse response");
      }
    } catch (error) {
      console.error("Failed to fetch precalculated solutions. " + error);
      return []
    }
  }

  const handleSolveAsync = async () => {
    if (solutions.length === 0) {
      setIsSolving(true);
      // try to get precalculated solutions
      let newSolutions: Board[] = await getPrecalculatedSolutions();
      if (newSolutions.length === 0) {
        newSolutions = solvePuzzle(generatePuzzle(currentDate));
      }

      // const newSolutions = solvePuzzle(generatePuzzle(currentDate));
      if (newSolutions.length > 0) {
        setPuzzle((prev) => ({
          ...prev,
          board: newSolutions[0],
        }));
        setPlacedPieces(new Set([0, 1, 2, 3, 4, 5, 6, 7]));
      }
      setSolutions(newSolutions);
      setCurrentSolutionIndex(0);
    } else {
      const nextIndex = (currentSolutionIndex + 1) % solutions.length
      setPuzzle((prev) => ({
        ...prev,
        board: solutions[nextIndex],
      }));
      setPlacedPieces(new Set([0, 1, 2, 3, 4, 5, 6, 7]));
      setCurrentSolutionIndex(nextIndex);
    }
    setIsSolving(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <Calendar className="mr-2" /> A Puzzle a Day
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <PuzzleBoard 
          board={puzzle.board} 
          onCellClick={handleCellClick}
        />
        <div className="flex justify-center space-x-4 mb-4">
          {solutions.length == 0 && !isSolving && (
            <button
              className={`px-4 py-2 rounded ${
                removeMode
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:opacity-90`}
              onClick={() => setRemoveMode(!removeMode)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          {solutions.length == 0 && !isSolving && (
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-90 disabled:opacity-50"
              onClick={handleRotate}
              disabled={!selectedPiece}
            >
              <RotateCw className="w-5 h-5" />
            </button>
          )}
          {solutions.length == 0 && !isSolving && (
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-90 disabled:opacity-50"
              onClick={handleFlip}
              disabled={!selectedPiece}
            >
              <FlipHorizontal className="w-5 h-5" />
            </button>
          )}
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:opacity-90"
            onClick={handleSolve}
            disabled={isSolving}
          >
            <Lightbulb className="w-5 h-5" /> 
            {solutions.length === 0 ? '' : `${currentSolutionIndex + 1}/${solutions.length}`}
          </button>
        </div>
        <PieceSelector
          pieces={puzzle.pieces.filter((p) => !placedPieces.has(p.id))}
          selectedPiece={selectedPiece}
          onPieceSelect={handlePieceSelect}
        />
      </div>
      <div className="mt-4 flex items-center">
        <DatePicker
          selected={currentDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          className="bg-white border border-gray-300 rounded px-3 py-2 mr-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => handleDateChange(new Date())}
        >
          Today's Puzzle
        </button>
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
