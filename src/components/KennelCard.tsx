import React from "react";
import { cn } from "../lib/utils";
import { Kennel, Dog } from "../types/types";
import DogCard from "./DogCard";

interface KennelCardProps {
  kennel: Kennel;
  dogsInKennel: Dog[];
}

const KennelCard: React.FC<KennelCardProps> = ({ kennel, dogsInKennel }) => {
  const capacityStatus = `(${dogsInKennel.length}/${kennel.capacity})`;
  const isFull = dogsInKennel.length >= kennel.capacity;

  return (
    <div
      className={cn(
        "bg-green-50 border border-green-200 p-4 rounded-lg",
        "shadow hover:shadow-lg transition-shadow duration-200",
        "flex flex-col space-y-2",
        {
          "border-red-300 bg-red-50": isFull,
        }
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-800">{kennel.name}</h3>
        <span
          className={cn("text-sm font-medium", {
            "text-red-600": isFull,
            "text-gray-600": !isFull,
          })}
        >
          Capacity: {capacityStatus}
        </span>
      </div>
      <div className="min-h-[50px] bg-white/50 p-2 rounded border border-dashed border-gray-300 space-y-2 flex-grow">
        {dogsInKennel.length > 0 ? (
          dogsInKennel.map((dog) => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <p className="text-xs text-gray-400 text-center py-2">Empty Kennel</p>
        )}
      </div>
    </div>
  );
};

export default KennelCard;
