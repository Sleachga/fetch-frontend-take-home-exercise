import { Flex, Button, Text } from "@radix-ui/themes";
import { useDogSearch } from "../hooks/useDogSearch";
import { useEffect, useState } from "react";
import { DogCard } from "../components/DogCard";
import { Dog } from "../types";
import { Masonry } from "masonic";
import styled from "styled-components";
import {
  MixerHorizontalIcon,
  CaretSortIcon,
  DrawingPinFilledIcon,
} from "@radix-ui/react-icons";
import { FilterByBreed } from "../components/FilterByBreed";
import { PaginationBar } from "../components/PaginationBar";
import { SortBy } from "../components/SortBy";
import { FilterByLocation } from "../components/FilterByLocation";
import { Bounds } from "../types";

import sadCorgi from "../assets/sad-corg.png";

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
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    top: 50px;
  }
`;

// TODO: Add hover effect, and make it look better
const ActionButton = styled(Button)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Homepage = () => {
  const { searchDogs, fetchDogsByIds, fetchBreeds, searchLocations } =
    useDogSearch();

  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);

  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("favorited_dogs");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"breed" | "age" | "name">("breed");

  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const [showControls, setShowControls] = useState(true);

  const [locationBounds, setLocationBounds] = useState<Bounds | null>(null);
  const [locationZipCodes, setLocationZipCodes] = useState<string[]>([]);

  const [, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

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
      // Save to localStorage
      localStorage.setItem("favorited_dogs", JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const handleSearch = async (cursor?: string) => {
    try {
      setIsLoading(true);
      setShowLoading(true);

      const searchParams: any = {
        sort: `${sortBy}:${sortDirection}`,
        size: 25,
      };

      if (selectedBreeds.length > 0) {
        searchParams.breeds = selectedBreeds;
      }

      if (locationZipCodes && locationZipCodes.length > 0) {
        searchParams.zipCodes = locationZipCodes;
      }

      // If we have a cursor, add the 'from' parameter
      if (cursor) {
        try {
          const params = new URLSearchParams(
            cursor.replace("/dogs/search?", "")
          );
          const fromParam = params.get("from");
          if (fromParam) {
            searchParams.from = fromParam;
          }
        } catch (e) {
          console.error("Error parsing cursor:", e);
        }
      }

      const {
        resultIds,
        next,
        prev,
        total: totalResults,
      } = await searchDogs(searchParams);
      setDogIds(resultIds || []);
      setNextCursor(next || null);
      setPrevCursor(prev || null);
      setTotal(totalResults || 0);

      setShowLoading(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching dogs:", error);
      setDogIds([]);
      setTotal(0);
      setShowLoading(false);
      setIsLoading(false);
    }
  };

  const handlePagination = (direction: "previous" | "next") => {
    if (direction === "next" && nextCursor) {
      handleSearch(nextCursor);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (direction === "previous" && prevCursor) {
      handleSearch(prevCursor);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  useEffect(() => {
    // Reset pagination when filters or sort changes
    handleSearch();
  }, [selectedBreeds, sortBy, sortDirection, locationZipCodes]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        if (dogIds.length > 0) {
          const fetchedDogs = await fetchDogsByIds(dogIds);
          // Ensure all dogs have valid data and unique IDs
          const validDogs = fetchedDogs.filter(
            (dog) => dog && dog.id && dog.name && dog.breed
          );
          setDogs(validDogs);
        } else {
          setDogs([]);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
        setDogs([]);
      }
    };
    fetchDogs();
  }, [dogIds]);

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

  useEffect(() => {
    const fetchLocationZipCodes = async () => {
      if (!locationBounds) {
        setLocationZipCodes([]); // Clear zip codes when bounds are null
        return;
      }

      try {
        const zipCodes = await searchLocations({
          geoBoundingBox: locationBounds,
          size: 100,
        });
        setLocationZipCodes(zipCodes);
      } catch (error) {
        console.error("Error fetching location zip codes:", error);
      }
    };

    fetchLocationZipCodes();
  }, [locationBounds]);

  const renderCard = ({ data: dog }: { data: Dog }) =>
    dog && dog.id ? (
      <Flex key={dog.id} justify="center" align="center">
        <DogCard
          dog={dog}
          onClick={() => console.log("Dog clicked!", dog.id)}
          onFavoriteClick={handleFavorite}
          isFavorite={favorites.has(dog.id)}
        />
      </Flex>
    ) : null;

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
        <FilterByLocation onBoundsChanged={setLocationBounds}>
          <ActionButton size="3" variant="solid" color="iris">
            <DrawingPinFilledIcon width="16" height="16" />
            Filter by Location
          </ActionButton>
        </FilterByLocation>
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
          {showLoading ? (
            <Flex
              justify="center"
              align="center"
              style={{ width: "100%", minHeight: "300px" }}
            >
              <Text size="3" color="gray">
                Loading dogs...
              </Text>
            </Flex>
          ) : dogs && dogs.length > 0 ? (
            <Masonry
              items={dogs}
              columnGutter={columnGutter}
              columnWidth={columnWidth}
              render={renderCard}
              key={dogs.map((d) => d.id).join(",")}
            />
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              style={{ width: "100%" }}
            >
              <img
                src={sadCorgi}
                alt="Sad corgi"
                style={{
                  width: "400px",
                  marginBottom: "24px",
                }}
              />
              <Text size="5" weight="medium" color="gray">
                Sorry... couldn't find any dogs matching your search
              </Text>
              <Text size="3" color="gray" style={{ marginTop: "8px" }}>
                Try adjusting your filters to see more results
              </Text>
            </Flex>
          )}
        </MasonryContainer>
      </Flex>
      {dogs.length > 0 && (
        <PaginationBar
          onPrevious={() => handlePagination("previous")}
          onNext={() => handlePagination("next")}
          hasPrevious={!!prevCursor}
          hasNext={!!nextCursor}
          total={total}
        />
      )}
    </>
  );
};

export default Homepage;
