import React from "react";
import { Dog } from "../types/types";

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-grab">
      <h3 className="text-md font-semibold text-blue-800">{dog.name}</h3>
      <p className="text-xs text-gray-600">Chip: {dog.chipNumber}</p>
    </div>
  );
};

export default DogCard;
