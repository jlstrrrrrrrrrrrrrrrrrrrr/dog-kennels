import React, { useEffect, useState } from "react";
import { Dog, Kennel } from "../types/types";
import DogList from "./DogList";
import KennelGrid from "./KennelGrid";
import ControlPanel from "./ControlPanel";

const KennelBoard = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [kennels, setKennels] = useState<Kennel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    <div className="flex min-h-screen flex-col space-y-4 bg-gray-100 p-4">
      <header className="rounded-lg bg-white p-4 shadow">
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
  );
};

export default KennelBoard;
