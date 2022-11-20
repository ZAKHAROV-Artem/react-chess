import { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface BeatenFiguresProps {
  figures: Figure[] | null;
  player: number;
}

const BeatenFigures: FC<BeatenFiguresProps> = ({ figures, player }) => {
  return (
    <div>
      <h3 className="mt-5 text-white title-sm">
        <span className="uppercase  font-bold">
          {player === 0 ? "white" : "black"}
        </span>{" "}
        lost figures
      </h3>
      <div className="flex flex-wrap">
        {figures?.map((figure) => (
          <div
            className="mr-3 mt-3 text-white flex items-center justify-center"
            key={figure.id}
          >
            <div className="ml-2 p-1 rounded-md bg-white">
              <img
                src={figure.image?.toString()}
                alt={`${figure.name} figure`}
                className="icon"
              />
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default BeatenFigures;
