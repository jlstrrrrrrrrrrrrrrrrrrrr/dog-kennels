import React from "react";
import { Dog } from "../types/types";
import DogCard from "./DogCard";

interface DogListProps {
  dogs: Dog[];
}

const DogList: React.FC<DogListProps> = ({ dogs }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Unassigned dogs</h2>
      {dogs.length === 0 ? (
        <p className="text-gray-500">No unassigned dogs.</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto p-1">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogList;
