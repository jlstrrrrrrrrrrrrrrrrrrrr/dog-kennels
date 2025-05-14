import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "../lib/utils";
import { Dog } from "../types/types";
import DogCard from "./DogCard";

interface DogListProps {
  dogs: Dog[];
}

export const UNASSIGNED_AREA_ID = "unassigned-dogs-drop-area"; // this area has different drag and drop rules than the kennels

const DogList: React.FC<DogListProps> = ({ dogs }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: UNASSIGNED_AREA_ID,
    data: { type: "unassigned-area" }
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("space-y-4 rounded-md p-2", {
        "bg-yellow-100 ring-2 ring-yellow-400": isOver
      })}
    >
      <h2 className="text-xl font-semibold text-gray-700">Unassigned dogs</h2>
      {dogs.length === 0 ? (
        <p className="p-4 text-center text-gray-500">
          {isOver ? "Drop dog here to unassign" : "No unassigned dogs."}
        </p>
      ) : (
        <div className="space-y-3 p-1">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogList;
