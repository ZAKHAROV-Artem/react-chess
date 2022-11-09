import { timeStamp } from "console";
import { Cell } from "../Cell";
import { colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

const black = require("../../assets/img/black-king.png");
const white = require("../../assets/img/white-king.png");
export class King extends Figure {
  constructor(color: colors, cell: Cell) {
    super(color, cell);
    this.image = color === "white" ? white : black;
    this.name = FigureNames.KING;
  }

  canMove(targetCell: Cell): boolean {
    const absX = Math.abs(targetCell.x - this.cell.x);
    const absY = Math.abs(targetCell.y - this.cell.y);
    if (!super.canMove(targetCell)) return false;
    if ((absX === 1 && absY === 0) || (absX === 0 && absY === 1)) return true;
    if (absX === 1 && absY === 1) return true;

    return false;
  }
}
