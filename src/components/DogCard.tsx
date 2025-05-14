import React from "react";
import { Dog } from "../types/types";

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <div className="cursor-grab rounded-lg border border-blue-200 bg-blue-50 p-3 shadow transition-shadow duration-200 hover:shadow-md">
      <h3 className="text-md font-semibold text-blue-800">{dog.name}</h3>
      <p className="text-xs text-gray-600">Chip: {dog.chipNumber}</p>
    </div>
  );
};

export default DogCard;
