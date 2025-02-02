import { Card, Flex, Text, Heading, IconButton } from "@radix-ui/themes";
import styled from "styled-components";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const StyledCard = styled(Card)`
  width: 300px;
  background-color: #f7f3ea;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  position: relative;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
  }
`;

const DogImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const FavoriteButton = styled(IconButton)`
  position: absolute;
  top: 26px;
  right: 26px;
  background-color: rgba(255, 255, 255);
  border-radius: 50%;
  z-index: 1;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

interface DogCardProps {
  dog: Dog;
  onClick?: () => void;
  onFavoriteClick?: (dogId: string) => void;
  isFavorite?: boolean;
}

const StyledHeading = styled(Heading)`
  font-family: "Atma", cursive;
  font-weight: 500;
`;

export const DogCard = ({
  dog,
  onClick,
  onFavoriteClick,
  isFavorite = false,
}: DogCardProps) => {
  const displayAge = dog.age === 0 ? "Less than 1" : dog.age;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    if (onFavoriteClick) {
      const favorites = new Set(
        JSON.parse(localStorage.getItem("favorited_dogs") || "[]")
      );
      if (favorites.has(dog.id)) {
        favorites.delete(dog.id);
      } else {
        favorites.add(dog.id);
      }
      localStorage.setItem("favorited_dogs", JSON.stringify([...favorites]));
      onFavoriteClick(dog.id);
    }
  };

  return (
    <StyledCard onClick={onClick}>
      <FavoriteButton
        variant="ghost"
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <HeartFilledIcon color="crimson" width="24" height="24" />
        ) : (
          <HeartIcon color="black" width="24" height="24" />
        )}
      </FavoriteButton>
      <DogImage src={dog.img} alt={`${dog.name} the ${dog.breed}`} />
      <Flex direction="column" gap="2" p="4">
        <Flex justify="between">
          <StyledHeading size="4">{dog.name}</StyledHeading>
          <Text size="2">{dog.breed}</Text>
        </Flex>
        <Flex justify="between">
          <Text size="2">
            {displayAge} {dog.age < 2 ? " year" : " years"} old
          </Text>
          <Text size="2" color="gray">
            📍 {dog.zip_code}
          </Text>
        </Flex>
      </Flex>
    </StyledCard>
  );
};
