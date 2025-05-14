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
        "rounded-lg border border-green-200 bg-green-50 p-4",
        "shadow transition-shadow duration-200 hover:shadow-lg",
        "flex flex-col space-y-2",
        {
          "border-red-300 bg-red-50": isFull
        }
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-green-800">{kennel.name}</h3>
        <span
          className={cn("text-sm font-medium", {
            "text-red-600": isFull,
            "text-gray-600": !isFull
          })}
        >
          Capacity: {capacityStatus}
        </span>
      </div>
      <div className="min-h-[50px] flex-grow space-y-2 rounded border border-dashed border-gray-300 bg-white/50 p-2">
        {dogsInKennel.length > 0 ? (
          dogsInKennel.map((dog) => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <p className="py-2 text-center text-xs text-gray-400">Empty Kennel</p>
        )}
      </div>
    </div>
  );
};

export default KennelCard;
