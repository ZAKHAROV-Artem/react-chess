import { FC } from "react";
import { Player } from "../models/Player";
import ReferenceComponent from "./ReferenceComponent";
import { Board } from "./../models/Board";
import BeatenFigures from "./BeatenFigures";

interface GamebarComponentProps {
  currentPlayer: Player | null;
  board: Board;
}

const GamebarComponent: FC<GamebarComponentProps> = ({
  currentPlayer,
  board,
}) => {
  return (
    <div className="">
      <div className="bar game-bar mb-3">
        <div className="text-white text-2xl title">
          Current move <span className="uppercase">{currentPlayer?.color}</span>
        </div>

        <div className="grid grid-cols-2">
          <BeatenFigures figures={board.whiteBeatenFigures} player={0} />
          <BeatenFigures figures={board.blackBeatenFigures} player={1} />
        </div>
      </div>
      <ReferenceComponent />
    </div>
  );
};

export default GamebarComponent;
