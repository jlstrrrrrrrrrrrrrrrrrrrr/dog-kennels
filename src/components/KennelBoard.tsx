import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Dog, Kennel } from "../types/types";
import DogList, { UNASSIGNED_AREA_ID } from "./DogList";
import KennelGrid from "./KennelGrid";
import ControlPanel from "./ControlPanel";
import DogCard from "./DogCard";

const KennelBoard = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [kennels, setKennels] = useState<Kennel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDog, setActiveDog] = useState<Dog | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchKennelData = async () => {
      try {
        // simulate api call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // import mock json data
        const kennelData = await import("../data/data.json");

        setDogs(kennelData.dogs);
        setKennels(kennelData.kennels);
      } catch (err) {
        setError("Failed to fetch kennel data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKennelData();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const dog = dogs.find((dog) => dog.id === active.id);

    if (dog) {
      setActiveDog(dog);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDog(null);

    const { active, over } = event;

    // if we have something dragged + a valid and activated drop target container
    if (active && over) {
      const dogId = active.id as string;
      const destinationId = over.id as string;

      const targetKennel = kennels.find(
        (kennel) => kennel.id === destinationId
      );

      const dogsInTargetKennel = targetKennel
        ? dogs.filter((dog) => dog.kennelId === destinationId).length
        : 0;

      const currentDog = dogs.find((dog) => dog.id === dogId);

      // prevent drop if already in the same kennel
      if (
        currentDog?.kennelId === destinationId &&
        destinationId !== UNASSIGNED_AREA_ID
      ) {
        return;
      }

      // also prevent drop in case we both drag and drop happens in the unassigned area
      if (
        currentDog?.kennelId === null &&
        destinationId === UNASSIGNED_AREA_ID
      ) {
        return;
      }

      // also prevent drop if kennel is full
      if (targetKennel && dogsInTargetKennel >= targetKennel.capacity) {
        console.warn(`${targetKennel.name} is full.`);
        return;
      }

      setDogs((prevDogs) =>
        prevDogs.map((dog) =>
          dog.id === dogId
            ? {
                ...dog,
                kennelId:
                  destinationId === UNASSIGNED_AREA_ID ? null : destinationId
              }
            : dog
        )
      );
    }
  };

  const handleDragCancel = () => {
    setActiveDog(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading kennel data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="flex flex-1 flex-col space-y-4 bg-gray-200 p-4">
        <header className="rounded-lg bg-white shadow">
          <ControlPanel />
        </header>

        <div className="flex flex-grow flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <aside className="w-full rounded-lg bg-white p-4 shadow md:w-1/3">
            <DogList dogs={dogs.filter((dog) => !dog.kennelId)} />
          </aside>
          <main className="w-full rounded-lg bg-white p-4 shadow md:w-2/3">
            <KennelGrid kennels={kennels} dogs={dogs} />
          </main>
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeDog ? <DogCard dog={activeDog} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KennelBoard;
