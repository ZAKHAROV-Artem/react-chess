import { Cell } from "../Cell";
import { colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

const black = require("../../assets/img/black-king.png");
const white = require("../../assets/img/white-king.png");
export class King extends Figure {
  isCanСastling: boolean = true;
  isUnderAttack: boolean = false;
  constructor(color: colors, cell: Cell) {
    super(color, cell);
    this.image = color === "white" ? white : black;
    this.name = FigureNames.KING;
  }

  canMove(targetCell: Cell): boolean {
    if (this.castling(targetCell)) return true;
    if (!super.canMove(targetCell)) return false;

    return this.figureMove(targetCell) ? true : false;
  }
  figureMove(targetCell: Cell): boolean {
    return this.simpleMove(targetCell);
  }
  private simpleMove(targetCell: Cell): boolean {
    const absX = Math.abs(targetCell.x - this.cell.x);
    const absY = Math.abs(targetCell.y - this.cell.y);
    if (absX + absY === 1) {
      if (this.cell.isCellUnderAttack(targetCell, this.cell)) {
        console.log("Cell is under attack", targetCell);
        return false;
      }
      console.log(targetCell);
      return true;
    }
    if (absX === 1 && absY === 1) {
      if (this.cell.isCellUnderAttack(targetCell, this.cell)) {
        console.log("Cell is under attack", targetCell);
        return false;
      }
      console.log(targetCell);
      return true;
    }
    return false;
  }
  castling(targetCell: Cell): boolean {
    if (
      this.isCanСastling &&
      targetCell.figure?.color === this.color &&
      targetCell.figure?.hasOwnProperty("isMoved")
    ) {
      if (this.cell.isKingUnderAttack(this.cell)) {
        console.log("Cell is under attack", targetCell);
        return false;
      }
      const values = Object.values(targetCell.figure);
      if (values[5]) {
        return false;
      }

      const isLeftRook = this.cell.x > targetCell.x;
      const xDifference = Math.abs(this.cell.x - targetCell.x) - 1;
      for (let i = 1; i <= xDifference; i++) {
        if (
          !this.cell.board
            .getCell(
              isLeftRook ? this.cell.x - i : this.cell.x + i,
              this.cell.y
            )
            .isEmpty()
        ) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  moveFigure(targetCell: Cell) {
    super.moveFigure(targetCell);
    this.isCanСastling = false;
  }
}
