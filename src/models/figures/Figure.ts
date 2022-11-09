import { colors } from "../Colors";
import { Cell } from "./../Cell";

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
    this.id = Date.now();
    this.cell.figure = this;
  }

  canMove(targetCell: Cell): boolean {
    if (targetCell.figure?.color === this.color) return false;
    if (targetCell.figure?.name === "KING") return false;
    if (!targetCell.isEmptyVertical(targetCell)) return false;
    return true;
  }

  moveFigure(targetCell: Cell) {}
}
