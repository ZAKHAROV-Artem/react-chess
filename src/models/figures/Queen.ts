import { colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import { Cell } from "./../Cell";
const black = require("../../assets/img/black-queen.png");
const white = require("../../assets/img/white-queen.png");
export class Queen extends Figure {
  constructor(color: colors, cell: Cell) {
    super(color, cell);
    this.image = color === "white" ? white : black;
    this.name = FigureNames.QUEEN;
  }

  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    return this.figureMove(targetCell);
  }
  figureMove(targetCell: Cell): boolean {
    if (this.cell.isEmptyVertical(targetCell)) return true;
    if (this.cell.isEmptyHorizontal(targetCell)) return true;
    if (this.cell.isEmptyDiagonal(targetCell)) return true;
    return false;
  }
}
