import { FC } from "react";

interface SelectTimeItemProps {
  isSelected: boolean;
  time: number;
  setSelectedTime: (time: number) => void;
}

const SelectTimeItem: FC<SelectTimeItemProps> = ({
  isSelected,
  time,
  setSelectedTime,
}) => {
  return (
    <div
      className={`px-2 py-1 rounded-md mb-2 font-thin hover:bg-blue-600 hover:text-white duration-300 ${
        isSelected ? "bg-blue-600 text-white" : "bg-white"
      }`}
      onClick={(e) => setSelectedTime(time)}
    >
      {time} min
    </div>
  );
};

export default SelectTimeItem;
