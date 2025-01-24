import { Flex } from "@radix-ui/themes";
import { useDogSearch } from "../hooks/useDogSearch";
import { useEffect, useState } from "react";
import { DogCard } from "../components/DogCard";
import { Dog } from "../types";
import { Masonry } from "masonic";
import styled from "styled-components";

const MasonryContainer = styled.div`
  width: 100%;
  max-width: 1800px;
  margin: 40px auto 0;
  padding: 20px 40px;
`;

const Homepage = () => {
  const { searchDogs, fetchDogsByIds } = useDogSearch();

  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const columnWidth = 300;
  const columnGutter = 24;

  const handleFavorite = (dogId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dogId)) {
        newFavorites.delete(dogId);
      } else {
        newFavorites.add(dogId);
      }
      return newFavorites;
    });
  };

  const handleSearch = async () => {
    try {
      const { resultIds } = await searchDogs({});
      setDogIds(resultIds);
    } catch (error) {
      console.error("Error searching dogs:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        if (dogIds.length > 0) {
          const fetchedDogs = await fetchDogsByIds(dogIds);
          setDogs(fetchedDogs);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    fetchDogs();
  }, [dogIds]);

  const renderCard = ({ data: dog }: { data: Dog }) => (
    <Flex justify="center" align="center">
      <DogCard
        dog={dog}
        onClick={() => console.log("Dog clicked!", dog.id)}
        onFavorite={handleFavorite}
        isFavorite={favorites.has(dog.id)}
      />
    </Flex>
  );

  return (
    <Flex justify="center" align="start" py="5">
      <MasonryContainer>
        <Masonry
          items={dogs}
          columnGutter={columnGutter}
          columnWidth={columnWidth}
          render={renderCard}
        />
      </MasonryContainer>
    </Flex>
  );
};

export default Homepage;
