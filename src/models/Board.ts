import { Cell } from "./Cell";
import { colors } from "./Colors";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Figure, FigureNames } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  whiteBeatenFigures: Figure[] = [];
  blackBeatenFigures: Figure[] = [];

  initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new Cell(this, j, i, colors.WHITE, null));
        } else {
          row.push(new Cell(this, j, i, colors.BLACK, null));
        }
      }
      this.cells.push(row);
    }
  }

  highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const targetCell = row[j];

        targetCell.available = !!selectedCell?.figure?.canMove(targetCell);
      }
    }
  }

  getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.whiteBeatenFigures = this.whiteBeatenFigures;
    newBoard.blackBeatenFigures = this.blackBeatenFigures;
    return newBoard;
  }

  getCell(x: number, y: number) {
    return this.cells[y][x];
  }
  private addKings() {
    new King(colors.WHITE, this.getCell(4, 7));
    new King(colors.BLACK, this.getCell(4, 0));
  }
  private addQueens() {
    new Queen(colors.WHITE, this.getCell(3, 7));
    new Queen(colors.BLACK, this.getCell(3, 0));
  }
  private addBishops() {
    new Bishop(colors.WHITE, this.getCell(2, 7));
    new Bishop(colors.WHITE, this.getCell(5, 7));
    new Bishop(colors.BLACK, this.getCell(2, 0));
    new Bishop(colors.BLACK, this.getCell(5, 0));
  }
  private addKnights() {
    new Knight(colors.WHITE, this.getCell(1, 7));
    new Knight(colors.WHITE, this.getCell(6, 7));
    new Knight(colors.BLACK, this.getCell(1, 0));
    new Knight(colors.BLACK, this.getCell(6, 0));
  }
  private addRooks() {
    new Rook(colors.WHITE, this.getCell(0, 7));
    new Rook(colors.WHITE, this.getCell(7, 7));
    new Rook(colors.BLACK, this.getCell(0, 0));
    new Rook(colors.BLACK, this.getCell(7, 0));
  }
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(colors.WHITE, this.getCell(i, 6));
      new Pawn(colors.BLACK, this.getCell(i, 1));
    }
  }

  addFigures() {
    this.addKings();
    this.addQueens();
    this.addBishops();
    this.addKnights();
    this.addRooks();
    this.addPawns();
    this.addPawns();
  }
  addBeatedFigure(figure: Figure) {
    if (figure.color === colors.WHITE) {
      this.whiteBeatenFigures.push(figure);
    } else {
      this.blackBeatenFigures.push(figure);
    }
  }
}
