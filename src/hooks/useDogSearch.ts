import { Dog, Match } from "../types";

interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}

interface SearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

interface LocationSearchParams {
  geoBoundingBox: {
    top_right: { lat: number; lon: number };
    bottom_left: { lat: number; lon: number };
  };
  size?: number;
}

const BASE_URL = "https://frontend-take-home-service.fetch.com";

export const useDogSearch = () => {
  const searchDogs = async (
    params: DogSearchParams
  ): Promise<SearchResponse> => {
    try {
      // Convert params object to URLSearchParams
      let searchParams = new URLSearchParams();

      // Handle arrays
      if (params.breeds?.length) {
        params.breeds.forEach((breed) => searchParams.append("breeds", breed));
      }
      if (params.zipCodes?.length) {
        params.zipCodes.forEach((zip) => searchParams.append("zipCodes", zip));
      }

      // Handle other params
      if (params.ageMin)
        searchParams.append("ageMin", params.ageMin.toString());
      if (params.ageMax)
        searchParams.append("ageMax", params.ageMax.toString());
      if (params.size) searchParams.append("size", params.size.toString());
      if (params.from) searchParams.append("from", params.from);
      if (params.sort) searchParams.append("sort", params.sort);

      const response = await fetch(
        `${BASE_URL}/dogs/search?${searchParams.toString()}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dogs");
      }

      return await response.json();
    } catch (error) {
      console.error("Error searching dogs:", error);
      throw error;
    }
  };

  const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
    try {
      const response = await fetch(`${BASE_URL}/dogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dogIds),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dogs");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching dogs:", error);
      throw error;
    }
  };

  const fetchBreeds = async (): Promise<string[]> => {
    try {
      const response = await fetch(`${BASE_URL}/dogs/breeds`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch breeds");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching breeds:", error);
      throw error;
    }
  };

  const searchLocations = async (params: LocationSearchParams) => {
    try {
      const response = await fetch(`${BASE_URL}/locations/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error("Failed to search locations");
      }

      const data = await response.json();

      if (!data.results || !Array.isArray(data.results)) {
        console.error("Unexpected response format:", data);
        throw new Error("Invalid response format from locations search");
      }

      return data.results.map(
        (location: { zip_code: string }) => location.zip_code
      );
    } catch (error) {
      console.error("Error searching locations:", error);
      throw error;
    }
  };

  const fetchDogMatch = async (dogIds: string[]): Promise<Match> => {
    try {
      const response = await fetch(`${BASE_URL}/dogs/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dogIds),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dog match");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching dog match:", error);
      throw error;
    }
  };

  return {
    searchDogs,
    fetchDogsByIds,
    fetchBreeds,
    searchLocations,
    fetchDogMatch,
  };
};
