import { DropdownMenu, Flex, RadioGroup, Text } from "@radix-ui/themes";
import styled from "styled-components";

const StyledContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  justify-content: start;
  align-items: start;
  padding: 16px;
  margin-top: 10px;
`;

interface SortByProps {
  children: React.ReactNode;
  value: "age" | "breed" | "name";
  onChange: (value: "age" | "breed" | "name") => void;
  direction: "asc" | "desc";
  onDirectionChange: (direction: "asc" | "desc") => void;
}

export const SortBy = ({
  children,
  value,
  onChange,
  direction,
  onDirectionChange,
}: SortByProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <StyledContent align="start">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text size="2" mb="1" weight="bold">
              Sort by
            </Text>
            <RadioGroup.Root value={value} onValueChange={onChange}>
              <Flex direction="column" gap="2">
                <RadioGroup.Item value="age">
                  <Text size="2">Age</Text>
                </RadioGroup.Item>
                <RadioGroup.Item value="breed">
                  <Text size="2">Breed</Text>
                </RadioGroup.Item>
                <RadioGroup.Item value="name">
                  <Text size="2">Name</Text>
                </RadioGroup.Item>
              </Flex>
            </RadioGroup.Root>
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" mb="1" weight="bold">
              Direction
            </Text>
            <RadioGroup.Root
              value={direction}
              onValueChange={onDirectionChange}
            >
              <Flex direction="column" gap="2">
                <RadioGroup.Item value="asc">
                  <Text size="2">Ascending</Text>
                </RadioGroup.Item>
                <RadioGroup.Item value="desc">
                  <Text size="2">Descending</Text>
                </RadioGroup.Item>
              </Flex>
            </RadioGroup.Root>
          </Flex>
        </Flex>
      </StyledContent>
    </DropdownMenu.Root>
  );
};
