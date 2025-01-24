import { Button, Flex } from "@radix-ui/themes";
import { styled } from "styled-components";
import Logo from "../assets/Logo";
import { useAuth } from "../hooks/useAuth";

const NavContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: medium;
  font-family: "Atma", sans-serif;
`;

const SignOutButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-family: "Atma", sans-serif;
  font-size: 1.5rem;
  color: black !important;
`;

const NavigationBar = () => {
  // You can add authentication state management here
  const { user, logout } = useAuth();
  const isAuthenticated = !!user; // Replace with actual auth state

  return (
    <NavContainer>
      <Flex direction="row">
        <LogoText>Sanford's Strays</LogoText>
        <Logo height="32px" />
      </Flex>
      {isAuthenticated && (
        <SignOutButton variant="ghost" color="gray" onClick={logout}>
          Sign Out
        </SignOutButton>
      )}
    </NavContainer>
  );
};

export default NavigationBar;
