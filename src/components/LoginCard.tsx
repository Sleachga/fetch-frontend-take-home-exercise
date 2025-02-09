import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

const StyledCard = styled(Card)`
  background-color: #f7f3ea;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const LoginCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isError, setIsError] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    setIsError(false);

    if (!name || !email) {
      setIsError(true);
      return;
    } else if (!email.includes("@")) {
      // I would do better email validation on a real app :)
      setIsError(true);
      return;
    }

    const result = await login(name, email);
    if (!result.success) {
      setIsError(true);
    }
  };

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
              Name
            </Heading>
            <TextField.Root
              placeholder="What should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
          <Flex direction="column">
            <Heading className="font" size={"3"}>
              Email address
            </Heading>
            <TextField.Root
              placeholder="FuturePupOwner@fetch.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>
          <Button size="3" variant="solid" color="iris" onClick={handleLogin}>
            Login
          </Button>
          {isError && <Text color="red">Invalid email or name</Text>}
        </Flex>
      </StyledCard>
    </Box>
  );
};
