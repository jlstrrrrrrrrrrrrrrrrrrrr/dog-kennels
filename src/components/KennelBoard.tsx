import React, { useEffect, useState } from "react";
import { Dog, Kennel } from "../types/types";

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
      }
      setIsLoading(false);
    };

    fetchKennelData();
  }, []);

  if (isLoading) {
    return <div>Loading kennel data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Kennel Board</h2>
    </div>
  );
};

export default KennelBoard;
