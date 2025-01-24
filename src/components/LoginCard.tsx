import { Box, Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
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

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      // It didn't work :(
      if (!response.ok) {
        throw new Error("Login failed");
      }

      // It worked :)
      login({ name, email });

      console.log("Login Success!", name, email);
    } catch (error) {
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
        </Flex>
      </StyledCard>
    </Box>
  );
};
