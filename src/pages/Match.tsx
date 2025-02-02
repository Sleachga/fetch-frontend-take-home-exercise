import { Text, Flex, Heading, Button } from "@radix-ui/themes";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dog } from "../types";
import { useState } from "react";
import { useDogSearch } from "../hooks/useDogSearch";
import { DogCard } from "../components/DogCard";

const StyledLink = styled(Link)`
  color: var(--accent-9);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Match = () => {
  const [favoriteDogsLS] = useLocalStorage<string[]>("favorited_dogs", []);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  const { fetchDogsByIds } = useDogSearch();
  const navigate = useNavigate();

  const renderCard = ({ data: dog }: { data: Dog }) => (
    <Flex key={dog.id} justify="center" align="center">
      <DogCard
        dog={dog}
        isFavorite={true}
        onFavoriteClick={() => {
          const newFavorites = favoriteDogs.filter((d) => d.id !== dog.id);
          setFavoriteDogs(newFavorites);
        }}
      />
    </Flex>
  );

  const fetchAndSetFavoriteDogs = async () => {
    const favorites = await fetchDogsByIds(favoriteDogsLS);
    setFavoriteDogs(favorites);
  };

  useEffect(() => {
    fetchAndSetFavoriteDogs();
  }, []);

  return (
    <Flex direction="column" gap="6" pb="6">
      <Heading size="8" weight="bold">
        Find Your Perfect Match
      </Heading>
      <Text size="4" style={{ lineHeight: 1.6 }}>
        Here are your favorited dogs...
      </Text>

      <Flex justify="center">
        <Button
          size="4"
          color="iris"
          variant="solid"
          onClick={() => navigate("/match-found")}
        >
          Let's find a match!
        </Button>
      </Flex>

      {favoriteDogs.length > 0 ? (
        <Flex
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
            width: "100%",
          }}
        >
          {favoriteDogs.map((dog) => renderCard({ data: dog }))}
        </Flex>
      ) : (
        <Text size="3" color="gray" style={{ marginTop: "24px" }}>
          You haven't favorited any dogs yet. Go find some dogs you love! 🐕
        </Text>
      )}
      <StyledLink to="/homepage">← Back to Home</StyledLink>
    </Flex>
  );
};

export default Match;
