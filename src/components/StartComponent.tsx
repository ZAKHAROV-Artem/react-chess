import React, { FC, useState } from "react";
import SelectTimeItem from "../UI/SelectTimeItem";

interface startComponentProps {
  setGameStarted: (isGameStarted: boolean) => void;
}

const StartComponent: FC<startComponentProps> = ({ setGameStarted }) => {
  const [selectedTime, setSelectedTime] = useState<number>(0);

  const handleStartWithTimer = () => {
    if (selectedTime === 0) {
      return alert("Select time, please");
    }
    setGameStarted(true);
  };

  return (
    <div className="mb-3 bar flex flex-col px-3 py-4">
      <div className="grid grid-cols-3 gap-2">
        <SelectTimeItem
          isSelected={selectedTime === 5}
          time={5}
          setSelectedTime={setSelectedTime}
        />
        <SelectTimeItem
          isSelected={selectedTime === 15}
          time={15}
          setSelectedTime={setSelectedTime}
        />
        <SelectTimeItem
          isSelected={selectedTime === 30}
          time={30}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <button
        className="px-3 py-2 text-white bg-blue-600 rounded-md"
        onClick={() => handleStartWithTimer()}
      >
        Start game with timer
      </button>
      <button
        className="mt-3 px-3 py-2 text-white bg-blue-600 rounded-md"
        onClick={() => setGameStarted(true)}
      >
        Start game without timer
      </button>
    </div>
  );
};

export default StartComponent;
