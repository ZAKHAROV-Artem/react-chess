import { Figure, FigureNames } from "./figures/Figure";
import { Board } from "./Board";
import { colors } from "./Colors";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: string;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: string;
  isUnderAttack: boolean = false;

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
      if (!this.board.getCell(x, this.y).isEmpty()) {
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
      if (!this.board.getCell(this.x, y).isEmpty()) {
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
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }

  changeFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  isMoveBeat(targetCell: Cell) {
    if (
      !targetCell.isEmpty() &&
      this.isEnemy(targetCell) &&
      targetCell.figure !== null
    ) {
      this.board.addBeatedFigure(targetCell.figure);
    }
  }

  private kingMove(targetCell: Cell) {
    const absX = Math.abs(targetCell.x - this.x) - 1;
    if (absX === 3 || absX === 2) {
      const kingMoveCell = this.board.getCell(
        absX === 3 ? targetCell.x + 2 : targetCell.x - 1,
        this.y
      );
      const rookMoveCell = this.board.getCell(
        absX === 3 ? this.x - 1 : this.x + 1,
        this.y
      );
      this.move(this.figure, kingMoveCell);
      this.figure = null;
      if (targetCell.figure) {
        this.move(targetCell.figure, rookMoveCell);
        targetCell.figure = null;
      }
    } else {
      this.move(this.figure, targetCell);
      this.figure = null;
    }
  }

  move(figure: Figure | null, targetCell: Cell) {
    if (!figure) return;
    figure.moveFigure(targetCell);
    targetCell.changeFigure(figure);
  }
  findKingCell(kingColorToCheck: string): Cell | null {
    for (let i = 0; i < this.board.cells.length; i++) {
      const row = this.board.cells[i];
      for (let j = 0; j < row.length; j++) {
        const probablyKingCell = row[j];
        if (
          probablyKingCell.figure?.name === FigureNames.KING &&
          probablyKingCell.figure.color === kingColorToCheck
        ) {
          return probablyKingCell;
        }
      }
    }
    return null;
  }
  isKingUnderAttack(kingCell: Cell | null) {
    if (kingCell === null) return false;
    for (let i = 0; i < this.board.cells.length; i++) {
      const row = this.board.cells[i];
      for (let j = 0; j < row.length; j++) {
        const probablyAttackFrom = row[j];
        if (probablyAttackFrom.figure?.color !== kingCell.figure?.color) {
          const isAttacked = !!probablyAttackFrom?.figure?.figureMove(kingCell);
          if (isAttacked) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isCellUnderAttack(vitcimCell: Cell, moveFrom: Cell): boolean {
    for (let i = 0; i < this.board.cells.length; i++) {
      const row = this.board.cells[i];
      for (let j = 0; j < row.length; j++) {
        const probablyAttackFrom = row[j];
        if (probablyAttackFrom.figure?.color !== moveFrom.figure?.color) {
          const isAttacked =
            !!probablyAttackFrom?.figure?.figureMove(vitcimCell);
          if (isAttacked) {
            console.log("Can attack from", probablyAttackFrom);
            return true;
          }
        }
      }
    }
    return false;
  }

  changeIsKingUnderAttack(kingCell: Cell) {
    if (this.isKingUnderAttack(kingCell)) {
      kingCell.isUnderAttack = true;
    } else {
      kingCell.isUnderAttack = false;
      this.isUnderAttack = false;
    }
  }

  moveFigure(targetCell: Cell) {
    if (this.figure && this.figure.canMove(targetCell)) {
      this.isMoveBeat(targetCell);
      if (this.figure.name === FigureNames.KING) {
        this.kingMove(targetCell);
      } else {
        this.move(this.figure, targetCell);
        this.figure = null;
      }

      const enemyKingColor: string =
        targetCell.figure?.color === colors.WHITE ? colors.BLACK : colors.WHITE;
      const ownKingColor: string =
        targetCell.figure?.color === colors.WHITE ? colors.WHITE : colors.BLACK;

      const enemyKingCell = this.findKingCell(enemyKingColor);
      const ownKingCell = this.findKingCell(ownKingColor);

      if (enemyKingCell) {
        this.changeIsKingUnderAttack(enemyKingCell);
      }
      if (ownKingCell) {
        this.changeIsKingUnderAttack(ownKingCell);
      }
    }
  }
}
