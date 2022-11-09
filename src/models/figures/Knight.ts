import { Cell } from "../Cell";
import { colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
const black = require("../../assets/img/black-knight.png");
const white = require("../../assets/img/white-knight.png");
export class Knight extends Figure {
  constructor(color: colors, cell: Cell) {
    super(color, cell);
    this.image = color === "white" ? white : black;
    this.name = FigureNames.KNIGHT;
  }
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;

    const dx = Math.abs(targetCell.x - this.cell.x); //1
    const dy = Math.abs(targetCell.y - this.cell.y); //2

    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  }
}
