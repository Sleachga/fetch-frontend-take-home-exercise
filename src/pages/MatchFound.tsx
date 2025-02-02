import { Text, Flex, Heading, Button, Spinner } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DogCard } from "../components/DogCard";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useDogSearch } from "../hooks/useDogSearch";
import { Dog, Match } from "../types";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";

const StyledLink = styled(Link)`
  color: var(--accent-9);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledHeading = styled(Heading)`
  font-family: "Atma", cursive;
  font-weight: 500;
`;

const MatchFound = () => {
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [dogMatch, setDogMatch] = useState<Dog | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const [favoriteDogsLS] = useLocalStorage<string[]>("favorited_dogs", []);

  const { fetchDogMatch, fetchDogsByIds } = useDogSearch();

  const fetchMatchId = async () => {
    try {
      setMatchLoading(true);
      const { match }: Match = await fetchDogMatch(favoriteDogsLS);
      setMatchId(match);
      setMatchFound(true);
    } catch (e) {
      console.error("Error fetching dog match:", e);
      setMatchFound(false);
    } finally {
      setMatchLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchId();
  }, []);

  const fetchDogMatchFromId = async (matchId: string) => {
    if (matchId) {
      try {
        const dogs: Dog[] = await fetchDogsByIds([matchId]);
        setDogMatch(dogs[0]);
        setShowConfetti(true);
      } catch (e) {
        console.error("Error fetching dog match:", e);
      }
    }
  };

  useEffect(() => {
    if (matchId) {
      fetchDogMatchFromId(matchId);
    }
  }, [matchId]);

  const { width, height } = useWindowSize();

  return (
    <Flex direction="column" gap="6" align="center" pt="9">
      <StyledHeading size="8" weight="bold">
        {matchLoading
          ? "Determining your perfect match..."
          : "We found your perfect match! 🎉"}
      </StyledHeading>

      {matchLoading && <Spinner size="3" />}

      {matchFound && dogMatch && (
        <>
          {showConfetti && (
            <Confetti
              width={width || 0}
              height={height || 0}
              recycle={false}
              numberOfPieces={1000}
            />
          )}
          <Text size="4" style={{ lineHeight: 1.6 }}>
            Based on your favorites, we think you'll love:
          </Text>
          <DogCard dog={dogMatch} isFavorite={true} />
          <Flex gap="4">
            <Button
              size="4"
              variant="solid"
              onClick={() => window.location.reload()}
            >
              Find Another Match
            </Button>
          </Flex>
        </>
      )}

      {/* <DogCard dog={mockDog} isFavorite={true} /> */}

      <StyledLink to="/match">← Back to Favorites</StyledLink>
    </Flex>
  );
};

export default MatchFound;
