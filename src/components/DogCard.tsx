import React from "react";
import { Dog } from "../types/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../lib/utils";
import { useEditContext } from "../context/EditContext";

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = React.memo(({ dog }) => {
  const { isEditing } = useEditContext();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: dog.id,
      data: { dog }
    });

  const transformStyles = transform
    ? {
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 100 : undefined
      }
    : {
        zIndex: isDragging ? 100 : undefined
      };

  return (
    <div
      ref={setNodeRef}
      style={transformStyles}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-default rounded-lg border border-blue-200 bg-blue-50 p-3 shadow transition-shadow duration-200 hover:shadow-md",
        {
          "scale-105 opacity-75 shadow-xl ring-4 ring-blue-400": isDragging,
          "edit-mode-indicator cursor-grab": isEditing
        }
      )}
    >
      <h3 className="text-md font-semibold text-blue-800">{dog.name}</h3>
      <p className="text-xs text-gray-600">Chip: {dog.chipNumber}</p>
    </div>
  );
});

export default DogCard;
