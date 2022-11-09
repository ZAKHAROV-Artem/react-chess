import { Fragment, FC, useState, useEffect } from "react";
import { Board } from "./../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "./../models/Cell";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function selectCell(targetCell: Cell) {
    console.log(selectedCell, targetCell);
    if (
      selectedCell &&
      selectedCell !== targetCell &&
      selectedCell.figure?.canMove(targetCell)
    ) {
      console.log("moved");
      selectedCell.moveFigure(targetCell);
      setSelectedCell(null);
    } else {
      if (targetCell.figure !== null) {
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
