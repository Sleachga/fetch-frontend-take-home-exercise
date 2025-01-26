import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PaginationContainer = styled(Flex)<{ show: boolean }>`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, ${(props) => (props.show ? "0" : "150px")});
  gap: 12px;
  z-index: 90;
  border-radius: 8px;
  align-items: center;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  pointer-events: ${(props) => (props.show ? "all" : "none")};
`;

const ActionButton = styled(Button)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  justify-content: center;
`;

interface PaginationBarProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const PaginationBar = ({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: PaginationBarProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.documentElement.scrollHeight - 200;

      setShow(scrollPosition > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PaginationContainer show={show}>
      <ActionButton
        size="3"
        variant="solid"
        color="iris"
        onClick={onPrevious}
        disabled={!hasPrevious}
      >
        <Flex align="center" justify="center" gap="1">
          <ChevronLeftIcon width="16" height="16" />
          <Text>Previous</Text>
        </Flex>
      </ActionButton>
      <ActionButton
        size="3"
        variant="solid"
        color="iris"
        onClick={onNext}
        disabled={!hasNext}
      >
        <Flex align="center" justify="center" gap="1">
          <Text>Next</Text>
          <ChevronRightIcon width="16" height="16" />
        </Flex>
      </ActionButton>
    </PaginationContainer>
  );
};
