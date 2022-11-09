import { Figure, FigureNames } from "./figures/Figure";
import { Board } from "./Board";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: string;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: string;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: string,
    figure: Figure | null
  ) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = `${x}${y}`;
  }
  isEmpty(): boolean {
    return this.figure === null;
  }
  isEnemy(targetCell: Cell): boolean {
    if (targetCell.figure) {
      return this.figure?.color !== targetCell.figure?.color;
    }
    return false;
  }
  isEmptyHorizontal(targetCell: Cell): boolean {
    if (this.y !== targetCell.y) return false;

    const min = Math.min(this.x, targetCell.x);
    const max = Math.max(this.x, targetCell.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCells(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyVertical(targetCell: Cell): boolean {
    if (this.x !== targetCell.x) return false;

    const min = Math.min(this.y, targetCell.y);
    const max = Math.max(this.y, targetCell.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCells(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyDiagonal(targetCell: Cell): boolean {
    const absX = Math.abs(targetCell.x - this.x);
    const absY = Math.abs(targetCell.y - this.y);
    if (absY !== absX) return false;

    const dy = this.y < targetCell.y ? 1 : -1;
    const dx = this.x < targetCell.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCells(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }

  changeFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(targetCell: Cell) {
    if (this.figure?.canMove(targetCell)) {
      this.figure.moveFigure(targetCell);
      targetCell.changeFigure(this.figure);
      this.figure = null;
    }
  }
}
