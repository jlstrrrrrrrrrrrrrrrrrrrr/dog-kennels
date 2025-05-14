import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  PointerSensor,
  MouseSensor,
  useSensors
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Dog, Kennel } from "../types/types";
import DogList, { UNASSIGNED_AREA_ID } from "./DogList";
import KennelGrid from "./KennelGrid";
import ControlPanel from "./ControlPanel";
import { EditContext } from "../context/EditContext";
import useFetchKennelData from "../hooks/useFetchKennelData";
import { LoadingSpinner } from "./LoadingSpinner";
import toast from "react-hot-toast";

const KennelBoard = () => {
  const { data, isLoading, error } = useFetchKennelData();

  const [dogs, setDogs] = useState<Dog[]>(data?.dogs || []);
  const [kennels, setKennels] = useState<Kennel[]>(data?.kennels || []);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<{
    dogs: Dog[];
    kennels: Kennel[];
  }>();

  const pointerSensor = useSensor(PointerSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(pointerSensor, mouseSensor);

  const unassignedDogs = useMemo(() => {
    return dogs.filter((dog) => !dog.kennelId);
  }, [dogs]);

  const startEditing = useCallback(() => {
    setSnapshot({ dogs, kennels }); // save snapshot before editing anything
    setIsEditing(true);
  }, [dogs, kennels]);

  const discardChanges = useCallback(() => {
    if (snapshot) {
      setDogs(snapshot.dogs);
      setKennels(snapshot.kennels);
    }
    setIsEditing(false);
    toast.success("Changes successfully discarded.");
  }, [snapshot]);

  const saveChanges = useCallback(() => {
    setIsEditing(false);
    toast.success("Changes saved successfully!");
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
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
        toast.error(`${targetKennel.name} is full, dog has been reset.`);
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

  useEffect(() => {
    if (data) {
      setDogs(data.dogs);
      setKennels(data.kennels);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <EditContext.Provider
      value={{
        isEditing
      }}
    >
      <DndContext
        sensors={isEditing ? sensors : []} // disable sensors if not in edit mode
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="flex flex-1 flex-col space-y-4 bg-gray-200 p-4">
          <header className="rounded-lg bg-white shadow">
            <ControlPanel
              startEditing={startEditing}
              saveChanges={saveChanges}
              discardChanges={discardChanges}
            />
          </header>

          <div className="flex flex-grow flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <aside className="w-full rounded-lg bg-white p-4 shadow md:w-1/3">
              <DogList dogs={unassignedDogs} />
            </aside>

            <main className="w-full rounded-lg bg-white p-4 shadow md:w-2/3">
              <KennelGrid kennels={kennels} dogs={dogs} />
            </main>
          </div>
        </div>
      </DndContext>
    </EditContext.Provider>
  );
};

export default KennelBoard;
