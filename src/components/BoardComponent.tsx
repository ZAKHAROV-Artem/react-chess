import { Fragment, FC, useState, useEffect } from "react";
import { Board } from "./../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "./../models/Cell";
import { Player } from "./../models/Player";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;

  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,

  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function selectCell(targetCell: Cell) {
    if (
      selectedCell &&
      selectedCell !== targetCell &&
      selectedCell.figure?.canMove(targetCell)
    ) {
      selectedCell.moveFigure(targetCell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (
        targetCell.figure !== null &&
        targetCell.figure.color === currentPlayer?.color
      ) {
        setSelectedCell(selectedCell === targetCell ? null : targetCell);
      }
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className="board">
      {board.cells.map((row, i) => (
        <Fragment key={i}>
          {row.map((cell) => (
            <CellComponent
              selectCell={selectCell}
              cell={cell}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
              key={cell.id}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
