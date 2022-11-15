import { Cell } from "../Cell";
import { colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
const black = require("../../assets/img/black-rook.png");
const white = require("../../assets/img/white-rook.png");
export class Rook extends Figure {
  isMoved: boolean = false;
  constructor(color: colors, cell: Cell) {
    super(color, cell);
    this.image = color === "white" ? white : black;
    this.name = FigureNames.ROOK;
  }
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    return this.figureMove(targetCell);
  }

  figureMove(targetCell: Cell): boolean {
    if (this.cell.isEmptyVertical(targetCell)) return true;
    if (this.cell.isEmptyHorizontal(targetCell)) return true;

    return false;
  }

  moveFigure(targetCell: Cell) {
    super.moveFigure(targetCell);
    this.isMoved = true;
  }
}
