import { Flex, Button } from "@radix-ui/themes";
import { useDogSearch } from "../hooks/useDogSearch";
import { useEffect, useState } from "react";
import { DogCard } from "../components/DogCard";
import { Dog } from "../types";
import { Masonry } from "masonic";
import styled from "styled-components";
import { MixerHorizontalIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { FilterByBreed } from "../components/FilterByBreed";
import { PaginationBar } from "../components/PaginationBar";
import { SortBy } from "../components/SortBy";

const MasonryContainer = styled.div`
  width: 100%;
  max-width: 1800px;
  margin: 40px auto 0;
  padding: 20px 40px;
`;

const FloatingButtonsContainer = styled.div<{ show: boolean }>`
  position: fixed;
  top: 105px; // Below navbar
  left: 50%;
  transform: translate(-50%, ${(props) => (props.show ? "0" : "-100%")});
  display: flex;
  gap: 12px;
  z-index: 90;
  border-radius: 8px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
`;

// TODO: Add hover effect, and make it look better
const ActionButton = styled(Button)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Homepage = () => {
  const { searchDogs, fetchDogsByIds, fetchBreeds } = useDogSearch();

  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);

  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"breed" | "age" | "name">("breed");

  const [prevCursor] = useState<string | null>(null);
  const [nextCursor] = useState<string | null>(null);

  const [showControls, setShowControls] = useState(true);

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
      const searchParams: any = {
        sort: `${sortBy}:${sortDirection}`,
      };

      if (selectedBreeds.length > 0) {
        searchParams.breeds = selectedBreeds;
      }

      const { resultIds } = await searchDogs(searchParams);
      setDogIds(resultIds);
    } catch (error) {
      console.error("Error searching dogs:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedBreeds, sortBy, sortDirection]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        if (dogIds.length > 0) {
          const fetchedDogs = await fetchDogsByIds(dogIds);
          console.log("fetchedDogs", fetchedDogs);

          const sortedDogs = [...fetchedDogs].sort((a, b) =>
            sortDirection === "asc"
              ? a.breed.localeCompare(b.breed)
              : b.breed.localeCompare(a.breed)
          );
          setDogs(sortedDogs);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    fetchDogs();
  }, [dogIds, sortDirection]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breedsList = await fetchBreeds();
        setBreeds(breedsList.sort((a, b) => a.localeCompare(b)));
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    getBreeds();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show controls when scrolling up or at the top
      setShowControls(currentScrollY < lastScrollY || currentScrollY < 100);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePagination = (direction: "previous" | "next") => {
    console.log(`Moving ${direction}`);
    // TODO: Implement pagination
  };

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
    <>
      <FloatingButtonsContainer show={showControls}>
        <FilterByBreed
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
        >
          <ActionButton size="3" variant="solid" color="iris">
            <MixerHorizontalIcon width="16" height="16" />
            Filter by Breed
          </ActionButton>
        </FilterByBreed>
        <SortBy
          value={sortBy}
          onChange={setSortBy}
          direction={sortDirection}
          onDirectionChange={setSortDirection}
        >
          <ActionButton size="3" variant="solid" color="iris">
            <CaretSortIcon width="16" height="16" />
            Sort by
          </ActionButton>
        </SortBy>
      </FloatingButtonsContainer>
      <Flex justify="center" align="start" py="5" mt="110px" mb="100px">
        <MasonryContainer>
          <Masonry
            items={dogs}
            columnGutter={columnGutter}
            columnWidth={columnWidth}
            render={renderCard}
          />
        </MasonryContainer>
      </Flex>
      <PaginationBar
        onPrevious={() => handlePagination("previous")}
        onNext={() => handlePagination("next")}
        hasPrevious={!!prevCursor}
        hasNext={!!nextCursor}
      />
    </>
  );
};

export default Homepage;
