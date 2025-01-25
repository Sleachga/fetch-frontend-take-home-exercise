import { Dog } from "../types";

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

export const useDogSearch = () => {
  const searchDogs = async (
    params: DogSearchParams
  ): Promise<SearchResponse> => {
    try {
      // Convert params object to URLSearchParams
      const searchParams = new URLSearchParams();

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
        `https://frontend-take-home-service.fetch.com/dogs/search?${searchParams.toString()}`,
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
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dogIds),
        }
      );

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
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch breeds");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching breeds:", error);
      throw error;
    }
  };

  return {
    searchDogs,
    fetchDogsByIds,
    fetchBreeds,
  };
};
