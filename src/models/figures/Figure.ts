import { colors } from "../Colors";
import { Cell } from "./../Cell";
import { King } from "./King";

export enum FigureNames {
  FIGURE = "",
  KING = "KING",
  QUEEN = "QUEEN",
  BISHOP = "BISHOP",
  KNIGHT = "KNIGHT",
  ROOK = "ROOK",
  PAWN = "PAWN",
}

export class Figure {
  color: string;
  image: string | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: string, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.image = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
    this.cell.figure = this;
  }

  canMove(targetCell: Cell): boolean {
    if (
      targetCell.figure?.color === this.color &&
      targetCell.figure?.name !== FigureNames.KING
    ) {
      return false;
    }

    if (targetCell.figure?.name === FigureNames.KING) return false;

    return true;
  }

  figureMove(targetCell: Cell) {}
  moveFigure(targetCell: Cell) {}
}
