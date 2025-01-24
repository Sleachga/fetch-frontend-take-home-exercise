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

    try {
      if (!name || !email) {
        setIsError(true);
        return;
      } else if (!email.includes("@")) {
        // in a real app, I would use a more sophisticated email validation
        setIsError(true);
        return;
      }

      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email }),
        }
      );

      // It didn't work :(
      if (!response.ok) {
        setIsError(true);
        throw new Error("Login failed");
      }

      // It worked :)
      login({ name, email });

      console.log("Login Success!", name, email);
    } catch (error) {
      setIsError(true);
      console.error("Login error:", error);
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
