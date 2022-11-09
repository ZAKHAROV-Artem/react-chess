import { Cell } from "../Cell";
import { colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
const black = require("../../assets/img/black-bishop.png");
const white = require("../../assets/img/white-bishop.png");
export class Bishop extends Figure {
  constructor(color: colors, cell: Cell) {
    super(color, cell);
    this.image = color === "white" ? white : black;
    this.name = FigureNames.BISHOP;
  }
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (this.cell.isEmptyDiagonal(targetCell)) return true;
    return false;
  }
}
