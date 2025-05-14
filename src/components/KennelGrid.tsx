import React from "react";
import { Kennel, Dog } from "../types/types";
import KennelCard from "./KennelCard";

interface KennelGridProps {
  kennels: Kennel[];
  dogs: Dog[];
}

const KennelGrid: React.FC<KennelGridProps> = ({ kennels, dogs }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Kennels</h2>
      {kennels.length === 0 ? (
        <p className="text-gray-500">No kennels available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kennels.map((kennel) => {
            const dogsInKennel = dogs.filter(
              (dog) => dog.kennelId === kennel.id
            );
            return (
              <KennelCard
                key={kennel.id}
                kennel={kennel}
                dogsInKennel={dogsInKennel}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KennelGrid;
