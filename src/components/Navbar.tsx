import styled from "styled-components";
import { Flex, Heading } from "@radix-ui/themes";
import { useAuth } from "../hooks/useAuth";

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #f7f3ea;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const NavContent = styled(Flex)`
  height: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <NavContainer>
      <NavContent justify="between" align="center">
        <Heading size="6">🐾 Fetch</Heading>
        <Flex gap="4" align="center">
          <button onClick={logout}>Logout</button>
        </Flex>
      </NavContent>
    </NavContainer>
  );
};
