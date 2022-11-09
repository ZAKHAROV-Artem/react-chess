import { Cell } from "../Cell";
import { colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
const black = require("../../assets/img/black-pawn.png");
const white = require("../../assets/img/white-pawn.png");
export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: colors, cell: Cell) {
    super(color, cell);
    this.image = color === "white" ? white : black;
    this.name = FigureNames.PAWN;
  }
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;

    const direction = this.color === colors.WHITE ? -1 : 1;
    const firstStepDirection = this.color === colors.WHITE ? -2 : 2;

    if (
      (targetCell.y === this.cell.y + direction ||
        (this.isFirstStep &&
          targetCell.y === this.cell.y + firstStepDirection)) &&
      targetCell.x === this.cell.x &&
      this.cell.board.getCells(targetCell.x, targetCell.y).isEmpty()
    ) {
      return true;
    }

    if (
      targetCell.y === this.cell.y + direction &&
      (targetCell.x === this.cell.x + 1 || targetCell.x === this.cell.x - 1) &&
      this.cell.isEnemy(targetCell)
    ) {
      return true;
    }

    return false;
  }

  moveFigure(targetCell: Cell) {
    super.moveFigure(targetCell);
    this.isFirstStep = false;
  }
}
