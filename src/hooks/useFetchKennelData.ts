import { useState, useEffect } from "react";
import { Dog, Kennel } from "../types/types";

type KennelData = {
  dogs: Dog[];
  kennels: Kennel[];
};

type FetchState = {
  data: KennelData | null;
  isLoading: boolean;
  error: string | null;
};

const useFetchKennelData = (): FetchState => {
  const [state, setState] = useState<FetchState>({
    data: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const { dogs, kennels } = await import("../data/data.json");

        setState({
          data: { dogs, kennels },
          isLoading: false,
          error: null
        });
      } catch (err) {
        setState({
          data: null,
          isLoading: false,
          error: "Failed to fetch kennel data"
        });
      }
    };

    fetchData();
  }, []);

  return state;
};

export default useFetchKennelData;
