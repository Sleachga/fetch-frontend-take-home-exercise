import { Box, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background-color: #f7f3ea;
  padding: 2rem;
`;

export const LoginCard = () => {
  return (
    <Box width="500px" mx="auto" p="4">
      <StyledCard>
        <Flex direction="column" gap="4">
          <Flex width="100%" justify="center" mb="2">
            <Heading className="atma-medium font" size={"8"}>
              Login
            </Heading>
          </Flex>
          <Flex direction="column">
            <Heading className="font" size={"3"}>
              Email address
            </Heading>
            <TextField.Root placeholder="FosterFail@example.com" type="email" />
          </Flex>
          <Flex direction="column">
            <Heading className="font" size={"3"}>
              Password
            </Heading>
            <TextField.Root
              placeholder="YourFutureDogsName1234"
              type="password"
            />
          </Flex>
        </Flex>
      </StyledCard>
    </Box>
  );
};
