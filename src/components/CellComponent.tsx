import { FC, useEffect, useState } from "react";
import { FigureNames } from "../models/figures/Figure";
import { Cell } from "./../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  selectCell: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, selectCell }) => {
  return (
    <div
      className={`cell ${cell.color} ${selected && "selected"} ${
        cell.available && cell.figure && "avalibeToAttack"
      } ${cell.isUnderAttack ? "kingUnderAttack" : ""}`}
      onClick={(e) => selectCell(cell)}
    >
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.image && <img src={cell.figure.image} alt="figure" />}
    </div>
  );
};

export default CellComponent;
