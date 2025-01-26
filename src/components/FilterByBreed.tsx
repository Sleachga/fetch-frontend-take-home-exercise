import { Button, Flex, Checkbox, Text } from "@radix-ui/themes";
import { DropdownMenu } from "radix-ui";
import styled from "styled-components";

const StyledContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  justify-content: start;
  align-items: start;
  padding: 16px 16px 16px 16px;
  margin-top: 10px;

  @media (max-width: 768px) {
    position: fixed;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: calc(100% - 32px);
    max-width: 400px;
  }
`;

const BreedColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const BreedItem = styled(Flex)`
  gap: 8px;
  align-items: center;
  padding: 4px 0;
`;

const Header = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

const ClearButton = styled(Button)`
  color: var(--iris-9);

  &:hover {
    color: var(--iris-10);
    background: transparent;
  }
`;

interface FilterByBreedProps {
  children: React.ReactNode;
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
}

export const FilterByBreed = ({
  children,
  breeds,
  selectedBreeds,
  setSelectedBreeds,
}: FilterByBreedProps) => {
  const handleBreedToggle = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds(selectedBreeds.filter((b) => b !== breed));
    } else {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };

  const handleClearAll = () => {
    setSelectedBreeds([]);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <StyledContent align="center" side="bottom" sideOffset={5}>
        <Header>
          <Text size="2" weight="bold">
            Selected: {selectedBreeds.length}
          </Text>
          {selectedBreeds.length > 0 && (
            <ClearButton size="1" variant="ghost" onClick={handleClearAll}>
              Clear all
            </ClearButton>
          )}
        </Header>
        <BreedColumn>
          {breeds.map((breed) => (
            <BreedItem key={breed}>
              <Checkbox
                checked={selectedBreeds.includes(breed)}
                onCheckedChange={() => handleBreedToggle(breed)}
              />
              <Text size="2">{breed}</Text>
            </BreedItem>
          ))}
        </BreedColumn>
      </StyledContent>
    </DropdownMenu.Root>
  );
};
