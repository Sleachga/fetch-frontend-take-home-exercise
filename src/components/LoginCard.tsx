import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background-color: #f7f3ea;
`;

export const LoginCard = () => {
  return (
    <Box maxWidth="400px" mx="auto" p="4">
      <StyledCard>
        <Flex direction="row" gap="2" justify="center" align="center">
          <Heading className="atma-medium font" size={"8"}>
            Login
          </Heading>
        </Flex>
      </StyledCard>
    </Box>
  );
};
