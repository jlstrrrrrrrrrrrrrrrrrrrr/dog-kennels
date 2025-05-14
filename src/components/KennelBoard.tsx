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
      <div className="flex justify-center items-center h-screen">
        Loading kennel data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col space-y-4">
      <header className="bg-white shadow p-4 rounded-lg">
        <ControlPanel />
      </header>

      <div className="flex flex-col md:flex-row flex-grow space-y-4 md:space-y-0 md:space-x-4">
        <aside className="w-full md:w-1/3 bg-white p-4 shadow rounded-lg">
          <DogList dogs={dogs.filter((dog) => !dog.kennelId)} />
        </aside>
        <main className="w-full md:w-2/3 bg-white p-4 shadow rounded-lg">
          <KennelGrid kennels={kennels} dogs={dogs} />
        </main>
      </div>
    </div>
  );
};

export default KennelBoard;
