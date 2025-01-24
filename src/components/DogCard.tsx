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
  onFavorite?: (dogId: string) => void;
  isFavorite?: boolean;
}

export const DogCard = ({
  dog,
  onClick,
  onFavorite,
  isFavorite = false,
}: DogCardProps) => {
  const displayAge = dog.age === 0 ? "Less than 1" : dog.age;

  const handleFavoriteClick = () => {
    onFavorite?.(dog.id);
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
          <Heading size="4">{dog.name}</Heading>
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
